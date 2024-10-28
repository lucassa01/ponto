function updaDateTime() {
    const now = new Date();
    document.getElementById("datetime").innerText = now.toLocaleString();
}
setInterval(updaDateTime, 1000);

function registerPoint(type) {
    const now = new Date();
    const observation = document.getElementById("observation").value;
    const point = {
        type: type,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        observation: observation || "",
        isEdited: false
    };
    const points = JSON.parse(localStorage.getItem("points")) || [];
    points.push(point);
    localStorage.setItem("points", JSON.stringify(points));
}