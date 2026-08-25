/**
 * 백엔드가 리소스마다 다른 날짜 포맷을 내려준다.
 *   /notice              → '2026-08-21'
 *   /news                → '2026-05-11 03:19'        (UTC, 타임존 표기 없음)
 *   /exhibition, /activity → '2026-08-21T09:08:51.246744Z'
 * 정렬·표시 전에 한 번 정규화해서 이 차이를 흡수한다.
 * (포맷 통일은 백엔드 P2-2 과제로 요청해 둔 상태)
 */

const KST_OFFSET_MS = 9 * 60 * 60 * 1000

const DATE_ONLY = /^(\d{4})-(\d{2})-(\d{2})$/
const NO_TIMEZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2}(\.\d+)?)?$/

const pad = (value: number) => String(value).padStart(2, '0')

/**
 * 타임존 표기가 없는 값은 UTC로 간주한다. 런타임 로컬 타임존에 따라
 * 결과가 달라지면 서버 렌더링과 클라이언트 렌더링이 어긋나기 때문이다.
 */
const normalize = (raw: string) => {
  const value = raw.trim().replace(' ', 'T')
  return NO_TIMEZONE.test(value) ? `${value}Z` : value
}

/** 정렬용 타임스탬프. 파싱할 수 없으면 0을 반환해 목록 맨 뒤로 보낸다. */
export const parseDate = (value?: string | null): number => {
  if (!value) return 0
  const time = new Date(normalize(value)).getTime()
  return Number.isNaN(time) ? 0 : time
}

/** 화면 표시용 'YYYY.MM.DD' (한국 시간 기준) */
export const formatDate = (value?: string | null): string => {
  const raw = value?.trim()
  if (!raw) return ''

  const dateOnly = raw.match(DATE_ONLY)
  if (dateOnly) return `${dateOnly[1]}.${dateOnly[2]}.${dateOnly[3]}`

  const time = parseDate(raw)
  if (!time) return raw

  const kst = new Date(time + KST_OFFSET_MS)
  return `${kst.getUTCFullYear()}.${pad(kst.getUTCMonth() + 1)}.${pad(kst.getUTCDate())}`
}

/**
 * 최신순 정렬. 백엔드가 어떤 목록도 정렬해 주지 않아 프론트에서 보정한다.
 * 날짜가 같으면 id 내림차순으로 순서를 고정해 매 요청 결과가 흔들리지 않게 한다.
 * (백엔드 P0-3 완료 후에도 이중으로 안전하게 동작한다)
 */
export const sortByDateDesc = <T extends { date?: string; id?: number }>(
  items: T[],
): T[] =>
  [...items].sort((a, b) => {
    const diff = parseDate(b.date) - parseDate(a.date)
    if (diff !== 0) return diff
    return (b.id ?? 0) - (a.id ?? 0)
  })
