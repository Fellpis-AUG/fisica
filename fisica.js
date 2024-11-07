document.getElementById("numGeradores").addEventListener("input", atualizarGeradores);
document.getElementById("numResistores").addEventListener("input", atualizarResistores);

function atualizarGeradores() {
    const numGeradores = document.getElementById("numGeradores").value;
    const containerGeradores = document.getElementById("geradores");
    containerGeradores.innerHTML = '';

    for (let i = 0; i < numGeradores; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `Voltagem do Gerador ${i + 1} (V)`;
        input.id = `gerador${i}`;
        containerGeradores.appendChild(input);
    }
}

function atualizarResistores() {
    const numResistores = document.getElementById("numResistores").value;
    const containerResistores = document.getElementById("resistores");
    containerResistores.innerHTML = '';

    for (let i = 0; i < numResistores; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.placeholder = `Resistência do Resistor ${i + 1} (Ω)`;
        input.id = `resistor${i}`;
        containerResistores.appendChild(input);
    }
}

function calcular() {
    const tipoAssociacao = document.getElementById("tipoAssociacao").value;
    const numGeradores = document.getElementById("numGeradores").value;
    const numResistores = document.getElementById("numResistores").value;

    // Obter as voltagens dos geradores
    let tensaoTotal = 0;
    for (let i = 0; i < numGeradores; i++) {
        tensaoTotal += parseFloat(document.getElementById(`gerador${i}`).value);
    }

    // Obter as resistências dos resistores
    let resistenciaTotal = 0;
    if (tipoAssociacao === "serie") {
        for (let i = 0; i < numResistores; i++) {
            resistenciaTotal += parseFloat(document.getElementById(`resistor${i}`).value);
        }
    } else if (tipoAssociacao === "paralelo") {
        let inversoResistencia = 0;
        for (let i = 0; i < numResistores; i++) {
            inversoResistencia += 1 / parseFloat(document.getElementById(`resistor${i}`).value);
        }
        resistenciaTotal = 1 / inversoResistencia;
    }

    // Calcular corrente
    const correnteTotal = tensaoTotal / resistenciaTotal;

    // Verificar se a corrente é maior que 10A
    if (correnteTotal > 10) {
        alert("A corrente total excede 10 A.");
        return;
    }

    // Exibir resultados
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = `
        <h3>Resultados</h3>
        <p><strong>Tensão total:</strong> ${tensaoTotal.toFixed(2)} V</p>
        <p><strong>Resistência total:</strong> ${resistenciaTotal.toFixed(2)} Ω</p>
        <p><strong>Corrente total:</strong> ${correnteTotal.toFixed(2)} A</p>
    `;

    if (tipoAssociacao === "serie") {
        resultados.innerHTML += `<h4>Tensões nos resistores:</h4>`;
        for (let i = 0; i < numResistores; i++) {
            const resistorValue = parseFloat(document.getElementById(`resistor${i}`).value);
            const tensaoResistor = correnteTotal * resistorValue;
            resultados.innerHTML += `<p>Tensão no resistor ${resistorValue}Ω: ${tensaoResistor.toFixed(2)} V</p>`;
        }
    } else if (tipoAssociacao === "paralelo") {
        resultados.innerHTML += `<h4>Correntes nos resistores:</h4>`;
        for (let i = 0; i < numResistores; i++) {
            const resistorValue = parseFloat(document.getElementById(`resistor${i}`).value);
            const correnteResistor = tensaoTotal / resistorValue;
            resultados.innerHTML += `<p>Corrente no resistor ${resistorValue}Ω: ${correnteResistor.toFixed(2)} A</p>`;
        }
    }
}
