 /* 
	 File       : main.js
     Author     : Marvin Little 
     Application: Auto-Care Assitant Application 1.0
    *************************************************************************************************
Coming soon:
     * Auto-Care Assitant Application 1.5 is in progress which will use AngularJS
     * Auto-Care Assitant Application 2.0 will have a MongoDB database with warranty
     information, and pictures of the cars.
*/

window.addEventListener("DOMContentLoaded", function doItAll() {

    function gEl(e) { // Get by id function to lessen the amount of code needed
        var elementID = document.getElementById(e);
        return elementID;
    }
			
// * ******* Variables section is below. ******* * //

// Array of vehicle years to display dynamiclly 
 	var yearArray = [ 
		"--Select Year--", "2015", "2014",
		"2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000", "1999", "1998", 
		"1997", "1996", "1995", "1994", "1993", "1992", "1991", "1990", "1989", "1988", "1987", "1986", "1985", "1984", "1983", "1982", 
		"1981", "1980", "1979", "1978", "1977", "1976", "1975", "1974", "1973", "1972", "1971", "1970", "1969", "1968", "1967", "1966", 
		"1965", "1964", "1963", "1962", "1961", "1960", "1959", "1958", "1957", "1956", "1955", "1954", "1953", "1952", "1951", "1950", 
		"1949", "1948", "1947", "1946", "1945", "1944", "1943", "1942", "1941", "1940", "1939", "1938", "1937", "1936", "1935", "1934", 
		"1933", "1932", "1931", "1930", "1929", "1928", "1927", "1926", "1925", "1924", "1923", "1922", "1921", "1920", "1919", "1918"
	], engineValue, HighPerformance, breakTag, errMsg = gEl('error'), profile1, profile2, profile3;

// Array of vehicle services to display dynamiclly 	
	var serviceArray = [
		"--Select Service--",
		"Oil change", "Tune up", "Air filter change", "Fuel filter change", 
		"Transmission flush", "Radiator flush", "Tire rotation"
	]; // End document.getElementById function	


// * Year select function that create a dynamic drop-down list with attributes * //
    (function mkSelect() {
        var formTag = document.getElementsByTagName("form"),
            selectLi = gEl("year"),							
            mkSelect = document.createElement("select");	
            mkSelect.setAttribute("id", "yearList");
            mkSelect.setAttribute("class", "selectpicker");
        for(var i = 0, j = yearArray.length; i < j; i++){
            var makeOption = document.createElement("option"); 
            var optText = yearArray[i];						
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            mkSelect.appendChild(makeOption);
        } // End yearArray loop
        selectLi.appendChild(mkSelect);
        return;
	    })(); // End mkSelect Function for Vehicle Year Drop-Down

	    
// * Service type select function that create a dynamic drop-down list with attributes * //
    (function mksList() {
	    var formTag2 = document.getElementsByTagName("form"),
            sLi = gEl("services"),							
            mkSel = document.createElement("select");	
            mkSel.setAttribute("id", "serviceList");
        for(var y = 0, r = serviceArray.length; y < r; y++){
            var makeOpt = document.createElement("option"); 
            var optTxt = serviceArray[y];						
            makeOpt.setAttribute("value", optTxt);
            makeOpt.innerHTML = optTxt;
            mkSel.appendChild(makeOpt);
        } // End serviceArray loop
        sLi.appendChild(mkSel);
        return;
    })(); // End mkList Function for Services selection list
	    
//////////////////////////////////////////////////////////////

	
// Get dynamic radio values and convert then to static values
// Function that loops through engine size Radio group
	function getRadio_1() {
        var radios = document.forms[0].engineSize;
        for(var i = 0; i < radios.length; i++) {
            if (radios[i].checked){
                engineValue = radios[i].value;
            } // End if statement
        } // End loop
    } // End getRadio_1 function for value to remain checked after user has checked this radio button.
	    
// Function that loops through engine booster Radio group (ex. Supercharged, Turbocharged or Twin-Turbocharged)	
	function getRadio_2() {
        var radio_2= document.forms[0].HighPo;
        for(var i = 0; i < radio_2.length; i++) {
            if (radio_2[i].checked){
                HighPerformance = radio_2[i].value;
            } // End if statement
        } // End loop
    } // End getRadio_2 function for value to remain checked after user has checked this radio button.
	
// * Toggle Control Function *  //
    function toggleControls(n){
        switch(n){
            case "on":
                gEl("vehicleForm").style.display = "none";
                gEl('clearData').style.display = "inline";
                gEl("displayData").style.display = "none";
                gEl("field2").style.display = "none";
                gEl("addNew").style.display = "inline";
                break;
            case "off":
                gEl("vehicleForm").style.display = "block";
                gEl('clearData').style.display = "inline";
                gEl("displayData").style.display = "inline";
                gEl("addNew").style.display = "none";
                gEl("field2").style.display = "block";
                gEl("items").style.display = "none";
                break;
            default:
                return false;
        }
    }
	
// * Store Data Function * //
	function storeData(key) {
// If no key, then a new key is to be given.  The same key has been passed through		
		if(!key) {
        	var id 					= Math.floor(Math.random()*1000001);
        } else {
	        	id = key;
		        }
	        getRadio_1();
	        getRadio_2();
	        var choice = {};
	            choice.year 		= ["Vehicle Year:", gEl("yearList").value];
	            choice.miles 		= ["Vehicle Mileage:", gEl("miles").value];
	            choice.make 		= ["Vehicle Make:", gEl("make").value];
	            choice.model 		= ["Vehicle Model:", gEl("model").value];
	            choice.engineSize 	= ["Engine Size:", engineValue];
	            choice.HighPo 		= ["Engine Booster:", HighPerformance];
	            choice.date 		= ["Service Date:", gEl("date").value];
	            choice.services 	= ["Vehicle services:", gEl("serviceList").value];
	            choice.warranty 	= ["Vehicle Warranty:", gEl("warranty").value];
	            choice.notes 		= ["Notes:", gEl("notes").value];
	        localStorage.setItem(id, JSON.stringify(choice));
	        alert("Your profile has been stored!");
	    }
	
// * Display Data Function * //
	function getData() {
		toggleControls("on");
		if(localStorage.length === 0){
			alert("There is no data in Local Storage so default data has been added.");
			autoFillData();
		}
        var makeDiv = document.createElement("div");
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement("ul");
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        gEl("items").style.display = "block";
        for(var i=0, len=localStorage.length; i<len; i++) {
            var makeli = document.createElement("li");
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement("ul");
            makeli.appendChild(makeSubList);
            getImg(obj.services[1], makeSubList);
            for(var n in obj) {
                var makeSubli = document.createElement("li");
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0] +" "+ obj[n][1];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
           makeItemLinks(localStorage.key(i), linksLi); 
        }
	        
    function getImg(serviceType, makeSubList){
    	var imgLi = document.createElement('li');
    	makeSubList.appendChild(imgLi);
    	var newImg = document.createElement('img');
    	var setSrc = newImg.setAttribute("src", "images/" + serviceType + ".gif");
    	imgLi.appendChild(newImg);
    	}
    }
// Edit a profile link	    
    function makeItemLinks(key, linksLi, linksLi_2) {
	    var editLink = document.createElement('a');
	    editLink.href = '#';
	    editLink.key = key;
	    editLink.setAttribute("class", "btn btn-primary");
	    var editText = "Edits Profile";
	    editLink.addEventListener("click", editItem);
	    editLink.innerHTML = editText;
	    linksLi.appendChild(editLink);
	    var breakTag = document.createElement('br');
	    linksLi.appendChild(breakTag);
// Delete a profile link
	    var deleteLink = document.createElement('a');
	    deleteLink.href = "#";
	    deleteLink.key = key;
	    deleteLink.setAttribute("class", "btn btn-danger");
	    var deleteText = "Clear Profile";
	    deleteLink.addEventListener("click", deleteItem);
	    deleteLink.innerHTML = deleteText;
	    linksLi.appendChild(deleteLink);
		var spaces = document.createElement('p');
		linksLi.appendChild(spaces);
	} // makeItemLinks function end
	
	function editItem() {
//Grab data from localStorage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
			
//Show form
		toggleControls("off");
		// Get elememts by Id
		gEl('yearList').value = item.year[1];
		gEl('miles').value = item.miles[1];
		gEl('make').value = item.make[1];
		gEl('model').value = item.model[1];
		gEl('serviceList').value = item.services[1];
		gEl('date').value = item.services[1];
			
// Loop that re-checks engine size radio button that user checked			
		var radios = document.forms[0].engineSize;
		for(var i = 0; i<radios.length; i++){
			if(radios[i].value == "4-cylinder" && item.engineSize[1] == "4-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "6-cylinder"  && item.engineSize[1] == "6-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "8-cylinder"  && item.engineSize[1] == "8-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "10-cylinder"  && item.engineSize[1] == "10-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "12-cylinder"  && item.engineSize[1] == "12-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} else if(radios[i].value == "16-cylinder"  && item.engineSize[1] == "16-cylinder"){
				radios[i].setAttribute("checked", "checked");
			} // Nested if else staements end
	} // radios function end
		
// Loop that re-checks engine booster radio button that user checked			
		var radio_2 = document.forms[0].HighPo;
		for(var i = 0; i<radio_2.length; i++){
			if(radio_2[i].value == "Supercharged" && item.HighPo[1] == "Supercharged"){
				radio_2[i].setAttribute("checked", "checked");
			} else if(radio_2[i].value == "Turbocharged"  && item.HighPo[1] == "Turbocharged"){
				radio_2[i].setAttribute("checked", "checked");
			} else if(radio_2[i].value == "Twin-Turbocharged"  && item.HighPo[1] == "Twin-Turbocharged"){
				radio_2[i].setAttribute("checked", "checked");
			} // Nested if else staements end
		} // radios_2 end	

// Set values to submit		
		gEl('warranty').value = item.warranty[1];
		gEl('date').value = item.date[1];
		gEl('notes').value = item.notes[1];
		gEl('date').value = item.date[1];
		gEl('warranty').value = item.warranty[1];
		gEl('notes').value = item.notes[1];
				
// Remove initial listener from save vehicle and store data
			saveData.removeEventListener("click", storeData);
// Change Submit Button Value to Edit Button
			gEl('submit').value = "Edit Profile";
			var eSubmit = gEl('submit');
//Save the key in this function to be used when user edits profile		
			eSubmit.addEventListener("click", validate);
			eSubmit.key = this.key;
		}

// Auto fill function if no data is in the browser's local storage		
	 function autoFillData() {
// Store JSON Object to localStorage.
	    for(var n in json) {
		  var id = Math.floor(Math.random()*1000001);
		  localStorage.setItem(id, JSON.stringify(json[n]));
	    }
    } 

// Validate inputs		
	function validate(d) {
// Define the elements that needs to be checked.
	    var gets_Year 	 = gEl('yearList');
	    var getMiles 	 = gEl('miles');
	    var getMake 	 = gEl('make');
	    var getModel 	 = gEl('model');
	    var get_Date 	 = gEl('date');
	    var gets_Service = gEl('serviceList');
		    
// Reset Error messages	
		errMsg.innerHTML = "";
		gets_Year.style.border = "1px solid black";
		getMiles.style.border = "1px solid black";
		getMake.style.border = "1px solid black";
		getModel.style.border = "1px solid black";
		gets_Service.style.border = "1px solid black";

		    						  
// Get error messages
		var messArry = [];
// Year validation			 
			if(gets_Year.value === "--Select Year--") {
				var yearError = "Please select a year.";
				gets_Year.style.border = "1px solid red";
				messArry.push(yearError);
			}
				
// Miles validation	
			if(getMiles.value === "") {
				var milesError = "Please enter Vehicle mileage.";
				getMiles.style.border = "1px solid red";
				messArry.push(milesError);
			} 
					 
// Make validation				
			if(getMake.value === "") {
				var makeError = "Please enter Vehicle make.";
				getMake.style.border = "1px solid red";
				messArry.push(makeError);
			}
					 
// Model validation				
			if(getModel.value === "") {
				var modelError = "Please enter Vehicle model.";
				getModel.style.border = "1px solid red";
				messArry.push(modelError);
			}
				
// Service type validation				
				
			if(gets_Service.value === "--Select Service--") {
				var servicesError = "Please enter Service type.";
				gets_Service.style.border = "1px solid red";
				messArry.push(servicesError);
			}
				
// If errors are present, they will display on the screen.				
			if(messArry.length >= 1) {
				for(var i = 0, j = messArry.length; i < j; i++) {
					var txt = document.createElement('li');
					txt.innerHTML = messArry[i];
					errMsg.appendChild(txt);
			}
			d.preventDefault();
			return false;	
		} else {
		// If all is correct, save all data. Send  key value from editData function
		// This key value is also passed through esubmit function event listener as a propety
		storeData(this.key);
		}
	}

// * Delete individual profile function * //		
	function deleteItem() {
		var ask = confirm("Are you sure you want to delete this profile?");
		if(ask) {
			localStorage.removeItem(this.key);
			alert("Profile has been deleted!!!");
			window.location.reload();
		} else {
			alert("Profile was Not deleted.");
		}
	}
	    
// * Erase Data Function * //
	function eraseData(){
        if(localStorage.length === 0){
            alert("No vehicle profiles were saved yet.")
        } else {
            localStorage.clear();
            alert("Your vehicle profile has been cleared.");
            window.location.reload();
            return false;
        }
    }

	    
// * Click event functions flor links below * //
    var saveData = gEl('submit');
    saveData.addEventListener("click", validate);
    var displayData = gEl('displayData');
    displayData.addEventListener("click", getData);
    var clearData = gEl('clearData');
    clearData.addEventListener("click", eraseData);	    	   	    
});