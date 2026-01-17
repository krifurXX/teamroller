# CLAUDE.md - Teamroller

## Projektöversikt

Webbaserad React-app för teamrollsbedömning baserad på Belbins modell. Studenter svarar på 7 frågor och får sina två starkaste teamroller identifierade.

**Live:** https://teamroller.vercel.app
**Repo:** https://github.com/krifurXX/teamroller

## Teknisk stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS 3
- Vercel (hosting)
- Ingen backend - all logik körs i klienten

## Mappstruktur

```
src/
├── components/       # React-komponenter
│   ├── StartPage.tsx       # Introduktionssida
│   ├── QuestionPage.tsx    # Frågeformulär med poängfördelning
│   ├── ResultsPage.tsx     # Resultatvisning + kopieringsfunktion
│   ├── RoleCard.tsx        # Detaljerat rollkort
│   └── ProgressBar.tsx     # Progressindikator
├── data/
│   ├── questions.ts        # 7 frågor med 8 alternativ vardera
│   ├── roles.ts            # 8 rollbeskrivningar (styrkor, svagheter, tips)
│   └── scoringMatrix.ts    # Mappning: fråga → alternativ → roll
├── utils/
│   └── calculateResults.ts # Beräkningslogik + localStorage
└── types/
    └── index.ts            # TypeScript-typer
```

## Viktiga filer

### scoringMatrix.ts
Kritisk fil som mappar varje svarsalternativ till rätt teamroll. Verifierad mot PDF:en `TEAMROLLER poängsammanställning.pdf`.

```typescript
// Format: fråga -> bokstav -> roll
1: { A: 'RI', B: 'SP', C: 'PL', D: 'CO', E: 'CF', F: 'SH', G: 'IM', H: 'ME' }
```

### De 8 rollerna (RoleId)
- `PL` - Idéspruta (Plant)
- `CO` - Samordnare (Coordinator)
- `IM` - Genomförare (Implementer)
- `ME` - Analyserare (Monitor Evaluator)
- `SP` - Specialist
- `RI` - Kontaktskapare (Resource Investigator)
- `CF` - Avslutare (Completer Finisher)
- `SH` - Pådrivare (Shaper)

## Applikationsflöde

1. **StartPage** → Introduktion, disclaimer, "Starta testet"
2. **QuestionPage** × 7 → Fördela 10 poäng mellan 8 alternativ per fråga
3. **ResultsPage** → Topp 2 roller med detaljer + stapeldiagram för alla roller

## Dataflöde

```
Användarsvar (Answer[])
  → calculateResults()
  → RoleScore[] (sorterat efter poäng)
  → Topp 2 visas som huvudresultat
```

## localStorage

- Nyckel: `teamroller_answers`
- Sparar automatiskt efter varje fråga
- Möjliggör att återuppta testet

## Kommandon

```bash
npm run dev      # Starta utvecklingsserver
npm run build    # Bygg för produktion
vercel --prod    # Deploya till Vercel
```

## Konventioner

- **Språk i kod:** Engelska (variabler, funktioner, kommentarer)
- **Språk i UI:** Svenska
- **Styling:** Tailwind CSS utility-klasser direkt i JSX
- **State:** React useState + useEffect (inget externt state management)

## Validering

- Summan av poäng per fråga måste vara exakt 10
- Nästa-knappen är disabled tills validering passerar
- Visuell feedback: grön (valid) / orange (invalid)

## PDF-dokumentation

- `TEAMROLLER TESTFRÅGOR.pdf` - Originalfrågorna på svenska
- `TEAMROLLER poängsammanställning.pdf` - Poängmappningstabellen

Vid ändringar i frågor eller poängsättning, verifiera alltid mot dessa PDF:er.
