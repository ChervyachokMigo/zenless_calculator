const { generateAllDisks } = require("./generate_disks");


function computeAllVectors() {
    const disks = generateAllDisks();
    const paramIndex = { 'atk': 0, 'hp': 1, 'cr': 2, 'crit_dmg': 3 };
    const BASE = 31; // 0-30 (включительно)
    const SIZE = BASE ** 4;
    
    // Преобразование дисков в 4D-векторы
    const diskVectors = [];
    for (const disk of disks) {
        const vec = new Int8Array(4);
        for (const { name, count } of disk) {
            vec[paramIndex[name]] = count;
        }
        diskVectors.push(vec);
    }

    // Инициализация DP
    const dp = Array(7).fill().map(() => new Uint8Array(SIZE));
    dp[0][0] = 1; // Начальное состояние

    // Обработка по слоям (1-6 дисков)
    for (let i = 0; i < 6; i++) {
        for (let idx = 0; idx < SIZE; idx++) {
            if (!dp[i][idx]) continue;
            
            // Декодирование индекса
            const d = idx % BASE;
            const c = Math.floor(idx / BASE) % BASE;
            const b = Math.floor(idx / BASE**2) % BASE;
            const a = Math.floor(idx / BASE**3) % BASE;
            
            for (const vec of diskVectors) {
                // Новые значения характеристик
                const na = a + vec[0];
                const nb = b + vec[1];
                const nc = c + vec[2];
                const nd = d + vec[3];
                
                // Проверка границ
                if (na > 30 || nb > 30 || nc > 30 || nd > 30) continue;
                
                // Кодирование нового индекса
                const newIdx = na*BASE**3 + nb*BASE**2 + nc*BASE + nd;
                dp[i+1][newIdx] = 1;
            }
        }
    }

    // Сбор результатов
    const result = [];
    for (let idx = 0; idx < SIZE; idx++) {
        if (!dp[6][idx]) continue;
        
        const d = idx % BASE;
        const c = Math.floor(idx / BASE) % BASE;
        const b = Math.floor(idx / BASE**2) % BASE;
        const a = Math.floor(idx / BASE**3) % BASE;
        
        result.push([a, b, c, d]);
    }
    
    return result;
}

function vectorToObject(vec) {
    return {
        atk: vec[0],
        hp: vec[1],
        cr: vec[2],
        crit_dmg: vec[3]
    };
}

module.exports = {
	get_all_disks: () => computeAllVectors().map(vectorToObject),
}

// const allObjects = _this.get_all_disks();

// // Сохранение или использование результатов
// console.log(`Сгенерировано ${allObjects.length} объектов характеристик`);
// console.log("Пример первого объекта:", allObjects[0]);
// console.log("Пример последнего объекта:", allObjects[allObjects.length - 1]);
