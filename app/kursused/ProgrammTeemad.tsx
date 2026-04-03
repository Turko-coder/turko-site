import type { ProgrammGrupp } from './programmSisu'

type Props = {
  grupid: ProgrammGrupp[]
  /** Vahe iga teemakaardi vahel (Tailwind klassid). */
  kaartideVahe?: string
  /** Vaikimisi täpploend; „number“ — järjekorranumbrid kõigis gruppides. */
  loendiStiil?: 'number' | 'bullet'
}

export function ProgrammTeemad({
  grupid,
  kaartideVahe = 'space-y-4',
  loendiStiil = 'bullet',
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
            className="flex w-full flex-col items-start gap-4 rounded-xl border border-gray-200 bg-white p-8 min-[551px]:flex-row min-[551px]:items-center min-[551px]:gap-6"
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full"
              style={{ backgroundColor: '#E7F1FF', color: '#2F6BDE' }}
            >
              <Icon className="h-10 w-10" aria-hidden />
            </div>
            <div className="w-full min-w-0 min-[551px]:flex-1">
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
