/**
 * 이미지 업로드 입력 옆에 붙는 형식 안내.
 * 관리자가 아이폰 사진(HEIC)을 올렸다가 실패하는 사례가 반복되어 추가했다.
 */
interface ImageFormatNoticeProps {
  className?: string
}

const ImageFormatNotice = ({ className = '' }: ImageFormatNoticeProps) => {
  return (
    <p className={`text-xs text-gray-500 mt-2 leading-relaxed ${className}`}>
      ※ jpg 또는 png 파일만 업로드할 수 있습니다. 아이폰에서 촬영한 HEIC 사진은
      &lsquo;설정 &gt; 카메라 &gt; 포맷&rsquo;을 &lsquo;높은 호환성&rsquo;으로 바꾼 뒤 다시
      촬영하거나, jpg로 변환해 올려주세요.
    </p>
  )
}

export default ImageFormatNotice
