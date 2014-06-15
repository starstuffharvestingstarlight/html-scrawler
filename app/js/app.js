'use strict';

// TODO: clean up and use data binding properly
var imageLoader = {
	init: function(fileInputId, canvasId) {
		if (!this.ctx) {
			document.
				getElementById(fileInputId).
				addEventListener('change', this.handler, false);
			this.canvas = document.
				getElementById(canvasId);
			this.ctx = this.canvas.getContext('2d');
		}
	},
	handler: function(e) {
		/**
		@see https://stackoverflow.com/questions/10906734/how-to-upload-image-into-html5-canvas
		@see http://jsfiddle.net/influenztial/qy7h5/
		*/
		try {
			var reader = new FileReader();
			reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
					imageLoader.ctx.drawImage(img, 0, 0, imageLoader.canvas.width, imageLoader.canvas.height);
				}
				img.src = event.target.result;
			}
			reader.readAsDataURL(e.target.files[0]);
		} catch (ex) { }
	}
};

angular.
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
	}]).
	controller('imageLoaderController', ['$scope', function($scope) {
		imageLoader.init('imageLoader', 'imageCanvas');
		console.log('loader');
	}]).
	controller('textRendererController', ['$scope', function($scope) {
		console.log('FIXME');
	}])
;
