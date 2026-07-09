import React, { useState, useEffect } from 'react';
import { X, User, FileText, Users, Phone, CreditCard, Receipt, Activity, Briefcase, DollarSign, TrendingUp, Calendar, Clock, Monitor, Award, Star, File, Map } from 'lucide-react';

export function EmployeeDetailModal({ employee, onClose }: { employee: any, onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [data, setData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'contracts', label: 'Contract', icon: FileText },
    { id: 'families', label: 'Family', icon: Users },
    { id: 'emergency-contacts', label: 'Emergency Contact', icon: Phone },
    { id: 'banks', label: 'Bank', icon: CreditCard },
    { id: 'taxes', label: 'Tax', icon: Receipt },
    { id: 'bpjs', label: 'BPJS', icon: Activity },
    { id: 'position-histories', label: 'Position History', icon: Briefcase },
    { id: 'salary-histories', label: 'Salary History', icon: DollarSign },
    { id: 'promotion-histories', label: 'Promotion History', icon: TrendingUp },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'leaves', label: 'Leave', icon: Calendar },
    { id: 'overtimes', label: 'Overtime', icon: Clock },
    { id: 'assets', label: 'Assets', icon: Monitor },
    { id: 'trainings', label: 'Training', icon: Award },
    { id: 'performances', label: 'Performance', icon: Star },
    { id: 'documents', label: 'Document', icon: File },
    { id: 'shifts', label: 'Shift', icon: Map },
  ];

  useEffect(() => {
    if (activeTab !== 'profile' && activeTab !== 'attendance') {
      fetchTabData(activeTab);
    }
  }, [activeTab]);

  const fetchTabData = async (tabId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/employees/${employee.id}/${tabId}`);
      if (res.ok) {
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          setData((prev: any) => ({ ...prev, [tabId]: json.data }));
        } else {
          setData((prev: any) => ({ ...prev, [tabId]: [] }));
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (tabId: string) => {
    const records = data[tabId] || [];
    if (loading) return <div className="p-8 text-center text-slate-500">Loading...</div>;
    if (records.length === 0) return <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200 mt-4">No records found for {tabs.find(t => t.id === tabId)?.label}.</div>;

    const keys = Object.keys(records[0]).filter(k => k !== 'id' && k !== 'employeeId');

    return (
      <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase">
              {keys.map(k => <th key={k} className="px-4 py-3">{k.replace(/([A-Z])/g, ' $1').trim()}</th>)}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {records.map((row: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50">
                {keys.map(k => <td key={k} className="px-4 py-3">{row[k]}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[95vh] md:max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-start md:items-center justify-between p-4 md:p-6 border-b border-slate-100 gap-2 relative">
          <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1 pr-10">
            <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-base md:text-lg">
              {employee.name.charAt(0)}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg md:text-xl font-bold text-slate-900 truncate">{employee.name}</h2>
              <p className="text-xs md:text-sm text-slate-500 truncate">{employee.id} • {employee.role} • {employee.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="absolute right-3 top-3 md:relative md:right-auto md:top-auto p-2 flex-shrink-0 hover:bg-slate-100 rounded-full transition-colors z-10 bg-white md:bg-transparent shadow-sm md:shadow-none border border-slate-200 md:border-transparent">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          {/* Mobile Tabs Dropdown */}
          <div className="md:hidden p-4 border-b border-slate-100 bg-slate-50">
            <select 
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm"
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>

          {/* Desktop Sidebar Tabs */}
          <div className="hidden md:block w-64 border-r border-slate-100 bg-slate-50/50 overflow-y-auto p-4 space-y-1 hide-scrollbar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <tab.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-3 sm:gap-0">
              <h3 className="text-lg font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label} Information</h3>
              {activeTab !== 'profile' && activeTab !== 'attendance' && (
                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors w-full sm:w-auto">
                  + Add Record
                </button>
              )}
            </div>

            {activeTab === 'profile' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <p className="font-medium text-slate-900 mt-1 break-words">{employee.name}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                    <p className="font-medium text-slate-900 mt-1 break-words">{employee.email}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Join Date</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.role}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.department}</p>
                  </div>
                  <div>
                    <label className="text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label><br/>
                    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium mt-1 ${
                      employee.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                      'bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-600/20'
                    }`}>
                      {employee.status}
                    </span>
                  </div>
                </div>
              </div>
            ) : activeTab === 'attendance' ? (
               <div className="p-6 md:p-8 text-center text-sm md:text-base text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200 mt-4">Attendance data is managed in the main Attendance tab.</div>
            ) : (
              renderTable(activeTab)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
