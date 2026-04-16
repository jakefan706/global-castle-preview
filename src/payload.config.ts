// @ts-check
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Products } from './collections/Products'
import { Categories } from './collections/Categories'
import { CapacityRanges } from './collections/CapacityRanges'
import { Applications } from './collections/Applications'
import { BlogPosts } from './collections/BlogPosts'
import { Certifications } from './collections/Certifications'
import { InquirySubmissions } from './collections/InquirySubmissions'
import { Media } from './collections/Media'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // 管理后台认证用户
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Global Castle Admin',
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Products,
    Categories,
    CapacityRanges,
    Applications,
    BlogPosts,
    Certifications,
    InquirySubmissions,
    Media,
  ],

  // PostgreSQL 数据库
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/global_castle',
    },
  }),

  // 富文本编辑器
  editor: lexicalEditor(),

  // SEO 插件
  plugins: [
    seoPlugin({
      collections: ['products', 'blog-posts'],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${(doc as Record<string, string>)?.title || (doc as Record<string, string>)?.name || ''} | Global Castle`,
      generateDescription: ({ doc }) => (doc as Record<string, string>)?.summary || (doc as Record<string, string>)?.description || '',
    }),
  ],

  // 图片处理
  sharp,

  // 上传限制
  upload: {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  },

  // TypeScript 类型输出
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  secret: process.env.PAYLOAD_SECRET || 'global-castle-dev-secret-change-in-production',
})
