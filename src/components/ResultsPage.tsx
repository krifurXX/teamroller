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
${role.icon} #${index + 1} ${role.name} (${role.englishName}) - ${result.score} poäng
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${role.description}

✓ STYRKOR:
${role.strengths.map(s => `  • ${s}`).join('\n')}

⚠ FALLGROPAR:
${role.weaknesses.map(w => `  • ${w}`).join('\n')}

💡 TIPS FÖR DIG I TEAMARBETE:
${role.tips.map(t => `  • ${t}`).join('\n')}`;
    }).join('\n');

    const allRolesText = results
      .map((r, i) => {
        const role = getRoleById(r.roleId);
        const bar = '█'.repeat(Math.round(r.score / 2)) + '░'.repeat(Math.round((70 - r.score) / 2));
        return `${i + 1}. ${role?.icon} ${role?.name?.padEnd(15)} ${bar} ${r.score}p`;
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

  const handleDownloadPDF = () => {
    const html = `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <title>Mina Teamroller - Resultat</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; color: #1e293b; }
    h1 { font-size: 28px; margin-bottom: 8px; }
    h2 { font-size: 20px; margin: 24px 0 12px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px; }
    h3 { font-size: 16px; margin: 16px 0 8px; }
    p { margin: 8px 0; line-height: 1.6; }
    .subtitle { color: #64748b; margin-bottom: 24px; }
    .role-card { border: 2px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 16px 0; page-break-inside: avoid; }
    .role-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .role-icon { font-size: 32px; }
    .role-rank { width: 24px; height: 24px; border-radius: 50%; color: white; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }
    .role-name { font-size: 20px; font-weight: bold; }
    .role-english { color: #64748b; font-size: 14px; }
    .role-score { font-size: 24px; font-weight: bold; margin-left: auto; }
    .section { background: #f8fafc; padding: 12px 16px; border-radius: 8px; margin: 8px 0; }
    .section-green { background: #f0fdf4; }
    .section-orange { background: #fff7ed; }
    .section-blue { background: #eff6ff; }
    .section h4 { font-size: 14px; font-weight: 600; margin-bottom: 8px; }
    .section-green h4 { color: #166534; }
    .section-orange h4 { color: #9a3412; }
    .section-blue h4 { color: #1e40af; }
    .section ul { list-style: none; font-size: 13px; }
    .section li { margin: 4px 0; }
    .section-green li { color: #15803d; }
    .section-orange li { color: #c2410c; }
    .section-blue li { color: #1d4ed8; }
    .all-roles { margin-top: 24px; }
    .role-bar { display: flex; align-items: center; gap: 8px; margin: 8px 0; }
    .role-bar-icon { font-size: 18px; }
    .role-bar-name { width: 120px; font-weight: 500; }
    .role-bar-track { flex: 1; height: 12px; background: #e2e8f0; border-radius: 6px; overflow: hidden; }
    .role-bar-fill { height: 100%; border-radius: 6px; }
    .role-bar-score { width: 40px; text-align: right; font-weight: 600; }
    .disclaimer { background: #fef3c7; border: 1px solid #fcd34d; padding: 16px; border-radius: 8px; margin-top: 24px; }
    .disclaimer h4 { color: #92400e; margin-bottom: 8px; }
    .disclaimer p { color: #a16207; font-size: 13px; }
    .footer { margin-top: 32px; text-align: center; color: #94a3b8; font-size: 12px; }
    @media print { body { padding: 20px; } }
  </style>
</head>
<body>
  <h1>Mina Teamroller</h1>
  <p class="subtitle">Baserat på självskattningstest</p>

  <h2>Dina två starkaste roller</h2>

  ${topRoles.map((result, index) => {
    const role = getRoleById(result.roleId);
    if (!role) return '';
    return `
  <div class="role-card" style="border-top: 4px solid ${role.color}">
    <div class="role-header">
      <span class="role-icon">${role.icon}</span>
      <span class="role-rank" style="background: ${role.color}">${index + 1}</span>
      <div>
        <div class="role-name">${role.name}</div>
        <div class="role-english">${role.englishName}</div>
      </div>
      <div class="role-score">${result.score}p</div>
    </div>
    <p>${role.description}</p>
    <div class="section section-green">
      <h4>Styrkor</h4>
      <ul>${role.strengths.map(s => `<li>• ${s}</li>`).join('')}</ul>
    </div>
    <div class="section section-orange">
      <h4>Fallgropar</h4>
      <ul>${role.weaknesses.map(w => `<li>• ${w}</li>`).join('')}</ul>
    </div>
    <div class="section section-blue">
      <h4>Tips för dig i teamarbete</h4>
      <ul>${role.tips.map(t => `<li>• ${t}</li>`).join('')}</ul>
    </div>
  </div>`;
  }).join('')}

  <h2>Alla roller</h2>
  <div class="all-roles">
    ${results.map((result) => {
      const role = getRoleById(result.roleId);
      if (!role) return '';
      const percentage = Math.round((result.score / 70) * 100);
      return `
    <div class="role-bar">
      <span class="role-bar-icon">${role.icon}</span>
      <span class="role-bar-name">${role.name}</span>
      <div class="role-bar-track">
        <div class="role-bar-fill" style="width: ${percentage}%; background: ${role.color}"></div>
      </div>
      <span class="role-bar-score">${result.score}p</span>
    </div>`;
    }).join('')}
  </div>

  <div class="disclaimer">
    <h4>Disclaimer</h4>
    <p>Detta självskattningstest ger en indikation på hur du uppfattar dig själv i gruppsituationer. Resultatet är inte en definitiv beskrivning av din personlighet. Teamroller kan variera beroende på situation, grupp och projekt. Använd resultatet som ett verktyg för reflektion och dialog, inte som en absolut sanning.</p>
  </div>

  <p class="footer">Genererad från teamroller.vercel.app</p>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');

    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <div className="min-h-screen p-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
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
              <div key={role.id} className="animate-slide-up" style={{ animationDelay: `${index * 150}ms` }}>
                <RoleCard
                  role={role}
                  score={result.score}
                  rank={index + 1}
                  maxScore={maxScore}
                />
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Alla roller</h2>
          <div className="space-y-3">
            {results.map((result, index) => {
              const role = roles.find((r) => r.id === result.roleId);
              if (!role) return null;
              const percentage = Math.round((result.score / 70) * 100);
              return (
                <div key={role.id} className="flex items-center gap-3">
                  <span className="text-xl" role="img" aria-label={role.name}>{role.icon}</span>
                  <span className="w-6 text-slate-400 font-semibold text-sm">{index + 1}</span>
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

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h3 className="font-semibold text-amber-800 mb-2">Disclaimer</h3>
          <p className="text-amber-700 text-sm">
            Detta självskattningstest ger en indikation på hur du uppfattar dig själv i gruppsituationer.
            Resultatet är inte en definitiv beskrivning av din personlighet. Teamroller kan variera
            beroende på situation, grupp och projekt. Använd resultatet som ett verktyg för reflektion
            och dialog, inte som en absolut sanning.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <button
            onClick={handleCopyResults}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            aria-label="Kopiera resultat till urklipp"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Kopiera
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex-1 py-3 px-4 rounded-xl border-2 border-indigo-300 text-indigo-600 font-semibold hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2"
            aria-label="Ladda ner som PDF"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Ladda ner PDF
          </button>
          <button
            onClick={onRestart}
            className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors"
            aria-label="Gör om testet"
          >
            Gör om testet
          </button>
        </div>
      </div>
    </div>
  );
}
