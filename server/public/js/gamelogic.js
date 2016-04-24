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
				config.lastPerformedAction = { movement: 'pass', time: Date.now() };
				function sendMovement() {
					// Set deciding the status in the future.
					setTimeout(function () {
						//var index = Math.round((config.lastPerformedAction.time - config.startDate - config.beginningOffset) / config.minInterval);
						var index = config.displayedIndex - 4;
						var valid = config.lastPerformedAction.movement == config.movements[index] && Math.abs(config.lastPerformedAction.time - Date.now()) < config.minInterval;

						// GOVNOKOD
						console.log('1: ' + config.lastPerformedAction.time + '\n2: ' + Date.now() + '\nminInt: ' + config.minInterval);

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
						config.lastPerformedAction = { movement: 'pass', time: Date.now() };
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
		if (event.detail.movement == 'stop') clearInterval(config.timer);
		config.lastPerformedAction = event.detail;
	}

	document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agCommandEvent', onAgCommandEvent);
})();
//# sourceMappingURL=data:application/json;base64,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V0FBVyxJQUFJLFdBQUosQ0FDbEIsZUFEa0IsRUFFbEIsRUFBQyxRQUFRLE9BQU8sU0FBUCxDQUFpQixPQUFPLGNBQXhCLENBQVQsRUFGa0IsQ0FBZjs7QUFLQSxZQUFPLGNBQVA7QUFDQSxjQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxZQUFPLEtBQVAsR0FBZSxXQUFXLFlBQVgsRUFBeUIsT0FBTyxXQUFoQyxDQUFmO0FBQ0g7QUFDRCxlQUFXLFlBQVgsRUFBeUIsT0FBTyxlQUFoQztBQUNBLFdBQU8sS0FBUCxDQUFhLElBQWI7QUFFSztBQXhFbUIsR0FBVCxDQUFmO0FBMkVFOztBQUVDLFVBQVMsZ0JBQVQsQ0FBMEIsS0FBMUIsRUFBaUM7O0FBRXBDLE1BQUksTUFBTSxNQUFOLENBQWEsUUFBYixJQUF5QixNQUE3QixFQUFxQyxjQUFjLE9BQU8sS0FBckI7QUFDckMsU0FBTyxtQkFBUCxHQUE2QixNQUFNLE1BQW5DO0FBQ0k7O0FBRUQsVUFBUyxnQkFBVCxDQUEwQixjQUExQixFQUEwQyxjQUExQztBQUNBLFVBQVMsZ0JBQVQsQ0FBMEIsZ0JBQTFCLEVBQTRDLGdCQUE1QztBQUNILENBcEdEIiwiZmlsZSI6ImdhbWVsb2dpYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXHQvLyBjb25zb2xlLmxvZygnYWdTZXR1cEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG5cdC8vXG4gICAgXHRjb25maWcubW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzO1xuXHQvL1xuXHRsZXQgYXVkaW9GaWxlVVJMID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJzo1MDAwL3NvbmdzLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gbGV0IGF1ZGlvRmlsZVVSTCA9ICcuLi9hdWRpby8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGNvbnNvbGUubG9nKCdhdWRpbyBmaWxlIHVybDogJyArIGF1ZGlvRmlsZVVSTCk7XG5cdGNvbmZpZy5hdWRpbyA9IG5ldyBIb3dsKHtcblx0ICAgIHVybHM6IFthdWRpb0ZpbGVVUkxdLFxuXHQgICAgYXV0b3BsYXk6IGZhbHNlLFxuXHQgICAgdm9sdW1lOiAwLjgsXG5cdCAgICBvbmxvYWQ6IGZ1bmN0aW9uKCl7XG5cblx0ICAgIFx0Ly8gR2VuZXJhdGUgbmV3IGV2ZW50IGZvciB0aGUgdmlldy5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2dsU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7c29uZzogZXZlbnQuZGV0YWlsLnNvbmcsIGJwbTogZXZlbnQuZGV0YWlsLmJwbSwgY29tbWFuZHM6IGV2ZW50LmRldGFpbC5jb21tYW5kcywgbXVzaWM6IGNvbmZpZy5hdWRpb319XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdGNvbmZpZy5icG0gPSBldmVudC5kZXRhaWwuYnBtKjI7XG5cdGNvbmZpZy5taW5JbnRlcnZhbCA9IDYwMDAwIC8gY29uZmlnLmJwbTtcblx0Y29uZmlnLmJlZ2lubmluZ09mZnNldCA9IGV2ZW50LmRldGFpbC5vZmZzZXQ7XG5cdC8vIFN0YXJ0LlxuXHRjb25maWcuc2NvcmUgPSAwO1xuXHRjb25maWcuc3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0Y29uZmlnLmRpc3BsYXllZEluZGV4ID0gMDtcblx0Y29uZmlnLmxhc3RSZWNlaXZlZEluZGV4ID0gMDtcblx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSB7bW92ZW1lbnQ6ICdwYXNzJywgdGltZTogRGF0ZS5ub3coKX07XG5cdGZ1bmN0aW9uIHNlbmRNb3ZlbWVudCgpIHtcblx0ICAgIC8vIFNldCBkZWNpZGluZyB0aGUgc3RhdHVzIGluIHRoZSBmdXR1cmUuXG5cdCAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdC8vdmFyIGluZGV4ID0gTWF0aC5yb3VuZCgoY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24udGltZSAtIGNvbmZpZy5zdGFydERhdGUgLSBjb25maWcuYmVnaW5uaW5nT2Zmc2V0KSAvIGNvbmZpZy5taW5JbnRlcnZhbCk7XG5cdFx0dmFyIGluZGV4ID0gY29uZmlnLmRpc3BsYXllZEluZGV4IC0gNDtcblx0XHR2YXIgdmFsaWQgPSBjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi5tb3ZlbWVudCA9PSBjb25maWcubW92ZW1lbnRzW2luZGV4XSAmJlxuXHRcdCAgICBNYXRoLmFicyhjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lIC0gRGF0ZS5ub3coKSkgPCBjb25maWcubWluSW50ZXJ2YWw7XG5cblx0XHQvLyBHT1ZOT0tPRFxuXHRcdGNvbnNvbGUubG9nKCcxOiAnK2NvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUrJ1xcbjI6ICcrRGF0ZS5ub3coKSsnXFxubWluSW50OiAnK2NvbmZpZy5taW5JbnRlcnZhbCk7XG5cblx0XHRpZiAoIXZhbGlkKSB7XG5cdFx0ICAgIGNvbmZpZy5zY29yZSArPSAxMDA7XG5cdFx0ICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdFx0J2dsU3RhdHVzJyxcblx0XHRcdHtkZXRhaWw6IHtcblx0XHRcdCAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuXHRcdFx0ICAgIGluZGV4OiBpbmRleCxcblx0XHRcdCAgICBuZXdTY29yZTogY29uZmlnLnNjb3JlXG5cdFx0XHR9fVxuXHRcdCAgICApO1xuXHRcdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdCAgICBjb25maWcuc2NvcmUgLT0gMTA7XG5cdFx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHRcdCdnbFN0YXR1cycsXG5cdFx0XHR7ZGV0YWlsOiB7XG5cdFx0XHQgICAgc3RhdHVzOiBcImZhaWxcIixcblx0XHRcdCAgICBpbmRleDogaW5kZXgsXG5cdFx0XHQgICAgbmV3U2NvcmU6IGNvbmZpZy5zY29yZVxuXHRcdFx0fX1cblx0XHQgICAgKTtcblx0XHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdFx0fVxuXHRcdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0ge21vdmVtZW50OiAncGFzcycsIHRpbWU6IERhdGUubm93KCl9O1xuXHQgICAgfSwgY29uZmlnLm1pbkludGVydmFsKjQpO1xuXHQgICAgLy9cblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHQnZ2xBZGRNb3ZlbWVudCcsXG5cdFx0e2RldGFpbDogY29uZmlnLm1vdmVtZW50c1tjb25maWcuZGlzcGxheWVkSW5kZXhdfVxuXHQgICAgKTtcblx0ICAgIC8vIGNvbnNvbGUubG9nKG5ld0V2ZW50KTtcblx0ICAgIGNvbmZpZy5kaXNwbGF5ZWRJbmRleCsrO1xuXHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdCAgICBjb25maWcudGltZXIgPSBzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLm1pbkludGVydmFsKTtcblx0fVxuXHRzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLmJlZ2lubmluZ09mZnNldCk7XG5cdGNvbmZpZy5hdWRpby5wbGF5KCk7XG5cblx0ICAgIH1cblx0fSk7XG5cdFxuICB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7XG5cdC8vIGNvbnNvbGUubG9nKCdhZ0NvbW1hbmRFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuXHRpZiAoZXZlbnQuZGV0YWlsLm1vdmVtZW50ID09ICdzdG9wJykgY2xlYXJJbnRlcnZhbChjb25maWcudGltZXIpO1xuXHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IGV2ZW50LmRldGFpbDtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBvbkFnU2V0dXBFdmVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDb21tYW5kRXZlbnQnLCBvbkFnQ29tbWFuZEV2ZW50KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
