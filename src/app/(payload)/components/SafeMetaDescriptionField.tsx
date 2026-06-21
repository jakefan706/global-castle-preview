'use client'

import { useCallback, useState } from 'react'
import {
  FieldLabel,
  TextareaInput,
  toast,
  useConfig,
  useDocumentInfo,
  useDocumentTitle,
  useField,
  useForm,
  useLocale,
} from '@payloadcms/ui'
import { reduceToSerializableFields } from '@payloadcms/ui/shared'
import { formatAdminURL } from 'payload/shared'

type SafeMetaDescriptionProps = {
  field: {
    label?: string
    localized?: boolean
    maxLength?: number
    minLength?: number
    required?: boolean
  }
  hasGenerateDescriptionFn?: boolean
  readOnly?: boolean
}

const DEFAULT_MIN_LENGTH = 50
const DEFAULT_MAX_LENGTH = 160

function normalizeGeneratedResult(payload: unknown) {
  if (!payload || typeof payload !== 'object') {
    return ''
  }

  const result = 'result' in payload ? payload.result : ''
  return typeof result === 'string' ? result : ''
}

export default function SafeMetaDescriptionField(props: SafeMetaDescriptionProps) {
  const {
    field: { label, localized, maxLength: maxLengthFromProps, minLength: minLengthFromProps, required },
    hasGenerateDescriptionFn,
    readOnly,
  } = props

  const { config } = useConfig()
  const locale = useLocale()
  const { getData } = useForm()
  const docInfo = useDocumentInfo()
  const { title } = useDocumentTitle()
  const [isGenerating, setIsGenerating] = useState(false)

  const maxLength = maxLengthFromProps || DEFAULT_MAX_LENGTH
  const minLength = minLengthFromProps || DEFAULT_MIN_LENGTH

  const {
    customComponents: { AfterInput, BeforeInput } = {},
    errorMessage,
    path,
    setValue,
    showError,
    value,
  } = useField<string>()

  const regenerateDescription = useCallback(async () => {
    if (!hasGenerateDescriptionFn || isGenerating) {
      return
    }

    setIsGenerating(true)

    try {
      const endpoint = formatAdminURL({
        apiRoute: config.routes.api,
        path: '/plugin-seo/generate-description',
      })

      const response = await fetch(endpoint, {
        body: JSON.stringify({
          id: docInfo.id,
          collectionSlug: docInfo.collectionSlug,
          doc: getData(),
          docPermissions: docInfo.docPermissions,
          globalSlug: docInfo.globalSlug,
          hasPublishPermission: docInfo.hasPublishPermission,
          hasSavePermission: docInfo.hasSavePermission,
          initialData: docInfo.initialData,
          initialState: reduceToSerializableFields(docInfo.initialState ?? {}),
          locale: typeof locale === 'object' ? locale.code : locale,
          title,
        }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        let details = ''

        try {
          details = await response.text()
        } catch {
          details = ''
        }

        throw new Error(details || `Request failed with status ${response.status}`)
      }

      let payload: unknown = null

      try {
        payload = await response.json()
      } catch {
        throw new Error('The server returned an invalid response.')
      }

      const generatedDescription = normalizeGeneratedResult(payload)

      if (!generatedDescription) {
        throw new Error('No description could be generated from the current content.')
      }

      setValue(generatedDescription)
      toast.success('SEO description generated.')
    } catch (error) {
      console.error(error)
      const message =
        error instanceof Error && error.message
          ? error.message
          : 'Auto-generate failed. Your current content is still saved.'
      toast.error(message)
    } finally {
      setIsGenerating(false)
    }
  }, [
    config.routes.api,
    docInfo.collectionSlug,
    docInfo.docPermissions,
    docInfo.globalSlug,
    docInfo.hasPublishPermission,
    docInfo.hasSavePermission,
    docInfo.id,
    docInfo.initialData,
    docInfo.initialState,
    getData,
    hasGenerateDescriptionFn,
    isGenerating,
    locale,
    setValue,
    title,
  ])

  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{ marginBottom: '5px', position: 'relative' }}>
        <div className="plugin-seo__field">
          <FieldLabel label={label} localized={localized} path={path} required={required} />
          {hasGenerateDescriptionFn ? (
            <>
              {' \u00a0—\u00a0'}
              <button
                type="button"
                disabled={readOnly || isGenerating}
                onClick={() => {
                  void regenerateDescription()
                }}
                style={{
                  background: 'none',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'currentcolor',
                  cursor: readOnly || isGenerating ? 'not-allowed' : 'pointer',
                  opacity: readOnly || isGenerating ? 0.6 : 1,
                  padding: 0,
                  textDecoration: 'underline',
                }}
              >
                {isGenerating ? 'Generating…' : 'Auto-generate'}
              </button>
            </>
          ) : null}
        </div>
        <div style={{ color: '#9A9A9A' }}>
          This should be between {minLength} and {maxLength} characters. For help in writing quality
          meta descriptions, see
          {' '}
          <a
            href="https://developers.google.com/search/docs/advanced/appearance/snippet#meta-descriptions"
            rel="noopener noreferrer"
            target="_blank"
          >
            best practices
          </a>
        </div>
      </div>

      <div style={{ marginBottom: '10px', position: 'relative' }}>
        <TextareaInput
          AfterInput={AfterInput}
          BeforeInput={BeforeInput}
          Error={errorMessage}
          onChange={setValue}
          path={path}
          readOnly={readOnly}
          required={required}
          showError={showError}
          style={{ marginBottom: 0 }}
          value={value}
        />
      </div>

      <div className="gc-seo-description__footer">
        <span className="gc-seo-description__counter">
          {(value || '').length} / {maxLength}
        </span>
      </div>
    </div>
  )
}
