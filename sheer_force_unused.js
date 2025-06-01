
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


function mergeDiskStats(disksArray) {
    return disksArray.map(diskSet => {
        const stats = {};
        
        // Суммируем характеристики каждого диска
        for (const disk of diskSet) {
            for (const stat of disk) {
                const { name, count } = stat;
                if (stats[name]) {
                    stats[name] += count;
                } else {
                    stats[name] = count;
                }
            }
        }
        
        return stats;
    });
}
function mergeStatsArray(arr1, arr2) {
    const resultMap = new Map();
    
    for (const {name, count} of arr1) {
        resultMap.set(name, (resultMap.get(name) || 0) + count);
    }
    
    for (const {name, count} of arr2) {
        resultMap.set(name, (resultMap.get(name) || 0) + count);
    }
    
    return Array.from(resultMap.entries()).map(([name, count]) => ({name, count}));
}

// const disks_main_stats = [
// 	[{ name: 'hp', count: 10}, { name: 'hp', count: 10 }, { name: 'hp', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'attribute', count: 1 }, { name: 'hp', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'atk', count: 10 }, { name: 'hp', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'hp', count: 10 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'attribute', count: 1 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'atk', count: 10 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'hp', count: 10 }, { name: 'cr', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'attribute', count: 1 }, { name: 'cr', count: 10 }],
// 	[{ name: 'hp', count: 10}, { name: 'atk', count: 10 }, { name: 'cr', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'hp', count: 10 }, { name: 'hp', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'attribute', count: 1 }, { name: 'hp', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'atk', count: 10 }, { name: 'hp', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'hp', count: 10 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'attribute', count: 1 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'atk', count: 10 }, { name: 'crit_dmg', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'hp', count: 10 }, { name: 'cr', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'attribute', count: 1 }, { name: 'cr', count: 10 }],
// 	[{ name: 'atk', count: 10}, { name: 'atk', count: 10 }, { name: 'cr', count: 10 }],
// ];