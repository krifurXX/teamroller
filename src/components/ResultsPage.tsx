import { RoleScore } from '../types';
import { roles, getRoleById } from '../data/roles';
import RoleCard from './RoleCard';

interface ResultsPageProps {
  results: RoleScore[];
  onRestart: () => void;
}

export default function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const topRoles = results.slice(0, 2);
  const maxScore = results[0]?.score || 1;

  const handleCopyResults = () => {
    const topRolesText = topRoles.map((result, index) => {
      const role = getRoleById(result.roleId);
      if (!role) return '';
      return `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#${index + 1} ${role.name} (${role.englishName}) - ${result.score} poäng
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${role.description}

✓ STYRKOR:
${role.strengths.map(s => `  • ${s}`).join('\n')}

⚠ FALLGROPAR:
${role.weaknesses.map(w => `  • ${w}`).join('\n')}

💡 TIPS FÖR SAMARBETE:
${role.tips.map(t => `  • ${t}`).join('\n')}`;
    }).join('\n');

    const allRolesText = results
      .map((r, i) => {
        const role = getRoleById(r.roleId);
        const bar = '█'.repeat(Math.round(r.score / 2)) + '░'.repeat(Math.round((70 - r.score) / 2));
        return `${i + 1}. ${role?.name?.padEnd(15)} ${bar} ${r.score}p`;
      })
      .join('\n');

    const summary = `
╔══════════════════════════════════════════╗
║         MINA TEAMROLLER - RESULTAT       ║
╚══════════════════════════════════════════╝

Mina två starkaste roller: ${topRoles.map(r => getRoleById(r.roleId)?.name).join(' & ')}
${topRolesText}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ALLA ROLLER (poängfördelning)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${allRolesText}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DISCLAIMER
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Detta självskattningstest ger en indikation på hur du uppfattar
dig själv i gruppsituationer. Resultatet är inte en definitiv
beskrivning av din personlighet. Teamroller kan variera beroende
på situation, grupp och projekt. Använd resultatet som ett
verktyg för reflektion och dialog, inte som en absolut sanning.
`.trim();

    navigator.clipboard.writeText(summary);
    alert('Fullständig rapport kopierad till urklipp!');
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
            Dina teamroller
          </h1>
          <p className="text-slate-600">
            Baserat på dina svar är dessa dina två starkaste roller
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {topRoles.map((result, index) => {
            const role = getRoleById(result.roleId);
            if (!role) return null;
            return (
              <RoleCard
                key={role.id}
                role={role}
                score={result.score}
                rank={index + 1}
                maxScore={maxScore}
              />
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Alla roller</h2>
          <div className="space-y-3">
            {results.map((result, index) => {
              const role = roles.find((r) => r.id === result.roleId);
              if (!role) return null;
              const percentage = Math.round((result.score / 70) * 100);
              return (
                <div key={role.id} className="flex items-center gap-3">
                  <span className="w-6 text-slate-400 font-semibold">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-slate-700">{role.name}</span>
                      <span className="text-slate-500">{result.score} p</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%`, backgroundColor: role.color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
          <h3 className="font-semibold text-amber-800 mb-2">Disclaimer</h3>
          <p className="text-amber-700 text-sm">
            Detta självskattningstest ger en indikation på hur du uppfattar dig själv i gruppsituationer.
            Resultatet är inte en definitiv beskrivning av din personlighet. Teamroller kan variera
            beroende på situation, grupp och projekt. Använd resultatet som ett verktyg för reflektion
            och dialog, inte som en absolut sanning.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleCopyResults}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors"
          >
            Kopiera resultat
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
          >
            Gör om testet
          </button>
        </div>
      </div>
    </div>
  );
}
