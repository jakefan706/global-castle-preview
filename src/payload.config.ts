// @ts-check
import { buildConfig } from 'payload'
import type { Field, TextareaField } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Products } from './collections/Products.ts'
import { Categories } from './collections/Categories.ts'
import { Applications } from './collections/Applications.ts'
import { BlogPosts } from './collections/BlogPosts.ts'
import { Certifications } from './collections/Certifications.ts'
import { InquirySubmissions } from './collections/InquirySubmissions.ts'
import { Media } from './collections/Media.ts'
import { Users } from './collections/Users.ts'
import { ensureDefaultProductCategories } from './lib/ensure-default-product-categories.ts'
import { createMetaDescriptionFromRichText } from './lib/richtext.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // 管理后台认证用户
  admin: {
    user: 'users',
    meta: {
      titleSuffix: '- Global Castle Admin',
    },
    components: {
      beforeNavLinks: ['./app/(payload)/components/AdminSidebarBrand'],
      graphics: {
        Logo: './app/(payload)/components/AdminLoginLogo',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  collections: [
    Users,
    Products,
    Categories,
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
      fields: ({ defaultFields }) =>
        defaultFields.map((field) => {
          if ('name' in field && field.name === 'description' && field.type === 'textarea') {
            const descriptionField = field as TextareaField

            return {
              ...descriptionField,
              admin: {
                ...descriptionField.admin,
                components: {
                  ...descriptionField.admin?.components,
                  Field: {
                    clientProps: {
                      hasGenerateDescriptionFn: true,
                    },
                    path: './app/(payload)/components/SafeMetaDescriptionField#default',
                  },
                },
              },
            } as TextareaField
          }

          return field
        }) as Field[],
      uploadsCollection: 'media',
      generateTitle: ({ doc }) => `${(doc as Record<string, string>)?.title || (doc as Record<string, string>)?.name || ''} | Global Castle`,
      generateDescription: ({ doc, collectionConfig }) => {
        const typedDoc = doc as Record<string, unknown>

        if (collectionConfig?.slug === 'blog-posts') {
          return typeof typedDoc.summary === 'string' ? typedDoc.summary : ''
        }

        if (collectionConfig?.slug === 'products') {
          return createMetaDescriptionFromRichText(typedDoc.description)
        }

        return typeof typedDoc.summary === 'string'
          ? typedDoc.summary
          : typeof typedDoc.description === 'string'
            ? typedDoc.description
            : ''
      },
    }),
  ],

  // 图片处理
  sharp,

  // 上传限制
  upload: {
    limits: {
      fileSize: 25 * 1024 * 1024, // 25MB
    },
  },

  onInit: async (payload) => {
    await ensureDefaultProductCategories(payload)
  },

  // TypeScript 类型输出
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  secret: process.env.PAYLOAD_SECRET || 'global-castle-dev-secret-change-in-production',
})
