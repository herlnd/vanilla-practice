function palindrome(str) {
  let regex = /[^a-z0-9]/g;

  let cleanStr = str.toLowerCase().replace(regex, "").split("");

  let fwdStr = [...cleanStr];
  let bwdStr = [...cleanStr.reverse()];

  if (fwdStr.join("") === bwdStr.join("")) {
    return true;
  } else {
    return false;
  }
}

/* test here */
console.log(palindrome("racecar"));
