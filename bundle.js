(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global.pullload = factory());
}(this, (function() {
	'use strict';
	var main_build = function() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		var s = this;
		var defaults = {
			distance: 30,
			container: 'body'
		};
		for (var attr in defaults) {
			if (typeof params[attr] === 'undefined') {
				params[attr] = defaults[attr];
			}
		}
		s.params = params;
		var canTick = true;
		s.params.main = s.params.container !== 'body' ? document.querySelector(s.params.container) : window;

		function judgeLoadMore(ev) {
			var sTop = void 0,
				dHeight = void 0,
				cHeight = void 0;
			if (canTick) {
				if (s.params.container) {
					sTop = document.querySelector(s.params.container).scrollTop;
					dHeight = document.querySelector(s.params.container).scrollHeight;
					cHeight = window.screen.height;
				} else {
					sTop = document.body.scrollTop || document.documentElement.scrollTop;
					dHeight = document.body.scrollHeight;
					cHeight = window.screen.height;
				}
				if (sTop + cHeight >= dHeight - s.params.distance) {
					s.needPush();
				}
			}
		}
		s.tick = function() {
			canTick = true;
			judgeLoadMore();
		};
		s.needPush = function() {
			canTick = false;
			s.emit('onScrollEnd', s);
		};
		s.stop = function() {
			s.params.main.removeEventListener('scroll', judgeLoadMore, false);
		};
		s.start = function() {
			s.tick();
			s.params.main.addEventListener('scroll', judgeLoadMore, false);
		};
		s.emit = function(eventName) {
			s.params && s.params[eventName] && s.params[eventName](arguments[1], arguments[2], arguments[3]);
		};
		s.start();
	};
	return main_build;
})));
