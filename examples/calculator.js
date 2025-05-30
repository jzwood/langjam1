/*
 * EXAMPLE PROGRAM
 * GRAMMAR:
 *  EXPR := INT | OP EXPR EXPR
 *  OP := '+' | '*'
 */
const PROGRAM = "+ 4 * 2 7";

// TOKENIZED PROGRAM
const TOKENS = ["+", 4, "*", 2, 7];

/*
 * PARSED AST
 * Your language is NOT REQUIRED to have a parser.
 * If your interpreter only raw AST nodes that's perfectly acceptable.
 */
const MATH_EXPRESSION = {
  type: "OP",
  name: "ADD",
  left: { type: "INT", value: 4 },
  right: {
    type: "OP",
    name: "MULT",
    left: { type: "INT", value: 2 },
    right: { type: "INT", value: 7 },
  },
};

/*
 * INTERPRETER
 * Evaluates AST expression
 */
function interpreter(expr) {
  switch (expr.type) {
    case "OP": {
      switch (expr.name) {
        case "ADD":
          return interpreter(expr.left) + interpreter(expr.right);
        case "MULT":
          return interpreter(expr.left) * interpreter(expr.right);
      }
    }
    case "INT":
      return expr.value;
  }
}

/*
 * TRANSPILER
 * Outputs AST to javascript
 */
function transpiler(expr) {
  switch (expr.type) {
    case "OP": {
      switch (expr.name) {
        case "ADD":
          return `(${transpiler(expr.left)} + ${transpiler(expr.right)})`;
        case "MULT":
          return `(${transpiler(expr.left)} * ${transpiler(expr.right)})`;
      }
    }
    case "INT":
      return expr.value.toString();
  }
}

// TESTS
console.assert(18 === interpreter(MATH_EXPRESSION));
console.assert("(4 + (2 * 7))" === transpiler(MATH_EXPRESSION));
