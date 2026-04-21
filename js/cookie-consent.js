(function () {
	var STORAGE_KEY = "jessica_cookie_consent_v1";

	function getPrivacyHref() {
		var a = document.querySelector("a.jessica-footer-privacy");
		if (a && a.getAttribute("href")) return a.getAttribute("href");
		var path = window.location.pathname.replace(/\\/g, "/");
		if (path.indexOf("/privacy-policy/") !== -1 || path.endsWith("/privacy-policy")) {
			return "index.html";
		}
		var depth = path.split("/").filter(function (s) {
			return s && s !== "index.html";
		}).length;
		if (path.endsWith("/") || path.endsWith("/index.html")) {
			var parts = path.split("/").filter(Boolean);
			if (parts[parts.length - 1] === "index.html") parts.pop();
			depth = parts.length;
		}
		return depth <= 1 ? "privacy-policy/index.html" : "../privacy-policy/index.html";
	}

	function shouldShow() {
		try {
			return !window.localStorage.getItem(STORAGE_KEY);
		} catch (e) {
			return true;
		}
	}

	function save(value) {
		try {
			window.localStorage.setItem(STORAGE_KEY, value);
		} catch (e) {}
		hide();
		window.dispatchEvent(new CustomEvent("jessicaCookieConsent", { detail: { value: value } }));
	}

	function hide() {
		var el = document.getElementById("jessica-cookie-banner");
		if (el) {
			el.classList.remove("jessica-cookie-visible");
			setTimeout(function () {
				if (el.parentNode) el.parentNode.removeChild(el);
			}, 400);
		}
	}

	function build() {
		if (!shouldShow()) return;

		var privacy = getPrivacyHref();
		var cookiesHref = privacy.indexOf("#") === -1 ? privacy + "#politica-de-cookies" : privacy.split("#")[0] + "#politica-de-cookies";

		var wrap = document.createElement("div");
		wrap.id = "jessica-cookie-banner";
		wrap.setAttribute("role", "dialog");
		wrap.setAttribute("aria-labelledby", "jessica-cookie-title");
		wrap.setAttribute("aria-modal", "false");

		wrap.innerHTML =
			'<div id="jessica-cookie-banner-inner">' +
			'<p id="jessica-cookie-title">Utilizamos cookies e dados de navegação para melhorar sua experiência, lembrar preferências e entender como o site é usado. Ao continuar, você concorda com nossa ' +
			'<a href="' +
			privacy +
			'">Política de Privacidade</a> e com o uso de cookies conforme descrito na seção ' +
			'<a href="' +
			cookiesHref +
			'">Política de cookies</a>.</p>' +
			'<div id="jessica-cookie-actions">' +
			'<button type="button" id="jessica-cookie-essential">Apenas necessários</button>' +
			'<button type="button" id="jessica-cookie-accept">Aceitar todos</button>' +
			"</div></div>";

		document.body.appendChild(wrap);

		requestAnimationFrame(function () {
			wrap.classList.add("jessica-cookie-visible");
		});

		document.getElementById("jessica-cookie-accept").addEventListener("click", function () {
			save("all");
		});
		document.getElementById("jessica-cookie-essential").addEventListener("click", function () {
			save("essential");
		});
	}

	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", build);
	} else {
		build();
	}
})();
