module.exports = (obj, key, value) => {
	const new_obj = { ...obj };
	if (typeof obj[key] === 'undefined') {
		new_obj[key] = value;
	} else {
		new_obj[key] += value;
	}
	return new_obj;
}