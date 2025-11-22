import React, { useState } from "react";
import { Card } from "../ui-common/Cards";
import { Badge } from "../ui-common/Badge";
import { Shuffle, Target, BookOpen } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

export default function SelfPractice({ onStartTest }) {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("10");

  const subjects = [
    { value: "imo", label: "IMO - Mathematics", topics: 12 },
    { value: "nso", label: "NSO - Science", topics: 15 },
    { value: "ieo", label: "IEO - English", topics: 10 },
    { value: "igko", label: "IGKO - General Knowledge", topics: 18 },
  ];

  const difficulties = [
    { label: "Easy - Build Foundation", value: "easy" },
    { label: "Medium - Regular Practice", value: "medium" },
    { label: "Hard - Challenge Yourself", value: "hard" },
    { label: "Mixed - All Levels", value: "mixed" },
  ];

  const handleGeneratePractice = () => {
    if (!subject || !difficulty) {
      alert("Please select subject and difficulty level");
      return;
    }
    const practiceTestId =
      "practice-" + Math.random().toString(36).substr(2, 9);
    onStartTest(practiceTestId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-blue-900 text-xl font-medium mb-2">Self Practice</h2>
        <p className="text-gray-600">
          Generate random question sets to practice at your own pace
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Practice Generator */}
        <Card className="lg:col-span-2 p-6 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-6">
            <Shuffle className="size-5 text-blue-600" />
            <h3 className="text-blue-900">Create Practice Session</h3>
          </div>

          <div className="space-y-6">
            {/* SUBJECT */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Select Subject *
              </label>

              <Dropdown
                value={subject}
                onChange={(e) => setSubject(e.value)}
                options={subjects}
                optionLabel="label"
                placeholder="Choose a Subject"
                filter
                filterBy="label"
                className="w-full"
                showClear
              />

              {subject && (
                <p className="text-sm text-gray-600">
                  {subjects.find((s) => s.value === subject)?.topics} topics
                  available
                </p>
              )}
            </div>

            {/* DIFFICULTY */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Difficulty Level *
              </label>

              <Dropdown
                value={difficulty}
                onChange={(e) => setDifficulty(e.value)}
                options={difficulties}
                optionLabel="label"
                placeholder="Choose Difficulty"
                filter
                filterBy="label"
                className="w-full"
                showClear
              />
            </div>

            {/* NUMBER OF QUESTIONS */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Number of Questions
              </label>

              <InputNumber
                value={Number(numQuestions)}
                onValueChange={(e) =>
                  setNumQuestions(e.value?.toString() || "10")
                }
                min={5}
                max={50}
                showButtons
                step={1}
                placeholder="Enter questions"
                inputClassName="text-sm"
                className="w-full"
              />

              <p className="text-xs text-gray-600">
                Recommended: 10–20 questions per session
              </p>
            </div>

            {/* Benefits Box */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm text-blue-900 mb-2">Practice Benefits:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> No time limit
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Instant feedback
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> SOF question bank
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Track improvement
                </li>
              </ul>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              onClick={handleGeneratePractice}
              className="w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
            >
              <Shuffle className="size-5" />
              Generate & Start Practice
            </button>
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-4">
          {/* Stats */}
          <Card className="p-6 border-2 border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Target className="size-5 text-green-600" />
              <h3 className="text-blue-900">Your Practice Stats</h3>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>Sessions This Week</span>
                <span className="text-blue-900">8</span>
              </div>

              <div className="flex justify-between">
                <span>Questions Solved</span>
                <span className="text-blue-900">142</span>
              </div>

              <div className="flex justify-between">
                <span>Average Accuracy</span>
                <span className="text-green-600">78%</span>
              </div>
            </div>
          </Card>

          {/* Recommendations */}
          <Card className="p-6 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-blue-900">Recommended</h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex justify-between mb-1">
                  <h4 className="text-sm text-blue-900">Geometry</h4>

                  <Badge className="text-xs bg-orange-100 text-orange-700 border border-orange-200">
                    Priority
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">
                  58% accuracy — needs practice
                </p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <div className="flex justify-between mb-1">
                  <h4 className="text-sm text-blue-900">Chemistry</h4>

                  <Badge className="text-xs bg-blue-100 text-blue-700 border border-blue-200">
                    Review
                  </Badge>
                </div>
                <p className="text-xs text-gray-600">
                  Last practiced 3 days ago
                </p>
              </div>
            </div>
          </Card>
          {/* Quick Start Presets */}
          <Card className="p-6 border-2 border-gray-200">
            <h3 className="text-blue-900 mb-4">Quick Start</h3>
            <div className="space-y-2">
              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject("imo");
                  setDifficulty("easy");
                  setNumQuestions("10");
                }}
              >
                <Shuffle className="size-4 mr-2" />
                Easy Math - 10Q
              </button>

              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject("nso");
                  setDifficulty("medium");
                  setNumQuestions("15");
                }}
              >
                <Shuffle className="size-4 mr-2" />
                Medium Science - 15Q
              </button>

              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject("ieo");
                  setDifficulty("hard");
                  setNumQuestions("20");
                }}
              >
                <Shuffle className="size-4 mr-2" />
                Hard English - 20Q
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
