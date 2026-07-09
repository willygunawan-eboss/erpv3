import fs from 'fs';
const file = 'src/routes/ticketRoutes.ts';
let code = fs.readFileSync(file, 'utf8');

const oldCode = `    const getStatusType = (id) => statuses.find(s => s.id === id)?.type || '';
    const getPriorityLevel = (id) => priorities.find(p => p.id === id)?.level || 0;
    
    const openStatusTypes = ['open', 'in_progress', 'new'];
    const openTickets = tickets.filter(t => openStatusTypes.includes(getStatusType(t.statusId))).length;
    const criticalTickets = tickets.filter(t => getPriorityLevel(t.priorityId) >= 3 && openStatusTypes.includes(getStatusType(t.statusId))).length;
    const waitingCustomerTickets = tickets.filter(t => getStatusType(t.statusId) === 'waiting_customer').length;
    const resolvedToday = tickets.filter(t => 
      getStatusType(t.statusId) === 'resolved' && 
      t.actualResolutionDate && 
      t.actualResolutionDate.startsWith(todayStr)
    ).length;
    const closedToday = tickets.filter(t => 
      getStatusType(t.statusId) === 'closed' && 
      t.updatedAt && 
      t.updatedAt.startsWith(todayStr)
    ).length;
    
    const ticketsWithSLA = tickets.filter(t => t.expectedResolutionDate && t.actualResolutionDate);
    const slaMet = ticketsWithSLA.filter(t => new Date(t.actualResolutionDate) <= new Date(t.expectedResolutionDate)).length;
    const slaCompliance = ticketsWithSLA.length > 0 ? Math.round((slaMet / ticketsWithSLA.length) * 100) : 100;
    
    const slaBreach = tickets.filter(t => {
      if (t.actualResolutionDate && t.expectedResolutionDate) {
        return new Date(t.actualResolutionDate) > new Date(t.expectedResolutionDate);
      }
      if (!t.actualResolutionDate && t.expectedResolutionDate && openStatusTypes.includes(getStatusType(t.statusId))) {
        return new Date() > new Date(t.expectedResolutionDate);
      }
      return false;
    }).length;`;

const newCode = `    const getStatusIsClosed = (id: string | null) => statuses.find(s => s.id === id)?.isClosed || false;
    const getStatusName = (id: string | null) => statuses.find(s => s.id === id)?.name?.toLowerCase() || '';
    const getPriorityLevel = (id: string | null) => priorities.find(p => p.id === id)?.level || 0;
    
    const openTickets = tickets.filter(t => !getStatusIsClosed(t.statusId)).length;
    const criticalTickets = tickets.filter(t => getPriorityLevel(t.priorityId) >= 3 && !getStatusIsClosed(t.statusId)).length;
    const waitingCustomerTickets = tickets.filter(t => getStatusName(t.statusId).includes('wait') || getStatusName(t.statusId).includes('pending')).length;
    const resolvedToday = tickets.filter(t => 
      (getStatusName(t.statusId).includes('resolv') || getStatusName(t.statusId).includes('selesai')) && 
      t.actualResolutionDate && 
      t.actualResolutionDate.startsWith(todayStr)
    ).length;
    const closedToday = tickets.filter(t => 
      getStatusIsClosed(t.statusId) && 
      t.updatedAt && 
      t.updatedAt.startsWith(todayStr)
    ).length;
    
    const ticketsWithSLA = tickets.filter(t => t.expectedResolutionDate && t.actualResolutionDate);
    const slaMet = ticketsWithSLA.filter(t => new Date(t.actualResolutionDate!) <= new Date(t.expectedResolutionDate!)).length;
    const slaCompliance = ticketsWithSLA.length > 0 ? Math.round((slaMet / ticketsWithSLA.length) * 100) : 100;
    
    const slaBreach = tickets.filter(t => {
      if (t.actualResolutionDate && t.expectedResolutionDate) {
        return new Date(t.actualResolutionDate) > new Date(t.expectedResolutionDate);
      }
      if (!t.actualResolutionDate && t.expectedResolutionDate && !getStatusIsClosed(t.statusId)) {
        return new Date() > new Date(t.expectedResolutionDate);
      }
      return false;
    }).length;`;

code = code.replace(oldCode, newCode);
code = code.replace(
  `tickets.filter(t => openStatusTypes.includes(getStatusType(t.statusId))).forEach`, 
  `tickets.filter(t => !getStatusIsClosed(t.statusId)).forEach`
);
fs.writeFileSync(file, code);
