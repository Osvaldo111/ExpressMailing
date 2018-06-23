const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

var bodyParser = require('body-parser');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

express()
  .use(bodyParser.json()) // for parsing application/json
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res){

	res.render('pages/index');

  })

   .get('/getRate', function(req, res){

	res.render('pages/getRate');

	})
 // .get('/getRate', (req, res) => res.render('pages/getRate'))
  .post('/getRate', function(req,res){
	//res.render('pages/getRate');
  	calculateRate(req,res);
  
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))



  function calculateRate(req,res){

  	var types_of_mails = req.body.types_of_mails;
  	var weight = parseInt(req.body.weight);
  	var total_to_pay = calculateFirstClass(weight);

 	console.log('passesd');
  	console.log(types_of_mails);
  	console.log(weight);

  	res.render('pages/getRate', {total_to_pay : total_to_pay});

  }

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

  function calculateLargeEnvelopes(weight){

  	var OneOz = 1;

  	if(weight == 1)
  		return 1;
  	else if(weight >= 2 && weight <= 13)
  		return 1 + ((weight - 1 ) * .21); // $0.21 is the excedent for each
  										  // extra Oz. 
  	else
  		return 0;
  }


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

