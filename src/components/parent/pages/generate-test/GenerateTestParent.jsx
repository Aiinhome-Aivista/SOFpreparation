import { useState } from "react";
import { ClipboardList, Plus, CheckCircle } from "lucide-react";

export default function GenerateTestParent({ children = [] }) {
  const [selectedChild, setSelectedChild] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [numQuestions, setNumQuestions] = useState("20");
  const [difficulty, setDifficulty] = useState("");
  const [timeLimit, setTimeLimit] = useState("30");
  const [showSuccess, setShowSuccess] = useState(false);

  const subjects = [
    { value: "imo", label: "IMO - Mathematics" },
    { value: "nso", label: "NSO - Science" },
    { value: "ieo", label: "IEO - English" },
    { value: "igko", label: "IGKO - General Knowledge" },
  ];

  const topics = {
    imo: ["Algebra", "Geometry", "Number System", "Mensuration", "Data Handling"],
    nso: ["Physics", "Chemistry", "Biology", "Environmental Science"],
    ieo: ["Grammar", "Vocabulary", "Reading Comprehension", "Writing Skills"],
    igko: ["History", "Geography", "Current Affairs", "Science & Technology"],
  };

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  const createTest = () => {
    if (!selectedChild || !selectedSubject || !difficulty || selectedTopics.length === 0) {
      alert("Please fill in all required fields");
      return;
    }
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col h-full">

      {/* Header */}
      <h2 className="text-[#1C398E] text-xl font-semibold">Test Generator</h2>
      <p className="text-[#4A5565] mb-6">
        Create customized tests for your children
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Form Card */}
        <div className="bg-white rounded-2xl p-6 space-y-5">

          {/* Child Select */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Select Child *</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.target.value)}
            >
              <option value="">Choose a child</option>
              {children.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.name} — Class {child.grade}
                </option>
              ))}
            </select>
          </div>

          {/* Subject Select */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Select Subject *</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 outline-none"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option value="">Choose a subject</option>
              {subjects.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          {/* Topics */}
          {selectedSubject && (
            <div className="space-y-2">
              <label className="font-medium text-sm">Select Topics *</label>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border">
                {topics[selectedSubject]?.map((topic) => (
                  <label key={topic} className="flex gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={selectedTopics.includes(topic)}
                      onChange={() => toggleTopic(topic)}
                    />
                    {topic}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Questions & Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="font-medium text-sm">Number of Questions</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={numQuestions}
                onChange={(e) => setNumQuestions(e.target.value)}
                min="10" max="50"
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm">Time Limit (minutes)</label>
              <input
                type="number"
                className="w-full border rounded-lg px-3 py-2"
                value={timeLimit}
                onChange={(e) => setTimeLimit(e.target.value)}
                min="10" max="120"
              />
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Difficulty Level *</label>
            <select
              className="w-full border rounded-lg px-3 py-2 focus:ring-2"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Choose difficulty</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          {/* Button */}
          <button
            onClick={createTest}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full py-3 flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            <Plus size={20} />
            Generate Test & Assign
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={20} />
            <p className="font-semibold text-blue-900">Test Summary</p>
          </div>

          <div className="text-sm space-y-3">
            <div>
              <span className="text-gray-600">Student:</span>
              <p>{selectedChild ? children.find(c => c.id === selectedChild)?.name : "Not selected"}</p>
            </div>

            <div>
              <span className="text-gray-600">Subject:</span>
              <p>{selectedSubject ? subjects.find(s => s.value === selectedSubject)?.label : "Not selected"}</p>
            </div>

            <div>
              <span className="text-gray-600">Topics:</span>
              <div className="flex gap-2 flex-wrap mt-1">
                {selectedTopics.length > 0 ? (
                  selectedTopics.map((topic) => (
                    <span className="text-xs bg-blue-50 border text-blue-600 px-2 py-1 rounded-full" key={topic}>
                      {topic}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">None selected</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 pt-3 border-t gap-3">
              <div>
                <span className="text-gray-600">Questions:</span>
                <p className="text-blue-600">{numQuestions}</p>
              </div>
              <div>
                <span className="text-gray-600">Time:</span>
                <p className="text-blue-600">{timeLimit} min</p>
              </div>
            </div>

            <div>
              <span className="text-gray-600">Difficulty:</span>
              <p className="capitalize">{difficulty || "Not selected"}</p>
            </div>

            {showSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-start gap-2">
                <CheckCircle className="text-green-600 mt-1" size={18} />
                <span className="text-sm text-green-700">
                  Test has been assigned to the student!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
