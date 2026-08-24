import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faBackwardStep, faForwardStep, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const Controls = ({ currentStepIndex, totalSteps, onNext, onPrev, onExplain, loadingExplanation }) => {
  return (
    <div className="mx-4 my-4 flex items-center justify-between rounded-xl border border-pink-100 bg-white px-6 py-4 shadow-sm">
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          disabled={currentStepIndex === 0}
          className="rounded-lg border border-slate-200 px-3 py-2 text-slate-600 transition hover:bg-slate-50 disabled:opacity-40"
        >
            <FontAwesomeIcon icon={faBackwardStep} />
        </button>

        <button
          onClick={() => {
  console.log("Next clicked!");
  onNext();
}}
          disabled={currentStepIndex >= totalSteps - 1}
          className="rounded-lg bg-pink-500 px-4 py-2 text-white transition hover:bg-pink-600 disabled:opacity-40"
        >
          <FontAwesomeIcon icon={faForwardStep} />
        </button>
      </div>

      <div className="text-sm font-medium text-slate-600">
        Step {totalSteps > 0 ? currentStepIndex + 1 : 0} / {totalSteps}
      </div>

      <button
        onClick={onExplain}
        disabled={totalSteps === 0 || loadingExplanation}
        className="flex items-center gap-2 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:opacity-40"
      >
        <FontAwesomeIcon icon={faWandMagicSparkles} />
        {loadingExplanation ? "Thinking..." : "Explain this step"}
      </button>
    </div>
  );
};

export default Controls;