// import Editor from "@monaco-editor/react";
// import { useState, useEffect } from "react";
// const CodeEditor = ({ problemId, onSubmit }) => {
//     const [code, setCode] = useState("");
//     const [traceCode, setTraceCode] = useState("");
    
   
//     useEffect(()=>{
//         const fetchProblem = async () =>{
//             const response = await fetch(`http://localhost:8000/problems/${problemId}`)
//             const data = await response.json();
//             setCode(data.starter_code);
//             setTraceCode(data.trace_code);
            
//         }
//         fetchProblem();
//     }, [problemId])

//     const handleRun = () => {
//         setRunSnippet(data.run_snippet);
//         onSubmit(finalCode);
//     };



//   return (
//     <div className="flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm">
//       <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
//         <span className="text-sm font-semibold text-slate-800">
//           Code
//         </span>

//         <button 
//             onClick={handleRun}
//             className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600">
//           Run
//         </button>
//       </div>

//       <div className="flex-1 overflow-hidden">
//         <Editor
//             height="100%"
//             defaultLanguage="javascript"
//             value={code}
//             onChange={(value) => setCode(value || "")}
//             theme="vs-dark"
//             options={{
//                 minimap: { enabled: false },
//                 fontSize: 14,
//                 padding: { top: 16 },
//             }}
//         />
//       </div>
//     </div>
//   );
// };

// export default CodeEditor;

import Editor from "@monaco-editor/react";
import { useState, useEffect } from "react";

const CodeEditor = ({ problemId, onSubmit }) => {
  const [code, setCode] = useState("");
  const [traceCode, setTraceCode] = useState("");
  const [runSnippet, setRunSnippet] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      const response = await fetch(`http://localhost:8000/problems/${problemId}`);
      const data = await response.json();
      setCode(data.starter_code);
      setTraceCode(data.trace_code);
      setRunSnippet(data.run_snippet);
    };
    fetchProblem();
  }, [problemId]);

  const handleRun = () => {
    const finalCode = traceCode + "\n" + code + "\n" + runSnippet + "\n" + "console.log(JSON.stringify(__steps));";
    console.log("FINAL CODE:", finalCode);
    onSubmit(finalCode);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <span className="text-sm font-semibold text-slate-800">Code</span>
        <button
          onClick={handleRun}
          className="rounded-lg bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
        >
          Run
        </button>
      </div>

      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            padding: { top: 16 },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;