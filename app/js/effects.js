app.
	factory('EffectFactory', ['$sce', function($sce) {
		return [
			{
				process: function (ctx) {
					this.result = $sce.trustAsHtml('<em>Placeholder for effect 1</em>');
				}
			},
			{
				process: function (ctx) {
					this.result = $sce.trustAsHtml('<strong>Placeholder for effect 2</strong>');
				}
			},
		];
	}])
;
