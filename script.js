let fields = [
    'circle',
    null,
    'cross',
    null,
    null,
    null,
    null,
    null,
    null
];
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
                content = 'O'; // Kreis
            } else if (fields[index] === 'cross') {
                content = 'X'; // Kreuz
            }

            tableHTML += `<td>${content}</td>`;
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    
    // HTML in den Container einfügen
    container.innerHTML = tableHTML;
}

// Aufrufen der render Funktion, um die Tabelle zu erstellen
