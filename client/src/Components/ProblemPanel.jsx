import React from "react";
import { useEffect,useState} from "react";
const ProblemPanel = ({problemId}) => {
    const [problem, setproblem] = useState(null);
    useEffect(()=>{
        const fetchProblem = async () =>{
            const response = await fetch(`http://localhost:8000/problems/${problemId}`);
             const data = await response.json();
            setproblem(data)
        };
        fetchProblem()
    },[problemId])

     if (!problem) {
        return <div>Loading...</div>;
    }


  return (
    <div className="h-full overflow-y-auto rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-2xl font-bold text-slate-900">
            {problem.title}
          </h1>

          <div className="inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
           {problem.difficulty}
          </div>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Description
          </h2>

          <p className="text-sm leading-6 text-slate-600">
                 {problem.description}
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Constraints
          </h2>

            <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
                {problem.constraints}
            </p>
        </div>

        <div>
          <h2 className="mb-2 text-lg font-semibold text-slate-800">
            Example
          </h2>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
            <p className="whitespace-pre-line">
                <span className="font-semibold">Input:</span>{" "}
                {problem.sample_input}
            </p>

            <p className="whitespace-pre-line">
                <span className="font-semibold">Output:</span>{" "}
                {problem.sample_output}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;