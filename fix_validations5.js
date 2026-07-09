import fs from 'fs';
const file = 'src/validations.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `subCategoryId: z.string({required_error: "Subcategory is required", invalid_type_error: "Subcategory is required"}).min(1, "Subcategory is required"),`;
const replacement = `subCategoryId: z.string().nullable().optional(),`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
