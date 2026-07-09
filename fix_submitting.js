import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

if (!code.includes('isSubmitting')) {
  code = code.replace(
    'const [isDetailOpen, setIsDetailOpen] = useState(false);',
    'const [isDetailOpen, setIsDetailOpen] = useState(false);\n  const [isSubmitting, setIsSubmitting] = useState(false);'
  );
  
  code = code.replace(
    'const handleSubmit = async (e: React.FormEvent) => {',
    'const handleSubmit = async (e: React.FormEvent) => {\n    if (isSubmitting) return;\n    setIsSubmitting(true);'
  );
  
  code = code.replace(
    '  const totalPages = Math.ceil(total / limit);',
    '    setIsSubmitting(false);\n  const totalPages = Math.ceil(total / limit);'
  );
  
  code = code.replace(
    /<button type="submit"[^>]*>Save<\/button>/,
    '<button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">Save</button>'
  );
}

fs.writeFileSync(file, code);
