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
 * Ühistel teemadel on kõigil kursustel sama sõnastus.
 */
export const programmValvetJaTurvatootaja: string[] = [
  'Turvateenistuse korraldamise ja turvategevuse õiguslikud alused',
  'Turvategevust ja turvaettevõtlust reguleerivad õigusaktid',
  'Töösuhteid reguleerivad õigusaktid',
  'Turvatöö tehnoloogia ja taktika',
  'Tegutsemine sündmuskohal, massiüritustel ja eriolukordades',
  'Narkomaania ja narkojoobes isiku äratundmine, seisundi hindamine ja käitumine',
  'Enesekaitse alused',
  'Relvad ja erivahendid',
  'Side- ja infotehnoloogia',
  'Valveseadmestike tööpõhimõtted ja käsitsemine',
  'Töökeskkonna ohutus',
  'Erakorraline meditsiiniline abi',
  'Kontrolltestimine',
]

export type ProgrammGrupp = {
  Icon: ComponentType<SVGProps<SVGSVGElement>>
  items: string[]
}

/**
 * Valvetöötaja ja turvatöötaja (tase 3/4): õiguslik alus → välitöö tegevused → füüsiline/kaitsevahendid
 * → side ja valveseadmed → tööohutus, abi, kontroll.
 */
export const programmValvetJaTurvatootajaGrupid: ProgrammGrupp[] = [
  { Icon: ScaleIcon, items: programmValvetJaTurvatootaja.slice(0, 3) },
  { Icon: BoltIcon, items: programmValvetJaTurvatootaja.slice(3, 6) },
  { Icon: HandRaisedIcon, items: programmValvetJaTurvatootaja.slice(6, 8) },
  { Icon: SignalIcon, items: programmValvetJaTurvatootaja.slice(8, 10) },
  { Icon: HeartIcon, items: programmValvetJaTurvatootaja.slice(10, 13) },
]

export const programmTurvajuhtTase5: string[] = [
  'Turvateenistuse korraldamise ja turvategevuse õiguslikud alused',
  'Turvategevust ja turvaettevõtlust reguleerivad õigusaktid',
  'Tööõiguse ja majanduse alused',
  'Turvatöö tehnoloogia ja taktika',
  'Turvatöötaja ja turvajuhi tegutsemine sündmuskohal, massiüritustel ja eriolukordades',
  'Narkomaania ja narkojoobes isiku äratundmine, seisundi hindamine ja käitumine',
  'Enesekaitse alused',
  'Relvad ja erivahendid',
  'Klienditeenindus',
  'Juhtimine ja meeskonnatöö',
  'Side- ja infotehnoloogia',
  'Valveseadmestike tööpõhimõtted ja käsitsemine',
  'Töökeskkonna ohutus',
  'Erakorraline meditsiiniline abi',
  'Kontrolltestimine',
]

/**
 * Turvajuht (tase 5): õigus ja majandus → välitöö → enesekaitse/rekv → teenus ja juhtimine
 * → side/valve → ohutus, abi, kontroll.
 */
export const programmTurvajuhtGrupid: ProgrammGrupp[] = [
  { Icon: ScaleIcon, items: programmTurvajuhtTase5.slice(0, 3) },
  { Icon: BoltIcon, items: programmTurvajuhtTase5.slice(3, 6) },
  { Icon: HandRaisedIcon, items: programmTurvajuhtTase5.slice(6, 8) },
  { Icon: UserGroupIcon, items: programmTurvajuhtTase5.slice(8, 10) },
  { Icon: SignalIcon, items: programmTurvajuhtTase5.slice(10, 12) },
  { Icon: HeartIcon, items: programmTurvajuhtTase5.slice(12, 15) },
]
