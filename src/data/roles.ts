import { Role } from '../types';

export const roles: Role[] = [
  {
    id: 'PL',
    name: 'Idéspruta',
    englishName: 'Plant',
    icon: '💡',
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
      'Ta dig tid att tänka fritt innan du delar idéer med gruppen',
      'Öva på att konkretisera dina idéer med exempel och nästa steg',
      'Samarbeta med en genomförare för att omvandla idéer till handling',
    ],
    color: '#8B5CF6',
  },
  {
    id: 'CO',
    name: 'Samordnare',
    englishName: 'Coordinator',
    icon: '👑',
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
      'Använd din förmåga att se andras styrkor för att fördela uppgifter',
      'Var tydlig med mål och förväntningar när du delegerar',
      'Ge erkännande till andra för deras bidrag',
    ],
    color: '#3B82F6',
  },
  {
    id: 'IM',
    name: 'Genomförare',
    englishName: 'Implementer',
    icon: '⚙️',
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
      'Be om tydliga mål och deadlines när du får nya uppgifter',
      'Var öppen för att prova nya arbetssätt ibland',
      'Använd din organisationsförmåga för att hjälpa gruppen strukturera arbetet',
    ],
    color: '#10B981',
  },
  {
    id: 'ME',
    name: 'Analyserare',
    englishName: 'Monitor Evaluator',
    icon: '🔍',
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
      'Dela dina analyser tidigt så gruppen hinner ta till sig dem',
      'Balansera kritik med konstruktiva förslag',
      'Var medveten om att ditt tempo kan skilja sig från gruppens',
    ],
    color: '#6366F1',
  },
  {
    id: 'SP',
    name: 'Specialist',
    englishName: 'Specialist',
    icon: '🎓',
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
      'Förklara din expertis på ett sätt som andra förstår',
      'Hjälp gruppen se hur ditt område bidrar till helheten',
      'Var öppen för att lära dig om angränsande områden',
    ],
    color: '#F59E0B',
  },
  {
    id: 'RI',
    name: 'Kontaktskapare',
    englishName: 'Resource Investigator',
    icon: '🤝',
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
      'Använd din energi i projektets startfas för att skapa momentum',
      'Sätt upp påminnelser för att följa upp kontakter och idéer',
      'Dela ditt nätverk och dina upptäckter med gruppen',
    ],
    color: '#EC4899',
  },
  {
    id: 'CF',
    name: 'Avslutare',
    englishName: 'Completer Finisher',
    icon: '✅',
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
      'Bestäm i förväg vad som är "tillräckligt bra" för uppgiften',
      'Delegera delar av kvalitetskontrollen till andra',
      'Använd din noggrannhet där den gör störst nytta',
    ],
    color: '#14B8A6',
  },
  {
    id: 'SH',
    name: 'Pådrivare',
    englishName: 'Shaper',
    icon: '🚀',
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
      'Rikta din energi mot gruppens gemensamma mål',
      'Var uppmärksam på hur din kommunikation påverkar andra',
      'Använd ditt driv för att hjälpa gruppen övervinna hinder',
    ],
    color: '#EF4444',
  },
];

export const getRoleById = (id: string): Role | undefined => {
  return roles.find((role) => role.id === id);
};
