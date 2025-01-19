const { calclulate_pre_skill_damage } = require("./atacker_stats");
const { element_type } = require("./consts/elements");

const _this = module.exports = {
	calc: (target_stats) => {
		const results = [
			calclulate_pre_skill_damage(element_type.physical, target_stats),
			calclulate_pre_skill_damage(element_type.frost, target_stats),
			calclulate_pre_skill_damage(element_type.ether, target_stats),
			calclulate_pre_skill_damage(element_type.fire, target_stats),
			calclulate_pre_skill_damage(element_type.electric, target_stats)];
		return results;
	},

	print: (results) => {
		console.log('',"Physical:",'', Number(results[0].toFixed(0)));
		console.log('',"Frost:",'   ', Number(results[1].toFixed(0)));
		console.log('',"Ether:",'   ', Number(results[2].toFixed(0)));
		console.log('',"Fire:",'    ', Number(results[3].toFixed(0)));
		console.log('',"Electric:",'', Number(results[4].toFixed(0)));
	},

	compare: (results_1, results_2) => {
		const differences = [
            Math.abs(results_1[0] - results_2[0]),
            Math.abs(results_1[1] - results_2[1]),
            Math.abs(results_1[2] - results_2[2]),
            Math.abs(results_1[3] - results_2[3]),
            Math.abs(results_1[4] - results_2[4])
		];
		const percents = [
            (results_1[0]/results_2[0] - 1) * 100,
            (results_1[1]/results_2[1] - 1) * 100,
            (results_1[2]/results_2[2] - 1) * 100,
            (results_1[3]/results_2[3] - 1) * 100,
			(results_1[4]/results_2[4] - 1) * 100
		];

		const attributes = [ 'Physical', 'Frost', 'Ether', 'Fire', 'Electric' ];

		for (let i = 0; i < attributes.length; i++) {
			console.log(`[${attributes[i]}]`);
			console.log('Damage 1:', '  ', Number(results_1[i].toFixed(0)));
			console.log('Damage 2:', '  ', Number(results_2[i].toFixed(0)));
			console.log('Difference:','', Number(differences[i].toFixed(0)));
			console.log('Percent:','   ', Number(percents[i].toFixed(2)), '%');
		}

	}
}