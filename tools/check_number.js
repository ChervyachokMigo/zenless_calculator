module.exports = (val) => {
	if (!val) {
		return 0;
	}
	const is_nan = isNaN(Number(val));
	if (is_nan) {
        return 0;
    }
	return Number(val);
}