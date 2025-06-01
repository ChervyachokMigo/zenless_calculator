
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
	crit_dmg: 1.50,
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
	atk: 1200,
	cr: 0,
	crit_dmg: 0.25,
	hp: 0
}



const sheer_force_damage = (in_stats) => {
	// Выводим входные данные


	let atk = base_stats.atk + disk_stat.disk_2_atk	+ buffs.atk;
	let hp = base_stats.hp + 
		base_stats.hp * base_stats.wengine.hp +
		disk_stat.disk_1_hp +
		base_stats.hp * disk_stat.disks_set_bonus.hp + buffs.hp;
	let attribute = 1;

	let cr = base_stats.cr + buffs.cr + disk_stat.disks_set_bonus.cr;
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

  const baseSheer = base_stats.sheerforce;
  const atkMultiplier = atk * xisuan.sheerforce_multiplier.atk;
  const hpMultiplier = hp * xisuan.sheerforce_multiplier.hp;
  let result = baseSheer + atkMultiplier + hpMultiplier;

  const setBonus = (1+disk_stat.disks_set_bonus.sheer_dmg);
  const crit_bonus = 1 + (cr * crit_dmg);

  result = result * setBonus * attribute * crit_bonus;
 //console.log(in_stats, cr, crit_dmg, crit_bonus, result)
  return { damage: result, stats: {atk, hp, cr, crit_dmg, attribute}};
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
]

const disks_sub_stats = get_all_disks();

function getTopDamageCombinations(disk_main_stats, disks_sub_stats, sheer_force) {
    const top_list = [];
    let minDamageInTop = -Infinity;
    let minIndex = -1;

    for (const main_stats of disk_main_stats) {
        for (const sub_stats of disks_sub_stats) {
            // Объединяем характеристики
            const current_stats = mergeStats(main_stats, sub_stats);
            
            // Вычисляем урон
            const sheer_force_results = sheer_force(current_stats);
            const damage = sheer_force_results.damage;

            // Добавляем в топ-10 если есть место или урон больше минимального в топе
			const new_element = { stats: current_stats, ...sheer_force_results, main_stats, sub_stats };
            if (top_list.length < 50) {
                top_list.push(new_element);
                
                // Обновляем минимальное значение в топе
                if (damage < minDamageInTop) {
                    minDamageInTop = damage;
                    minIndex = top_list.length - 1;
                } else if (minDamageInTop === -Infinity) {
                    minDamageInTop = damage;
                    minIndex = 0;
                }
            } 
            else if (damage > minDamageInTop) {
                // Заменяем слабейший элемент в топе
                top_list[minIndex] = new_element;
                
                // Находим новый минимальный урон в топе
                minDamageInTop = top_list[0].damage;
                minIndex = 0;
                
                for (let i = 1; i < top_list.length; i++) {
                    if (top_list[i].damage < minDamageInTop) {
                        minDamageInTop = top_list[i].damage;
                        minIndex = i;
                    }
                }
            }
        }
    }

    // Сортируем топ по убыванию урона
    return top_list.sort((a, b) => b.damage - a.damage);
}

// Пример использования:
const topCombinations = getTopDamageCombinations(
    disk_main_stats,
    disks_sub_stats,
    sheer_force_damage
);

console.log("Топ-10 комбинаций по урону:");
topCombinations.forEach((combo, index) => {
    console.log(`#${index + 1}: Урон = ${combo.damage}, Характеристики = ${JSON.stringify(combo)}`);
});