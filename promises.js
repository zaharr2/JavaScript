let API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIn0.eyJhdWQiOiIxMCIsImp0aSI6IjVlNzkzNTYxMWIwMmI2YTNjNTkxOWRiZTcxZjNlOWIwNTk2NzRlNTM0YmMxOGMyNzRlMzA4OTAwM2IzYmYwOTkyNjE2YmQ5NzliYTYyY2NkIiwiaWF0IjoxNTA3NTc1ODMyLCJuYmYiOjE1MDc1NzU4MzIsImV4cCI6MTgyMzEwODYzMiwic3ViIjoiODMwIiwic2NvcGVzIjpbInVzZXJCYXNlSW5mbyIsInVzZXJEZXRhaWxlZEluZm8iLCJ1c2VyQ291cnNlSW5mbyJdfQ.72BpPk1xEDafdhKsLKJLcE3pHx2otZrA2JIl2jcTMq8W0ZxAIb8H5bX9jt4Jby77iqIWOrwbNO6X01fYCBB18yRZuU9bC_C3AF41aCPpkGUOcz7wCsypBlMoFnH3qj5HIKVOEb0JcgVaqlkqBK4UCXR9XFejiAbhXQOMuDJGP8HGF304w1R-N6bm2qwUl1DthmnH0bEPgFV8edH9Ndt-b-M0IWYdlqslpiD-gwV_1hB2EzaCDbGcxhAYTFp_tD_ck9jK_5aGln6zQoCc_iq4uH6muJExam22ThWLqRuzf5_cl8DVhu76p6FbmS4denEfod3C6C7odh9dR8onud1UG1TzgsZeONrsu-jcgv8qs-Q2Pkarv1_ahvILq3Q6YJWxEPq8bK4p6SyU1PaH_mWbzpFMfnaCnyQAV0vnDAxPL8W9nr7_WPbuOrE7GXj1oXjrYZlxXR20brWuU0efhg7dnIkI_vRVhDIyd6U9ssgJLa3_PvfFdYNEYRLc3EWtWmKNi8TvDfUE8y_rM_nm8qb8teuFx_5-PGxF1whN6iULNyRQojJlYXES3EQSgJjC6oKXsFeu-tEGIkDMq8Jn1Z291HUV313u5R3ErCBL7Rv0rK5fzNJuSNCi4yFEDk79d9VL3i8qmFOMHJabWB8UQ3_0zjAbLrAZuWIO9Jomg6vOr6Y';
let myId = 830;
let client = new INTITAClient({key : API_KEY});

client.getUserDetails(myId)

.then(data => {
	return console.log(data.data);
	})

.catch(error => {
	return console.log(error);
	});

client.getUserCoursesAndModules(myId)

.then(data => {
	console.log("Курсы:");
	console.log(data.data.courses[0]);
	return client.getCourseModules(data.data.courses[0].id);
	})

.then(data => {
	console.log("Модули:");
	console.log(data.data);
	return Promise.all(data.data.map(module => {
		return client.getModuleLectures(module.id);
		})
	)})

.then(data => {
	console.log("Лекции:");
	for(let tmp in data)
		console.log(data[tmp].data);
	})

.catch(error => {
	return console.log(error);
	});
