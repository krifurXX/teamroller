PRD. Webbaserad teamrollsbedömning för studenter (inspirerad av Belbin)  
	1.	Syfte och mål  
Syfte  
Skapa en enkel webbaserad applikation som hjälper en student att identifiera sina två mest naturliga teamroller, löst inspirerat av Belbins teamroller, baserat på ett frågeformulär med poängsättning. Resultatet ska kunna användas som underlag för gruppindelning i kurs.  
  
Övergripande mål  
	1.	Studenter kan genomföra en kort bedömning på egen hand.  
	2.	Systemet presenterar två primära roller med korta, pedagogiska beskrivningar och konkreta styrkor och risker i grupparbete.  
	3.	Systemet visar även övriga roller (för transparens), samt en tydlig disclaimer att detta inte är en personlighetsprofil utan ett indikativt stöd för hur man ofta agerar i team, och att man medvetet kan ta andra roller.  
  
Icke-mål  
	1.	Diagnostik av personlighet, psykologisk profilering eller kliniska slutsatser.  
	2.	Högst precisa “Belbin-certifierade” resultat. Detta är en förenklad, pedagogisk variant.  
	3.	Automatisk gruppindelning. Applikationen ger underlag, men gruppindelning kan ske i ett separat verktyg eller manuellt av lärare.  
  
	2.	Målgrupper och användningsfall  
Primär målgrupp  
  
	•	Studenter i team-baserade kurser (t.ex. projektkurser, simuleringar, designprojekt).  
  
Sekundär målgrupp  
	•	Lärare/kursansvariga som vill använda resultaten som underlag för gruppindelning och reflektion.  
  
Kärnflöden (user journeys)  
A) Student genomför test  
	1.	Öppnar webbsidan.  
	2.	Läser kort introduktion och samtycker (”Jag förstår att detta är ett indikativt stöd”).  
	3.	Svarar på frågor en i taget.  
	4.	Får resultat. Två primära roller plus beskrivningar.  
	5.	Ser övriga roller och sin fördelning.  
	6.	Kan spara eller dela resultat (t.ex. kod, PDF eller copy-paste) för inlämning/registrering.  
  
B) Lärare samlar in resultat  
	1.	Läraren skapar en kurskod/länk för en specifik kursomgång.  
	2.	Studenter gör test och får en delningskod eller skickar in resultat via länk.  
	3.	Läraren får en sammanställning (individnivå eller aggregerat). Export till CSV.  
  
	3.	Teamroller som koncept (innehåll)  
Rolluppsättning (9 roller, Belbin-inspirerade)  
Applikationen kan använda dessa standardroller (namn kan justeras för språk och kurskontext):  
  
	1.	Plant (Idéspruta)  
	2.	Resource Investigator (Utforskare/Nätverkare)  
	3.	Coordinator (Samordnare)  
	4.	Shaper (Drivare)  
	5.	Monitor Evaluator (Analytiker/Bedömare)  
	6.	Teamworker (Lagspelare)  
	7.	Implementer (Genomförare)  
	8.	Completer Finisher (Avslutare/Kvalitetssäkrare)  
	9.	Specialist (Specialist)  
  
Minimikrav på rollbeskrivning i resultat  
För varje roll som presenteras ska det finnas:  
	•	Kort rollbeskrivning (1–2 meningar)  
	•	Typiska styrkor (3–5 punkter)  
	•	Vanliga fallgropar (2–4 punkter)  
	•	Tips till teamet (hur andra kan samarbeta med rollen)  
	•	Exempel på beteenden i studentprojekt (praktiska exempel)  
  
Disclaimer (obligatorisk text nära resultatet)  
	•	Detta är inte ett personlighetstest. Resultatet visar vilka teambeteenden/roller du ofta tar naturligt i grupparbete.  
	•	Du kan medvetet välja att ta andra roller beroende på uppgift, teamets behov och din utveckling.  
	•	Resultatet bör användas som ett reflektions- och planeringsstöd, inte som en etikett.  
  
	4.	Frågeformulär och poänglogik  
Frågeformat  
  
	•	Frågor presenteras en i taget.  
	•	Svar i form av Likert-skala (t.ex. 1–5: “Stämmer inte alls” till “Stämmer helt”).  
	•	Alternativt scenario-baserade val (forced-choice) där studenten fördelar poäng mellan påståenden. Likert är enklast att implementera och förklara.  
  
Rekommenderad omfattning  
	•	27–45 frågor totalt (3–5 per roll). Kort nog för att genomföra på 5–8 minuter.  
	•	Frågebank som kan slumpas (för att minska “test-träning”) men med bibehållen balans per roll.  
  
