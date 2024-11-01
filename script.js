document.addEventListener("DOMContentLoaded", () => {
    mostrarDataHoraAtual();
    document.getElementById("registroForm").addEventListener("submit", registrarPonto);
    document.getElementById("registrarIntervalo").addEventListener("click", registrarIntervalo);
    document.getElementById("visualizarRelatorio").addEventListener("click", visualizarRelatorio);
});

// Mostrar data e hora atuais
function mostrarDataHoraAtual() {
    const now = new Date();
    document.getElementById("currentDateTime").innerText = now.toLocaleString();
}

// Registrar ponto de entrada ou saída
function registrarPonto(event) {
    event.preventDefault();
    const dataHora = document.getElementById("registroDataHora").value;
    const justificativa = document.getElementById("justificativa").value;
    const arquivo = document.getElementById("uploadArquivo").files[0];

    if (!dataHora) {
        alert("Por favor, insira a data e hora.");
        return;
    }

    const ponto = {
        dataHora: new Date(dataHora).toISOString(),
        justificativa,
        arquivo: arquivo ? URL.createObjectURL(arquivo) : null,
        tipo: 'entrada'
    };

    salvarRegistroNoLocalStorage(ponto);
    alert("Ponto registrado com sucesso!");
}

// Registrar intervalo
function registrarIntervalo() {
    const dataHora = new Date().toISOString();
    const intervalo = {
        dataHora,
        tipo: 'intervalo'
    };

    salvarRegistroNoLocalStorage(intervalo);
    alert("Intervalo registrado com sucesso!");
}

// Visualizar relatório
function visualizarRelatorio() {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    const relatorioContainer = document.getElementById("relatorioContainer");
    relatorioContainer.innerHTML = "";

    if (registros.length === 0) {
        relatorioContainer.innerHTML = "<p>Nenhum registro encontrado.</p>";
        return;
    }

    registros.forEach((registro, index) => {
        const divRegistro = document.createElement("div");
        divRegistro.className = "registro";
        const dataHora = new Date(registro.dataHora).toLocaleString();

        divRegistro.innerHTML = `
            <span>Data: ${dataHora} ${registro.justificativa ? '(Justificativa: ' + registro.justificativa + ')' : ''}</span>
            <span>Tipo: ${registro.tipo.charAt(0).toUpperCase() + registro.tipo.slice(1)}</span>
            <button onclick="editarRegistro(${index})">Editar</button>
            <button onclick="alert('Registro não pode ser excluído.');">Excluir</button>
        `;
        relatorioContainer.appendChild(divRegistro);
    });
}

function salvarRegistroNoLocalStorage(ponto) {
    const registros = JSON.parse(localStorage.getItem("registros")) || [];
    registros.push(ponto);
    localStorage.setItem("registros", JSON.stringify(registros));
}

function editarRegistro(index) {
    const registros = JSON.parse(localStorage.getItem("registros"));
    const registro = registros[index];

    // Aqui você pode implementar a lógica de edição.
    alert(`Editar Registro: ${registro.dataHora}\nJustificativa: ${registro.justificativa}`);
}