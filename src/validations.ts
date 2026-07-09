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
