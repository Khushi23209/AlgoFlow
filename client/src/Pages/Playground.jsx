// import { useState } from "react";
// import Header from "../Components/Header";
// import ProblemPanel from "../Components/ProblemPanel";
// import CodeEditor from "../Components/CodeEditor";
// import Visualizer from "../Components/Visualizer";
// import BinarySearchVisualizer from "../Components/BinarySearchVisualizer";
// import SelectionSortVisualizer from "../Components/SelectionSortVisualizer";
// import Controls from "../Components/Controls";
// import LoginModal from "../Components/LoginModal";

// const problemTitles = { 1: "Bubble Sort", 2: "Binary Search", 3: "Selection Sort" };

// export default function Playground() {
//   const [problemId, setProblemId] = useState(1);
//   const [submissionId, setSubmissionId] = useState(null);
//   const [trace, setTrace] = useState(null);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [status, setStatus] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || null);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [explanation, setExplanation] = useState("");
//   const [loadingExplanation, setLoadingExplanation] = useState(false);
//   const [submittedCode, setSubmittedCode] = useState("");

//   async function handleSubmit(finalCode) {
//     if (!token) {
//       setShowLoginModal(true);
//       return;
//     }

//     setSubmittedCode(finalCode);

//     const response = await fetch("http://localhost:8000/submissions", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       },
//       body: JSON.stringify({ problem_id: problemId, code: finalCode }),
//     });
//     const data = await response.json();

//     setSubmissionId(data.id);
//     setStatus(data.status);
//     setTrace(data.trace);
//     setCurrentStepIndex(0);
//     setExplanation("");
//   }

//   async function handleLogin(email, password) {
//     const response = await fetch("http://localhost:8000/auth/login", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });

//     if (!response.ok) {
//       throw new Error("Invalid credentials");
//     }

//     const data = await response.json();
//     localStorage.setItem("token", data.token);
//     setToken(data.token);
//     setShowLoginModal(false);
//   }

//   async function handleSignup(username, email, password) {
//     const response = await fetch("http://localhost:8000/auth/signup", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body: JSON.stringify({ username, email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.error || "Signup failed");
//     }

//     await handleLogin(email, password);
//   }

//   function handleLogout() {
//     localStorage.removeItem("token");
//     setToken(null);
//   }

//   const currentStep = trace ? trace[currentStepIndex] : null;
//   const nextStep = trace ? trace[currentStepIndex + 1] : null;

//   function getHighlightIndices() {
//     if (!currentStep) return [];

//     if (currentStep.event === "write" && nextStep?.event === "write") {
//       return [currentStep.variables.index, nextStep.variables.index];
//     }

//     if (currentStep.event === "read" && nextStep?.event === "read") {
//       return [currentStep.variables.index, nextStep.variables.index];
//     }

//     return [currentStep.variables.index];
//   }

//   function getStepDescription() {
//     if (!currentStep) return "";

//     const { event, variables } = currentStep;

//     if (event === "read") {
//       return `Reading value at index ${variables.index} (comparing elements)`;
//     }
//     if (event === "write") {
//       return `Updating index ${variables.index} to ${variables.value} (swapping elements)`;
//     }
//     return "";
//   }

//   async function handleExplain() {
//     if (!token || !currentStep) return;

//     setLoadingExplanation(true);
//     setExplanation("");

//     try {
//       const response = await fetch("http://localhost:8000/ai/explain", {
//         method: "POST",
//         headers: {
//           "content-type": "application/json",
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           code: submittedCode,
//           currentStep,
//           algorithm: problemTitles[problemId],
//         }),
//       });
//       const data = await response.json();

//       if (!response.ok) {
//         setExplanation(data.error || "Couldn't get an explanation.");
//       } else {
//         setExplanation(data.explanation);
//       }
//     } catch (err) {
//       setExplanation("Something went wrong.");
//     } finally {
//       setLoadingExplanation(false);
//     }
//   }

