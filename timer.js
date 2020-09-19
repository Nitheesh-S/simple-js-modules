// Usage
// 👇 This fn will be called for every "intervalInSecs" -> you can use this fn to set value to a DOM element
// const timerOnUpdate = (secs) => {}
// const timerOnComplete = () => {}
// let interval = timer(20, timerOnUpdate, timerOnComplete, 1);
// you can clearInterval to the returned value to stop the timer
const timer = (duration, updateFn, callbackFn = null, intervalInSecs = 1) => {
	let secs = duration;

	updateFn(secs);
	secs -= intervalInSecs;

	let timerInterval = setInterval(() => {
		updateFn(secs);
		if (secs <= 0) {
			clearInterval(timerInterval);

			if (callbackFn) callbackFn();
		}
		secs -= intervalInSecs;
	}, intervalInSecs * 1000);

	return timerInterval;
};

export default timer;