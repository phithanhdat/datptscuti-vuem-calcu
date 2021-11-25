const math = {
  foo() {
    console.log("foo");
  },
  bar() {
    console.log("bar");
  },
  baz() {
    console.log("baz");
  },
};

export default math;

export const isNum = (c) => {
  if (c >= "0" && c <= "9") {
    return true;
  } else {
    return false;
  }
};

export const notNum = (b) => {
  if(b === '+' || b === '-' || b === '*' 
  || b === 'x' || b === '/'|| b === '÷' || b === '%' || b === '^'
  || b === '(' || b === ')'){
    return true;
  }
  return false;
}

export const strip = (number) => {
  var rounded = (parseFloat(number).toPrecision(10));
  return (rounded * 1).toString()
}

export const precedence = (o) => {
  if (o === "(") return 0;
  if (o === "+" || o === "-") return 1;
  if (o === "x" || o === "*" || o === "/" || o === "÷" || o === "%") return 2;
  return 3;
};

export const postFixEvaluation = (exp) => {
  var stack = [];
  for (var i = 0; i < exp.length; i++) {
    var c = exp[i];
    if (!isNaN(c)) stack.push(c - "0");
    else {
      var val1 = stack.pop();
      var val2 = stack.pop();
      if (val1 === undefined || val2 === undefined)
        return "Syntax error";
      switch (c) {
        case "+":
          stack.push(val2 + val1);
          break;
        case "-":
          stack.push(val2 - val1);
          break;

        case "/": case "÷":
          stack.push(val2 / val1);
          break;
          case "^":
          stack.push(Math.pow(val2, val1));
          break;

        case "*": case "x":
          stack.push(val2 * val1);
          break;
      }
    }
  }
  return stack.pop();
};


export const infixtoPostfix = (infix) => {
  var x;
  var stack = [];
  var postfix = [];
for (let i = 0; i < infix.length; i++) {
  const token = infix[i];
  if (isNum(token)) {
    postfix.push(token);
  }else{
      if(token === '(') stack.push(token);
      else if(token === ')') {
          while((x = stack.pop()) != '(') postfix.push(x);
      }else{
          while(precedence(token) <= precedence(stack[stack.length-1]) && stack.length != 0){
              x = stack.pop();
              postfix.push(x);
          }
          stack.push(token);
      }
  }
}
while(stack.length != 0){
    postfix.push(stack.pop());
}
return postfix;
}


export const tokenizer = (rawAlgebra) => {
  var noneSpace = rawAlgebra.replace(/ /g, "");
  var dealWithSign = noneSpace.replace(/-\(/g, "-1*(");
  noneSpace = dealWithSign;
  var res = [];
  for (let i = 0; i < noneSpace.length; i++) {
      const a = noneSpace.charAt(i);
      if(i == 0 && a === '-'){
        res.push(a);continue
      }
      res.push(a);
      if(i < noneSpace.length - 1){
        const b = noneSpace.charAt(i+1);
        if(notNum(b)){
            res.push(';')
        }else if(notNum(a)){
            res.push(';')
        }
      }
  }
  var okk = new String(res).split(",;,");
  for (let i = 0; i < okk.length; i++) {
      let e = okk[i];
      e = e.replace(',.,','.');
      e = e.replace(/,/g,'');
      okk[i] = e;
  }
  return okk;
}