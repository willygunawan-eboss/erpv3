import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const employeeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(2, "Role is required"),
  department: z.string().min(2, "Department is required"),
  status: z.enum(['Active', 'On Leave', 'Terminated']),
  joinDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
});

export const salesOrderSchema = z.object({
  customer: z.string().min(2, "Customer name is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  amount: z.number().positive("Amount must be positive"),
  status: z.enum(['Completed', 'Pending', 'Cancelled'])
});

export const projectSchema = z.object({
  name: z.string().min(2, "Project name is required"),
  client: z.string().min(2, "Client is required"),
  dueDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  budget: z.number().positive("Budget must be positive"),
  status: z.enum(['Active', 'Completed', 'Delayed']),
  progress: z.number().min(0).max(100, "Progress must be between 0 and 100")
});

export const ticketCategorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
});

export const ticketSubCategorySchema = z.object({
  categoryId: z.string().min(1, "Category is required"),
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
});

export const ticketPrioritySchema = z.object({
  name: z.string().min(2, "Name is required"),
  level: z.number().int(),
  color: z.string().optional(),
});

export const ticketImpactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  level: z.number().int(),
});

export const ticketUrgencySchema = z.object({
  name: z.string().min(2, "Name is required"),
  level: z.number().int(),
});

export const ticketStatusSchema = z.object({
  name: z.string().min(2, "Name is required"),
  isClosed: z.boolean().default(false),
  color: z.string().optional(),
});

export const slaSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().optional(),
  responseTimeMinutes: z.number().int().min(0),
  resolutionTimeMinutes: z.number().int().min(0),
  priorityId: z.string().optional(),
});

export const ticketSchema = z.object({
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
});

export const ticketAttachmentSchema = z.object({
  ticketId: z.string().min(1),
  fileName: z.string().min(1),
  fileUrl: z.string().min(1),
  fileType: z.string().optional(),
  fileSize: z.number().int().optional(),
});

export const ticketCommentSchema = z.object({
  ticketId: z.string().min(1),
  comment: z.string().min(1),
  isInternal: z.boolean().default(false),
});

export const ticketWorklogSchema = z.object({
  ticketId: z.string().min(1),
  employeeId: z.string().min(1),
  timeSpentMinutes: z.number().int().min(1),
  workDate: z.string().min(1),
  description: z.string().min(1),
});

export const ticketTimelineSchema = z.object({
  ticketId: z.string().min(1),
  action: z.string().min(1),
  description: z.string().optional(),
});

export const ticketWatcherSchema = z.object({
  ticketId: z.string().min(1),
  employeeId: z.string().min(1),
});

export const tagSchema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
});

export const ticketTagSchema = z.object({
  ticketId: z.string().min(1),
  tagId: z.string().min(1),
});

export const ticketAuditSchema = z.object({
  ticketId: z.string().min(1),
  fieldName: z.string().min(1),
  oldValue: z.string().optional().nullable(),
  newValue: z.string().optional().nullable(),
});
