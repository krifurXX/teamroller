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
│   ├── ResultsPage.tsx     # Resultatvisning + export
│   ├── RoleCard.tsx        # Detaljerat rollkort med ikon
│   └── ProgressBar.tsx     # Progressindikator
├── data/
│   ├── questions.ts        # 7 frågor med 8 alternativ vardera
│   ├── roles.ts            # 8 rollbeskrivningar (styrkor, svagheter, tips, ikoner)
│   └── scoringMatrix.ts    # Mappning: fråga → alternativ → roll
├── utils/
│   └── calculateResults.ts # Beräkningslogik + localStorage
├── types/
│   └── index.ts            # TypeScript-typer
└── index.css               # Tailwind + animationer
```

## Funktioner

### Kärnfunktioner
- **7 frågor** med poängfördelning (summa = 10)
- **8 teamroller** med ikoner, beskrivningar, styrkor, svagheter och tips
- **Automatisk sparning** i localStorage
- **Resultatvisning** med topp 2 roller och stapeldiagram

### UX-förbättringar
- **Frågeöversikt** - "Visa alla frågor" för att hoppa mellan frågor
- **Förklaringstext** - Instruktion på varje fråga
- **Animationer** - Smooth övergångar mellan frågor och på resultatsidan
- **Rollikoner** - Emoji för snabb igenkänning (💡🚀👑⚙️🔍🎓🤝✅)

### Tillgänglighet
- Aria-labels på alla interaktiva element
- Fokushantering vid frågebyte
- Semantisk HTML-struktur

### Export
- **Kopiera resultat** - Fullständig textrapport med ASCII-diagram
- **Ladda ner PDF** - Öppnar utskriftsvänlig HTML för print-to-PDF

## Viktiga filer

### scoringMatrix.ts
Kritisk fil som mappar varje svarsalternativ till rätt teamroll. Verifierad mot PDF:en `TEAMROLLER poängsammanställning.pdf`.

```typescript
// Format: fråga -> bokstav -> roll
1: { A: 'RI', B: 'SP', C: 'PL', D: 'CO', E: 'CF', F: 'SH', G: 'IM', H: 'ME' }
```

### De 8 rollerna (RoleId + ikon)
- `PL` 💡 Idéspruta (Plant)
- `CO` 👑 Samordnare (Coordinator)
- `IM` ⚙️ Genomförare (Implementer)
- `ME` 🔍 Analyserare (Monitor Evaluator)
- `SP` 🎓 Specialist
- `RI` 🤝 Kontaktskapare (Resource Investigator)
- `CF` ✅ Avslutare (Completer Finisher)
- `SH` 🚀 Pådrivare (Shaper)

## Applikationsflöde

1. **StartPage** → Introduktion, disclaimer, "Starta testet"
2. **QuestionPage** × 7 → Fördela 10 poäng mellan 8 alternativ per fråga
   - Frågeöversikt för navigation
   - Förklaringstext för poängfördelning
   - Animerad övergång mellan frågor
3. **ResultsPage** → Topp 2 roller med detaljer + stapeldiagram
   - Kopiera textrapport
   - Ladda ner som PDF

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

## Animationer (index.css)

```css
.animate-fade-in   /* Fade in från opacity 0 */
.animate-slide-up  /* Slide up + fade in */
```

Används på:
- Frågeövergångar (slide)
- Resultatkomponenter (staggered fade-in)

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
- **Ikoner:** SVG inline för UI, emoji för roller

## Validering

- Summan av poäng per fråga måste vara exakt 10
- Nästa-knappen är disabled tills validering passerar
- Visuell feedback: grön (valid) / orange (invalid)
- Frågeöversikten visar status: grön (klar), orange (påbörjad), grå (ej besvarad)

## PDF-dokumentation

- `TEAMROLLER TESTFRÅGOR.pdf` - Originalfrågorna på svenska
- `TEAMROLLER poängsammanställning.pdf` - Poängmappningstabellen

Vid ändringar i frågor eller poängsättning, verifiera alltid mot dessa PDF:er.
