var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIn0.eyJhdWQiOiIxMCIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIiwiaWF0IjoxNTA3NTc1ODMyLCJuYmYiOjE1MDc1NzU4MzIsImV4cCI6MTgyMzEwODYzMiwic3ViIjoiODMwIiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.72BpPk1xEDafdhKsLKJLcE3pHx2otZrA2JIl2jcTMq8W0ZxAIb8H5bX9jt4Jby77iqIWOrwbNO6X01fYCBB18yRZuU9bC_C3AF41aCPpkGUOcz7wCsypBlMoFnH3qj5HIKVOEb0JcgVaqlkqBK4UCXR9XFejiAbhXQOMuDJGP8HGF304w1R-N6bm2qwUl1DthmnH0bEPgFV8edH9Ndt-b-M0IWYdlqslpiD-gwV_1hB2EzaCDbGcxhAYTFp_tD_ck9jK_5aGln6zQoCc_iq4uH6muJExam22ThWLqRuzf5_cl8DVhu76p6FbmS4denEfod3C6C7odh9dR8onud1UG1TzgsZeONrsu-jcgv8qs-Q2Pkarv1_ahvILq3Q6YJWxEPq8bK4p6SyU1PaH_mWbzpFMfnaCnyQAV0vnDAxPL8W9nr7_WPbuOrE7GXj1oXjrYZlxXR20brWuU0efhg7dnIkI_vRVhDIyd6U9ssgJLa3_PvfFdYNEYRLc3EWtWmKNi8TvDfUE8y_rM_nm8qb8teuFx_5-PGxF1whN6iULNyRQojJlYXES3EQSgJjC6oKXsFeu-tEGIkDMq8Jn1Z291HUV313u5R3ErCBL7Rv0rK5fzNJuSNCi4yFEDk79d9VL3i8qmFOMHJabWB8UQ3_0zjAbLrAZuWIO9Jomg6vOr6Y';
var myId = 830;
var client = new INTITAClient({key : API_KEY});

client.getUserDetails(myId, function(error, data) 
{
	console.log(data);

  var mySFname = data.secondName + " " + data.firstName;
  document.getElementById('mySFname')  .innerHTML = mySFname;

  var trainer = data.trainers["0"].firstName + " " + data.trainers["0"].secondName + "<br>" + data.trainers["0"].email;
  document.getElementById('trName')  .innerHTML = trainer;

  var address = data.country + ", " + data.city + ", " + data.address;
  document.getElementById('address')  .innerHTML = address;

  document.getElementById('avatar').src=data.avatar;
  document.getElementById('email').innerHTML=data.email;
  document.getElementById('phone').innerHTML=data.phone;
  document.getElementById('skype').innerHTML=data.skype;
  document.getElementById('education').innerHTML=data.education;
  document.getElementById('aboutMy').innerHTML=data.aboutMy;
  document.getElementById('interests').innerHTML=data.interests;
  document.getElementById('facebook').href=data.facebook;
  document.getElementById('googleplus').href=data.googleplus;
  document.getElementById('linkedin').href=data.linkedin;
  document.getElementById('twitter').href=data.twitter;
});

client.getUserCoursesAndModules(myId, function (error, data)
{
  data.courses.forEach(function(element)
  {
  	var mainListUl = document.createElement('ul');
  	mainListUl.className = "nav nav-tabs";
  	mainListUl.id = "mList";
  	
  	var mainCourseLi = document.createElement('li');
  	mainCourseLi.className = "nav-item dropdown";

		var courseNameA = document.createElement('a');
		courseNameA.className = "nav-link dropdown-toggle";
		courseNameA.id = "cName";

		var courseNameInnerText = document.createElement('text');
		courseNameInnerText.innerText = element.title;

		var modNamesListDiv = document.createElement('div');
		modNamesListDiv.className = "dropdown-menu";

    client.getCourseModules(element.id, function(error, data)
    {
      var containerFluideLecturesListDiv = document.createElement('div');
      containerFluideLecturesListDiv.className = "container-fluide";

      var containerLecturesListDiv = document.createElement('div');
      containerLecturesListDiv.className = "container";

      var lecturesListDiv = document.createElement('div');
      lecturesListDiv.className = "tab-content";

      data.map(function(module)
      {
    		var modNamesA = document.createElement('a');
    		modNamesA.className = "dropdown-item";
    		modNamesA.id = module.id + "modNames";
    		
    		var modNamesText = document.createElement('text');
    		modNamesText.innerText = module.title;

    		modNamesA.appendChild(modNamesText);
    		modNamesListDiv.appendChild(modNamesA);

        client.getModuleLectures(module.id, function(error, data)
        {
          var moduleLecturesDiv = document.createElement('div');
          moduleLecturesDiv.className = "tab-pane fade";
        	moduleLecturesDiv.id = module.id + "moduleLectures";

          var moduleLecturesUl = document.createElement('ul');
          moduleLecturesUl.innerText = module.title + ":";

          data.map(function(lecture)
          {
            var lectTitleText = document.createElement('li');
            lectTitleText.innerText = lecture.title;
            moduleLecturesUl.appendChild(lectTitleText);
            return lectTitleText;
          });

          moduleLecturesDiv.appendChild(moduleLecturesUl);
        	lecturesListDiv.appendChild(moduleLecturesDiv);
          containerLecturesListDiv.appendChild(lecturesListDiv);
          containerFluideLecturesListDiv.appendChild(containerLecturesListDiv);

          console.log('cource modules lectures', module.id, module.title, data);
	      });
        var y = document.getElementById(modNamesA.id); 
        y.setAttribute("role", "tab");
        y.setAttribute("data-toggle", "tab");
        y.setAttribute("href", "#" + module.id + "moduleLectures");
	      
	      return modNamesA;
	    });
      document.body.appendChild(containerFluideLecturesListDiv);

	    console.log('cource modules', data);
	  });

    courseNameA.appendChild(courseNameInnerText);
    mainCourseLi.appendChild(modNamesListDiv);
    mainCourseLi.appendChild(courseNameA);
    mainListUl.appendChild(mainCourseLi);

    var containerFluideMainListUl = document.createElement('div');
    containerFluideMainListUl.className = "container-fluide";

    var containerMainListUl = document.createElement('div');
    containerMainListUl.className = "container";

    containerMainListUl.appendChild(mainListUl);
    containerFluideMainListUl.appendChild(containerMainListUl);

    document.body.appendChild(containerFluideMainListUl);
    

	  console.log('cources', element.id, element.title);
  });
  console.log(data);

  document.getElementById("mList").setAttribute("role", "tablist");

  var cName = document.getElementById("cName");
	cName.setAttribute("data-toggle", "dropdown");
	cName.setAttribute("role", "button");
	cName.setAttribute("href", "#");
	cName.setAttribute("aria-haspopup", "true");
	cName.setAttribute("aria-expanded", "false");
});