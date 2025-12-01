import { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../ui/Cards";
import { Badge } from "../../ui/Badge";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "../ui-common/Table";

import { InputText } from "primereact/inputtext";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import {
  Mail,
  Phone,
  Calendar,
  User,
  TrendingUp,
  Trash2,
  GraduationCap,
} from "lucide-react";

export default function StudentsManager() {
  const toast = useRef(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [students, setStudents] = useState([
    {
      id: "1",
      name: "Aarav Kumar",
      email: "aarav@example.com",
      grade: "7",
      parentName: "Rajesh Kumar",
      parentEmail: "rajesh@example.com",
      testsCompleted: 12,
      averageScore: 85,
      status: "active",
    },
    {
      id: "2",
      name: "Diya Sharma",
      email: "diya@example.com",
      grade: "5",
      parentName: "Priya Sharma",
      parentEmail: "priya@example.com",
      testsCompleted: 8,
      averageScore: 92,
      status: "active",
    },
    {
      id: "3",
      name: "Arjun Patel",
      email: "arjun@example.com",
      grade: "6",
      parentName: "Amit Patel",
      parentEmail: "amit@example.com",
      testsCompleted: 15,
      averageScore: 78,
      status: "active",
    },
    {
      id: "4",
      name: "Ananya Patel",
      email: "ananya@example.com",
      grade: "8",
      parentName: "Amit Patel",
      parentEmail: "amit@example.com",
      testsCompleted: 20,
      averageScore: 88,
      status: "active",
    },
    {
      id: "5",
      name: "Ishaan Patel",
      email: "ishaan@example.com",
      grade: "4",
      parentName: "Amit Patel",
      parentEmail: "amit@example.com",
      testsCompleted: 5,
      averageScore: 70,
      status: "active",
    },
    {
      id: "6",
      name: "Riya Gupta",
      email: "riya@example.com",
      grade: "6",
      parentName: "Sneha Gupta",
      parentEmail: "sneha@example.com",
      testsCompleted: 3,
      averageScore: 65,
      status: "suspended",
    },
  ]);

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.parentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Delete Dialog
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const deleteStudent = (studentId) => {
    const student = students.find((s) => s.id === studentId);
    setStudents(students.filter((s) => s.id !== studentId));
    toast.current.show({
      severity: "success",
      summary: "Deleted",
      detail: `Student ${student?.name} deleted.`,
    });
  };

  // Color for grade badges
  const gradeColors = {
    4: "bg-blue-100 text-blue-800 border-0",
    5: "bg-green-100 text-green-800 border-0",
    6: "bg-purple-100 text-purple-800 border-0",
    7: "bg-orange-100 text-orange-800 border-0",
    8: "bg-pink-100 text-pink-800 border-0",
  };

  return (
    <div className="space-y-6">
      <Toast ref={toast} />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-900">
                Students Management
              </CardTitle>
              <CardDescription>
                View and manage all student accounts across the platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Search */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Search</label>
            <InputText
              placeholder="Search by name, email, or parent..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg border bg-blue-50 border-blue-100">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-xl font-semibold text-blue-900">
                {students.length}
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-green-50 border-green-100">
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-xl font-semibold text-green-900">
                {students.filter((s) => s.status === "active").length}
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-purple-50 border-purple-100">
              <p className="text-sm text-gray-600">Total Tests Completed</p>
              <p className="text-xl font-semibold text-purple-900">
                {students.reduce((acc, s) => acc + s.testsCompleted, 0)}
              </p>
            </div>

            <div className="p-4 rounded-lg border bg-orange-50 border-orange-100">
              <p className="text-sm text-gray-600">Avg Platform Score</p>
              <p className="text-xl font-semibold text-orange-900">
                {Math.round(
                  students.reduce((acc, s) => acc + s.averageScore, 0) /
                    students.length
                )}
                %
              </p>
            </div>
          </div>

          {/* TABLE */}
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-bottom-2 border-gray-300">
                  <TableHead>Student</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Parent</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Avg Score</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="border-b border-bottom-2 border-gray-300"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <GraduationCap className="size-4 text-blue-600" />
                        </div>
                        <div>
                          <p>{student.name}</p>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Mail className="size-3" />
                            {student.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          gradeColors[student.grade] ||
                          "bg-gray-100 text-gray-800 border-0"
                        }
                      >
                        Grade {student.grade}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="size-3 text-gray-400" />
                        <div>
                          <p className="text-sm">{student.parentName}</p>
                          <p className="text-xs text-gray-500">
                            {student.parentEmail}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge className="bg-gray-50 text-black border-2 border-gray-300">
                        {student.testsCompleted} completed
                      </Badge>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        <TrendingUp
                          className={`size-4 ${
                            student.averageScore >= 80
                              ? "text-green-600"
                              : student.averageScore >= 60
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        />
                        <span
                          className={`${
                            student.averageScore >= 80
                              ? "text-green-600"
                              : student.averageScore >= 60
                              ? "text-orange-600"
                              : "text-red-600"
                          }`}
                        >
                          {student.averageScore}%
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        className={
                          student.status === "active"
                            ? "bg-green-100 text-green-800 border-0"
                            : "bg-red-100 text-red-800 border-0"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setConfirmVisible(true);
                        }}
                        className="p-2 hover:bg-gray-200 rounded-md"
                      >
                        <Trash2 className="size-4 text-red-600" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* DELETE CONFIRMATION */}
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message="Are you sure you want to delete this student?"
        header="Confirm Delete"
        icon="pi pi-exclamation-triangle"
        position="center"
        draggable={false}
        accept={() => {
          if (selectedStudent) deleteStudent(selectedStudent.id);
          setConfirmVisible(false);
        }}
        reject={() => setConfirmVisible(false)}
      />
    </div>
  );
}
