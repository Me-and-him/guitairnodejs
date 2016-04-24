'use strict';

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

	function onGotMessageOnStart(event) {
		console.log('onGotMessageOnStart: ' + event);
		// Receive song name and command sequence.
		// TODO! Generate a movement string list from the supplied code.
		var newEvent = new CustomEvent('agSetupEvent', { detail: {
				song: event.song,
				bpm: event.bpm,
				commands: event.commands,
				offset: event.offset
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbm5lY3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVdBLENBQUMsWUFBVztBQUNSLEtBQUksaUJBQWlCLEtBQXJCO0FBQ0EsS0FBSSxLQUFLLElBQVQ7O0FBRUEsVUFBUyxtQkFBVCxDQUE2QixLQUE3QixFQUFvQztBQUN2QyxVQUFRLEdBQVIsQ0FBWSwwQkFBMEIsS0FBdEM7OztBQUdBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxjQURXLEVBRVgsRUFBQyxRQUFRO0FBQ1osVUFBVSxNQUFNLElBREo7QUFFWixTQUFVLE1BQU0sR0FGSjtBQUdaLGNBQVUsTUFBTSxRQUhKO0FBSVosWUFBVSxNQUFNO0FBSkosSUFBVCxFQUZXLENBQWY7QUFTQSxXQUFTLGFBQVQsQ0FBdUIsUUFBdkI7QUFDQSxLQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLG1DQUFqQjtBQUNBLG1CQUFpQixJQUFqQjtBQUNJOztBQUVELFVBQVMsbUNBQVQsQ0FBNkMsS0FBN0MsRUFBb0Q7QUFDdkQsVUFBUSxHQUFSLENBQVksMENBQTBDLEtBQXREOztBQUVBLE1BQUksV0FBVyxJQUFJLFdBQUosQ0FDWCxlQURXLEVBRVgsRUFBQyxRQUFRO0FBQ1osY0FBVSxNQUFNLFFBREo7QUFFWixVQUFVLE1BQU07QUFGSixJQUFULEVBRlcsQ0FBZjtBQU9BLFdBQVMsYUFBVCxDQUF1QixRQUF2QjtBQUNJOztBQUVELElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsbUJBQWpCOztBQUVBLElBQUcsRUFBSCxDQUFNLFNBQU4sRUFBaUIsWUFBVzs7O0FBRy9CLEtBQUcsSUFBSCxDQUFRLElBQVIsQ0FBYSxFQUFDLE1BQU0sU0FBUCxFQUFrQixNQUFNLElBQXhCLEVBQWI7QUFDSSxFQUpEO0FBS0gsQ0ExQ0QiLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgd3MgPSBpbygpO1xuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25TdGFydDogJyArIGV2ZW50KTtcblx0Ly8gUmVjZWl2ZSBzb25nIG5hbWUgYW5kIGNvbW1hbmQgc2VxdWVuY2UuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGxpc3QgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0c29uZzogICAgIGV2ZW50LnNvbmcsXG5cdFx0YnBtOiAgICAgIGV2ZW50LmJwbSxcblx0XHRjb21tYW5kczogZXZlbnQuY29tbWFuZHMsXG5cdFx0b2Zmc2V0OiAgIGV2ZW50Lm9mZnNldFxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQpO1xuXHRzb25nV2FzU3RhcnRlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkOiAnICsgZXZlbnQpO1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdG1vdmVtZW50OiBldmVudC5tb3ZlbWVudCxcblx0XHR0aW1lOiAgICAgZXZlbnQudGltZVxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgfVxuXG4gICAgd3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPblN0YXJ0KTtcblxuICAgIHdzLm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdC8vIHdzLmpzb24uZW1pdCh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSk7XG5cdC8vIHdzLmVtaXQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pKTtcblx0d3MuanNvbi5zZW5kKHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
