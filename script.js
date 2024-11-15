let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Startspieler
let gameOver = false; // Spielstatus

function init() {
    render();
}

function render() {
    // Zugriff auf den Container
    const container = document.getElementById("container");

    // Start des HTML-Strings für die Tabelle
    let tableHTML = '<table>';

    // Generiere die Zeilen und Zellen der Tabelle
    for (let i = 0; i < 3; i++) { // 3 Reihen
        tableHTML += '<tr>';
        for (let j = 0; j < 3; j++) { // 3 Spalten
            const index = i * 3 + j; // Index im `fields` Array
            let content = '';

            // Feldinhalt bestimmen
            if (fields[index] === 'circle') {
                content = generateCircleSVG(); // Kreis
            } else if (fields[index] === 'cross') {
                content = generateCrossSVG(); // Kreuz
            }

            // Klickevent einfügen, falls Feld leer ist
            tableHTML += `<td onclick="handleCellClick(${index}, this)">${content}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    // HTML in den Container einfügen
    container.innerHTML = tableHTML;
}

function handleCellClick(index, cell) {
    if (gameOver) return; // Keine Aktionen, wenn das Spiel vorbei ist

    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        // Setze den aktuellen Spieler ins Array
        fields[index] = currentPlayer;

        // Füge den passenden SVG in das angeklickte <td> Element ein
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();

        // Entferne das onclick-Event vom <td>
        cell.onclick = null;

        // Prüfen, ob jemand gewonnen hat
        if (checkWin()) {
            gameOver = true;
            drawWinningLine(checkWin());
            return;
        }

        // Spieler wechseln
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}

function checkWin() {
    // Gewinnkombinationen
    const winPatterns = [
        [0, 1, 2], // Horizontal oben
        [3, 4, 5], // Horizontal mitte
        [6, 7, 8], // Horizontal unten
        [0, 3, 6], // Vertikal links
        [1, 4, 7], // Vertikal mitte
        [2, 5, 8], // Vertikal rechts
        [0, 4, 8], // Diagonal von oben links
        [2, 4, 6]  // Diagonal von oben rechts
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (
            fields[a] &&
            fields[a] === fields[b] &&
            fields[a] === fields[c]
        ) {
            return pattern; // Rückgabe der Gewinnkombination
        }
    }
    return null; // Kein Gewinner
}

function drawWinningLine(pattern) {
    const table = document.querySelector('table');
    const line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'white';
    line.style.height = '5px';
    line.style.zIndex = '10';

    // Koordinaten der Felder berechnen
    const cells = document.querySelectorAll('td');
    const startCell = cells[pattern[0]];
    const endCell = cells[pattern[2]];

    const startRect = startCell.getBoundingClientRect();
    const endRect = endCell.getBoundingClientRect();

    const containerRect = table.getBoundingClientRect();

    const x1 = startRect.left + startRect.width / 2 - containerRect.left;
    const y1 = startRect.top + startRect.height / 2 - containerRect.top;
    const x2 = endRect.left + endRect.width / 2 - containerRect.left;
    const y2 = endRect.top + endRect.height / 2 - containerRect.top;

    // Winkel und Länge der Linie berechnen
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

    // Linie stylen und positionieren
    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.transformOrigin = '0 0';
    line.style.left = `${x1}px`;
    line.style.top = `${y1}px`;

    table.style.position = 'relative';
    table.appendChild(line);
}

function generateCircleSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <circle
                cx="35" cy="35" r="30"
                fill="none"
                stroke="#00B0EF"
                stroke-width="5"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4"
                stroke-linecap="round"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="188.4"
                    to="0"
                    dur="0.5s"
                    fill="freeze"
                />
            </circle>
        </svg>
    `;
}

function generateCrossSVG() {
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <line
                x1="15" y1="15" x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                />
            </line>
            <line
                x1="55" y1="15" x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                    begin="0.125s"
                />
            </line>
        </svg>
    `;
}

// Spiel initialisieren
init();
function restartGame() {
    fields = [null, null, null, null, null, null, null, null, null]; // Spielfeld zurücksetzen
    currentPlayer = 'circle'; // Startspieler zurücksetzen
    gameOver = false; // Spielstatus zurücksetzen
    init(); // Spielfeld neu rendern
}