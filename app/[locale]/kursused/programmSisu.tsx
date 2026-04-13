import type { ComponentType, SVGProps } from 'react'
import {
  BoltIcon,
  HandRaisedIcon,
  HeartIcon,
  ScaleIcon,
  SignalIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline'

/**
 * Õppe põhiteemad vastavalt õppekava jaotisele „7. Õppe sisu ja õppemeetodid“.
 * Tekstid tulevad tõlgetest: courses.programGuardSecurityItems, courses.programLeadItems.
 */
export type ProgrammGrupp = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  items: string[]
}

export type ProgrammGruppStructure = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  range: readonly [number, number]
}

export function buildProgrammGrupid(
  allItems: string[],
  structure: ProgrammGruppStructure[],
): ProgrammGrupp[] {
  return structure.map(({ Icon, range }) => ({
    Icon,
    items: allItems.slice(range[0], range[1]),
  }))
}

/**
 * Valvetöötaja ja turvatöötaja (tase 3/4): õiguslik alus → välitöö tegevused → füüsiline/kaitsevahendid
 * → side ja valveseadmed → tööohutus, abi, kontroll.
 */
export const programmValvetJaTurvatootajaGrupidStructure: ProgrammGruppStructure[] = [
  { Icon: ScaleIcon, range: [0, 3] },
  { Icon: BoltIcon, range: [3, 6] },
  { Icon: HandRaisedIcon, range: [6, 8] },
  { Icon: SignalIcon, range: [8, 10] },
  { Icon: HeartIcon, range: [10, 13] },
]

/**
 * Turvajuht (tase 5): õigus ja majandus → välitöö → enesekaitse/rekv → teenus ja juhtimine
 * → side/valve → ohutus, abi, kontroll.
 */
export const programmTurvajuhtGrupidStructure: ProgrammGruppStructure[] = [
  { Icon: ScaleIcon, range: [0, 3] },
  { Icon: BoltIcon, range: [3, 6] },
  { Icon: HandRaisedIcon, range: [6, 8] },
  { Icon: UserGroupIcon, range: [8, 10] },
  { Icon: SignalIcon, range: [10, 12] },
  { Icon: HeartIcon, range: [12, 15] },
]
