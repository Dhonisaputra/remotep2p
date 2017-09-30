
window.mainApp.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/', {
		title: 'Dashboard',
		templateUrl: '/assets/www/templates/projects/index.html',
		controller: 'administrator_dashboard',
		using_sidebar: true,
		need_login: true
	})
	.when('/home', {
		title: 'Dashboard',
		templateUrl: '/assets/www/templates/classroom/dashboard/index.html',
		controller: 'administrator_dashboard',
		using_sidebar: true,
		need_login: true
	})
	
	.when('/login', {
		title: 'Dashboard',
		templateUrl: '/assets/www/templates/administrator/administrator.login.html',
		controller: 'users.login',
		using_sidebar: false,
		need_login: false
	})
	.when('/logout', {
		templateUrl: '/assets/www/templates/administrator/administrator.logout.html',
		controller: 'users.logout',
		need_login: true
	})
	.otherwise('/error/404');
	/*.otherwise({
		redirectTo: function(){
			var cookies = Cookies.getJSON('user');
			if(cookies)
			{
				return (cookies.app_auth)? '/dashboard/post' : '/login'
			}else
			{
				return '/error/404'
			}
			
		}
	});*/
	// $locationProvider.html5Mode(true);
});

