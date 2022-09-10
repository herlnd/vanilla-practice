// Gets current operator
const getOperator = (str) => {
  let symbol;
  for (let i = 0; i < opArr.length; i++) {
    if (str.indexOf(opArr[i]) !== -1) {
      symbol = opArr[i];
    }
  }
  return symbol;
};

// Checks for operators
const containsOp = (str) =>
  opArr.some((op) => (str.indexOf(op) !== -1 ? true : false));

// Formats numbers to local language representation.
const formatNumber = (num) => {
  let expIndex = num.toString().indexOf("e+");
  if (expIndex !== -1) {
    formattedNumber = "overflow";
  } else if (num.toString().length > 10) {
    let auxNum = num.toLocaleString("es-AR", {
      maximumFractionDigits: 2,
      notation: "scientific",
    });
    let eIndex = auxNum.indexOf("E0");
    if (eIndex !== -1) {
      formattedNumber = auxNum.slice(0, eIndex);
    } else {
      formattedNumber = auxNum;
    }
  } else {
    formattedNumber = num.toLocaleString("es-AR", { maximumFractionDigits: 2 });
  }

  return formattedNumber;
};

// Handles engineering notations.
function handleNotation(num) {
  let notationIndex = num.toString().indexOf("E");
  if (notationIndex !== -1) {
    return num.toString().replace("E", "exp");
  } else {
    return num;
  }
}

// Calculates %, 1/x, pow and sqrt.
function calculateOthers(leftTerm, operator) {
  switch (operator) {
    case "percentage":
      result = formatNumber(leftTerm / 100);
      expression = `${leftTerm}%`;
      return { result, expression };
    case "fraction":
      leftTerm === 0 ? alert("nope") : (result = formatNumber(1 / leftTerm));
      expression = `1/${leftTerm}`;
      return { result, expression };
    case "pow":
      result = formatNumber(leftTerm ** 2);
      expression = `${leftTerm}²`;
      return { result, expression };
    case "sqrt":
      leftTerm < 0
        ? alert("nope")
        : (result = formatNumber(leftTerm ** (1 / 2)));
      expression = `2√${leftTerm}`;
      return { result, expression };
  }
}
