interface StartPageProps {
  onStart: () => void;
}

export default function StartPage({ onStart }: StartPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Teamroller
          </h1>
          <p className="text-slate-600 mb-6 text-lg">
            Identifiera dina starkaste teamroller och lär dig hur du bäst bidrar i gruppdynamik.
          </p>

          <div className="bg-slate-50 rounded-xl p-4 mb-6">
            <h2 className="font-semibold text-slate-700 mb-2">Så fungerar det</h2>
            <ul className="text-slate-600 space-y-1 text-sm">
              <li>• 7 frågor om hur du fungerar i grupp</li>
              <li>• Fördela 10 poäng mellan 8 alternativ per fråga</li>
              <li>• Få reda på dina två starkaste teamroller</li>
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <p className="text-amber-800 text-sm">
              <strong>OBS:</strong> Detta är ett verktyg för självreflektion, inte ett vetenskapligt personlighetstest.
              Dina svar speglar hur du uppfattar dig själv just nu.
            </p>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-lg"
          >
            Starta testet
          </button>
        </div>
      </div>
    </div>
  );
}
