function convertToRoman(num) {
  let strArr = num.toString().split("");
  let numArr = [];
  let preRomArr = [];
  let romArr = [];
  const magOrd = 1000;

  for (let i = 0; i < strArr.length; i++) {
    numArr.push(parseInt(strArr[i]));
  }

  for (let i = 0; i < numArr.length; i++) {
    while (numArr.length < 4) {
      numArr.unshift(0);
    }
  }

  let magArr = [...numArr];
  let div = magOrd;
  for (let i = 0; i < magArr.length; i++) {
    magArr[i] *= div;
    div /= 10;
  }

  for (let i in magArr) {
    switch (magArr[i] / numArr[i]) {
      case 1000:
        preRomArr.push("M".repeat(numArr[i]));
        break;
      case 100:
        preRomArr.push("C".repeat(numArr[i]));
        break;
      case 10:
        preRomArr.push("X".repeat(numArr[i]));
        break;
      case 1:
        preRomArr.push("I".repeat(numArr[i]));
        break;
    }
  }

  for (let i in preRomArr) {
    if (preRomArr[i].startsWith("C") && preRomArr[i].length === 5) {
      romArr.push("D");
    } else if (
      preRomArr[i].startsWith("C") &&
      preRomArr[i].length > 3 &&
      preRomArr[i].length < 5
    ) {
      romArr.push("CD");
    } else if (
      preRomArr[i].startsWith("C") &&
      preRomArr[i].length > 5 &&
      preRomArr[i].length < 9
    ) {
      romArr.push("D" + "C".repeat(preRomArr[i].length - 5));
    } else if (preRomArr[i].startsWith("C") && preRomArr[i].length === 9) {
      romArr.push("CM");
    } else if (preRomArr[i].startsWith("X") && preRomArr[i].length === 5) {
      romArr.push("L");
    } else if (
      preRomArr[i].startsWith("X") &&
      preRomArr[i].length > 3 &&
      preRomArr[i].length < 5
    ) {
      romArr.push("XL");
    } else if (
      preRomArr[i].startsWith("X") &&
      preRomArr[i].length > 5 &&
      preRomArr[i].length < 9
    ) {
      romArr.push("L" + "X".repeat(preRomArr[i].length - 5));
    } else if (preRomArr[i].startsWith("X") && preRomArr[i].length === 9) {
      romArr.push("XC");
    } else if (preRomArr[i].startsWith("I") && preRomArr[i].length === 5) {
      romArr.push("V");
    } else if (
      preRomArr[i].startsWith("I") &&
      preRomArr[i].length > 3 &&
      preRomArr[i].length < 5
    ) {
      romArr.push("IV");
    } else if (
      preRomArr[i].startsWith("I") &&
      preRomArr[i].length > 5 &&
      preRomArr[i].length < 9
    ) {
      romArr.push("V" + "I".repeat(preRomArr[i].length - 5));
    } else if (preRomArr[i].startsWith("I") && preRomArr[i].length === 9) {
      romArr.push("IX");
    } else {
      romArr.push(preRomArr[i]);
    }
  }

  return romArr.join("");
}

/* test here */
console.log(convertToRoman(1993));
