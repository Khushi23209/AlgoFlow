// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";


// const Visualizer = ({ array, highlightIndices = [], event, variables }) => {
//   const isDone = event === "done";

//   function isSorted(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) return false;
//     }
//     return true;
//   }

//   const actuallySorted = isDone && isSorted(array);

//   return (
//     <div className="mx-4 h-[600px] rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-slate-800">Visualizer</h3>

//       {event === "outer-loop" && (
//         <div className="mt-4 text-sm font-medium text-indigo-600">
//           Starting pass {variables?.i + 1}...
//         </div>
//       )}

//       {isDone && actuallySorted && (
//         <div className="mt-4 text-sm font-medium text-green-600">
//            Array sorted!
//         </div>
//       )}

//       {isDone && !actuallySorted && (
//         <div className="mt-4 text-sm font-medium text-red-600">
//            Not sorted — try again !
//         </div>
//       )}

//       <div className="flex gap-3 mt-6">
//         {array.map((value, index) => {
//           const isHighlighted = highlightIndices.includes(index);

//           let boxClasses;
//           if (isDone) {
//             boxClasses = actuallySorted
//               ? "h-20 w-20 bg-green-500 text-white text-2xl scale-105"
//               : "h-20 w-20 bg-red-500 text-white text-2xl scale-105";
//           } else if (isHighlighted) {
//             boxClasses =
//               event === "swap"
//                 ? "h-16 w-16 bg-orange-500 text-white text-lg"
//                 : "h-16 w-16 bg-pink-500 text-white text-lg";
//           } else {
//             boxClasses = "h-16 w-16 bg-slate-100 text-slate-700 text-lg";
//           }

//           return (
//             <div key={index} className="flex flex-col items-center gap-2">
//               <div
//                 className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${boxClasses}`}
//               >
//                 {value}
//               </div>
//               {isHighlighted && !isDone && (
//                 <FontAwesomeIcon icon={faArrowUp} className="text-pink-500 text-xl" />
//               )}
//               <div className="text-xs text-slate-400">{index}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Visualizer;
// const Visualizer = ({ array, event, variables, isLastStep }) => {
//   function isSorted(arr) {
//     for (let i = 0; i < arr.length - 1; i++) {
//       if (arr[i] > arr[i + 1]) return false;
//     }
//     return true;
//   }

//   const actuallySorted = isLastStep && isSorted(array);
//   const highlightedIndex = variables?.index;

//   return (
//     <div className="mx-4 h-[600px] rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
//       <h3 className="text-lg font-semibold text-slate-800">Visualizer</h3>

//       {isLastStep && actuallySorted && (
//         <div className="mt-4 text-sm font-medium text-green-600">
//           ✓ Array sorted!
//         </div>
//       )}

//       {isLastStep && !actuallySorted && (
//         <div className="mt-4 text-sm font-medium text-red-600">
//           ✗ Not sorted — try again
//         </div>
//       )}

//       <div className="flex gap-3 mt-6">
//         {array.map((value, index) => {
//           const isHighlighted = index === highlightedIndex;

//           let boxClasses;
//           if (isLastStep) {
//             boxClasses = actuallySorted
//               ? "h-20 w-20 bg-green-500 text-white text-2xl scale-105"
//               : "h-20 w-20 bg-red-500 text-white text-2xl scale-105";
//           } else if (isHighlighted) {
//             boxClasses =
//               event === "write"
//                 ? "h-16 w-16 bg-orange-500 text-white text-lg"
//                 : "h-16 w-16 bg-pink-500 text-white text-lg";
//           } else {
//             boxClasses = "h-16 w-16 bg-slate-100 text-slate-700 text-lg";
//           }

//           return (
//             <div key={index} className="flex flex-col items-center gap-2">
//               <div className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${boxClasses}`}>
//                 {value}
//               </div>
//               <div className="text-xs text-slate-400">{index}</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Visualizer;

const Visualizer = ({ array, event, highlightIndices = [], isLastStep }) => {
  function isSorted(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  }

  const actuallySorted = isLastStep && isSorted(array);

  return (
    <div className="mx-4 h-[600px] rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Visualizer</h3>

      {isLastStep && actuallySorted && (
        <div className="mt-4 text-sm font-medium text-green-600">
          ✓ Array sorted!
        </div>
      )}

      {isLastStep && !actuallySorted && (
        <div className="mt-4 text-sm font-medium text-red-600">
          ✗ Not sorted — try again
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {array.map((value, index) => {
          const isHighlighted = highlightIndices.includes(index);

          let boxClasses;
          if (isLastStep) {
            boxClasses = actuallySorted
              ? "h-20 w-20 bg-green-500 text-white text-2xl scale-105"
              : "h-20 w-20 bg-red-500 text-white text-2xl scale-105";
          } else if (isHighlighted) {
            boxClasses =
              event === "write"
                ? "h-16 w-16 bg-orange-500 text-white text-lg"
                : "h-16 w-16 bg-pink-500 text-white text-lg";
          } else {
            boxClasses = "h-16 w-16 bg-slate-100 text-slate-700 text-lg";
          }

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${boxClasses}`}
              >
                {value}
              </div>
              {isHighlighted && !isLastStep && (
                <div className="text-pink-500 text-xl">▲</div>
              )}
              <div className="text-xs text-slate-400">{index}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visualizer;