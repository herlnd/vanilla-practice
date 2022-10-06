function rot13(str) {
    let arr = str.split(" ");
    let cipArr = [];
    let strArr = [];
    
    /* CharCodes => A65-Z90 */
    
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j  < arr[i].length; j++) {
        if (arr[i].charCodeAt(j) >= 65 && arr[i].charCodeAt(j) <=90) {
            if ((arr[i].charCodeAt(j) - 13) < 65) {
                cipArr.push((90 - (65 - (arr[i].charCodeAt(j) - 12))));
            } else if ((arr[i].charCodeAt(j) - 13) < 90) {
                cipArr.push(arr[i].charCodeAt(j) - 13);
            }; 
        } else {
          cipArr.push(arr[i].charCodeAt(j));
        };
      };
      cipArr.push(" ");
    };
    
    for (let i = 0; i < cipArr.length - 1; i++) {
      if (cipArr[i] === " ") {
        strArr.push(" ");
      } else {
        strArr.push(String.fromCharCode(cipArr[i]));
      };
    };
    
    let decStr = strArr.join("");
    return decStr;
    };
    
    /* teste here */
    console.log(rot13("SERR PBQR PNZC"));