export const scrollToEl = (element, offset = 0) => {
	window.scrollBy({
		top: element.getBoundingClientRect().top + offset,
		behavior: 'smooth',
	});
};

// returns top most element from a given node list
export const getTopMostEl = (nodeList) => {
	if (typeof nodeList != 'object') return false;
	if (nodeList.length < 1) return false;
	if (nodeList.length == 1) return nodeList[0];

	let topEl = null;
	let topY = document.body.scrollHeight;

	nodeList.forEach((el) => {
		let elY = el.getBoundingClientRect().y;

		if (elY < topY) {
			topY = elY;
			topEl = el;
		}
	});

	return topEl;
};

// Safari needs a window reference to open in new tab from script
// Do this before you request an api 
// if (
// 	navigator.userAgent.includes('Safari') &&
// 	!navigator.userAgent.includes('Chrome')
// ){
// 	windowReference = window.open();
// }
export const openInNewTab = (redirectUrl, windowReference) => {
	if (windowReference) {
		windowReference.location.assign(redirectUrl);
	} else if (navigator.userAgent.includes('Chrome')) {
		Object.assign(document.createElement('a'), {
			target: '_blank',
			href: redirectUrl,
		}).click();
	} else {
		window.location.assign(redirectUrl);
	}
};

// uuid generator
export const uuidv4 = () => {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
		(c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
	);
};

export const hasHistoryApi = () => {
	return !!(history && history.state !== undefined && history.back && history.pushState && history.replaceState);
};

// WARNING: This pollutes global String Object
// String.prototype.toTitleCase = function() {
//     return this.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
// }