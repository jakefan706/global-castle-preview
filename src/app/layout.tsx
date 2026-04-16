// 根布局 — 不输出任何 HTML 结构
// (frontend) 和 (payload) 各自有独立的根布局，各自输出 <html><body>
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
