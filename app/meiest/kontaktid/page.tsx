import { redirect } from 'next/navigation'

export default function KontaktidLegacyRedirect({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>
}) {
  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (typeof value === 'string') qs.set(key, value)
    else if (Array.isArray(value)) value.forEach((v) => qs.append(key, v))
  }

  const suffix = qs.toString()
  redirect(suffix ? `/kontaktid?${suffix}` : '/kontaktid')
}
