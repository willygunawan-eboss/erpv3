import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  `onChange={e => setFormData({...formData, categoryId: e.target.value, subCategoryId: ''})}`,
  `onChange={e => {
                      const newCat = e.target.value;
                      const defaultSub = references.subCategories.find((s:any)=>s.categoryId === newCat)?.id || '';
                      setFormData({...formData, categoryId: newCat, subCategoryId: defaultSub});
                    }}`
);

fs.writeFileSync(file, code);
