import fs from 'fs';
const file = 'src/validations.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'assignedTo: z.string().min(1, "Engineer is required"),',
  'assignedTo: z.string().optional(),'
);

code = code.replace(
  'reportedBy: z.string().min(1, "PIC is required"),',
  'reportedBy: z.string().optional(),'
);

fs.writeFileSync(file, code);
