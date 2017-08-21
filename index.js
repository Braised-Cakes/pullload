export default function(params = {}) {
	let s = this;
	let defaults = {
		distance: 30,
		container: 'body'
	};
	for (let attr in defaults) {
		if (typeof params[attr] === 'undefined') {
			params[attr] = defaults[attr];
		}
	}
	s.params = params;
	let canTick = true;
	s.params.main = s.params.container !== 'body' ? document.querySelector(s.params.container) : window;

	function judgeLoadMore(ev) {
		let sTop, dHeight, cHeight;
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
				s.needPush()
			}
		}
	};
	s.tick = function() {
		canTick = true;
		judgeLoadMore();
	}
	s.needPush = function() {
		canTick = false;
		s.emit('onScrollEnd', s);
	}
	s.stop = function() {
		s.params.main.removeEventListener('scroll', judgeLoadMore, false);
	}
	s.start = function() {
		s.tick();
		s.params.main.addEventListener('scroll', judgeLoadMore, false);
	}
	s.emit = function(eventName) {
		s.params && s.params[eventName] && s.params[eventName](arguments[1], arguments[2], arguments[3]);
	}
	s.start();
}
