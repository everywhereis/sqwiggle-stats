'use strict';

angular.module('sqwiggle-feed.system').controller('StatsController', ['$scope', '$interval', '$timeout', '$location', '$http', 
	function ($scope, $interval, $timeout, $location, $http) {
    	console.log('we should put code here...');
		$scope.users = [];
		$scope.room = [];
		$scope.data = {
			series: [''],
			data : [{
				x : "Monday",
				y: [10],
				tooltip:"this is tooltip"
			},
			{
				x : "Tuesday",
				y: [12]
			},
			{
				x : "wednesday",
				y: [2]
			},
			{
				x : "Thursday",
				y: [15]
			},
			{
				x : "Friday",
				y: [4]
			},
			{
				x : "Saturday",
				y: [7]
			},
			{
				x : "Sunday",
				y: [3]
			}]     
		}
		$scope.chartType = 'line';
		$scope.config = {
		  "labels": false,
		  "title": "",
		  "legend": {
			"display": false,
			"position": "right"
		  }
		}
		
		
		
		
		$scope.getUsers = function() {
			$http.get('resources/api.php', {
				params: {
					endpoint: 'users'
				}
			}).success(function(e) {
				$scope.users = e;
			}).error(function(e){
				console.log('could not fetch users...');
			});
		}
		$scope.getRooms = function() {
			$http.get('resources/api.php', {
				params: {
					endpoint: 'rooms',
				}, 
			}).success(function(rooms) {
				if(Object.prototype.toString.call(rooms) === '[object Array]') {
					$scope.room = rooms.length > 0 ? rooms.pop() : null;
				}
			}).error(function(e){
				console.log('could not fetch rooms...');
			});
		}
		$scope.getMessages = function() {
			$http.get('resources/api.php', {
				params: {
					endpoint: 'messages'
				}
			}).success(function(e) {
				$scope.users = e;
			}).error(function(e){
				console.log('could not fetch messages...');
			});
		}
	
		
		
}]);