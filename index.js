const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser');
/*var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data*/

express()
  .use(bodyParser.json()) // for parsing application/json
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res){

	res.render('pages/index');

  })
 // .get('/getRate', (req, res) => res.render('pages/getRate'))
  .post('/getRate', function(req,res){
	//res.render('pages/getRate');
  	calculateRate(req,res);
  
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  function calculateRate(req,res){

  	var types_of_mails = req.body.types_of_mails;
  	var weight = parseFloat(req.body.weight);
  	var mail = null;
  	var total_to_pay = null;

  	// Set the correct price according to the service selected
  	if(types_of_mails == "LettS"){
  		total_to_pay = calculateLettersStamped(weight);
  		//console.log("letterS0200");
  		mail = "Letters (Stamped)";
  	}else if (types_of_mails == "LettM") {
  		total_to_pay = calculateLettersMetered(weight);
  		//console.log("letterM0000");
  		mail = "Letters (Metered)";
  	}else if (types_of_mails == "LargE") {
  		total_to_pay = calculateLargeEnvelopes(weight);
  		//console.log("letterE000000");
  		mail = "Large Envelopes (Flats)";
  	}else if (types_of_mails == "FirstCP") {
  		total_to_pay = calculateFirstClass(weight);
  		//console.log("letterCP00000");
  		mail = "First-Class Package Service—Retail";
  	}

 	console.log('passesd');
  	console.log(types_of_mails);
  	console.log(weight);

  	var params = {mail_Type : mail, total_to_pay: total_to_pay, weight: weight};
  	res.render('pages/getRate', params);

  }

  /* This function is designed to calculate the price for
      the letter Stamped*/
  function calculateLettersStamped(weight){

  		switch(weight){
  			case 1:
  				return .50;
  				break;
  			case 2:
  				return .71;
  				break;
  			case 3:
  				return .92;
  				break;
  			case 3.5: 
  				return 1.13;
  				break;
  		}
  		return 0;
  }

 /*This functions is designed to calculate the price 
   for the letters metered*/
  function calculateLettersMetered(weight){

			switch(weight){
				case 1:
					return .47;
					break;
				case 2:
					return .68;
					break;
				case 3:
					return .89;
					break;
				case 3.5: 
					return 1.10;
					break;
			}

			return 0;
	}


 /*This function is designed to calculate the price for
    the Large Envelopes(Flats)*/
  function calculateLargeEnvelopes(weight){

  	if(weight == 1)
  		return 1;
  	else if(weight >= 2 && weight <= 13)
  		return 1 + ((weight - 1 ) * .21); // $0.21 is the excedent for each
  										  // extra Oz. 
  	else
  		return 0;
  }

/*This function is designed to calculate the price 
  for First-Class package service-retail*/
function calculateFirstClass(weight){

	var OneOz = 3.5;

	if(weight >= 1 && weight <= 4)
		return 3.5;
	else if(weight >= 5 && weight <= 8)
		return 3.75; 
	else if(weight >= 9 && weight <= 13)
		//Subtract the weight in order to increment it the price
		//gradually by $0.35. The base price is $4.10, and the $0.10 was
		//added to the final to avoid have a extended decimal number. 
		return 4 + (.35 * (weight - 9) + .10); /*Base price since 9 Oz*/ 
}

