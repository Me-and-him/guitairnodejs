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
		console.log('agSetupEvent: ' + JSON.stringify(event.detail));
		//
		config.movements = event.detail.commands;
		//
		var audioFileURL = 'http://' + window.location.hostname + ':5000/songs/' + event.detail.song;
		// let audioFileURL = '../audio/' + event.detail.song;
		console.log('audio file url: ' + audioFileURL);
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
						var valid = config.lastPerformedAction.movement == config.movements[index] && Math.abs(config.lastPerformedAction.time - Date.now()) < config.minInterval / 2;
						if (!valid) {
							config.score += 100;
							console.log(index);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWVsb2dpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFJQSxDQUFDLFlBQVc7OztBQUdSLEtBQUksVUFBVSxJQUFkO0FBQ0EsS0FBSSxTQUFTLEVBQWI7OztBQUdBLFVBQVMsY0FBVCxDQUF3QixLQUF4QixFQUErQjtBQUNsQyxVQUFRLEdBQVIsQ0FBWSxtQkFBbUIsS0FBSyxTQUFMLENBQWUsTUFBTSxNQUFyQixDQUEvQjs7QUFFSSxTQUFPLFNBQVAsR0FBbUIsTUFBTSxNQUFOLENBQWEsUUFBaEM7O0FBRUosTUFBSSxlQUFlLFlBQVksT0FBTyxRQUFQLENBQWdCLFFBQTVCLEdBQXVDLGNBQXZDLEdBQXdELE1BQU0sTUFBTixDQUFhLElBQXhGOztBQUVBLFVBQVEsR0FBUixDQUFZLHFCQUFxQixZQUFqQztBQUNBLFNBQU8sS0FBUCxHQUFlLElBQUksSUFBSixDQUFTO0FBQ3BCLFNBQU0sQ0FBQyxZQUFELENBRGM7QUFFcEIsYUFBVSxLQUZVO0FBR3BCLFdBQVEsR0FIWTtBQUlwQixXQUFRLGtCQUFVOzs7QUFHdEIsUUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGNBRFcsRUFFWCxFQUFDLFFBQVEsRUFBQyxNQUFNLE1BQU0sTUFBTixDQUFhLElBQXBCLEVBQTBCLEtBQUssTUFBTSxNQUFOLENBQWEsR0FBNUMsRUFBaUQsVUFBVSxNQUFNLE1BQU4sQ0FBYSxRQUF4RSxFQUFrRixPQUFPLE9BQU8sS0FBaEcsRUFBVCxFQUZXLENBQWY7QUFJQSxhQUFTLGFBQVQsQ0FBdUIsUUFBdkI7O0FBRUEsV0FBTyxHQUFQLEdBQWEsTUFBTSxNQUFOLENBQWEsR0FBYixHQUFpQixDQUE5QjtBQUNBLFdBQU8sV0FBUCxHQUFxQixRQUFRLE9BQU8sR0FBcEM7QUFDQSxXQUFPLGVBQVAsR0FBeUIsTUFBTSxNQUFOLENBQWEsTUFBdEM7O0FBRUEsV0FBTyxLQUFQLEdBQWUsQ0FBZjtBQUNBLFdBQU8sU0FBUCxHQUFtQixLQUFLLEdBQUwsRUFBbkI7QUFDQSxXQUFPLGNBQVAsR0FBd0IsQ0FBeEI7QUFDQSxXQUFPLGlCQUFQLEdBQTJCLENBQTNCO0FBQ0EsV0FBTyxtQkFBUCxHQUE2QixFQUFDLFVBQVUsTUFBWCxFQUFtQixNQUFNLEtBQUssR0FBTCxFQUF6QixFQUE3QjtBQUNBLGFBQVMsWUFBVCxHQUF3Qjs7QUFFcEIsZ0JBQVcsWUFBVzs7QUFFekIsVUFBSSxRQUFRLE9BQU8sY0FBUCxHQUF3QixDQUFwQztBQUNBLFVBQUksUUFBUSxPQUFPLG1CQUFQLENBQTJCLFFBQTNCLElBQXVDLE9BQU8sU0FBUCxDQUFpQixLQUFqQixDQUF2QyxJQUNSLEtBQUssR0FBTCxDQUFTLE9BQU8sbUJBQVAsQ0FBMkIsSUFBM0IsR0FBa0MsS0FBSyxHQUFMLEVBQTNDLElBQXlELE9BQU8sV0FBUCxHQUFxQixDQURsRjtBQUVBLFVBQUksQ0FBQyxLQUFMLEVBQVk7QUFDUixjQUFPLEtBQVAsSUFBZ0IsR0FBaEI7QUFDQSxlQUFRLEdBQVIsQ0FBWSxLQUFaO0FBQ0EsV0FBSSxXQUFXLElBQUksV0FBSixDQUNsQixVQURrQixFQUVsQixFQUFDLFFBQVE7QUFDTCxpQkFBUSxTQURIO0FBRUwsZ0JBQU8sS0FGRjtBQUdMLG1CQUFVLE9BQU87QUFIWixTQUFULEVBRmtCLENBQWY7QUFRQSxnQkFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0gsT0FaRCxNQVlPO0FBQ0gsY0FBTyxLQUFQLElBQWdCLEVBQWhCO0FBQ0EsV0FBSSxXQUFXLElBQUksV0FBSixDQUNsQixVQURrQixFQUVsQixFQUFDLFFBQVE7QUFDTCxpQkFBUSxNQURIO0FBRUwsZ0JBQU8sS0FGRjtBQUdMLG1CQUFVLE9BQU87QUFIWixTQUFULEVBRmtCLENBQWY7QUFRQSxnQkFBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0g7QUFDRCxhQUFPLG1CQUFQLEdBQTZCLEVBQUMsVUFBVSxNQUFYLEVBQW1CLE1BQU0sS0FBSyxHQUFMLEVBQXpCLEVBQTdCO0FBQ0ksTUE5QkQsRUE4QkcsT0FBTyxXQUFQLEdBQW1CLENBOUJ0Qjs7QUFnQ0EsU0FBSSxXQUFXLElBQUksV0FBSixDQUNsQixlQURrQixFQUVsQixFQUFDLFFBQVEsT0FBTyxTQUFQLENBQWlCLE9BQU8sY0FBeEIsQ0FBVCxFQUZrQixDQUFmOztBQUtBLFlBQU8sY0FBUDtBQUNBLGNBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLFlBQU8sS0FBUCxHQUFlLFdBQVcsWUFBWCxFQUF5QixPQUFPLFdBQWhDLENBQWY7QUFDSDtBQUNELGVBQVcsWUFBWCxFQUF5QixPQUFPLGVBQWhDO0FBQ0EsV0FBTyxLQUFQLENBQWEsSUFBYjtBQUVLO0FBcEVtQixHQUFULENBQWY7QUF1RUU7O0FBRUMsVUFBUyxnQkFBVCxDQUEwQixLQUExQixFQUFpQzs7QUFFcEMsTUFBSSxNQUFNLE1BQU4sQ0FBYSxRQUFiLElBQXlCLE1BQTdCLEVBQXFDLGNBQWMsT0FBTyxLQUFyQjtBQUNyQyxTQUFPLG1CQUFQLEdBQTZCLE1BQU0sTUFBbkM7QUFDSTs7QUFFRCxVQUFTLGdCQUFULENBQTBCLGNBQTFCLEVBQTBDLGNBQTFDO0FBQ0EsVUFBUyxnQkFBVCxDQUEwQixnQkFBMUIsRUFBNEMsZ0JBQTVDO0FBQ0gsQ0FoR0QiLCJmaWxlIjoiZ2FtZWxvZ2ljLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBnYW1lbG9naWMuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy9cblxuICAgIHZhciBFUFNJTE9OID0gMTAwMDtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICAvLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuICAgIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKCdhZ1NldHVwRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0Ly9cbiAgICBcdGNvbmZpZy5tb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHM7XG5cdC8vXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnOjUwMDAvc29uZ3MvJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBsZXQgYXVkaW9GaWxlVVJMID0gJy4uL2F1ZGlvLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Y29uc29sZS5sb2coJ2F1ZGlvIGZpbGUgdXJsOiAnICsgYXVkaW9GaWxlVVJMKTtcblx0Y29uZmlnLmF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0ICAgIG9ubG9hZDogZnVuY3Rpb24oKXtcblxuXHQgICAgXHQvLyBHZW5lcmF0ZSBuZXcgZXZlbnQgZm9yIHRoZSB2aWV3LlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnZ2xTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtzb25nOiBldmVudC5kZXRhaWwuc29uZywgYnBtOiBldmVudC5kZXRhaWwuYnBtLCBjb21tYW5kczogZXZlbnQuZGV0YWlsLmNvbW1hbmRzLCBtdXNpYzogY29uZmlnLmF1ZGlvfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdC8vIEJQTSwgbWluSW50ZXJ2YWwsIGJlZ2lubmluZyBvZmZzZXRcblx0Y29uZmlnLmJwbSA9IGV2ZW50LmRldGFpbC5icG0qMjtcblx0Y29uZmlnLm1pbkludGVydmFsID0gNjAwMDAgLyBjb25maWcuYnBtO1xuXHRjb25maWcuYmVnaW5uaW5nT2Zmc2V0ID0gZXZlbnQuZGV0YWlsLm9mZnNldDtcblx0Ly8gU3RhcnQuXG5cdGNvbmZpZy5zY29yZSA9IDA7XG5cdGNvbmZpZy5zdGFydERhdGUgPSBEYXRlLm5vdygpO1xuXHRjb25maWcuZGlzcGxheWVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFJlY2VpdmVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IHttb3ZlbWVudDogJ3Bhc3MnLCB0aW1lOiBEYXRlLm5vdygpfTtcblx0ZnVuY3Rpb24gc2VuZE1vdmVtZW50KCkge1xuXHQgICAgLy8gU2V0IGRlY2lkaW5nIHRoZSBzdGF0dXMgaW4gdGhlIGZ1dHVyZS5cblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Ly92YXIgaW5kZXggPSBNYXRoLnJvdW5kKChjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lIC0gY29uZmlnLnN0YXJ0RGF0ZSAtIGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQpIC8gY29uZmlnLm1pbkludGVydmFsKTtcblx0XHR2YXIgaW5kZXggPSBjb25maWcuZGlzcGxheWVkSW5kZXggLSA0O1xuXHRcdHZhciB2YWxpZCA9IGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLm1vdmVtZW50ID09IGNvbmZpZy5tb3ZlbWVudHNbaW5kZXhdICYmXG5cdFx0ICAgIE1hdGguYWJzKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUgLSBEYXRlLm5vdygpKSA8IGNvbmZpZy5taW5JbnRlcnZhbCAvIDI7XG5cdFx0aWYgKCF2YWxpZCkge1xuXHRcdCAgICBjb25maWcuc2NvcmUgKz0gMTAwO1xuXHRcdCAgICBjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHRcdCdnbFN0YXR1cycsXG5cdFx0XHR7ZGV0YWlsOiB7XG5cdFx0XHQgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcblx0XHRcdCAgICBpbmRleDogaW5kZXgsXG5cdFx0XHQgICAgbmV3U2NvcmU6IGNvbmZpZy5zY29yZVxuXHRcdFx0fX1cblx0XHQgICAgKTtcblx0XHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdFx0fSBlbHNlIHtcblx0XHQgICAgY29uZmlnLnNjb3JlIC09IDEwO1xuXHRcdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0XHQnZ2xTdGF0dXMnLFxuXHRcdFx0e2RldGFpbDoge1xuXHRcdFx0ICAgIHN0YXR1czogXCJmYWlsXCIsXG5cdFx0XHQgICAgaW5kZXg6IGluZGV4LFxuXHRcdFx0ICAgIG5ld1Njb3JlOiBjb25maWcuc2NvcmVcblx0XHRcdH19XG5cdFx0ICAgICk7XG5cdFx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHRcdH1cblx0XHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IHttb3ZlbWVudDogJ3Bhc3MnLCB0aW1lOiBEYXRlLm5vdygpfTtcblx0ICAgIH0sIGNvbmZpZy5taW5JbnRlcnZhbCo0KTtcblx0ICAgIC8vXG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0J2dsQWRkTW92ZW1lbnQnLFxuXHRcdHtkZXRhaWw6IGNvbmZpZy5tb3ZlbWVudHNbY29uZmlnLmRpc3BsYXllZEluZGV4XX1cblx0ICAgICk7XG5cdCAgICAvLyBjb25zb2xlLmxvZyhuZXdFdmVudCk7XG5cdCAgICBjb25maWcuZGlzcGxheWVkSW5kZXgrKztcblx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQgICAgY29uZmlnLnRpbWVyID0gc2V0VGltZW91dChzZW5kTW92ZW1lbnQsIGNvbmZpZy5taW5JbnRlcnZhbCk7XG5cdH1cblx0c2V0VGltZW91dChzZW5kTW92ZW1lbnQsIGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQpO1xuXHRjb25maWcuYXVkaW8ucGxheSgpO1xuXG5cdCAgICB9XG5cdH0pO1xuXHRcbiAgfVxuXG4gICAgZnVuY3Rpb24gb25BZ0NvbW1hbmRFdmVudChldmVudCkge1xuXHQvLyBjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0aWYgKGV2ZW50LmRldGFpbC5tb3ZlbWVudCA9PSAnc3RvcCcpIGNsZWFySW50ZXJ2YWwoY29uZmlnLnRpbWVyKTtcblx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSBldmVudC5kZXRhaWw7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdTZXR1cEV2ZW50Jywgb25BZ1NldHVwRXZlbnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnQ29tbWFuZEV2ZW50Jywgb25BZ0NvbW1hbmRFdmVudCk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
