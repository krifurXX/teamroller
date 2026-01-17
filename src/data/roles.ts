import { Role } from '../types';

export const roles: Role[] = [
  {
    id: 'PL',
    name: 'Idéspruta',
    englishName: 'Plant',
    description: 'Kreativ problemlösare som kommer med nya idéer och innovativa lösningar.',
    strengths: [
      'Kreativ och fantasifull',
      'Löser svåra problem på okonventionella sätt',
      'Ser möjligheter där andra ser hinder',
    ],
    weaknesses: [
      'Kan ignorera praktiska detaljer',
      'Har ibland svårt att kommunicera idéer tydligt',
      'Kan fastna i egna tankegångar',
    ],
    tips: [
      'Ge utrymme för kreativt tänkande utan avbrott',
      'Be om konkreta exempel när idéer presenteras',
      'Koppla ihop med genomförare för att realisera idéer',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'CO',
    name: 'Samordnare',
    englishName: 'Coordinator',
    description: 'Naturlig ledare som får gruppen att arbeta mot gemensamma mål.',
    strengths: [
      'Bra på att delegera uppgifter',
      'Ser andras styrkor och potential',
      'Fattar beslut och håller fokus på målet',
    ],
    weaknesses: [
      'Kan uppfattas som manipulativ',
      'Delegerar ibland för mycket av sitt eget arbete',
      'Kan ta åt sig äran för gruppens arbete',
    ],
    tips: [
      'Låt samordnaren leda diskussioner och möten',
      'Ge tydliga ramar för beslutsfattande',
      'Uppmuntra till delat ledarskap när lämpligt',
    ],
    color: '#3B82F6',
  },
  {
    id: 'IM',
    name: 'Genomförare',
    englishName: 'Implementer',
    description: 'Praktisk och pålitlig person som omvandlar idéer till konkreta handlingar.',
    strengths: [
      'Disciplinerad och pålitlig',
      'Effektiv på att organisera arbete',
      'Omvandlar idéer till praktiska åtgärder',
    ],
    weaknesses: [
      'Kan vara oflexibel vid förändringar',
      'Motvillig att prova nya sätt',
      'Kan bli stressad av ostrukturerade situationer',
    ],
    tips: [
      'Ge tydliga instruktioner och deadlines',
      'Uppskatta deras förmåga att leverera',
      'Introducera förändringar gradvis',
    ],
    color: '#10B981',
  },
  {
    id: 'ME',
    name: 'Analyserare',
    englishName: 'Monitor Evaluator',
    description: 'Objektiv tänkare som analyserar alternativ och fattar välgrundade beslut.',
    strengths: [
      'Strategisk och objektiv',
      'Ser alla alternativ och konsekvenser',
      'Gör opartiska bedömningar',
    ],
    weaknesses: [
      'Kan uppfattas som överdrivet kritisk',
      'Saknar ibland inspiration och entusiasm',
      'Kan bromsa gruppens tempo med analyser',
    ],
    tips: [
      'Involvera vid viktiga beslut',
      'Ge tid för analys innan beslut',
      'Balansera med mer handlingsorienterade roller',
    ],
    color: '#6366F1',
  },
  {
    id: 'SP',
    name: 'Specialist',
    englishName: 'Specialist',
    description: 'Expert med djup kunskap inom sitt område som bidrar med teknisk kompetens.',
    strengths: [
      'Djup expertkunskap',
      'Engagerad och fokuserad',
      'Levererar på hög professionell nivå',
    ],
    weaknesses: [
      'Fokuserar endast på sitt expertområde',
      'Kan missa helhetsbilden',
      'Svårt att delegera inom sitt område',
    ],
    tips: [
      'Använd deras expertis för specifika problem',
      'Hjälp dem se hur deras bidrag passar helheten',
      'Ge möjlighet till fördjupning',
    ],
    color: '#F59E0B',
  },
  {
    id: 'RI',
    name: 'Kontaktskapare',
    englishName: 'Resource Investigator',
    description: 'Utåtriktad nätverkare som hittar resurser och möjligheter utanför gruppen.',
    strengths: [
      'Entusiastisk och kommunikativ',
      'Bra på att bygga nätverk',
      'Hittar nya möjligheter och kontakter',
    ],
    weaknesses: [
      'Tappar intresse efter initial entusiasm',
      'Kan vara överoptimistisk',
      'Följer inte alltid upp detaljer',
    ],
    tips: [
      'Ge uppgifter som kräver externa kontakter',
      'Hjälp dem att följa upp och slutföra',
      'Utnyttja deras energi i startfasen av projekt',
    ],
    color: '#EC4899',
  },
  {
    id: 'CF',
    name: 'Avslutare',
    englishName: 'Completer Finisher',
    description: 'Noggrann perfektionist som säkerställer kvalitet och att deadlines hålls.',
    strengths: [
      'Noggrann och detaljorienterad',
      'Upptäcker fel och brister',
      'Levererar i tid med hög kvalitet',
    ],
    weaknesses: [
      'Kan vara överdriven i sin perfektionism',
      'Har svårt att delegera',
      'Oroar sig ibland i onödan',
    ],
    tips: [
      'Ge ansvar för kvalitetskontroll',
      'Sätt realistiska kvalitetsnivåer',
      'Hjälp dem prioritera vad som är tillräckligt bra',
    ],
    color: '#14B8A6',
  },
  {
    id: 'SH',
    name: 'Pådrivare',
    englishName: 'Shaper',
    description: 'Dynamisk och målinriktad person som driver gruppen framåt under press.',
    strengths: [
      'Modig och handlingskraftig',
      'Utmanar och driver framåt',
      'Presterar bra under press',
    ],
    weaknesses: [
      'Kan uppfattas som otålig eller aggressiv',
      'Skapar ibland konflikter',
      'Kan såra andras känslor',
    ],
    tips: [
      'Kanalisera energin mot tydliga mål',
      'Ge konstruktiv feedback på kommunikation',
      'Använd deras driv i situationer som kräver handling',
    ],
    color: '#EF4444',
  },
];

export const getRoleById = (id: string): Role | undefined => {
  return roles.find((role) => role.id === id);
};
