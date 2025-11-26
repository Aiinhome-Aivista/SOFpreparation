import React, { useState, useEffect, useRef } from "react";
import { Card } from "../ui-common/Cards";
import { Badge } from "../ui-common/Badge";
import { Shuffle, Target, BookOpen } from "lucide-react";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { GET_APIS, POST_APIS } from "../../../../../connection";
import ApiService from "../../../../service/ApiService";
import { Toast } from "primereact/toast";

export default function SelfPractice({ onStartTest }) {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numQuestions, setNumQuestions] = useState("10");
  const [subjects, setSubjects] = useState([]); // ← API DATA
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [examTime, setExamTime] = useState(20); // default 20 minutes
  const [errors, setErrors] = useState({});
  const toast = useRef(null);

  // const subjects = [
  //   { value: "imo", label: "IMO - Mathematics", topics: 12 },
  //   { value: "nso", label: "NSO - Science", topics: 15 },
  //   { value: "ieo", label: "IEO - English", topics: 10 },
  //   { value: "igko", label: "IGKO - General Knowledge", topics: 18 },
  // ];

  const difficulties = [
    { label: "Easy - Build Foundation", value: "easy" },
    { label: "Medium - Regular Practice", value: "medium" },
    { label: "Hard - Challenge Yourself", value: "hard" },
    { label: "Mixed - All Levels", value: "mixed" },
  ];

  // -------------------------------------------
  // Fetch Subjects from API
  // -------------------------------------------
  const fetchSubjects = async () => {
    try {
      // const res = await fetch(GET_APIS.subjectsdataurl);
      // const json = await res.json();

      const json = await ApiService(GET_APIS.subjectsdataurl, {
        method: "GET",
      });

      if (json.isSuccess && Array.isArray(json.data)) {
        const loadedSubjects = json.data.map((s) => ({
          value: s.subject_id,
          label: s.subject_name,
        }));
        setSubjects(loadedSubjects);
      }
    } catch (err) {
      console.error("Error fetching subjects:", err);
    } finally {
      setLoadingSubjects(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const getSubjectId = (name) => {
    return subjects.find((s) => s.label === name)?.value || null;
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!subject) {
      tempErrors.subject = "Please select a subject.";
    }

    if (!difficulty) {
      tempErrors.difficulty = "Please select difficulty level.";
    }

    if (!numQuestions || numQuestions < 5) {
      tempErrors.numQuestions = "Enter at least 5 questions.";
    }

    if (!examTime || examTime < 5) {
      tempErrors.examTime = "Exam time must be at least 5 minutes.";
    }

    setErrors(tempErrors);

    return Object.keys(tempErrors).length === 0;
  };

  const handleGeneratePractice = async () => {
    if (!validateForm()) return; //  stop if validation fails

    try {
      // Get studentId from localStorage
      const stored = JSON.parse(localStorage.getItem("user"));
      const studentId = stored?.userData?.id;

      if (!studentId) {
        alert("No student data found. Please login again.");
        return;
      }

      const payload = {
        studentId: studentId,
        subjectId: subject, // comes from dropdown
        questions: Number(numQuestions), // InputNumber
        timeLimit: Number(examTime),
        difficulty: difficulty, // dropdown difficulty
      };

      console.log("Practice Payload:", payload);

      const json = await ApiService(POST_APIS.generatetest, {
        method: "POST",
        body: payload,
      });

      if (json.isSuccess) {
        // SUCCESS TOAST
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Practice test generated successfully!",
          life: 2000,
        });

        // RESET INPUTS
        setSubject(null);
        setDifficulty(null);
        setNumQuestions(null);
        setExamTime(null);

        // RESET ERRORS
        setErrors({});

        // If you want to auto-start test:
        // onStartTest("practice-" + Math.random().toString(36).substring(2, 9));
      }
    } catch (error) {
      console.error("Generate Practice Error:", error);

      // ERROR TOAST
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to generate practice test.",
        life: 2000,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast must be here */}
      <Toast ref={toast} />

      <div>
        <h2 className="text-blue-900 text-xl font-medium mb-2">
          Self Practice
        </h2>
        <p className="text-gray-600">
          Generate random question sets to practice at your own pace
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Practice Generator */}
        <Card className="lg:col-span-2 p-6 border-2 border-gray-200">
          <div className="flex items-center gap-2 mb-4">
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
                onChange={(e) => {
                  setSubject(e.value);
                  setErrors((prev) => ({ ...prev, subject: "" }));
                }}
                options={subjects}
                optionLabel="label"
                placeholder={
                  loadingSubjects ? "Loading..." : "Choose a Subject"
                }
                filter
                filterBy="label"
                className={`w-full ${errors.subject ? "p-invalid" : ""}`}
                showClear
                disabled={loadingSubjects}
                appendTo="self"
              />

              {errors.subject && (
                <p className="text-red-500 text-xs mt-1">{errors.subject}</p>
              )}
              {subject && (
                <p className="text-sm text-gray-600">
                  Selected: {subjects.find((s) => s.value === subject)?.label}
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
                onChange={(e) => {
                  setDifficulty(e.value);
                  setErrors((prev) => ({ ...prev, difficulty: "" }));
                }}
                options={difficulties}
                optionLabel="label"
                placeholder="Choose Difficulty"
                filter
                filterBy="label"
                className={`w-full ${errors.difficulty ? "p-invalid" : ""}`}
                showClear
                appendTo="self"
              />
              {errors.difficulty && (
                <p className="text-red-500 text-xs mt-1">{errors.difficulty}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* EXAM TIME */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Exam Time (Minutes)
                </label>

                <InputNumber
                  value={examTime}
                  onValueChange={(e) => {
                    setExamTime(e.value);
                    setErrors((prev) => ({ ...prev, examTime: null }));
                  }}
                  min={5}
                  max={60}
                  step={1}
                  showButtons
                  placeholder="Select time in minutes"
                  className="w-full"
                  inputClassName={`text-sm ${
                    errors.examTime ? "border-red-500 bg-red-50" : ""
                  }`}
                />

                {errors.examTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.examTime}</p>
                )}

                <p className="text-xs text-gray-600">
                  Recommended: 20–30 minutes
                </p>
              </div>

              {/* NUMBER OF QUESTIONS */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Number of Questions
                </label>

                <InputNumber
                  value={numQuestions}
                  onValueChange={(e) => {
                    setNumQuestions(e.value);
                    setErrors((prev) => ({ ...prev, numQuestions: null }));
                  }}
                  min={5}
                  max={50}
                  showButtons
                  step={1}
                  placeholder="Enter questions"
                  inputClassName={`text-sm ${
                    errors.numQuestions ? "border-red-500 bg-red-50" : ""
                  }`}
                  className="w-full"
                />

                {errors.numQuestions && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.numQuestions}
                  </p>
                )}

                <p className="text-xs text-gray-600">
                  Recommended: 10–20 questions per session
                </p>
              </div>
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
              Generate test
            </button>
          </div>
        </Card>

        {/* Right Column */}
        <div className="space-y-4 flex flex-col">
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
          <Card className="p-6 border-2 border-gray-200 grow">
            <h3 className="text-blue-900 mb-4">Quick Start</h3>
            <div className="space-y-2">
              {/* EASY MATH */}
              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject(getSubjectId("Mathematics"));
                  setDifficulty("easy");
                  setNumQuestions("10");
                }}
              >
                <Shuffle className="size-4 mr-2" />
                Easy Math - 10Q
              </button>

              {/* MEDIUM SCIENCE */}
              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject(getSubjectId("Science"));
                  setDifficulty("medium");
                  setNumQuestions("15");
                }}
              >
                <Shuffle className="size-4 mr-2" />
                Medium Science - 15Q
              </button>

              {/* HARD ENGLISH */}
              <button
                className="w-full cursor-pointer flex items-center gap-2 justify-start border border-gray-300 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                onClick={() => {
                  setSubject(getSubjectId("English"));
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
