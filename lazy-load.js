// Usage:
// <img src="you can use a blurred small sized image of the huge-image or use this transparent svg image uri" data-lazy-src="huge-image-path">
// data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 3 2'%3E%3C/svg%3E
// run lazyLoad()
// Dependency - []
// even better way to do lazy loading is with IntersectionObserver api
// Here is really good article lazy loading is with IntersectionObserver api https://css-tricks.com/tips-for-rolling-your-own-lazy-loading/
const lazyLoad = () => {
	let lazyloadImages;
	let lazyloadThrottleTimeout;

	const loadElsInViewPort = () => {
		lazyloadImages = document.querySelectorAll('[data-lazy-src]');

		let threshold = 300;
		let innerHeightOffset = window.innerHeight + threshold;

		if (lazyloadThrottleTimeout) {
			clearTimeout(lazyloadThrottleTimeout);
		}

		lazyloadThrottleTimeout = setTimeout(function () {
			lazyloadImages.forEach((img) => {
				let bounding = img.getBoundingClientRect();
				if (bounding.width != 0 || bounding.height != 0 || bounding.x != 0 || bounding.y != 0) {
					if (bounding.top >= -(threshold) && bounding.bottom <= innerHeightOffset) {
						img.src = img.dataset.lazySrc;
						img.removeAttribute('data-lazy-src');
					}
				}
			});
			if (lazyloadImages.length == 0) {
				document.removeEventListener('scroll', loadElsInViewPort);
				window.removeEventListener('resize', loadElsInViewPort);
				window.removeEventListener('orientationChange', loadElsInViewPort);
			}
		}, 20);
	}

	document.addEventListener('scroll', loadElsInViewPort);
	window.addEventListener('resize', loadElsInViewPort);
	window.addEventListener('orientationChange', loadElsInViewPort);
	loadElsInViewPort();
};

export default lazyLoad;