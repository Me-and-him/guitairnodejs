'use strict';

/*!
 *  howler.js v1.1.29
 *  howlerjs.com
 *
 *  (c) 2013-2016, James Simpson of GoldFire Studios
 *  goldfirestudios.com
 *
 *  MIT License
 */

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

!function () {
	var e = {},
	    o = null,
	    n = !0,
	    r = !1;try {
		"undefined" != typeof AudioContext ? o = new AudioContext() : "undefined" != typeof webkitAudioContext ? o = new webkitAudioContext() : n = !1;
	} catch (t) {
		n = !1;
	}if (!n) if ("undefined" != typeof Audio) try {
		new Audio();
	} catch (t) {
		r = !0;
	} else r = !0;if (n) {
		var a = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain();a.gain.value = 1, a.connect(o.destination);
	}var i = function i(e) {
		this._volume = 1, this._muted = !1, this.usingWebAudio = n, this.ctx = o, this.noAudio = r, this._howls = [], this._codecs = e, this.iOSAutoEnable = !0;
	};i.prototype = { volume: function volume(e) {
			var o = this;if (e = parseFloat(e), e >= 0 && 1 >= e) {
				o._volume = e, n && (a.gain.value = e);for (var r in o._howls) {
					if (o._howls.hasOwnProperty(r) && o._howls[r]._webAudio === !1) for (var t = 0; t < o._howls[r]._audioNode.length; t++) {
						o._howls[r]._audioNode[t].volume = o._howls[r]._volume * o._volume;
					}
				}return o;
			}return n ? a.gain.value : o._volume;
		}, mute: function mute() {
			return this._setMuted(!0), this;
		}, unmute: function unmute() {
			return this._setMuted(!1), this;
		}, _setMuted: function _setMuted(e) {
			var o = this;o._muted = e, n && (a.gain.value = e ? 0 : o._volume);for (var r in o._howls) {
				if (o._howls.hasOwnProperty(r) && o._howls[r]._webAudio === !1) for (var t = 0; t < o._howls[r]._audioNode.length; t++) {
					o._howls[r]._audioNode[t].muted = e;
				}
			}
		}, codecs: function codecs(e) {
			return this._codecs[e];
		}, _enableiOSAudio: function _enableiOSAudio() {
			var e = this;if (!o || !e._iOSEnabled && /iPhone|iPad|iPod/i.test(navigator.userAgent)) {
				e._iOSEnabled = !1;var n = function n() {
					var r = o.createBuffer(1, 1, 22050),
					    t = o.createBufferSource();t.buffer = r, t.connect(o.destination), "undefined" == typeof t.start ? t.noteOn(0) : t.start(0), setTimeout(function () {
						(t.playbackState === t.PLAYING_STATE || t.playbackState === t.FINISHED_STATE) && (e._iOSEnabled = !0, e.iOSAutoEnable = !1, window.removeEventListener("touchend", n, !1));
					}, 0);
				};return window.addEventListener("touchend", n, !1), e;
			}
		} };var u = null,
	    d = {};r || (u = new Audio(), d = { mp3: !!u.canPlayType("audio/mpeg;").replace(/^no$/, ""), opus: !!u.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""), ogg: !!u.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), wav: !!u.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), aac: !!u.canPlayType("audio/aac;").replace(/^no$/, ""), m4a: !!(u.canPlayType("audio/x-m4a;") || u.canPlayType("audio/m4a;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""), mp4: !!(u.canPlayType("audio/x-mp4;") || u.canPlayType("audio/mp4;") || u.canPlayType("audio/aac;")).replace(/^no$/, ""), weba: !!u.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "") });var l = new i(d),
	    f = function f(e) {
		var r = this;r._autoplay = e.autoplay || !1, r._buffer = e.buffer || !1, r._duration = e.duration || 0, r._format = e.format || null, r._loop = e.loop || !1, r._loaded = !1, r._sprite = e.sprite || {}, r._src = e.src || "", r._pos3d = e.pos3d || [0, 0, -.5], r._volume = void 0 !== e.volume ? e.volume : 1, r._urls = e.urls || [], r._rate = e.rate || 1, r._model = e.model || null, r._onload = [e.onload || function () {}], r._onloaderror = [e.onloaderror || function () {}], r._onend = [e.onend || function () {}], r._onpause = [e.onpause || function () {}], r._onplay = [e.onplay || function () {}], r._onendTimer = [], r._webAudio = n && !r._buffer, r._audioNode = [], r._webAudio && r._setupAudioNode(), "undefined" != typeof o && o && l.iOSAutoEnable && l._enableiOSAudio(), l._howls.push(r), r.load();
	};if (f.prototype = { load: function load() {
			var e = this,
			    o = null;if (r) return void e.on("loaderror", new Error("No audio support."));for (var n = 0; n < e._urls.length; n++) {
				var t, a;if (e._format) t = e._format;else {
					if (a = e._urls[n], t = /^data:audio\/([^;,]+);/i.exec(a), t || (t = /\.([^.]+)$/.exec(a.split("?", 1)[0])), !t) return void e.on("loaderror", new Error("Could not extract format from passed URLs, please add format parameter."));t = t[1].toLowerCase();
				}if (d[t]) {
					o = e._urls[n];break;
				}
			}if (!o) return void e.on("loaderror", new Error("No codec support for selected audio sources."));if (e._src = o, e._webAudio) s(e, o);else {
				var u = new Audio();u.addEventListener("error", function () {
					u.error && 4 === u.error.code && (i.noAudio = !0), e.on("loaderror", { type: u.error ? u.error.code : 0 });
				}, !1), e._audioNode.push(u), u.src = o, u._pos = 0, u.preload = "auto", u.volume = l._muted ? 0 : e._volume * l.volume();var f = function f() {
					e._duration = Math.ceil(10 * u.duration) / 10, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = { _default: [0, 1e3 * e._duration] }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play(), u.removeEventListener("canplaythrough", f, !1);
				};u.addEventListener("canplaythrough", f, !1), u.load();
			}return e;
		}, urls: function urls(e) {
			var o = this;return e ? (o.stop(), o._urls = "string" == typeof e ? [e] : e, o._loaded = !1, o.load(), o) : o._urls;
		}, play: function play(e, n) {
			var r = this;return "function" == typeof e && (n = e), e && "function" != typeof e || (e = "_default"), r._loaded ? r._sprite[e] ? (r._inactiveNode(function (t) {
				t._sprite = e;var a = t._pos > 0 ? t._pos : r._sprite[e][0] / 1e3,
				    i = 0;r._webAudio ? (i = r._sprite[e][1] / 1e3 - t._pos, t._pos > 0 && (a = r._sprite[e][0] / 1e3 + a)) : i = r._sprite[e][1] / 1e3 - (a - r._sprite[e][0] / 1e3);var u,
				    d = !(!r._loop && !r._sprite[e][2]),
				    f = "string" == typeof n ? n : Math.round(Date.now() * Math.random()) + "";if (function () {
					var o = { id: f, sprite: e, loop: d };u = setTimeout(function () {
						!r._webAudio && d && r.stop(o.id).play(e, o.id), r._webAudio && !d && (r._nodeById(o.id).paused = !0, r._nodeById(o.id)._pos = 0, r._clearEndTimer(o.id)), r._webAudio || d || r.stop(o.id), r.on("end", f);
					}, i / r._rate * 1e3), r._onendTimer.push({ timer: u, id: o.id });
				}(), r._webAudio) {
					var s = r._sprite[e][0] / 1e3,
					    _ = r._sprite[e][1] / 1e3;t.id = f, t.paused = !1, p(r, [d, s, _], f), r._playStart = o.currentTime, t.gain.value = r._volume, "undefined" == typeof t.bufferSource.start ? d ? t.bufferSource.noteGrainOn(0, a, 86400) : t.bufferSource.noteGrainOn(0, a, i) : d ? t.bufferSource.start(0, a, 86400) : t.bufferSource.start(0, a, i);
				} else {
					if (4 !== t.readyState && (t.readyState || !navigator.isCocoonJS)) return r._clearEndTimer(f), function () {
						var o = r,
						    a = e,
						    i = n,
						    u = t,
						    d = function d() {
							o.play(a, i), u.removeEventListener("canplaythrough", d, !1);
						};u.addEventListener("canplaythrough", d, !1);
					}(), r;t.readyState = 4, t.id = f, t.currentTime = a, t.muted = l._muted || t.muted, t.volume = r._volume * l.volume(), setTimeout(function () {
						t.play();
					}, 0);
				}return r.on("play"), "function" == typeof n && n(f), r;
			}), r) : ("function" == typeof n && n(), r) : (r.on("load", function () {
				r.play(e, n);
			}), r);
		}, pause: function pause(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.pause(e);
			}), o;o._clearEndTimer(e);var n = e ? o._nodeById(e) : o._activeNode();if (n) if (n._pos = o.pos(null, e), o._webAudio) {
				if (!n.bufferSource || n.paused) return o;n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
			} else n.pause();return o.on("pause"), o;
		}, stop: function stop(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.stop(e);
			}), o;o._clearEndTimer(e);var n = e ? o._nodeById(e) : o._activeNode();if (n) if (n._pos = 0, o._webAudio) {
				if (!n.bufferSource || n.paused) return o;n.paused = !0, "undefined" == typeof n.bufferSource.stop ? n.bufferSource.noteOff(0) : n.bufferSource.stop(0);
			} else isNaN(n.duration) || (n.pause(), n.currentTime = 0);return o;
		}, mute: function mute(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.mute(e);
			}), o;var n = e ? o._nodeById(e) : o._activeNode();return n && (o._webAudio ? n.gain.value = 0 : n.muted = !0), o;
		}, unmute: function unmute(e) {
			var o = this;if (!o._loaded) return o.on("play", function () {
				o.unmute(e);
			}), o;var n = e ? o._nodeById(e) : o._activeNode();return n && (o._webAudio ? n.gain.value = o._volume : n.muted = !1), o;
		}, volume: function volume(e, o) {
			var n = this;if (e = parseFloat(e), e >= 0 && 1 >= e) {
				if (n._volume = e, !n._loaded) return n.on("play", function () {
					n.volume(e, o);
				}), n;var r = o ? n._nodeById(o) : n._activeNode();return r && (n._webAudio ? r.gain.value = e : r.volume = e * l.volume()), n;
			}return n._volume;
		}, loop: function loop(e) {
			var o = this;return "boolean" == typeof e ? (o._loop = e, o) : o._loop;
		}, sprite: function sprite(e) {
			var o = this;return "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? (o._sprite = e, o) : o._sprite;
		}, pos: function pos(e, n) {
			var r = this;if (!r._loaded) return r.on("load", function () {
				r.pos(e);
			}), "number" == typeof e ? r : r._pos || 0;e = parseFloat(e);var t = n ? r._nodeById(n) : r._activeNode();if (t) return e >= 0 ? (r.pause(n), t._pos = e, r.play(t._sprite, n), r) : r._webAudio ? t._pos + (o.currentTime - r._playStart) : t.currentTime;if (e >= 0) return r;for (var a = 0; a < r._audioNode.length; a++) {
				if (r._audioNode[a].paused && 4 === r._audioNode[a].readyState) return r._webAudio ? r._audioNode[a]._pos : r._audioNode[a].currentTime;
			}
		}, pos3d: function pos3d(e, o, n, r) {
			var t = this;if (o = "undefined" != typeof o && o ? o : 0, n = "undefined" != typeof n && n ? n : -.5, !t._loaded) return t.on("play", function () {
				t.pos3d(e, o, n, r);
			}), t;if (!(e >= 0 || 0 > e)) return t._pos3d;if (t._webAudio) {
				var a = r ? t._nodeById(r) : t._activeNode();a && (t._pos3d = [e, o, n], a.panner.setPosition(e, o, n), a.panner.panningModel = t._model || "HRTF");
			}return t;
		}, fade: function fade(e, o, n, r, t) {
			var a = this,
			    i = Math.abs(e - o),
			    u = e > o ? "down" : "up",
			    d = i / .01,
			    l = n / d;if (!a._loaded) return a.on("load", function () {
				a.fade(e, o, n, r, t);
			}), a;a.volume(e, t);for (var f = 1; d >= f; f++) {
				!function () {
					var e = a._volume + ("up" === u ? .01 : -.01) * f,
					    n = Math.round(1e3 * e) / 1e3,
					    i = o;setTimeout(function () {
						a.volume(n, t), n === i && r && r();
					}, l * f);
				}();
			}
		}, fadeIn: function fadeIn(e, o, n) {
			return this.volume(0).play().fade(0, e, o, n);
		}, fadeOut: function fadeOut(e, o, n, r) {
			var t = this;return t.fade(t._volume, e, o, function () {
				n && n(), t.pause(r), t.on("end");
			}, r);
		}, _nodeById: function _nodeById(e) {
			for (var o = this, n = o._audioNode[0], r = 0; r < o._audioNode.length; r++) {
				if (o._audioNode[r].id === e) {
					n = o._audioNode[r];break;
				}
			}return n;
		}, _activeNode: function _activeNode() {
			for (var e = this, o = null, n = 0; n < e._audioNode.length; n++) {
				if (!e._audioNode[n].paused) {
					o = e._audioNode[n];break;
				}
			}return e._drainPool(), o;
		}, _inactiveNode: function _inactiveNode(e) {
			for (var o = this, n = null, r = 0; r < o._audioNode.length; r++) {
				if (o._audioNode[r].paused && 4 === o._audioNode[r].readyState) {
					e(o._audioNode[r]), n = !0;break;
				}
			}if (o._drainPool(), !n) {
				var t;if (o._webAudio) t = o._setupAudioNode(), e(t);else {
					o.load(), t = o._audioNode[o._audioNode.length - 1];var a = navigator.isCocoonJS ? "canplaythrough" : "loadedmetadata",
					    i = function i() {
						t.removeEventListener(a, i, !1), e(t);
					};t.addEventListener(a, i, !1);
				}
			}
		}, _drainPool: function _drainPool() {
			var e,
			    o = this,
			    n = 0;for (e = 0; e < o._audioNode.length; e++) {
				o._audioNode[e].paused && n++;
			}for (e = o._audioNode.length - 1; e >= 0 && !(5 >= n); e--) {
				o._audioNode[e].paused && (o._webAudio && o._audioNode[e].disconnect(0), n--, o._audioNode.splice(e, 1));
			}
		}, _clearEndTimer: function _clearEndTimer(e) {
			for (var o = this, n = -1, r = 0; r < o._onendTimer.length; r++) {
				if (o._onendTimer[r].id === e) {
					n = r;break;
				}
			}var t = o._onendTimer[n];t && (clearTimeout(t.timer), o._onendTimer.splice(n, 1));
		}, _setupAudioNode: function _setupAudioNode() {
			var e = this,
			    n = e._audioNode,
			    r = e._audioNode.length;return n[r] = "undefined" == typeof o.createGain ? o.createGainNode() : o.createGain(), n[r].gain.value = e._volume, n[r].paused = !0, n[r]._pos = 0, n[r].readyState = 4, n[r].connect(a), n[r].panner = o.createPanner(), n[r].panner.panningModel = e._model || "equalpower", n[r].panner.setPosition(e._pos3d[0], e._pos3d[1], e._pos3d[2]), n[r].panner.connect(n[r]), n[r];
		}, on: function on(e, o) {
			var n = this,
			    r = n["_on" + e];if ("function" == typeof o) r.push(o);else for (var t = 0; t < r.length; t++) {
				o ? r[t].call(n, o) : r[t].call(n);
			}return n;
		}, off: function off(e, o) {
			var n = this,
			    r = n["_on" + e];if (o) {
				for (var t = 0; t < r.length; t++) {
					if (o === r[t]) {
						r.splice(t, 1);break;
					}
				}
			} else n["_on" + e] = [];return n;
		}, unload: function unload() {
			for (var o = this, n = o._audioNode, r = 0; r < o._audioNode.length; r++) {
				n[r].paused || (o.stop(n[r].id), o.on("end", n[r].id)), o._webAudio ? n[r].disconnect(0) : n[r].src = "";
			}for (r = 0; r < o._onendTimer.length; r++) {
				clearTimeout(o._onendTimer[r].timer);
			}var t = l._howls.indexOf(o);null !== t && t >= 0 && l._howls.splice(t, 1), delete e[o._src], o = null;
		} }, n) var s = function s(o, n) {
		if (n in e) return o._duration = e[n].duration, void c(o);if (/^data:[^;]+;base64,/.test(n)) {
			for (var r = atob(n.split(",")[1]), t = new Uint8Array(r.length), a = 0; a < r.length; ++a) {
				t[a] = r.charCodeAt(a);
			}_(t.buffer, o, n);
		} else {
			var i = new XMLHttpRequest();i.open("GET", n, !0), i.responseType = "arraybuffer", i.onload = function () {
				_(i.response, o, n);
			}, i.onerror = function () {
				o._webAudio && (o._buffer = !0, o._webAudio = !1, o._audioNode = [], delete o._gainNode, delete e[n], o.load());
			};try {
				i.send();
			} catch (u) {
				i.onerror();
			}
		}
	},
	    _ = function _(n, r, t) {
		o.decodeAudioData(n, function (o) {
			o && (e[t] = o, c(r, o));
		}, function (e) {
			r.on("loaderror", e);
		});
	},
	    c = function c(e, o) {
		e._duration = o ? o.duration : e._duration, 0 === Object.getOwnPropertyNames(e._sprite).length && (e._sprite = { _default: [0, 1e3 * e._duration] }), e._loaded || (e._loaded = !0, e.on("load")), e._autoplay && e.play();
	},
	    p = function p(n, r, t) {
		var a = n._nodeById(t);a.bufferSource = o.createBufferSource(), a.bufferSource.buffer = e[n._src], a.bufferSource.connect(a.panner), a.bufferSource.loop = r[0], r[0] && (a.bufferSource.loopStart = r[1], a.bufferSource.loopEnd = r[1] + r[2]), a.bufferSource.playbackRate.value = n._rate;
	};"function" == typeof define && define.amd && define(function () {
		return { Howler: l, Howl: f };
	}), "undefined" != typeof exports && (exports.Howler = l, exports.Howl = f), "undefined" != typeof window && (window.Howler = l, window.Howl = f);
}();

