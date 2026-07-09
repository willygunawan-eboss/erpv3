import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '<select required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.customerId}',
  '<select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.customerId}'
);
code = code.replace(
  '<select required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.reportedBy}',
  '<select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.reportedBy}'
);
code = code.replace(
  '<select required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.assetId}',
  '<select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.assetId}'
);
code = code.replace(
  '<select required className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.assignedTo}',
  '<select className="w-full p-2 border border-slate-200 rounded-lg text-sm bg-white" value={formData.assignedTo}'
);

fs.writeFileSync(file, code);
