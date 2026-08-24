import { useState } from "react";

const QuizModal = ({ isOpen, onClose, quizData, loading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);

  if (!isOpen) return null;

  const questions = quizData?.questions || [];
  const quiz = questions[currentIndex];

  function handleNext() {
    setSelectedIndex(null);
    setCurrentIndex(prev => Math.min(prev + 1, questions.length - 1));
  }

  function handlePrev() {
    setSelectedIndex(null);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[520px] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800">
            Quick Quiz {questions.length > 0 && `(${currentIndex + 1} / ${questions.length})`}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">✕</button>
        </div>

        {loading && (
            <div className="flex flex-col items-center py-8">
                <p className="text-sm text-slate-500">Generating 10 questions...</p>
                <p className="text-xs text-slate-400 mt-1">This can take a few seconds</p>
            </div>
            )}

        {!loading && quiz && (
          <div>
            <p className="text-sm font-medium text-slate-800 mb-4">{quiz.question}</p>

            <div className="flex flex-col gap-2">
              {quiz.options.map((option, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === quiz.correctIndex;
                const showResult = selectedIndex !== null;

                let boxClasses = "border-slate-200 hover:bg-slate-50";
                if (showResult && isCorrect) {
                  boxClasses = "border-green-400 bg-green-50";
                } else if (showResult && isSelected && !isCorrect) {
                  boxClasses = "border-red-400 bg-red-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => !showResult && setSelectedIndex(index)}
                    disabled={showResult}
                    className={`text-left rounded-lg border px-4 py-2 text-sm transition ${boxClasses}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {selectedIndex !== null && (
              <div className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
                {selectedIndex === quiz.correctIndex ? "✓ Correct! " : "✗ Not quite. "}
                {quiz.explanation}
              </div>
            )}

            <div className="mt-5 flex justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === questions.length - 1}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizModal;