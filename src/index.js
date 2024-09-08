function check(str, bracketsConfig) {
  const openToClose = new Map();
  const closeToOpen = new Map();

  const sameBrackets = new Set();

  for (const [open, close] of bracketsConfig) {
    openToClose.set(open, close);
    closeToOpen.set(close, open);
    if (open === close) {
      sameBrackets.add(open);
    }
  }

  const stack = [];

  for (const char of str) {
    if (sameBrackets.has(char)) {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      } else {
        stack.push(char);
      }
    } else if (openToClose.has(char)) {
      stack.push(char);
    } else if (closeToOpen.has(char)) {
      if (
        stack.length === 0 ||
        stack[stack.length - 1] !== closeToOpen.get(char)
      ) {
        return false;
      }

      stack.pop();
    } else {
      return false;
    }
  }

  return stack.length === 0;
}

module.exports = check;
