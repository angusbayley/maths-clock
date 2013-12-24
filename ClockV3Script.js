//Rob: use Chrome Javascript Editor to develop. Check out youtube tutorials on this.
    
function theClock() {
	var timeStore = ["hello", 0, 0];
	a = clock(timeStore);
}

function clock(timeStore) {
	var digital = new Date();
	var hours = digital.getHours();
	var minutes = digital.getMinutes();
	var seconds = digital.getSeconds();
	//var amOrPm = "AM";
	//if (hours > 11) amOrPm = "PM";
	//if (hours > 12) hours = hours - 12;
	if (hours == 0) hours = "00";
	if (minutes <= 9) minutes = "0" + minutes;
	if (seconds <= 9) seconds = "0" + seconds;
	//dispTime = '<b>'+hours + ":" + minutes + ":" + seconds +'</b>';
	//document.getElementById('pendule').innerHTML = dispTime;
	if (hours != timeStore[0])  {
		hourDisplay = displayGen(hours);
		timeStore[0] = hours;
	}
	if (minutes != timeStore[1])  {
		minuteDisplay = displayGen(minutes);
		timeStore[1] = minutes;
	}
	if (seconds != timeStore[2])  {
		secondDisplay = displayGen(seconds);
		timeStore[2] = seconds;
	}
	document.getElementById("bottomBoxHours").innerHTML = hourDisplay;
	document.getElementById("bottomBoxMinutes").innerHTML = minuteDisplay;
	document.getElementById("bottomBoxSeconds").innerHTML = secondDisplay;
	setTimeout(function(){clock(timeStore)}, 1000);
}

//Below: Note that this is only activated if the value of "time" changes (see lines 21-32).

function displayGen(time) {
	functionArray = factorsAndSqRt(time)[0];
	operator = operatorSelector(functionArray);
	factors = factorsAndSqRt(time)[1];
	return (mathMaker(operator, factors, time));
}

//Next function (factorsAndSqRt) finds if factors exist, finds if square root exists, stores values, updates array of possible mathematical operations. Returns an array containing two sub-arrays. The first is full of the allowed functions for the user to have to work out - this changes depending on the number in question, and the second is an array of factors of a number.

function factorsAndSqRt(thisNumber) {
	if(thisNumber<13) {
		var functionArray = ["add", "subtract", "divide", "square root",];
	}
	else {	
		var functionArray = ["add", "subtract", "divide"];
	}
	var factors = [];
	var fctrs = false;
	var sqRoot = Math.sqrt(thisNumber);
	for (i=1;i<sqRoot+1;i++) {
		if (thisNumber%i === 0) {
			var fctrs = true;
			factors[factors.length] = i;
		}
	}
	if (fctrs === true) {
		functionArray[functionArray.length] = "multiply";
	}
	if (sqRoot === Math.round(sqRoot)) {
		//var sqR = true;
		functionArray[functionArray.length] = "square";
	}
	outputArray = [functionArray, factors];
	return(outputArray);		
}
		
function operatorSelector(functionArray) {
	operation = functionArray[Math.round(Math.random()*(functionArray.length-1))];
	return operation;		
}
		
function mathMaker(operation, factors, time) {
    //operation = "square root";
	switch(operation) {
		case "add":
			addNumber1 = Math.round(Math.random()*time);
			addNumber2 = time - addNumber1;
			return (addNumber1+" + "+addNumber2);
			break;
		case "subtract":
			subtractNumber1 = Math.round(Math.random()*(99-parseInt(time)))+parseInt(time);
			subtractNumber2 = subtractNumber1-time;
			return (subtractNumber1 +" - "+ subtractNumber2);
			break;
		case "multiply":
			if (time === 0 || time === "00") {
				multNumber1 = Math.round(Math.random()*12);
				multNumber2 = 0;
			}
			else {
				factorsArrayLocation = Math.floor((Math.random()*factors.length) % factors.length);
				multNumber1 = factors[factorsArrayLocation];
				if (multNumber1 == 1) {
					multNumber1 = factors[factorsArrayLocation];
				} //one more go to get the multiple to not equal 1
				multNumber2 = time/multNumber1;
			}
			return (multNumber1 + "&times" + multNumber2)
			//perhaps add something to randomise whether the big or the small factor appears first in the multiplication
			//perhaps add a weighting factor to reduce frequency of 1x table multiplications
			break;
		case "divide":
			divNumber1 = Math.round(Math.random()*9+1);
			divNumber2 = divNumber1*time;
			return (divNumber2 + " / " + divNumber1);
			break;
		case "square":
			squareNumber = Math.sqrt(time);
			return(squareNumber + "<sup>2</sup>");
			break;
		case "square root":
			rootNumber = Math.pow(time,2);
			return ("&#8730;"+rootNumber);
			break;
	}
}

window.onload=theClock;
