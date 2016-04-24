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
						console.log('1: ' + config.lastPerformedAction.movement + '\n2: ' + config.movements[index] + '\nminInt: ' + config.minInterval);
						// console.log();

						if (valid) {
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
//# sourceMappingURL=data:application/json;base64,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Q0EsU0FBSSxXQUFXLElBQUksV0FBSixDQUNsQixlQURrQixFQUVsQixFQUFDLFFBQVEsT0FBTyxTQUFQLENBQWlCLE9BQU8sY0FBeEIsQ0FBVCxFQUZrQixDQUFmOztBQUtBLFlBQU8sY0FBUDtBQUNBLGNBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLFlBQU8sS0FBUCxHQUFlLFdBQVcsWUFBWCxFQUF5QixPQUFPLFdBQWhDLENBQWY7QUFDSDtBQUNELGVBQVcsWUFBWCxFQUF5QixPQUFPLGVBQWhDO0FBQ0EsV0FBTyxLQUFQLENBQWEsSUFBYjtBQUVLO0FBekVtQixHQUFULENBQWY7QUE0RUU7O0FBRUMsVUFBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQzs7QUFFcEMsTUFBSSxNQUFNLE1BQU4sQ0FBYSxRQUFiLElBQXlCLE1BQTdCLEVBQXFDLGNBQWMsT0FBTyxLQUFyQjtBQUNyQyxTQUFPLG1CQUFQLEdBQTZCLE1BQU0sTUFBbkM7O0FBRUEsVUFBUSxHQUFSLENBQVksTUFBTSxNQUFOLENBQWEsUUFBekI7QUFDSTs7QUFFRCxVQUFTLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDLGNBQTFDO0FBQ0EsVUFBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMsZ0JBQTVDO0FBQ0gsQ0F2R0QiLCJmaWxlIjoiZ2FtZWxvZ2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBnYW1lbG9naWMuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy9cblxuICAgIHZhciBFUFNJTE9OID0gMTAwMDtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICAvLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuICAgIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG5cdC8vIGNvbnNvbGUubG9nKCdhZ1NldHVwRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0Ly9cbiAgICBcdGNvbmZpZy5tb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHM7XG5cdC8vXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnOjUwMDAvc29uZ3MvJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBsZXQgYXVkaW9GaWxlVVJMID0gJy4uL2F1ZGlvLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gY29uc29sZS5sb2coJ2F1ZGlvIGZpbGUgdXJsOiAnICsgYXVkaW9GaWxlVVJMKTtcblx0Y29uZmlnLmF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0ICAgIG9ubG9hZDogZnVuY3Rpb24oKXtcblxuXHQgICAgXHQvLyBHZW5lcmF0ZSBuZXcgZXZlbnQgZm9yIHRoZSB2aWV3LlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnZ2xTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtzb25nOiBldmVudC5kZXRhaWwuc29uZywgYnBtOiBldmVudC5kZXRhaWwuYnBtLCBjb21tYW5kczogZXZlbnQuZGV0YWlsLmNvbW1hbmRzLCBtdXNpYzogY29uZmlnLmF1ZGlvfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdC8vIEJQTSwgbWluSW50ZXJ2YWwsIGJlZ2lubmluZyBvZmZzZXRcblx0Y29uZmlnLmJwbSA9IGV2ZW50LmRldGFpbC5icG0qMjtcblx0Y29uZmlnLm1pbkludGVydmFsID0gNjAwMDAgLyBjb25maWcuYnBtO1xuXHRjb25maWcuYmVnaW5uaW5nT2Zmc2V0ID0gZXZlbnQuZGV0YWlsLm9mZnNldDtcblx0Ly8gU3RhcnQuXG5cdGNvbmZpZy5zY29yZSA9IDA7XG5cdGNvbmZpZy5zdGFydERhdGUgPSBEYXRlLm5vdygpO1xuXHRjb25maWcuZGlzcGxheWVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFJlY2VpdmVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IHttb3ZlbWVudDogJ1BBU1MnLCB0aW1lOiBEYXRlLm5vdygpfTtcblx0ZnVuY3Rpb24gc2VuZE1vdmVtZW50KCkge1xuXHQgICAgLy8gU2V0IGRlY2lkaW5nIHRoZSBzdGF0dXMgaW4gdGhlIGZ1dHVyZS5cblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Ly92YXIgaW5kZXggPSBNYXRoLnJvdW5kKChjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lIC0gY29uZmlnLnN0YXJ0RGF0ZSAtIGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQpIC8gY29uZmlnLm1pbkludGVydmFsKTtcblx0XHR2YXIgaW5kZXggPSBjb25maWcuZGlzcGxheWVkSW5kZXggLSA0O1xuXHRcdHZhciB2YWxpZCA9IChjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi5tb3ZlbWVudCA9PSBjb25maWcubW92ZW1lbnRzW2luZGV4XSkgJiZcblx0XHQgICAgKE1hdGguYWJzKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUgLSBEYXRlLm5vdygpKSA8IGNvbmZpZy5taW5JbnRlcnZhbCk7XG5cblx0XHQvLyBHT1ZOT0tPRFxuXHRcdGNvbnNvbGUubG9nKCcxOiAnK2NvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLm1vdmVtZW50KydcXG4yOiAnK2NvbmZpZy5tb3ZlbWVudHNbaW5kZXhdKydcXG5taW5JbnQ6ICcrY29uZmlnLm1pbkludGVydmFsKTtcblx0XHQvLyBjb25zb2xlLmxvZygpO1xuXG5cdFx0aWYgKHZhbGlkKSB7XG5cdFx0ICAgIGNvbmZpZy5zY29yZSArPSAxMDA7XG5cdFx0ICAgIC8vIGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdFx0J2dsU3RhdHVzJyxcblx0XHRcdHtkZXRhaWw6IHtcblx0XHRcdCAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuXHRcdFx0ICAgIGluZGV4OiBpbmRleCxcblx0XHRcdCAgICBuZXdTY29yZTogY29uZmlnLnNjb3JlXG5cdFx0XHR9fVxuXHRcdCAgICApO1xuXHRcdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdCAgICBjb25maWcuc2NvcmUgLT0gMTA7XG5cdFx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHRcdCdnbFN0YXR1cycsXG5cdFx0XHR7ZGV0YWlsOiB7XG5cdFx0XHQgICAgc3RhdHVzOiBcImZhaWxcIixcblx0XHRcdCAgICBpbmRleDogaW5kZXgsXG5cdFx0XHQgICAgbmV3U2NvcmU6IGNvbmZpZy5zY29yZVxuXHRcdFx0fX1cblx0XHQgICAgKTtcblx0XHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdFx0fVxuXHRcdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0ge21vdmVtZW50OiAnUEFTUycsIHRpbWU6IERhdGUubm93KCl9O1xuXHQgICAgfSwgY29uZmlnLm1pbkludGVydmFsKjQpO1xuXHQgICAgLy9cblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHQnZ2xBZGRNb3ZlbWVudCcsXG5cdFx0e2RldGFpbDogY29uZmlnLm1vdmVtZW50c1tjb25maWcuZGlzcGxheWVkSW5kZXhdfVxuXHQgICAgKTtcblx0ICAgIC8vIGNvbnNvbGUubG9nKG5ld0V2ZW50KTtcblx0ICAgIGNvbmZpZy5kaXNwbGF5ZWRJbmRleCsrO1xuXHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdCAgICBjb25maWcudGltZXIgPSBzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLm1pbkludGVydmFsKTtcblx0fVxuXHRzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLmJlZ2lubmluZ09mZnNldCk7XG5cdGNvbmZpZy5hdWRpby5wbGF5KCk7XG5cblx0ICAgIH1cblx0fSk7XG5cdFxuICB9XG5cbiAgICBmdW5jdGlvbiBvbkFnQ29tbWFuZEV2ZW50KGV2ZW50KSB7XG5cdC8vIGNvbnNvbGUubG9nKCdhZ0NvbW1hbmRFdmVudDogJyArIEpTT04uc3RyaW5naWZ5KGV2ZW50LmRldGFpbCkpO1xuXHRpZiAoZXZlbnQuZGV0YWlsLm1vdmVtZW50ID09ICdTVE9QJykgY2xlYXJJbnRlcnZhbChjb25maWcudGltZXIpO1xuXHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IGV2ZW50LmRldGFpbDtcblxuXHRjb25zb2xlLmxvZyhldmVudC5kZXRhaWwubW92ZW1lbnQpO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ0NvbW1hbmRFdmVudCcsIG9uQWdDb21tYW5kRXZlbnQpO1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
