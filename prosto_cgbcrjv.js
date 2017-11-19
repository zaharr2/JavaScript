var API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIn0.eyJhdWQiOiIxMCIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIiwiaWF0IjoxNTA3NTc1ODMyLCJuYmYiOjE1MDc1NzU4MzIsImV4cCI6MTgyMzEwODYzMiwic3ViIjoiODMwIiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.72BpPk1xEDafdhKsLKJLcE3pHx2otZrA2JIl2jcTMq8W0ZxAIb8H5bX9jt4Jby77iqIWOrwbNO6X01fYCBB18yRZuU9bC_C3AF41aCPpkGUOcz7wCsypBlMoFnH3qj5HIKVOEb0JcgVaqlkqBK4UCXR9XFejiAbhXQOMuDJGP8HGF304w1R-N6bm2qwUl1DthmnH0bEPgFV8edH9Ndt-b-M0IWYdlqslpiD-gwV_1hB2EzaCDbGcxhAYTFp_tD_ck9jK_5aGln6zQoCc_iq4uH6muJExam22ThWLqRuzf5_cl8DVhu76p6FbmS4denEfod3C6C7odh9dR8onud1UG1TzgsZeONrsu-jcgv8qs-Q2Pkarv1_ahvILq3Q6YJWxEPq8bK4p6SyU1PaH_mWbzpFMfnaCnyQAV0vnDAxPL8W9nr7_WPbuOrE7GXj1oXjrYZlxXR20brWuU0efhg7dnIkI_vRVhDIyd6U9ssgJLa3_PvfFdYNEYRLc3EWtWmKNi8TvDfUE8y_rM_nm8qb8teuFx_5-PGxF1whN6iULNyRQojJlYXES3EQSgJjC6oKXsFeu-tEGIkDMq8Jn1Z291HUV313u5R3ErCBL7Rv0rK5fzNJuSNCi4yFEDk79d9VL3i8qmFOMHJabWB8UQ3_0zjAbLrAZuWIO9Jomg6vOr6Y';
var myId = 830;
var client = new INTITAClient({key : API_KEY,});

client.getUserDetails(myId, function(error, data)
{
	console.log(data);

	var mySFname = data.secondName + " " + data.firstName;
	document.getElementById('mySFname')  .innerHTML = mySFname;

	var trainer = data.trainers["0"].firstName + " " + data.trainers["0"].secondName + "<br>" + data.trainers["0"].email;
	document.getElementById('trName')  .innerHTML = trainer;

	var address = data.country + ", " + data.city + ", " + data.address;
	document.getElementById('address')  .innerHTML = address;

	document.getElementById('avatar')       .src=data.avatar;
	document.getElementById('email')        .innerHTML=data.email;
	document.getElementById('phone')        .innerHTML=data.phone;
	document.getElementById('skype')        .innerHTML=data.skype;
	document.getElementById('education')    .innerHTML=data.education;
	document.getElementById('aboutMy')      .innerHTML=data.aboutMy;
	document.getElementById('interests')    .innerHTML=data.interests;
	document.getElementById('facebook')     .href=data.facebook;
	document.getElementById('googleplus')   .href=data.googleplus;
	document.getElementById('linkedin')     .href=data.linkedin;
	document.getElementById('twitter')      .href=data.twitter;
});

client.getUserCoursesAndModules(myId, function (error, data)
{
  data.courses.forEach(function(element)
  {
  	var mainCourse = document.createElement('ul');
  	mainCourse.innerText = element.title;
    var id = element.id;
    client.getCourseModules(id, function(error, data)
    {
      var div = document.createElement('ul');
      data.map(function(module)
      {
        var el = document.createElement('ul');
        var modId = module.id;
        var modTitle = module.title;
        client.getModuleLectures(modId, function(error, data)
        {
          data.map(function(lecture)
          {
            var lectTitle = document.createElement('ul');
            lectTitle.innerText = lecture.title;
            el.appendChild(lectTitle);
            return lectTitle;
          });
          console.log('cource modules lectures', modId, modTitle, data);
	      });
	      el.innerText = module.title;
	      div.appendChild(el);
	      return el;
	    });
	    mainCourse.appendChild(div);
	    console.log('cource modules', data);
	  });
	  document.body.appendChild(mainCourse);
	  console.log('cources', element.id, element.title);
  });
  console.log(data);
});

//client.getUserCoursesAndModules(my_id, function (error, data)
//{
//  	console.log(error, data.courses[0])
//  	client.getCourseInfo(data.courses[0].id, function (error, data){console.log(error, data)});
//    client.getCourseTags(data.courses[0].id, function (error, data){console.log(error, data)});                 // TODO:
//	client.getCourseModules(data.courses[0].id, function (error, data)
//	{
//		console.log(error, data);
//		for(var i = 0; i < data.length; i++)
//			client.getModuleInfo(data[i].id, function (error, data)
//				{
//					console.log(error, data);
//				    client.getModuleLectures(data.module_ID, function (error, data){console.log(error, data);});
//                    client.getModuleTags(data.module_ID, function (error, data){console.log(error, data)});     // TODO:
//				});
//	});
//});