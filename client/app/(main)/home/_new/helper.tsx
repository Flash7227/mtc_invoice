function checkInput(e: any) {
    if (e.key == "Backspace") {
      return;
    }
    const cyrillicPattern = /^\d+$/;
    // const englishAlphabetAndWhiteSpace = /[A-Za-z ]/g;
    const numberPatter = /^([-0-9])| +$/; //with space, and dash
    if (cyrillicPattern.test(e.key)) {
      // console.log('mn');
      //   setIsChanged(true);
    } else {
      if (!numberPatter.test(e.key)) {
        e.preventDefault();
      }
    }
  }
  function formatNumber(input: any, notTarget: boolean) {
    if(notTarget){
      return input.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      // let parts = input.split(".");
      // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // return parts.join(".");
    }
    // Remove all non-numeric characters except for the period (.)
    let value = input.target.value.replace(/[^0-9.]/g, "");
  
    // Split the value into integer and decimal parts
    let parts = value.split(".");
  
    // Format the integer part with commas
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    // Join the parts back together
    input.target.value = parts.join(".");
  }

  function chargedMonth(input:string){
    const year = input.substring(0, 4);
    const month = input.substring(4);
    return `${year}-${month}сар`;
  }
export {checkInput, formatNumber, chargedMonth}