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
  const [activeTab, setActiveTab] = useState("tests");

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

  // return (
  //   <div className="container mx-auto px-8 py-8">
  //     <Tabs defaultValue="tests" className="space-y-6">

  //       <TabsList className="bg-white shadow-sm border border-gray-100 rounded-xl p-2 w-md">
          
  //         <TabsTrigger value="tests" className="flex items-center gap-2">
  //           <BookOpen className="size-4" />
  //           My Tests
  //         </TabsTrigger>

  //         <TabsTrigger value="smart" className="flex items-center gap-2">
  //           <Sparkles className="size-4" />
  //           Smart Study
  //         </TabsTrigger>

  //         <TabsTrigger value="practice" className="flex items-center gap-2">
  //           <Target className="size-4" />
  //           Self Practice
  //         </TabsTrigger>
  //       </TabsList>

  //       <TabsContent value="tests">
  //         <MyTests onStartTest={handleStartTest} />
         
  //       </TabsContent>

  //       <TabsContent value="smart">
  //         <SmartStudy />
  //       </TabsContent>

  //       <TabsContent value="practice">
  //         <SelfPractice onStartTest={handleStartTest} />
  //       </TabsContent>

  //     </Tabs>
  //   </div>
  // );

  return (
  <div className="container mx-auto px-8 py-8">

    {/* Custom Tabs — same design as your first code */}
    <div className="flex gap-4 pb-6">
      {[
        { id: "tests", label: "My Tests", icon: <BookOpen className="size-4" /> },
        { id: "smart", label: "Smart Study", icon: <Sparkles className="size-4" /> },
        { id: "practice", label: "Self Practice", icon: <Target className="size-4" /> },
      ].map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-6 py-3 rounded-xl font-semibold cursor-pointer
              ${isActive
                ? "bg-[#1C398E] text-white"
                : "bg-[#E8F0FF] text-[#1C398E] hover:bg-[#bcd2ff]"
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>

    {/* CONTENT */}
    {activeTab === "tests" && <MyTests onStartTest={handleStartTest} />}
    {activeTab === "smart" && <SmartStudy />}
    {activeTab === "practice" && <SelfPractice onStartTest={handleStartTest} />}
  </div>
);

}

export default StudentDashboard;