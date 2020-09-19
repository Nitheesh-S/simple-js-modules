const humanizeTime = (totalSecs, seperator = ' ', isConstantLength = true) => {
	let seconds = Math.floor(totalSecs % 60);
	totalSecs /= 60;

	let minutes = Math.floor(totalSecs % 60);
	totalSecs /= 60;

	let hours = Math.floor(totalSecs % 24);
	totalSecs /= 24;

	let days = Math.floor(totalSecs);

	let time = { days, hours, minutes, seconds };

	let humanTime = '';

	if (days) humanTime += `${String(days).padStart(2, 0)}d${seperator}`;
	if (hours || isConstantLength) humanTime += `${String(hours).padStart(2, 0)}h${seperator}`;
	if (minutes || isConstantLength) humanTime += `${String(minutes).padStart(2, 0)}m${seperator}`;
	if (seconds || isConstantLength) humanTime += `${String(seconds).padStart(2, 0)}s`;

	return humanTime.trim();
};

export default humanizeTime;