//   return (
//     <div className="min-h-screen bg-slate-50">
//       <Header
//         isLoggedIn={!!token}
//         onLoginClick={() => setShowLoginModal(true)}
//         onLogout={handleLogout}
//         problemId={problemId}
//         onProblemChange={setProblemId}
//       />

//       <main className="flex h-[500px] gap-4 p-4">
//         <div className="w-2/5 min-w-0">
//           <ProblemPanel problemId={problemId} />
//         </div>

//         <div className="w-3/5 min-w-0">
//           <CodeEditor problemId={problemId} onSubmit={handleSubmit} />
//         </div>
//       </main>

//       {problemId === 1 && (
//         <Visualizer
//           array={currentStep?.variables?.array || []}
//           event={currentStep?.event}
//           highlightIndices={getHighlightIndices()}
//           isLastStep={trace ? currentStepIndex === trace.length - 1 : false}
//         />
//       )}

//       {problemId === 2 && (
//         <BinarySearchVisualizer
//           array={currentStep?.variables?.array || []}
//           event={currentStep?.event}
//           variables={currentStep?.variables}
//         />
//       )}

//       {problemId === 3 && (
//         <SelectionSortVisualizer
//           array={currentStep?.variables?.array || []}
//           event={currentStep?.event}
//           variables={currentStep?.variables}
//         />
//       )}

//       {currentStep && problemId === 1 && (
//         <div className="mx-4 mt-2 text-sm text-slate-500 italic">
//           {getStepDescription()}
//         </div>
//       )}

//       {explanation && (
//         <div className="mx-4 mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-slate-700">
//           <strong>AI Explanation:</strong> {explanation}
//         </div>
//       )}

//       <Controls
//         currentStepIndex={currentStepIndex}
//         totalSteps={trace ? trace.length : 0}
//         onNext={() => setCurrentStepIndex(prev => Math.min(prev + 1, trace.length - 1))}
//         onPrev={() => setCurrentStepIndex(prev => Math.max(prev - 1, 0))}
//         onExplain={handleExplain}
//         loadingExplanation={loadingExplanation}
//       />

//       <LoginModal
//         isOpen={showLoginModal}
//         onClose={() => setShowLoginModal(false)}
//         onLogin={handleLogin}
//         onSignup={handleSignup}
//       />
//     </div>
//   );
// }
import { useState } from "react";
import Header from "../Components/Header";
import ProblemPanel from "../Components/ProblemPanel";
import CodeEditor from "../Components/CodeEditor";
import Visualizer from "../Components/Visualizer";
import BinarySearchVisualizer from "../Components/BinarySearchVisualizer";
import SelectionSortVisualizer from "../Components/SelectionSortVisualizer";
import Controls from "../Components/Controls";
import LoginModal from "../Components/LoginModal";
import QuizModal from "../Components/QuizModal";

const problemTitles = { 1: "Bubble Sort", 2: "Binary Search", 3: "Selection Sort" };

