const compare_anomaly = require("./compare_anomaly");
const compare_damage = require("./compare_damage");

const results = [];

module.exports = {
	add_results: (res) =>{
		results.push(res);
	},

	compare_results: () => {
		if(results.length < 2) {
            console.error('Not enough results to compare.');
            return null;
        }

        return { skills: compare_damage(results[0].skills, results[1].skills), 
			anomaly: compare_anomaly(results[0].anomaly, results[1].anomaly)}
	},

	clear_results: () => {
		results.length = 0;
	}
}