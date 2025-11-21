import React from "react";
import { Card } from "../ui/Cards";
import { Badge } from "../ui/Badge";
import {
  Clock,
  PlayCircle,
  CheckCircle,
  Calendar,
  AlertCircle,
  BookOpen,
} from "lucide-react";

export default function MyTests({ onStartTest }) {
  const pendingTests = [
    {
      id: "1",
      title: "IMO Mathematics - Algebra & Geometry",
      subject: "Mathematics",
      questions: 25,
      duration: 45,
      status: "pending",
      dueDate: "2025-11-25",
    },
    {
      id: "2",
      title: "NSO Science - Physics Fundamentals",
      subject: "Science",
      questions: 20,
      duration: 30,
      status: "pending",
      dueDate: "2025-11-27",
    },
    {
      id: "3",
      title: "IEO English - Grammar & Comprehension",
      subject: "English",
      questions: 30,
      duration: 40,
      status: "overdue",
      dueDate: "2025-11-18",
    },
  ];

  const completedTests = [
    {
      id: "4",
      title: "IMO Mathematics - Number System",
      subject: "Mathematatics",
      questions: 20,
      duration: 30,
      status: "completed",
      score: 85,
      dueDate: "2025-11-15",
      completedDate: "2025-11-14",
    },
    {
      id: "5",
      title: "NSO Science - Biology",
      subject: "Science",
      questions: 25,
      duration: 35,
      status: "completed",
      score: 92,
      dueDate: "2025-11-10",
      completedDate: "2025-11-09",
    },
  ];

  const getStatusBadge = (status) => {
    if (status === "pending") {
      return (
        <Badge className="bg-blue-50 text-blue-700 border-blue-200 border">
          <Clock className="size-3 mr-1" />
          Pending
        </Badge>
      );
    }
    if (status === "completed") {
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 border">
          <CheckCircle className="size-3 mr-1" />
          Completed
        </Badge>
      );
    }
    if (status === "overdue") {
      return (
        <Badge className="bg-red-50 text-red-700 border-red-200 border">
          <AlertCircle className="size-3 mr-1" />
          Overdue
        </Badge>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">

      {/* Pending Tests */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-blue-900">Pending Tests</h2>
            <p className="text-sm text-gray-600">
              Complete these tests before the due date
            </p>
          </div>
          <Badge className="bg-blue-600 text-white">
            {pendingTests.length} Tests
          </Badge>
        </div>

        <div className="space-y-3">
          {pendingTests.map((test) => (
            <Card
              key={test.id}
              className={
                "p-6 hover:shadow-md transition-shadow border-2" +
                (test.status === "overdue"
                  ? " border-red-200 bg-red-50/50"
                  : " border-gray-200")
              }
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                {/* Left Info */}
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                      <PlayCircle className="size-5 text-white" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-blue-900">{test.title}</h3>
                        {getStatusBadge(test.status)}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {test.subject}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen className="size-4" />
                          {test.questions} Questions
                        </div>

                        <div className="flex items-center gap-1">
                          <Clock className="size-4" />
                          {test.duration} Minutes
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          Due: {new Date(test.dueDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replace Button component with RAW button */}
                <button
                  onClick={() => onStartTest(test.id)}
                  className={
                    (test.status === "overdue"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-blue-600 hover:bg-blue-700") +
                    " text-white px-4 py-2 rounded-md w-full sm:w-auto flex items-center justify-center"
                  }
                >
                  <PlayCircle className="size-4 mr-2" />
                  Start Test
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Completed Tests */}
      <div>
        <h2 className="text-blue-900 mb-1">Completed Tests</h2>
        <p className="text-sm text-gray-600 mb-4">
          Review your past performance
        </p>

        <div className="space-y-3">
          {completedTests.map((test) => (
            <Card key={test.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                <div className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="size-5 text-green-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="text-blue-900">{test.title}</h3>
                        {getStatusBadge(test.status)}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">{test.subject}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen className="size-4" />
                          {test.questions} Questions
                        </div>

                        <div className="flex items-center gap-1">
                          <Calendar className="size-4" />
                          Completed:{" "}
                          {test.completedDate
                            ? new Date(test.completedDate).toLocaleDateString()
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Replace Button component here too */}
                <button className="px-4 py-2 rounded-md border bg-white text-blue-600 w-full sm:w-auto">
                  View Details
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
