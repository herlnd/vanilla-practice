function checkCashRegister(price, cash, cid) {

    //Array of objects for currency.
      let currency = [
      { name: "PENNY", value: 1 },
      { name: "NICKEL", value: 5 },
      { name: "DIME", value: 10 },
      { name: "QUARTER", value: 25 },
      { name: "ONE", value: 100 },
      { name: "FIVE", value: 500 },
      { name: "TEN", value: 1000 },
      { name: "TWENTY", value: 2000 },
      { name: "ONE HUNDRED", value: 10000 }
      ];
    
    //Conversion of cid array into an array of objects.
      let newCID = [];
      for (let i in cid) {
        newCID.push({name: cid[i][0], value: Math.round(cid[i][1] * 100)})
      };
    
    //Total cash in drawer.
      let totalCID = 0;
      for (let i in newCID) {
        totalCID += newCID[i].value;
      };
    
    //Results to return.
      let insufficientFunds = { status: "INSUFFICIENT_FUNDS", change: [] };
      let closed = { status: "CLOSED", change: cid};
      let open = { status: "OPEN", change: [] };
    
    //payable change calculation & creation of a copy for later checking.
      let change = Math.round(cash * 100) - Math.round(price * 100);
      let changeDue = change;
    
    //Handling results for insufficient funds and closed change.
      if (totalCID < changeDue) {
        return insufficientFunds;
      };
    
      if (totalCID === changeDue) {
        return closed;
      };
    
    //Reversing of both currency and newCID arrays for displaying the correct result.
      currency.reverse();
      newCID.reverse();
    
    //Creation of a new array of objects for storing the change for the client in the desirable format and resetting its corresponding values to zero.
      let cashToGive = JSON.parse(JSON.stringify(currency));
      for (let i in cashToGive) {
        cashToGive[i].value = 0;
      }; 
    
    //Assignation of the values and its names to the "cashToGive" array while decreasing the change due and the cash in drawer (cid) amount for the corresponding type of currency.
      for (let i in currency) {   
      while (changeDue >= currency[i].value && newCID[i].value > 0) {
          changeDue -= currency[i].value;
          newCID[i].value -= currency[i].value;
          cashToGive[i].value += currency[i].value / 100;
        };
      };
    
    //Filtering of null items and totaling of the result.
      let aux = cashToGive.filter(item => item.value !== 0)
      let totalAux = 0;
      let cashForClient = [];
      for (let i in aux) {
        cashForClient.push([aux[i].name, aux[i].value]);
        totalAux += aux[i].value;
      };
    
    //Handling decimals errors for accurate comparisons.
      let totalCashForClient = Number(parseFloat(totalAux).toFixed(2));
    
    //Checking for the condition that the program is returning the exact amount of change and returning the open or insufficient funds results.
      if (change/100 === totalCashForClient) {
        open.change = cashForClient;
        return open; 
      } else {
        return insufficientFunds; 
      }; 
    };
    
    /* test here */
    
    let arr = [
      ["PENNY", 1.01], 
      ["NICKEL", 2.05], 
      ["DIME", 3.1], 
      ["QUARTER", 4.25], 
      ["ONE", 90], 
      ["FIVE", 55], 
      ["TEN", 20], 
      ["TWENTY", 60], 
      ["ONE HUNDRED", 100]
      ];
    
    console.log(checkCashRegister(3.26, 100, arr));