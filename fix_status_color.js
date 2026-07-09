import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

const helper = `  const getStatusColor = (statusName: string) => {
    switch (statusName?.toLowerCase()) {
      case 'new': return 'bg-sky-100 text-sky-700';
      case 'in progress': return 'bg-indigo-100 text-indigo-700';
      case 'pending customer': return 'bg-fuchsia-100 text-fuchsia-700';
      case 'resolved': return 'bg-emerald-100 text-emerald-700';
      case 'closed': return 'bg-slate-200 text-slate-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };`;

// Insert helper before handleSearch
if (!code.includes('getStatusColor')) {
  code = code.replace(
    '  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {',
    helper + '\n\n  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {'
  );
}

const target = `<td className="px-6 py-4 text-slate-600">{references.statuses.find((s:any) => s.id === ticket.statusId)?.name || 'New'}</td>`;

const replacement = `<td className="px-6 py-4">
                        {(() => {
                          const statusName = references.statuses.find((s:any) => s.id === ticket.statusId)?.name || 'New';
                          return (
                            <span className={\`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase \${getStatusColor(statusName)}\`}>
                               {statusName}
                            </span>
                          );
                        })()}
                      </td>`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
}

fs.writeFileSync(file, code);
