import type { DefaultServerCellComponentProps } from 'payload'

type RowDataWithUsage = {
  usageCount?: number
  usageDetails?: string[]
  usageStatus?: string
}

export default function MediaUsageStatusCell({
  rowData,
}: DefaultServerCellComponentProps) {
  const data = rowData as RowDataWithUsage
  const count = typeof data.usageCount === 'number' ? data.usageCount : 0
  const details = Array.isArray(data.usageDetails) ? data.usageDetails : []
  const title = details.length ? details.join('\n') : 'This file is not currently used.'

  return (
    <span
      className={`gc-media-usage-pill${count ? ' is-used' : ' is-unused'}`}
      title={title}
    >
      {count ? `Used (${count})` : 'Unused'}
    </span>
  )
}
