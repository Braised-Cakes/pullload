'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function (global, factory) {
	(typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.Pullload = factory();
})(window, function () {
	return function (params) {
		var s = this;
		var canTick = true;

		function judgeLoadMore(ev) {
			if (canTick) {
				var sTop = document.body.scrollTop || document.documentElement.scrollTop,
				    dHeight = document.body.scrollHeight,
				    cHeight = document.documentElement.clientHeight;
				if (sTop + cHeight >= dHeight - cHeight) {
					canTick = false;
					s.emit('onScrollEnd', s);
				}
			}
		};
		s.tick = function () {
			canTick = true;
		};
		s.stop = function () {
			window.removeEventListener('scroll', judgeLoadMore, false);
		};
		s.start = function () {
			s.tick();
			window.addEventListener('scroll', judgeLoadMore, false);
		};
		s.emit = function (eventName) {
			params && params[eventName] && params[eventName](arguments[1], arguments[2], arguments[3]);
		};
		s.start();
	};
});
