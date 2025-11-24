import React, { useState, useEffect } from "react";
import { Card } from "../ui-common/Cards";       // make sure this matches your file name (Cards.jsx)
import { Progress } from "../ui-common/Progress";
import { Badge } from "../ui-common/Badge";
import { Clock, Flag, AlertCircle, CheckCircle, XCircle } from "lucide-react";

export default function TestInterface({ testId, onComplete, studentName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: selectedOptionIndex }
  const [flagged, setFlagged] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock questions
  const questions = [
    {
      id: "1",
      question: "What is the sum of interior angles of a triangle?",
      options: ["90°", "180°", "270°", "360°"],
      correctAnswer: 1,
    },
    {
      id: "2",
      question: "Which of the following is a prime number?",
      options: ["15", "21", "23", "27"],
      correctAnswer: 2,
    },
    {
      id: "3",
      question: "What is the chemical formula for water?",
      options: ["H2O", "CO2", "O2", "H2O2"],
      correctAnswer: 0,
    },
    {
      id: "4",
      question: 'Who wrote "Romeo and Juliet"?',
      options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
      correctAnswer: 1,
    },
    {
      id: "5",
      question: "What is 15% of 200?",
      options: ["25", "30", "35", "40"],
      correctAnswer: 1,
    },
  ];

  // Timer
  useEffect(() => {
    if (isSubmitted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleFlagToggle = () => {
    setFlagged((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestion)) newSet.delete(currentQuestion);
      else newSet.add(currentQuestion);
      return newSet;
    });
  };

  const handleSubmit = () => {
    setShowSubmitDialog(false);
    setIsSubmitted(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correctAnswer) correct++;
    });
    return Math.round((correct / questions.length) * 100);
  };

  const getAnsweredCount = () => Object.keys(answers).length;

  // Submitted view
  if (isSubmitted) {
    const score = calculateScore();
    const answered = getAnsweredCount();
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                score >= 80 ? "bg-green-100" : score >= 60 ? "bg-blue-100" : "bg-orange-100"
              }`}
            >
              <CheckCircle className={`size-12 ${score >= 80 ? "text-green-600" : "text-blue-600"}`} />
            </div>

            <h2 className="text-blue-900 mb-2">Test Completed!</h2>
            <p className="text-gray-600">Great job, {studentName}!</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Your Score</p>
                <p
                  className={`text-3xl ${
                    score >= 80 ? "text-green-600" : score >= 60 ? "text-blue-600" : "text-orange-600"
                  }`}
                >
                  {score}%
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
                <p className="text-3xl text-green-600">
                  {Math.round((score / 100) * questions.length)}/{questions.length}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-blue-900 mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered:</span>
                  <span>
                    {answered} / {questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Flagged:</span>
                  <span>{flagged.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time Taken:</span>
                  <span>{formatTime(1800 - timeLeft)}</span>
                </div>
              </div>
            </div>

            {score >= 80 ? (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                <p className="text-green-900">Excellent work! You've demonstrated strong understanding of the topic.</p>
              </div>
            ) : score >= 60 ? (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-blue-900">Good effort! Review the incorrect answers to improve further.</p>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <p className="text-orange-900">Keep practicing! Focus on the weak areas identified in Smart Study.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  // View Detailed Report - placeholder
                  alert("View detailed report (implement)");
                }}
                className="flex-1 border rounded-md cursor-pointer px-4 py-2 text-sm"
              >
                View Detailed Report
              </button>

              <button
                type="button"
                onClick={onComplete}
                className="flex-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-md px-4 py-2 text-sm"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answered = getAnsweredCount();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-blue-900">Test in Progress</h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <Clock className={`size-5 ${timeLeft < 300 ? "text-red-600" : "text-blue-600"}`} />
                <span className={`text-sm ${timeLeft < 300 ? "text-red-600" : "text-blue-900"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitDialog(true)}
                className="border cursor-pointer rounded-md px-3 py-1 text-sm text-green-700 border-green-200 hover:bg-green-50"
              >
                Submit Test
              </button>
            </div>
          </div>

          <div className="mt-3">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className=" mx-auto">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Question Card */}
            <Card className="lg:col-span-3 p-8">
              <div className="mb-6">
                <div className="flex items-start justify-between mb-4">
                  <Badge className="bg-blue-600 text-white">Question {currentQuestion + 1}</Badge>

                  <button
                    type="button"
                    onClick={handleFlagToggle}
                    className={`inline-flex items-center justify-center rounded-md p-1 text-sm ${
                      flagged.has(currentQuestion) ? "text-orange-600" : "text-gray-600"
                    }`}
                    aria-pressed={flagged.has(currentQuestion)}
                  >
                    <Flag className={`size-4 ${flagged.has(currentQuestion) ? "fill-orange-600" : ""}`} />
                  </button>
                </div>

                <h3 className="text-xl text-blue-900">{currentQ.question}</h3>
              </div>

              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full cursor-pointer p-4 text-left rounded-lg border-2 transition-all ${
                      answers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          answers[currentQuestion] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                        }`}
                      >
                        {answers[currentQuestion] === index && <div className="w-3 h-3 bg-white rounded-full" />}
                      </div>
                      <span className="text-gray-900">{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className={`rounded-md cursor-pointer px-4 py-2 text-sm border ${
                    currentQuestion === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                  }`}
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                  disabled={currentQuestion === questions.length - 1}
                  className={`rounded-md cursor-pointer px-4 py-2 text-sm text-white ${
                    currentQuestion === questions.length - 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  Next
                </button>
              </div>
            </Card>

            {/* Question Navigator */}
            <Card className="p-4 h-fit">
              <h3 className="text-blue-900 mb-4 text-sm">Question Navigator</h3>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuestion(index)}
                    className={`aspect-square cursor-pointer rounded-lg text-sm transition-all ${
                      currentQuestion === index
                        ? "bg-blue-600 text-white"
                        : answers[index] !== undefined
                        ? "bg-green-100 text-green-700 border border-green-300"
                        : flagged.has(index)
                        ? "bg-orange-100 text-orange-700 border border-orange-300"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="space-y-2 text-xs border-t pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
                  <span className="text-gray-600">Answered ({answered})</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-orange-100 border border-orange-300 rounded" />
                  <span className="text-gray-600">Flagged ({flagged.size})</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-100 rounded" />
                  <span className="text-gray-600">Not Answered ({questions.length - answered})</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Submit Modal (simple Tailwind modal) */}
      {showSubmitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSubmitDialog(false)}
          />
          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-blue-900 text-lg">Submit Test?</h3>
                <p className="text-sm text-gray-600">Please review your answers before submitting</p>
              </div>
              <button
                onClick={() => setShowSubmitDialog(false)}
                className="text-gray-500 cursor-pointer hover:text-gray-700"
                aria-label="Close"
              >
                <XCircle className="size-5" />
              </button>
            </div>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl text-green-600">{answered}</p>
                  <p className="text-xs text-gray-600">Answered</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl text-gray-600">{questions.length - answered}</p>
                  <p className="text-xs text-gray-600">Unanswered</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-2xl text-orange-600">{flagged.size}</p>
                  <p className="text-xs text-gray-600">Flagged</p>
                </div>
              </div>

              {questions.length - answered > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">
                    You have {questions.length - answered} unanswered question(s). Are you sure you want to submit?
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1 border rounded-md cursor-pointer px-4 py-2 text-sm"
                >
                  Review Answers
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm"
                >
                  Submit Test
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
