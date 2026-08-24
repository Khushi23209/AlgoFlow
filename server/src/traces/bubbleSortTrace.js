const bubbleSortTrace = [
  {
    step: 1,
    line: 6,
    event: "compare",
    variables: {
      i: 0,
      j: 0,
      array: [5, 2, 8],
      comparing: [0, 1],
      swapped: false
    }
  },

  {
    step: 2,
    line: 8,
    event: "swap",
    variables: {
      i: 0,
      j: 0,
      array: [2, 5, 8],
      comparing: [0, 1],
      swapped: true
    }
  },

  {
    step: 3,
    line: 6,
    event: "compare",
    variables: {
      i: 0,
      j: 1,
      array: [2, 5, 8],
      comparing: [1, 2],
      swapped: false
    }
  },

  {
    step: 4,
    line: 5,
    event: "next_pass",
    variables: {
      i: 1,
      j: 0,
      array: [2, 5, 8],
      comparing: [0, 1],
      swapped: false
    }
  },

  {
    step: 5,
    line: 6,
    event: "compare",
    variables: {
      i: 1,
      j: 0,
      array: [2, 5, 8],
      comparing: [0, 1],
      swapped: false
    }
  },

  {
    step: 6,
    line: 12,
    event: "done",
    variables: {
      i: 1,
      j: 0,
      array: [2, 5, 8],
      comparing: [],
      swapped: false
    }
  }
];

module.exports = bubbleSortTrace;