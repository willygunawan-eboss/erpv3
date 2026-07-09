import fs from 'fs';
const file = 'src/routes/ticketRoutes.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  /if \(req\.body\[k\] === ""\) req\.body\[k\] = undefined;/g,
  'if (req.body[k] === "") req.body[k] = null;'
);

fs.writeFileSync(file, code);
