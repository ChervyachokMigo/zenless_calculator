module.exports = ( base_stats, additional_stats ) => {
	const new_stats = { ...base_stats };
	Object.entries(additional_stats).forEach( ([key, value]) => {
		if (typeof new_stats[key] === 'undefined') {
			new_stats[key] = value;
		} else {
			new_stats[key] += value;
		}
	});
	return new_stats;
}