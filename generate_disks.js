function generateAllDisks() {
    const params = ['atk', 'hp', 'cr', 'crit_dmg'];
    const result = [];
    const seen = new Set();

    // Перебираем все возможные комбинации параметров (1-4 параметра)
    for (let mask = 1; mask < 16; mask++) {
        const presentParams = [];
        for (let i = 0; i < 4; i++) {
            if (mask & (1 << i)) {
                presentParams.push(params[i]);
            }
        }
        
        // Генерируем все распределения улучшений
        const distributions = generateDistributions(presentParams.length, 4);
        
        for (const dist of distributions) {
            const disk = [];
            
            // Создаем объекты для каждого присутствующего параметра
            for (let i = 0; i < presentParams.length; i++) {
                disk.push({
                    name: presentParams[i],
                    count: 1 + dist[i]  // базовое значение + улучшения
                });
            }
            
            // Сортируем параметры по имени для единообразия
            disk.sort((a, b) => a.name.localeCompare(b.name));
            
            // Проверяем уникальность
            const key = JSON.stringify(disk);
            if (!seen.has(key)) {
                seen.add(key);
                result.push(disk);
            }
        }
    }
    
    return result;
}

// Рекурсивная генерация распределений улучшений
function generateDistributions(k, total) {
    if (k === 0) {
        return total === 0 ? [[]] : [];
    }
    
    const result = [];
    for (let i = 0; i <= total; i++) {
        const rest = generateDistributions(k - 1, total - i);
        for (const r of rest) {
            result.push([i, ...r]);
        }
    }
    return result;
}



function* generateAllDiskCombinations() {
    const disks = generateAllDisks();
    const n = disks.length;

    // 0. Все базовые (индекс 0)
    yield Array(6).fill(disks[0]);

    // Вспомогательная функция: сочетания позиций (n choose k)
    function getCombinations(n, k) {
        const result = [];
        const comb = [];
        function dfs(start) {
            if (comb.length === k) {
                result.push([...comb]);
                return;
            }
            for (let i = start; i < n; i++) {
                comb.push(i);
                dfs(i + 1);
                comb.pop();
            }
        }
        dfs(0);
        return result;
    }

    // 1. Ровно один дополнительный тип (i)
    for (let i = 1; i < n; i++) {
        for (let k = 1; k <= 6; k++) {
            const positions = getCombinations(6, k);
            for (const pos of positions) {
                const combo = Array(6).fill(disks[0]);
                for (const p of pos) {
                    combo[p] = disks[i];
                }
                yield combo;
            }
        }
    }

    // 2. Ровно два дополнительных типа (i, j) с i < j
    for (let i = 1; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            // Перебор всех 3^6 возможностей
            for (let code = 0; code < 729; code++) { // 3^6 = 729
                let temp = code;
                const combo = [];
                let hasI = false;
                let hasJ = false;
                for (let bit = 0; bit < 6; bit++) {
                    const d = temp % 3;
                    temp = Math.floor(temp / 3);
                    if (d === 0) {
                        combo.push(disks[0]);
                    } else if (d === 1) {
                        combo.push(disks[i]);
                        hasI = true;
                    } else if (d === 2) {
                        combo.push(disks[j]);
                        hasJ = true;
                    }
                }
                if (hasI && hasJ) {
                    yield combo;
                }
            }
        }
    }

	return disks;
}

// Генерация и вывод результатов
module.exports = {generateAllDisks,
generateAllDiskCombinations}

// const comboGenerator = generateAllDiskCombinations();

// // Для получения всех комбинаций (осторожно: большое количество)
// let allCombinations = [];
// for (const combo of comboGenerator) {
//     allCombinations.push(combo);
// }

// // Или обработка по одной комбинации
// for (const combo of generateAllDiskCombinations()) {
//     console.log(combo);
// }