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
//# sourceMappingURL=data:application/json;base64,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QUksY0FBSixFQUFvQjtBQUNyQixVQUFRLEdBQVIsQ0FBWSwwQkFBMEIsS0FBdEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUJBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxjQURXLEVBRVgsRUFBQyxRQUFROzs7Ozs7QUFNWixVQUFVLHFCQU5FO0FBT1osU0FBVSxHQVBFO0FBUVosY0FBVSxTQVJFO0FBU1osWUFBVTtBQVRFLElBQVQsRUFGVyxDQUFmO0FBY0EsV0FBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0EsS0FBRyxFQUFILENBQU0sU0FBTixFQUFpQixtQ0FBakI7QUFDQSxtQkFBaUIsSUFBakI7QUFDRTs7QUFFQyxVQUFTLG1DQUFULENBQTZDLEtBQTdDLEVBQW9EO0FBQ3ZELFVBQVEsR0FBUixDQUFZLDBDQUEwQyxLQUF0RDs7QUFFQSxNQUFJLFdBQVcsSUFBSSxXQUFKLENBQ1gsZ0JBRFcsRUFFWCxFQUFDLFFBQVE7QUFDWixjQUFVLE1BQU0sUUFESjtBQUVaLFVBQVUsTUFBTTtBQUZKLElBQVQsRUFGVyxDQUFmO0FBT0EsV0FBUyxhQUFULENBQXVCLFFBQXZCO0FBQ0k7O0FBRUQsSUFBRyxFQUFILENBQU0sU0FBTixFQUFpQixtQkFBakI7O0FBRUEsSUFBRyxFQUFILENBQU0sU0FBTixFQUFpQixZQUFXOzs7QUFHL0IsS0FBRyxJQUFILENBQVEsSUFBUixDQUFhLEVBQUMsTUFBTSxTQUFQLEVBQWtCLE1BQU0sSUFBeEIsRUFBYjtBQUNJLEVBSkQ7QUFLSCxDQXRFRCIsImZpbGUiOiJjb25uZWN0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBjb25uZWN0aW9uLmpzXG4gKlxuICogU2V0cyBjb25uZWN0aW9uIHRvIHRoZSBzZXJ2ZXIuXG4gKlxuICogRW1pdHMgJ2FnU2V0dXBFdmVudCcgYW5kICdhZ0NvbW1hbmRFdmVudCcgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGhhbmRsZWQgaW5cbiAqIHRoZSB2aWV3LlxuICogYGBhZ1NldHVwRXZlbnRgYHMgc2V0IHRoZSBzb25nIG5hbWUgYW5kIHRoZSBjb21tYW5kIHNlcXVlbmNlLlxuICogYGBhZ0NvbW1hbmRFdmVudGBgcyBzYXkgd2hpY2ggY29tbWFuZCB1c2VyIHNlbnQuXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIHZhciBzb25nV2FzU3RhcnRlZCA9IGZhbHNlO1xuICAgIHZhciB3cyA9IGlvKCk7XG5cbiAgICAvLyBXQVJOSU5HIVxuICAgIC8vIEhBUkRDT0RFISEhXG5cbiAgICB2YXIgbW92ZW1lbnRzID0gW1wicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiXTtcblxuICAgIC8vIEVORCBXQVJOSU5HXG5cbiAgICBmdW5jdGlvbiBvbkdvdE1lc3NhZ2VPblN0YXJ0KGV2ZW50KSB7XG5cbiAgaWYgKHNvbmdXYXNTdGFydGVkKSByZXR1cm47XG5cdGNvbnNvbGUubG9nKCdvbkdvdE1lc3NhZ2VPblN0YXJ0OiAnICsgZXZlbnQpO1xuXHQvLyBSZWNlaXZlIHNvbmcgbmFtZSBhbmQgY29tbWFuZCBzZXF1ZW5jZS5cblx0Ly8gVE9ETyEgR2VuZXJhdGUgYSBtb3ZlbWVudCBzdHJpbmcgbGlzdCBmcm9tIHRoZSBzdXBwbGllZCBjb2RlLlxuXG5cdC8vIHZhciBzb25nRGF0YUZpbGVOYW1lID0gZXZlbnQuZGV0YWlsLnNvbmcuc2xpY2UoMCwtNCkrJy5qc29uJztcblx0Ly8gY29uc29sZS5sb2coc29uZ0RhdGFGaWxlTmFtZSk7XG5cblx0Ly8gdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcblx0Ly8gcmVxdWVzdC5vcGVuKFwiR0VUXCIsIFwiLi4vc29uZ3MvXCIrc29uZ0RhdGFGaWxlTmFtZSwgZmFsc2UpO1xuXHQvLyByZXF1ZXN0LnNlbmQobnVsbCk7XG5cdC8vIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG5cdC8vICAgaWYgKCByZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDIwMCApIHtcblx0Ly8gICAgIHZhciBzb25nRGF0YUpTT04gPSBKU09OLnBhcnNlKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcblx0Ly8gICAgIC8vIGNvbnNvbGUubG9nKG15X0pTT05fb2JqZWN0KTtcblx0Ly8gICB9XG5cdC8vIH1cblxuXHR2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdCAgICAnYWdTZXR1cEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtcblx0XHQvLyBzb25nOiAgICAgZXZlbnQuZGV0YWlsLm5hbWUsXG5cdFx0Ly8gYnBtOiAgICAgIGV2ZW50LmRldGFpbC5icG0sXG5cdFx0Ly8gY29tbWFuZHM6IGV2ZW50LmRldGFpbC5tb3ZlbWVudHMsXG5cdFx0Ly8gb2Zmc2V0OiAgIGV2ZW50LmRldGFpbC5vZmZzZXQsXG5cblx0XHRzb25nOiAgICAgJ0hpZ2h3YXktdG8tSGVsbC5tcDMnLFxuXHRcdGJwbTogICAgICAxMTYsXG5cdFx0Y29tbWFuZHM6IG1vdmVtZW50cyxcblx0XHRvZmZzZXQ6ICAgMjAwLFxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQpO1xuXHRzb25nV2FzU3RhcnRlZCA9IHRydWU7XG4gIH1cblxuICAgIGZ1bmN0aW9uIG9uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkKGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKCdvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZDogJyArIGV2ZW50KTtcblx0Ly8gUmVjZWl2ZSB1c2VyIGNvbW1hbmQuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ0NvbW1hbmRFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0bW92ZW1lbnQ6IGV2ZW50Lm1vdmVtZW50LFxuXHRcdHRpbWU6ICAgICBldmVudC50aW1lXG5cdCAgICB9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcbiAgICB9XG5cbiAgICB3cy5vbignbWVzc2FnZScsIG9uR290TWVzc2FnZU9uU3RhcnQpO1xuXG4gICAgd3Mub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcblx0Ly8gd3MuanNvbi5lbWl0KHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcblx0Ly8gd3MuZW1pdChKU09OLnN0cmluZ2lmeSh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSkpO1xuXHR3cy5qc29uLnNlbmQoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pO1xuICAgIH0pO1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
