'use strict';

var app = angular.
	module('scrawler', ['ngRoute']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'partials/imageLoader.html',
			controller: 'imageLoaderController'
		});
		$routeProvider.otherwise({
			redirectTo: '/'
		});
	}])
;

app.
	controller('imageLoaderController', ['$scope', 'EffectFactory', function($scope, EffectFactory) {
			$scope.effects = EffectFactory;
			$scope.selection = $scope.effects[0];
			$scope.options = {
				width: 64,
				height: 64,
				invert: false,
				levels: 2,
				crop: { x:0, y:0, w:64, h:64 }
			}
			$scope.preview = {
				file: null,
				update: function() {
					/**
					@see https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
					@see http://jsfiddle.net/influenztial/qy7h5/
					*/
					if ($scope.preview.file) {
						try {
							var img = new Image();
							img.onload = function() {
								var ctx = document.getElementById('imageCanvas').getContext('2d');
								ctx.drawImage(img, 0, 0, $scope.options.width, $scope.options.height);
								$scope.selection.process($scope, ctx);
								$scope.$apply();
							}
							img.src = $scope.preview.file;
						} catch (ex) {
							console.log(ex);
						}
					}
				}
			};
		}
	])
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
