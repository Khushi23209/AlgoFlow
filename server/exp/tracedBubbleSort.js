// -------------------------------
// Trace Helper
// -------------------------------

const __steps = [];
let __step = 0;

function __trace(event, variables = {}) {
  __steps.push({
    step: ++__step,
    event,
    variables: structuredClone(variables),
  });
}

// -------------------------------
// Bubble Sort
// -------------------------------

function bubbleSort(arr) {
  // Work on a copy so the original array isn't modified
  arr = [...arr];

  __trace("start", {
    array: arr,
  });

  for (let i = 0; i < arr.length - 1; i++) {

    __trace("outer-loop", {
      i,
      array: arr,
    });

    for (let j = 0; j < arr.length - i - 1; j++) {

      __trace("compare", {
        i,
        j,
        left: arr[j],
        right: arr[j + 1],
        array: arr,
      });

      if (arr[j] > arr[j + 1]) {

        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

        __trace("swap", {
          i,
          j,
          array: arr,
        });
      }
    }
  }

  __trace("done", {
    array: arr,
  });
}



bubbleSort([5, 2, 8]);



console.log(JSON.stringify(__steps, null, 2));