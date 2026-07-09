import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  role: text('role').notNull(), // 'admin', 'employee', 'manager'
  department: text('department'),
  refreshToken: text('refresh_token'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const dashboardStats = sqliteTable('dashboard_stats', {
  id: text('id').primaryKey(), // single row, id='main'
  activeEmployees: integer('active_employees').notNull().default(0),
  totalDepartments: integer('total_departments').notNull().default(0),
  openTickets: integer('open_tickets').notNull().default(0),
  monthlyRevenue: real('monthly_revenue').notNull().default(0),
  updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
});

export const employees = sqliteTable('employees', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  role: text('role').notNull(),
  department: text('department').notNull(),
  status: text('status').notNull(), // Active, On Leave, Terminated
  joinDate: text('join_date').notNull(),
  email: text('email').notNull(),
  avatar: text('avatar'),
});

export const attendance = sqliteTable('attendance', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  employeeName: text('employee_name').notNull(),
  date: text('date').notNull(),
  checkIn: text('check_in').notNull(),
  checkOut: text('check_out').notNull(),
  status: text('status').notNull(), // Present, Late, Absent, Half Day
  workHours: text('work_hours').notNull(),
});

export const payroll = sqliteTable('payroll', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  employeeName: text('employee_name').notNull(),
  period: text('period').notNull(),
  basicSalary: real('basic_salary').notNull(),
  allowances: real('allowances').notNull(),
  deductions: real('deductions').notNull(),
  netPay: real('net_pay').notNull(),
  status: text('status').notNull(), // Paid, Processing, Pending
});

export const transactions = sqliteTable('transactions', {
  id: text('id').primaryKey(),
  date: text('date').notNull(),
  description: text('description').notNull(),
  category: text('category').notNull(),
  type: text('type').notNull(), // Income, Expense
  amount: real('amount').notNull(),
  status: text('status').notNull(), // Completed, Pending
});

export const salesOrders = sqliteTable('sales_orders', {
  id: text('id').primaryKey(),
  customer: text('customer').notNull(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  status: text('status').notNull(), // Completed, Pending, Cancelled
});

export const products = sqliteTable('products', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  sku: text('sku').notNull(),
  category: text('category').notNull(),
  price: real('price').notNull(),
  stock: integer('stock').notNull(),
  status: text('status').notNull(), // In Stock, Low Stock, Out of Stock
});

export const productionOrders = sqliteTable('production_orders', {
  id: text('id').primaryKey(),
  product: text('product').notNull(),
  quantity: integer('quantity').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  status: text('status').notNull(), // Planned, In Progress, Completed
  progress: integer('progress').notNull(),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  client: text('client').notNull(),
  dueDate: text('due_date').notNull(),
  budget: real('budget').notNull(),
  status: text('status').notNull(), // Active, Completed, Delayed
  progress: integer('progress').notNull(),
});

export const tasks = sqliteTable('tasks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  assignedTo: text('assigned_to').notNull(),
  dueDate: text('due_date').notNull(),
  status: text('status').notNull(), // Pending, Approved, Completed
  type: text('type').notNull(),
});

export const announcements = sqliteTable('announcements', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  category: text('category').notNull(),
  date: text('date').notNull(),
});


export const employeeContracts = sqliteTable('employee_contracts', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  contractType: text('contract_type').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
  status: text('status').notNull(),
});

export const employeeFamilies = sqliteTable('employee_families', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  name: text('name').notNull(),
  relationship: text('relationship').notNull(),
  dateOfBirth: text('date_of_birth'),
});

export const employeeEmergencyContacts = sqliteTable('employee_emergency_contacts', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  name: text('name').notNull(),
  relationship: text('relationship').notNull(),
  phone: text('phone').notNull(),
});

export const employeeBanks = sqliteTable('employee_banks', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  bankName: text('bank_name').notNull(),
  accountNumber: text('account_number').notNull(),
  accountHolder: text('account_holder').notNull(),
});

export const employeeTaxes = sqliteTable('employee_taxes', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  npwp: text('npwp').notNull(),
  ptkpStatus: text('ptkp_status').notNull(),
});

export const employeeBpjs = sqliteTable('employee_bpjs', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  bpjsKesehatan: text('bpjs_kesehatan'),
  bpjsKetenagakerjaan: text('bpjs_ketenagakerjaan'),
});

export const employeePositionHistories = sqliteTable('employee_position_histories', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  position: text('position').notNull(),
  department: text('department').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date'),
});

export const employeeSalaryHistories = sqliteTable('employee_salary_histories', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  basicSalary: real('basic_salary').notNull(),
  effectiveDate: text('effective_date').notNull(),
});

export const employeePromotionHistories = sqliteTable('employee_promotion_histories', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  oldPosition: text('old_position').notNull(),
  newPosition: text('new_position').notNull(),
  promotionDate: text('promotion_date').notNull(),
});

export const employeeLeaves = sqliteTable('employee_leaves', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  leaveType: text('leave_type').notNull(),
  startDate: text('start_date').notNull(),
  endDate: text('end_date').notNull(),
  status: text('status').notNull(), // Approved, Pending, Rejected
});

export const employeeOvertimes = sqliteTable('employee_overtimes', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  date: text('date').notNull(),
  hours: real('hours').notNull(),
  status: text('status').notNull(),
});

