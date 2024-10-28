function loadReport() {
    const points = JSON.parse(localStorage.getItem("points")) || [];
    const reportDiv = document.getElementById("report");
    reportDiv.innerHTML = '';
    points.forEach(points, index => {
        const entry = document.createElement("div");
        entry.classList.add(point.isEdited ? "edited" : "", point.observation ? "observation" : "");
        entry.innerHTML = `${point.date} ${point.time} - ${point.type} ${point.observation ? '(' + point.observation + ')' : ''}`;
        const editBtn = document.createElement("button");
        editBtn.innerText = "Editar";
        editBtn.onclick = () => editPoint(index);
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Excluir";
        deleteBtn.onclick = () => alert("Não é possível excluir o ponto");
        entry.appendChild(editBtn);
        entry.appendChild(deleteBtn);
        reportDiv.appendChild(entry);
    });
}