function telephoneCheck(str) {
    let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    
    if (str.match(regex)) {
      return true;
    } else {
      return false;
    }

  };

  /* test here */

  console.log(telephoneCheck("555-555-5555"));