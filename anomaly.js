const { anomaly_type_multipliers } = require("./consts/elements");

const base_stats = {
	atk: 1593,
	anomaly: 204
}

const current_stats = {
	atk: 2855,
	anomaly: 386,
	atk_percent_points: 19,
	anomaly_points: 10,
	atk_points: 2
}

const atk_percent_point = base_stats.atk * 0.03;
const anomaly_point = 9;
const atk_point = 19;
const crit_damage = 1.50;	//криты аномалии джейн 50%
const disk_2_atk = 316;
const physical_amplifier = 1.4 + 1.36;	//40% + сигна 36%
const anomaly_level_multiplier_60 = 1 + 1/59 * (60 - 1);	// 2
const atacker_level_factor_60 = 794;
const target_def = 858;
const atacker_pen_ratio = 0;
const atacker_pen = 0;
const defence_multiplier = atacker_level_factor_60 / 
		( Math.max(target_def * (1 - atacker_pen_ratio) - atacker_pen, 0 ) + atacker_level_factor_60 ); 


function getObjectWithMaxParam(arr, param) {
    if (!Array.isArray(arr) || arr.length === 0) {
        return null;
    }

    let maxObject = arr[0];
    let maxValue = maxObject[param];

    for (let i = 1; i < arr.length; i++) {
        const currentObject = arr[i];
        const currentValue = currentObject[param];

        if (currentValue > maxValue) {
            maxValue = currentValue;
            maxObject = currentObject;
        }
    }

    return maxObject;
}

const results = [];

const points = 35

const my_atk_bonus = 600;

const atk_buff = 600 - my_atk_bonus;
const anomaly_buff = 0;

for (let i = 0; i < points; i++) {
	let atk_points_count = i;
	let anomaly_points_count = points - i;
	if (atk_points_count >= 30) {
		atk_points_count = 30;
		anomaly_points_count = points - 30;
	}
	if (anomaly_points_count >= 25) {
		atk_points_count = points - 25;
		anomaly_points_count = 25;
	}
	
	const atk = (base_stats.atk + disk_2_atk + (atk_points_count * atk_percent_point) + 2 * atk_point) + atk_buff;
	const anomaly = base_stats.anomaly + (anomaly_points_count) * anomaly_point + 92 + anomaly_buff;
	let atk_bonus = (anomaly - 120) * 2;
	atk_bonus = atk_bonus > 600 ? 600 : atk_bonus;
	let crit_chance = 40 + (0.16 * anomaly);
	crit_chance = (crit_chance > 100 ? 100 : crit_chance) * 0.01;
	
	const damage = (atk + atk_bonus) * (anomaly * 0.01) * 
		(crit_chance * crit_damage) * 
		anomaly_type_multipliers.assault * physical_amplifier * anomaly_level_multiplier_60 * defence_multiplier;

	results.push({damage, atk_points_count, anomaly_points_count, atk, anomaly})
	
	console.log(`[${atk_points_count} ATK | ${anomaly_points_count} AP] [ATK_BONUS ${atk_bonus} | CR ${crit_chance.toFixed(2)}] ${atk.toFixed(0)} ATK ${anomaly} AP = ${damage.toFixed(0)} DMG` );

}

console.log('Max', getObjectWithMaxParam(results, 'damage'))