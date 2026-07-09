import fs from 'fs';
const file = 'src/components/HelpdeskView.tsx';
let code = fs.readFileSync(file, 'utf8');

const target = `  const openCreateModal = () => {
    setFormMode('create');
    setFormData({
      title: '', description: '', customerId: '', categoryId: '', subCategoryId: '', 
      priorityId: '', impactId: '', urgencyId: '', assetId: '', assignedTo: '', reportedBy: '', statusId: references.statuses[0]?.id || ''
    });
    setIsModalOpen(true);
  };`;

const replacement = `  const openCreateModal = () => {
    setFormMode('create');
    
    // Default values if exist
    const defCategory = references.categories[0]?.id || '';
    const defSubCategory = references.subCategories.find((s)=>s.categoryId === defCategory)?.id || '';
    
    setFormData({
      title: '', description: '', customerId: '', 
      categoryId: defCategory, 
      subCategoryId: defSubCategory, 
      priorityId: references.priorities[0]?.id || '', 
      impactId: references.impacts[0]?.id || '', 
      urgencyId: references.urgencies[0]?.id || '', 
      assetId: '', assignedTo: '', reportedBy: '', statusId: references.statuses[0]?.id || ''
    });
    setIsModalOpen(true);
  };`;

code = code.replace(target, replacement);

// Also remove the "required" from HTML elements just in case they clear it, let the API handle it with Zod.
code = code.replace(/<select required/g, '<select');
code = code.replace(/<input required/g, '<input');
code = code.replace(/<textarea required/g, '<textarea');

fs.writeFileSync(file, code);
