import fs from 'fs';
const file = 'src/validations.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `export const ticketSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  customerId: z.string().optional(),
  assetId: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "Subcategory is required"),
  priorityId: z.string().min(1, "Priority is required"),
  impactId: z.string().min(1, "Impact is required"),
  urgencyId: z.string().min(1, "Urgency is required"),
  statusId: z.string().optional(),
  slaId: z.string().optional(),
  assignedTo: z.string().optional(),
  reportedBy: z.string().optional(),
  expectedResolutionDate: z.string().optional(),
  actualResolutionDate: z.string().optional(),
  resolutionNotes: z.string().optional(),
});`;

const replacement = `export const ticketSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  customerId: z.string().nullable().optional(),
  assetId: z.string().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().min(1, "Subcategory is required"),
  priorityId: z.string().min(1, "Priority is required"),
  impactId: z.string().min(1, "Impact is required"),
  urgencyId: z.string().min(1, "Urgency is required"),
  statusId: z.string().nullable().optional(),
  slaId: z.string().nullable().optional(),
  assignedTo: z.string().nullable().optional(),
  reportedBy: z.string().nullable().optional(),
  expectedResolutionDate: z.string().nullable().optional(),
  actualResolutionDate: z.string().nullable().optional(),
  resolutionNotes: z.string().nullable().optional(),
});`;

code = code.replace(target, replacement);
fs.writeFileSync(file, code);
