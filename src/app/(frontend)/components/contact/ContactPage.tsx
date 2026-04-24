import Link from 'next/link'

import ContactInquiryForm from './ContactInquiryForm'
import {
  CONTACT_DETAILS,
  CONTACT_HERO,
  INQUIRY_SIDEBAR,
  LOGISTICS_COORDINATION,
  RESPONSE_COMMITMENT,
} from './contact-data'

const OFFICE_MAP_EMBED_URL =
  'https://www.google.com/maps?q=30.283212,120.179958&hl=en&z=16&output=embed'

function ArrowIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  )
}

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#071722] pt-28 text-white sm:pt-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,134,139,0.18),transparent_34%),linear-gradient(180deg,#0a2130_0%,#071722_58%,#09141b_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8 lg:pb-16">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#00868b]">
              {CONTACT_HERO.eyebrow}
            </p>
            <h1 className="mt-6 max-w-3xl text-[3rem] font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-[4rem] lg:text-[4.7rem]">
              {CONTACT_HERO.title}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#bfd0d7] sm:text-lg">
              {CONTACT_HERO.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href={CONTACT_HERO.primaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-[#00868b] px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#006d72]"
              >
                <span>{CONTACT_HERO.primaryCta.label}</span>
                <ArrowIcon />
              </Link>
              <Link
                href={CONTACT_HERO.secondaryCta.href}
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border border-white/16 bg-white/6 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/10"
              >
                <span>{CONTACT_HERO.secondaryCta.label}</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3 lg:gap-5">
            {CONTACT_HERO.promises.map((item) => (
              <article
                key={item.label}
                className="border-l border-[#25515b] pl-5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00868b]">
                  {item.label}
                </p>
                <p className="mt-5 text-sm leading-7 text-[#d2dde1]">{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="project-inquiry"
        className="scroll-mt-28 bg-[linear-gradient(180deg,#09141b_0%,#101e27_100%)] py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-[1.22fr_0.78fr] xl:items-start">
            <ContactInquiryForm />

            <div className="grid gap-6">
              <aside className="rounded-[4px] border border-[#1e3944] bg-[#0d1d27] p-6 text-white shadow-[0_18px_48px_rgba(4,17,24,0.22)] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#00868b]">
                  {CONTACT_DETAILS.eyebrow}
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
                  {CONTACT_DETAILS.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#afc0c8]">
                  {CONTACT_DETAILS.description}
                </p>

                <div className="mt-7 space-y-4">
                  {CONTACT_DETAILS.cards.map((card) => (
                    <div key={card.label} className="border-t border-white/10 pt-4 first:border-t-0 first:pt-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#00868b]">
                        {card.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">{card.value}</p>
                      <p className="mt-2 text-sm leading-6 text-[#9fb4bc]">{card.note}</p>
                    </div>
                  ))}
                </div>
              </aside>

              <aside className="rounded-[4px] border border-[#c5d4db] bg-[#edf4f7] p-6 text-[#1d2f3b] sm:p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#006d72]">
                  Buyer Guidance
                </p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[#15242d]">
                  {INQUIRY_SIDEBAR.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-[#4f6470]">
                  {INQUIRY_SIDEBAR.description}
                </p>

                <div className="mt-7 space-y-6">
                  {INQUIRY_SIDEBAR.bulletGroups.map((group) => (
                    <div key={group.title} className="border-l border-[#9fc9cf] pl-4">
                      <h3 className="text-lg font-semibold text-[#15242d]">{group.title}</h3>
                      <div className="mt-4 space-y-3">
                        {group.items.map((item) => (
                          <div key={item} className="flex gap-3 text-sm leading-6 text-[#4f6470]">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#006d72]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eef5f7] py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#006d72]">
              Response and Coordination
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#13232c] sm:text-4xl">
              A clear inquiry should lead to a practical next-step discussion.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5a6d79] sm:text-base">
              We keep the follow-up focused on the details professional buyers usually need first:
              response timing, product direction, sample path, and shipment coordination.
            </p>
          </div>

          <div className="space-y-6">
            <div className="grid gap-5 md:grid-cols-3">
              {RESPONSE_COMMITMENT.map((item) => (
                <article
                  key={item.title}
                  className="rounded-[4px] border border-[#d0dde3] bg-white p-6 shadow-[0_16px_36px_rgba(10,32,46,0.05)]"
                >
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-[#13232c]">{item.window}</p>
                  <h3 className="mt-4 text-base font-semibold uppercase tracking-[0.14em] text-[#006d72]">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#5a6d79]">{item.detail}</p>
                </article>
              ))}
            </div>

            <div className="rounded-[4px] border border-[#d0dde3] bg-white p-6 shadow-[0_16px_36px_rgba(10,32,46,0.05)] sm:p-7">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#006d72]">
                  {LOGISTICS_COORDINATION.eyebrow}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[#13232c]">
                  {LOGISTICS_COORDINATION.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[#5a6d79]">
                  {LOGISTICS_COORDINATION.description}
                </p>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {LOGISTICS_COORDINATION.items.map((item) => (
                  <div key={item} className="border-l border-[#b7d4d8] pl-4">
                    <p className="text-sm leading-7 text-[#324754]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-14 lg:px-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#006d72]">
              Factory and Office Location
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#13232c] sm:text-4xl">
              Visit coordination can be planned once product direction and meeting scope are clear.
            </h2>
            <p className="mt-5 text-sm leading-7 text-[#5a6d79] sm:text-base">
              For buyers arranging a video call, office visit, or factory-side discussion, the map
              below provides the reference point already used across the site. Visit schedules can
              be coordinated alongside product review, sample planning, and export discussion.
            </p>
          </div>

          <div className="overflow-hidden rounded-[4px] border border-[#d2dee4] bg-[#edf4f7] shadow-[0_16px_36px_rgba(10,32,46,0.05)]">
            <iframe
              title="Global Castle office and factory location"
              src={OFFICE_MAP_EMBED_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0 lg:h-[460px]"
            />
          </div>
        </div>
      </section>
    </>
  )
}
