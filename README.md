# Teamroller

En webbaserad React-app där studenter svarar på 7 frågor för att identifiera sina två starkaste teamroller (Belbin-inspirerat).

**Live demo:** https://teamroller.vercel.app

## Funktioner

- **7 frågor** med poängfördelning (fördela 10 poäng mellan 8 alternativ per fråga)
- **8 teamroller** baserade på Belbins teamrollsmodell
- **Automatisk sparning** i localStorage (kan återuppta testet)
- **Detaljerade resultat** med styrkor, fallgropar och samarbetstips
- **Kopiera resultat** som fullständig textrapport
- **Mobilanpassad** design

## De 8 teamrollerna

| Roll | Engelska | Beskrivning |
|------|----------|-------------|
| Idéspruta | Plant (PL) | Kreativ problemlösare med nya idéer |
| Samordnare | Coordinator (CO) | Naturlig ledare som delegerar |
| Genomförare | Implementer (IM) | Praktisk person som får saker gjorda |
| Analyserare | Monitor Evaluator (ME) | Objektiv tänkare som väger alternativ |
| Specialist | Specialist (SP) | Expert med djup kunskap |
| Kontaktskapare | Resource Investigator (RI) | Nätverkare som hittar möjligheter |
| Avslutare | Completer Finisher (CF) | Noggrann perfektionist |
| Pådrivare | Shaper (SH) | Dynamisk person som driver framåt |

## Teknisk stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- Vercel (hosting)

## Utveckling

```bash
# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev

# Bygg för produktion
npm run build
```

## Poängsättning

Varje fråga har 8 alternativ (A-H) som mappas till de 8 rollerna. Poängen summeras per roll över alla 7 frågor. De två rollerna med högst poäng visas som användarens starkaste teamroller.

## Disclaimer

Detta är ett verktyg för självreflektion, inte ett vetenskapligt personlighetstest. Resultatet speglar hur användaren uppfattar sig själv i gruppsituationer och kan variera beroende på situation och kontext.
