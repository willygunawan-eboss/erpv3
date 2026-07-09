import fs from 'fs';
const file = 'src/validations.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'customerId: z.string().min(1, "Customer is required"),',
  'customerId: z.string().optional(),'
);
code = code.replace(
  'assetId: z.string().min(1, "Asset is required"),',
  'assetId: z.string().optional(),'
);

fs.writeFileSync(file, code);
