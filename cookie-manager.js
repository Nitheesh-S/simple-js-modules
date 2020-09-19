// Usage:
// run initCookieManager() before using
// Cookies Object is defined to global window object
// Use "Cookies['cookieName']" to get cookie
// Use "Cookies.set(name, value, expiry in days)" to set cookie
// Use "Cookies.remove(name)" to remove cookie
const initCookieManager = () => {
	if (!window.Cookies) {
		Object.defineProperty(window, 'Cookies', {
			get: () => {
				let allCookies = document.cookie.split('; ').reduce((cookies, cookie) => {
					cookies[cookie.split('=')[0]] = unescape(cookie.split('=')[1]);
					return cookies;
				}, {});

				allCookies.set = (name, value = '', days) => {
					let expires = '';
					if (days) {
						let date = new Date();
						date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
						expires = '; expires=' + date.toUTCString();
					}
					document.cookie = name + '=' + value + expires + '; path=/';
				};
				allCookies.remove = (name) => {
					document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
				};
				return allCookies;
			},
		});
	}
};

export default initCookieManager;