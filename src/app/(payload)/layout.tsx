import config from '@/payload.config'
import { RootLayout } from '@payloadcms/next/layouts'
import React from 'react'
import { importMap } from './admin/importMap.js'
import { serverFunction } from './serverFunction'
import '@payloadcms/next/css'
import './admin-custom.css'

type Args = {
  children: React.ReactNode
}

export default async function Layout({ children }: Args) {
  return (
    <RootLayout config={config} serverFunction={serverFunction} importMap={importMap}>
      {children}
    </RootLayout>
  )
}
