import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

const helper = `  const getPriorityColor = (priorityName: string) => {
    switch (priorityName?.toLowerCase()) {
      case 'critical': return 'bg-rose-100 text-rose-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'low': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };`;

// Insert helper before handleSearch
if (!code.includes('getPriorityColor')) {
  code = code.replace(
    '  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {',
    helper + '\n\n  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {'
  );
}

const target = `<span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase bg-slate-100 text-slate-600">
                           {references.priorities.find((p:any) => p.id === ticket.priorityId)?.name || 'Normal'}
                        </span>`;

const replacement = `{(() => {
                          const priorityName = references.priorities.find((p:any) => p.id === ticket.priorityId)?.name || 'Normal';
                          return (
                            <span className={\`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase \${getPriorityColor(priorityName)}\`}>
                               {priorityName}
                            </span>
                          );
                        })()}`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
} else {
  // might be different whitespace
  console.log("Could not find target exact match. Will try regex");
}

fs.writeFileSync(file, code);
