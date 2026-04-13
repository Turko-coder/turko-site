import type { ProgrammGrupp } from './programmSisu'

type Props = {
  grupid: ProgrammGrupp[]
  /** Vahe iga teemakaardi vahel (Tailwind klassid). */
  kaartideVahe?: string
  /** Vaikimisi täpploend; „number“ — järjekorranumbrid kõigis gruppides. */
  loendiStiil?: 'number' | 'bullet'
  variant?: 'default' | 'guard' | 'security' | 'lead'
}

const iconCircleClasses: Record<string, string> = {
  default: 'bg-accent-bg text-accent-text',
  guard: 'bg-course-guard-50 text-course-guard-700',
  security: 'bg-course-security-50 text-course-security-700',
  lead: 'bg-course-lead-50 text-course-lead-700',
}

export function ProgrammTeemad({
  grupid,
  kaartideVahe = 'space-y-4',
  loendiStiil = 'bullet',
  variant = 'default',
}: Props) {
  return (
    <div className={kaartideVahe}>
      {grupid.map((grupp, gruppIdx) => {
        const { Icon, items } = grupp
        const eelnevateArv = grupid
          .slice(0, gruppIdx)
          .reduce((sum, g) => sum + g.items.length, 0)
        return (
          <div
            key={gruppIdx}
            className="flex w-full flex-col items-start gap-4 rounded-xl shadow-sm border border-gray-200 bg-white p-6 md:p-8 sm:flex-row sm:items-center sm:gap-6"
          >
            <div
              className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full sm:h-20 sm:w-20 ${iconCircleClasses[variant]}`}
            >
              <Icon className="h-7 w-7 sm:h-10 sm:w-10" aria-hidden />
            </div>
            <div className="w-full min-w-0 sm:flex-1">
              {loendiStiil === 'bullet' ? (
                <ul className="list-outside list-disc space-y-3 pl-5 marker:text-gray-900">
                  {items.map((rida, i) => (
                    <li
                      key={`${gruppIdx}-${i}-${rida}`}
                      className="font-medium leading-relaxed text-gray-900"
                    >
                      {rida}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="space-y-3">
                  {items.map((rida, i) => {
                    const nr = eelnevateArv + i + 1
                    return (
                      <p
                        key={`${nr}-${rida}`}
                        className="font-medium leading-relaxed text-gray-900"
                      >
                        {`${nr}. ${rida}`}
                      </p>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
