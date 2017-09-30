window.mainApp
.controller('administrator_dashboard', function($scope) {	
	get_project();
	function new_project(name)
	{
		  return firebase.database().ref('projects/' + window.firebase.auth().currentUser.uid).push({
		  	name: name,
		  })
	}

	function get_project()
	{
		return firebase.database().ref('projects/' + window.firebase.auth().currentUser.uid)
		.on('value', function(projects) {
			$scope.project_list = projects.val();
			$scope.$apply()
		});
	}
	$scope.new_project = function()
	{
		new_project($scope.project_name);
		$scope.project_name = "";
		get_project();
	}
})
.controller('users.login', function($scope, $location){
	$scope.login = function()
	{
		var provider = new firebase.auth.GoogleAuthProvider();
		firebase.auth().signInWithPopup(provider).then(function(result) {
		  // This gives you a Google Access Token. You can use it to access the Google API.
		  var token = result.credential.accessToken;
		  // The signed-in user info.
		  var user = result.user;
		  // ...
	  		window.location.href= '#/'

		}).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // The email of the user's account used.
		  var email = error.email;
		  // The firebase.auth.AuthCredential type that was used.
		  var credential = error.credential;
		  // ...
		});
	}

	$scope.login_account = function()
	{
		firebase.auth().signInWithEmailAndPassword($scope.email, $scope.password)
		.then(function(){
	  		window.location.href= '#/'
		})
		.catch(function(error) {
		 
		});
	}
})
.controller('users.logout', function($scope, $location){
    firebase.auth().signOut().then(function() {
	  // Sign-out successful.
  		window.location.href= '#/login'
	}).catch(function(error) {
	  // An error happened.
  		window.location.href= '#/'
	});
});



