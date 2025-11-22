import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui-common/Tab";
import { BookOpen, Sparkles, Target } from "lucide-react";
import MyTests from "../steps/MyTests";
import SmartStudy from "../steps/SmartStudy";
import SelfPractice from "../steps/SelfPractice";
import TestInterface from "../test/TestInterface"; // IMPORTANT

function StudentDashboard({ onStartTest }) {

  const [screen, setScreen] = useState("dashboard"); // dashboard | test
  const [selectedTestId, setSelectedTestId] = useState(null);

  const handleStartTest = (testId) => {
    setSelectedTestId(testId);
    setScreen("test");
  };

  const handleTestComplete = () => {
    setScreen("dashboard");
  };

  // If Test is running → show TestInterface only
  if (screen === "test") {
    return (
      <TestInterface
        testId={selectedTestId}
        studentName="Student Name"
        onComplete={handleTestComplete}
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Tabs defaultValue="tests" className="space-y-6">

        <TabsList className="bg-white shadow-sm border border-gray-100 rounded-xl p-2 w-md">
          
          <TabsTrigger value="tests" className="flex items-center gap-2">
            <BookOpen className="size-4" />
            My Tests
          </TabsTrigger>

          <TabsTrigger value="smart" className="flex items-center gap-2">
            <Sparkles className="size-4" />
            Smart Study
          </TabsTrigger>

          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Target className="size-4" />
            Self Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tests">
          <MyTests onStartTest={handleStartTest} />
         
        </TabsContent>

        <TabsContent value="smart">
          <SmartStudy />
        </TabsContent>

        <TabsContent value="practice">
          <SelfPractice onStartTest={handleStartTest} />
        </TabsContent>

      </Tabs>
    </div>
  );
}

export default StudentDashboard;