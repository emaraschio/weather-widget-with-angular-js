(function() {
    var app = angular.module('weatherWidget', []);
    app.controller('ForecastController', function($scope, $http) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var key = 'YOUR_WUNDERGROUND_APIKEY'; //Please see http://www.wunderground.com/
                var service_url = "http://api.wunderground.com/api/" + key + "/forecast/geolookup/conditions/q/" + position.coords.latitude + "," + position.coords
                    .longitude + ".json?callback=JSON_CALLBACK";
                $http.jsonp(service_url).success(function(data) {
                    $scope.city = data.location.city;
                    $scope.temperature = data.current_observation.temp_c;
                    $scope.description = data.current_observation.weather;
                    $scope.wind_condition = data.current_observation.wind_string;
                    $scope.weather_icon_src = data.current_observation.icon_url;
                });
            }, function() {
                alert("That's weird! We couldn't find you!");
            });
        } else {
            alert('Geolocation is not supported');
        }
    });
})();
