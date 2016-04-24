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
				bpm: 108,
				commands: movements,
				offset: 100
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
//# sourceMappingURL=data:application/json;base64,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QUFqOEMsRUFBeThDLE1BQXo4QyxFQUFpOUMsTUFBajlDLEVBQXk5QyxJQUF6OUMsRUFBKzlDLE1BQS85QyxFQUF1K0MsTUFBditDLEVBQSsrQyxNQUEvK0MsRUFBdS9DLE1BQXYvQyxFQUErL0MsTUFBLy9DLENBQWhCOzs7O0FBSUEsVUFBUyxtQkFBVCxDQUE2QixLQUE3QixFQUFvQzs7QUFFdEMsTUFBSSxjQUFKLEVBQW9CO0FBQ3JCLFVBQVEsR0FBUixDQUFZLDBCQUEwQixLQUF0Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkEsTUFBSSxXQUFXLElBQUksV0FBSixDQUNYLGNBRFcsRUFFWCxFQUFDLFFBQVE7Ozs7OztBQU1aLFVBQVUscUJBTkU7QUFPWixTQUFVLEdBUEU7QUFRWixjQUFVLFNBUkU7QUFTWixZQUFVO0FBVEUsSUFBVCxFQUZXLENBQWY7QUFjQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxLQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLG1DQUFqQjtBQUNBLG1CQUFpQixJQUFqQjtBQUNFOztBQUVDLFVBQVMsbUNBQVQsQ0FBNkMsS0FBN0MsRUFBb0Q7QUFDdkQsVUFBUSxHQUFSLENBQVksMENBQTBDLEtBQXREOztBQUVBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxlQURXLEVBRVgsRUFBQyxRQUFRO0FBQ1osY0FBVSxNQUFNLFFBREo7QUFFWixVQUFVLE1BQU07QUFGSixJQUFULEVBRlcsQ0FBZjtBQU9BLFdBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNJOztBQUVELElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsbUJBQWpCOztBQUVBLElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsWUFBVzs7O0FBRy9CLEtBQUcsSUFBSCxDQUFRLElBQVIsQ0FBYSxFQUFDLE1BQU0sU0FBUCxFQUFrQixNQUFNLElBQXhCLEVBQWI7QUFDSSxFQUpEO0FBS0gsQ0F0RUQiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgd3MgPSBpbygpO1xuXG4gICAgLy8gV0FSTklORyFcbiAgICAvLyBIQVJEQ09ERSEhIVxuXG4gICAgdmFyIG1vdmVtZW50cyA9IFtcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIl07XG5cbiAgICAvLyBFTkQgV0FSTklOR1xuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXG4gIGlmIChzb25nV2FzU3RhcnRlZCkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25TdGFydDogJyArIGV2ZW50KTtcblx0Ly8gUmVjZWl2ZSBzb25nIG5hbWUgYW5kIGNvbW1hbmQgc2VxdWVuY2UuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGxpc3QgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblxuXHQvLyB2YXIgc29uZ0RhdGFGaWxlTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nLnNsaWNlKDAsLTQpKycuanNvbic7XG5cdC8vIGNvbnNvbGUubG9nKHNvbmdEYXRhRmlsZU5hbWUpO1xuXG5cdC8vIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdC8vIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBcIi4uL3NvbmdzL1wiK3NvbmdEYXRhRmlsZU5hbWUsIGZhbHNlKTtcblx0Ly8gcmVxdWVzdC5zZW5kKG51bGwpO1xuXHQvLyByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyAgIGlmICggcmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDAgKSB7XG5cdC8vICAgICB2YXIgc29uZ0RhdGFKU09OID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cdC8vICAgICAvLyBjb25zb2xlLmxvZyhteV9KU09OX29iamVjdCk7XG5cdC8vICAgfVxuXHQvLyB9XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0Ly8gc29uZzogICAgIGV2ZW50LmRldGFpbC5uYW1lLFxuXHRcdC8vIGJwbTogICAgICBldmVudC5kZXRhaWwuYnBtLFxuXHRcdC8vIGNvbW1hbmRzOiBldmVudC5kZXRhaWwubW92ZW1lbnRzLFxuXHRcdC8vIG9mZnNldDogICBldmVudC5kZXRhaWwub2Zmc2V0LFxuXG5cdFx0c29uZzogICAgICdIaWdod2F5LXRvLUhlbGwubXAzJyxcblx0XHRicG06ICAgICAgMTA4LFxuXHRcdGNvbW1hbmRzOiBtb3ZlbWVudHMsXG5cdFx0b2Zmc2V0OiAgIDEwMCxcblx0ICAgIH19XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHR3cy5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkKTtcblx0c29uZ1dhc1N0YXJ0ZWQgPSB0cnVlO1xuICB9XG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZChldmVudCkge1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQ6ICcgKyBldmVudCk7XG5cdC8vIFJlY2VpdmUgdXNlciBjb21tYW5kLlxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdDb21hbmRFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0bW92ZW1lbnQ6IGV2ZW50Lm1vdmVtZW50LFxuXHRcdHRpbWU6ICAgICBldmVudC50aW1lXG5cdCAgICB9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICB9XG5cbiAgICB3cy5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uU3RhcnQpO1xuXG4gICAgd3Mub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcblx0Ly8gd3MuanNvbi5lbWl0KHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcblx0Ly8gd3MuZW1pdChKU09OLnN0cmluZ2lmeSh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSkpO1xuXHR3cy5qc29uLnNlbmQoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pO1xuICAgIH0pO1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
