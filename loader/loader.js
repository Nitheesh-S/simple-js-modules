// Dependency - [ loader.html, _loader.scss ]
export const loader = {
	loaderEl: document.querySelector('.loader-container'),
	show() {
		this.loaderEl.classList.add('active');
	},
	hide() {
		this.loaderEl.classList.remove('active');
	},
};