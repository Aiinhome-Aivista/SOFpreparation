import { useState, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../../ui/Cards';
import { Badge } from '../../ui/Badge';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '../../admin/ui-common/Tab';
import { Toast } from 'primereact/toast';
import {
  ClipboardCheck,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  Users,
  CheckCircle2,
} from 'lucide-react';
import TestAssignModal from '../../../common/modal/TestAssignModal';

export default function TestAssignment() {
  const toast = useRef(null);
  const [showAssignTest, setShowAssignTest] = useState(false);
  const [assignments, setAssignments] = useState([
    {
      id: '1',
      testName: 'Science Olympiad Mock Test 1',
      subject: 'Science',
      class: '7',
      assignedTo: ['1', '3'],
      assignedDate: '2024-11-15',
      dueDate: '2024-11-22',
      duration: 60,
      totalQuestions: 50,
      status: 'pending',
      completedBy: 1,
    },
    {
      id: '2',
      testName: 'Mathematics Speed Challenge',
      subject: 'Mathematics',
      class: '6',
      assignedTo: ['3', '6'],
      assignedDate: '2024-11-18',
      dueDate: '2024-11-25',
      duration: 45,
      totalQuestions: 40,
      status: 'pending',
      completedBy: 0,
    },
  ]);

  const students = [
    { id: '1', name: 'Aarav Kumar', email: 'aarav@example.com', class: '7', parentName: 'Rajesh Kumar' },
    { id: '2', name: 'Diya Sharma', email: 'diya@example.com', class: '5', parentName: 'Priya Sharma' },
    { id: '3', name: 'Arjun Patel', email: 'arjun@example.com', class: '6', parentName: 'Amit Patel' },
    { id: '4', name: 'Ananya Patel', email: 'ananya@example.com', class: '8', parentName: 'Amit Patel' },
    { id: '5', name: 'Ishaan Patel', email: 'ishaan@example.com', class: '4', parentName: 'Amit Patel' },
    { id: '6', name: 'Riya Gupta', email: 'riya@example.com', class: '6', parentName: 'Sneha Gupta' },
  ];

  const handleAssignTest = (assignmentData) => {
    if (!assignmentData.testName || !assignmentData.subject || assignmentData.selectedStudents.length === 0) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please fill in all required fields and select at least one student' });
      return;
    }

    const assignment = {
      id: Math.random().toString(36).substring(2, 9),
      testName: assignmentData.testName,
      subject: assignmentData.subject,
      class: assignmentData.class,
      assignedTo: assignmentData.selectedStudents,
      assignedDate: new Date().toISOString().split('T')[0],
      dueDate: assignmentData.dueDate.toISOString().split('T')[0],
      duration: assignmentData.duration,
      totalQuestions: assignmentData.totalQuestions,
      status: 'upcoming',
      completedBy: 0,
    };

    setAssignments([assignment, ...assignments]);
    setShowAssignTest(false);
    toast.current.show({ severity: 'success', summary: 'Success', detail: `Test "${assignment.testName}" assigned to ${assignment.assignedTo.length} students` });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-green-100 text-green-800 border-0';

      case 'completed': return 'bg-gray-100 text-gray-800 border-0';
      default: return 'bg-gray-100 text-gray-800 border-0';
    }
  };

  const groupedAssignments = {
    all: assignments,
    pending: assignments.filter((a) => a.status === 'pending'),
    completed: assignments.filter((a) => a.status === 'completed'),
  };

  return (
    <div className="space-y-6">
      <Toast ref={toast} />
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">Test Assignment</CardTitle>
              <CardDescription>Assign tests to specific students or groups</CardDescription>
            </div>
            <button
              onClick={() => setShowAssignTest(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 cursor-pointer"
            >
              <Plus className="size-4" />
              Assign Test
            </button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
              <p className="text-sm text-gray-600">Total Assignments</p>
              <p className="text-xl font-semibold text-blue-900">{assignments.length}</p>
            </div>
            <div className="p-4 rounded-lg border bg-green-50 border-green-100">
              <p className="text-sm text-gray-600">Pending Tests</p>
              <p className="text-xl font-semibold text-green-900">{assignments.filter((a) => a.status === 'pending').length}</p>
            </div>
            <div className="p-4 rounded-lg border bg-purple-50 border-purple-100">
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-semibold text-purple-900">{assignments.filter((a) => a.status === 'completed').length}</p>
            </div>
            <div className="p-4 rounded-lg border bg-orange-50 border-orange-100">
              <p className="text-sm text-gray-600">Completion Rate</p>
              <p className="text-xl font-semibold text-orange-900">
                {assignments.length > 0 ? Math.round((assignments.reduce((acc, a) => acc + a.completedBy, 0) / assignments.reduce((acc, a) => acc + a.assignedTo.length, 0)) * 100) : 0}%
              </p>
            </div>
          </div>

          <div className="rounded-lg">

            <Tabs defaultValue="all" className="mt-4">

              {/* Tabs Header */}
              <TabsList className="flex gap-3 bg-gray-100 p-1 rounded-full w-fit">
                {[
                  { key: "all", label: "All" },
                  { key: "pending", label: "Pending" },
                  { key: "completed", label: "Completed" },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.key}
                    value={tab.key}
                    className="
          rounded-full px-4 py-1 font-medium text-sm text-gray-600
          data-[state=pending]:bg-blue-600
          data-[state=pending]:text-white
          transition-all
        "
                  >
                    {tab.label} ({groupedAssignments[tab.key].length})
                  </TabsTrigger>
                ))}
              </TabsList>

              {/* Tab Panels */}
              {["all", "pending", "completed"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4 space-y-3">

                  {groupedAssignments[tab].length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <ClipboardCheck className="size-12 mx-auto mb-3 text-gray-300" />
                      No {tab} tests found
                    </div>
                  ) : (
                    groupedAssignments[tab].map((assignment) => (
                      <Card key={assignment.id} className="hover:shadow-md mb-4 border border-gray-200 rounded-xl">
                        <CardContent className="p-5 space-y-3">

                          {/* Title */}
                          <h3 className="text-blue-900">
                            {assignment.testName}
                          </h3>

                          {/* Badges */}
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-blue-50 text-blue-700 border border-blue-200">
                              Class {assignment.class}
                            </Badge>
                            <Badge className="bg-green-50 text-green-700 border border-green-200">
                              {assignment.subject}
                            </Badge>
                            <Badge className={getStatusColor(assignment.status)}>
                              {assignment.status}
                            </Badge>
                          </div>

                          {/* Stats Row */}
                          <div className="grid grid-cols-4 gap-4 text-gray-700 text-sm">
                            <div className="flex items-center gap-2">
                              <Users className="w-4" />
                              {assignment.assignedTo.length} students assigned
                            </div>

                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4" />
                              {assignment.completedBy}/{assignment.assignedTo.length} completed
                            </div>

                            <div className="flex items-center gap-2">
                              <Clock className="w-4" />
                              {assignment.duration} minutes
                            </div>

                            <div className="flex items-center gap-2">
                              <CalendarIcon className="w-4" />
                              Due: {new Date(assignment.dueDate).toLocaleDateString()}
                            </div>
                          </div>

                          {/* Footer */}
                          <p className="text-xs text-gray-500">
                            {assignment.totalQuestions} questions • Assigned on {new Date(assignment.assignedDate).toLocaleDateString()}
                          </p>

                        </CardContent>
                      </Card>

                    ))
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
      <TestAssignModal
        visible={showAssignTest}
        onHide={() => setShowAssignTest(false)}
        students={students}
        onAssignTest={handleAssignTest}
      />
    </div>
  );
}
