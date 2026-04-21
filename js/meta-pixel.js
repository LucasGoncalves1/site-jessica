/**
 * Meta Pixel — só carrega após consentimento "Aceitar todos" (localStorage jessica_cookie_consent_v1 === "all").
 */
(function () {
	var PIXEL_ID = "1919960161988176";
	var STORAGE_KEY = "jessica_cookie_consent_v1";
	var loaded = false;

	function loadPixel() {
		if (loaded) return;
		loaded = true;
		!(function (f, b, e, v, n, t, s) {
			if (f.fbq) return;
			n = f.fbq = function () {
				n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
			};
			if (!f._fbq) f._fbq = n;
			n.push = n;
			n.loaded = !0;
			n.version = "2.0";
			n.queue = [];
			t = b.createElement(e);
			t.async = !0;
			t.src = v;
			s = b.getElementsByTagName(e)[0];
			s.parentNode.insertBefore(t, s);
		})(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
		window.fbq("init", PIXEL_ID);
		window.fbq("track", "PageView");
	}

	function consentAllowsMarketing() {
		try {
			return window.localStorage.getItem(STORAGE_KEY) === "all";
		} catch (e) {
			return false;
		}
	}

	function tryLoadFromStorage() {
		if (consentAllowsMarketing()) loadPixel();
	}

	document.addEventListener("jessicaCookieConsent", function (ev) {
		if (ev.detail && ev.detail.value === "all") loadPixel();
	});

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", tryLoadFromStorage);
	} else {
		tryLoadFromStorage();
	}
})();
