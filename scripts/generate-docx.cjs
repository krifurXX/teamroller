const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, LevelFormat, PageBreak } = require('docx');
const fs = require('fs');

const roles = [
  {
    id: 'PL', name: 'Idéspruta', englishName: 'Plant', icon: '💡',
    description: 'Kreativ problemlösare som kommer med nya idéer och innovativa lösningar.',
    strengths: ['Kreativ och fantasifull', 'Löser svåra problem på okonventionella sätt', 'Ser möjligheter där andra ser hinder'],
    weaknesses: ['Kan ignorera praktiska detaljer', 'Har ibland svårt att kommunicera idéer tydligt', 'Kan fastna i egna tankegångar'],
    tips: ['Ta dig tid att tänka fritt innan du delar idéer med gruppen', 'Öva på att konkretisera dina idéer med exempel och nästa steg', 'Samarbeta med en genomförare för att omvandla idéer till handling']
  },
  {
    id: 'CO', name: 'Samordnare', englishName: 'Coordinator', icon: '👑',
    description: 'Naturlig ledare som får gruppen att arbeta mot gemensamma mål.',
    strengths: ['Bra på att delegera uppgifter', 'Ser andras styrkor och potential', 'Fattar beslut och håller fokus på målet'],
    weaknesses: ['Kan uppfattas som manipulativ', 'Delegerar ibland för mycket av sitt eget arbete', 'Kan ta åt sig äran för gruppens arbete'],
    tips: ['Använd din förmåga att se andras styrkor för att fördela uppgifter', 'Var tydlig med mål och förväntningar när du delegerar', 'Ge erkännande till andra för deras bidrag']
  },
  {
    id: 'SH', name: 'Pådrivare', englishName: 'Shaper', icon: '🚀',
    description: 'Dynamisk och målinriktad person som driver gruppen framåt under press.',
    strengths: ['Modig och handlingskraftig', 'Utmanar och driver framåt', 'Presterar bra under press'],
    weaknesses: ['Kan uppfattas som otålig eller aggressiv', 'Skapar ibland konflikter', 'Kan såra andras känslor'],
    tips: ['Rikta din energi mot gruppens gemensamma mål', 'Var uppmärksam på hur din kommunikation påverkar andra', 'Använd ditt driv för att hjälpa gruppen övervinna hinder']
  },
  {
    id: 'IM', name: 'Genomförare', englishName: 'Implementer', icon: '⚙️',
    description: 'Praktisk och pålitlig person som omvandlar idéer till konkreta handlingar.',
    strengths: ['Disciplinerad och pålitlig', 'Effektiv på att organisera arbete', 'Omvandlar idéer till praktiska åtgärder'],
    weaknesses: ['Kan vara oflexibel vid förändringar', 'Motvillig att prova nya sätt', 'Kan bli stressad av ostrukturerade situationer'],
    tips: ['Be om tydliga mål och deadlines när du får nya uppgifter', 'Var öppen för att prova nya arbetssätt ibland', 'Använd din organisationsförmåga för att hjälpa gruppen strukturera arbetet']
  },
  {
    id: 'RI', name: 'Kontaktskapare', englishName: 'Resource Investigator', icon: '🤝',
    description: 'Utåtriktad nätverkare som hittar resurser och möjligheter utanför gruppen.',
    strengths: ['Entusiastisk och kommunikativ', 'Bra på att bygga nätverk', 'Hittar nya möjligheter och kontakter'],
    weaknesses: ['Tappar intresse efter initial entusiasm', 'Kan vara överoptimistisk', 'Följer inte alltid upp detaljer'],
    tips: ['Använd din energi i projektets startfas för att skapa momentum', 'Sätt upp påminnelser för att följa upp kontakter och idéer', 'Dela ditt nätverk och dina upptäckter med gruppen']
  },
  {
    id: 'ME', name: 'Analyserare', englishName: 'Monitor Evaluator', icon: '🔍',
    description: 'Objektiv tänkare som analyserar alternativ och fattar välgrundade beslut.',
    strengths: ['Strategisk och objektiv', 'Ser alla alternativ och konsekvenser', 'Gör opartiska bedömningar'],
    weaknesses: ['Kan uppfattas som överdrivet kritisk', 'Saknar ibland inspiration och entusiasm', 'Kan bromsa gruppens tempo med analyser'],
    tips: ['Dela dina analyser tidigt så gruppen hinner ta till sig dem', 'Balansera kritik med konstruktiva förslag', 'Var medveten om att ditt tempo kan skilja sig från gruppens']
  },
  {
    id: 'TW', name: 'Lagarbetare', englishName: 'Teamworker', icon: '👥',
    description: 'Samarbetsinriktad person som bygger relationer och förebygger konflikter.',
    strengths: ['Samarbetsvillig och diplomatisk', 'Lyssnar aktivt och förstår andras perspektiv', 'Skapar bra stämning och minskar friktion i gruppen'],
    weaknesses: ['Kan vara obeslutsam i kritiska lägen', 'Undviker konfrontation även när det behövs', 'Har svårt att ta ställning när gruppen är oenig'],
    tips: ['Använd din förmåga att läsa av stämningen för att förebygga konflikter', 'Öva på att uttrycka din egen åsikt även när den skiljer sig från gruppens', 'Påminn dig själv att konstruktiv konflikt ibland är nödvändig för bra beslut']
  },
  {
    id: 'CF', name: 'Avslutare', englishName: 'Completer Finisher', icon: '✅',
    description: 'Noggrann perfektionist som säkerställer kvalitet och att deadlines hålls.',
    strengths: ['Noggrann och detaljorienterad', 'Upptäcker fel och brister', 'Levererar i tid med hög kvalitet'],
    weaknesses: ['Kan vara överdriven i sin perfektionism', 'Har svårt att delegera', 'Oroar sig ibland i onödan'],
    tips: ['Bestäm i förväg vad som är "tillräckligt bra" för uppgiften', 'Delegera delar av kvalitetskontrollen till andra', 'Använd din noggrannhet där den gör störst nytta']
  }
];

function createRoleSection(role, isLast, bulletRef) {
  const children = [
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(`${role.icon} ${role.name} (${role.englishName})`)] }),
    new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: role.description, italics: true })] }),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Styrkor')] }),
    ...role.strengths.map(s => new Paragraph({ numbering: { reference: bulletRef, level: 0 }, children: [new TextRun(s)] })),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Svagheter')] }),
    ...role.weaknesses.map(w => new Paragraph({ numbering: { reference: bulletRef, level: 0 }, children: [new TextRun(w)] })),
    new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('Tips till dig')] }),
    ...role.tips.map(t => new Paragraph({ numbering: { reference: bulletRef, level: 0 }, children: [new TextRun(t)] }))
  ];
  if (!isLast) children.push(new Paragraph({ children: [new PageBreak()] }));
  return children;
}

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 24 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, color: '1E3A5F', font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, color: '2E5A8F', font: 'Arial' },
        paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 1 } }
    ]
  },
  numbering: {
    config: [{ reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, alignment: AlignmentType.CENTER, children: [new TextRun({ text: 'Teamroller', bold: true, size: 56 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 }, children: [new TextRun({ text: 'Beskrivningar av de 8 teamrollerna enligt Belbins modell', size: 24, color: '666666' })] }),
      new Paragraph({ children: [new PageBreak()] }),
      ...roles.flatMap((role, i) => createRoleSection(role, i === roles.length - 1, 'bullets'))
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/Users/krifur/Documents/teamroller/Teamroller-beskrivningar.docx', buffer);
  console.log('Created: Teamroller-beskrivningar.docx');
});