Poängsättningsmall (rätningsmall)  
	•	Varje fråga mappar till en roll och har en vikt (standard 1.0, med möjlighet till 0.5/1.5 vid behov).  
	•	Om en fråga är omvänt formulerad används reverse scoring.  
	•	Total poäng per roll = summan av (svarsvärde justerat) * vikt.  
	•	Normalisering kan göras till procent per roll för enkel visualisering.  
  
Outputregler  
	•	Primära roller = de två högsta poängen.  
	•	Vid lika poäng: använd tie-breaker, t.ex.  
a) flest högskattade (4–5) items inom rollen  
b) eller visa tre roller om skillnaden är under en tröskel (t.ex. <3%).  
	•	Visa även alla rollers poäng (rangordnade).  
  
Kvalitetskontroller  
	•	“Attention check” (1–2 enkla kontrollfrågor) för att minska slentriansvar.  
	•	Indikator om svarsmönstret är extremt (allt 5:or). Visa mild notis: “Dina svar är mycket jämna. Resultatet blir mer informativt om du använder hela skalan.”  
  
	5.	Resultatpresentation (UX)  
Resultatsida ska innehålla  
  
	1.	Rubrik: “Dina två mest naturliga teamroller”  
	2.	Kort sammanfattning: Roll 1 + Roll 2 (namn + en rad vardera)  
	3.	Två rollkort (ett per primär roll) med:  
	•	Beskrivning  
	•	Styrkor  
	•	Risker  
	•	Samarbetsråd  
	•	Exempel i studentprojekt  
	4.	Sektion: “Övriga roller (för transparens)”  
	•	Lista eller kort för resterande 7 roller med kortbeskrivning.  
	5.	Visualisering  
	•	Enkel stapelgraf med alla 9 roller (poäng/procent).  
	6.	Disclaimer (se ovan), tydligt placerad.  
	7.	Dela/Spara  
	•	“Kopiera resultat” (textformat)  
	•	“Ladda ner som PDF” (valfritt)  
	•	“Skapa delningskod” för inlämning  
  
Tillgänglighet  
	•	Mobilanpassad. Studenter ska kunna göra detta i telefon.  
	•	WCAG-grundnivå: tangentbordsnavigering, tydliga kontraster, alt-texter, inte bara färg för att indikera ranking.  
  
	6.	Funktionella krav  
Studentläge  
  
	•	Startvy med introduktion, tidsestimat och samtycke.  
	•	Frågeflöde en fråga i taget.  
	•	Progress indicator (t.ex. “12 av 36”).  
	•	Möjlighet att gå tillbaka en fråga (konfigurerbart).  
	•	Autospara lokalt (LocalStorage) så man inte tappar vid refresh.  
	•	Slutlig resultatsida.  
  
Lärarläge (valbart, men starkt kopplat till “underlag för gruppindelning”)  
	•	Skapa kursinstans (kurskod, datum, valfri deadline).  
	•	Samla resultat med:  
a) anonymt ID (student anger pseudonym eller student-id beroende på policy)  
b) delningskod knuten till kursinstans  
	•	Dashboard:  
	•	Lista över inkomna resultat  
	•	Fördelning per roll (aggregat)  
	•	Export CSV (student-id, topp 2 roller, alla poäng)  
	•	Policy-stöd:  
	•	Läraren kan välja “anonym insamling” eller “identifierad insamling”.  
  
Adminläge (för dig som äger verktyget)  
	•	Hantera frågebank, vikter, reverse scoring.  
	•	Versionshantering av frågeformulär (viktigt om ni återanvänder mellan kurstillfällen).  
	•	Export/import av frågebank som JSON.  
  
	7.	Icke-funktionella krav  
Prestanda  
  
	•	Laddtid < 2 sek på normal mobiluppkoppling.  
	•	Resultatberäkning omedelbar (client-side) eller < 300 ms (server-side).  
  
Säkerhet och integritet  
	•	Minimera persondata. Helst: ingen lagring av personuppgifter, endast delningskod och rollresultat.  
	•	Om student-id används: tydlig motivering, retention policy, åtkomstkontroll för lärare.  
	•	GDPR: informera om vad som lagras, varför, hur länge och vem som har åtkomst.  
	•	Kryptering vid transport (HTTPS). Om serverlagring: kryptering i vila.  
  
Tillförlitlighet  
	•	Robust mot refresh/back. Autosave.  
	•	Tydliga felmeddelanden (t.ex. om nätet försvinner vid inskick i lärarläge).  
  
	8.	Informationsarkitektur och skisser (textuell)  
