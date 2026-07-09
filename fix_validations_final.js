import fs from 'fs';
const file = 'src/validations.ts';
let code = fs.readFileSync(file, 'utf8');

const target = `export const ticketSchema = z.object({
  title: z.string({required_error: "Title is required", invalid_type_error: "Title is required"}).min(3, "Title is required"),
  description: z.string({required_error: "Description is required", invalid_type_error: "Description is required"}).min(5, "Description is required"),
  customerId: z.string().nullable().optional(),
  assetId: z.string().nullable().optional(),
  categoryId: z.string({required_error: "Category is required", invalid_type_error: "Category is required"}).min(1, "Category is required"),
  subCategoryId: z.string().nullable().optional(),
  priorityId: z.string({required_error: "Priority is required", invalid_type_error: "Priority is required"}).min(1, "Priority is required"),
  impactId: z.string({required_error: "Impact is required", invalid_type_error: "Impact is required"}).min(1, "Impact is required"),
  urgencyId: z.string({required_error: "Urgency is required", invalid_type_error: "Urgency is required"}).min(1, "Urgency is required"),
  statusId: z.string().nullable().optional(),
  slaId: z.string().nullable().optional(),
  assignedTo: z.string().nullable().optional(),
  reportedBy: z.string().nullable().optional(),
  expectedResolutionDate: z.string().nullable().optional(),
  actualResolutionDate: z.string().nullable().optional(),
  resolutionNotes: z.string().nullable().optional(),
});`;

const replacement = `export const ticketSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().min(5, "Description is required"),
  customerId: z.string().nullable().optional(),
  assetId: z.string().nullable().optional(),
  categoryId: z.string().min(1, "Category is required"),
  subCategoryId: z.string().nullable().optional(),
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