;
//
//	Utils
//
// * animate(cb, duraton) -- wrapper of requestAnimationFrame
//
// DOM manipulations
//
// * closePopup(event) -- close popup with users unique code
// * onVolumeBtnClick(event) -- handler for volume buttons clicks (mute/unmute trigger)
// * onVolumeSliderInput(event) -- change audio volume whenvolume slider is being moved
// * updateScore(number) -- update current score
//
//	Canvas
//
// * refreshComputedSizes(object) -- change <canvas> sizes to actual
// * addMovementOnCanvas(movementInfo) -- add new movement canvas-object
// * animateMovement(object) -- make recieved already added movement run (animate)
// * onAgSetupEvent(event) -- handler for event, fired when game settings are recieved
//
// To remove
//
// * start() -- start game
// * nextBeat(isFirst) -- process (and add) next movement
//
// Initialization
//

(function () {

	function animate(draw, duration) {
		var start = performance.now();

		requestAnimationFrame(function animate(time) {
			// определить, сколько прошло времени с начала анимации
			var timePassed = time - start;

			// возможно небольшое превышение времени, в этом случае зафиксировать конец
			if (timePassed > duration) timePassed = duration;

			// нарисовать состояние анимации в момент timePassed
			draw(timePassed);

			// если время анимации не закончилось - запланировать ещё кадр
			if (timePassed < duration) {
				requestAnimationFrame(animate);
			}
		});
	}

	var config = {
		colors: {
			neutral: '#FFA700', // #8D99AE #107E7D
			success: '#C2E812',
			fail: '#B80C09'
		},
		movements: {
			radiusPercent: 4,
			strokeWidthPercent: 0.5
		}
	};

	function closePopup(event) {
		document.querySelectorAll('.popup')[0].classList.add('closed');
		document.querySelectorAll('.logo')[0].classList.remove('with-popup');
	}

	// Mutes / unmutes audio
	function onVolumeBtnClick(event) {

		if (!config.currentAudio.muted) {

			// Change view
			this.childNodes[1].classList.remove('fa-volume-up');
			this.childNodes[1].classList.add('fa-volume-off');

			// Mute
			config.currentAudio.mute();
			config.currentAudio.muted = true;
		} else {

			// Change view
			this.childNodes[1].classList.remove('fa-volume-off');
			this.childNodes[1].classList.add('fa-volume-up');

			// Unmute
			config.currentAudio.unmute();
			config.currentAudio.muted = false;
		}
	}

	// Change volume level of current audio
	function onVolumeSliderInput(event) {
		config.currentAudio.volume(this.value / 100);
	}

	function updateScore(newScore) {

		var score = document.querySelectorAll('.score')[0];
		var scoreNumber = document.querySelectorAll('.score-number')[0];

		score.classList.add('update');
		setTimeout(function () {
			score.classList.remove('update');
		}, 400);

		config.currentScore = parseInt(newScore);
		scoreNumber.innerHTML = config.currentScore;

		return config.currentScore;
	}

	// **********
	// * CANVAS *
	// **********

	// Changes canvas background size when fired
	function refreshComputedSizes(object) {

		config.canvOpts.computedStyle = {
			width: +object.width.slice(0, -2),
			height: +object.height.slice(0, -2)
		};

		canvas.setDimensions({
			width: config.canvOpts.computedStyle.width,
			height: config.canvOpts.computedStyle.height
		});
	}

	function addMovementOnCanvas(movementInfo) {

		if (movementInfo.name == 'pass') return;

		var radius = config.canvOpts.movements.radius;
		var strokeWidth = config.canvOpts.movements.strokeWidth;
		// var x = Math.round(config.canvOpts.computedStyle.width - (config.canvOpts.computedStyle.width/100)*3) - radius*2;
		var x = Math.round(config.canvOpts.computedStyle.width);
		var y = Math.round(config.oneHPercent * 45) + config.canvOpts.movements.strokeWidth * 1.6;

		var circle = new fabric.Circle({
			fill: config.colors.neutral,
			stroke: '#FFFFFF',
			strokeWidth: strokeWidth,
			radius: radius,
			originY: 'center',
			originX: 'center'
		});

		// console.log(-circle.getRadiusX()*0.8);
		var arrow;

		switch (movementInfo.name) {
			case 'up':
				arrow = new fabric.Path("\n\t\t\t\tM " + -circle.getRadiusX() * 0.65 + " " + circle.getRadiusY() * 0.11 + "\n\t\t\t\tL 0 " + -circle.getRadiusY() * 0.55 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.65 + " " + circle.getRadiusY() * 0.11 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.5 + " " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tL 0 " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.5 + " " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tz", {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;

			case 'down':
				arrow = new fabric.Path("\n\t\t\t\tM " + circle.getRadiusX() * 0.65 + " " + -circle.getRadiusY() * 0.11 + "\n\t\t\t\tL 0 " + circle.getRadiusY() * 0.55 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.65 + " " + -circle.getRadiusY() * 0.11 + "\n\t\t\t\tL " + -circle.getRadiusX() * 0.5 + " " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tL 0 " + circle.getRadiusY() * 0.25 + "\n\t\t\t\tL " + circle.getRadiusX() * 0.5 + " " + -circle.getRadiusY() * 0.25 + "\n\t\t\t\tz", {
					// fill: '#fff',
					originY: 'center',
					originX: 'center'
				});
				break;
		}

		var movement = new fabric.Group([circle, arrow], {
			top: y,
			left: x
		});

		movementInfo.canvasObject = movement;

		canvas.add(movement);
		canvas.renderAll();
		// movementInfo.state = 'added';
	}

	function animateMovement(movementInfo) {

		// if (movementInfo.name == 'pass') return;

		movementInfo.canvasObject.animate('left', '' + (config.oneWPercent * 20 + config.canvOpts.movements.strokeWidth * 1.5), {
			onChange: canvas.renderAll.bind(canvas),
			duration: config.currentMinInterval * 4
		});
	}

	function onGlSetupEvent(event) {
		config.currentBpm = event.detail.bpm;
		config.currentMinInterval = 60000 / config.currentBpm;
		config.currentSongName = event.detail.song;
		config.currentAudio = event.detail.music;
		closePopup();
		console.log(event.detail.bpm);

		// Test
		config.currentAudio.play();
	}

	// Actions performed when current game settings recieved
	function onGlAddMovement(event) {

		config.currentMovements.push({ name: event.detail });
		var thisMovement = config.currentMovements[config.currentMovements.length - 1];

		if (thisMovement.name == 'pass') return;

		addMovementOnCanvas(thisMovement);
		animateMovement(thisMovement);
	}

	function onGlStatus(event) {

		var status = event.detail.status;
		var movementIndex = event.detail.index;
		var newScore = event.detail.newScore;

		if (config.currentMovements[movementIndex].name == 'pass') return;

		var canvObj = config.currentMovements[movementIndex].canvasObject;

		// Run canvas animation
		canvObj.set({
			fill: config.colors[status]
		});

		// centeredScaling: true
		switch (status) {
			case 'success':
				canvObj.animate({
					'scaleX': 6,
					'scaleY': 6,
					'opacity': 0,
					'left': '-=' + config.canvOpts.movements.radius * 5.2,
					'top': '-=' + config.canvOpts.movements.radius * 5.2
				}, {
					onChange: canvas.renderAll.bind(canvas),
					duration: 700,
					easing: fabric.util.ease.easeOutQuart
				});
				break;

			case 'fail':
				canvObj.animate({
					'scaleX': 0.8,
					'scaleY': 0.8,
					'opacity': 0,
					'left': '' + -config.canvOpts.movements.radius
				}, // 'top': '-='+config.canvOpts.movements.radius
				{
					onChange: canvas.renderAll.bind(canvas),
					duration: 1000
				});
				// easing: fabric.util.ease.easeOutQuart
				break;
		}

		// Update score
		updateScore(newScore);
	}

	// ********
	// * Init *
	// ********

	config.currentMovements = [];
	config.currentScore = 0;
	config.currentStartDate = 0;

	// Get computed styles of whole page wrapper
	var canvasComputedStyleObj = getComputedStyle(document.querySelectorAll('.wr')[0]);

	// Set canvas options
	config.oneWPercent = parseInt(canvasComputedStyleObj.width.slice(0, -2)) / 100;
	config.oneHPercent = parseInt(canvasComputedStyleObj.height.slice(0, -2)) / 100;

	config.canvOpts = {
		bgURL: '../img/bg-crowd-1.jpg',
		computedStyle: {
			width: config.oneWPercent * 100,
			height: config.oneHPercent * 100
		},
		movements: {
			radius: config.oneWPercent * config.movements.radiusPercent,
			strokeWidth: config.oneWPercent * config.movements.strokeWidthPercent
		}
	};

	// Initialize 'fabric' canvas obj
	var canvas = new fabric.StaticCanvas('game', {
		width: config.canvOpts.computedStyle.width,
		height: config.canvOpts.computedStyle.height
	});

	// Draw "perfect success" place shadow circle
	config.shadowCircle = new fabric.Circle({
		fill: 'rgba(200,200,200,0.2)',
		stroke: 'rgba(200,200,200,1)',
		strokeWidth: config.canvOpts.movements.strokeWidth * 2,
		radius: config.canvOpts.movements.radius + config.canvOpts.movements.strokeWidth,
		top: Math.round(config.oneHPercent * 45),
		left: config.oneWPercent * 20
	});
	canvas.add(config.shadowCircle);

	// Set handler for adding of next movement in queue
	document.addEventListener('glAddMovement', onGlAddMovement);

	// Set handler for movement result event
	document.addEventListener('glStatus', onGlStatus);

	// Set handler for game setup event
	document.addEventListener('glSetupEvent', onGlSetupEvent);

	// Show current game code
	var codeContainer = document.getElementById('code-container');
	codeContainer.innerHTML = code;

	// *********
	// * Audio *
	// *********

	// Add muted state saving feature to Howl (audio lib)
	Howl.prototype.muted = false;
	Howl.muted = false;

	// Get volume button element
	var volumeBtn = document.querySelectorAll('.volume-btn')[0];
	// and set onClick event handler
	volumeBtn.addEventListener('click', onVolumeBtnClick);

	// Get volume level slider
	var volumeSlider = document.querySelectorAll('.volume-input')[0];
	// and set onInput event handler
	volumeSlider.addEventListener('input', onVolumeSliderInput);

	// Change canvas background size on window resize
	window.onresize = function () {
		refreshComputedSizes(canvasComputedStyleObj);
		canvas.renderAll.bind(canvas);
	};

	// TEST
	// document.addEventListener('click', closePopup);
})();
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
		var audioFileURL = 'http://' + window.location.hostname + 'songs/' + event.detail.song;
		// let audioFileURL = '../audio/' + event.detail.song;
		console.log('audio file url: ' + audioFileURL);
		config.audio = new Howl({
			urls: [audioFileURL],
			autoplay: false,
			volume: 0.8
		});
		// Generate new event for the view.
		var newEvent = new CustomEvent('glSetupEvent', { detail: { song: event.detail.song, bpm: event.detail.bpm, commands: event.detail.commands, music: config.audio } });
		document.dispatchEvent(newEvent);
		// BPM, minInterval, beginning offset
		config.bpm = event.detail.bpm;
		config.minInterval = 60000 / config.bpm;
		config.beginningOffset = event.detail.offset;
		// Start.
		config.score = 0;
		config.startDate = Date.now();
		config.displayedIndex = 0;
		config.lastReceivedIndex = 0;
		config.lastPerformedAction = undefined;
		function sendMovement() {
			// Set deciding the status in the future.
			setTimeout(function () {
				//var index = Math.round((config.lastPerformedAction.time - config.startDate - config.beginningOffset) / config.minInterval);
				var index = config.displayedIndex - 4;
				var valid = config.lastPerformedAction.movement == config.movements[index] && Math.abs(config.lastPerformedAction.time - Date.now()) < config.minInterval / 2;
				if (valid) {
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
				config.lastPerformedAction = 'pass';
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

	function onAgCommandEvent(event) {
		// console.log('agCommandEvent: ' + JSON.stringify(event.detail));
		if (event.detail.movement == 'stop') clearInterval(config.timer);
		config.lastPerformedAction = event.detail;
	}

	document.addEventListener('agSetupEvent', onAgSetupEvent);
	document.addEventListener('agCommandEvent', onAgCommandEvent);
})();
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
//# sourceMappingURL=data:application/json;base64,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LENBQVEsSUFBUixDQUFhLEVBQUMsTUFBTSxTQUFQLEVBQWtCLE1BQU0sSUFBeEIsRUFBYjtBQUNJLEVBSkQ7QUFLSCxDQXRFRCIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyohXG4gKiAgaG93bGVyLmpzIHYxLjEuMjlcbiAqICBob3dsZXJqcy5jb21cbiAqXG4gKiAgKGMpIDIwMTMtMjAxNiwgSmFtZXMgU2ltcHNvbiBvZiBHb2xkRmlyZSBTdHVkaW9zXG4gKiAgZ29sZGZpcmVzdHVkaW9zLmNvbVxuICpcbiAqICBNSVQgTGljZW5zZVxuICovXG4hZnVuY3Rpb24oKXt2YXIgZT17fSxvPW51bGwsbj0hMCxyPSExO3RyeXtcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW9Db250ZXh0P289bmV3IEF1ZGlvQ29udGV4dDpcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2Via2l0QXVkaW9Db250ZXh0P289bmV3IHdlYmtpdEF1ZGlvQ29udGV4dDpuPSExfWNhdGNoKHQpe249ITF9aWYoIW4paWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEF1ZGlvKXRyeXtuZXcgQXVkaW99Y2F0Y2godCl7cj0hMH1lbHNlIHI9ITA7aWYobil7dmFyIGE9XCJ1bmRlZmluZWRcIj09dHlwZW9mIG8uY3JlYXRlR2Fpbj9vLmNyZWF0ZUdhaW5Ob2RlKCk6by5jcmVhdGVHYWluKCk7YS5nYWluLnZhbHVlPTEsYS5jb25uZWN0KG8uZGVzdGluYXRpb24pfXZhciBpPWZ1bmN0aW9uKGUpe3RoaXMuX3ZvbHVtZT0xLHRoaXMuX211dGVkPSExLHRoaXMudXNpbmdXZWJBdWRpbz1uLHRoaXMuY3R4PW8sdGhpcy5ub0F1ZGlvPXIsdGhpcy5faG93bHM9W10sdGhpcy5fY29kZWNzPWUsdGhpcy5pT1NBdXRvRW5hYmxlPSEwfTtpLnByb3RvdHlwZT17dm9sdW1lOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoZT1wYXJzZUZsb2F0KGUpLGU+PTAmJjE+PWUpe28uX3ZvbHVtZT1lLG4mJihhLmdhaW4udmFsdWU9ZSk7Zm9yKHZhciByIGluIG8uX2hvd2xzKWlmKG8uX2hvd2xzLmhhc093blByb3BlcnR5KHIpJiZvLl9ob3dsc1tyXS5fd2ViQXVkaW89PT0hMSlmb3IodmFyIHQ9MDt0PG8uX2hvd2xzW3JdLl9hdWRpb05vZGUubGVuZ3RoO3QrKylvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlW3RdLnZvbHVtZT1vLl9ob3dsc1tyXS5fdm9sdW1lKm8uX3ZvbHVtZTtyZXR1cm4gb31yZXR1cm4gbj9hLmdhaW4udmFsdWU6by5fdm9sdW1lfSxtdXRlOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuX3NldE11dGVkKCEwKSx0aGlzfSx1bm11dGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc2V0TXV0ZWQoITEpLHRoaXN9LF9zZXRNdXRlZDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO28uX211dGVkPWUsbiYmKGEuZ2Fpbi52YWx1ZT1lPzA6by5fdm9sdW1lKTtmb3IodmFyIHIgaW4gby5faG93bHMpaWYoby5faG93bHMuaGFzT3duUHJvcGVydHkocikmJm8uX2hvd2xzW3JdLl93ZWJBdWRpbz09PSExKWZvcih2YXIgdD0wO3Q8by5faG93bHNbcl0uX2F1ZGlvTm9kZS5sZW5ndGg7dCsrKW8uX2hvd2xzW3JdLl9hdWRpb05vZGVbdF0ubXV0ZWQ9ZX0sY29kZWNzOmZ1bmN0aW9uKGUpe3JldHVybiB0aGlzLl9jb2RlY3NbZV19LF9lbmFibGVpT1NBdWRpbzpmdW5jdGlvbigpe3ZhciBlPXRoaXM7aWYoIW98fCFlLl9pT1NFbmFibGVkJiYvaVBob25lfGlQYWR8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpe2UuX2lPU0VuYWJsZWQ9ITE7dmFyIG49ZnVuY3Rpb24oKXt2YXIgcj1vLmNyZWF0ZUJ1ZmZlcigxLDEsMjIwNTApLHQ9by5jcmVhdGVCdWZmZXJTb3VyY2UoKTt0LmJ1ZmZlcj1yLHQuY29ubmVjdChvLmRlc3RpbmF0aW9uKSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5zdGFydD90Lm5vdGVPbigwKTp0LnN0YXJ0KDApLHNldFRpbWVvdXQoZnVuY3Rpb24oKXsodC5wbGF5YmFja1N0YXRlPT09dC5QTEFZSU5HX1NUQVRFfHx0LnBsYXliYWNrU3RhdGU9PT10LkZJTklTSEVEX1NUQVRFKSYmKGUuX2lPU0VuYWJsZWQ9ITAsZS5pT1NBdXRvRW5hYmxlPSExLHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwidG91Y2hlbmRcIixuLCExKSl9LDApfTtyZXR1cm4gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLG4sITEpLGV9fX07dmFyIHU9bnVsbCxkPXt9O3J8fCh1PW5ldyBBdWRpbyxkPXttcDM6ISF1LmNhblBsYXlUeXBlKFwiYXVkaW8vbXBlZztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksb3B1czohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL29nZzsgY29kZWNzPVwib3B1c1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksb2dnOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJ2b3JiaXNcIicpLnJlcGxhY2UoL15ubyQvLFwiXCIpLHdhdjohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL3dhdjsgY29kZWNzPVwiMVwiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksYWFjOiEhdS5jYW5QbGF5VHlwZShcImF1ZGlvL2FhYztcIikucmVwbGFjZSgvXm5vJC8sXCJcIiksbTRhOiEhKHUuY2FuUGxheVR5cGUoXCJhdWRpby94LW00YTtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9tNGE7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksbXA0OiEhKHUuY2FuUGxheVR5cGUoXCJhdWRpby94LW1wNDtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9tcDQ7XCIpfHx1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKSkucmVwbGFjZSgvXm5vJC8sXCJcIiksd2ViYTohIXUuY2FuUGxheVR5cGUoJ2F1ZGlvL3dlYm07IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIil9KTt2YXIgbD1uZXcgaShkKSxmPWZ1bmN0aW9uKGUpe3ZhciByPXRoaXM7ci5fYXV0b3BsYXk9ZS5hdXRvcGxheXx8ITEsci5fYnVmZmVyPWUuYnVmZmVyfHwhMSxyLl9kdXJhdGlvbj1lLmR1cmF0aW9ufHwwLHIuX2Zvcm1hdD1lLmZvcm1hdHx8bnVsbCxyLl9sb29wPWUubG9vcHx8ITEsci5fbG9hZGVkPSExLHIuX3Nwcml0ZT1lLnNwcml0ZXx8e30sci5fc3JjPWUuc3JjfHxcIlwiLHIuX3BvczNkPWUucG9zM2R8fFswLDAsLS41XSxyLl92b2x1bWU9dm9pZCAwIT09ZS52b2x1bWU/ZS52b2x1bWU6MSxyLl91cmxzPWUudXJsc3x8W10sci5fcmF0ZT1lLnJhdGV8fDEsci5fbW9kZWw9ZS5tb2RlbHx8bnVsbCxyLl9vbmxvYWQ9W2Uub25sb2FkfHxmdW5jdGlvbigpe31dLHIuX29ubG9hZGVycm9yPVtlLm9ubG9hZGVycm9yfHxmdW5jdGlvbigpe31dLHIuX29uZW5kPVtlLm9uZW5kfHxmdW5jdGlvbigpe31dLHIuX29ucGF1c2U9W2Uub25wYXVzZXx8ZnVuY3Rpb24oKXt9XSxyLl9vbnBsYXk9W2Uub25wbGF5fHxmdW5jdGlvbigpe31dLHIuX29uZW5kVGltZXI9W10sci5fd2ViQXVkaW89biYmIXIuX2J1ZmZlcixyLl9hdWRpb05vZGU9W10sci5fd2ViQXVkaW8mJnIuX3NldHVwQXVkaW9Ob2RlKCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8mJm8mJmwuaU9TQXV0b0VuYWJsZSYmbC5fZW5hYmxlaU9TQXVkaW8oKSxsLl9ob3dscy5wdXNoKHIpLHIubG9hZCgpfTtpZihmLnByb3RvdHlwZT17bG9hZDpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbz1udWxsO2lmKHIpcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIk5vIGF1ZGlvIHN1cHBvcnQuXCIpKTtmb3IodmFyIG49MDtuPGUuX3VybHMubGVuZ3RoO24rKyl7dmFyIHQsYTtpZihlLl9mb3JtYXQpdD1lLl9mb3JtYXQ7ZWxzZXtpZihhPWUuX3VybHNbbl0sdD0vXmRhdGE6YXVkaW9cXC8oW147LF0rKTsvaS5leGVjKGEpLHR8fCh0PS9cXC4oW14uXSspJC8uZXhlYyhhLnNwbGl0KFwiP1wiLDEpWzBdKSksIXQpcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIkNvdWxkIG5vdCBleHRyYWN0IGZvcm1hdCBmcm9tIHBhc3NlZCBVUkxzLCBwbGVhc2UgYWRkIGZvcm1hdCBwYXJhbWV0ZXIuXCIpKTt0PXRbMV0udG9Mb3dlckNhc2UoKX1pZihkW3RdKXtvPWUuX3VybHNbbl07YnJlYWt9fWlmKCFvKXJldHVybiB2b2lkIGUub24oXCJsb2FkZXJyb3JcIixuZXcgRXJyb3IoXCJObyBjb2RlYyBzdXBwb3J0IGZvciBzZWxlY3RlZCBhdWRpbyBzb3VyY2VzLlwiKSk7aWYoZS5fc3JjPW8sZS5fd2ViQXVkaW8pcyhlLG8pO2Vsc2V7dmFyIHU9bmV3IEF1ZGlvO3UuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZnVuY3Rpb24oKXt1LmVycm9yJiY0PT09dS5lcnJvci5jb2RlJiYoaS5ub0F1ZGlvPSEwKSxlLm9uKFwibG9hZGVycm9yXCIse3R5cGU6dS5lcnJvcj91LmVycm9yLmNvZGU6MH0pfSwhMSksZS5fYXVkaW9Ob2RlLnB1c2godSksdS5zcmM9byx1Ll9wb3M9MCx1LnByZWxvYWQ9XCJhdXRvXCIsdS52b2x1bWU9bC5fbXV0ZWQ/MDplLl92b2x1bWUqbC52b2x1bWUoKTt2YXIgZj1mdW5jdGlvbigpe2UuX2R1cmF0aW9uPU1hdGguY2VpbCgxMCp1LmR1cmF0aW9uKS8xMCwwPT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5fc3ByaXRlKS5sZW5ndGgmJihlLl9zcHJpdGU9e19kZWZhdWx0OlswLDFlMyplLl9kdXJhdGlvbl19KSxlLl9sb2FkZWR8fChlLl9sb2FkZWQ9ITAsZS5vbihcImxvYWRcIikpLGUuX2F1dG9wbGF5JiZlLnBsYXkoKSx1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGYsITEpfTt1LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGYsITEpLHUubG9hZCgpfXJldHVybiBlfSx1cmxzOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuIGU/KG8uc3RvcCgpLG8uX3VybHM9XCJzdHJpbmdcIj09dHlwZW9mIGU/W2VdOmUsby5fbG9hZGVkPSExLG8ubG9hZCgpLG8pOm8uX3VybHN9LHBsYXk6ZnVuY3Rpb24oZSxuKXt2YXIgcj10aGlzO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihuPWUpLGUmJlwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fChlPVwiX2RlZmF1bHRcIiksci5fbG9hZGVkP3IuX3Nwcml0ZVtlXT8oci5faW5hY3RpdmVOb2RlKGZ1bmN0aW9uKHQpe3QuX3Nwcml0ZT1lO3ZhciBhPXQuX3Bvcz4wP3QuX3BvczpyLl9zcHJpdGVbZV1bMF0vMWUzLGk9MDtyLl93ZWJBdWRpbz8oaT1yLl9zcHJpdGVbZV1bMV0vMWUzLXQuX3Bvcyx0Ll9wb3M+MCYmKGE9ci5fc3ByaXRlW2VdWzBdLzFlMythKSk6aT1yLl9zcHJpdGVbZV1bMV0vMWUzLShhLXIuX3Nwcml0ZVtlXVswXS8xZTMpO3ZhciB1LGQ9ISghci5fbG9vcCYmIXIuX3Nwcml0ZVtlXVsyXSksZj1cInN0cmluZ1wiPT10eXBlb2Ygbj9uOk1hdGgucm91bmQoRGF0ZS5ub3coKSpNYXRoLnJhbmRvbSgpKStcIlwiO2lmKGZ1bmN0aW9uKCl7dmFyIG89e2lkOmYsc3ByaXRlOmUsbG9vcDpkfTt1PXNldFRpbWVvdXQoZnVuY3Rpb24oKXshci5fd2ViQXVkaW8mJmQmJnIuc3RvcChvLmlkKS5wbGF5KGUsby5pZCksci5fd2ViQXVkaW8mJiFkJiYoci5fbm9kZUJ5SWQoby5pZCkucGF1c2VkPSEwLHIuX25vZGVCeUlkKG8uaWQpLl9wb3M9MCxyLl9jbGVhckVuZFRpbWVyKG8uaWQpKSxyLl93ZWJBdWRpb3x8ZHx8ci5zdG9wKG8uaWQpLHIub24oXCJlbmRcIixmKX0saS9yLl9yYXRlKjFlMyksci5fb25lbmRUaW1lci5wdXNoKHt0aW1lcjp1LGlkOm8uaWR9KX0oKSxyLl93ZWJBdWRpbyl7dmFyIHM9ci5fc3ByaXRlW2VdWzBdLzFlMyxfPXIuX3Nwcml0ZVtlXVsxXS8xZTM7dC5pZD1mLHQucGF1c2VkPSExLHAocixbZCxzLF9dLGYpLHIuX3BsYXlTdGFydD1vLmN1cnJlbnRUaW1lLHQuZ2Fpbi52YWx1ZT1yLl92b2x1bWUsXCJ1bmRlZmluZWRcIj09dHlwZW9mIHQuYnVmZmVyU291cmNlLnN0YXJ0P2Q/dC5idWZmZXJTb3VyY2Uubm90ZUdyYWluT24oMCxhLDg2NDAwKTp0LmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLGEsaSk6ZD90LmJ1ZmZlclNvdXJjZS5zdGFydCgwLGEsODY0MDApOnQuYnVmZmVyU291cmNlLnN0YXJ0KDAsYSxpKX1lbHNle2lmKDQhPT10LnJlYWR5U3RhdGUmJih0LnJlYWR5U3RhdGV8fCFuYXZpZ2F0b3IuaXNDb2Nvb25KUykpcmV0dXJuIHIuX2NsZWFyRW5kVGltZXIoZiksZnVuY3Rpb24oKXt2YXIgbz1yLGE9ZSxpPW4sdT10LGQ9ZnVuY3Rpb24oKXtvLnBsYXkoYSxpKSx1LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGQsITEpfTt1LmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5dGhyb3VnaFwiLGQsITEpfSgpLHI7dC5yZWFkeVN0YXRlPTQsdC5pZD1mLHQuY3VycmVudFRpbWU9YSx0Lm11dGVkPWwuX211dGVkfHx0Lm11dGVkLHQudm9sdW1lPXIuX3ZvbHVtZSpsLnZvbHVtZSgpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0LnBsYXkoKX0sMCl9cmV0dXJuIHIub24oXCJwbGF5XCIpLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oZikscn0pLHIpOihcImZ1bmN0aW9uXCI9PXR5cGVvZiBuJiZuKCkscik6KHIub24oXCJsb2FkXCIsZnVuY3Rpb24oKXtyLnBsYXkoZSxuKX0pLHIpfSxwYXVzZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnBhdXNlKGUpfSksbztvLl9jbGVhckVuZFRpbWVyKGUpO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO2lmKG4paWYobi5fcG9zPW8ucG9zKG51bGwsZSksby5fd2ViQXVkaW8pe2lmKCFuLmJ1ZmZlclNvdXJjZXx8bi5wYXVzZWQpcmV0dXJuIG87bi5wYXVzZWQ9ITAsXCJ1bmRlZmluZWRcIj09dHlwZW9mIG4uYnVmZmVyU291cmNlLnN0b3A/bi5idWZmZXJTb3VyY2Uubm90ZU9mZigwKTpuLmJ1ZmZlclNvdXJjZS5zdG9wKDApfWVsc2Ugbi5wYXVzZSgpO3JldHVybiBvLm9uKFwicGF1c2VcIiksb30sc3RvcDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnN0b3AoZSl9KSxvO28uX2NsZWFyRW5kVGltZXIoZSk7dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7aWYobilpZihuLl9wb3M9MCxvLl93ZWJBdWRpbyl7aWYoIW4uYnVmZmVyU291cmNlfHxuLnBhdXNlZClyZXR1cm4gbztuLnBhdXNlZD0hMCxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5idWZmZXJTb3VyY2Uuc3RvcD9uLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOm4uYnVmZmVyU291cmNlLnN0b3AoMCl9ZWxzZSBpc05hTihuLmR1cmF0aW9uKXx8KG4ucGF1c2UoKSxuLmN1cnJlbnRUaW1lPTApO3JldHVybiBvfSxtdXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28ubXV0ZShlKX0pLG87dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7cmV0dXJuIG4mJihvLl93ZWJBdWRpbz9uLmdhaW4udmFsdWU9MDpuLm11dGVkPSEwKSxvfSx1bm11dGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by51bm11dGUoZSl9KSxvO3ZhciBuPWU/by5fbm9kZUJ5SWQoZSk6by5fYWN0aXZlTm9kZSgpO3JldHVybiBuJiYoby5fd2ViQXVkaW8/bi5nYWluLnZhbHVlPW8uX3ZvbHVtZTpuLm11dGVkPSExKSxvfSx2b2x1bWU6ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzO2lmKGU9cGFyc2VGbG9hdChlKSxlPj0wJiYxPj1lKXtpZihuLl92b2x1bWU9ZSwhbi5fbG9hZGVkKXJldHVybiBuLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7bi52b2x1bWUoZSxvKX0pLG47dmFyIHI9bz9uLl9ub2RlQnlJZChvKTpuLl9hY3RpdmVOb2RlKCk7cmV0dXJuIHImJihuLl93ZWJBdWRpbz9yLmdhaW4udmFsdWU9ZTpyLnZvbHVtZT1lKmwudm9sdW1lKCkpLG59cmV0dXJuIG4uX3ZvbHVtZX0sbG9vcDpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVyblwiYm9vbGVhblwiPT10eXBlb2YgZT8oby5fbG9vcD1lLG8pOm8uX2xvb3B9LHNwcml0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO3JldHVyblwib2JqZWN0XCI9PXR5cGVvZiBlPyhvLl9zcHJpdGU9ZSxvKTpvLl9zcHJpdGV9LHBvczpmdW5jdGlvbihlLG4pe3ZhciByPXRoaXM7aWYoIXIuX2xvYWRlZClyZXR1cm4gci5vbihcImxvYWRcIixmdW5jdGlvbigpe3IucG9zKGUpfSksXCJudW1iZXJcIj09dHlwZW9mIGU/cjpyLl9wb3N8fDA7ZT1wYXJzZUZsb2F0KGUpO3ZhciB0PW4/ci5fbm9kZUJ5SWQobik6ci5fYWN0aXZlTm9kZSgpO2lmKHQpcmV0dXJuIGU+PTA/KHIucGF1c2UobiksdC5fcG9zPWUsci5wbGF5KHQuX3Nwcml0ZSxuKSxyKTpyLl93ZWJBdWRpbz90Ll9wb3MrKG8uY3VycmVudFRpbWUtci5fcGxheVN0YXJ0KTp0LmN1cnJlbnRUaW1lO2lmKGU+PTApcmV0dXJuIHI7Zm9yKHZhciBhPTA7YTxyLl9hdWRpb05vZGUubGVuZ3RoO2ErKylpZihyLl9hdWRpb05vZGVbYV0ucGF1c2VkJiY0PT09ci5fYXVkaW9Ob2RlW2FdLnJlYWR5U3RhdGUpcmV0dXJuIHIuX3dlYkF1ZGlvP3IuX2F1ZGlvTm9kZVthXS5fcG9zOnIuX2F1ZGlvTm9kZVthXS5jdXJyZW50VGltZX0scG9zM2Q6ZnVuY3Rpb24oZSxvLG4scil7dmFyIHQ9dGhpcztpZihvPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBvJiZvP286MCxuPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBuJiZuP246LS41LCF0Ll9sb2FkZWQpcmV0dXJuIHQub24oXCJwbGF5XCIsZnVuY3Rpb24oKXt0LnBvczNkKGUsbyxuLHIpfSksdDtpZighKGU+PTB8fDA+ZSkpcmV0dXJuIHQuX3BvczNkO2lmKHQuX3dlYkF1ZGlvKXt2YXIgYT1yP3QuX25vZGVCeUlkKHIpOnQuX2FjdGl2ZU5vZGUoKTthJiYodC5fcG9zM2Q9W2UsbyxuXSxhLnBhbm5lci5zZXRQb3NpdGlvbihlLG8sbiksYS5wYW5uZXIucGFubmluZ01vZGVsPXQuX21vZGVsfHxcIkhSVEZcIil9cmV0dXJuIHR9LGZhZGU6ZnVuY3Rpb24oZSxvLG4scix0KXt2YXIgYT10aGlzLGk9TWF0aC5hYnMoZS1vKSx1PWU+bz9cImRvd25cIjpcInVwXCIsZD1pLy4wMSxsPW4vZDtpZighYS5fbG9hZGVkKXJldHVybiBhLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7YS5mYWRlKGUsbyxuLHIsdCl9KSxhO2Eudm9sdW1lKGUsdCk7Zm9yKHZhciBmPTE7ZD49ZjtmKyspIWZ1bmN0aW9uKCl7dmFyIGU9YS5fdm9sdW1lKyhcInVwXCI9PT11Py4wMTotLjAxKSpmLG49TWF0aC5yb3VuZCgxZTMqZSkvMWUzLGk9bztzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS52b2x1bWUobix0KSxuPT09aSYmciYmcigpfSxsKmYpfSgpfSxmYWRlSW46ZnVuY3Rpb24oZSxvLG4pe3JldHVybiB0aGlzLnZvbHVtZSgwKS5wbGF5KCkuZmFkZSgwLGUsbyxuKX0sZmFkZU91dDpmdW5jdGlvbihlLG8sbixyKXt2YXIgdD10aGlzO3JldHVybiB0LmZhZGUodC5fdm9sdW1lLGUsbyxmdW5jdGlvbigpe24mJm4oKSx0LnBhdXNlKHIpLHQub24oXCJlbmRcIil9LHIpfSxfbm9kZUJ5SWQ6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj1vLl9hdWRpb05vZGVbMF0scj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspaWYoby5fYXVkaW9Ob2RlW3JdLmlkPT09ZSl7bj1vLl9hdWRpb05vZGVbcl07YnJlYWt9cmV0dXJuIG59LF9hY3RpdmVOb2RlOmZ1bmN0aW9uKCl7Zm9yKHZhciBlPXRoaXMsbz1udWxsLG49MDtuPGUuX2F1ZGlvTm9kZS5sZW5ndGg7bisrKWlmKCFlLl9hdWRpb05vZGVbbl0ucGF1c2VkKXtvPWUuX2F1ZGlvTm9kZVtuXTticmVha31yZXR1cm4gZS5fZHJhaW5Qb29sKCksb30sX2luYWN0aXZlTm9kZTpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPW51bGwscj0wO3I8by5fYXVkaW9Ob2RlLmxlbmd0aDtyKyspaWYoby5fYXVkaW9Ob2RlW3JdLnBhdXNlZCYmND09PW8uX2F1ZGlvTm9kZVtyXS5yZWFkeVN0YXRlKXtlKG8uX2F1ZGlvTm9kZVtyXSksbj0hMDticmVha31pZihvLl9kcmFpblBvb2woKSwhbil7dmFyIHQ7aWYoby5fd2ViQXVkaW8pdD1vLl9zZXR1cEF1ZGlvTm9kZSgpLGUodCk7ZWxzZXtvLmxvYWQoKSx0PW8uX2F1ZGlvTm9kZVtvLl9hdWRpb05vZGUubGVuZ3RoLTFdO3ZhciBhPW5hdmlnYXRvci5pc0NvY29vbkpTP1wiY2FucGxheXRocm91Z2hcIjpcImxvYWRlZG1ldGFkYXRhXCIsaT1mdW5jdGlvbigpe3QucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGksITEpLGUodCl9O3QuYWRkRXZlbnRMaXN0ZW5lcihhLGksITEpfX19LF9kcmFpblBvb2w6ZnVuY3Rpb24oKXt2YXIgZSxvPXRoaXMsbj0wO2ZvcihlPTA7ZTxvLl9hdWRpb05vZGUubGVuZ3RoO2UrKylvLl9hdWRpb05vZGVbZV0ucGF1c2VkJiZuKys7Zm9yKGU9by5fYXVkaW9Ob2RlLmxlbmd0aC0xO2U+PTAmJiEoNT49bik7ZS0tKW8uX2F1ZGlvTm9kZVtlXS5wYXVzZWQmJihvLl93ZWJBdWRpbyYmby5fYXVkaW9Ob2RlW2VdLmRpc2Nvbm5lY3QoMCksbi0tLG8uX2F1ZGlvTm9kZS5zcGxpY2UoZSwxKSl9LF9jbGVhckVuZFRpbWVyOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49LTEscj0wO3I8by5fb25lbmRUaW1lci5sZW5ndGg7cisrKWlmKG8uX29uZW5kVGltZXJbcl0uaWQ9PT1lKXtuPXI7YnJlYWt9dmFyIHQ9by5fb25lbmRUaW1lcltuXTt0JiYoY2xlYXJUaW1lb3V0KHQudGltZXIpLG8uX29uZW5kVGltZXIuc3BsaWNlKG4sMSkpfSxfc2V0dXBBdWRpb05vZGU6ZnVuY3Rpb24oKXt2YXIgZT10aGlzLG49ZS5fYXVkaW9Ob2RlLHI9ZS5fYXVkaW9Ob2RlLmxlbmd0aDtyZXR1cm4gbltyXT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygby5jcmVhdGVHYWluP28uY3JlYXRlR2Fpbk5vZGUoKTpvLmNyZWF0ZUdhaW4oKSxuW3JdLmdhaW4udmFsdWU9ZS5fdm9sdW1lLG5bcl0ucGF1c2VkPSEwLG5bcl0uX3Bvcz0wLG5bcl0ucmVhZHlTdGF0ZT00LG5bcl0uY29ubmVjdChhKSxuW3JdLnBhbm5lcj1vLmNyZWF0ZVBhbm5lcigpLG5bcl0ucGFubmVyLnBhbm5pbmdNb2RlbD1lLl9tb2RlbHx8XCJlcXVhbHBvd2VyXCIsbltyXS5wYW5uZXIuc2V0UG9zaXRpb24oZS5fcG9zM2RbMF0sZS5fcG9zM2RbMV0sZS5fcG9zM2RbMl0pLG5bcl0ucGFubmVyLmNvbm5lY3QobltyXSksbltyXX0sb246ZnVuY3Rpb24oZSxvKXt2YXIgbj10aGlzLHI9bltcIl9vblwiK2VdO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG8pci5wdXNoKG8pO2Vsc2UgZm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0Kyspbz9yW3RdLmNhbGwobixvKTpyW3RdLmNhbGwobik7cmV0dXJuIG59LG9mZjpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXMscj1uW1wiX29uXCIrZV07aWYobyl7Zm9yKHZhciB0PTA7dDxyLmxlbmd0aDt0KyspaWYobz09PXJbdF0pe3Iuc3BsaWNlKHQsMSk7YnJlYWt9fWVsc2UgbltcIl9vblwiK2VdPVtdO3JldHVybiBufSx1bmxvYWQ6ZnVuY3Rpb24oKXtmb3IodmFyIG89dGhpcyxuPW8uX2F1ZGlvTm9kZSxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKyluW3JdLnBhdXNlZHx8KG8uc3RvcChuW3JdLmlkKSxvLm9uKFwiZW5kXCIsbltyXS5pZCkpLG8uX3dlYkF1ZGlvP25bcl0uZGlzY29ubmVjdCgwKTpuW3JdLnNyYz1cIlwiO2ZvcihyPTA7cjxvLl9vbmVuZFRpbWVyLmxlbmd0aDtyKyspY2xlYXJUaW1lb3V0KG8uX29uZW5kVGltZXJbcl0udGltZXIpO3ZhciB0PWwuX2hvd2xzLmluZGV4T2Yobyk7bnVsbCE9PXQmJnQ+PTAmJmwuX2hvd2xzLnNwbGljZSh0LDEpLGRlbGV0ZSBlW28uX3NyY10sbz1udWxsfX0sbil2YXIgcz1mdW5jdGlvbihvLG4pe2lmKG4gaW4gZSlyZXR1cm4gby5fZHVyYXRpb249ZVtuXS5kdXJhdGlvbix2b2lkIGMobyk7aWYoL15kYXRhOlteO10rO2Jhc2U2NCwvLnRlc3Qobikpe2Zvcih2YXIgcj1hdG9iKG4uc3BsaXQoXCIsXCIpWzFdKSx0PW5ldyBVaW50OEFycmF5KHIubGVuZ3RoKSxhPTA7YTxyLmxlbmd0aDsrK2EpdFthXT1yLmNoYXJDb2RlQXQoYSk7Xyh0LmJ1ZmZlcixvLG4pfWVsc2V7dmFyIGk9bmV3IFhNTEh0dHBSZXF1ZXN0O2kub3BlbihcIkdFVFwiLG4sITApLGkucmVzcG9uc2VUeXBlPVwiYXJyYXlidWZmZXJcIixpLm9ubG9hZD1mdW5jdGlvbigpe18oaS5yZXNwb25zZSxvLG4pfSxpLm9uZXJyb3I9ZnVuY3Rpb24oKXtvLl93ZWJBdWRpbyYmKG8uX2J1ZmZlcj0hMCxvLl93ZWJBdWRpbz0hMSxvLl9hdWRpb05vZGU9W10sZGVsZXRlIG8uX2dhaW5Ob2RlLGRlbGV0ZSBlW25dLG8ubG9hZCgpKX07dHJ5e2kuc2VuZCgpfWNhdGNoKHUpe2kub25lcnJvcigpfX19LF89ZnVuY3Rpb24obixyLHQpe28uZGVjb2RlQXVkaW9EYXRhKG4sZnVuY3Rpb24obyl7byYmKGVbdF09byxjKHIsbykpfSxmdW5jdGlvbihlKXtyLm9uKFwibG9hZGVycm9yXCIsZSl9KX0sYz1mdW5jdGlvbihlLG8pe2UuX2R1cmF0aW9uPW8/by5kdXJhdGlvbjplLl9kdXJhdGlvbiwwPT09T2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZS5fc3ByaXRlKS5sZW5ndGgmJihlLl9zcHJpdGU9e19kZWZhdWx0OlswLDFlMyplLl9kdXJhdGlvbl19KSxlLl9sb2FkZWR8fChlLl9sb2FkZWQ9ITAsZS5vbihcImxvYWRcIikpLGUuX2F1dG9wbGF5JiZlLnBsYXkoKX0scD1mdW5jdGlvbihuLHIsdCl7dmFyIGE9bi5fbm9kZUJ5SWQodCk7YS5idWZmZXJTb3VyY2U9by5jcmVhdGVCdWZmZXJTb3VyY2UoKSxhLmJ1ZmZlclNvdXJjZS5idWZmZXI9ZVtuLl9zcmNdLGEuYnVmZmVyU291cmNlLmNvbm5lY3QoYS5wYW5uZXIpLGEuYnVmZmVyU291cmNlLmxvb3A9clswXSxyWzBdJiYoYS5idWZmZXJTb3VyY2UubG9vcFN0YXJ0PXJbMV0sYS5idWZmZXJTb3VyY2UubG9vcEVuZD1yWzFdK3JbMl0pLGEuYnVmZmVyU291cmNlLnBsYXliYWNrUmF0ZS52YWx1ZT1uLl9yYXRlfTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybntIb3dsZXI6bCxIb3dsOmZ9fSksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGV4cG9ydHMmJihleHBvcnRzLkhvd2xlcj1sLGV4cG9ydHMuSG93bD1mKSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiYod2luZG93Lkhvd2xlcj1sLHdpbmRvdy5Ib3dsPWYpfSgpO1xuXG5cbjtcbi8vXG4vL1x0VXRpbHNcbi8vXG4vLyAqIGFuaW1hdGUoY2IsIGR1cmF0b24pIC0tIHdyYXBwZXIgb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4vL1xuLy8gRE9NIG1hbmlwdWxhdGlvbnNcbi8vXG4vLyAqIGNsb3NlUG9wdXAoZXZlbnQpIC0tIGNsb3NlIHBvcHVwIHdpdGggdXNlcnMgdW5pcXVlIGNvZGVcbi8vICogb25Wb2x1bWVCdG5DbGljayhldmVudCkgLS0gaGFuZGxlciBmb3Igdm9sdW1lIGJ1dHRvbnMgY2xpY2tzIChtdXRlL3VubXV0ZSB0cmlnZ2VyKVxuLy8gKiBvblZvbHVtZVNsaWRlcklucHV0KGV2ZW50KSAtLSBjaGFuZ2UgYXVkaW8gdm9sdW1lIHdoZW52b2x1bWUgc2xpZGVyIGlzIGJlaW5nIG1vdmVkXG4vLyAqIHVwZGF0ZVNjb3JlKG51bWJlcikgLS0gdXBkYXRlIGN1cnJlbnQgc2NvcmVcbi8vXG4vL1x0Q2FudmFzXG4vL1xuLy8gKiByZWZyZXNoQ29tcHV0ZWRTaXplcyhvYmplY3QpIC0tIGNoYW5nZSA8Y2FudmFzPiBzaXplcyB0byBhY3R1YWxcbi8vICogYWRkTW92ZW1lbnRPbkNhbnZhcyhtb3ZlbWVudEluZm8pIC0tIGFkZCBuZXcgbW92ZW1lbnQgY2FudmFzLW9iamVjdFxuLy8gKiBhbmltYXRlTW92ZW1lbnQob2JqZWN0KSAtLSBtYWtlIHJlY2lldmVkIGFscmVhZHkgYWRkZWQgbW92ZW1lbnQgcnVuIChhbmltYXRlKVxuLy8gKiBvbkFnU2V0dXBFdmVudChldmVudCkgLS0gaGFuZGxlciBmb3IgZXZlbnQsIGZpcmVkIHdoZW4gZ2FtZSBzZXR0aW5ncyBhcmUgcmVjaWV2ZWRcbi8vXG4vLyBUbyByZW1vdmVcbi8vXG4vLyAqIHN0YXJ0KCkgLS0gc3RhcnQgZ2FtZVxuLy8gKiBuZXh0QmVhdChpc0ZpcnN0KSAtLSBwcm9jZXNzIChhbmQgYWRkKSBuZXh0IG1vdmVtZW50XG4vL1xuLy8gSW5pdGlhbGl6YXRpb25cbi8vXG5cblxuKGZ1bmN0aW9uKCl7XG5cbmZ1bmN0aW9uIGFuaW1hdGUoZHJhdywgZHVyYXRpb24pIHtcbiAgdmFyIHN0YXJ0ID0gcGVyZm9ybWFuY2Uubm93KCk7XG5cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmN0aW9uIGFuaW1hdGUodGltZSkge1xuICAgIC8vINC+0L/RgNC10LTQtdC70LjRgtGMLCDRgdC60L7Qu9GM0LrQviDQv9GA0L7RiNC70L4g0LLRgNC10LzQtdC90Lgg0YEg0L3QsNGH0LDQu9CwINCw0L3QuNC80LDRhtC40LhcbiAgICB2YXIgdGltZVBhc3NlZCA9IHRpbWUgLSBzdGFydDtcblxuICAgIC8vINCy0L7Qt9C80L7QttC90L4g0L3QtdCx0L7Qu9GM0YjQvtC1INC/0YDQtdCy0YvRiNC10L3QuNC1INCy0YDQtdC80LXQvdC4LCDQsiDRjdGC0L7QvCDRgdC70YPRh9Cw0LUg0LfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0Ywg0LrQvtC90LXRhlxuICAgIGlmICh0aW1lUGFzc2VkID4gZHVyYXRpb24pIHRpbWVQYXNzZWQgPSBkdXJhdGlvbjtcblxuICAgIC8vINC90LDRgNC40YHQvtCy0LDRgtGMINGB0L7RgdGC0L7Rj9C90LjQtSDQsNC90LjQvNCw0YbQuNC4INCyINC80L7QvNC10L3RgiB0aW1lUGFzc2VkXG4gICAgZHJhdyh0aW1lUGFzc2VkKTtcblxuICAgIC8vINC10YHQu9C4INCy0YDQtdC80Y8g0LDQvdC40LzQsNGG0LjQuCDQvdC1INC30LDQutC+0L3Rh9C40LvQvtGB0YwgLSDQt9Cw0L/Qu9Cw0L3QuNGA0L7QstCw0YLRjCDQtdGJ0ZEg0LrQsNC00YBcbiAgICBpZiAodGltZVBhc3NlZCA8IGR1cmF0aW9uKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gICAgfVxuXG4gIH0pO1xufVxuXG5cbnZhciBjb25maWcgPSB7XG5cdGNvbG9yczoge1xuXHRcdG5ldXRyYWw6ICcjRkZBNzAwJywgLy8gIzhEOTlBRSAjMTA3RTdEXG5cdFx0c3VjY2VzczogJyNDMkU4MTInLFxuXHRcdGZhaWw6ICcjQjgwQzA5J1xuXHR9LFxuXHRtb3ZlbWVudHM6IHtcblx0XHRyYWRpdXNQZXJjZW50OiA0LFxuXHRcdHN0cm9rZVdpZHRoUGVyY2VudDogMC41XG5cdH1cbn1cblxuZnVuY3Rpb24gY2xvc2VQb3B1cChldmVudCkge1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdXAnKVswXS5jbGFzc0xpc3QuYWRkKCdjbG9zZWQnKTtcblx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmxvZ28nKVswXS5jbGFzc0xpc3QucmVtb3ZlKCd3aXRoLXBvcHVwJyk7XG59XG5cbi8vIE11dGVzIC8gdW5tdXRlcyBhdWRpb1xuZnVuY3Rpb24gb25Wb2x1bWVCdG5DbGljayhldmVudCkge1xuXG5cdGlmICghY29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCkge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLXVwJyk7XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5hZGQoJ2ZhLXZvbHVtZS1vZmYnKTtcblxuXHRcdC8vIE11dGVcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLm11dGUoKTtcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLm11dGVkID0gdHJ1ZTtcblx0fSBlbHNlIHtcblxuXHRcdC8vIENoYW5nZSB2aWV3XG5cdFx0dGhpcy5jaGlsZE5vZGVzWzFdLmNsYXNzTGlzdC5yZW1vdmUoJ2ZhLXZvbHVtZS1vZmYnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLXVwJyk7XG5cblx0XHQvLyBVbm11dGVcblx0XHRjb25maWcuY3VycmVudEF1ZGlvLnVubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSBmYWxzZTtcblx0fVxuXG59XG5cbi8vIENoYW5nZSB2b2x1bWUgbGV2ZWwgb2YgY3VycmVudCBhdWRpb1xuZnVuY3Rpb24gb25Wb2x1bWVTbGlkZXJJbnB1dChldmVudCkge1xuXHRjb25maWcuY3VycmVudEF1ZGlvLnZvbHVtZSh0aGlzLnZhbHVlLzEwMCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNjb3JlKG5ld1Njb3JlKSB7XG5cblx0dmFyIHNjb3JlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlJylbMF07XG5cdHZhciBzY29yZU51bWJlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY29yZS1udW1iZXInKVswXTtcblxuXHRzY29yZS5jbGFzc0xpc3QuYWRkKCd1cGRhdGUnKTtcblx0c2V0VGltZW91dCgoKT0+eyBzY29yZS5jbGFzc0xpc3QucmVtb3ZlKCd1cGRhdGUnKTsgfSwgNDAwKTtcblxuXHRjb25maWcuY3VycmVudFNjb3JlID0gcGFyc2VJbnQobmV3U2NvcmUpO1xuXHRzY29yZU51bWJlci5pbm5lckhUTUwgPSBjb25maWcuY3VycmVudFNjb3JlO1xuXG5cdHJldHVybiBjb25maWcuY3VycmVudFNjb3JlO1xuXG59XG5cbi8vICoqKioqKioqKipcbi8vICogQ0FOVkFTICpcbi8vICoqKioqKioqKipcblxuLy8gQ2hhbmdlcyBjYW52YXMgYmFja2dyb3VuZCBzaXplIHdoZW4gZmlyZWRcbmZ1bmN0aW9uIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkge1xuXHRcblx0Y29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUgPSB7XG5cdFx0d2lkdGg6ICtvYmplY3Qud2lkdGguc2xpY2UoMCwtMiksXG5cdFx0aGVpZ2h0OiArb2JqZWN0LmhlaWdodC5zbGljZSgwLC0yKVxuXHR9O1xuXG5cdGNhbnZhcy5zZXREaW1lbnNpb25zKHtcblx0XHR3aWR0aDogY29uZmlnLmNhbnZPcHRzLmNvbXB1dGVkU3R5bGUud2lkdGgsXG5cdFx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHRcblx0fSk7XG5cbn1cblxuXG5mdW5jdGlvbiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykge1xuXG5cdGlmIChtb3ZlbWVudEluZm8ubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHR2YXIgcmFkaXVzID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXM7XG5cdHZhciBzdHJva2VXaWR0aCA9IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGg7XG5cdC8vIHZhciB4ID0gTWF0aC5yb3VuZChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCAtIChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aC8xMDApKjMpIC0gcmFkaXVzKjI7XG5cdHZhciB4ID0gTWF0aC5yb3VuZChjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCk7XG5cdHZhciB5ID0gTWF0aC5yb3VuZChjb25maWcub25lSFBlcmNlbnQgKiA0NSkgKyBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnN0cm9rZVdpZHRoKjEuNjtcblxuXHR2YXIgY2lyY2xlID0gbmV3IGZhYnJpYy5DaXJjbGUoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnMubmV1dHJhbCxcblx0XHRzdHJva2U6ICcjRkZGRkZGJyxcblx0XHRzdHJva2VXaWR0aDogc3Ryb2tlV2lkdGgsXG5cdFx0cmFkaXVzOiByYWRpdXMsXG5cdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0fSk7XG5cblx0Ly8gY29uc29sZS5sb2coLWNpcmNsZS5nZXRSYWRpdXNYKCkqMC44KTtcblx0dmFyIGFycm93O1xuXG5cdHN3aXRjaCAobW92ZW1lbnRJbmZvLm5hbWUpIHtcblx0XHRjYXNlICd1cCc6XG5cdFx0XHRhcnJvdyA9IG5ldyBmYWJyaWMuUGF0aChgXG5cdFx0XHRcdE0gJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAwICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC41NX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgMCAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHR6YCwge1xuXHRcdFx0XHQvLyBmaWxsOiAnI2ZmZicsXG5cdFx0XHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdFx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHRcdFx0fSk7XG5cdFx0YnJlYWs7XG5cblx0XHRjYXNlICdkb3duJzpcblx0XHRcdGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKGBcblx0XHRcdFx0TSAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC42NX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMIDAgJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuNTV9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgJHstY2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAwICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0emAsIHtcblx0XHRcdFx0Ly8gZmlsbDogJyNmZmYnLFxuXHRcdFx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRcdFx0b3JpZ2luWDogJ2NlbnRlcidcblx0XHRcdH0pO1xuXHRcdGJyZWFrXG5cdH1cblx0XG5cblx0dmFyIG1vdmVtZW50ID0gbmV3IGZhYnJpYy5Hcm91cChbY2lyY2xlLCBhcnJvd10sIHtcblx0XHR0b3A6IHksXG5cdFx0bGVmdDogeFxuXHR9KTtcblxuXHRtb3ZlbWVudEluZm8uY2FudmFzT2JqZWN0ID0gbW92ZW1lbnQ7XG5cblx0Y2FudmFzLmFkZChtb3ZlbWVudCk7XG5cdGNhbnZhcy5yZW5kZXJBbGwoKTtcblx0Ly8gbW92ZW1lbnRJbmZvLnN0YXRlID0gJ2FkZGVkJztcbn1cblxuZnVuY3Rpb24gYW5pbWF0ZU1vdmVtZW50KG1vdmVtZW50SW5mbykge1xuXG5cdC8vIGlmIChtb3ZlbWVudEluZm8ubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHRtb3ZlbWVudEluZm8uY2FudmFzT2JqZWN0LmFuaW1hdGUoJ2xlZnQnLCAnJysoKGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwKSArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMS41KSwge1xuXHRcdG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRkdXJhdGlvbjogY29uZmlnLmN1cnJlbnRNaW5JbnRlcnZhbCo0XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBvbkdsU2V0dXBFdmVudChldmVudCkge1xuXHRjb25maWcuY3VycmVudEJwbSA9IGV2ZW50LmRldGFpbC5icG07XG5cdGNvbmZpZy5jdXJyZW50TWluSW50ZXJ2YWwgPSA2MDAwMCAvIGNvbmZpZy5jdXJyZW50QnBtO1xuXHRjb25maWcuY3VycmVudFNvbmdOYW1lID0gZXZlbnQuZGV0YWlsLnNvbmc7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8gPSBldmVudC5kZXRhaWwubXVzaWM7XG5cdGNsb3NlUG9wdXAoKTtcblx0Y29uc29sZS5sb2coZXZlbnQuZGV0YWlsLmJwbSk7XG5cblx0Ly8gVGVzdFxuXHRjb25maWcuY3VycmVudEF1ZGlvLnBsYXkoKTtcbn1cblxuLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbmZ1bmN0aW9uIG9uR2xBZGRNb3ZlbWVudChldmVudCkge1xuXG5cdGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzLnB1c2goe25hbWU6IGV2ZW50LmRldGFpbH0pO1xuXHR2YXIgdGhpc01vdmVtZW50ID0gY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMubGVuZ3RoLTFdO1xuXG5cdGlmICh0aGlzTW92ZW1lbnQubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHRhZGRNb3ZlbWVudE9uQ2FudmFzKHRoaXNNb3ZlbWVudCk7XG5cdGFuaW1hdGVNb3ZlbWVudCh0aGlzTW92ZW1lbnQpO1xuXG59XG5cbmZ1bmN0aW9uIG9uR2xTdGF0dXMoZXZlbnQpIHtcblxuXHR2YXIgc3RhdHVzID0gZXZlbnQuZGV0YWlsLnN0YXR1cztcblx0dmFyIG1vdmVtZW50SW5kZXggPSBldmVudC5kZXRhaWwuaW5kZXg7XG5cdHZhciBuZXdTY29yZSA9IGV2ZW50LmRldGFpbC5uZXdTY29yZTtcblxuXHRpZiAoY29uZmlnLmN1cnJlbnRNb3ZlbWVudHNbbW92ZW1lbnRJbmRleF0ubmFtZSA9PSAncGFzcycpIHJldHVybjtcblxuXHR2YXIgY2Fudk9iaiA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLmNhbnZhc09iamVjdDtcblxuXHQvLyBSdW4gY2FudmFzIGFuaW1hdGlvblxuXHRjYW52T2JqLnNldCh7XG5cdFx0ZmlsbDogY29uZmlnLmNvbG9yc1tzdGF0dXNdLFxuXHRcdC8vIGNlbnRlcmVkU2NhbGluZzogdHJ1ZVxuXHR9KTtcblxuXHRzd2l0Y2ggKHN0YXR1cykge1xuXHRcdGNhc2UgJ3N1Y2Nlc3MnOlxuXHRcdFx0Y2Fudk9iai5hbmltYXRlKHtcblx0XHRcdFx0J3NjYWxlWCc6IDYsXG5cdFx0XHRcdCdzY2FsZVknOiA2LFxuXHRcdFx0XHQnb3BhY2l0eSc6IDAsXG5cdFx0XHRcdCdsZWZ0JzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyo1LjIsXG5cdFx0XHRcdCd0b3AnOiAnLT0nK2NvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzKjUuMlxuXHRcdFx0fSwge1xuXHRcdFx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0XHRcdGR1cmF0aW9uOiA3MDAsXG5cdFx0XHRcdGVhc2luZzogZmFicmljLnV0aWwuZWFzZS5lYXNlT3V0UXVhcnRcblx0XHRcdH0pO1xuXHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSAnZmFpbCc6XG5cdFx0XHRjYW52T2JqLmFuaW1hdGUoe1xuXHRcdFx0XHQnc2NhbGVYJzogMC44LFxuXHRcdFx0XHQnc2NhbGVZJzogMC44LFxuXHRcdFx0XHQnb3BhY2l0eSc6IDAsXG5cdFx0XHRcdCdsZWZ0JzogJycrKC1jb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyksXG5cdFx0XHRcdC8vICd0b3AnOiAnLT0nK2NvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzXG5cdFx0XHR9LCB7XG5cdFx0XHRcdG9uQ2hhbmdlOiBjYW52YXMucmVuZGVyQWxsLmJpbmQoY2FudmFzKSxcblx0XHRcdFx0ZHVyYXRpb246IDEwMDAsXG5cdFx0XHRcdC8vIGVhc2luZzogZmFicmljLnV0aWwuZWFzZS5lYXNlT3V0UXVhcnRcblx0XHRcdH0pO1xuXHRcdGJyZWFrO1xuXHR9XG5cblx0Ly8gVXBkYXRlIHNjb3JlXG5cdHVwZGF0ZVNjb3JlKG5ld1Njb3JlKTtcdFxuXG59XG5cblxuXG5cblxuXG5cblxuLy8gKioqKioqKipcbi8vICogSW5pdCAqXG4vLyAqKioqKioqKlxuXG5jb25maWcuY3VycmVudE1vdmVtZW50cyA9IFtdO1xuY29uZmlnLmN1cnJlbnRTY29yZSA9IDA7XG5jb25maWcuY3VycmVudFN0YXJ0RGF0ZSA9IDA7XG5cblxuLy8gR2V0IGNvbXB1dGVkIHN0eWxlcyBvZiB3aG9sZSBwYWdlIHdyYXBwZXJcbnZhciBjYW52YXNDb21wdXRlZFN0eWxlT2JqID0gZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcud3InKVswXSk7XG5cbi8vIFNldCBjYW52YXMgb3B0aW9uc1xuY29uZmlnLm9uZVdQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai53aWR0aC5zbGljZSgwLC0yKSkvMTAwO1xuY29uZmlnLm9uZUhQZXJjZW50ID0gcGFyc2VJbnQoY2FudmFzQ29tcHV0ZWRTdHlsZU9iai5oZWlnaHQuc2xpY2UoMCwtMikpLzEwMDtcblxuY29uZmlnLmNhbnZPcHRzID0ge1xuXHRiZ1VSTDogJy4uL2ltZy9iZy1jcm93ZC0xLmpwZycsXG5cdGNvbXB1dGVkU3R5bGU6IHtcblx0XHR3aWR0aDogY29uZmlnLm9uZVdQZXJjZW50KjEwMCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5vbmVIUGVyY2VudCoxMDBcblx0fSxcblx0bW92ZW1lbnRzOiB7XG5cdFx0cmFkaXVzOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnJhZGl1c1BlcmNlbnQsXG5cdFx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCAqIGNvbmZpZy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGhQZXJjZW50XG5cdH1cbn1cblxuXG4vLyBJbml0aWFsaXplICdmYWJyaWMnIGNhbnZhcyBvYmpcbnZhciBjYW52YXMgPSBuZXcgZmFicmljLlN0YXRpY0NhbnZhcygnZ2FtZScsIHtcblx0d2lkdGg6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLFxuXHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodCxcbn0pO1xuXG4vLyBEcmF3IFwicGVyZmVjdCBzdWNjZXNzXCIgcGxhY2Ugc2hhZG93IGNpcmNsZVxuY29uZmlnLnNoYWRvd0NpcmNsZSA9IG5ldyBmYWJyaWMuQ2lyY2xlKHtcblx0ZmlsbDogJ3JnYmEoMjAwLDIwMCwyMDAsMC4yKScsXG5cdHN0cm9rZTogJ3JnYmEoMjAwLDIwMCwyMDAsMSknLFxuXHRzdHJva2VXaWR0aDogY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoyLFxuXHRyYWRpdXM6IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMucmFkaXVzICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCxcblx0dG9wOiBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCo0NSksXG5cdGxlZnQ6IGNvbmZpZy5vbmVXUGVyY2VudCAqIDIwXG59KVxuY2FudmFzLmFkZChjb25maWcuc2hhZG93Q2lyY2xlKTtcblxuLy8gU2V0IGhhbmRsZXIgZm9yIGFkZGluZyBvZiBuZXh0IG1vdmVtZW50IGluIHF1ZXVlXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnbEFkZE1vdmVtZW50Jywgb25HbEFkZE1vdmVtZW50KTtcblxuLy8gU2V0IGhhbmRsZXIgZm9yIG1vdmVtZW50IHJlc3VsdCBldmVudFxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xTdGF0dXMnLCBvbkdsU3RhdHVzKTtcblxuLy8gU2V0IGhhbmRsZXIgZm9yIGdhbWUgc2V0dXAgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU2V0dXBFdmVudCcsIG9uR2xTZXR1cEV2ZW50KTtcblxuLy8gU2hvdyBjdXJyZW50IGdhbWUgY29kZVxudmFyIGNvZGVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY29kZS1jb250YWluZXInKTtcbmNvZGVDb250YWluZXIuaW5uZXJIVE1MID0gY29kZTtcblxuXG4vLyAqKioqKioqKipcbi8vICogQXVkaW8gKlxuLy8gKioqKioqKioqXG5cbi8vIEFkZCBtdXRlZCBzdGF0ZSBzYXZpbmcgZmVhdHVyZSB0byBIb3dsIChhdWRpbyBsaWIpXG5Ib3dsLnByb3RvdHlwZS5tdXRlZCA9IGZhbHNlO1xuSG93bC5tdXRlZCA9IGZhbHNlO1xuXG4vLyBHZXQgdm9sdW1lIGJ1dHRvbiBlbGVtZW50XG52YXIgdm9sdW1lQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1idG4nKVswXTtcbi8vIGFuZCBzZXQgb25DbGljayBldmVudCBoYW5kbGVyXG52b2x1bWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvblZvbHVtZUJ0bkNsaWNrKTtcblxuLy8gR2V0IHZvbHVtZSBsZXZlbCBzbGlkZXJcbnZhciB2b2x1bWVTbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudm9sdW1lLWlucHV0JylbMF07XG4vLyBhbmQgc2V0IG9uSW5wdXQgZXZlbnQgaGFuZGxlclxudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0Jywgb25Wb2x1bWVTbGlkZXJJbnB1dClcblxuXG4vLyBDaGFuZ2UgY2FudmFzIGJhY2tncm91bmQgc2l6ZSBvbiB3aW5kb3cgcmVzaXplXG53aW5kb3cub25yZXNpemUgPSBmdW5jdGlvbigpe1xuXHRyZWZyZXNoQ29tcHV0ZWRTaXplcyhjYW52YXNDb21wdXRlZFN0eWxlT2JqKTtcblx0Y2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyk7XG59XG5cblxuXG5cblxuXG5cblxuXG4vLyBURVNUXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xuXG59KSgpO1xuLyoqXG4gKiBnYW1lbG9naWMuanNcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgLy9cblxuICAgIHZhciBFUFNJTE9OID0gMTAwMDtcbiAgICB2YXIgY29uZmlnID0ge307XG5cbiAgICAvLyBBY3Rpb25zIHBlcmZvcm1lZCB3aGVuIGN1cnJlbnQgZ2FtZSBzZXR0aW5ncyByZWNpZXZlZFxuICAgIGZ1bmN0aW9uIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSB7XG5cdGNvbnNvbGUubG9nKCdhZ1NldHVwRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0Ly9cbiAgICBcdGNvbmZpZy5tb3ZlbWVudHMgPSBldmVudC5kZXRhaWwuY29tbWFuZHM7XG5cdC8vXG5cdGxldCBhdWRpb0ZpbGVVUkwgPSAnaHR0cDovLycgKyB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgKyAnc29uZ3MvJyArIGV2ZW50LmRldGFpbC5zb25nO1xuXHQvLyBsZXQgYXVkaW9GaWxlVVJMID0gJy4uL2F1ZGlvLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Y29uc29sZS5sb2coJ2F1ZGlvIGZpbGUgdXJsOiAnICsgYXVkaW9GaWxlVVJMKTtcblx0Y29uZmlnLmF1ZGlvID0gbmV3IEhvd2woe1xuXHQgICAgdXJsczogW2F1ZGlvRmlsZVVSTF0sXG5cdCAgICBhdXRvcGxheTogZmFsc2UsXG5cdCAgICB2b2x1bWU6IDAuOCxcblx0fSk7XG5cdC8vIEdlbmVyYXRlIG5ldyBldmVudCBmb3IgdGhlIHZpZXcuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdnbFNldHVwRXZlbnQnLFxuXHQgICAge2RldGFpbDoge3Nvbmc6IGV2ZW50LmRldGFpbC5zb25nLCBicG06IGV2ZW50LmRldGFpbC5icG0sIGNvbW1hbmRzOiBldmVudC5kZXRhaWwuY29tbWFuZHMsIG11c2ljOiBjb25maWcuYXVkaW99fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0Ly8gQlBNLCBtaW5JbnRlcnZhbCwgYmVnaW5uaW5nIG9mZnNldFxuXHRjb25maWcuYnBtID0gZXZlbnQuZGV0YWlsLmJwbTtcblx0Y29uZmlnLm1pbkludGVydmFsID0gNjAwMDAgLyBjb25maWcuYnBtO1xuXHRjb25maWcuYmVnaW5uaW5nT2Zmc2V0ID0gZXZlbnQuZGV0YWlsLm9mZnNldDtcblx0Ly8gU3RhcnQuXG5cdGNvbmZpZy5zY29yZSA9IDA7XG5cdGNvbmZpZy5zdGFydERhdGUgPSBEYXRlLm5vdygpO1xuXHRjb25maWcuZGlzcGxheWVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFJlY2VpdmVkSW5kZXggPSAwO1xuXHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gc2VuZE1vdmVtZW50KCkge1xuXHQgICAgLy8gU2V0IGRlY2lkaW5nIHRoZSBzdGF0dXMgaW4gdGhlIGZ1dHVyZS5cblx0ICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0Ly92YXIgaW5kZXggPSBNYXRoLnJvdW5kKChjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lIC0gY29uZmlnLnN0YXJ0RGF0ZSAtIGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQpIC8gY29uZmlnLm1pbkludGVydmFsKTtcblx0XHR2YXIgaW5kZXggPSBjb25maWcuZGlzcGxheWVkSW5kZXggLSA0O1xuXHRcdHZhciB2YWxpZCA9IGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLm1vdmVtZW50ID09IGNvbmZpZy5tb3ZlbWVudHNbaW5kZXhdICYmXG5cdFx0ICAgIE1hdGguYWJzKGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uLnRpbWUgLSBEYXRlLm5vdygpKSA8IGNvbmZpZy5taW5JbnRlcnZhbCAvIDI7XG5cdFx0aWYgKHZhbGlkKSB7XG5cdFx0ICAgIGNvbmZpZy5zY29yZSArPSAxMDA7XG5cdFx0ICAgIGNvbnNvbGUubG9nKGluZGV4KTtcblx0XHQgICAgdmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHRcdFx0J2dsU3RhdHVzJyxcblx0XHRcdHtkZXRhaWw6IHtcblx0XHRcdCAgICBzdGF0dXM6IFwic3VjY2Vzc1wiLFxuXHRcdFx0ICAgIGluZGV4OiBpbmRleCxcblx0XHRcdCAgICBuZXdTY29yZTogY29uZmlnLnNjb3JlXG5cdFx0XHR9fVxuXHRcdCAgICApO1xuXHRcdCAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdCAgICBjb25maWcuc2NvcmUgLT0gMTA7XG5cdFx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHRcdCdnbFN0YXR1cycsXG5cdFx0XHR7ZGV0YWlsOiB7XG5cdFx0XHQgICAgc3RhdHVzOiBcImZhaWxcIixcblx0XHRcdCAgICBpbmRleDogaW5kZXgsXG5cdFx0XHQgICAgbmV3U2NvcmU6IGNvbmZpZy5zY29yZVxuXHRcdFx0fX1cblx0XHQgICAgKTtcblx0XHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdFx0fVxuXHRcdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0gJ3Bhc3MnO1xuXHQgICAgfSwgY29uZmlnLm1pbkludGVydmFsKjQpO1xuXHQgICAgLy9cblx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHQnZ2xBZGRNb3ZlbWVudCcsXG5cdFx0e2RldGFpbDogY29uZmlnLm1vdmVtZW50c1tjb25maWcuZGlzcGxheWVkSW5kZXhdfVxuXHQgICAgKTtcblx0ICAgIC8vIGNvbnNvbGUubG9nKG5ld0V2ZW50KTtcblx0ICAgIGNvbmZpZy5kaXNwbGF5ZWRJbmRleCsrO1xuXHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdCAgICBjb25maWcudGltZXIgPSBzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLm1pbkludGVydmFsKTtcblx0fVxuXHRzZXRUaW1lb3V0KHNlbmRNb3ZlbWVudCwgY29uZmlnLmJlZ2lubmluZ09mZnNldCk7XG5cdGNvbmZpZy5hdWRpby5wbGF5KCk7XG4gIH1cblxuICAgIGZ1bmN0aW9uIG9uQWdDb21tYW5kRXZlbnQoZXZlbnQpIHtcblx0Ly8gY29uc29sZS5sb2coJ2FnQ29tbWFuZEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG5cdGlmIChldmVudC5kZXRhaWwubW92ZW1lbnQgPT0gJ3N0b3AnKSBjbGVhckludGVydmFsKGNvbmZpZy50aW1lcik7XG5cdGNvbmZpZy5sYXN0UGVyZm9ybWVkQWN0aW9uID0gZXZlbnQuZGV0YWlsO1xuICAgIH1cblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2FnU2V0dXBFdmVudCcsIG9uQWdTZXR1cEV2ZW50KTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ0NvbW1hbmRFdmVudCcsIG9uQWdDb21tYW5kRXZlbnQpO1xufSkoKTtcbi8qKlxuICogY29ubmVjdGlvbi5qc1xuICpcbiAqIFNldHMgY29ubmVjdGlvbiB0byB0aGUgc2VydmVyLlxuICpcbiAqIEVtaXRzICdhZ1NldHVwRXZlbnQnIGFuZCAnYWdDb21tYW5kRXZlbnQnIGV2ZW50cyB0aGF0IHNob3VsZCBiZSBoYW5kbGVkIGluXG4gKiB0aGUgdmlldy5cbiAqIGBgYWdTZXR1cEV2ZW50YGBzIHNldCB0aGUgc29uZyBuYW1lIGFuZCB0aGUgY29tbWFuZCBzZXF1ZW5jZS5cbiAqIGBgYWdDb21tYW5kRXZlbnRgYHMgc2F5IHdoaWNoIGNvbW1hbmQgdXNlciBzZW50LlxuICovXG5cbihmdW5jdGlvbigpIHtcbiAgICB2YXIgc29uZ1dhc1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICB2YXIgd3MgPSBpbygpO1xuXG4gICAgLy8gV0FSTklORyFcbiAgICAvLyBIQVJEQ09ERSEhIVxuXG4gICAgdmFyIG1vdmVtZW50cyA9IFtcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIl07XG5cbiAgICAvLyBFTkQgV0FSTklOR1xuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25TdGFydChldmVudCkge1xuXG4gIGlmIChzb25nV2FzU3RhcnRlZCkgcmV0dXJuO1xuXHRjb25zb2xlLmxvZygnb25Hb3RNZXNzYWdlT25TdGFydDogJyArIGV2ZW50KTtcblx0Ly8gUmVjZWl2ZSBzb25nIG5hbWUgYW5kIGNvbW1hbmQgc2VxdWVuY2UuXG5cdC8vIFRPRE8hIEdlbmVyYXRlIGEgbW92ZW1lbnQgc3RyaW5nIGxpc3QgZnJvbSB0aGUgc3VwcGxpZWQgY29kZS5cblxuXHQvLyB2YXIgc29uZ0RhdGFGaWxlTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nLnNsaWNlKDAsLTQpKycuanNvbic7XG5cdC8vIGNvbnNvbGUubG9nKHNvbmdEYXRhRmlsZU5hbWUpO1xuXG5cdC8vIHZhciByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG5cdC8vIHJlcXVlc3Qub3BlbihcIkdFVFwiLCBcIi4uL3NvbmdzL1wiK3NvbmdEYXRhRmlsZU5hbWUsIGZhbHNlKTtcblx0Ly8gcmVxdWVzdC5zZW5kKG51bGwpO1xuXHQvLyByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuXHQvLyAgIGlmICggcmVxdWVzdC5yZWFkeVN0YXRlID09PSA0ICYmIHJlcXVlc3Quc3RhdHVzID09PSAyMDAgKSB7XG5cdC8vICAgICB2YXIgc29uZ0RhdGFKU09OID0gSlNPTi5wYXJzZShyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XG5cdC8vICAgICAvLyBjb25zb2xlLmxvZyhteV9KU09OX29iamVjdCk7XG5cdC8vICAgfVxuXHQvLyB9XG5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7XG5cdFx0Ly8gc29uZzogICAgIGV2ZW50LmRldGFpbC5uYW1lLFxuXHRcdC8vIGJwbTogICAgICBldmVudC5kZXRhaWwuYnBtLFxuXHRcdC8vIGNvbW1hbmRzOiBldmVudC5kZXRhaWwubW92ZW1lbnRzLFxuXHRcdC8vIG9mZnNldDogICBldmVudC5kZXRhaWwub2Zmc2V0LFxuXG5cdFx0c29uZzogICAgICdIaWdod2F5LXRvLUhlbGwubXAzJyxcblx0XHRicG06ICAgICAgMTA4LFxuXHRcdGNvbW1hbmRzOiBtb3ZlbWVudHMsXG5cdFx0b2Zmc2V0OiAgIDEwMDAsXG5cdCAgICB9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0d3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZCk7XG5cdHNvbmdXYXNTdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkOiAnICsgZXZlbnQpO1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tYW5kRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdG1vdmVtZW50OiBldmVudC5tb3ZlbWVudCxcblx0XHR0aW1lOiAgICAgZXZlbnQudGltZVxuXHQgICAgfX1cblx0KTtcblx0ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG4gICAgfVxuXG4gICAgd3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPblN0YXJ0KTtcblxuICAgIHdzLm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdC8vIHdzLmpzb24uZW1pdCh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSk7XG5cdC8vIHdzLmVtaXQoSlNPTi5zdHJpbmdpZnkoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pKTtcblx0d3MuanNvbi5zZW5kKHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KTtcbiAgICB9KTtcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
