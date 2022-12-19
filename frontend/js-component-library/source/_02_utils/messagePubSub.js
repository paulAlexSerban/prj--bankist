window.app = window.app || {};
window.app.actions = window.app.actions || {};
const actions = window.app.actions;

export const subscribe = (message, action) => {
  if (actions[message]) {
    actions[message].push(action);
  } else {
    actions[message] = [action];
  }
};

export const unsubscribe = (message, action) => {
  if (actions[message]) {
    const toRemove = actions[message].indexOf(action);
    actions[message].splice(toRemove, 1);
  }
};

export const publish = (message, params = {}) => {
  // is some action listening
  callStack(message, params);
};

export const callStack = (message, params) => {
  if (actions[message]) {
    const callStack = Array.from(actions[message]); // copy array
    // call all actions by last one registered
    let prevent = false;
    // run the call stack unless it returns false (prefent futher actions to run)
    while (!prevent && callStack.length > 0) {
      const action = callStack.pop();
      prevent = action(params);
    }
  }
};