Sidor  
  
	1.	Landing  
	•	Vad är detta.  
	•	Hur lång tid tar det.  
	•	Disclaimer light.  
	•	Start-knapp.  
	2.	Consent + valfri identifiering  
	•	Alternativ A: “Anonym”  
	•	Alternativ B: “Student-ID” (om kurs kräver)  
	•	Kurskod-fält (om lärarinsamling aktiv)  
	•	Samtycke check.  
	3.	Question page (repeater)  
	•	Frågetext  
	•	1–5 skala  
	•	Nästa  
	•	Tillbaka (valfritt)  
	•	Progress  
	4.	Results  
	•	Topp 2 roller (stort)  
	•	Rollkort x2  
	•	Graf med 9 roller  
	•	Övriga roller (kompakt)  
	•	Disclaimer full  
	•	Copy/PDF/Delningskod  
	5.	Teacher dashboard (separat route)  
	•	Inlogg (enkelt lösenord eller SSO, beroende på ambitionsnivå)  
	•	Kursinstanser  
	•	Resultatlista + export  
  
	9.	Data- och beräkningsmodell (översikt)  
Entiteter  
  
	•	Role: id, namn, beskrivningar, styrkor, fallgropar, samarbetsråd, exempel  
	•	Question: id, text, scale_min, scale_max, role_weights (t.ex. {role_id: weight}), reverse_scored (bool)  
	•	Response: question_id, value  
	•	Result: role_scores, top_roles[2], timestamp, version_id  
	•	CourseInstance (valbart): course_code, created_at, settings, results[]  
  
Beräkning  
	•	role_scores[role] = sum(adjust(value, reverse) * weight)  
	•	normalized = role_scores / sum(role_scores)  
  
	10.	Tekniskt upplägg (rekommenderat)  
MVP-arkitektur (snabbast)  
  
	•	Frontend-only SPA (t.ex. Next.js eller Vite+React).  
	•	All beräkning i klienten.  
	•	Resultat delas via “copy text” eller en genererad kod som inte kräver server (t.ex. base64 av resultat). Nackdel: lärarinsamling blir manuell.  
  
MVP med lärarinsamling  
	•	Frontend: Next.js.  
	•	Backend: enkel API-route + datalager (t.ex. Supabase/Firebase) för kursinstans och inskick.  
	•	Auth: enkel lärarinlogg (password protected) eller universitetets SSO om ni har den möjligheten.  
  
	11.	MVP-scope (förslag)  
MVP (1)  
  
	•	Studentflöde: intro, frågor en i taget, resultat med topp 2, graf, övriga roller, disclaimer, copy-resultat.  
	•	Frågebank v1: 36 frågor (4 per roll), Likert 1–5.  
MVP (2) om ni behöver insamling direkt  
	•	Kurskod-stöd + delningskod.  
	•	Lärardashboard med export CSV.  
  
Senare iterationer  
	•	Adaptivt frågeflöde (ställer fler frågor där osäkerhet är hög).  
	•	Flera språk (svenska/engelska).  
	•	Reflektionsfrågor efter resultat (”Hur märks detta i ditt beteende i projekt?”) för att stärka lärande.  
	•	Rekommendationer för teamkomposition (på aggregerad nivå, med tydlig försiktighet).  
  
	12.	Risker och hantering  
Risk: Studenter tolkar resultatet som “sanning” om personlighet  
Åtgärd: Mycket tydlig disclaimer. Lägg in “hur använda resultatet” med fokus på utvecklingsbarhet och situationsbeteenden.  
  
Risk: Social desirability bias (svarar som man vill framstå)  
Åtgärd: Scenariofrågor, blandning av positivt och omvänt formulerat, påminnelse: “Svara utifrån hur du oftast agerar”.  
  
Risk: Lärarinsamling blir integritetskänslig  
Åtgärd: Anonymt läge som default. Identifierat läge endast vid tydlig policy och retention.  
  
Risk: Rollfördelning används mekaniskt för gruppindelning  
Åtgärd: Stödtext till lärare: kombinera med andra kriterier (kompetens, schema, motivation, tidigare prestation).  
	13.	Framgångsmått (metrics)  
  
	•	Completion rate: andel som startar och slutför (mål > 85%).  
	•	Median tid att slutföra (mål 5–8 min).  
	•	Andel med “jämna” resultat (kan indikera för kort eller otydligt test).  
	•	Studentfeedback: upplevd relevans (1–5).  
	•	Lärarfeedback: användbarhet för gruppindelning (1–5).  
  
