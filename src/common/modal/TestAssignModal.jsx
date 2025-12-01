import { useState } from 'react';
import {
  ClipboardCheck,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar as PrimeCalendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Badge } from '../../components/ui/Badge';

export default function TestAssignModal({ visible, onHide, students, onAssignTest }) {
  const [newAssignment, setNewAssignment] = useState({
    testName: '',
    subject: '',
    grade: '7',
    duration: 60,
    totalQuestions: 50,
    dueDate: new Date(),
    selectedStudents: [],
    assignToAll: false,
  });

  const [filterGrade, setFilterGrade] = useState(null);

  const gradeOptions = [
    { label: 'All Grades', value: null },
    { label: 'Grade 4', value: '4' },
    { label: 'Grade 5', value: '5' },
    { label: 'Grade 6', value: '6' },
    { label: 'Grade 7', value: '7' },
    { label: 'Grade 8', value: '8' },
  ];
  const subjectOptions = [
  { label: "Math", value: "Math" },
  { label: "Science", value: "Science" },
  { label: "English", value: "English" },
  { label: "Social Studies", value: "Social Studies" },
  { label: "Computer", value: "Computer" },
];


  const filteredStudents = students.filter(
    (student) => !filterGrade || student.grade === filterGrade
  );

  const handleStudentToggle = (studentId) => {
    setNewAssignment((prev) => ({
      ...prev,
      selectedStudents: prev.selectedStudents.includes(studentId)
        ? prev.selectedStudents.filter((id) => id !== studentId)
        : [...prev.selectedStudents, studentId],
    }));
  };

  const handleAssignToAll = (checked) => {
    setNewAssignment((prev) => ({
      ...prev,
      assignToAll: checked,
      selectedStudents: checked ? filteredStudents.map((s) => s.id) : [],
    }));
  };

  const handleAssign = () => {
    onAssignTest(newAssignment);
  };

  return (
    <Dialog visible={visible} onHide={onHide} header="Assign Test to Students" className="w-[90%] md:w-[50%]" position="center" draggable={false}>
      <div className="space-y-4 p-4">
        <div className="space-y-4">
          <div className="space-y-1"><label className="text-sm font-medium">Test Name *</label><InputText id="testName" placeholder="e.g., Science Olympiad Mock Test" value={newAssignment.testName} onChange={(e) => setNewAssignment({ ...newAssignment, testName: e.target.value })} className="w-full" /></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">
                Subject <span className="text-red-500">*</span>
              </label>
              <Dropdown
                value={newAssignment.subject}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, subject: e.value })
                }
                options={subjectOptions}
                placeholder="Select Subject"
                className="w-full"
                showClear
                filter
              />
            </div>

            <div className="space-y-1"><label className="text-sm font-medium">Grade Level</label><Dropdown value={newAssignment.grade} onChange={(e) => setNewAssignment({ ...newAssignment, grade: e.value })} options={gradeOptions.slice(1)} placeholder="Select Grade" className="w-full" 
            showClear filter/></div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1"><label className="text-sm font-medium">Duration (minutes)</label><InputText id="duration" type="number" value={String(newAssignment.duration)} onChange={(e) => setNewAssignment({ ...newAssignment, duration: parseInt(e.target.value) || 60 })} className="w-full" /></div>

            <div className="space-y-1"><label className="text-sm font-medium">Total Questions</label><InputText id="questions" type="number" value={String(newAssignment.totalQuestions)} onChange={(e) => setNewAssignment({ ...newAssignment, totalQuestions: parseInt(e.target.value) || 50 })} className="w-full" /></div>

            <div className="space-y-1"><label className="text-sm font-medium">Due Date</label><PrimeCalendar value={newAssignment.dueDate} onChange={(e) => e.value && setNewAssignment({ ...newAssignment, dueDate: e.value })} className="w-full" showIcon /></div>
          </div>
        </div>
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Select Students *</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2"><Checkbox inputId="assignToAll" checked={newAssignment.assignToAll} onChange={(e) => handleAssignToAll(e.checked)} /><label htmlFor="assignToAll" className="cursor-pointer text-sm">Assign to all filtered students</label></div>
              <Dropdown value={filterGrade} onChange={(e) => setFilterGrade(e.value)} options={gradeOptions} placeholder="Filter by Grade" className="w-full" showClear />
            </div>
          </div>
          <div className="border rounded-lg p-4 max-h-64 overflow-y-auto space-y-2 hide-scrollbar">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
                <Checkbox inputId={`student-${student.id}`} value={student.id} checked={newAssignment.selectedStudents.includes(student.id)} onChange={() => handleStudentToggle(student.id)} />

                <label htmlFor={`student-${student.id}`} className="flex-1 cursor-pointer flex items-center justify-between">
                  <div><p>{student.name}</p><p className="text-sm text-gray-500">{student.email}</p></div>
                  <div className="flex gap-2"><Badge className="bg-gray-100 text-gray-800 border-0">Grade {student.grade}</Badge><Badge className="bg-blue-50 text-blue-800 border-0">{student.parentName}</Badge></div>
                </label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-600">{newAssignment.selectedStudents.length} student(s) selected</p>
        </div>
      </div>
      <div className="flex justify-end gap-2 p-4 bg-gray-50 border-t">
        <button onClick={onHide} className="px-4 py-2 border rounded-md cursor-pointer hover:bg-gray-200">Cancel</button>
        <button onClick={handleAssign} className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"><ClipboardCheck className="size-4" />Assign Test</button>
      </div>
    </Dialog>
  );
}