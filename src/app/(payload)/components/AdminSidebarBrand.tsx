import Image from 'next/image'

export default function AdminSidebarBrand() {
  return (
    <div className="gc-admin-sidebar-brand">
      <Image
        src="/logo-teal.png"
        alt="Global Castle"
        className="gc-admin-sidebar-brand__logo"
        width={352}
        height={63}
        unoptimized
      />
      <div className="gc-admin-sidebar-brand__copy">
        <span className="gc-admin-sidebar-brand__title">Global Castle</span>
        <span className="gc-admin-sidebar-brand__meta">B2B drinkware CMS</span>
      </div>
    </div>
  )
}
