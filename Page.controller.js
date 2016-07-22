


$(window).load(function() {
 // executes when complete page is fully loaded, including all frames, objects and images
 console.log("window is loaded");
 init();
});


var places;


	var oa;
	var da;
	var f,t;
	 var oEntryList;
	var x;
	var table;
		var countlol=0;
		var oModel = new sap.ui.model.json.JSONModel();
	var jsonArray = {

	}
		var EmployeesCounter = 0;

			var odata = {
					root:{

					}
			};

			$(document).keydown(function(evt){
			   if (evt.keyCode==13){
			       evt.preventDefault();
			      ini();
						//onSemanticButtonPress();
			   }
			});
var index;
	var directionsService = new google.maps.DirectionsService();
	var num, map, data;
	var requestArray = [], renderArray = [];
	var colourArray = ['#FF0000', '#1B1BB3', 'fuchsia', 'black', '#003432', 'lime', '#CD0074', '#6A0AAB', '#1E796A', '#FF7400', '#14D100', '#0D8800', '#A66F00', '#33CCCC', '#FFD300', 'teal'];



	function init() {


			// Some basic map setup (from the API docs)
			var mapOptions = {
					center: new google.maps.LatLng( 20.5937, 78.9629),
					zoom: 5,
					mapTypeControl: false,
					streetViewControl: false,
					mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			map = new google.maps.Map(document.getElementById("__xmlview0--map"), mapOptions);

			// Start the request making
	//		generateRequests();
	}

	function ini() {

	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	var map = new google.maps.Map(document.getElementById('__xmlview0--map'), {
	zoom: -1,
	center: {lat: 20.5937, lng: 78.9629}
	});
	directionsDisplay.setMap(map);
	cal(directionsService, directionsDisplay);

		console.log("voom2");
	}

	function cal(directionsService, directionsDisplay) {

						 f =oa.getValue();
						t = da.getValue();
						index="Person "+countlol;

						jsonArray[index]=[];
						jsonArray[index].push(f);
						jsonArray[index].push(t);


						countlol++;

						var directionsService = new google.maps.DirectionsService;
						var directionsDisplay = new google.maps.DirectionsRenderer;
init();
generateRequests();
	console.log("voom3");
	directionsService.route({
	origin: 	oa.getValue(),

	destination: 	 da.getValue(),

	optimizeWaypoints: true,
	travelMode: google.maps.TravelMode.DRIVING
	}, function(response, status) {

	if (status === google.maps.DirectionsStatus.OK) {
	//directionsDisplay.setDirections(response);
	var route = response.routes[0];
	console.log("voom4");


	var td=0;

	var f =oa.getValue();
	var t = da.getValue();
//	console.log("lol"+f+t);

	for (var i = 0; i < route.legs.length; i++) {
	//	console.log(route.legs.length);



		var routeSegment = i + 1;
//    summaryPanel.innerHTML += '<div> <b>Route Segment: ' + routeSegment +        '</b><br>';
	//  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
	//  summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
	//  summaryPanel.innerHTML += route.legs[i].distance.text + '<br>';

		var  str1 = route.legs[i].distance.text.replace ( /[^\d.]/g, '' );
		td += parseInt(str1)
	//  summaryPanel.innerHTML += "Total Distance : "+td+'km <br><br> </div>';
	//	console.log(td);
		var j;
		for(j=0;j<EmployeesCounter;j++){
		//	console.log("loopj"+j);
		//	console.log("loope"+EmployeesCounter);
			if(EmployeesCounter>0 && !jQuery.isEmptyObject(odata.root[j]) && odata.root[j]["from"]==f && odata.root[j]["to"]==t){
				odata.root[j]["distance"]=td;
				odata.root[j][count]={};

				if(!jQuery.isEmptyObject(odata.root[j]["distance"]))
				odata.root[j]["distance"]=td;

				odata.root[j][count]["from"]= route.legs[i].start_address;
				odata.root[j][count]["to"]=route.legs[i].end_address;
				odata.root[j][count]["fromto"]= f+"-"+t;
				odata.root[j][count]["distance"]=route.legs[i].distance.text;
				j=0;
				count++;
				break;
		}


	}

//	console.log("j"+j);
//	console.log("e"+EmployeesCounter);
	if(j==EmployeesCounter){
		count=0;
		odata.root[EmployeesCounter]={};
		odata.root[EmployeesCounter]["from"]=f;
		odata.root[EmployeesCounter]["to"]=t;
		odata.root[EmployeesCounter]["fromto"]= f+"-"+t;

		odata.root[EmployeesCounter]["distance"]=route.legs[i].distance.text;

		if($( "input:checked" ).length > 0){

			odata.root[EmployeesCounter][count]={};
			odata.root[EmployeesCounter][count]["from"]= route.legs[i].start_address;
			odata.root[EmployeesCounter][count]["to"]=route.legs[i].end_address;
			odata.root[EmployeesCounter][count]["fromto"]= f+"-"+t;

			odata.root[EmployeesCounter][count]["distance"]=route.legs[i].distance.text;

			count++;
		}

	}


													EmployeesCounter++;

														oModel.setData(odata);
											console.log(oModel.getData());
													//alert("Data added successfully");



	}
}
	else {
	window.alert('Directions request failed due to ' + status);
	}
	});


	}



















	function generateRequests(){

			requestArray = [];
			console.log(jsonArray);
			for (var route in jsonArray){
					// This now deals with one of the people / routes

					// Somewhere to store the wayoints
					var waypts = [];

					// 'start' and 'finish' will be the routes origin and destination
					var start, finish

					// lastpoint is used to ensure that duplicate waypoints are stripped
					var lastpoint

					data = jsonArray[route]

					var limit = data.length
					for (var waypoint = 0; waypoint < limit; waypoint++) {
							if (data[waypoint] === lastpoint){
									// Duplicate of of the last waypoint - don't bother
									continue;
							}

							// Prepare the lastpoint for the next loop
							lastpoint = data[waypoint]

							// Add this to waypoint to the array for making the request
							waypts.push({
									location: data[waypoint],
									stopover: true
							});
					}

					// Grab the first waypoint for the 'start' location
					start = (waypts.shift()).location;
					// Grab the last waypoint for use as a 'finish' location
					finish = waypts.pop();
					if(finish === undefined){
							// Unless there was no finish location for some reason?
							finish = start;
					} else {
							finish = finish.location;
					}

					// Let's create the Google Maps request object
					var request = {
							origin: start,
							destination: finish,
							waypoints: waypts,
							travelMode: google.maps.TravelMode.DRIVING
					};

					// and save it in our requestArray
					requestArray.push({"route": route, "request": request});
					console.log(requestArray);
			}

			processRequests();
	}

	function processRequests(){

			// Counter to track request submission and process one at a time;
			var i = 0;

			// Used to submit the request 'i'
			function submitRequest(){
					directionsService.route(requestArray[i].request, directionResults);
			}

			// Used as callback for the above request for current 'i'
			function directionResults(result, status) {
					if (status == google.maps.DirectionsStatus.OK) {

							// Create a unique DirectionsRenderer 'i'
							renderArray[i] = new google.maps.DirectionsRenderer();
							renderArray[i].setMap(map);

							// Some unique options from the colorArray so we can see the routes
							renderArray[i].setOptions({
									preserveViewport: true,
									suppressInfoWindows: true,
									polylineOptions: {
											strokeWeight: 4,
											strokeOpacity: 0.8,
											strokeColor: colourArray[i]
									},
									markerOptions:{
											icon:{
													path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
													scale: 3,
													strokeColor: colourArray[i]
											}
									}
							});

							// Use this new renderer with the result
							renderArray[i].setDirections(result);
							// and start the next request
							nextRequest();
					}

			}

			function nextRequest(){
					// Increase the counter
					i++;
					// Make sure we are still waiting for a request
					if(i >= requestArray.length){
							// No more to do
							return;
					}
					// Submit another request
					submitRequest();
			}

			// This request is just to kick start the whole process
			submitRequest();
	}

	// Called Onload


	// Get the ball rolling and trigger our init() on 'load'


function calculateAndDisplayRoute(directionsService, directionsDisplay) {
											var waypts = [];
											var checkboxArray = document.getElementById('waypoints');
											 $("input:checked").each(function() {
											waypts.push({
											location:  $(this).next("label").text().split(' ').join('%20'),
											stopover: true
											});
											});
											//console.log(waypts);

											directionsService.route({
												origin: oa.getValue(),
												destination: da.getValue(),
												waypoints: waypts,
												optimizeWaypoints: true,
												travelMode: google.maps.TravelMode[document.getElementById("__box0-inner").value]
											}, function(response, status) {

												if (status === google.maps.DirectionsStatus.OK) {
													directionsDisplay.setDirections(response);
													var route = response.routes[0];
												//  var summaryPanel = document.getElementById('directions-panel');
												//  summaryPanel.innerHTML = '';
													// For each route, display summary information.
													var td=0;

													var f =oa.getValue();
													var t = da.getValue();
												//	console.log("lol"+f+t);
													var i = "";
													var cval = $("input:checked").map(function() {
														return $(this).next("label").text().split(' ').join('%20');
														}).get();

													var tmp="";
													for (var i = 0; i < route.legs.length; i++) {
													//	console.log(route.legs.length);



														var routeSegment = i + 1;
												//    summaryPanel.innerHTML += '<div> <b>Route Segment: ' + routeSegment +        '</b><br>';
													//  summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
													//  summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
													//  summaryPanel.innerHTML += route.legs[i].distance.text + '<br>';

														var  str1 = route.legs[i].distance.text.replace ( /[^\d.]/g, '' );
														td += parseInt(str1)
													//  summaryPanel.innerHTML += "Total Distance : "+td+'km <br><br> </div>';
													//	console.log(td);
														var j;
														for(j=0;j<EmployeesCounter;j++){
														//	console.log("loopj"+j);
														//	console.log("loope"+EmployeesCounter);
															if(EmployeesCounter>0 && !jQuery.isEmptyObject(odata.root[j]) && odata.root[j]["from"]==f && odata.root[j]["to"]==t){
																odata.root[j]["distance"]=td;
																odata.root[j][count]={};

																if(!jQuery.isEmptyObject(odata.root[j]["distance"]))
																odata.root[j]["distance"]=td;

																odata.root[j][count]["from"]= route.legs[i].start_address;
																odata.root[j][count]["to"]=route.legs[i].end_address;
																odata.root[j][count]["fromto"]= f+"-"+t;

																odata.root[j][count]["distance"]=route.legs[i].distance.text;
																j=0;
																count++;
																break;
														}


													}

												//	console.log("j"+j);
												//	console.log("e"+EmployeesCounter);
													if(j==EmployeesCounter){
														count=0;
														odata.root[EmployeesCounter]={};
														odata.root[EmployeesCounter]["from"]=f;
														odata.root[EmployeesCounter]["to"]=t;
														odata.root[EmployeesCounter]["fromto"]= f+"-"+t;

														odata.root[EmployeesCounter]["distance"]=route.legs[i].distance.text;

														if($( "input:checked" ).length > 0){

															odata.root[EmployeesCounter][count]={};
															odata.root[EmployeesCounter][count]["from"]= route.legs[i].start_address;
															odata.root[EmployeesCounter][count]["to"]=route.legs[i].end_address;
															odata.root[EmployeesCounter][count]["fromto"]= f+"-"+t;

															odata.root[EmployeesCounter][count]["distance"]=route.legs[i].distance.text;

															count++;
														}

													}


																									EmployeesCounter++;

																								//	console.log(oModel.getData());
																									//alert("Data added successfully");
													}
												} else {
													window.alert('Directions request failed due to ' + status);
												}
											});


										}

sap.ui.define([
		'jquery.sap.global',
		'sap/ui/core/mvc/Controller',
		'sap/ui/model/json/JSONModel',
		'sap/ui/model/Filter',
		'sap/ui/model/FilterOperator',
		'sap/m/TabContainer',
		'sap/m/TabContainerItem',
		'sap/m/MessagePage',
		'sap/m/MessageBox',
		'sap/m/MessagePopover',
		'sap/m/MessagePopoverItem'
	], function(jQuery, Controller, JSONModel, Filter, FilterOperator, TabContainer, TabContainerItem, MessagePage, MessageBox, MessagePopover, MessagePopoverItem) {
	"use strict";

	var PageController = Controller.extend("sap.m.sample.SemanticPage.Page", {


	onInit: function () {

		this.input = new sap.m.Input();
    this.input.attachChange(function(){sap.m.MessageBox.alert("Text changed");});

			google.maps.event.addDomListener(window, 'load', init);
			var oModel = new JSONModel(odata);
			this.getView().setModel(oModel);

			oa=this.byId("origin");
			da=this.byId("dest");

		var oMessageProcessor = new sap.ui.core.message.ControlMessageProcessor();
		var oMessageManager = sap.ui.getCore().getMessageManager();

		oMessageManager.registerMessageProcessor(oMessageProcessor);

		oMessageManager.addMessages(
				new sap.ui.core.message.Message({
					message: "Something wrong happened",
					type: sap.ui.core.MessageType.Error,
					processor: oMessageProcessor
				})
		);
	},

	onPress: function (oEvent) {


		sap.m.MessageToast.show("Pressed custom button " + oEvent.getSource().getId());
	},

	onSemanticButtonPress: function (oEvent) {

		var sAction = oEvent.getSource().getMetadata().getName();
		//console.log(sAction);
		sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");
	//	console.log(sAction);
		if(sAction=="semantic.PositiveAction"){
		sap.m.MessageToast.show("Pressed: " + sAction);
		ini();


		oModel.setData(odata);
  	this.getView().setModel(oModel);

	}
	},

	onSearch : function (oEvt) {
var searchValue = oEvt.getSource().getValue();
var filters = [ new sap.ui.model.Filter("from", sap.ui.model.FilterOperator.Contains, searchValue),
                new sap.ui.model.Filter("to", sap.ui.model.FilterOperator.Contains, searchValue),
							  new sap.ui.model.Filter("fromto", sap.ui.model.FilterOperator.Contains, searchValue)
						  ];
var oFilter = new sap.ui.model.Filter( filters, false ); //False means it will apply an OR logic, if you want AND pass true
//Get binding of component and apply it, let's suppose it's a List
this.getView().byId("tab").getBinding("items").filter(oFilter); //



	},

			lol: function (oEvent) {



				 table = this.getView().byId("tab");
				 table.onsapenter = function(e) { console.log("lol"); }
				var rowItems = table.getSelectedItems();

				var f =rowItems[0].mAggregations.cells[0].getProperty("text");
				var t = rowItems[0].mAggregations.cells[1].getProperty("text");
				console.log("voom");
			var directionsService = new google.maps.DirectionsService;
			var directionsDisplay = new google.maps.DirectionsRenderer;
			var map = new google.maps.Map(document.getElementById('__xmlview0--map'), {
			zoom: -1,
			center: {lat: 20.5937, lng: 78.9629}
			});
			directionsDisplay.setMap(map);


		directionsService.route({
		origin: 	f,

		destination: 	t,

		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING
		}, function(response, status) {

		if (status === google.maps.DirectionsStatus.OK) {
		directionsDisplay.setDirections(response);
		//var route = response.routes[0];
		console.log("voom4");
		}
		}
		);




			},

			haha: function(oEvent){
				var availableTags = ["Mumbai","Delhi","Bengaluru","Ahmedabad","Hyderabad","Chennai",  "Kolkata",  "Pune","Jaipur","Surat","Lucknow",  "Kanpur",  "Nagpur","Patna","Indore",  "Thane","Bhopal",  "Visakhapatnam",  "Vadodara","Firozabad",  "Ludhiana","Rajkot","Agra",  "Siliguri",  "Nashik","Faridabad","Patiala","Meerut",  "Kalyan-Dombivali","Vasai-Virar","Varanasi",  "Srinagar",  "Dhanbad","Jodhpur","Amritsar","Raipur","Allahabad",  "Coimbatore",  "Jabalpur",  "Gwalior",  "Vijayawada",  "Madurai",  "Guwahati","Chandigarh","Hubli-Dharwad","Amroha",  "Moradabad",  "Gurgaon","Aligarh",  "Solapur","Ranchi","Jalandhar","Tiruchirappalli",  "Bhubaneswar","Salem",  "Warangal","Mira-Bhayandar","Thiruvananthapuram","Bhiwandi","Saharanpur",  "Guntur",  "Amravati","Bikaner","Noida",  "Jamshedpur","Bhilai Nagar","Cuttack","Kochi","Udaipur","Bhavnagar","Dehradun","Asansol",  "Nanded-Waghala","Ajmer","Jamnagar","Ujjain",  "Sangli","Loni",  "Jhansi",  "Pondicherry","Nellore",  "Jammu",  "Belagavi","Raurkela","Mangaluru","Tirunelveli",  "Malegaon","Gaya","Tiruppur",  "Davanagere","Kozhikode","Akola","Kurnool",  "Bokaro Steel City","Rajahmundry",  "Ballari","Agartala","Bhagalpur","Latur","Dhule","Korba","Bhilwara","Brahmapur","Mysore","Muzaffarpur","Ahmednagar","Kollam","Raghunathganj",  "Bilaspur","Shahjahanpur",  "Thrissur","Alwar","Kakinada",  "Nizamabad","Sagar",  "Tumkur","Hisar","Rohtak","Panipat","Darbhanga","Kharagpur",  "Aizawl","Ichalkaranji","Tirupati",  "Karnal","Bathinda","Rampur",  "Shivamogga","Ratlam",  "Modinagar",  "Durg","Shillong","Imphal","Hapur",  "Ranipet",  "Anantapur",  "Arrah","Karimnagar","Parbhani","Etawah",  "Bharatpur","Begusarai","New Delhi","Chhapra","Kadapa",  "Ramagundam","Pali","Satna",  "Vizianagaram",  "Katihar","Hardwar","Sonipat","Nagercoil",  "Thanjavur",  "Murwara (Katni)",  "Naihati",  "Sambhal",  "Nadiad","Yamunanagar","English Bazar",  "Eluru",  "Munger","Panchkula","Raayachuru","Panvel","Deoghar","Ongole",  "Nandyal",  "Morena",  "Bhiwani","Porbandar","Palakkad","Anand","Purnia","Baharampur",  "Barmer","Morvi","Orai",  "Bahraich",  "Sikar","Vellore",  "Singrauli",  "Khammam","Mahesana","Silchar","Sambalpur","Rewa",  "Unnao",  "Hugli-Chinsurah",  "Raiganj",  "Phusro","Adityapur","Alappuzha","Bahadurgarh","Machilipatnam",  "Rae Bareli",  "Jalpaiguri",  "Bharuch","Pathankot","Hoshiarpur","Baramula",  "Adoni",  "Jind","Tonk","Tenali",  "Kancheepuram",  "Vapi","Sirsa","Navsari","Mahbubnagar","Puri","Robertson Pet","Erode",  "Batala","Haldwani-cum-Kathgodam","Vidisha",  "Saharsa","Thanesar","Chittoor",  "Veraval","Lakhimpur",  "Sitapur",  "Hindupur",  "Santipur",  "Balurghat",  "Ganjbasoda",  "Moga","Proddatur",  "Srinagar","Medinipur",  "Habra",  "Sasaram","Hajipur","Bhuj","Shivpuri",  "Ranaghat",  "Shimla",  "Tiruvannamalai",  "Kaithal","Rajnandgaon","Godhra","Hazaribag","Bhimavaram",  "Mandsaur",  "Dibrugarh","Kolar","Bankura",  "Mandya","Dehri-on-Sone","Madanapalle",  "Malerkotla","Lalitpur",  "Bettiah","Pollachi",  "Khanna","Neemuch",  "Palwal","Palanpur","Guntakal",  "Nabadwip",  "Udupi","Jagdalpur","Motihari","Pilibhit",  "Dimapur","Mohali","Sadulpur","Rajapalayam",  "Dharmavaram",  "Kashipur","Sivakasi",  "Darjiling",  "Chikkamagaluru","Gudivada",  "Baleshwar Town","Mancherial","Srikakulam",  "Adilabad","Yavatmal","Barnala","Nagaon","Narasaraopet",  "Raigarh","Roorkee","Valsad","Ambikapur","Giridih","Chandausi",  "Purulia",  "Patan","Bagaha","Hardoi ",  "Achalpur","Osmanabad","Deesa","Nandurbar","Azamgarh",  "Ramgarh","Firozpur","Baripada Town","Karwar","Siwan","Rajampet",  "Pudukkottai",  "Anantnag",  "Tadpatri",  "Satara","Bhadrak","Kishanganj","Suryapet","Wardha","Ranebennuru","Amreli","Neyveli (TS)",  "Jamalpur","Marmagao","Udgir","Tadepalligudem",  "Nagapattinam",  "Buxar","Aurangabad","Jehanabad","Phagwara","Khair",  "Sawai Madhopur","Kapurthala","Chilakaluripet",  "Aurangabad","Malappuram","Rewari","Nagaur","Sultanpur",  "Nagda",  "Port Blair",  "Lakhisarai","Panaji","Tinsukia","Itarsi",  "Kohima","Balangir","Nawada","Jharsuguda","Jagtial","Viluppuram",  "Amalner","Zirakpur","Tanda",  "Tiruchengode",  "Nagina",  "Yemmiganur",  "Vaniyambadi",  "Sarni",  "Theni Allinagaram",  "Margao","Akot","Sehore",  "Mhow Cantonment",  "Kot Kapura","Makrana","Pandharpur","Miryalaguda","Shamli",  "Seoni",  "Ranibennur","Kadiri",  "Shrirampur","Rudrapur","Parli","Najibabad",  "Nirmal","Udhagamandalam",  "Shikohabad",  "Jhumri Tilaiya","Aruppukkottai",  "Ponnani","Jamui","Sitamarhi","Chirala",  "Anjar","Karaikal","Hansi","Anakapalle",  "Mahasamund","Faridkot","Saunda","Dhoraji","Paramakudi",  "Balaghat",  "Sujangarh","Khambhat","Muktsar","Rajpura","Kavali",  "Dhamtari","Ashok Nagar",  "Sardarshahar","Mahuva","Bargarh","Kamareddy","Sahibganj","Kothagudem","Ramanagaram","Gokak","Tikamgarh",  "Araria","Rishikesh","Shahdol",  "Medininagar (Daltonganj)","Arakkonam",  "Washim","Sangrur","Bodhan","Fazilka","Palacole",  "Keshod","Sullurpeta",  "Wadhwan","Gurdaspur","Vatakara","Tura","Narnaul","Kharar","Yadgir","Ambejogai","Ankleshwar","Savarkundla","Paradip","Virudhachalam",  "Kanhangad","Kadi","Srivilliputhur",  "Gobindgarh","Tindivanam",  "Mansa","Taliparamba","Manmad","Tanuku",  "Rayachoti",  "Virudhunagar",  "Koyilandy","Jorhat","Karur",  "Valparai",  "Srikalahasti",  "Neyyattinkara","Bapatla",  "Fatehabad","Malout","Sankarankovil",  "Tenkasi",  "Ratnagiri","Rabkavi Banhatti","Sikandrabad",  "Chaibasa","Chirmiri","Palwancha","Bhawanipatna","Kayamkulam","Pithampur",  "Nabha","Shahabad, Hardoi",  "Dhenkanal","Uran Islampur","Gopalganj","Bongaigaon City","Palani",  "Pusad","Sopore",  "Pilkhuwa",  "Tarn Taran","Renukoot",  "Mandamarri","Shahabad","Barbil","Koratla","Madhubani","Arambagh",  "Gohana","Ladnu","Pattukkottai",  "Sirsi","Sircilla","Tamluk",  "Jagraon","AlipurdUrban Agglomerationr",  "Alirajpur",  "Tandur","Naidupet",  "Tirupathur",  "Tohana","Ratangarh","Dhubri","Masaurhi","Visnagar","Vrindavan",  "Nokha","Nagari",  "Narwana","Ramanathapuram",  "Ujhani",  "Samastipur","Laharpur",  "Sangamner","Nimbahera","Siddipet","Suri",  "Diphu","Jhargram",  "Shirpur-Warwade","Tilhar",  "Sindhnur","Udumalaipettai",  "Malkapur","Wanaparthy","Gudur",  "Kendujhar","Mandla",  "Mandi",  "Nedumangad","North Lakhimpur","Vinukonda",  "Tiptur","Gobichettipalayam",  "Sunabeda","Wani","Upleta","Narasapuram",  "Nuzvid",  "Tezpur","Una","Markapur",  "Sheopur",  "Thiruvarur",  "Sidhpur","Sahaswan",  "Suratgarh","Shajapur",  "Rayagada","Lonavla","Ponnur",  "Kagaznagar","Gadwal","Bhatapara","Kandukur",  "Sangareddy","Unjha","Lunglei","Karimganj","Kannur","Bobbili",  "Mokameh","Talegaon Dabhade","Anjangaon","Mangrol","Sunam","Gangarampur",  "Thiruvallur",  "Tirur","Rath",  "Jatani","Viramgam","Rajsamand","Yanam","Kottayam","Panruti",  "Dhuri","Namakkal",  "Kasaragod","Modasa","Rayadurg",  "Supaul","Kunnamkulam","Umred","Bellampalle","Sibsagar","Mandi Dabwali","Ottappalam","Dumraon","Samalkot",  "Jaggaiahpet",  "Goalpara","Tuni",  "Lachhmangarh","Bhongir","Amalapuram",  "Firozpur Cantt.","Vikarabad","Thiruvalla","Sherkot",  "Palghar","Shegaon","Jangaon","Bheemunipatnam",  "Panna",  "Thodupuzha","KathUrban Agglomeration",  "Palitana","Arwal","Venkatagiri",  "Kalpi",  "Rajgarh (Churu)","Sattenapalle",  "Arsikere","Ozar","Thirumangalam",  "Petlad","Nasirabad","Phaltan","Rampurhat",  "Nanjangud","Forbesganj","Tundla",  "BhabUrban Agglomeration","Sagara","Pithapuram",  "Sira","Bhadrachalam","Charkhi Dadri","Chatra","Palasa Kasibugga",  "Nohar","Yevla","Sirhind Fatehgarh Sahib","Bhainsa","Parvathipuram",  "Shahade","Chalakudy","Narkatiaganj","Kapadvanj","Macherla",  "Raghogarh-Vijaypur",  "Rupnagar","Naugachhia","Sendhwa",  "Byasanagar","Sandila",  "Gooty",  "Salur",  "Nanpara",  "Sardhana",  "Vita","Gumia","Puttur","Jalandhar Cantt.","Nehtaur",  "Changanassery","Mandapeta",  "Dumka","Seohara",  "Umarkhed","Madhupur","Vikramasingapuram",  "Punalur","Kendrapara","Sihor","Nellikuppam",  "Samana","Warora","Nilambur","Rasipuram",  "Ramnagar","Jammalamadugu",  "Nawanshahr","Thoubal","Athni","Cherthala","Sidhi",  "Farooqnagar","Peddapuram",  "Chirkunda","Pachora","Madhepura","Pithoragarh","Tumsar","Phalodi","Tiruttani",  "Rampura Phul","Perinthalmanna","Padrauna",  "Pipariya",  "Dalli-Rajhara","Punganur",  "Mattannur","Mathura",  "Thakurdwara",  "Nandivaram-Guduvancheri",  "Mulbagal","Manjlegaon","Wankaner","Sillod","Nidadavole",  "Surapura","Rajagangapur","Sheikhpura","Parlakhemundi","Kalimpong",  "Siruguppa","Arvi","Limbdi","Barpeta","Manglaur","Repalle",  "Mudhol","Shujalpur",  "Mandvi","Thangadh","Sironj",  "Nandura","Shoranur","Nathdwara","Periyakulam",  "Sultanganj","Medak","Narayanpet","Raxaul Bazar","Rajauri",  "Pernampattu",  "Nainital","Ramachandrapuram",  "Vaijapur","Nangal","Sidlaghatta","Punch",  "Pandhurna",  "Wadgaon Road","Talcher","Varkala","Pilani","Nowgong",  "Naila Janjgir","Mapusa","Vellakoil",  "Merta City","Sivaganga",  "Mandideep",  "Sailu","Vyara","Kovvur",  "Vadalur",  "Nawabganj",  "Padra","Sainthia",  "Siana",  "Shahpur","Sojat","Noorpur",  "Paravoor","Murtijapur","Ramnagar","Sundargarh","Taki",  "Saundatti-Yellamma","Pathanamthitta","Wadi","Rameshwaram",  "Tasgaon","Sikandra Rao",  "Sihora",  "Tiruvethipuram",  "Tiruvuru",  "Mehkar","Peringathur","Perambalur",  "Manvi","Zunheboto","Mahnar Bazar","Attingal","Shahbad","Puranpur",  "Nelamangala","Nakodar","Lunawada","Murshidabad",  "Mahe","Lanka","Rudauli",  "Tuensang","Lakshmeshwar","Zira","Yawal","Thana Bhawan",  "Ramdurg","Pulgaon","Sadasivpet","Nargund","Neem-Ka-Thana","Memari",  "Nilanga","Naharlagun",  "Pakaur","Wai","Tarikere","Malavalli","Raisen",  "Lahar",  "Uravakonda",  "Savanur","Sirohi","Udhampur",  "Umarga","Pratapgarh","Lingsugur","Usilampatti",  "Palia Kalan",  "Wokha","Rajpipla","Vijayapura","Rawatbhata","Sangaria","Paithan","Rahuri","Patti","Zaidpur",  "Lalsot","Maihar",  "Vedaranyam",  "Nawapur","Solan",  "Vapi","Sanawad",  "Warisaliganj","Revelganj","Sabalgarh",  "Tuljapur","Simdega","Musabani","Kodungallur","Phulabani","Umreth","Narsipatnam",  "Nautanwa",  "Rajgir","Yellandu","Sathyamangalam",  "Pilibanga","Morshi","Pehowa","Sonepur","Pappinisseri","Zamania",  "Mihijam","Purna","Puliyankudi",  "Shikarpur, Bulandshahr",  "Umaria",  "Porsa",  "Naugawan Sadat",  "Fatehpur Sikri",  "Manuguru","Udaipur","Pipar City","Pattamundai","Nanjikottai",  "Taranagar","Yerraguntla",  "Satana","Sherghati","Sankeshwara","Madikeri","Thuraiyur",  "Sanand","Rajula","Kyathampalle","Shahabad, Rampur",  "Tilda Newra","Narsinghgarh",  "Chittur-Thathamangalam","Malaj Khand",  "Sarangpur",  "Robertsganj",  "Sirkali",  "Radhanpur","Tiruchendur",  "Utraula",  "Patratu","Vijainagar, Ajmer","Periyasemur",  "Pathri","Sadabad",  "Talikota","Sinnar","Mungeli","Sedam","Shikaripur","Sumerpur","Sattur",  "Sugauli","Lumding","Vandavasi",  "Titlagarh","Uchgaon","Mokokchung","Paschim Punropara",  "Sagwara","Ramganj Mandi","Tarakeswar",  "Mahalingapura","Dharmanagar","Mahemdabad","Manendragarh","Uran","Tharamangalam",  "Tirukkoyilur",  "Pen","Makhdumpur","Maner","Oddanchatram",  "Palladam",  "Mundi",  "Nabarangapur","Mudalagi","Samalkha","Nepanagar",  "Karjat","Ranavav","Pedana",  "Pinjore","Lakheri","Pasan",  "Puttur",  "Vadakkuvalliyur",  "Tirukalukundram",  "Mahidpur",  "Mussoorie","Muvattupuzha","Rasra",  "Udaipurwati","Manwath","Adoor","Uthamapalayam",  "Partur","Nahan",  "Ladwa","Mankachar","Nongstoin","Losal","Sri Madhopur","Ramngarh","Mavelikkara","Rawatsar","Rajakhera","Lar",  "Lal Gopalganj Nindaura",  "Muddebihal","Sirsaganj",  "Shahpura","Surandai",  "Sangole","Pavagada","Tharad","Mansa","Umbergaon","Mavoor","Nalbari","Talaja","Malur","Mangrulpir","Soro","Shahpura","Vadnagar","Raisinghnagar","Sindhagi","Sanduru","Sohna","Manavadar","Pihani",  "Safidon","Risod","Rosera","Sankari",  "Malpura","Sonamukhi",  "Shamsabad, Agra",  "Nokha","PandUrban Agglomeration",  "Mainaguri",  "Afzalpur","Shirur","Salaya","Shenkottai",  "Pratapgarh","Vadipatti",  "Nagarkurnool","Savner","Sasvad","Rudrapur",  "Soron",  "Sholingur",  "Pandharkaoda","Perumbavoor","Maddur","Nadbai","Talode","Shrigonda","Madhugiri","Tekkalakote","Seoni-Malwa",  "Shirdi","SUrban Agglomerationr",  "Terdal","Raver","Tirupathur",  "Taraori","Mukhed","Manachanallur",  "Rehli",  "Sanchore","Rajura","Piro","Mudabidri","Vadgaon Kasba","Nagar","Vijapur","Viswanatham",  "Polur",  "Panagudi",  "Manawar",  "Tehri","Samdhan",  "Pardi","Rahatgarh",  "Panagar",  "Uthiramerur",  "Tirora","Rangia","Sahjanwa",  "Wara Seoni",  "Magadi","Rajgarh (Alwar)","Rafiganj","Tarana",  "Rampur Maniharan",  "Sheoganj","Raikot","Pauri","Sumerpur",  "Navalgund","Shahganj",  "Marhaura","Tulsipur",  "Sadri","Thiruthuraipoondi",  "Shiggaon","Pallapatti",  "Mahendragarh","Sausar",  "Ponneri",  "Mahad","Lohardaga","Tirwaganj",  "Margherita","Sundarnagar",  "Rajgarh",  "Mangaldoi","Renigunta",  "Longowal","Ratia","Lalgudi",  "Shrirangapattana","Niwari",  "Natham",  "Unnamalaikadai",  "PurqUrban Agglomerationzi",  "Shamsabad, Farrukhabad",  "Mirganj","Todaraisingh","Warhapur",  "Rajam",  "Urmar Tanda","Lonar","Powayan",  "P.N.Patti",  "Palampur",  "Srisailam Project (Right Flank Colony) Township",  "Sindagi","Sandi",  "Vaikom","Malda",  "Tharangambadi",  "Sakaleshapura","Lalganj","Malkangiri","Rapar","Mauganj",  "Todabhim","Srinivaspur","Murliganj","Reengus","Sawantwadi","Tittakudi",  "Lilong","Rajaldesar","Pathardi","Achhnera",  "Pacode",  "Naraura",  "Nakur",  "Palai","Morinda, India","Manasa",  "Nainpur",  "Sahaspur",  "Pauni","Prithvipur",  "Ramtek","Silapathar","Songadh","Safipur",  "Sohagpur",  "Mul","Sadulshahar","Phillaur","Sambhar","Prantij","Nagla","Pattran","Mount Abu","Reoti",  "Tenu dam-cum-Kathhara","Panchla",  "Sitarganj","Pasighat",  "Motipur","O' Valley",  "Raghunathpur",  "Suriyampalayam",  "Qadian","Rairangpur","Silvassa",  "Nowrozabad (Khodargama)",  "Mangrol","Soyagaon","Sujanpur","Manihari","Sikanderpur",  "Mangalvedhe","Phulera","Ron","Sholavandan",  "Saidpur",  "Shamgarh",  "Thammampatti",  "Maharajpur",  "Multai",  "Mukerian","Sirsi",  "Purwa",  "Sheohar","Namagiripettai",  "Parasi",  "Lathi","Lalganj",  "Narkhed","Mathabhanga",  "Shendurjana","Peravurani",  "Mariani","Phulpur",  "Rania","Pali",  "Pachore",  "Parangipettai",  "Pudupattinam",  "Panniyannur","Maharajganj","Rau",  "Monoharpur",  "Mandawa","Marigaon","Pallikonda",  "Pindwara","Shishgarh",  "Patur","Mayang Imphal","Mhowgaon",  "Guruvayoor","Mhaswad","Sahawar",  "Sivagiri",  "Mundargi","Punjaipugalur",  "Kailasahar","Samthar",  "Sakti","Sadalagi","Silao","Mandalgarh","Loha","Pukhrayan",  "Padmanabhapuram",  "Belonia","Saiha","Srirampore",  "Talwara","Puthuppally","Khowai","Vijaypur",  "Takhatgarh","Thirupuvanam",  "Adra",  "Piriyapatna","Obra",  "Adalaj","Nandgaon","Barh","Chhapra","Panamattom","Niwai",  "Bageshwar","Tarbha","Adyar","Narsinghgarh",  "Warud","Asarganj","Sarsod"];
    		$( "#__xmlview0--origin-inner" ).autocomplete({
      source: availableTags
    });
		$( "#__xmlview0--dest-inner" ).autocomplete({
	source: availableTags
});

			},

			handleSelectionChange: function(oEvent) {
				var changedItem = oEvent.getParameter("changedItem");
				var isSelected = oEvent.getParameter("selected");

				var state = "Selected";
				if (!isSelected) {
					state = "Deselected"
				}

				MessageToast.show("Event 'selectionChange': " + state + " '" + changedItem.getText() + "'", {
					width: "auto"
				});
			},

			handleSelectionFinish: function(oEvent) {
				selectedItems = oEvent.getParameter("selectedItems");
				var messageText = "Event 'selectionFinished': [";

				for (var i = 0; i < selectedItems.length; i++) {
					messageText += "'" + selectedItems[i].getText() + "'";
					if (i != selectedItems.length-1) {
						messageText += ",";
					}
				}

				messageText += "]";

				MessageToast.show(messageText, {
					width: "auto"
				});
				console.log(messageText);
			},

	onSemanticSelectChange: function (oEvent, oData) {
		var sAction = oEvent.getSource().getMetadata().getName();
		sAction = sAction.replace(oEvent.getSource().getMetadata().getLibraryName() + ".", "");

		var sStatusText = sAction + " by " + oEvent.getSource().getSelectedItem().getText();
		sap.m.MessageToast.show("Selected: " + sStatusText);
		console.log("fads");	},
	onPositionChange: function (oEvent) {
		sap.m.MessageToast.show("Positioned changed to " + oEvent.getParameter("newPosition"));
	},
	onMessagesButtonPress: function(oEvent) {

		var oMessagesButton = oEvent.getSource();
		if (!this._messagePopover) {
			this._messagePopover = new MessagePopover({
				items: {
					path: "message>/",
					template: new MessagePopoverItem({
						description: "{message>description}",
						type: "{message>type}",
						title: "{message>message}"
					})
				}
			});
			oMessagesButton.addDependent(this._messagePopover);
		}
		this._messagePopover.toggle(oMessagesButton);
	},
	onMultiSelectPress: function(oEvent) {
		if (oEvent.getSource().getPressed()) {
			sap.m.MessageToast.show("MultiSelect Pressed");
		} else {
			sap.m.MessageToast.show("MultiSelect Unpressed");
		};
	}
});


	return PageController;

});
