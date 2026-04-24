import Image from 'next/image'

export default function AdminLoginLogo() {
  return (
    <div className="gc-admin-login-brand">
      <Image
        src="/logo-teal.png"
        alt="Global Castle"
        className="gc-admin-login-brand__logo"
        width={260}
        height={76}
      />
      <div className="gc-admin-login-brand__copy">
        <span className="gc-admin-login-brand__eyebrow">Global Castle</span>
        <span className="gc-admin-login-brand__title">Content Administration</span>
        <span className="gc-admin-login-brand__meta">
          Product catalog, inquiries, and export-facing content operations
        </span>
      </div>
    </div>
  )
}
