const miyabi = require("./calc_agent/miyabi");
const { add_results } = require("./results");

module.exports = () => {
	add_results(
		miyabi(),
	);
}