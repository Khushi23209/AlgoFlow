const SelectionSortVisualizer = ({ array, event, variables }) => {
  const { i, j, minIndex, checking } = variables || {};

  function getReasoningText() {
    if (event === "check") {
      return `Checking index ${checking}: not smaller than current minimum (index ${minIndex}).`;
    }
    if (event === "new-min") {
      return `Index ${checking} has a new smallest value — updating minimum to index ${minIndex}.`;
    }
    if (event === "swap") {
      return `Placing the minimum (index ${minIndex}) into position ${i}.`;
    }
    return "";
  }

  return (
    <div className="mx-4 h-[600px] rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Selection Sort Visualizer</h3>

      {getReasoningText() && (
        <div className="mt-3 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {getReasoningText()}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {array.map((value, index) => {
          const isSorted = i !== undefined && index < i;
          const isMinIndex = index === minIndex;
          const isChecking = index === checking && event !== "swap";

          let boxClasses;
          if (isSorted) {
            boxClasses = "h-16 w-16 bg-green-100 text-green-700 text-lg border-2 border-green-300";
          } else if (isMinIndex) {
            boxClasses = "h-16 w-16 bg-pink-500 text-white text-lg";
          } else if (isChecking) {
            boxClasses = "h-16 w-16 bg-orange-300 text-white text-lg";
          } else {
            boxClasses = "h-16 w-16 bg-slate-100 text-slate-700 text-lg";
          }

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${boxClasses}`}>
                {value}
              </div>
              <div className="flex gap-1 text-[10px] font-semibold">
                {isMinIndex && <span className="text-pink-500">min</span>}
              </div>
              <div className="text-xs text-slate-400">{index}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectionSortVisualizer;