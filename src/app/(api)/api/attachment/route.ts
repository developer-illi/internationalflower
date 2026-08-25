import { NextResponse } from 'next/server'

/**
 * 첨부파일 다운로드 프록시.
 *
 * 첨부 URL 은 R2(pub-....r2.dev) 도메인이라 교차 출처다. 이 경우 브라우저는
 * <a download="참가신청서.pdf"> 의 download 속성을 무시하고(HTML 명세상 동작),
 * R2 응답에 Content-Disposition 도 없어 UUID 파일명으로 저장된다.
 *
 * 같은 출처인 이 라우트가 파일을 중계하면서 Content-Disposition 을 붙이면
 * 원본 한글 파일명으로 저장된다. 이미 올라가 있는 파일에도 그대로 적용된다.
 */

/** SSRF 방지 — next.config.ts 의 images.domains 와 같은 목록 */
const ALLOWED_HOSTS = new Set([
  'pub-00c7810e8aff4d90ad376bc7bf8481f0.r2.dev',
  '81e35b26d162eaed354045e7a8da4c79.r2.cloudflarestorage.com',
])

/**
 * 헤더에 넣을 수 없는 문자를 제거한 ASCII 대체 파일명.
 * 한글 이름은 여기서 전부 지워지므로 확장자는 살리고 이름만 대체한다.
 * (실제로는 filename* 이 쓰이고, 이 값은 구형 브라우저 대비용이다)
 */
const toAsciiFallback = (name: string) => {
  const dot = name.lastIndexOf('.')
  const clean = (part: string) =>
    part.replace(/[^\x20-\x7E]/g, '').replace(/["\\]/g, '').trim()

  const base = clean(dot > 0 ? name.slice(0, dot) : name)
  const ext = dot > 0 ? clean(name.slice(dot)) : ''
  return `${base || 'download'}${ext}`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const rawUrl = searchParams.get('url')
  const rawName = searchParams.get('name')

  if (!rawUrl) {
    return NextResponse.json({ error: '파일 주소가 없습니다.' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(rawUrl)
  } catch {
    return NextResponse.json(
      { error: '파일 주소 형식이 올바르지 않습니다.' },
      { status: 400 },
    )
  }

  if (target.protocol !== 'https:' || !ALLOWED_HOSTS.has(target.host)) {
    return NextResponse.json(
      { error: '허용되지 않은 파일 주소입니다.' },
      { status: 400 },
    )
  }

  let upstream: Response
  try {
    upstream = await fetch(target.toString(), { cache: 'no-store' })
  } catch (error) {
    console.error('첨부파일 프록시 실패:', error)
    return NextResponse.json(
      { error: '파일을 가져오지 못했습니다.' },
      { status: 502 },
    )
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: '파일을 찾을 수 없습니다.' },
      { status: upstream.status === 404 ? 404 : 502 },
    )
  }

  // 이름이 없으면 URL 마지막 조각을 쓴다.
  const fileName =
    rawName?.trim() || decodeURIComponent(target.pathname.split('/').pop() || 'download')

  const headers = new Headers({
    'Content-Type':
      upstream.headers.get('content-type') || 'application/octet-stream',
    // filename* (RFC 5987) 이 한글을 담고, filename 은 구형 브라우저 대비용이다.
    'Content-Disposition': `attachment; filename="${toAsciiFallback(fileName)}"; filename*=UTF-8''${encodeURIComponent(fileName)}`,
    'Cache-Control': 'private, max-age=0, must-revalidate',
  })

  const length = upstream.headers.get('content-length')
  if (length) headers.set('Content-Length', length)

  return new NextResponse(upstream.body, { status: 200, headers })
}
