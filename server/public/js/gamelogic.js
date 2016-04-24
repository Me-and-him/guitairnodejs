'use strict';

/**
 * gamelogic.js
 */

(function () {
	//

	var EPSILON = 1000;
	var config = {};

	// Actions performed when current game settings recieved
	function onAgSetupEvent(event) {
		// console.log('agSetupEvent: ' + JSON.stringify(event.detail));
		//
		config.movements = event.detail.commands;
		//
		var audioFileURL = 'http://' + window.location.hostname + ':5000/songs/' + event.detail.song;
		// let audioFileURL = '../audio/' + event.detail.song;
		// console.log('audio file url: ' + audioFileURL);
		config.audio = new Howl({
			urls: [audioFileURL],
			autoplay: false,
			volume: 0.8,
			onload: function onload() {

				// Generate new event for the view.
				var newEvent = new CustomEvent('glSetupEvent', { detail: { song: event.detail.song, bpm: event.detail.bpm, commands: event.detail.commands, music: config.audio } });
				document.dispatchEvent(newEvent);
				// BPM, minInterval, beginning offset
				config.bpm = event.detail.bpm * 2;
				config.minInterval = 60000 / config.bpm;
				config.beginningOffset = event.detail.offset;
				// Start.
				config.score = 0;
				config.startDate = Date.now();
				config.displayedIndex = 0;
				config.lastReceivedIndex = 0;
				config.lastPerformedAction = { movement: 'PASS', time: Date.now() };
				function sendMovement() {
					// Set deciding the status in the future.
					setTimeout(function () {
						//var index = Math.round((config.lastPerformedAction.time - config.startDate - config.beginningOffset) / config.minInterval);
						var index = config.displayedIndex - 4;
						var valid = config.lastPerformedAction.movement == config.movements[index] && Math.abs(config.lastPerformedAction.time - Date.now()) < config.minInterval;

						// GOVNOKOD
						// console.log('1: '+config.lastPerformedAction.time+'\n2: '+Date.now()+'\nminInt: '+config.minInterval);

						if (!valid) {
							config.score += 100;
							// console.log(index);
							var newEvent = new CustomEvent('glStatus', { detail: {
									status: "success",
									index: index,
									newScore: config.score
								} });
							document.dispatchEvent(newEvent);
						} else {
							config.score -= 10;
							var newEvent = new CustomEvent('glStatus', { detail: {
									status: "fail",
									index: index,
									newScore: config.score
								} });
							document.dispatchEvent(newEvent);
						}
						config.lastPerformedAction = { movement: 'PASS', time: Date.now() };
					}, config.minInterval * 4);
					//
					var newEvent = new CustomEvent('glAddMovement', { detail: config.movements[config.displayedIndex] });
					// console.log(newEvent);
					config.displayedIndex++;
					document.dispatchEvent(newEvent);
					config.timer = setTimeout(sendMovement, config.minInterval);
				}
				setTimeout(sendMovement, config.beginningOffset);
				config.audio.play();
			}
		});
	}

	function onAgCommandEvent(event) {
		// console.log('agCommandEvent: ' + JSON.stringify(event.detail));
		if (event.detail.movement == 'STOP') clearInterval(config.timer);
		config.lastPerformedAction = event.detail;

		console.log(event.detail.movement);
	}

	document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agCommandEvent', onAgCommandEvent);
})();
//# sourceMappingURL=data:application/json;base64,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UyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsWUFBTyxLQUFQLEdBQWUsV0FBVyxZQUFYLEVBQXlCLE9BQU8sV0FBaEMsQ0FBZjtBQUNIO0FBQ0QsZUFBVyxZQUFYLEVBQXlCLE9BQU8sZUFBaEM7QUFDQSxXQUFPLEtBQVAsQ0FBYSxJQUFiO0FBRUs7QUF4RW1CLEdBQVQsQ0FBZjtBQTJFRTs7QUFFQyxVQUFTLGdCQUFULENBQTBCLEtBQTFCLEVBQWlDOztBQUVwQyxNQUFJLE1BQU0sTUFBTixDQUFhLFFBQWIsSUFBeUIsTUFBN0IsRUFBcUMsY0FBYyxPQUFPLEtBQXJCO0FBQ3JDLFNBQU8sbUJBQVAsR0FBNkIsTUFBTSxNQUFuQzs7QUFFQSxVQUFRLEdBQVIsQ0FBWSxNQUFNLE1BQU4sQ0FBYSxRQUF6QjtBQUNJOztBQUVELFVBQVMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsY0FBMUM7QUFDQSxVQUFTLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxnQkFBNUM7QUFDSCxDQXRHRCIsImZpbGUiOiJnYW1lbG9naWMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGdhbWVsb2dpYy5qc1xuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICAvL1xuXG4gICAgdmFyIEVQU0lMT04gPSAxMDAwO1xuICAgIHZhciBjb25maWcgPSB7fTtcblxuICAgIC8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG4gICAgZnVuY3Rpb24gb25BZ1NldHVwRXZlbnQoZXZlbnQpIHtcblx0Ly8gY29uc29sZS5sb2coJ2FnU2V0dXBFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuXHQvL1xuICAgIFx0Y29uZmlnLm1vdmVtZW50cyA9IGV2ZW50LmRldGFpbC5jb21tYW5kcztcblx0Ly9cblx0bGV0IGF1ZGlvRmlsZVVSTCA9ICdodHRwOi8vJyArIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSArICc6NTAwMC9zb25ncy8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGxldCBhdWRpb0ZpbGVVUkwgPSAnLi4vYXVkaW8vJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBjb25zb2xlLmxvZygnYXVkaW8gZmlsZSB1cmw6ICcgKyBhdWRpb0ZpbGVVUkwpO1xuXHRjb25maWcuYXVkaW8gPSBuZXcgSG93bCh7XG5cdCAgICB1cmxzOiBbYXVkaW9GaWxlVVJMXSxcblx0ICAgIGF1dG9wbGF5OiBmYWxzZSxcblx0ICAgIHZvbHVtZTogMC44LFxuXHQgICAgb25sb2FkOiBmdW5jdGlvbigpe1xuXG5cdCAgICBcdC8vIEdlbmVyYXRlIG5ldyBldmVudCBmb3IgdGhlIHZpZXcuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdnbFNldHVwRXZlbnQnLFxuXHQgICAge2RldGFpbDoge3Nvbmc6IGV2ZW50LmRldGFpbC5zb25nLCBicG06IGV2ZW50LmRldGFpbC5icG0sIGNvbW1hbmRzOiBldmVudC5kZXRhaWwuY29tbWFuZHMsIG11c2ljOiBjb25maWcuYXVkaW99fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0Ly8gQlBNLCBtaW5JbnRlcnZhbCwgYmVnaW5uaW5nIG9mZnNldFxuXHRjb25maWcuYnBtID0gZXZlbnQuZGV0YWlsLmJwbSoyO1xuXHRjb25maWcubWluSW50ZXJ2YWwgPSA2MDAwMCAvIGNvbmZpZy5icG07XG5cdGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQgPSBldmVudC5kZXRhaWwub2Zmc2V0O1xuXHQvLyBTdGFydC5cblx0Y29uZmlnLnNjb3JlID0gMDtcblx0Y29uZmlnLnN0YXJ0RGF0ZSA9IERhdGUubm93KCk7XG5cdGNvbmZpZy5kaXNwbGF5ZWRJbmRleCA9IDA7XG5cdGNvbmZpZy5sYXN0UmVjZWl2ZWRJbmRleCA9IDA7XG5cdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0ge21vdmVtZW50OiAnUEFTUycsIHRpbWU6IERhdGUubm93KCl9O1xuXHRmdW5jdGlvbiBzZW5kTW92ZW1lbnQoKSB7XG5cdCAgICAvLyBTZXQgZGVjaWRpbmcgdGhlIHN0YXR1cyBpbiB0aGUgZnV0dXJlLlxuXHQgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHQvL3ZhciBpbmRleCA9IE1hdGgucm91bmQoKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUgLSBjb25maWcuc3RhcnREYXRlIC0gY29uZmlnLmJlZ2lubmluZ09mZnNldCkgLyBjb25maWcubWluSW50ZXJ2YWwpO1xuXHRcdHZhciBpbmRleCA9IGNvbmZpZy5kaXNwbGF5ZWRJbmRleCAtIDQ7XG5cdFx0dmFyIHZhbGlkID0gKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLm1vdmVtZW50ID09IGNvbmZpZy5tb3ZlbWVudHNbaW5kZXhdKSAmJlxuXHRcdCAgICAoTWF0aC5hYnMoY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24udGltZSAtIERhdGUubm93KCkpIDwgY29uZmlnLm1pbkludGVydmFsKTtcblxuXHRcdC8vIEdPVk5PS09EXG5cdFx0Ly8gY29uc29sZS5sb2coJzE6ICcrY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24udGltZSsnXFxuMjogJytEYXRlLm5vdygpKydcXG5taW5JbnQ6ICcrY29uZmlnLm1pbkludGVydmFsKTtcblxuXHRcdGlmICghdmFsaWQpIHtcblx0XHQgICAgY29uZmlnLnNjb3JlICs9IDEwMDtcblx0XHQgICAgLy8gY29uc29sZS5sb2coaW5kZXgpO1xuXHRcdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0XHQnZ2xTdGF0dXMnLFxuXHRcdFx0e2RldGFpbDoge1xuXHRcdFx0ICAgIHN0YXR1czogXCJzdWNjZXNzXCIsXG5cdFx0XHQgICAgaW5kZXg6IGluZGV4LFxuXHRcdFx0ICAgIG5ld1Njb3JlOiBjb25maWcuc2NvcmVcblx0XHRcdH19XG5cdFx0ICAgICk7XG5cdFx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0ICAgIGNvbmZpZy5zY29yZSAtPSAxMDtcblx0XHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdFx0J2dsU3RhdHVzJyxcblx0XHRcdHtkZXRhaWw6IHtcblx0XHRcdCAgICBzdGF0dXM6IFwiZmFpbFwiLFxuXHRcdFx0ICAgIGluZGV4OiBpbmRleCxcblx0XHRcdCAgICBuZXdTY29yZTogY29uZmlnLnNjb3JlXG5cdFx0XHR9fVxuXHRcdCAgICApO1xuXHRcdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0XHR9XG5cdFx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSB7bW92ZW1lbnQ6ICdQQVNTJywgdGltZTogRGF0ZS5ub3coKX07XG5cdCAgICB9LCBjb25maWcubWluSW50ZXJ2YWwqNCk7XG5cdCAgICAvL1xuXHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdCdnbEFkZE1vdmVtZW50Jyxcblx0XHR7ZGV0YWlsOiBjb25maWcubW92ZW1lbnRzW2NvbmZpZy5kaXNwbGF5ZWRJbmRleF19XG5cdCAgICApO1xuXHQgICAgLy8gY29uc29sZS5sb2cobmV3RXZlbnQpO1xuXHQgICAgY29uZmlnLmRpc3BsYXllZEluZGV4Kys7XG5cdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0ICAgIGNvbmZpZy50aW1lciA9IHNldFRpbWVvdXQoc2VuZE1vdmVtZW50LCBjb25maWcubWluSW50ZXJ2YWwpO1xuXHR9XG5cdHNldFRpbWVvdXQoc2VuZE1vdmVtZW50LCBjb25maWcuYmVnaW5uaW5nT2Zmc2V0KTtcblx0Y29uZmlnLmF1ZGlvLnBsYXkoKTtcblxuXHQgICAgfVxuXHR9KTtcblx0XG4gIH1cblxuICAgIGZ1bmN0aW9uIG9uQWdDb21tYW5kRXZlbnQoZXZlbnQpIHtcblx0Ly8gY29uc29sZS5sb2coJ2FnQ29tbWFuZEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG5cdGlmIChldmVudC5kZXRhaWwubW92ZW1lbnQgPT0gJ1NUT1AnKSBjbGVhckludGVydmFsKGNvbmZpZy50aW1lcik7XG5cdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0gZXZlbnQuZGV0YWlsO1xuXG5cdGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC5tb3ZlbWVudCk7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50Jywgb25BZ1NldHVwRXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
