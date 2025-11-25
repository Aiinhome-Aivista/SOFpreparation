import { useState } from "react";
import { ClipboardList, Plus, CheckCircle } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function GenerateTestParent() {
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

  const difficulties = [
    { label: "Easy", value: "easy" },
    { label: "Medium", value: "medium" },
    { label: "Hard", value: "hard" },
    { label: "Mixed", value: "mixed" },
  ];

  const topics = {
    imo: ["Algebra", "Geometry", "Number System", "Mensuration", "Data Handling"],
    nso: ["Physics", "Chemistry", "Biology", "Environmental Science"],
    ieo: ["Grammar", "Vocabulary", "Reading Comprehension", "Writing Skills"],
    igko: ["History", "Geography", "Current Affairs", "Science & Technology"],
  };
  const children = [
    { id: "1", fullName: "Aarav Kumar" },
    { id: "2", fullName: "Diya Sharma" },
  ];

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
        <div className="bg-white rounded-2xl p-6 space-y-4 border-2 border-gray-200">

          {/* Child Select */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Select Child<span className="text-red-600"> *</span></label>
            <Dropdown
              value={selectedChild}
              onChange={(e) => setSelectedChild(e.value)}
              options={children}
              optionLabel="fullName"
              optionValue="id"
              placeholder="Choose a child"
              className="w-full"
              filter
              showClear
            />
          </div>

          {/* Subject Select */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Select Subject<span className="text-red-600"> *</span></label>
            <Dropdown
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.value)}
              options={subjects}
              optionLabel="label"
              placeholder="Choose a subject"
              className="w-full"
              filter
              showClear
            />
          </div>

          {/* Topics */}
          {selectedSubject && (
            <div className="space-y-2">
              <label className="font-medium text-sm">Select Topics<span className="text-red-600"> *</span></label>
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-4 rounded-xl border text-sm">
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
              <label className="font-medium text-sm">Number of Questions<span className="text-red-600"> *</span></label>
              <InputNumber
                value={Number(numQuestions)}
                onValueChange={(e) => setNumQuestions(e.value?.toString() || "20")}
                min={10} max={50}
                showButtons
                inputClassName="text-sm w-full"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium text-sm">Time Limit (minutes)<span className="text-red-600"> *</span></label>
              <InputNumber
                value={Number(timeLimit)}
                onValueChange={(e) => setTimeLimit(e.value?.toString() || "30")}
                min={10} max={120}
                showButtons
                inputClassName="text-sm w-full"
                className="w-full"
              />
            </div>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="font-medium text-sm">Difficulty Level<span className="text-red-600"> *</span></label>
            <Dropdown
              value={difficulty}
              onChange={(e) => setDifficulty(e.value)}
              options={difficulties}
              optionLabel="label"
              placeholder="Choose difficulty"
              className="w-full"
              filter
              showClear
            />
          </div>

          {/* Button */}
          <button
            onClick={createTest}
            className="w-full bg-green-600 hover:bg-green-700 text-white rounded-lg py-3 flex justify-center items-center gap-2 font-medium cursor-pointer"
          >
            <Plus size={20} />
            Generate Test & Assign
          </button>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 space-y-4 border-2 border-gray-200">
          <div className="flex items-center gap-2">
            <ClipboardList className="text-blue-600" size={20} />
            <p className="font-semibold text-blue-900">Test Summary</p>
          </div>

          <div className="text-sm space-y-3">
            <div>
              <span className="text-gray-800">Student:</span>
              <p className={selectedChild ? "text-black" : "text-gray-500"}>
                {selectedChild ? children.find(c => c.id === selectedChild)?.fullName : "Not selected"}
              </p>
            </div>

            <div>
              <span className="text-gray-800">Subject:</span>
              <p className={selectedChild ? "text-black" : "text-gray-500"}>{selectedSubject ? subjects.find(s => s.value === selectedSubject)?.label : "Not selected"}</p>
            </div>

            <div>
              <span className="text-gray-800">Topics:</span>
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
                <span className="text-gray-800">Questions:</span>
                <p className="text-blue-600">{numQuestions}</p>
              </div>
              <div>
                <span className="text-gray-800">Time:</span>
                <p className="text-blue-600">{timeLimit} min</p>
              </div>
            </div>

            <div>
              <span className="text-gray-800">Difficulty:</span>
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
