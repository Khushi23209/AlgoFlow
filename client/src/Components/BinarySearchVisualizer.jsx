
const BinarySearchVisualizer = ({ array, event, variables }) => {
  const { low, high, mid, target, midValue } = variables || {};

  function getReasoningText() {
    if (event === "check-mid") {
      return `Checking index ${mid}: value is ${midValue}. Comparing with target ${target}...`;
    }
    if (event === "narrow-right") {
      return `${midValue} is less than ${target}, so we search the right half.`;
    }
    if (event === "narrow-left") {
      return `${midValue} is greater than ${target}, so we search the left half.`;
    }
    if (event === "found") {
      return `${midValue} equals ${target} — found it!`;
    }
    return "";
  }

  return (
    <div className="mx-4 h-[600px] rounded-xl border border-pink-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Binary Search Visualizer</h3>

      <div className="mt-2 text-sm text-slate-600">
        Searching for: <span className="font-bold text-indigo-600">{target}</span>
      </div>

      {getReasoningText() && (
        <div className="mt-3 rounded-lg bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {getReasoningText()}
        </div>
      )}

      {event === "found" && (
        <div className="mt-4 text-sm font-medium text-green-600">
          ✓ Found {target} at index {mid}!
        </div>
      )}
      {event === "not-found" && (
        <div className="mt-4 text-sm font-medium text-red-600">
          ✗ {target} not found in array
        </div>
      )}

      <div className="flex gap-3 mt-6">
        {array.map((value, index) => {
          const isOutOfRange = low !== undefined && high !== undefined && (index < low || index > high);
          const isMid = index === mid;
          const isLow = index === low;
          const isHigh = index === high;

          let boxClasses;
          if (isMid) {
            boxClasses = "h-16 w-16 bg-pink-500 text-white text-lg";
          } else if (isOutOfRange) {
            boxClasses = "h-16 w-16 bg-slate-50 text-slate-300 text-lg opacity-40";
          } else {
            boxClasses = "h-16 w-16 bg-slate-100 text-slate-700 text-lg";
          }

          return (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`flex items-center justify-center rounded-lg font-bold transition-all duration-300 ${boxClasses}`}>
                {value}
              </div>
              <div className="flex gap-1 text-[10px] font-semibold">
                {isLow && <span className="text-indigo-500">low</span>}
                {isMid && <span className="text-pink-500">mid</span>}
                {isHigh && <span className="text-indigo-500">high</span>}
              </div>
              <div className="text-xs text-slate-400">{index}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;