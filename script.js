// script.js - основной файл для управления интерфейсом

// ============ СОРТИРОВКА ============
function runBubbleSort() {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const sorted = bubbleSort([...input]);
    
    const output = document.getElementById('bubble-output');
    output.innerHTML = `
        📊 Исходный массив: [${input.join(', ')}]<br>
        ✅ Отсортированный: [${sorted.join(', ')}]<br>
        ⏱️ Сложность: O(n²)
    `;
}

// Можно добавить больше сортировок
function runQuickSort() {
    const input = [64, 34, 25, 12, 22, 11, 90];
    const sorted = quickSort([...input]);
    
    const output = document.getElementById('quick-output');
    output.innerHTML = `
        📊 Исходный: [${input.join(', ')}]<br>
        ✅ Быстрая сортировка: [${sorted.join(', ')}]<br>
        ⏱️ Сложность: O(n log n)
    `;
}

// ============ ПОИСК ============
function runBinarySearch() {
    try {
        const arrayInput = document.getElementById('search-array').value;
        let arr;
        
        // Парсим ввод (поддерживаем JSON и простые форматы)
        if (arrayInput.includes('[') && arrayInput.includes(']')) {
            arr = JSON.parse(arrayInput);
        } else {
            arr = arrayInput.split(',').map(x => parseInt(x.trim()));
        }
        
        const target = parseInt(document.getElementById('search-target').value);
        
        if (isNaN(target)) {
            document.getElementById('binary-output').innerHTML = '❌ Введите число для поиска!';
            return;
        }
        
        // Сортируем для бинарного поиска
        const sortedArr = [...arr].sort((a, b) => a - b);
        const index = binarySearch(sortedArr, target);
        
        document.getElementById('binary-output').innerHTML = `
            🔍 Исходный массив: [${arr.join(', ')}]<br>
            📏 Отсортированный: [${sortedArr.join(', ')}]<br>
            🎯 Ищем число: ${target}<br>
            ${index !== -1 ? `✅ Найдено на позиции ${index}` : '❌ Не найдено'}<br>
            ⏱️ Сложность: O(log n)
        `;
    } catch(e) {
        document.getElementById('binary-output').innerHTML = '❌ Ошибка: проверьте формат массива (например: [1,2,3] или 1,2,3)';
    }
}

function runLinearSearch() {
    const arrayInput = document.getElementById('linear-array').value;
    const arr = arrayInput.split(',').map(x => parseInt(x.trim()));
    const target = parseInt(document.getElementById('linear-target').value);
    
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            index = i;
            break;
        }
    }
    
    document.getElementById('linear-output').innerHTML = `
        🔍 Массив: [${arr.join(', ')}]<br>
        🎯 Ищем: ${target}<br>
        ${index !== -1 ? `✅ Найдено на позиции ${index}` : '❌ Не найдено'}<br>
        ⏱️ Сложность: O(n)
    `;
}

// ============ ГРАФЫ ============
function runDFS() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    
    const traversal = dfs(graph, 'A');
    const path = traversal.join(' → ');
    
    document.getElementById('dfs-output').innerHTML = `
        🌲 Граф:<br>
        <pre style="margin:5px 0">${JSON.stringify(graph, null, 2)}</pre>
        🚀 Обход в глубину (DFS) от вершины A:<br>
        <strong>${path}</strong><br>
        ⏱️ Сложность: O(V + E)
    `;
}

function runBFS() {
    const graph = {
        'A': ['B', 'C'],
        'B': ['D', 'E'],
        'C': ['F'],
        'D': [],
        'E': ['F'],
        'F': []
    };
    
    const traversal = bfs(graph, 'A');
    const path = traversal.join(' → ');
    
    document.getElementById('bfs-output').innerHTML = `
        🌲 Граф:<br>
        <pre style="margin:5px 0">${JSON.stringify(graph, null, 2)}</pre>
        🚀 Обход в ширину (BFS) от вершины A:<br>
        <strong>${path}</strong><br>
        ⏱️ Сложность: O(V + E)
    `;
}

// ============ ДИНАМИЧЕСКОЕ ПРОГРАММИРОВАНИЕ ============
function runFibonacci() {
    const n = parseInt(document.getElementById('fib-number').value);
    
    if (isNaN(n) || n < 0) {
        document.getElementById('fib-output').innerHTML = '❌ Введите неотрицательное число';
        return;
    }
    
    const start = performance.now();
    const result = fibonacci(n);
    const end = performance.now();
    
    document.getElementById('fib-output').innerHTML = `
        🔢 Число Фибоначчи F(${n}) = ${result}<br>
        ⏱️ Вычислено за ${(end - start).toFixed(2)} мс<br>
        📈 Сложность: O(n) с мемоизацией
    `;
}

// ============ ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ============
function generateRandomArray() {
    const length = Math.floor(Math.random() * 10) + 5;
    const arr = Array.from({length}, () => Math.floor(Math.random() * 100));
    return arr;
}

function fillExample() {
    const randomArr = generateRandomArray();
    document.getElementById('search-array').value = JSON.stringify(randomArr);
    document.getElementById('search-target').value = randomArr[Math.floor(Math.random() * randomArr.length)];
}

// Очистка всех выводов
function clearAllOutputs() {
    const outputs = document.querySelectorAll('pre');
    outputs.forEach(output => {
        output.innerHTML = '🔄 Ожидание выполнения...';
    });
}

// ============ ИНИЦИАЛИЗАЦИЯ ============
// Добавляем слушатели событий после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ Сайт с алгоритмами загружен!');
    
    // Заполняем пример при загрузке
    if (document.getElementById('search-array')) {
        fillExample();
    }
    
    // Добавляем кнопку очистки, если её нет
    const container = document.querySelector('.algorithms-grid');
    if (container && !document.getElementById('clear-btn')) {
        const clearBtn = document.createElement('button');
        clearBtn.id = 'clear-btn';
        clearBtn.textContent = '🧹 Очистить все выводы';
        clearBtn.style.margin = '20px auto';
        clearBtn.style.display = 'block';
        clearBtn.onclick = clearAllOutputs;
        container.parentNode.insertBefore(clearBtn, container.nextSibling);
    }
});

// Экспортируем функции в глобальную область видимости
window.runBubbleSort = runBubbleSort;
window.runQuickSort = runQuickSort;
window.runBinarySearch = runBinarySearch;
window.runLinearSearch = runLinearSearch;
window.runDFS = runDFS;
window.runBFS = runBFS;
window.runFibonacci = runFibonacci;
window.fillExample = fillExample;
window.clearAllOutputs = clearAllOutputs;