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
		config.currentBpm = event.detail.bpm * 2;
		config.currentMinInterval = 60000 / config.currentBpm;
		config.currentSongName = event.detail.song;
		config.currentAudio = event.detail.music;
		closePopup();
		console.log(event.detail.bpm);

		// Test
		// config.currentAudio.play();
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

		console.log(event.detail.movement);
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
//# sourceMappingURL=data:application/json;base64,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QUFFRCxJQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLG1CQUFqQjs7QUFFQSxJQUFHLEVBQUgsQ0FBTSxTQUFOLEVBQWlCLFlBQVc7OztBQUcvQixLQUFHLElBQUgsQ0FBUSxJQUFSLENBQWEsRUFBQyxNQUFNLFNBQVAsRUFBa0IsTUFBTSxJQUF4QixFQUFiO0FBQ0ksRUFKRDtBQUtILENBekVEIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vKiFcbiAqICBob3dsZXIuanMgdjEuMS4yOVxuICogIGhvd2xlcmpzLmNvbVxuICpcbiAqICAoYykgMjAxMy0yMDE2LCBKYW1lcyBTaW1wc29uIG9mIEdvbGRGaXJlIFN0dWRpb3NcbiAqICBnb2xkZmlyZXN0dWRpb3MuY29tXG4gKlxuICogIE1JVCBMaWNlbnNlXG4gKi9cbiFmdW5jdGlvbigpe3ZhciBlPXt9LG89bnVsbCxuPSEwLHI9ITE7dHJ5e1widW5kZWZpbmVkXCIhPXR5cGVvZiBBdWRpb0NvbnRleHQ/bz1uZXcgQXVkaW9Db250ZXh0OlwidW5kZWZpbmVkXCIhPXR5cGVvZiB3ZWJraXRBdWRpb0NvbnRleHQ/bz1uZXcgd2Via2l0QXVkaW9Db250ZXh0Om49ITF9Y2F0Y2godCl7bj0hMX1pZighbilpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQXVkaW8pdHJ5e25ldyBBdWRpb31jYXRjaCh0KXtyPSEwfWVsc2Ugcj0hMDtpZihuKXt2YXIgYT1cInVuZGVmaW5lZFwiPT10eXBlb2Ygby5jcmVhdGVHYWluP28uY3JlYXRlR2Fpbk5vZGUoKTpvLmNyZWF0ZUdhaW4oKTthLmdhaW4udmFsdWU9MSxhLmNvbm5lY3Qoby5kZXN0aW5hdGlvbil9dmFyIGk9ZnVuY3Rpb24oZSl7dGhpcy5fdm9sdW1lPTEsdGhpcy5fbXV0ZWQ9ITEsdGhpcy51c2luZ1dlYkF1ZGlvPW4sdGhpcy5jdHg9byx0aGlzLm5vQXVkaW89cix0aGlzLl9ob3dscz1bXSx0aGlzLl9jb2RlY3M9ZSx0aGlzLmlPU0F1dG9FbmFibGU9ITB9O2kucHJvdG90eXBlPXt2b2x1bWU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZihlPXBhcnNlRmxvYXQoZSksZT49MCYmMT49ZSl7by5fdm9sdW1lPWUsbiYmKGEuZ2Fpbi52YWx1ZT1lKTtmb3IodmFyIHIgaW4gby5faG93bHMpaWYoby5faG93bHMuaGFzT3duUHJvcGVydHkocikmJm8uX2hvd2xzW3JdLl93ZWJBdWRpbz09PSExKWZvcih2YXIgdD0wO3Q8by5faG93bHNbcl0uX2F1ZGlvTm9kZS5sZW5ndGg7dCsrKW8uX2hvd2xzW3JdLl9hdWRpb05vZGVbdF0udm9sdW1lPW8uX2hvd2xzW3JdLl92b2x1bWUqby5fdm9sdW1lO3JldHVybiBvfXJldHVybiBuP2EuZ2Fpbi52YWx1ZTpvLl92b2x1bWV9LG11dGU6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5fc2V0TXV0ZWQoITApLHRoaXN9LHVubXV0ZTpmdW5jdGlvbigpe3JldHVybiB0aGlzLl9zZXRNdXRlZCghMSksdGhpc30sX3NldE11dGVkOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7by5fbXV0ZWQ9ZSxuJiYoYS5nYWluLnZhbHVlPWU/MDpvLl92b2x1bWUpO2Zvcih2YXIgciBpbiBvLl9ob3dscylpZihvLl9ob3dscy5oYXNPd25Qcm9wZXJ0eShyKSYmby5faG93bHNbcl0uX3dlYkF1ZGlvPT09ITEpZm9yKHZhciB0PTA7dDxvLl9ob3dsc1tyXS5fYXVkaW9Ob2RlLmxlbmd0aDt0Kyspby5faG93bHNbcl0uX2F1ZGlvTm9kZVt0XS5tdXRlZD1lfSxjb2RlY3M6ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuX2NvZGVjc1tlXX0sX2VuYWJsZWlPU0F1ZGlvOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcztpZighb3x8IWUuX2lPU0VuYWJsZWQmJi9pUGhvbmV8aVBhZHxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSl7ZS5faU9TRW5hYmxlZD0hMTt2YXIgbj1mdW5jdGlvbigpe3ZhciByPW8uY3JlYXRlQnVmZmVyKDEsMSwyMjA1MCksdD1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO3QuYnVmZmVyPXIsdC5jb25uZWN0KG8uZGVzdGluYXRpb24pLFwidW5kZWZpbmVkXCI9PXR5cGVvZiB0LnN0YXJ0P3Qubm90ZU9uKDApOnQuc3RhcnQoMCksc2V0VGltZW91dChmdW5jdGlvbigpeyh0LnBsYXliYWNrU3RhdGU9PT10LlBMQVlJTkdfU1RBVEV8fHQucGxheWJhY2tTdGF0ZT09PXQuRklOSVNIRURfU1RBVEUpJiYoZS5faU9TRW5hYmxlZD0hMCxlLmlPU0F1dG9FbmFibGU9ITEsd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0b3VjaGVuZFwiLG4sITEpKX0sMCl9O3JldHVybiB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInRvdWNoZW5kXCIsbiwhMSksZX19fTt2YXIgdT1udWxsLGQ9e307cnx8KHU9bmV3IEF1ZGlvLGQ9e21wMzohIXUuY2FuUGxheVR5cGUoXCJhdWRpby9tcGVnO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvcHVzOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vb2dnOyBjb2RlY3M9XCJvcHVzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxvZ2c6ISF1LmNhblBsYXlUeXBlKCdhdWRpby9vZ2c7IGNvZGVjcz1cInZvcmJpc1wiJykucmVwbGFjZSgvXm5vJC8sXCJcIiksd2F2OiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2F2OyBjb2RlY3M9XCIxXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxhYWM6ISF1LmNhblBsYXlUeXBlKFwiYXVkaW8vYWFjO1wiKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtNGE6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbTRhO1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL200YTtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSxtcDQ6ISEodS5jYW5QbGF5VHlwZShcImF1ZGlvL3gtbXA0O1wiKXx8dS5jYW5QbGF5VHlwZShcImF1ZGlvL21wNDtcIil8fHUuY2FuUGxheVR5cGUoXCJhdWRpby9hYWM7XCIpKS5yZXBsYWNlKC9ebm8kLyxcIlwiKSx3ZWJhOiEhdS5jYW5QbGF5VHlwZSgnYXVkaW8vd2VibTsgY29kZWNzPVwidm9yYmlzXCInKS5yZXBsYWNlKC9ebm8kLyxcIlwiKX0pO3ZhciBsPW5ldyBpKGQpLGY9ZnVuY3Rpb24oZSl7dmFyIHI9dGhpcztyLl9hdXRvcGxheT1lLmF1dG9wbGF5fHwhMSxyLl9idWZmZXI9ZS5idWZmZXJ8fCExLHIuX2R1cmF0aW9uPWUuZHVyYXRpb258fDAsci5fZm9ybWF0PWUuZm9ybWF0fHxudWxsLHIuX2xvb3A9ZS5sb29wfHwhMSxyLl9sb2FkZWQ9ITEsci5fc3ByaXRlPWUuc3ByaXRlfHx7fSxyLl9zcmM9ZS5zcmN8fFwiXCIsci5fcG9zM2Q9ZS5wb3MzZHx8WzAsMCwtLjVdLHIuX3ZvbHVtZT12b2lkIDAhPT1lLnZvbHVtZT9lLnZvbHVtZToxLHIuX3VybHM9ZS51cmxzfHxbXSxyLl9yYXRlPWUucmF0ZXx8MSxyLl9tb2RlbD1lLm1vZGVsfHxudWxsLHIuX29ubG9hZD1bZS5vbmxvYWR8fGZ1bmN0aW9uKCl7fV0sci5fb25sb2FkZXJyb3I9W2Uub25sb2FkZXJyb3J8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmQ9W2Uub25lbmR8fGZ1bmN0aW9uKCl7fV0sci5fb25wYXVzZT1bZS5vbnBhdXNlfHxmdW5jdGlvbigpe31dLHIuX29ucGxheT1bZS5vbnBsYXl8fGZ1bmN0aW9uKCl7fV0sci5fb25lbmRUaW1lcj1bXSxyLl93ZWJBdWRpbz1uJiYhci5fYnVmZmVyLHIuX2F1ZGlvTm9kZT1bXSxyLl93ZWJBdWRpbyYmci5fc2V0dXBBdWRpb05vZGUoKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbyYmbyYmbC5pT1NBdXRvRW5hYmxlJiZsLl9lbmFibGVpT1NBdWRpbygpLGwuX2hvd2xzLnB1c2gociksci5sb2FkKCl9O2lmKGYucHJvdG90eXBlPXtsb2FkOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyxvPW51bGw7aWYocilyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiTm8gYXVkaW8gc3VwcG9ydC5cIikpO2Zvcih2YXIgbj0wO248ZS5fdXJscy5sZW5ndGg7bisrKXt2YXIgdCxhO2lmKGUuX2Zvcm1hdCl0PWUuX2Zvcm1hdDtlbHNle2lmKGE9ZS5fdXJsc1tuXSx0PS9eZGF0YTphdWRpb1xcLyhbXjssXSspOy9pLmV4ZWMoYSksdHx8KHQ9L1xcLihbXi5dKykkLy5leGVjKGEuc3BsaXQoXCI/XCIsMSlbMF0pKSwhdClyZXR1cm4gdm9pZCBlLm9uKFwibG9hZGVycm9yXCIsbmV3IEVycm9yKFwiQ291bGQgbm90IGV4dHJhY3QgZm9ybWF0IGZyb20gcGFzc2VkIFVSTHMsIHBsZWFzZSBhZGQgZm9ybWF0IHBhcmFtZXRlci5cIikpO3Q9dFsxXS50b0xvd2VyQ2FzZSgpfWlmKGRbdF0pe289ZS5fdXJsc1tuXTticmVha319aWYoIW8pcmV0dXJuIHZvaWQgZS5vbihcImxvYWRlcnJvclwiLG5ldyBFcnJvcihcIk5vIGNvZGVjIHN1cHBvcnQgZm9yIHNlbGVjdGVkIGF1ZGlvIHNvdXJjZXMuXCIpKTtpZihlLl9zcmM9byxlLl93ZWJBdWRpbylzKGUsbyk7ZWxzZXt2YXIgdT1uZXcgQXVkaW87dS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIixmdW5jdGlvbigpe3UuZXJyb3ImJjQ9PT11LmVycm9yLmNvZGUmJihpLm5vQXVkaW89ITApLGUub24oXCJsb2FkZXJyb3JcIix7dHlwZTp1LmVycm9yP3UuZXJyb3IuY29kZTowfSl9LCExKSxlLl9hdWRpb05vZGUucHVzaCh1KSx1LnNyYz1vLHUuX3Bvcz0wLHUucHJlbG9hZD1cImF1dG9cIix1LnZvbHVtZT1sLl9tdXRlZD8wOmUuX3ZvbHVtZSpsLnZvbHVtZSgpO3ZhciBmPWZ1bmN0aW9uKCl7ZS5fZHVyYXRpb249TWF0aC5jZWlsKDEwKnUuZHVyYXRpb24pLzEwLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZiwhMSksdS5sb2FkKCl9cmV0dXJuIGV9LHVybHM6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztyZXR1cm4gZT8oby5zdG9wKCksby5fdXJscz1cInN0cmluZ1wiPT10eXBlb2YgZT9bZV06ZSxvLl9sb2FkZWQ9ITEsby5sb2FkKCksbyk6by5fdXJsc30scGxheTpmdW5jdGlvbihlLG4pe3ZhciByPXRoaXM7cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKG49ZSksZSYmXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8KGU9XCJfZGVmYXVsdFwiKSxyLl9sb2FkZWQ/ci5fc3ByaXRlW2VdPyhyLl9pbmFjdGl2ZU5vZGUoZnVuY3Rpb24odCl7dC5fc3ByaXRlPWU7dmFyIGE9dC5fcG9zPjA/dC5fcG9zOnIuX3Nwcml0ZVtlXVswXS8xZTMsaT0wO3IuX3dlYkF1ZGlvPyhpPXIuX3Nwcml0ZVtlXVsxXS8xZTMtdC5fcG9zLHQuX3Bvcz4wJiYoYT1yLl9zcHJpdGVbZV1bMF0vMWUzK2EpKTppPXIuX3Nwcml0ZVtlXVsxXS8xZTMtKGEtci5fc3ByaXRlW2VdWzBdLzFlMyk7dmFyIHUsZD0hKCFyLl9sb29wJiYhci5fc3ByaXRlW2VdWzJdKSxmPVwic3RyaW5nXCI9PXR5cGVvZiBuP246TWF0aC5yb3VuZChEYXRlLm5vdygpKk1hdGgucmFuZG9tKCkpK1wiXCI7aWYoZnVuY3Rpb24oKXt2YXIgbz17aWQ6ZixzcHJpdGU6ZSxsb29wOmR9O3U9c2V0VGltZW91dChmdW5jdGlvbigpeyFyLl93ZWJBdWRpbyYmZCYmci5zdG9wKG8uaWQpLnBsYXkoZSxvLmlkKSxyLl93ZWJBdWRpbyYmIWQmJihyLl9ub2RlQnlJZChvLmlkKS5wYXVzZWQ9ITAsci5fbm9kZUJ5SWQoby5pZCkuX3Bvcz0wLHIuX2NsZWFyRW5kVGltZXIoby5pZCkpLHIuX3dlYkF1ZGlvfHxkfHxyLnN0b3Aoby5pZCksci5vbihcImVuZFwiLGYpfSxpL3IuX3JhdGUqMWUzKSxyLl9vbmVuZFRpbWVyLnB1c2goe3RpbWVyOnUsaWQ6by5pZH0pfSgpLHIuX3dlYkF1ZGlvKXt2YXIgcz1yLl9zcHJpdGVbZV1bMF0vMWUzLF89ci5fc3ByaXRlW2VdWzFdLzFlMzt0LmlkPWYsdC5wYXVzZWQ9ITEscChyLFtkLHMsX10sZiksci5fcGxheVN0YXJ0PW8uY3VycmVudFRpbWUsdC5nYWluLnZhbHVlPXIuX3ZvbHVtZSxcInVuZGVmaW5lZFwiPT10eXBlb2YgdC5idWZmZXJTb3VyY2Uuc3RhcnQ/ZD90LmJ1ZmZlclNvdXJjZS5ub3RlR3JhaW5PbigwLGEsODY0MDApOnQuYnVmZmVyU291cmNlLm5vdGVHcmFpbk9uKDAsYSxpKTpkP3QuYnVmZmVyU291cmNlLnN0YXJ0KDAsYSw4NjQwMCk6dC5idWZmZXJTb3VyY2Uuc3RhcnQoMCxhLGkpfWVsc2V7aWYoNCE9PXQucmVhZHlTdGF0ZSYmKHQucmVhZHlTdGF0ZXx8IW5hdmlnYXRvci5pc0NvY29vbkpTKSlyZXR1cm4gci5fY2xlYXJFbmRUaW1lcihmKSxmdW5jdGlvbigpe3ZhciBvPXIsYT1lLGk9bix1PXQsZD1mdW5jdGlvbigpe28ucGxheShhLGkpLHUucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9O3UuYWRkRXZlbnRMaXN0ZW5lcihcImNhbnBsYXl0aHJvdWdoXCIsZCwhMSl9KCkscjt0LnJlYWR5U3RhdGU9NCx0LmlkPWYsdC5jdXJyZW50VGltZT1hLHQubXV0ZWQ9bC5fbXV0ZWR8fHQubXV0ZWQsdC52b2x1bWU9ci5fdm9sdW1lKmwudm9sdW1lKCksc2V0VGltZW91dChmdW5jdGlvbigpe3QucGxheSgpfSwwKX1yZXR1cm4gci5vbihcInBsYXlcIiksXCJmdW5jdGlvblwiPT10eXBlb2YgbiYmbihmKSxyfSkscik6KFwiZnVuY3Rpb25cIj09dHlwZW9mIG4mJm4oKSxyKTooci5vbihcImxvYWRcIixmdW5jdGlvbigpe3IucGxheShlLG4pfSkscil9LHBhdXNlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28ucGF1c2UoZSl9KSxvO28uX2NsZWFyRW5kVGltZXIoZSk7dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7aWYobilpZihuLl9wb3M9by5wb3MobnVsbCxlKSxvLl93ZWJBdWRpbyl7aWYoIW4uYnVmZmVyU291cmNlfHxuLnBhdXNlZClyZXR1cm4gbztuLnBhdXNlZD0hMCxcInVuZGVmaW5lZFwiPT10eXBlb2Ygbi5idWZmZXJTb3VyY2Uuc3RvcD9uLmJ1ZmZlclNvdXJjZS5ub3RlT2ZmKDApOm4uYnVmZmVyU291cmNlLnN0b3AoMCl9ZWxzZSBuLnBhdXNlKCk7cmV0dXJuIG8ub24oXCJwYXVzZVwiKSxvfSxzdG9wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7aWYoIW8uX2xvYWRlZClyZXR1cm4gby5vbihcInBsYXlcIixmdW5jdGlvbigpe28uc3RvcChlKX0pLG87by5fY2xlYXJFbmRUaW1lcihlKTt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtpZihuKWlmKG4uX3Bvcz0wLG8uX3dlYkF1ZGlvKXtpZighbi5idWZmZXJTb3VyY2V8fG4ucGF1c2VkKXJldHVybiBvO24ucGF1c2VkPSEwLFwidW5kZWZpbmVkXCI9PXR5cGVvZiBuLmJ1ZmZlclNvdXJjZS5zdG9wP24uYnVmZmVyU291cmNlLm5vdGVPZmYoMCk6bi5idWZmZXJTb3VyY2Uuc3RvcCgwKX1lbHNlIGlzTmFOKG4uZHVyYXRpb24pfHwobi5wYXVzZSgpLG4uY3VycmVudFRpbWU9MCk7cmV0dXJuIG99LG11dGU6ZnVuY3Rpb24oZSl7dmFyIG89dGhpcztpZighby5fbG9hZGVkKXJldHVybiBvLm9uKFwicGxheVwiLGZ1bmN0aW9uKCl7by5tdXRlKGUpfSksbzt2YXIgbj1lP28uX25vZGVCeUlkKGUpOm8uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gbiYmKG8uX3dlYkF1ZGlvP24uZ2Fpbi52YWx1ZT0wOm4ubXV0ZWQ9ITApLG99LHVubXV0ZTpmdW5jdGlvbihlKXt2YXIgbz10aGlzO2lmKCFvLl9sb2FkZWQpcmV0dXJuIG8ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtvLnVubXV0ZShlKX0pLG87dmFyIG49ZT9vLl9ub2RlQnlJZChlKTpvLl9hY3RpdmVOb2RlKCk7cmV0dXJuIG4mJihvLl93ZWJBdWRpbz9uLmdhaW4udmFsdWU9by5fdm9sdW1lOm4ubXV0ZWQ9ITEpLG99LHZvbHVtZTpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXM7aWYoZT1wYXJzZUZsb2F0KGUpLGU+PTAmJjE+PWUpe2lmKG4uX3ZvbHVtZT1lLCFuLl9sb2FkZWQpcmV0dXJuIG4ub24oXCJwbGF5XCIsZnVuY3Rpb24oKXtuLnZvbHVtZShlLG8pfSksbjt2YXIgcj1vP24uX25vZGVCeUlkKG8pOm4uX2FjdGl2ZU5vZGUoKTtyZXR1cm4gciYmKG4uX3dlYkF1ZGlvP3IuZ2Fpbi52YWx1ZT1lOnIudm9sdW1lPWUqbC52b2x1bWUoKSksbn1yZXR1cm4gbi5fdm9sdW1lfSxsb29wOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJib29sZWFuXCI9PXR5cGVvZiBlPyhvLl9sb29wPWUsbyk6by5fbG9vcH0sc3ByaXRlOmZ1bmN0aW9uKGUpe3ZhciBvPXRoaXM7cmV0dXJuXCJvYmplY3RcIj09dHlwZW9mIGU/KG8uX3Nwcml0ZT1lLG8pOm8uX3Nwcml0ZX0scG9zOmZ1bmN0aW9uKGUsbil7dmFyIHI9dGhpcztpZighci5fbG9hZGVkKXJldHVybiByLm9uKFwibG9hZFwiLGZ1bmN0aW9uKCl7ci5wb3MoZSl9KSxcIm51bWJlclwiPT10eXBlb2YgZT9yOnIuX3Bvc3x8MDtlPXBhcnNlRmxvYXQoZSk7dmFyIHQ9bj9yLl9ub2RlQnlJZChuKTpyLl9hY3RpdmVOb2RlKCk7aWYodClyZXR1cm4gZT49MD8oci5wYXVzZShuKSx0Ll9wb3M9ZSxyLnBsYXkodC5fc3ByaXRlLG4pLHIpOnIuX3dlYkF1ZGlvP3QuX3Bvcysoby5jdXJyZW50VGltZS1yLl9wbGF5U3RhcnQpOnQuY3VycmVudFRpbWU7aWYoZT49MClyZXR1cm4gcjtmb3IodmFyIGE9MDthPHIuX2F1ZGlvTm9kZS5sZW5ndGg7YSsrKWlmKHIuX2F1ZGlvTm9kZVthXS5wYXVzZWQmJjQ9PT1yLl9hdWRpb05vZGVbYV0ucmVhZHlTdGF0ZSlyZXR1cm4gci5fd2ViQXVkaW8/ci5fYXVkaW9Ob2RlW2FdLl9wb3M6ci5fYXVkaW9Ob2RlW2FdLmN1cnJlbnRUaW1lfSxwb3MzZDpmdW5jdGlvbihlLG8sbixyKXt2YXIgdD10aGlzO2lmKG89XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG8mJm8/bzowLG49XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG4mJm4/bjotLjUsIXQuX2xvYWRlZClyZXR1cm4gdC5vbihcInBsYXlcIixmdW5jdGlvbigpe3QucG9zM2QoZSxvLG4scil9KSx0O2lmKCEoZT49MHx8MD5lKSlyZXR1cm4gdC5fcG9zM2Q7aWYodC5fd2ViQXVkaW8pe3ZhciBhPXI/dC5fbm9kZUJ5SWQocik6dC5fYWN0aXZlTm9kZSgpO2EmJih0Ll9wb3MzZD1bZSxvLG5dLGEucGFubmVyLnNldFBvc2l0aW9uKGUsbyxuKSxhLnBhbm5lci5wYW5uaW5nTW9kZWw9dC5fbW9kZWx8fFwiSFJURlwiKX1yZXR1cm4gdH0sZmFkZTpmdW5jdGlvbihlLG8sbixyLHQpe3ZhciBhPXRoaXMsaT1NYXRoLmFicyhlLW8pLHU9ZT5vP1wiZG93blwiOlwidXBcIixkPWkvLjAxLGw9bi9kO2lmKCFhLl9sb2FkZWQpcmV0dXJuIGEub24oXCJsb2FkXCIsZnVuY3Rpb24oKXthLmZhZGUoZSxvLG4scix0KX0pLGE7YS52b2x1bWUoZSx0KTtmb3IodmFyIGY9MTtkPj1mO2YrKykhZnVuY3Rpb24oKXt2YXIgZT1hLl92b2x1bWUrKFwidXBcIj09PXU/LjAxOi0uMDEpKmYsbj1NYXRoLnJvdW5kKDFlMyplKS8xZTMsaT1vO3NldFRpbWVvdXQoZnVuY3Rpb24oKXthLnZvbHVtZShuLHQpLG49PT1pJiZyJiZyKCl9LGwqZil9KCl9LGZhZGVJbjpmdW5jdGlvbihlLG8sbil7cmV0dXJuIHRoaXMudm9sdW1lKDApLnBsYXkoKS5mYWRlKDAsZSxvLG4pfSxmYWRlT3V0OmZ1bmN0aW9uKGUsbyxuLHIpe3ZhciB0PXRoaXM7cmV0dXJuIHQuZmFkZSh0Ll92b2x1bWUsZSxvLGZ1bmN0aW9uKCl7biYmbigpLHQucGF1c2UociksdC5vbihcImVuZFwiKX0scil9LF9ub2RlQnlJZDpmdW5jdGlvbihlKXtmb3IodmFyIG89dGhpcyxuPW8uX2F1ZGlvTm9kZVswXSxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0uaWQ9PT1lKXtuPW8uX2F1ZGlvTm9kZVtyXTticmVha31yZXR1cm4gbn0sX2FjdGl2ZU5vZGU6ZnVuY3Rpb24oKXtmb3IodmFyIGU9dGhpcyxvPW51bGwsbj0wO248ZS5fYXVkaW9Ob2RlLmxlbmd0aDtuKyspaWYoIWUuX2F1ZGlvTm9kZVtuXS5wYXVzZWQpe289ZS5fYXVkaW9Ob2RlW25dO2JyZWFrfXJldHVybiBlLl9kcmFpblBvb2woKSxvfSxfaW5hY3RpdmVOb2RlOmZ1bmN0aW9uKGUpe2Zvcih2YXIgbz10aGlzLG49bnVsbCxyPTA7cjxvLl9hdWRpb05vZGUubGVuZ3RoO3IrKylpZihvLl9hdWRpb05vZGVbcl0ucGF1c2VkJiY0PT09by5fYXVkaW9Ob2RlW3JdLnJlYWR5U3RhdGUpe2Uoby5fYXVkaW9Ob2RlW3JdKSxuPSEwO2JyZWFrfWlmKG8uX2RyYWluUG9vbCgpLCFuKXt2YXIgdDtpZihvLl93ZWJBdWRpbyl0PW8uX3NldHVwQXVkaW9Ob2RlKCksZSh0KTtlbHNle28ubG9hZCgpLHQ9by5fYXVkaW9Ob2RlW28uX2F1ZGlvTm9kZS5sZW5ndGgtMV07dmFyIGE9bmF2aWdhdG9yLmlzQ29jb29uSlM/XCJjYW5wbGF5dGhyb3VnaFwiOlwibG9hZGVkbWV0YWRhdGFcIixpPWZ1bmN0aW9uKCl7dC5yZW1vdmVFdmVudExpc3RlbmVyKGEsaSwhMSksZSh0KX07dC5hZGRFdmVudExpc3RlbmVyKGEsaSwhMSl9fX0sX2RyYWluUG9vbDpmdW5jdGlvbigpe3ZhciBlLG89dGhpcyxuPTA7Zm9yKGU9MDtlPG8uX2F1ZGlvTm9kZS5sZW5ndGg7ZSsrKW8uX2F1ZGlvTm9kZVtlXS5wYXVzZWQmJm4rKztmb3IoZT1vLl9hdWRpb05vZGUubGVuZ3RoLTE7ZT49MCYmISg1Pj1uKTtlLS0pby5fYXVkaW9Ob2RlW2VdLnBhdXNlZCYmKG8uX3dlYkF1ZGlvJiZvLl9hdWRpb05vZGVbZV0uZGlzY29ubmVjdCgwKSxuLS0sby5fYXVkaW9Ob2RlLnNwbGljZShlLDEpKX0sX2NsZWFyRW5kVGltZXI6ZnVuY3Rpb24oZSl7Zm9yKHZhciBvPXRoaXMsbj0tMSxyPTA7cjxvLl9vbmVuZFRpbWVyLmxlbmd0aDtyKyspaWYoby5fb25lbmRUaW1lcltyXS5pZD09PWUpe249cjticmVha312YXIgdD1vLl9vbmVuZFRpbWVyW25dO3QmJihjbGVhclRpbWVvdXQodC50aW1lciksby5fb25lbmRUaW1lci5zcGxpY2UobiwxKSl9LF9zZXR1cEF1ZGlvTm9kZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsbj1lLl9hdWRpb05vZGUscj1lLl9hdWRpb05vZGUubGVuZ3RoO3JldHVybiBuW3JdPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBvLmNyZWF0ZUdhaW4/by5jcmVhdGVHYWluTm9kZSgpOm8uY3JlYXRlR2FpbigpLG5bcl0uZ2Fpbi52YWx1ZT1lLl92b2x1bWUsbltyXS5wYXVzZWQ9ITAsbltyXS5fcG9zPTAsbltyXS5yZWFkeVN0YXRlPTQsbltyXS5jb25uZWN0KGEpLG5bcl0ucGFubmVyPW8uY3JlYXRlUGFubmVyKCksbltyXS5wYW5uZXIucGFubmluZ01vZGVsPWUuX21vZGVsfHxcImVxdWFscG93ZXJcIixuW3JdLnBhbm5lci5zZXRQb3NpdGlvbihlLl9wb3MzZFswXSxlLl9wb3MzZFsxXSxlLl9wb3MzZFsyXSksbltyXS5wYW5uZXIuY29ubmVjdChuW3JdKSxuW3JdfSxvbjpmdW5jdGlvbihlLG8pe3ZhciBuPXRoaXMscj1uW1wiX29uXCIrZV07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgbylyLnB1c2gobyk7ZWxzZSBmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylvP3JbdF0uY2FsbChuLG8pOnJbdF0uY2FsbChuKTtyZXR1cm4gbn0sb2ZmOmZ1bmN0aW9uKGUsbyl7dmFyIG49dGhpcyxyPW5bXCJfb25cIitlXTtpZihvKXtmb3IodmFyIHQ9MDt0PHIubGVuZ3RoO3QrKylpZihvPT09clt0XSl7ci5zcGxpY2UodCwxKTticmVha319ZWxzZSBuW1wiX29uXCIrZV09W107cmV0dXJuIG59LHVubG9hZDpmdW5jdGlvbigpe2Zvcih2YXIgbz10aGlzLG49by5fYXVkaW9Ob2RlLHI9MDtyPG8uX2F1ZGlvTm9kZS5sZW5ndGg7cisrKW5bcl0ucGF1c2VkfHwoby5zdG9wKG5bcl0uaWQpLG8ub24oXCJlbmRcIixuW3JdLmlkKSksby5fd2ViQXVkaW8/bltyXS5kaXNjb25uZWN0KDApOm5bcl0uc3JjPVwiXCI7Zm9yKHI9MDtyPG8uX29uZW5kVGltZXIubGVuZ3RoO3IrKyljbGVhclRpbWVvdXQoby5fb25lbmRUaW1lcltyXS50aW1lcik7dmFyIHQ9bC5faG93bHMuaW5kZXhPZihvKTtudWxsIT09dCYmdD49MCYmbC5faG93bHMuc3BsaWNlKHQsMSksZGVsZXRlIGVbby5fc3JjXSxvPW51bGx9fSxuKXZhciBzPWZ1bmN0aW9uKG8sbil7aWYobiBpbiBlKXJldHVybiBvLl9kdXJhdGlvbj1lW25dLmR1cmF0aW9uLHZvaWQgYyhvKTtpZigvXmRhdGE6W147XSs7YmFzZTY0LC8udGVzdChuKSl7Zm9yKHZhciByPWF0b2Iobi5zcGxpdChcIixcIilbMV0pLHQ9bmV3IFVpbnQ4QXJyYXkoci5sZW5ndGgpLGE9MDthPHIubGVuZ3RoOysrYSl0W2FdPXIuY2hhckNvZGVBdChhKTtfKHQuYnVmZmVyLG8sbil9ZWxzZXt2YXIgaT1uZXcgWE1MSHR0cFJlcXVlc3Q7aS5vcGVuKFwiR0VUXCIsbiwhMCksaS5yZXNwb25zZVR5cGU9XCJhcnJheWJ1ZmZlclwiLGkub25sb2FkPWZ1bmN0aW9uKCl7XyhpLnJlc3BvbnNlLG8sbil9LGkub25lcnJvcj1mdW5jdGlvbigpe28uX3dlYkF1ZGlvJiYoby5fYnVmZmVyPSEwLG8uX3dlYkF1ZGlvPSExLG8uX2F1ZGlvTm9kZT1bXSxkZWxldGUgby5fZ2Fpbk5vZGUsZGVsZXRlIGVbbl0sby5sb2FkKCkpfTt0cnl7aS5zZW5kKCl9Y2F0Y2godSl7aS5vbmVycm9yKCl9fX0sXz1mdW5jdGlvbihuLHIsdCl7by5kZWNvZGVBdWRpb0RhdGEobixmdW5jdGlvbihvKXtvJiYoZVt0XT1vLGMocixvKSl9LGZ1bmN0aW9uKGUpe3Iub24oXCJsb2FkZXJyb3JcIixlKX0pfSxjPWZ1bmN0aW9uKGUsbyl7ZS5fZHVyYXRpb249bz9vLmR1cmF0aW9uOmUuX2R1cmF0aW9uLDA9PT1PYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhlLl9zcHJpdGUpLmxlbmd0aCYmKGUuX3Nwcml0ZT17X2RlZmF1bHQ6WzAsMWUzKmUuX2R1cmF0aW9uXX0pLGUuX2xvYWRlZHx8KGUuX2xvYWRlZD0hMCxlLm9uKFwibG9hZFwiKSksZS5fYXV0b3BsYXkmJmUucGxheSgpfSxwPWZ1bmN0aW9uKG4scix0KXt2YXIgYT1uLl9ub2RlQnlJZCh0KTthLmJ1ZmZlclNvdXJjZT1vLmNyZWF0ZUJ1ZmZlclNvdXJjZSgpLGEuYnVmZmVyU291cmNlLmJ1ZmZlcj1lW24uX3NyY10sYS5idWZmZXJTb3VyY2UuY29ubmVjdChhLnBhbm5lciksYS5idWZmZXJTb3VyY2UubG9vcD1yWzBdLHJbMF0mJihhLmJ1ZmZlclNvdXJjZS5sb29wU3RhcnQ9clsxXSxhLmJ1ZmZlclNvdXJjZS5sb29wRW5kPXJbMV0rclsyXSksYS5idWZmZXJTb3VyY2UucGxheWJhY2tSYXRlLnZhbHVlPW4uX3JhdGV9O1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJue0hvd2xlcjpsLEhvd2w6Zn19KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgZXhwb3J0cyYmKGV4cG9ydHMuSG93bGVyPWwsZXhwb3J0cy5Ib3dsPWYpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJih3aW5kb3cuSG93bGVyPWwsd2luZG93Lkhvd2w9Zil9KCk7XG5cblxuO1xuLy9cbi8vXHRVdGlsc1xuLy9cbi8vICogYW5pbWF0ZShjYiwgZHVyYXRvbikgLS0gd3JhcHBlciBvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbi8vXG4vLyBET00gbWFuaXB1bGF0aW9uc1xuLy9cbi8vICogY2xvc2VQb3B1cChldmVudCkgLS0gY2xvc2UgcG9wdXAgd2l0aCB1c2VycyB1bmlxdWUgY29kZVxuLy8gKiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSAtLSBoYW5kbGVyIGZvciB2b2x1bWUgYnV0dG9ucyBjbGlja3MgKG11dGUvdW5tdXRlIHRyaWdnZXIpXG4vLyAqIG9uVm9sdW1lU2xpZGVySW5wdXQoZXZlbnQpIC0tIGNoYW5nZSBhdWRpbyB2b2x1bWUgd2hlbnZvbHVtZSBzbGlkZXIgaXMgYmVpbmcgbW92ZWRcbi8vICogdXBkYXRlU2NvcmUobnVtYmVyKSAtLSB1cGRhdGUgY3VycmVudCBzY29yZVxuLy9cbi8vXHRDYW52YXNcbi8vXG4vLyAqIHJlZnJlc2hDb21wdXRlZFNpemVzKG9iamVjdCkgLS0gY2hhbmdlIDxjYW52YXM+IHNpemVzIHRvIGFjdHVhbFxuLy8gKiBhZGRNb3ZlbWVudE9uQ2FudmFzKG1vdmVtZW50SW5mbykgLS0gYWRkIG5ldyBtb3ZlbWVudCBjYW52YXMtb2JqZWN0XG4vLyAqIGFuaW1hdGVNb3ZlbWVudChvYmplY3QpIC0tIG1ha2UgcmVjaWV2ZWQgYWxyZWFkeSBhZGRlZCBtb3ZlbWVudCBydW4gKGFuaW1hdGUpXG4vLyAqIG9uQWdTZXR1cEV2ZW50KGV2ZW50KSAtLSBoYW5kbGVyIGZvciBldmVudCwgZmlyZWQgd2hlbiBnYW1lIHNldHRpbmdzIGFyZSByZWNpZXZlZFxuLy9cbi8vIFRvIHJlbW92ZVxuLy9cbi8vICogc3RhcnQoKSAtLSBzdGFydCBnYW1lXG4vLyAqIG5leHRCZWF0KGlzRmlyc3QpIC0tIHByb2Nlc3MgKGFuZCBhZGQpIG5leHQgbW92ZW1lbnRcbi8vXG4vLyBJbml0aWFsaXphdGlvblxuLy9cblxuXG4oZnVuY3Rpb24oKXtcblxuZnVuY3Rpb24gYW5pbWF0ZShkcmF3LCBkdXJhdGlvbikge1xuICB2YXIgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcblxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gYW5pbWF0ZSh0aW1lKSB7XG4gICAgLy8g0L7Qv9GA0LXQtNC10LvQuNGC0YwsINGB0LrQvtC70YzQutC+INC/0YDQvtGI0LvQviDQstGA0LXQvNC10L3QuCDRgSDQvdCw0YfQsNC70LAg0LDQvdC40LzQsNGG0LjQuFxuICAgIHZhciB0aW1lUGFzc2VkID0gdGltZSAtIHN0YXJ0O1xuXG4gICAgLy8g0LLQvtC30LzQvtC20L3QviDQvdC10LHQvtC70YzRiNC+0LUg0L/RgNC10LLRi9GI0LXQvdC40LUg0LLRgNC10LzQtdC90LgsINCyINGN0YLQvtC8INGB0LvRg9GH0LDQtSDQt9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjCDQutC+0L3QtdGGXG4gICAgaWYgKHRpbWVQYXNzZWQgPiBkdXJhdGlvbikgdGltZVBhc3NlZCA9IGR1cmF0aW9uO1xuXG4gICAgLy8g0L3QsNGA0LjRgdC+0LLQsNGC0Ywg0YHQvtGB0YLQvtGP0L3QuNC1INCw0L3QuNC80LDRhtC40Lgg0LIg0LzQvtC80LXQvdGCIHRpbWVQYXNzZWRcbiAgICBkcmF3KHRpbWVQYXNzZWQpO1xuXG4gICAgLy8g0LXRgdC70Lgg0LLRgNC10LzRjyDQsNC90LjQvNCw0YbQuNC4INC90LUg0LfQsNC60L7QvdGH0LjQu9C+0YHRjCAtINC30LDQv9C70LDQvdC40YDQvtCy0LDRgtGMINC10YnRkSDQutCw0LTRgFxuICAgIGlmICh0aW1lUGFzc2VkIDwgZHVyYXRpb24pIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgICB9XG5cbiAgfSk7XG59XG5cblxudmFyIGNvbmZpZyA9IHtcblx0Y29sb3JzOiB7XG5cdFx0bmV1dHJhbDogJyNGRkE3MDAnLCAvLyAjOEQ5OUFFICMxMDdFN0Rcblx0XHRzdWNjZXNzOiAnI0MyRTgxMicsXG5cdFx0ZmFpbDogJyNCODBDMDknXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1c1BlcmNlbnQ6IDQsXG5cdFx0c3Ryb2tlV2lkdGhQZXJjZW50OiAwLjVcblx0fVxufVxuXG5mdW5jdGlvbiBjbG9zZVBvcHVwKGV2ZW50KSB7XG5cdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1cCcpWzBdLmNsYXNzTGlzdC5hZGQoJ2Nsb3NlZCcpO1xuXHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubG9nbycpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3dpdGgtcG9wdXAnKTtcbn1cblxuLy8gTXV0ZXMgLyB1bm11dGVzIGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZUJ0bkNsaWNrKGV2ZW50KSB7XG5cblx0aWYgKCFjb25maWcuY3VycmVudEF1ZGlvLm11dGVkKSB7XG5cblx0XHQvLyBDaGFuZ2Ugdmlld1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QucmVtb3ZlKCdmYS12b2x1bWUtdXAnKTtcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LmFkZCgnZmEtdm9sdW1lLW9mZicpO1xuXG5cdFx0Ly8gTXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZSgpO1xuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8ubXV0ZWQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ2hhbmdlIHZpZXdcblx0XHR0aGlzLmNoaWxkTm9kZXNbMV0uY2xhc3NMaXN0LnJlbW92ZSgnZmEtdm9sdW1lLW9mZicpO1xuXHRcdHRoaXMuY2hpbGROb2Rlc1sxXS5jbGFzc0xpc3QuYWRkKCdmYS12b2x1bWUtdXAnKTtcblxuXHRcdC8vIFVubXV0ZVxuXHRcdGNvbmZpZy5jdXJyZW50QXVkaW8udW5tdXRlKCk7XG5cdFx0Y29uZmlnLmN1cnJlbnRBdWRpby5tdXRlZCA9IGZhbHNlO1xuXHR9XG5cbn1cblxuLy8gQ2hhbmdlIHZvbHVtZSBsZXZlbCBvZiBjdXJyZW50IGF1ZGlvXG5mdW5jdGlvbiBvblZvbHVtZVNsaWRlcklucHV0KGV2ZW50KSB7XG5cdGNvbmZpZy5jdXJyZW50QXVkaW8udm9sdW1lKHRoaXMudmFsdWUvMTAwKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2NvcmUobmV3U2NvcmUpIHtcblxuXHR2YXIgc2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2NvcmUnKVswXTtcblx0dmFyIHNjb3JlTnVtYmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnNjb3JlLW51bWJlcicpWzBdO1xuXG5cdHNjb3JlLmNsYXNzTGlzdC5hZGQoJ3VwZGF0ZScpO1xuXHRzZXRUaW1lb3V0KCgpPT57IHNjb3JlLmNsYXNzTGlzdC5yZW1vdmUoJ3VwZGF0ZScpOyB9LCA0MDApO1xuXG5cdGNvbmZpZy5jdXJyZW50U2NvcmUgPSBwYXJzZUludChuZXdTY29yZSk7XG5cdHNjb3JlTnVtYmVyLmlubmVySFRNTCA9IGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cblx0cmV0dXJuIGNvbmZpZy5jdXJyZW50U2NvcmU7XG5cbn1cblxuLy8gKioqKioqKioqKlxuLy8gKiBDQU5WQVMgKlxuLy8gKioqKioqKioqKlxuXG4vLyBDaGFuZ2VzIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgd2hlbiBmaXJlZFxuZnVuY3Rpb24gcmVmcmVzaENvbXB1dGVkU2l6ZXMob2JqZWN0KSB7XG5cdFxuXHRjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZSA9IHtcblx0XHR3aWR0aDogK29iamVjdC53aWR0aC5zbGljZSgwLC0yKSxcblx0XHRoZWlnaHQ6ICtvYmplY3QuaGVpZ2h0LnNsaWNlKDAsLTIpXG5cdH07XG5cblx0Y2FudmFzLnNldERpbWVuc2lvbnMoe1xuXHRcdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0XHRoZWlnaHQ6IGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLmhlaWdodFxuXHR9KTtcblxufVxuXG5cbmZ1bmN0aW9uIGFkZE1vdmVtZW50T25DYW52YXMobW92ZW1lbnRJbmZvKSB7XG5cblx0aWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdHZhciByYWRpdXMgPSBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cztcblx0dmFyIHN0cm9rZVdpZHRoID0gY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aDtcblx0Ly8gdmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoIC0gKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoLzEwMCkqMykgLSByYWRpdXMqMjtcblx0dmFyIHggPSBNYXRoLnJvdW5kKGNvbmZpZy5jYW52T3B0cy5jb21wdXRlZFN0eWxlLndpZHRoKTtcblx0dmFyIHkgPSBNYXRoLnJvdW5kKGNvbmZpZy5vbmVIUGVyY2VudCAqIDQ1KSArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMS42O1xuXG5cdHZhciBjaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdFx0ZmlsbDogY29uZmlnLmNvbG9ycy5uZXV0cmFsLFxuXHRcdHN0cm9rZTogJyNGRkZGRkYnLFxuXHRcdHN0cm9rZVdpZHRoOiBzdHJva2VXaWR0aCxcblx0XHRyYWRpdXM6IHJhZGl1cyxcblx0XHRvcmlnaW5ZOiAnY2VudGVyJyxcblx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHR9KTtcblxuXHQvLyBjb25zb2xlLmxvZygtY2lyY2xlLmdldFJhZGl1c1goKSowLjgpO1xuXHR2YXIgYXJyb3c7XG5cblx0c3dpdGNoIChtb3ZlbWVudEluZm8ubmFtZSkge1xuXHRcdGNhc2UgJ3VwJzpcblx0XHRcdGFycm93ID0gbmV3IGZhYnJpYy5QYXRoKGBcblx0XHRcdFx0TSAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7Y2lyY2xlLmdldFJhZGl1c1koKSowLjExfVxuXHRcdFx0XHRMIDAgJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjU1fVxuXHRcdFx0XHRMICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAke2NpcmNsZS5nZXRSYWRpdXNYKCkqMC41fSAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAwICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4yNX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdHpgLCB7XG5cdFx0XHRcdC8vIGZpbGw6ICcjZmZmJyxcblx0XHRcdFx0b3JpZ2luWTogJ2NlbnRlcicsXG5cdFx0XHRcdG9yaWdpblg6ICdjZW50ZXInXG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2Rvd24nOlxuXHRcdFx0YXJyb3cgPSBuZXcgZmFicmljLlBhdGgoYFxuXHRcdFx0XHRNICR7Y2lyY2xlLmdldFJhZGl1c1goKSowLjY1fSAkey1jaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMTF9XG5cdFx0XHRcdEwgMCAke2NpcmNsZS5nZXRSYWRpdXNZKCkqMC41NX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNjV9ICR7LWNpcmNsZS5nZXRSYWRpdXNZKCkqMC4xMX1cblx0XHRcdFx0TCAkey1jaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHRMIDAgJHtjaXJjbGUuZ2V0UmFkaXVzWSgpKjAuMjV9XG5cdFx0XHRcdEwgJHtjaXJjbGUuZ2V0UmFkaXVzWCgpKjAuNX0gJHstY2lyY2xlLmdldFJhZGl1c1koKSowLjI1fVxuXHRcdFx0XHR6YCwge1xuXHRcdFx0XHQvLyBmaWxsOiAnI2ZmZicsXG5cdFx0XHRcdG9yaWdpblk6ICdjZW50ZXInLFxuXHRcdFx0XHRvcmlnaW5YOiAnY2VudGVyJ1xuXHRcdFx0fSk7XG5cdFx0YnJlYWtcblx0fVxuXHRcblxuXHR2YXIgbW92ZW1lbnQgPSBuZXcgZmFicmljLkdyb3VwKFtjaXJjbGUsIGFycm93XSwge1xuXHRcdHRvcDogeSxcblx0XHRsZWZ0OiB4XG5cdH0pO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QgPSBtb3ZlbWVudDtcblxuXHRjYW52YXMuYWRkKG1vdmVtZW50KTtcblx0Y2FudmFzLnJlbmRlckFsbCgpO1xuXHQvLyBtb3ZlbWVudEluZm8uc3RhdGUgPSAnYWRkZWQnO1xufVxuXG5mdW5jdGlvbiBhbmltYXRlTW92ZW1lbnQobW92ZW1lbnRJbmZvKSB7XG5cblx0Ly8gaWYgKG1vdmVtZW50SW5mby5uYW1lID09ICdwYXNzJykgcmV0dXJuO1xuXG5cdG1vdmVtZW50SW5mby5jYW52YXNPYmplY3QuYW5pbWF0ZSgnbGVmdCcsICcnKygoY29uZmlnLm9uZVdQZXJjZW50ICogMjApICsgY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5zdHJva2VXaWR0aCoxLjUpLCB7XG5cdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdGR1cmF0aW9uOiBjb25maWcuY3VycmVudE1pbkludGVydmFsKjRcblx0fSk7XG59XG5cbmZ1bmN0aW9uIG9uR2xTZXR1cEV2ZW50KGV2ZW50KSB7XG5cdGNvbmZpZy5jdXJyZW50QnBtID0gZXZlbnQuZGV0YWlsLmJwbSoyO1xuXHRjb25maWcuY3VycmVudE1pbkludGVydmFsID0gNjAwMDAgLyBjb25maWcuY3VycmVudEJwbTtcblx0Y29uZmlnLmN1cnJlbnRTb25nTmFtZSA9IGV2ZW50LmRldGFpbC5zb25nO1xuXHRjb25maWcuY3VycmVudEF1ZGlvID0gZXZlbnQuZGV0YWlsLm11c2ljO1xuXHRjbG9zZVBvcHVwKCk7XG5cdGNvbnNvbGUubG9nKGV2ZW50LmRldGFpbC5icG0pO1xuXG5cdC8vIFRlc3Rcblx0Ly8gY29uZmlnLmN1cnJlbnRBdWRpby5wbGF5KCk7XG59XG5cbi8vIEFjdGlvbnMgcGVyZm9ybWVkIHdoZW4gY3VycmVudCBnYW1lIHNldHRpbmdzIHJlY2lldmVkXG5mdW5jdGlvbiBvbkdsQWRkTW92ZW1lbnQoZXZlbnQpIHtcblxuXHRjb25maWcuY3VycmVudE1vdmVtZW50cy5wdXNoKHtuYW1lOiBldmVudC5kZXRhaWx9KTtcblx0dmFyIHRoaXNNb3ZlbWVudCA9IGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW2NvbmZpZy5jdXJyZW50TW92ZW1lbnRzLmxlbmd0aC0xXTtcblxuXHRpZiAodGhpc01vdmVtZW50Lm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0YWRkTW92ZW1lbnRPbkNhbnZhcyh0aGlzTW92ZW1lbnQpO1xuXHRhbmltYXRlTW92ZW1lbnQodGhpc01vdmVtZW50KTtcblxufVxuXG5mdW5jdGlvbiBvbkdsU3RhdHVzKGV2ZW50KSB7XG5cblx0dmFyIHN0YXR1cyA9IGV2ZW50LmRldGFpbC5zdGF0dXM7XG5cdHZhciBtb3ZlbWVudEluZGV4ID0gZXZlbnQuZGV0YWlsLmluZGV4O1xuXHR2YXIgbmV3U2NvcmUgPSBldmVudC5kZXRhaWwubmV3U2NvcmU7XG5cblx0aWYgKGNvbmZpZy5jdXJyZW50TW92ZW1lbnRzW21vdmVtZW50SW5kZXhdLm5hbWUgPT0gJ3Bhc3MnKSByZXR1cm47XG5cblx0dmFyIGNhbnZPYmogPSBjb25maWcuY3VycmVudE1vdmVtZW50c1ttb3ZlbWVudEluZGV4XS5jYW52YXNPYmplY3Q7XG5cblx0Ly8gUnVuIGNhbnZhcyBhbmltYXRpb25cblx0Y2Fudk9iai5zZXQoe1xuXHRcdGZpbGw6IGNvbmZpZy5jb2xvcnNbc3RhdHVzXSxcblx0XHQvLyBjZW50ZXJlZFNjYWxpbmc6IHRydWVcblx0fSk7XG5cblx0c3dpdGNoIChzdGF0dXMpIHtcblx0XHRjYXNlICdzdWNjZXNzJzpcblx0XHRcdGNhbnZPYmouYW5pbWF0ZSh7XG5cdFx0XHRcdCdzY2FsZVgnOiA2LFxuXHRcdFx0XHQnc2NhbGVZJzogNixcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICctPScrY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMqNS4yLFxuXHRcdFx0XHQndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyo1LjJcblx0XHRcdH0sIHtcblx0XHRcdFx0b25DaGFuZ2U6IGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpLFxuXHRcdFx0XHRkdXJhdGlvbjogNzAwLFxuXHRcdFx0XHRlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblxuXHRcdGNhc2UgJ2ZhaWwnOlxuXHRcdFx0Y2Fudk9iai5hbmltYXRlKHtcblx0XHRcdFx0J3NjYWxlWCc6IDAuOCxcblx0XHRcdFx0J3NjYWxlWSc6IDAuOCxcblx0XHRcdFx0J29wYWNpdHknOiAwLFxuXHRcdFx0XHQnbGVmdCc6ICcnKygtY29uZmlnLmNhbnZPcHRzLm1vdmVtZW50cy5yYWRpdXMpLFxuXHRcdFx0XHQvLyAndG9wJzogJy09Jytjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1c1xuXHRcdFx0fSwge1xuXHRcdFx0XHRvbkNoYW5nZTogY2FudmFzLnJlbmRlckFsbC5iaW5kKGNhbnZhcyksXG5cdFx0XHRcdGR1cmF0aW9uOiAxMDAwLFxuXHRcdFx0XHQvLyBlYXNpbmc6IGZhYnJpYy51dGlsLmVhc2UuZWFzZU91dFF1YXJ0XG5cdFx0XHR9KTtcblx0XHRicmVhaztcblx0fVxuXG5cdC8vIFVwZGF0ZSBzY29yZVxuXHR1cGRhdGVTY29yZShuZXdTY29yZSk7XHRcblxufVxuXG5cblxuXG5cblxuXG5cbi8vICoqKioqKioqXG4vLyAqIEluaXQgKlxuLy8gKioqKioqKipcblxuY29uZmlnLmN1cnJlbnRNb3ZlbWVudHMgPSBbXTtcbmNvbmZpZy5jdXJyZW50U2NvcmUgPSAwO1xuY29uZmlnLmN1cnJlbnRTdGFydERhdGUgPSAwO1xuXG5cbi8vIEdldCBjb21wdXRlZCBzdHlsZXMgb2Ygd2hvbGUgcGFnZSB3cmFwcGVyXG52YXIgY2FudmFzQ29tcHV0ZWRTdHlsZU9iaiA9IGdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLndyJylbMF0pO1xuXG4vLyBTZXQgY2FudmFzIG9wdGlvbnNcbmNvbmZpZy5vbmVXUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmoud2lkdGguc2xpY2UoMCwtMikpLzEwMDtcbmNvbmZpZy5vbmVIUGVyY2VudCA9IHBhcnNlSW50KGNhbnZhc0NvbXB1dGVkU3R5bGVPYmouaGVpZ2h0LnNsaWNlKDAsLTIpKS8xMDA7XG5cbmNvbmZpZy5jYW52T3B0cyA9IHtcblx0YmdVUkw6ICcuLi9pbWcvYmctY3Jvd2QtMS5qcGcnLFxuXHRjb21wdXRlZFN0eWxlOiB7XG5cdFx0d2lkdGg6IGNvbmZpZy5vbmVXUGVyY2VudCoxMDAsXG5cdFx0aGVpZ2h0OiBjb25maWcub25lSFBlcmNlbnQqMTAwXG5cdH0sXG5cdG1vdmVtZW50czoge1xuXHRcdHJhZGl1czogY29uZmlnLm9uZVdQZXJjZW50ICogY29uZmlnLm1vdmVtZW50cy5yYWRpdXNQZXJjZW50LFxuXHRcdHN0cm9rZVdpZHRoOiBjb25maWcub25lV1BlcmNlbnQgKiBjb25maWcubW92ZW1lbnRzLnN0cm9rZVdpZHRoUGVyY2VudFxuXHR9XG59XG5cblxuLy8gSW5pdGlhbGl6ZSAnZmFicmljJyBjYW52YXMgb2JqXG52YXIgY2FudmFzID0gbmV3IGZhYnJpYy5TdGF0aWNDYW52YXMoJ2dhbWUnLCB7XG5cdHdpZHRoOiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS53aWR0aCxcblx0aGVpZ2h0OiBjb25maWcuY2Fudk9wdHMuY29tcHV0ZWRTdHlsZS5oZWlnaHQsXG59KTtcblxuLy8gRHJhdyBcInBlcmZlY3Qgc3VjY2Vzc1wiIHBsYWNlIHNoYWRvdyBjaXJjbGVcbmNvbmZpZy5zaGFkb3dDaXJjbGUgPSBuZXcgZmFicmljLkNpcmNsZSh7XG5cdGZpbGw6ICdyZ2JhKDIwMCwyMDAsMjAwLDAuMiknLFxuXHRzdHJva2U6ICdyZ2JhKDIwMCwyMDAsMjAwLDEpJyxcblx0c3Ryb2tlV2lkdGg6IGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgqMixcblx0cmFkaXVzOiBjb25maWcuY2Fudk9wdHMubW92ZW1lbnRzLnJhZGl1cyArIGNvbmZpZy5jYW52T3B0cy5tb3ZlbWVudHMuc3Ryb2tlV2lkdGgsXG5cdHRvcDogTWF0aC5yb3VuZChjb25maWcub25lSFBlcmNlbnQqNDUpLFxuXHRsZWZ0OiBjb25maWcub25lV1BlcmNlbnQgKiAyMFxufSlcbmNhbnZhcy5hZGQoY29uZmlnLnNoYWRvd0NpcmNsZSk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBhZGRpbmcgb2YgbmV4dCBtb3ZlbWVudCBpbiBxdWV1ZVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2xBZGRNb3ZlbWVudCcsIG9uR2xBZGRNb3ZlbWVudCk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBtb3ZlbWVudCByZXN1bHQgZXZlbnRcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2dsU3RhdHVzJywgb25HbFN0YXR1cyk7XG5cbi8vIFNldCBoYW5kbGVyIGZvciBnYW1lIHNldHVwIGV2ZW50XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnbFNldHVwRXZlbnQnLCBvbkdsU2V0dXBFdmVudCk7XG5cbi8vIFNob3cgY3VycmVudCBnYW1lIGNvZGVcbnZhciBjb2RlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvZGUtY29udGFpbmVyJyk7XG5jb2RlQ29udGFpbmVyLmlubmVySFRNTCA9IGNvZGU7XG5cblxuLy8gKioqKioqKioqXG4vLyAqIEF1ZGlvICpcbi8vICoqKioqKioqKlxuXG4vLyBBZGQgbXV0ZWQgc3RhdGUgc2F2aW5nIGZlYXR1cmUgdG8gSG93bCAoYXVkaW8gbGliKVxuSG93bC5wcm90b3R5cGUubXV0ZWQgPSBmYWxzZTtcbkhvd2wubXV0ZWQgPSBmYWxzZTtcblxuLy8gR2V0IHZvbHVtZSBidXR0b24gZWxlbWVudFxudmFyIHZvbHVtZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy52b2x1bWUtYnRuJylbMF07XG4vLyBhbmQgc2V0IG9uQ2xpY2sgZXZlbnQgaGFuZGxlclxudm9sdW1lQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25Wb2x1bWVCdG5DbGljayk7XG5cbi8vIEdldCB2b2x1bWUgbGV2ZWwgc2xpZGVyXG52YXIgdm9sdW1lU2xpZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZvbHVtZS1pbnB1dCcpWzBdO1xuLy8gYW5kIHNldCBvbklucHV0IGV2ZW50IGhhbmRsZXJcbnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIG9uVm9sdW1lU2xpZGVySW5wdXQpXG5cblxuLy8gQ2hhbmdlIGNhbnZhcyBiYWNrZ3JvdW5kIHNpemUgb24gd2luZG93IHJlc2l6ZVxud2luZG93Lm9ucmVzaXplID0gZnVuY3Rpb24oKXtcblx0cmVmcmVzaENvbXB1dGVkU2l6ZXMoY2FudmFzQ29tcHV0ZWRTdHlsZU9iaik7XG5cdGNhbnZhcy5yZW5kZXJBbGwuYmluZChjYW52YXMpO1xufVxuXG5cblxuXG5cblxuXG5cblxuLy8gVEVTVFxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcblxufSkoKTtcbi8qKlxuICogZ2FtZWxvZ2ljLmpzXG4gKi9cblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vXG5cbiAgICB2YXIgRVBTSUxPTiA9IDEwMDA7XG4gICAgdmFyIGNvbmZpZyA9IHt9O1xuXG4gICAgLy8gQWN0aW9ucyBwZXJmb3JtZWQgd2hlbiBjdXJyZW50IGdhbWUgc2V0dGluZ3MgcmVjaWV2ZWRcbiAgICBmdW5jdGlvbiBvbkFnU2V0dXBFdmVudChldmVudCkge1xuXHQvLyBjb25zb2xlLmxvZygnYWdTZXR1cEV2ZW50OiAnICsgSlNPTi5zdHJpbmdpZnkoZXZlbnQuZGV0YWlsKSk7XG5cdC8vXG4gICAgXHRjb25maWcubW92ZW1lbnRzID0gZXZlbnQuZGV0YWlsLmNvbW1hbmRzO1xuXHQvL1xuXHRsZXQgYXVkaW9GaWxlVVJMID0gJ2h0dHA6Ly8nICsgd2luZG93LmxvY2F0aW9uLmhvc3RuYW1lICsgJzo1MDAwL3NvbmdzLycgKyBldmVudC5kZXRhaWwuc29uZztcblx0Ly8gbGV0IGF1ZGlvRmlsZVVSTCA9ICcuLi9hdWRpby8nICsgZXZlbnQuZGV0YWlsLnNvbmc7XG5cdC8vIGNvbnNvbGUubG9nKCdhdWRpbyBmaWxlIHVybDogJyArIGF1ZGlvRmlsZVVSTCk7XG5cdGNvbmZpZy5hdWRpbyA9IG5ldyBIb3dsKHtcblx0ICAgIHVybHM6IFthdWRpb0ZpbGVVUkxdLFxuXHQgICAgYXV0b3BsYXk6IGZhbHNlLFxuXHQgICAgdm9sdW1lOiAwLjgsXG5cdCAgICBvbmxvYWQ6IGZ1bmN0aW9uKCl7XG5cblx0ICAgIFx0Ly8gR2VuZXJhdGUgbmV3IGV2ZW50IGZvciB0aGUgdmlldy5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2dsU2V0dXBFdmVudCcsXG5cdCAgICB7ZGV0YWlsOiB7c29uZzogZXZlbnQuZGV0YWlsLnNvbmcsIGJwbTogZXZlbnQuZGV0YWlsLmJwbSwgY29tbWFuZHM6IGV2ZW50LmRldGFpbC5jb21tYW5kcywgbXVzaWM6IGNvbmZpZy5hdWRpb319XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQvLyBCUE0sIG1pbkludGVydmFsLCBiZWdpbm5pbmcgb2Zmc2V0XG5cdGNvbmZpZy5icG0gPSBldmVudC5kZXRhaWwuYnBtKjI7XG5cdGNvbmZpZy5taW5JbnRlcnZhbCA9IDYwMDAwIC8gY29uZmlnLmJwbTtcblx0Y29uZmlnLmJlZ2lubmluZ09mZnNldCA9IGV2ZW50LmRldGFpbC5vZmZzZXQ7XG5cdC8vIFN0YXJ0LlxuXHRjb25maWcuc2NvcmUgPSAwO1xuXHRjb25maWcuc3RhcnREYXRlID0gRGF0ZS5ub3coKTtcblx0Y29uZmlnLmRpc3BsYXllZEluZGV4ID0gMDtcblx0Y29uZmlnLmxhc3RSZWNlaXZlZEluZGV4ID0gMDtcblx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSB7bW92ZW1lbnQ6ICdwYXNzJywgdGltZTogRGF0ZS5ub3coKX07XG5cdGZ1bmN0aW9uIHNlbmRNb3ZlbWVudCgpIHtcblx0ICAgIC8vIFNldCBkZWNpZGluZyB0aGUgc3RhdHVzIGluIHRoZSBmdXR1cmUuXG5cdCAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdC8vdmFyIGluZGV4ID0gTWF0aC5yb3VuZCgoY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24udGltZSAtIGNvbmZpZy5zdGFydERhdGUgLSBjb25maWcuYmVnaW5uaW5nT2Zmc2V0KSAvIGNvbmZpZy5taW5JbnRlcnZhbCk7XG5cdFx0dmFyIGluZGV4ID0gY29uZmlnLmRpc3BsYXllZEluZGV4IC0gNDtcblx0XHR2YXIgdmFsaWQgPSAoY29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24ubW92ZW1lbnQgPT0gY29uZmlnLm1vdmVtZW50c1tpbmRleF0pICYmXG5cdFx0ICAgIChNYXRoLmFicyhjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lIC0gRGF0ZS5ub3coKSkgPCBjb25maWcubWluSW50ZXJ2YWwpO1xuXG5cdFx0Ly8gR09WTk9LT0Rcblx0XHRjb25zb2xlLmxvZygnMTogJytjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbi50aW1lKydcXG4yOiAnK0RhdGUubm93KCkrJ1xcbm1pbkludDogJytjb25maWcubWluSW50ZXJ2YWwpO1xuXG5cdFx0aWYgKCF2YWxpZCkge1xuXHRcdCAgICBjb25maWcuc2NvcmUgKz0gMTAwO1xuXHRcdCAgICAvLyBjb25zb2xlLmxvZyhpbmRleCk7XG5cdFx0ICAgIHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0XHRcdCdnbFN0YXR1cycsXG5cdFx0XHR7ZGV0YWlsOiB7XG5cdFx0XHQgICAgc3RhdHVzOiBcInN1Y2Nlc3NcIixcblx0XHRcdCAgICBpbmRleDogaW5kZXgsXG5cdFx0XHQgICAgbmV3U2NvcmU6IGNvbmZpZy5zY29yZVxuXHRcdFx0fX1cblx0XHQgICAgKTtcblx0XHQgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChuZXdFdmVudCk7XG5cdFx0fSBlbHNlIHtcblx0XHQgICAgY29uZmlnLnNjb3JlIC09IDEwO1xuXHRcdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0XHQnZ2xTdGF0dXMnLFxuXHRcdFx0e2RldGFpbDoge1xuXHRcdFx0ICAgIHN0YXR1czogXCJmYWlsXCIsXG5cdFx0XHQgICAgaW5kZXg6IGluZGV4LFxuXHRcdFx0ICAgIG5ld1Njb3JlOiBjb25maWcuc2NvcmVcblx0XHRcdH19XG5cdFx0ICAgICk7XG5cdFx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHRcdH1cblx0XHRjb25maWcubGFzdFBlcmZvcm1lZEFjdGlvbiA9IHttb3ZlbWVudDogJ3Bhc3MnLCB0aW1lOiBEYXRlLm5vdygpfTtcblx0ICAgIH0sIGNvbmZpZy5taW5JbnRlcnZhbCo0KTtcblx0ICAgIC8vXG5cdCAgICB2YXIgbmV3RXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoXG5cdFx0J2dsQWRkTW92ZW1lbnQnLFxuXHRcdHtkZXRhaWw6IGNvbmZpZy5tb3ZlbWVudHNbY29uZmlnLmRpc3BsYXllZEluZGV4XX1cblx0ICAgICk7XG5cdCAgICAvLyBjb25zb2xlLmxvZyhuZXdFdmVudCk7XG5cdCAgICBjb25maWcuZGlzcGxheWVkSW5kZXgrKztcblx0ICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuXHQgICAgY29uZmlnLnRpbWVyID0gc2V0VGltZW91dChzZW5kTW92ZW1lbnQsIGNvbmZpZy5taW5JbnRlcnZhbCk7XG5cdH1cblx0c2V0VGltZW91dChzZW5kTW92ZW1lbnQsIGNvbmZpZy5iZWdpbm5pbmdPZmZzZXQpO1xuXHRjb25maWcuYXVkaW8ucGxheSgpO1xuXG5cdCAgICB9XG5cdH0pO1xuXHRcbiAgfVxuXG4gICAgZnVuY3Rpb24gb25BZ0NvbW1hbmRFdmVudChldmVudCkge1xuXHQvLyBjb25zb2xlLmxvZygnYWdDb21tYW5kRXZlbnQ6ICcgKyBKU09OLnN0cmluZ2lmeShldmVudC5kZXRhaWwpKTtcblx0aWYgKGV2ZW50LmRldGFpbC5tb3ZlbWVudCA9PSAnc3RvcCcpIGNsZWFySW50ZXJ2YWwoY29uZmlnLnRpbWVyKTtcblx0Y29uZmlnLmxhc3RQZXJmb3JtZWRBY3Rpb24gPSBldmVudC5kZXRhaWw7XG5cblx0Y29uc29sZS5sb2coZXZlbnQuZGV0YWlsLm1vdmVtZW50KTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdhZ1NldHVwRXZlbnQnLCBvbkFnU2V0dXBFdmVudCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYWdDb21tYW5kRXZlbnQnLCBvbkFnQ29tbWFuZEV2ZW50KTtcbn0pKCk7XG4vKipcbiAqIGNvbm5lY3Rpb24uanNcbiAqXG4gKiBTZXRzIGNvbm5lY3Rpb24gdG8gdGhlIHNlcnZlci5cbiAqXG4gKiBFbWl0cyAnYWdTZXR1cEV2ZW50JyBhbmQgJ2FnQ29tbWFuZEV2ZW50JyBldmVudHMgdGhhdCBzaG91bGQgYmUgaGFuZGxlZCBpblxuICogdGhlIHZpZXcuXG4gKiBgYGFnU2V0dXBFdmVudGBgcyBzZXQgdGhlIHNvbmcgbmFtZSBhbmQgdGhlIGNvbW1hbmQgc2VxdWVuY2UuXG4gKiBgYGFnQ29tbWFuZEV2ZW50YGBzIHNheSB3aGljaCBjb21tYW5kIHVzZXIgc2VudC5cbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNvbmdXYXNTdGFydGVkID0gZmFsc2U7XG4gICAgdmFyIHdzID0gaW8oKTtcblxuICAgIC8vIFdBUk5JTkchXG4gICAgLy8gSEFSRENPREUhISFcblxuICAgIHZhciBtb3ZlbWVudHMgPSBbXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInVwXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJwYXNzXCIsIFwicGFzc1wiLCBcInBhc3NcIiwgXCJkb3duXCIsIFwidXBcIiwgXCJkb3duXCIsIFwicGFzc1wiLCBcImRvd25cIiwgXCJ1cFwiLCBcImRvd25cIiwgXCJwYXNzXCIsIFwiZG93blwiLCBcInBhc3NcIiwgXCJkb3duXCJdO1xuICAgIG1vdmVtZW50cyA9IG1vdmVtZW50cy5tYXAoZnVuY3Rpb24oY3VyckVsLCBpLCBhcnIpe1xuICAgIFx0cmV0dXJuIGN1cnJFbC50b1VwcGVyQ2FzZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gRU5EIFdBUk5JTkdcblxuICAgIGZ1bmN0aW9uIG9uR290TWVzc2FnZU9uU3RhcnQoZXZlbnQpIHtcblxuICBpZiAoc29uZ1dhc1N0YXJ0ZWQpIHJldHVybjtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uU3RhcnQ6ICcgKyBldmVudCk7XG5cdC8vIFJlY2VpdmUgc29uZyBuYW1lIGFuZCBjb21tYW5kIHNlcXVlbmNlLlxuXHQvLyBUT0RPISBHZW5lcmF0ZSBhIG1vdmVtZW50IHN0cmluZyBsaXN0IGZyb20gdGhlIHN1cHBsaWVkIGNvZGUuXG5cblx0Ly8gdmFyIHNvbmdEYXRhRmlsZU5hbWUgPSBldmVudC5kZXRhaWwuc29uZy5zbGljZSgwLC00KSsnLmpzb24nO1xuXHQvLyBjb25zb2xlLmxvZyhzb25nRGF0YUZpbGVOYW1lKTtcblxuXHQvLyB2YXIgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuXHQvLyByZXF1ZXN0Lm9wZW4oXCJHRVRcIiwgXCIuLi9zb25ncy9cIitzb25nRGF0YUZpbGVOYW1lLCBmYWxzZSk7XG5cdC8vIHJlcXVlc3Quc2VuZChudWxsKTtcblx0Ly8gcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcblx0Ly8gICBpZiAoIHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMjAwICkge1xuXHQvLyAgICAgdmFyIHNvbmdEYXRhSlNPTiA9IEpTT04ucGFyc2UocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuXHQvLyAgICAgLy8gY29uc29sZS5sb2cobXlfSlNPTl9vYmplY3QpO1xuXHQvLyAgIH1cblx0Ly8gfVxuXG5cdHZhciBuZXdFdmVudCA9IG5ldyBDdXN0b21FdmVudChcblx0ICAgICdhZ1NldHVwRXZlbnQnLFxuXHQgICAge2RldGFpbDoge1xuXHRcdC8vIHNvbmc6ICAgICBldmVudC5kZXRhaWwubmFtZSxcblx0XHQvLyBicG06ICAgICAgZXZlbnQuZGV0YWlsLmJwbSxcblx0XHQvLyBjb21tYW5kczogZXZlbnQuZGV0YWlsLm1vdmVtZW50cyxcblx0XHQvLyBvZmZzZXQ6ICAgZXZlbnQuZGV0YWlsLm9mZnNldCxcblxuXHRcdHNvbmc6ICAgICAnSGlnaHdheS10by1IZWxsLm1wMycsXG5cdFx0YnBtOiAgICAgIDExNixcblx0XHRjb21tYW5kczogbW92ZW1lbnRzLFxuXHRcdG9mZnNldDogICAyMDAsXG5cdCAgICB9fVxuXHQpO1xuXHRkb2N1bWVudC5kaXNwYXRjaEV2ZW50KG5ld0V2ZW50KTtcblx0d3Mub24oJ21lc3NhZ2UnLCBvbkdvdE1lc3NhZ2VPbkNvbm5lY3Rpb25Fc3RhYmxpc2hlZCk7XG5cdHNvbmdXYXNTdGFydGVkID0gdHJ1ZTtcbiAgfVxuXG4gICAgZnVuY3Rpb24gb25Hb3RNZXNzYWdlT25Db25uZWN0aW9uRXN0YWJsaXNoZWQoZXZlbnQpIHtcblx0Y29uc29sZS5sb2coJ29uR290TWVzc2FnZU9uQ29ubmVjdGlvbkVzdGFibGlzaGVkOiAnICsgZXZlbnQpO1xuXHQvLyBSZWNlaXZlIHVzZXIgY29tbWFuZC5cblx0dmFyIG5ld0V2ZW50ID0gbmV3IEN1c3RvbUV2ZW50KFxuXHQgICAgJ2FnQ29tbWFuZEV2ZW50Jyxcblx0ICAgIHtkZXRhaWw6IHtcblx0XHRtb3ZlbWVudDogZXZlbnQubW92ZW1lbnQsXG5cdFx0dGltZTogICAgIGV2ZW50LnRpbWVcblx0ICAgIH19XG5cdCk7XG5cdGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobmV3RXZlbnQpO1xuICAgIH1cblxuICAgIHdzLm9uKCdtZXNzYWdlJywgb25Hb3RNZXNzYWdlT25TdGFydCk7XG5cbiAgICB3cy5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCkge1xuXHQvLyB3cy5qc29uLmVtaXQoe3R5cGU6ICd3ZWJwYWdlJywgY29kZTogY29kZX0pO1xuXHQvLyB3cy5lbWl0KEpTT04uc3RyaW5naWZ5KHt0eXBlOiAnd2VicGFnZScsIGNvZGU6IGNvZGV9KSk7XG5cdHdzLmpzb24uc2VuZCh7dHlwZTogJ3dlYnBhZ2UnLCBjb2RlOiBjb2RlfSk7XG4gICAgfSk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
