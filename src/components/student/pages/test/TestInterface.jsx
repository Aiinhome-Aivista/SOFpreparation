import { useState, useEffect, useRef } from "react";
import { Card } from "../ui-common/Cards";
import { Progress } from "../ui-common/Progress";
import { Badge } from "../ui-common/Badge";
import { Clock, AlertCircle, CheckCircle } from "lucide-react";
import ApiService from "../../../../service/ApiService";
import { POST_APIS } from "../../../../../connection";

export default function TestInterface({ testId, onComplete, studentName }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({}); // store selected index or null
  const [timeLeft, setTimeLeft] = useState(1800);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [lastAnswerSaved, setLastAnswerSaved] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const hasFetchedRef = useRef(false);

  // to avoid double final submit
  const finishingRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return; // prevents double API call in Strict Mode
    hasFetchedRef.current = true;

    const fetchAssessment = async () => {
      try {
        const stored = JSON.parse(localStorage.getItem("user"));
        const studentId = stored?.userData?.id;

        const payload = {
          studentId: studentId,
          testId: testId, // ← THIS CONNECTS EVERYTHING
        };

        const json = await ApiService(POST_APIS.startassessment, {
          method: "POST",
          body: payload,
        });

        console.log("start assessment resp:", json);

        if (json.isSuccess) {
          const apiData = json.data;

          setAttemptId(apiData.attempt_id);

          const formatted = apiData.questions.map((q) => ({
            id: q.question_id,
            question: q.question_text,
            options: [q.option_a, q.option_b, q.option_c, q.option_d],
          }));

          setQuestions(formatted);
          setTimeLeft(apiData.test.duration_minutes * 60);
          setQuestionStartTime(Date.now());
        }
      } catch (e) {
        console.error("start assessment error:", e);
      }
    };

    fetchAssessment();
  }, [testId]);

  // countdown timer
  useEffect(() => {
    if (questions.length === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // auto-final submit and redirect to dashboard
          handleFinalSubmit({ auto: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // when user picks an option visually
  const handleAnswerSelect = (optionIndex) => {
    // use null for unanswered, index for selected
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  // Next: send payload (here mocked as console.log). If no answer chosen, send empty string "" in selectedOption.
  const handleNext = async () => {
    if (questions.length === 0) return;

    const q = questions[currentQuestion];
    // allow unanswered — map to empty string
    const selectedIndex = answers[currentQuestion];
    const selectedOption =
      selectedIndex === undefined || selectedIndex === null
        ? ""
        : ["A", "B", "C", "D"][selectedIndex];

    const now = Date.now();
    const timeSpent = Math.floor((now - questionStartTime) / 1000); // seconds

    const payload = {
      attemptId: attemptId,
      questionId: q.id,
      selectedOption: selectedOption,
      timeSpent: timeSpent,
    };

    // Simulate API call (replace with ApiService POST in real code)
    // console.log(" Save answer payload:", payload);

    // -----------------------------------------
    // REAL SAVE ANSWER API CALL
    // -----------------------------------------
    try {
      const json = await ApiService(POST_APIS.saveanswer, {
        method: "POST",
        body: payload,
      });

      if (json?.isSuccess) {
        console.log("✔ Answer Saved:", json.data[0]?.message);
      } else {
        console.log("⚠ API responded but not success:", json);
      }
    } catch (error) {
      console.error(" Save Answer API Error:", error);
    }

    // mark last question saved when on last question
    const isLast = currentQuestion === questions.length - 1;
    if (isLast) {
      setLastAnswerSaved(true);
      // Keep user on last question but disable Next (Submit modal should be used)
      // NOTE: you could also advance to a "summary" view if desired
    } else {
      // go to next question
      setCurrentQuestion((prev) => prev + 1);
      // reset question timer
      setQuestionStartTime(Date.now());
    }
  };

  // final submit handler.
  // options: { auto: boolean } --> if auto === true, we'll perform final submit then navigate to dashboard (onComplete)
  // if auto === false or undefined, we'll store submit result and set isSubmitted (so summary can be shown)
  const handleFinalSubmit = async (opts = {}) => {
    if (finishingRef.current) return; // prevent double submit
    finishingRef.current = true;

    const payload = {
      attemptId: attemptId, // Already stored in state earlier
    };

    // console.log(" Final Submit Payload:", payload);

    try {
      // ----------------------------------------------
      //  REAL FINAL SUBMIT API CALL
      // ----------------------------------------------
      const json = await ApiService(POST_APIS.submitassessment, {
        method: "POST",
        body: payload,
      });

      console.log("📥 Final Submit Response:", json);

      if (json?.isSuccess) {
        // Save summary response
        setSubmitResult(json.data);

        // Close modal
        setShowSubmitDialog(false);

        // Mark test as submitted
        setIsSubmitted(true);

        // AUTOMATIC SUBMIT (timer expired)
        if (opts.auto) {
          if (typeof onComplete === "function") {
            // Give slight delay to feel natural
            setTimeout(() => {
              onComplete();
            }, 400);
          }
        }
      } else {
        console.error(" Final submit failed:", json);
      }
    } catch (error) {
      console.error(" Final Submit API Error:", error);
    }

    // unlock in case component reused
    finishingRef.current = false;
  };

  const getAnsweredCount = () =>
    Object.keys(answers).filter(
      (k) => answers[k] !== undefined && answers[k] !== null
    ).length;

  // If final submit has been done and submitResult exists, render summary OR navigate away (depending on flow)
  // The user asked for auto-submit to go back to dashboard; handleFinalSubmit({auto:true}) does that.
  if (isSubmitted && submitResult) {
    const result = submitResult;
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-green-50 to-blue-50 p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full p-8">
          <div className="text-center mb-8">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 ${
                result.score >= 80
                  ? "bg-green-100"
                  : result.score >= 60
                  ? "bg-blue-100"
                  : "bg-orange-100"
              }`}
            >
              <CheckCircle
                className={`size-12 ${
                  result.score >= 80 ? "text-green-600" : "text-blue-600"
                }`}
              />
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
                    result.score >= 80
                      ? "text-green-600"
                      : result.score >= 60
                      ? "text-blue-600"
                      : "text-orange-600"
                  }`}
                >
                  {result.score}%
                </p>
              </div>

              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Correct Answers</p>
                <p className="text-3xl text-green-600">
                  {result.correctAnswers}/{result.totalQuestions}
                </p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="text-blue-900 mb-3">Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Questions Answered:</span>
                  <span>
                    {result.totalAnswered} / {result.totalQuestions}
                  </span>
                </div>

                {/* <div className="flex justify-between">
                  <span className="text-gray-600">Time Taken:</span>
                  <span>
                    {formatTime(
                      hardcodedTestResponse.data.test.duration_minutes * 60 -
                        timeLeft
                    )}
                  </span>
                </div> */}
              </div>
            </div>

            <div className="flex gap-3">
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

  // Loading / waiting for questions
  if (questions.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-blue-600 text-lg">Loading questions...</p>
      </div>
    );
  }

  // main test UI
  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const answered = getAnsweredCount();
  const isLastQuestion = currentQuestion === questions.length - 1;
  const disableNextButton = isLastQuestion && lastAnswerSaved;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-blue-900">Test in Progress</h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-lg">
                <Clock
                  className={`size-5 ${
                    timeLeft < 300 ? "text-red-600" : "text-blue-600"
                  }`}
                />
                <span
                  className={`text-sm ${
                    timeLeft < 300 ? "text-red-600" : "text-blue-900"
                  }`}
                >
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
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Question Card */}
          <Card className="lg:col-span-3 p-8">
            <div className="mb-6">
              <Badge className="bg-blue-600 text-white">
                Question {currentQuestion + 1}
              </Badge>
              <h3 className="text-xl text-blue-900 mt-4">
                {currentQ.question}
              </h3>
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
                        answers[currentQuestion] === index
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-end pt-6 border-t">
              <button
                onClick={!disableNextButton ? handleNext : undefined}
                disabled={disableNextButton}
                className={`rounded-md px-4 py-2 text-sm text-white ${
                  disableNextButton
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                }`}
              >
                Next
              </button>
            </div>
          </Card>

          {/* Navigator */}
          <Card className="p-4 h-fit">
            <h3 className="text-blue-900 mb-4 text-sm">Question Navigator</h3>

            <div className="grid grid-cols-5 gap-2 mb-4">
              {questions.map((_, idx) => (
                <div
                  key={idx}
                  className={`aspect-square rounded-lg text-sm flex items-center justify-center ${
                    currentQuestion === idx
                      ? "bg-blue-600 text-white"
                      : answers[idx] !== undefined && answers[idx] !== null
                      ? "bg-green-100 text-green-700 border border-green-300"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {idx + 1}
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs border-t pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border border-green-300 rounded" />
                <span className="text-gray-600">Answered ({answered})</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-100 rounded" />
                <span className="text-gray-600">
                  Not Answered ({questions.length - answered})
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="relative bg-white rounded-xl max-w-2xl w-full p-6 z-10">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-blue-900 text-lg">Submit Test?</h3>
                <p className="text-sm text-gray-600">
                  Please review your answers before submitting
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl text-green-600">{answered}</p>
                  <p className="text-xs text-gray-600">Answered</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl text-gray-600">
                    {questions.length - answered}
                  </p>
                  <p className="text-xs text-gray-600">Unanswered</p>
                </div>
              </div>

              {questions.length - answered > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-start gap-2">
                  <AlertCircle className="size-5 text-yellow-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-yellow-900">
                    You have {questions.length - answered} unanswered
                    question(s). Are you sure you want to submit?
                  </p>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitDialog(false)}
                  className="flex-1 border rounded-md cursor-pointer px-4 py-2 text-sm"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handleFinalSubmit({ auto: false })}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-md px-4 py-2 text-sm"
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
