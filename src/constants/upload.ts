/**
 * 업로드 정책. 서버 검증과 값을 일치시켜 불필요한 왕복을 줄인다.
 */

/**
 * 이미지 입력에서 HEIC 를 애초에 고르지 못하게 좁힌다.
 * 백엔드가 HEIC 를 열지 못해 400 을 반환하는데, 예전에는 이게 조용히 통과되어
 * 이미지 없는 레코드가 만들어졌고 그것이 전시 페이지 500 의 원인이었다.
 */
export const IMAGE_ACCEPT = 'image/jpeg,image/png'

/** 공지 첨부파일 허용 확장자 (서버 정책과 동일) */
export const ATTACHMENT_EXTENSIONS = [
  'pdf',
  'hwp',
  'hwpx',
  'doc',
  'docx',
  'xls',
  'xlsx',
  'ppt',
  'pptx',
  'zip',
  'jpg',
  'jpeg',
  'png',
] as const

export const ATTACHMENT_ACCEPT = ATTACHMENT_EXTENSIONS.map((ext) => `.${ext}`).join(',')

/** 파일당 20MB */
export const MAX_ATTACHMENT_BYTES = 20 * 1024 * 1024

export const getFileExtension = (fileName: string): string =>
  fileName.split('.').pop()?.toLowerCase() ?? ''

/** 사람이 읽는 용량 표기 */
export const formatFileSize = (bytes: number): string => {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 KB'
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

/** 첨부 가능한 파일인지 검사한다. 통과하면 null, 아니면 사유 문구. */
export const validateAttachment = (file: File): string | null => {
  const ext = getFileExtension(file.name)
  if (!(ATTACHMENT_EXTENSIONS as readonly string[]).includes(ext)) {
    return `'${file.name}' 은(는) 첨부할 수 없는 형식입니다. (${ATTACHMENT_EXTENSIONS.join(', ')} 만 가능)`
  }
  if (file.size > MAX_ATTACHMENT_BYTES) {
    return `'${file.name}' 의 용량이 20MB 를 넘습니다. (${formatFileSize(file.size)})`
  }
  return null
}
