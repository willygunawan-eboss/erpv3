import fs from 'fs';
const file = 'src/routes/ticketRoutes.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'const validatedData = ticketSchema.parse(req.body);',
  `// clean empty strings
    Object.keys(req.body).forEach(k => {
      if (req.body[k] === "") req.body[k] = null;
    });
    const validatedData = ticketSchema.parse(req.body);`
);

code = code.replace(
  'const validatedData = ticketSchema.partial().parse(req.body);',
  `// clean empty strings
    Object.keys(req.body).forEach(k => {
      if (req.body[k] === "") req.body[k] = null;
    });
    const validatedData = ticketSchema.partial().parse(req.body);`
);

fs.writeFileSync(file, code);
