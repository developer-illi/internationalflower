'use client'

import { useRef } from 'react'
import { NoticeAttachment } from '@/types/notice'
import {
  ATTACHMENT_ACCEPT,
  ATTACHMENT_EXTENSIONS,
  formatFileSize,
  validateAttachment,
} from '@/constants/upload'

interface AttachmentFieldProps {
  /** 아직 업로드하지 않은, 이번에 새로 고른 파일 */
  files: File[]
  onFilesChange: (files: File[]) => void
  /** 이미 서버에 저장되어 있는 첨부 (수정 화면에서만 사용) */
  existing?: NoticeAttachment[]
  onRemoveExisting?: (attachment: NoticeAttachment) => void
  disabled?: boolean
}

const AttachmentField = ({
  files,
  onFilesChange,
  existing = [],
  onRemoveExisting,
  disabled = false,
}: AttachmentFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = Array.from(e.target.files ?? [])
    e.target.value = '' // 같은 파일을 다시 고를 수 있게 초기화
    if (picked.length === 0) return

    const accepted: File[] = []
    const rejected: string[] = []

    for (const file of picked) {
      const reason = validateAttachment(file)
      if (reason) {
        rejected.push(reason)
        continue
      }
      // 같은 파일을 두 번 담지 않는다
      const duplicated = [...files, ...accepted].some(
        (f) => f.name === file.name && f.size === file.size,
      )
      if (!duplicated) accepted.push(file)
    }

    if (rejected.length > 0) alert(rejected.join('\n'))
    if (accepted.length > 0) onFilesChange([...files, ...accepted])
  }

  const removeFile = (index: number) => {
    onFilesChange(files.filter((_, i) => i !== index))
  }

  return (
    <div>
      <label className="block text-sm text-gray-600 mb-2">첨부파일</label>

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-opacity-90 text-sm disabled:opacity-50"
      >
        파일 선택
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept={ATTACHMENT_ACCEPT}
        onChange={handleSelect}
        className="hidden"
      />

      <p className="text-xs text-gray-500 mt-2">
        ※ {ATTACHMENT_EXTENSIONS.join(', ')} 형식만 첨부할 수 있고, 파일당 20MB 까지
        가능합니다. 여러 개를 한 번에 고를 수 있습니다.
      </p>

      {existing.length > 0 && (
        <ul className="mt-3 space-y-2">
          {existing.map((attachment) => (
            <li
              key={attachment.id}
              className="flex items-center justify-between gap-3 border border-gray-200 rounded px-3 py-2"
            >
              <span className="text-sm text-gray-700 break-all">
                {attachment.name}
                <span className="text-gray-400 ml-2">
                  {formatFileSize(attachment.size)}
                </span>
              </span>
              {onRemoveExisting && (
                <button
                  type="button"
                  onClick={() => onRemoveExisting(attachment)}
                  disabled={disabled}
                  className="shrink-0 text-sm text-red-500 hover:text-red-700 disabled:opacity-50"
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${file.size}-${index}`}
              className="flex items-center justify-between gap-3 border border-dashed border-gray-300 rounded px-3 py-2 bg-gray-50"
            >
              <span className="text-sm text-gray-700 break-all">
                {file.name}
                <span className="text-gray-400 ml-2">{formatFileSize(file.size)}</span>
                <span className="text-[#E34798] ml-2 text-xs">추가 예정</span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                disabled={disabled}
                className="shrink-0 text-sm text-gray-500 hover:text-gray-800 disabled:opacity-50"
              >
                제거
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default AttachmentField
