  /*This function is designed to give a hint to the user about what weights are allowed dependent on the mail type selected.*/
function showParameters() {
    var x = document.getElementById("mail_type").value;
    var weight = document.getElementById("weight").value;
    

    //Check if the Letter is 
    if(x == "LettS"){
    document.getElementById("demo").innerHTML = "*For the Letter (Stamped), the weights available are: 1 -  3 (oz) & 3.5(oz).  Weight Not Over (oz.).";
        if (weight >= 1 && weight <= 3 || weight == 3.5) {
              document.getElementById("myBtn").disabled = false;
        }else{
             document.getElementById("myBtn").disabled = true;
        }

    }else if (x == "LettM") {
          document.getElementById("demo").innerHTML = "*For the Letter (Metered), the weights available are: 1 -  3 (oz) & 3.5(oz).  Weight Not Over (oz.).";
        if (weight >= 1 && weight <= 3 || weight == 3.5) {
              document.getElementById("myBtn").disabled = false;
        }else{
             document.getElementById("myBtn").disabled = true;
        }
    }else if (x == "LargE") {
          document.getElementById("demo").innerHTML = "*For the Large Envelopes (Flats), the weights available are: 1 -  13 (oz).  Weight Not Over (oz.).";
        if (weight >= 1 && weight <= 13) {
              document.getElementById("myBtn").disabled = false;
        }else{
             document.getElementById("myBtn").disabled = true;
        }


    }else if (x == "FirstCP") {
          document.getElementById("demo").innerHTML = "For the First-Class Package Service—Retail, the weights available are: 1 - 13 (oz).  Weight Not Over (oz.).";
        if (weight >= 1 && weight <= 13) {
              document.getElementById("myBtn").disabled = false;
        }else{
             document.getElementById("myBtn").disabled = true;
        }
    }
 }