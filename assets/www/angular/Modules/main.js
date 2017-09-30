window.mainApp = angular.module("mainApp", ['ngRoute'/*, 'ui.bootstrap'*/]);
window.mainApp
.filter('range', function() {
    return function(input, total) {
        total = parseInt(total);

        for (var i=0; i<total; i++) {
          input.push(i);
      }

      return input;
    };
})
.filter('sortBy', function(F_Sort){
    return function(items, search, searchType) {
        if(!items || items.length < 1) return [];
        if (!search) return items;
        var sort = F_Sort.sortBy(items, search, searchType);
        return sort;

    };
})
.run(['$rootScope', '$config', '$q', function($rootScope, $config, $q) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title? current.$$route.title : '';

        // create object base_component for base component angular.
        // ------------------------------------------------------------------------------
        if(!$rootScope.base_component){$rootScope.base_component = {} }
        if(!$rootScope.base_component.external_source){$rootScope.base_component.external_source = {} }
        if(current.$$route.external_source){
            $rootScope.base_component.external_source = $.extend($rootScope.base_component.external_source, current.$$route.external_source); 
        }
        // ------------------------------------------------------------------------------

    });
}])
.factory('global_configuration', function(){
    var config = {}
    config.namespace_sudo = 'sudo';
    config.namespace_admin = 'admin';
    config.namespace_public = 'public';
    return config;
});


window.mainApp.run(['$rootScope','$location','$q', function ($rootScope, $location, $q) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if(!next.$$route){ next.$$route = {resolve:{}} }
        if(!next.$$route.resolve){ next.$$route.resolve = {} }
        // when data configuration don't loaded yet.
        //////////////////////////////////////////////////////////////////////
        next.$$route.resolve.__configuration = function()
        {
            var defer       = $q.defer();

            var user = firebase.auth().currentUser;
            console.log(user)
            if (user) 
            {
                // User is signed in.
                if(next.$$route.originalPath == "/login")
                {
                    window.location.href = '#/'
                }
            } else {
                // No user is signed in.
                window.location.href = '#/login'
            }
            window.setTimeout(function(){
                defer.resolve(user); 
            },100)
            return defer.promise
        }
        
    });
}]);