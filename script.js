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
    // Überprüfen, ob das Feld bereits belegt ist
    if (fields[index] === null) {
        // Setze den aktuellen Spieler ins Array
        fields[index] = currentPlayer;

        // Füge den passenden SVG in das angeklickte <td> Element ein
        cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();

        // Entferne das onclick-Event vom <td>
        cell.onclick = null;

        // Spieler wechseln
        currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
    }
}


function generateCircleSVG() {
    // Generiere den SVG-HTML-Code für einen Kreis mit Animation
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <!-- Hintergrundkreis -->
            <circle
                cx="35" cy="35" r="30"
                fill="none"
                stroke="#ccc"
                stroke-width="5"
            />
            <!-- Vordergrundkreis mit Animation -->
            <circle
                cx="35" cy="35" r="30"
                fill="none"
                stroke="#00B0EF"
                stroke-width="5"
                stroke-dasharray="188.4"
                stroke-dashoffset="188.4"
                stroke-linecap="round"
            >
                <!-- Animation -->
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
    // Generiere den SVG-HTML-Code für ein Kreuz mit Animation
    return `
        <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
            <!-- Linie 1 -->
            <line
                x1="15" y1="15" x2="55" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <!-- Animation -->
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                />
            </line>
            <!-- Linie 2 -->
            <line
                x1="55" y1="15" x2="15" y2="55"
                stroke="#FFC000"
                stroke-width="5"
                stroke-linecap="round"
                stroke-dasharray="56.57"
                stroke-dashoffset="56.57"
            >
                <!-- Animation -->
                <animate
                    attributeName="stroke-dashoffset"
                    from="56.57"
                    to="0"
                    dur="0.25s"
                    fill="freeze"
                    begin="0.125s" <!-- Startet leicht verzögert -->
                />
            </line>
        </svg>
    `;
}

// Beispiel: Den SVG-HTML-Code in einen Container einfügen
document.getElementById("container").innerHTML = generateCrossSVG();

// Beispiel: Den SVG-HTML-Code in einen Container einfügen
document.getElementById("container").innerHTML = generateCircleSVG();