'use strict';

angular.module('sqwiggle-feed.system').controller('StatsController', ['$scope', '$interval', '$timeout', '$location', '$http', 
	function ($scope, $interval, $timeout, $location, $http) {
		$scope.users = [];
		$scope.room = [];
		$scope.allCharacters = 0;
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

		$scope.initialize = function() {
			//$scope.getAllMessages(0);
			$scope.probeMessages(1);
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

		$scope.probeMessages = function(page) {
			$scope.allMessages = [];
			$http.get('resources/api.php', {
				params: {
					endpoint: 'messages',
					page : page,
					limit: 100
				}
			}).success(function(e) {
				if(Array.isArray(e)) {
					if(e.length > 0) {
						$scope.probeMessages(page * 2);
					}
					else {
						$scope.getAllMessages(page);
					}
				}
			});
		}

		$scope.getAllMessages = function(pages) {
			// for all the pages that we probed, send a request
			for(var i = 0; i < pages; i++) {
				$scope.getMessagesForPage(i);
			}
		}

		$scope.getMessagesForPage = function(page) {
			$http.get('resources/api.php', {
				params: {
					endpoint: 'messages',
					page : page,
					limit: 100
				}
			}).success(function(e) {
				if(Array.isArray(e)) {
					if(e.length > 0) {
						$scope.allMessages = $scope.allMessages.concat(e);
						for(var key in e) {
							var message = e[key];
							$scope.allCharacters += $scope.countCharacters(message.text);
						}
					}
				}
			}).error(function(e){
				console.log('could not fetch messages...');
			});
		}

		$scope.countCharacters = function(message) {
			return message ? (message.length ? message.length : 0) : 0;
		}
}]);