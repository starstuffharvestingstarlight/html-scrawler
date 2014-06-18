'use strict';

var app = angular.
	module('scrawler', ['ngRoute']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/load', {
			templateUrl: 'partials/imageLoader.html',
			controller: 'imageLoaderController'
		});
		$routeProvider.when('/render', {
			templateUrl: 'partials/textRenderer.html', 
			controller: 'textRendererController'
		});
		$routeProvider.otherwise({
			redirectTo: '/load'
		});
	}])
;

app.
	controller('imageLoaderController', ['$scope', function($scope) {
		$scope.preview = {
			file: null,
			width: 100,
			height: 100,
			update: function() {
				/**
				@see https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
				@see http://jsfiddle.net/influenztial/qy7h5/
				*/
				if ($scope.preview.file) {
					try {
						var img = new Image();
						img.onload = function() {
							document.
							getElementById('imageCanvas').
							getContext('2d').
							drawImage(img, 0, 0, $scope.preview.width, $scope.preview.height);
						}
						img.src = $scope.preview.file;
					} catch (ex) {
						console.log(ex);
					}
				}
			}
		};
	}])
;

app.
	controller('textRendererController', ['$scope', function($scope) {
		console.log('FIXME');
	}])
;

// @see https://stackoverflow.com/questions/17063000/ng-model-for-input-type-file
app.
	directive('fileread', [function() {
		return {
			scope: {
				fileread: '='
			},
			link: function (scope, element, attributes) {
				element.bind('change', function (changeEvent) {
					var reader = new FileReader();
					reader.onload = function (loadEvent) {
						scope.$parent.preview.file = loadEvent.target.result;
						scope.$parent.preview.update();
					};
					reader.readAsDataURL(changeEvent.target.files[0]);
				});
			}
		}
	}])
;
