app.
	factory('EffectFactory', ['$sce', function($sce) {
		return [
			{
				process: function (ctx) {
					w = ctx.canvas.width
					h = ctx.canvas.height
					inData = ctx.getImageData(0,0,w,h)
					outctx = document.getElementById('debugCanvas').getContext('2d')
					outctx.putImageData(inData, 0, 0)
					outData = outctx.getImageData(0,0,w,h)
					/** async
					P = new Pixastic(outctx, 'lib/vendor/pixastic/')
					P.posterize({levels: 4}).done(function() {})
					*/
					Pixastic.Effects.posterize(inData.data, outData.data, w, h, {levels: 2})
					Pixastic.Effects.desaturate(outData.data, outData.data, w, h)
					outctx.putImageData(outData, 0, 0)
					console.log(outData.data)

					// TODO: replace with distinct b/w values
					blocks = {
						255: '█',
						227: '▓',
						76:  '▒',
						0:   '░',
					}
					str = ''
					for (var i = 0, n = w * h * 4, c = 0; i < n; i+=4, c++) {
						str += blocks[outData.data[i]] || ' '
						if (c % w == w-1) str += '\n'
					}
					this.result = $sce.trustAsHtml('<pre style="font-size:.5em">' + str + '</pre>');
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
