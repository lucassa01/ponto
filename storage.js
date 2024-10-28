function getPoints() {
    return JSON.parse(localStorage.getItem("points")) || [];
}

function savePoints(points) {
    localStorage.setItem("points", JSON.stringify(points));
}