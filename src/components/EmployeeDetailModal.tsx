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
        const json = await res.json();
        setData((prev: any) => ({ ...prev, [tabId]: json.data }));
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
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
              {employee.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{employee.name}</h2>
              <p className="text-sm text-slate-500">{employee.id} • {employee.role} • {employee.department}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Tabs */}
          <div className="w-64 border-r border-slate-100 bg-slate-50/50 overflow-y-auto p-4 space-y-1">
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
                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">{tabs.find(t => t.id === activeTab)?.label} Information</h3>
              {activeTab !== 'profile' && activeTab !== 'attendance' && (
                <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                  + Add Record
                </button>
              )}
            </div>

            {activeTab === 'profile' ? (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Join Date</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.joinDate}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.role}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Department</label>
                    <p className="font-medium text-slate-900 mt-1">{employee.department}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
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
               <div className="p-8 text-center text-slate-500 bg-slate-50 rounded-lg border border-dashed border-slate-200 mt-4">Attendance data is managed in the main Attendance tab.</div>
            ) : (
              renderTable(activeTab)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
