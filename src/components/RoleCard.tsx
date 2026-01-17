import { Role } from '../types';

interface RoleCardProps {
  role: Role;
  score: number;
  rank: number;
  maxScore: number;
}

export default function RoleCard({ role, score, rank, maxScore }: RoleCardProps) {
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  return (
    <div
      className="bg-white rounded-2xl shadow-lg overflow-hidden"
      style={{ borderTop: `4px solid ${role.color}` }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="text-3xl" role="img" aria-label={role.name}>
                {role.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-xs"
                    style={{ backgroundColor: role.color }}
                  >
                    {rank}
                  </span>
                  <h3 className="text-xl font-bold text-slate-800">{role.name}</h3>
                </div>
                <p className="text-slate-500 text-sm">{role.englishName}</p>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-800">{score}</div>
            <div className="text-sm text-slate-500">poäng</div>
          </div>
        </div>

        <p className="text-slate-600 mb-4">{role.description}</p>

        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, backgroundColor: role.color }}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="font-semibold text-green-800 mb-2">Styrkor</h4>
            <ul className="text-green-700 text-sm space-y-1">
              {role.strengths.map((s, i) => (
                <li key={i}>• {s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <h4 className="font-semibold text-orange-800 mb-2">Fallgropar</h4>
            <ul className="text-orange-700 text-sm space-y-1">
              {role.weaknesses.map((w, i) => (
                <li key={i}>• {w}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-blue-50 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Tips för samarbete</h4>
          <ul className="text-blue-700 text-sm space-y-1">
            {role.tips.map((t, i) => (
              <li key={i}>• {t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
