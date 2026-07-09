import fs from 'fs';
const file = 'src/routes/ticketRoutes.ts';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/if \(req\.body\[k\] === ""\) req\.body\[k\] = null;/g, 'if (req.body[k] === "") req.body[k] = undefined;');

fs.writeFileSync(file, code);