export const employeeAssets = sqliteTable('employee_assets', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  assetName: text('asset_name').notNull(),
  assetCode: text('asset_code').notNull(),
  givenDate: text('given_date').notNull(),
  returnDate: text('return_date'),
});

export const employeeTrainings = sqliteTable('employee_trainings', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  trainingName: text('training_name').notNull(),
  date: text('date').notNull(),
  result: text('result'),
});

export const employeePerformances = sqliteTable('employee_performances', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  reviewPeriod: text('review_period').notNull(),
  score: real('score').notNull(),
  comments: text('comments'),
});

export const employeeDocuments = sqliteTable('employee_documents', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  documentType: text('document_type').notNull(), // e.g., KTP, KK, Ijazah
  fileUrl: text('file_url').notNull(),
});

export const employeeShifts = sqliteTable('employee_shifts', {
  id: text('id').primaryKey(),
  employeeId: text('employee_id').notNull(),
  shiftName: text('shift_name').notNull(),
  startTime: text('start_time').notNull(),
  endTime: text('end_time').notNull(),
});

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').notNull().unique(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  purchaseDate: text('purchase_date').notNull(),
  currentValue: integer('current_value').notNull(),
  status: text('status').notNull(),
  serialNumber: text('serial_number'),
  assignedTo: text('assigned_to'),
  assignedEmployeeName: text('assigned_employee_name'),
  lastModifiedBy: text('last_modified_by'),
  lastModifiedAt: text('last_modified_at').default(sql`CURRENT_TIMESTAMP`),
});

export const invoices = sqliteTable('invoices', {
  id: text('id').primaryKey(),
  invoiceNumber: text('invoice_number').notNull().unique(),
  date: text('date').notNull(),
  dueDate: text('due_date').notNull(),
  salesperson: text('salesperson'),
  customerName: text('customer_name').notNull(),
  customerPhone: text('customer_phone'),
  customerEmail: text('customer_email'),
  subtotal: integer('subtotal').notNull(),
  discountTotal: integer('discount_total').notNull().default(0),
  additionalDiscount: integer('additional_discount').notNull().default(0),
  shippingCost: integer('shipping_cost').notNull().default(0),
  taxTotal: integer('tax_total').notNull().default(0),
  downPayment: integer('down_payment').notNull().default(0),
  total: integer('total').notNull(),
  amountPaid: integer('amount_paid').notNull().default(0),
  amountDue: integer('amount_due').notNull(),
  notes: text('notes'),
  terms: text('terms'),
  signatureDate: text('signature_date'),
  signatureName: text('signature_name'),
  status: text('status').notNull().default('Unpaid'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const invoiceItems = sqliteTable('invoice_items', {
  id: text('id').primaryKey(),
  invoiceId: text('invoice_id').notNull(),
  productName: text('product_name').notNull(),
  description: text('description'),
  quantity: integer('quantity').notNull().default(1),
  price: integer('price').notNull(),
  discountPercent: integer('discount_percent').notNull().default(0),
  taxType: text('tax_type').default('No Tax Selected'),
  total: integer('total').notNull(),
});

export const purchaseOrders = sqliteTable('purchase_orders', {
  id: text('id').primaryKey(),
  vendor: text('vendor').notNull(),
  date: text('date').notNull(),
  amount: real('amount').notNull(),
  status: text('status').notNull(), // Pending, Received, Cancelled
});

export const purchaseOrderItems = sqliteTable('purchase_order_items', {
  id: text('id').primaryKey(),
  purchaseOrderId: text('purchase_order_id').notNull(),
  productId: text('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});

export const salesOrderItems = sqliteTable('sales_order_items', {
  id: text('id').primaryKey(),
  salesOrderId: text('sales_order_id').notNull(),
  productId: text('product_id').notNull(),
  quantity: integer('quantity').notNull(),
  price: real('price').notNull(),
});

export const inventoryTransactions = sqliteTable('inventory_transactions', {
  id: text('id').primaryKey(),
  productId: text('product_id').notNull(),
  type: text('type').notNull(), // IN, OUT
  quantity: integer('quantity').notNull(),
  date: text('date').notNull(),
  referenceId: text('reference_id').notNull(), // PO or SO ID
  referenceType: text('reference_type').notNull(), // PO, SO, MANUAL
});

export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  pic: text('pic').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  address: text('address'),
  npwp: text('npwp'),
  status: text('status').notNull().default('Active'),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  companyName: text('company_name').notNull(),
  pic: text('pic').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  productInterest: text('product_interest'),
  source: text('source').notNull(), // Website, Referral, etc.
  status: text('status').notNull(), // New, Contacted, Qualified, Proposal, Negotiation, Won, Lost
  score: integer('score').default(0),
  owner: text('owner'),
  estimatedValue: integer('estimated_value').default(0),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});

export const activities = sqliteTable('activities', {
  id: text('id').primaryKey(),
  type: text('type').notNull(), // Call, Email, Meeting, WhatsApp
  referenceId: text('reference_id').notNull(), // leadId or customerId
  referenceType: text('reference_type').notNull(), // Lead, Customer
  date: text('date').notNull(),
  notes: text('notes').notNull(),
  performedBy: text('performed_by').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
});
