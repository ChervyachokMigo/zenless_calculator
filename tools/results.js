const compare_damage = require("./compare_damage");

const results = [];

module.exports = {
	add_results: (res) =>{
		results.push(res);
	},

	compare_results: () => {
		if(results.length < 2) {
            console.error('Not enough results to compare.');
            return;
        }
		
        compare_damage(results[0], results[1]);
	}
}