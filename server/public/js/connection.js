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

	var movements = ["pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down", "up", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "pass", "pass", "pass", "pass", "down", "up", "down", "pass", "down", "up", "down", "pass", "down", "pass", "down"];
	movements = movements.map(function (currEl, i, arr) {
		return currEl.toUpperCase();
	});

	// END WARNING

	function onGotMessageOnStart(event) {

		if (songWasStarted) return;
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

				song: 'Highway-to-Hell.mp3',
				bpm: 116,
				commands: movements,
				offset: 200
			} });
		document.dispatchEvent(newEvent);
		ws.on('message', onGotMessageOnConnectionEstablished);
		songWasStarted = true;
	}

	function onGotMessageOnConnectionEstablished(event) {
		console.log('onGotMessageOnConnectionEstablished: ' + event);
		// Receive user command.
		var newEvent = new CustomEvent('agCommandEvent', { detail: {
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
//# sourceMappingURL=data:application/json;base64,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LEVBQW9CLEdBQXBCLEVBQXdCO0FBQ2pELFNBQU8sT0FBTyxXQUFQLEVBQVA7QUFDQSxFQUZXLENBQVo7Ozs7QUFNQSxVQUFTLG1CQUFULENBQTZCLEtBQTdCLEVBQW9DOztBQUV0QyxNQUFJLGNBQUosRUFBb0I7QUFDckIsVUFBUSxHQUFSLENBQVksMEJBQTBCLEtBQXRDOzs7Ozs7Ozs7Ozs7Ozs7OztBQWlCQSxNQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsY0FEVyxFQUVYLEVBQUMsUUFBUTs7Ozs7O0FBTVosVUFBVSxxQkFORTtBQU9aLFNBQVUsR0FQRTtBQVFaLGNBQVUsU0FSRTtBQVNaLFlBQVU7QUFURSxJQUFULEVBRlcsQ0FBZjtBQWNBLFdBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNBLEtBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsbUNBQWpCO0FBQ0EsbUJBQWlCLElBQWpCO0FBQ0U7O0FBRUMsVUFBUyxtQ0FBVCxDQUE2QyxLQUE3QyxFQUFvRDtBQUN2RCxVQUFRLEdBQVIsQ0FBWSwwQ0FBMEMsS0FBdEQ7O0FBRUEsTUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGdCQURXLEVBRVgsRUFBQyxRQUFRO0FBQ1osY0FBVSxNQUFNLFFBREo7QUFFWixVQUFVLE1BQU07QUFGSixJQUFULEVBRlcsQ0FBZjtBQU9BLFdBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNJOztBQUVELElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsbUJBQWpCOztBQUVBLElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsWUFBVzs7O0FBRy9CLEtBQUcsSUFBSCxDQUFRLElBQVIsQ0FBYSxFQUFDLE1BQU0sU0FBUCxFQUFrQixNQUFNLElBQXhCLEVBQWI7QUFDSSxFQUpEO0FBS0gsQ0F6RUQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgd3MgPSBpbygpO1xuXG4gICAgLy8gV0FSTklORyFcbiAgICAvLyBIQVJEQ09ERSEhIVxuXG4gICAgdmFyIG1vdmVtZW50cyA9IFtcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIl07XG4gICAgbW92ZW1lbnRzID0gbW92ZW1lbnRzLm1hcChmdW5jdGlvbihjdXJyRWwsIGksIGFycil7XG4gICAgXHRyZXR1cm4gY3VyckVsLnRvVXBwZXJDYXNlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBFTkQgV0FSTklOR1xuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXG4gIGlmIChzb25nV2FzU3RhcnRlZCkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25TdGFydDogJyArIGV2ZW50KTtcblx0Ly8gUmVjZWl2ZSBzb25nIG5hbWUgYW5kIGNvbW1hbmQgc2VxdWVuY2UuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGxpc3QgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblxuXHQvLyB2YXIgc29uZ0RhdGFGaWxlTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nLnNsaWNlKDAsLTQpKycuanNvbic7XG5cdC8vIGNvbnNvbGUubG9nKHNvbmdEYXRhRmlsZU5hbWUpO1xuXG5cdC8vIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdC8vIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBcIi4uL3NvbmdzL1wiK3NvbmdEYXRhRmlsZU5hbWUsIGZhbHNlKTtcblx0Ly8gcmVxdWVzdC5zZW5kKG51bGwpO1xuXHQvLyByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyAgIGlmICggcmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDAgKSB7XG5cdC8vICAgICB2YXIgc29uZ0RhdGFKU09OID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cdC8vICAgICAvLyBjb25zb2xlLmxvZyhteV9KU09OX29iamVjdCk7XG5cdC8vICAgfVxuXHQvLyB9XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0Ly8gc29uZzogICAgIGV2ZW50LmRldGFpbC5uYW1lLFxuXHRcdC8vIGJwbTogICAgICBldmVudC5kZXRhaWwuYnBtLFxuXHRcdC8vIGNvbW1hbmRzOiBldmVudC5kZXRhaWwubW92ZW1lbnRzLFxuXHRcdC8vIG9mZnNldDogICBldmVudC5kZXRhaWwub2Zmc2V0LFxuXG5cdFx0c29uZzogICAgICdIaWdod2F5LXRvLUhlbGwubXAzJyxcblx0XHRicG06ICAgICAgMTE2LFxuXHRcdGNvbW1hbmRzOiBtb3ZlbWVudHMsXG5cdFx0b2Zmc2V0OiAgIDIwMCxcblx0ICAgIH19XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHR3cy5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkKTtcblx0c29uZ1dhc1N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZChldmVudCkge1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ6ICcgKyBldmVudCk7XG5cdC8vIFJlY2VpdmUgdXNlciBjb21tYW5kLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdDb21tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdG1vdmVtZW50OiBldmVudC5tb3ZlbWVudCxcblx0XHR0aW1lOiAgICAgZXZlbnQudGltZVxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgfVxuXG4gICAgd3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPblN0YXJ0KTtcblxuICAgIHdzLm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdC8vIHdzLmpzb24uZW1pdCh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSk7XG5cdC8vIHdzLmVtaXQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pKTtcblx0d3MuanNvbi5zZW5kKHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
