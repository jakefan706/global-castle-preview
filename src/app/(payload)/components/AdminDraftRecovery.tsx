'use client'

import { useEffect, useRef, useState } from 'react'
import { toast, useAllFormFields, useDocumentInfo, useForm } from '@payloadcms/ui'
import type { FormState } from 'payload'

type RecoveryPayload = {
  savedAt: string
  value: FormState
}

const SUPPORTED_COLLECTIONS = new Set(['products', 'blog-posts'])

function createStorageKey(collectionSlug?: string | null, id?: number | string | null) {
  if (!collectionSlug || !SUPPORTED_COLLECTIONS.has(collectionSlug)) {
    return null
  }

  return `gc-admin-recovery:${collectionSlug}:${id ?? 'new'}`
}

export default function AdminDraftRecovery() {
  const docInfo = useDocumentInfo()
  const { getData, replaceState } = useForm()
  const formState = useAllFormFields()
  const [recoveryState, setRecoveryState] = useState<RecoveryPayload | null>(null)
  const hasInitialized = useRef(false)
  const lastSavedSnapshot = useRef('')
  const storageKey = createStorageKey(docInfo.collectionSlug, docInfo.id)

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') {
      return
    }

    const raw = window.sessionStorage.getItem(storageKey)

    if (!raw) {
      return
    }

    try {
      const parsed = JSON.parse(raw) as RecoveryPayload
      if (parsed && typeof parsed === 'object' && 'value' in parsed) {
        setRecoveryState(parsed)
      }
    } catch {
      window.sessionStorage.removeItem(storageKey)
    }
  }, [storageKey])

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') {
      return
    }

    const hasSavePermission = docInfo.hasSavePermission !== false

    if (!hasSavePermission) {
      return
    }

    const interval = window.setInterval(() => {
      const snapshot = JSON.stringify(formState ?? {})

      if (!hasInitialized.current) {
        hasInitialized.current = true
        lastSavedSnapshot.current = snapshot
        return
      }

      if (!snapshot || snapshot === lastSavedSnapshot.current) {
        return
      }

      lastSavedSnapshot.current = snapshot
      window.sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          savedAt: new Date().toISOString(),
          value: formState,
        }),
      )
    }, 1200)

    return () => {
      window.clearInterval(interval)
    }
  }, [docInfo.hasSavePermission, formState, storageKey])

  useEffect(() => {
    if (!storageKey || typeof window === 'undefined') {
      return
    }

    const currentUpdatedAt =
      docInfo?.data && typeof docInfo.data === 'object' && docInfo.data
        ? (docInfo.data as Record<string, unknown>).updatedAt
        : null

    if (currentUpdatedAt) {
      window.sessionStorage.removeItem(storageKey)
    }
  }, [docInfo.data, storageKey])

  if (!recoveryState || !storageKey) {
    return null
  }

  return (
    <div className="gc-admin-recovery">
      <div>
        <strong>Unsaved content found</strong>
        <p>
          A local recovery snapshot from{' '}
          {new Date(recoveryState.savedAt).toLocaleString('en-US')} is available for this document.
        </p>
      </div>
      <div className="gc-admin-recovery__actions">
        <button
          type="button"
          className="btn btn--style-primary btn--size-small"
          onClick={() => {
            replaceState(recoveryState.value)
            setRecoveryState(null)
            toast.success('Recovered unsaved content.')
          }}
        >
          Restore
        </button>
        <button
          type="button"
          className="btn btn--style-secondary btn--size-small"
          onClick={() => {
            window.sessionStorage.removeItem(storageKey)
            setRecoveryState(null)
          }}
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
