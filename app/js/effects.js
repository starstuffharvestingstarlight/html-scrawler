app.
	factory('EffectFactory', ['$sce', function($sce) {
		return [
			{
				name: 'utf8 blocks',
				process: function (scope, ctx) {
					w = scope.options.crop.w
					h = scope.options.crop.h

					inData = ctx.getImageData(
						scope.options.crop.x, scope.options.crop.y, 
						w, h
					)
					outctx = document.getElementById('debugCanvas').getContext('2d')
					outctx.putImageData(inData, 0, 0)
					outData = outctx.getImageData(0,0,w,h)
					/** async
					P = new Pixastic(outctx, 'lib/vendor/pixastic/')
					P.posterize({levels: 4}).done(function() {})
					*/
					outData.data = inData.data
					if (scope.options.invert)
						Pixastic.Effects.invert(outData.data, outData.data, w, h)
					Pixastic.Effects.posterize(outData.data, outData.data, w, h, {levels: scope.options.levels})
					Pixastic.Effects.desaturate(outData.data, outData.data, w, h)
					outctx.putImageData(outData, 0, 0)

					// TODO: replace with distinct b/w values
					blocks = [ '█', '▓', '▒', '░' ]
					str = ''
					for (var i = 0, n = w * h * 4, c = 0; i < n; i+=4, c++) {
						str += blocks[Math.round((outData.data[i] || 0) / (255/3))]
						if (c % w == w-1) str += '\n'
					}
					this.result = $sce.trustAsHtml('<pre style="font-size:.5em">' + str + '</pre>');
				}
			},
			{
				name: 'html divs',
				process: function (scope, ctx) {
					this.result = $sce.trustAsHtml('<strong>Placeholder for effect 2</strong>');
				}
			},
		];
	}])
;
