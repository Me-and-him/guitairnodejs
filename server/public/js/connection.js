"use strict";

/**
 * connection.js
 *
 * Sets connection to the server.
 *
 * Emits 'agSetupEvent' and 'agCommandEvent' events that should be handled in
 * the view.
 * ``agSetupEvent``s set the song name and the command sequence.
 * ``agCommandEvent``s say which command user sent.
 */

(function () {
	var songWasStarted = false;
	var ws = io();

	// WARNING!
	// HARDCODE!!!

	var movements = ["pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down"];

	// END WARNING

	function onGotMessageOnStart(event) {
		console.log('onGotMessageOnStart: ' + event);
		// Receive song name and command sequence.
		// TODO! Generate a movement string list from the supplied code.

		// var songDataFileName = event.detail.song.slice(0,-4)+'.json';
		// console.log(songDataFileName);

		// var request = new XMLHttpRequest();
		// request.open("GET", "../songs/"+songDataFileName, false);
		// request.send(null);
		// request.onreadystatechange = function() {
		//   if ( request.readyState === 4 && request.status === 200 ) {
		//     var songDataJSON = JSON.parse(request.responseText);
		//     // console.log(my_JSON_object);
		//   }
		// }

		var newEvent = new CustomEvent('agSetupEvent', { detail: {
				// song:     event.detail.name,
				// bpm:      event.detail.bpm,
				// commands: event.detail.movements,
				// offset:   event.detail.offset,

				song: 'Highway to Hell.mp3',
				bpm: 108,
				commands: movements,
				offset: 1000
			} });
		document.dispatchEvent(newEvent);
		ws.on('message', onGotMessageOnConnectionEstablished);
		songWasStarted = true;
	}

	function onGotMessageOnConnectionEstablished(event) {
		console.log('onGotMessageOnConnectionEstablished: ' + event);
		// Receive user command.
		var newEvent = new CustomEvent('agComandEvent', { detail: {
				movement: event.movement,
				time: event.time
			} });
		document.dispatchEvent(newEvent);
	}

	ws.on('message', onGotMessageOnStart);

	ws.on('connect', function () {
		// ws.json.emit({type: 'webpage', code: code});
		// ws.emit(JSON.stringify({type: 'webpage', code: code}));
		ws.json.send({ type: 'webpage', code: code });
	});
})();
//# sourceMappingURL=data:application/json;base64,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QUFqOEMsRUFBeThDLE1BQXo4QyxFQUFpOUMsTUFBajlDLEVBQXk5QyxJQUF6OUMsRUFBKzlDLE1BQS85QyxFQUF1K0MsTUFBditDLEVBQSsrQyxNQUEvK0MsRUFBdS9DLE1BQXYvQyxFQUErL0MsTUFBLy9DLENBQWhCOzs7O0FBSUEsVUFBUyxtQkFBVCxDQUE2QixLQUE3QixFQUFvQztBQUN2QyxVQUFRLEdBQVIsQ0FBWSwwQkFBMEIsS0FBdEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxjQURXLEVBRVgsRUFBQyxRQUFROzs7Ozs7QUFNWixVQUFVLHFCQU5FO0FBT1osU0FBVSxHQVBFO0FBUVosY0FBVSxTQVJFO0FBU1osWUFBVTtBQVRFLElBQVQsRUFGVyxDQUFmO0FBY0EsV0FBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsS0FBRyxFQUFILENBQU0sU0FBTixFQUFpQixtQ0FBakI7QUFDQSxtQkFBaUIsSUFBakI7QUFDSTs7QUFFRCxVQUFTLG1DQUFULENBQTZDLEtBQTdDLEVBQW9EO0FBQ3ZELFVBQVEsR0FBUixDQUFZLDBDQUEwQyxLQUF0RDs7QUFFQSxNQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsZUFEVyxFQUVYLEVBQUMsUUFBUTtBQUNaLGNBQVUsTUFBTSxRQURKO0FBRVosVUFBVSxNQUFNO0FBRkosSUFBVCxFQUZXLENBQWY7QUFPQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDSTs7QUFFRCxJQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLG1CQUFqQjs7QUFFQSxJQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLFlBQVc7OztBQUcvQixLQUFHLElBQUgsQ0FBUSxJQUFSLENBQWEsRUFBQyxNQUFNLFNBQVAsRUFBa0IsTUFBTSxJQUF4QixFQUFiO0FBQ0ksRUFKRDtBQUtILENBcEVEIiwiZmlsZSI6ImNvbm5lY3Rpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIGNvbm5lY3Rpb24uanNcbiAqXG4gKiBTZXRzIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlci5cbiAqXG4gKiBFbWl0cyAnYWdTZXR1cEV2ZW50JyBhbmQgJ2FnQ29tbWFuZEV2ZW50JyBldmVudHMgdGhhdCBzaG91bGQgYmUgaGFuZGxlZCBpblxuICogdGhlIHZpZXcuXG4gKiBgYGFnU2V0dXBFdmVudGBgcyBzZXQgdGhlIHNvbmcgbmFtZSBhbmQgdGhlIGNvbW1hbmQgc2VxdWVuY2UuXG4gKiBgYGFnQ29tbWFuZEV2ZW50YGBzIHNheSB3aGljaCBjb21tYW5kIHVzZXIgc2VudC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG4gICAgdmFyIHdzID0gaW8oKTtcblxuICAgIC8vIFdBUk5JTkchXG4gICAgLy8gSEFSRENPREUhISFcblxuICAgIHZhciBtb3ZlbWVudHMgPSBbXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCJdO1xuXG4gICAgLy8gRU5EIFdBUk5JTkdcblxuICAgIGZ1bmN0aW9uIG9uR290TWVzc2FnZU9uU3RhcnQoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uU3RhcnQ6ICcgKyBldmVudCk7XG5cdC8vIFJlY2VpdmUgc29uZyBuYW1lIGFuZCBjb21tYW5kIHNlcXVlbmNlLlxuXHQvLyBUT0RPISBHZW5lcmF0ZSBhIG1vdmVtZW50IHN0cmluZyBsaXN0IGZyb20gdGhlIHN1cHBsaWVkIGNvZGUuXG5cblx0Ly8gdmFyIHNvbmdEYXRhRmlsZU5hbWUgPSBldmVudC5kZXRhaWwuc29uZy5zbGljZSgwLC00KSsnLmpzb24nO1xuXHQvLyBjb25zb2xlLmxvZyhzb25nRGF0YUZpbGVOYW1lKTtcblxuXHQvLyB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHQvLyByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgXCIuLi9zb25ncy9cIitzb25nRGF0YUZpbGVOYW1lLCBmYWxzZSk7XG5cdC8vIHJlcXVlc3Quc2VuZChudWxsKTtcblx0Ly8gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Ly8gICBpZiAoIHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMjAwICkge1xuXHQvLyAgICAgdmFyIHNvbmdEYXRhSlNPTiA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHQvLyAgICAgLy8gY29uc29sZS5sb2cobXlfSlNPTl9vYmplY3QpO1xuXHQvLyAgIH1cblx0Ly8gfVxuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ1NldHVwRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdC8vIHNvbmc6ICAgICBldmVudC5kZXRhaWwubmFtZSxcblx0XHQvLyBicG06ICAgICAgZXZlbnQuZGV0YWlsLmJwbSxcblx0XHQvLyBjb21tYW5kczogZXZlbnQuZGV0YWlsLm1vdmVtZW50cyxcblx0XHQvLyBvZmZzZXQ6ICAgZXZlbnQuZGV0YWlsLm9mZnNldCxcblxuXHRcdHNvbmc6ICAgICAnSGlnaHdheSB0byBIZWxsLm1wMycsXG5cdFx0YnBtOiAgICAgIDEwOCxcblx0XHRjb21tYW5kczogbW92ZW1lbnRzLFxuXHRcdG9mZnNldDogICAxMDAwLFxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQpO1xuXHRzb25nV2FzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkOiAnICsgZXZlbnQpO1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdG1vdmVtZW50OiBldmVudC5tb3ZlbWVudCxcblx0XHR0aW1lOiAgICAgZXZlbnQudGltZVxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgfVxuXG4gICAgd3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPblN0YXJ0KTtcblxuICAgIHdzLm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdC8vIHdzLmpzb24uZW1pdCh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSk7XG5cdC8vIHdzLmVtaXQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pKTtcblx0d3MuanNvbi5zZW5kKHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
