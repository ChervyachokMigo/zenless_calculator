
const { get_all_disks } = require("./generate_disks_optimize");

const base_stats = {
	hp: 8373,
	atk: 872 + 743,
	sheerforce: 1099,
	wengine: {
		hp: 0.3,
		cr: 0.2,
	},
	cr: 0.194,
	crit_dmg: 0.50,
}

const disk_stat = {
	disk_1_hp: 2200,
	disk_2_atk: 316,

	atk_percent: 0.03,
	hp_percent: 0.03,

	cr: 0.024,
	crit_dmg: 0.048,
	disk_attribute: 0.3,

	disks_set_bonus: {
		hp: 0.1,
		sheer_dmg: 0.1,
		cr: 0.08 + 0.04 * 3,
	},
}

const xisuan = {
	sheerforce_multiplier: {
		hp: 0.1,
		atk: 0.3,
	},
	passive_effect: {
		crit_dmg: 0.4
	}
}

const buffs = {
	atk: 0,
	cr: 0,
	crit_dmg: 1.02,
	hp: 0,
	sheerforce: 720,
	damagebonus: 0.3
}



const sheer_force_damage = (in_stats) => {
	// Выводим входные данные


	let atk = base_stats.atk + disk_stat.disk_2_atk	+ buffs.atk;
	let hp = base_stats.hp + 
		base_stats.hp * base_stats.wengine.hp +
		disk_stat.disk_1_hp +
		base_stats.hp * disk_stat.disks_set_bonus.hp + buffs.hp;
	let attribute = 1;

	let cr = base_stats.cr + buffs.cr + disk_stat.disks_set_bonus.cr + base_stats.wengine.cr;
	let crit_dmg = base_stats.crit_dmg + buffs.crit_dmg + xisuan.passive_effect.crit_dmg;
	

	for (const [statName, count] of Object.entries(in_stats)) {
		switch (statName) {
			case 'hp':
				const hpBonus = base_stats.hp * (count * disk_stat.hp_percent);
				hp += hpBonus;

				break;
			case 'atk':
				const atkBonus = base_stats.atk * (count * disk_stat.atk_percent);
				atk += atkBonus;

				break;
			case 'attribute':
				attribute += disk_stat.disk_attribute;
				break;
			case 'cr':
				cr += count * disk_stat.cr;
				break;
			case 'crit_dmg':
				crit_dmg += count * disk_stat.crit_dmg;
				break;	
		}
  }
	
	if (cr >=1) {
		cr = 1;
	}

  const atkMultiplier = atk * xisuan.sheerforce_multiplier.atk;
  const hpMultiplier = hp * xisuan.sheerforce_multiplier.hp;
  const sheer_force_total = base_stats.sheerforce + atkMultiplier + hpMultiplier + buffs.sheerforce;

  const setBonus = (1+disk_stat.disks_set_bonus.sheer_dmg);
  const crit_bonus = (1 + cr * crit_dmg);

  const damage = sheer_force_total * setBonus * attribute * crit_bonus * (1 + buffs.damagebonus);

  return { damage, stats: {atk, hp, cr, crit_dmg, attribute, sheer_force_total }};
}


function mergeStats(obj1, obj2) {
    const result = {...obj1};
    
    for (const [key, value] of Object.entries(obj2)) {
        if (result[key]) {
            result[key] += value;
        } else {
            result[key] = value;
        }
    }
    
    return result;
}






function get_damage_by_stats (main_stats, sub_stats) {
	const current_stats = mergeStats(main_stats, sub_stats);
	const sheer_force_results = sheer_force_damage(current_stats);
	return { stats: current_stats, ...sheer_force_results, main_stats, sub_stats, };
}	

function getTopDamageCombinations() {
	const disk_main_stats = [
		{ hp: 30 },
		{ hp: 20, attribute: 1 },
		{ hp: 20, atk: 10 },
		{ hp: 20, crit_dmg: 10 },
		{ hp: 10, attribute: 1, crit_dmg: 10 },
		{ hp: 10, atk: 10, crit_dmg: 10 },
		{ hp: 20, cr: 10 },
		{ hp: 10, attribute: 1, cr: 10 },
		{ hp: 10, atk: 10, cr: 10 },
		{ atk: 10, hp: 20 },
		{ atk: 10, attribute: 1, hp: 10 },
		{ atk: 20, hp: 10 },
		{ atk: 10, hp: 10, crit_dmg: 10 },
		{ atk: 10, attribute: 1, crit_dmg: 10 },
		{ atk: 20, crit_dmg: 10 },
		{ atk: 10, hp: 10, cr: 10 },
		{ atk: 10, attribute: 1, cr: 10 },
		{ atk: 20, cr: 10 }
	];

	const disks_sub_stats = get_all_disks();

	const top_list = [];

    for (const main_stats of disk_main_stats) {
        for (const sub_stats of disks_sub_stats) {

			top_list.push(get_damage_by_stats(main_stats, sub_stats));

        }
    }

    // Сортируем топ по убыванию урона
    return top_list.sort((a, b) => b.damage - a.damage).slice(0, 50);
}

const convert_stats_to_text = (stats) => {
	let result = [];
	for(let [statName, statValue] of Object.entries(stats) ) {
		switch(statName) {
			case 'atk':
				result.push(` - АТК%: ${(statValue).toFixed(0)}`);
				break;
			case 'hp':
				result.push(` - HP%: ${(statValue).toFixed(0)}`);
				break;
			case 'cr':
				result.push(` - КШ: ${(statValue * 100).toFixed(0)}`);
				break;
			case 'crit_dmg':
				result.push(` - КУ: ${(statValue * 100).toFixed(0)}`);
				break;
			case 'sheer_force_total':
				result.push(` - Sheerforce: ${(statValue).toFixed(0)}`);
				break;
			case 'attribute':
				result.push(` - Атрибут: ${statValue * 100} %`);
				break;
		}
	}
	return result.join('\n');
}

const convert_points_to_text = (points) => {
	let result = [];
	for(let [pointsName, pointsValue] of Object.entries(points) ) {
		switch(pointsName) {
			case 'atk':
				result.push(` - АТК%: ${pointsValue}`);
				break;
			case 'hp':
				result.push(` - HP%: ${pointsValue}`);
				break;
			case 'cr':
				result.push(` - КШ: ${pointsValue}`);
				break;
			case 'crit_dmg':
				result.push(` - КУ: ${pointsValue}`);
				break;
			case 'attribute':
				result.push(` - Атрибут: ${pointsValue}`);
				break;
		}
	}
	return result.join('\n');
}

const out_results = (results) => {
	results.forEach((v, index) => {
		console.log(`#${index + 1}:`)
		console.log(`Урон = ${v.damage}`)
		console.log(`Характеристики = \n${convert_stats_to_text(v.stats)}`);
		console.log(`[Проки] Мейн статы = \n${convert_points_to_text(v.main_stats)}`);
		console.log(`[Проки] Саб статы = \n${convert_points_to_text(v.sub_stats)}`);
		//console.log(v);
	});
}

const get_info_by_disk = (main_stats, sub_stats) => {
	const results = get_damage_by_stats(main_stats, sub_stats);
	out_results([results]);
}

get_info_by_disk(
	{ hp: 10, attribute: 1, crit_dmg: 10 },
	{ atk: 6, hp: 6, cr: 17, crit_dmg: 19 }
);

// const topCombinations = getTopDamageCombinations();
// console.log("Топ комбинаций по урону:");
// out_results(topCombinations)