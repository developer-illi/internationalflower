/**
 * 백엔드는 4xx·5xx 응답 본문을 아래 형태로 통일해서 준다.
 *   { "detail": "사람이 읽을 한글 메시지", "error": "같은 메시지" }
 *
 * 예전에는 관리자 폼이 실패를 '등록 실패' 같은 문구로 뭉개서
 * 정작 원인(예: HEIC 사진은 지원하지 않는다는 안내)이 화면에 뜨지 않았다.
 */

const DEFAULT_FALLBACK = '요청 처리 중 문제가 발생했습니다.'

/** 서버가 준 사유를 담는 에러. 이 에러의 message 만 사용자에게 노출한다. */
export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

/** 실패 응답 본문에서 한글 사유를 꺼낸다. 본문이 JSON 이 아니면 fallback. */
export async function getApiErrorMessage(
  res: Response,
  fallback: string = DEFAULT_FALLBACK,
): Promise<string> {
  try {
    const data = await res.json()
    return data?.detail || data?.error || fallback
  } catch {
    return fallback
  }
}

/** 응답이 실패면 서버 메시지를 담은 ApiError 를 던진다. api 래퍼용. */
export async function throwIfNotOk(
  res: Response,
  fallback: string = DEFAULT_FALLBACK,
): Promise<void> {
  if (res.ok) return
  throw new ApiError(await getApiErrorMessage(res, fallback), res.status)
}

/**
 * catch 로 받은 값에서 사용자에게 보여줄 문장을 고른다.
 * 네트워크 오류('Failed to fetch') 처럼 사용자가 이해할 수 없는 메시지는
 * 그대로 노출하지 않고 fallback 으로 대체한다.
 */
export function toUserMessage(
  error: unknown,
  fallback: string = DEFAULT_FALLBACK,
): string {
  if (error instanceof ApiError && error.message) return error.message
  return fallback
}
