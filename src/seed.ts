/**
 * 种子数据脚本（REST API 方式）
 *
 * 使用方法：
 *   1. 确保 pnpm dev 正在运行（http://localhost:3000）
 *   2. 修改下方 EMAIL / PASSWORD 为管理员账号
 *   3. pnpm tsx src/seed.ts
 *
 * 已写入数据（2026-04-07）：
 *   - 11 个 Categories
 *   - 7 个 CapacityRanges
 *   - 10 个 Applications
 */

const BASE_URL = 'http://localhost:3000'
const EMAIL = 'sales@cnurbaneco.com'
const PASSWORD = 'Si287100'

const CATEGORIES = [
  { name: 'Stainless Steel Bottles', sortOrder: 1 },
  { name: 'Aluminum Bottles', sortOrder: 2 },
  { name: 'Plastic Bottles', sortOrder: 3 },
  { name: 'Ceramic Mugs', sortOrder: 4 },
  { name: 'Glass Bottles', sortOrder: 5 },
  { name: 'Tumblers', sortOrder: 6 },
  { name: 'Travel Mugs', sortOrder: 7 },
  { name: 'Sports Bottles', sortOrder: 8 },
  { name: 'Kids Bottles', sortOrder: 9 },
  { name: 'Eco-Friendly', sortOrder: 10 },
  { name: 'Custom Drinkware', sortOrder: 11 },
]

const CAPACITY_RANGES = [
  { name: 'Under 300ml', minMl: 0, maxMl: 300 },
  { name: '300–500ml', minMl: 300, maxMl: 500 },
  { name: '500–700ml', minMl: 500, maxMl: 700 },
  { name: '700ml–1L', minMl: 700, maxMl: 1000 },
  { name: '1L–1.5L', minMl: 1000, maxMl: 1500 },
  { name: '1.5L–2L', minMl: 1500, maxMl: 2000 },
  { name: 'Over 2L', minMl: 2000, maxMl: 9999 },
]

const APPLICATIONS = [
  'Corporate Gifts', 'Retail & Wholesale', 'Coffee Chains',
  'Outdoor & Sports', 'Promotional Items', 'Hotel & Hospitality',
  'School & Campus', 'Health & Fitness', 'Eco & Sustainability',
  'Private Label',
]

async function post(token: string, collection: string, data: object) {
  const res = await fetch(`${BASE_URL}/api/${collection}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  })
  return res.json() as Promise<{ doc?: { name?: string }; errors?: unknown[] }>
}

async function seed() {
  // 登录
  const loginRes = await fetch(`${BASE_URL}/api/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  })
  const { token } = (await loginRes.json()) as { token?: string }
  if (!token) throw new Error('Login failed — check email/password')

  console.log('\n🌱 Starting seed...\n')

  console.log('📂 Categories...')
  for (const cat of CATEGORIES) {
    const r = await post(token, 'categories', cat)
    console.log(r.doc ? `  ✓ ${r.doc.name}` : `  ✗ ${JSON.stringify(r)}`)
  }

  console.log('\n📏 CapacityRanges...')
  for (const range of CAPACITY_RANGES) {
    const r = await post(token, 'capacity-ranges', range)
    console.log(r.doc ? `  ✓ ${r.doc.name}` : `  ✗ ${JSON.stringify(r)}`)
  }

  console.log('\n🎯 Applications...')
  for (const name of APPLICATIONS) {
    const r = await post(token, 'applications', { name })
    console.log(r.doc ? `  ✓ ${r.doc.name}` : `  ✗ ${JSON.stringify(r)}`)
  }

  console.log('\n✅ Seed complete!\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err)
  process.exit(1)
})
