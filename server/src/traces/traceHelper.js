const __steps = [];
let __step = 0;

function __trace(event, variables = {}) {
  __steps.push({
    step: ++__step,
    event,
    variables: structuredClone(variables)
  });
}