export default function Playground() {
  const [problemId, setProblemId] = useState(1);
  const [submissionId, setSubmissionId] = useState(null);
  const [trace, setTrace] = useState(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [status, setStatus] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [submittedCode, setSubmittedCode] = useState("");
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [loadingQuiz, setLoadingQuiz] = useState(false);

  async function handleSubmit(finalCode) {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setSubmittedCode(finalCode);

    const response = await fetch("http://localhost:8000/submissions", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ problem_id: problemId, code: finalCode }),
    });
    const data = await response.json();

    setSubmissionId(data.id);
    setStatus(data.status);
    setTrace(data.trace);
    setCurrentStepIndex(0);
    setExplanation("");
  }

  async function handleLogin(email, password) {
    const response = await fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setShowLoginModal(false);
  }

  async function handleSignup(username, email, password) {
    const response = await fetch("http://localhost:8000/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Signup failed");
    }

    await handleLogin(email, password);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const currentStep = trace ? trace[currentStepIndex] : null;
  const nextStep = trace ? trace[currentStepIndex + 1] : null;

  function getHighlightIndices() {
    if (!currentStep) return [];

    if (currentStep.event === "write" && nextStep?.event === "write") {
      return [currentStep.variables.index, nextStep.variables.index];
    }

    if (currentStep.event === "read" && nextStep?.event === "read") {
      return [currentStep.variables.index, nextStep.variables.index];
    }

    return [currentStep.variables.index];
  }

  function getStepDescription() {
    if (!currentStep) return "";

    const { event, variables } = currentStep;

    if (event === "read") {
      return `Reading value at index ${variables.index} (comparing elements)`;
    }
    if (event === "write") {
      return `Updating index ${variables.index} to ${variables.value} (swapping elements)`;
    }
    return "";
  }

  async function handleExplain() {
    if (!token || !currentStep) return;

    setLoadingExplanation(true);
    setExplanation("");

    try {
      const response = await fetch("http://localhost:8000/ai/explain", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: submittedCode,
          currentStep,
          algorithm: problemTitles[problemId],
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setExplanation(data.error || "Couldn't get an explanation.");
      } else {
        setExplanation(data.explanation);
      }
    } catch (err) {
      setExplanation("Something went wrong.");
    } finally {
      setLoadingExplanation(false);
    }
  }

  async function handleOpenQuiz() {
    if (!token) {
      setShowLoginModal(true);
      return;
    }

    setShowQuizModal(true);
    setQuizData(null);
    setLoadingQuiz(true);

    try {
      const response = await fetch("http://localhost:8000/ai/quiz", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          code: submittedCode || "// no code submitted yet",
          algorithm: problemTitles[problemId],
        }),
      });
      const data = await response.json();
      setQuizData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuiz(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        isLoggedIn={!!token}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        problemId={problemId}
        onProblemChange={setProblemId}
      />

      <main className="flex h-[500px] gap-4 p-4">
        <div className="w-2/5 min-w-0">
          <ProblemPanel problemId={problemId} />
        </div>

        <div className="w-3/5 min-w-0">
          <CodeEditor problemId={problemId} onSubmit={handleSubmit} />
        </div>
      </main>

      {problemId === 1 && (
        <Visualizer
          array={currentStep?.variables?.array || []}
          event={currentStep?.event}
          highlightIndices={getHighlightIndices()}
          isLastStep={trace ? currentStepIndex === trace.length - 1 : false}
        />
      )}

      {problemId === 2 && (
        <BinarySearchVisualizer
          array={currentStep?.variables?.array || []}
          event={currentStep?.event}
          variables={currentStep?.variables}
        />
      )}

      {problemId === 3 && (
        <SelectionSortVisualizer
          array={currentStep?.variables?.array || []}
          event={currentStep?.event}
          variables={currentStep?.variables}
        />
      )}

      {currentStep && problemId === 1 && (
        <div className="mx-4 mt-2 text-sm text-slate-500 italic">
          {getStepDescription()}
        </div>
      )}

      {explanation && (
        <div className="mx-4 mt-4 rounded-xl border border-indigo-100 bg-indigo-50 p-4 text-sm text-slate-700">
          <strong>AI Explanation:</strong> {explanation}
        </div>
      )}

      <Controls
        currentStepIndex={currentStepIndex}
        totalSteps={trace ? trace.length : 0}
        onNext={() => setCurrentStepIndex(prev => Math.min(prev + 1, trace.length - 1))}
        onPrev={() => setCurrentStepIndex(prev => Math.max(prev - 1, 0))}
        onExplain={handleExplain}
        loadingExplanation={loadingExplanation}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSignup={handleSignup}
      />

      <button
        onClick={handleOpenQuiz}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-indigo-600 text-white shadow-lg flex items-center justify-center text-xl hover:bg-indigo-700"
        title="Take a quick quiz"
      >
        ?
      </button>

      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
        quizData={quizData}
        loading={loadingQuiz}
      />
    </div>
  );
}