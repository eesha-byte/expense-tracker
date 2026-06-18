let income = 0;
let expense = 0;
let chart;

function addTransaction() {
    let amount = document.getElementById("amount").value;
    let type = document.getElementById("type").value;
    let category = document.getElementById("category").value;

    if (amount === "" || amount <= 0) return;

    amount = Number(amount);

    let li = document.createElement("li");

    li.innerText = `${category} - ${type.toUpperCase()} ₹${amount} `;

    let btn = document.createElement("button");
    btn.innerText = "Delete";

    btn.onclick = function () {
        if (type === "income") {
            income -= amount;
        } else {
            expense -= amount;
        }
        li.remove();
        updateUI();
    };

    li.appendChild(btn);
    document.getElementById("list").appendChild(li);

    if (type === "income") {
        income += amount;
    } else {
        expense += amount;
    }

    document.getElementById("amount").value = "";

    updateUI();
}

function updateUI() {
    document.getElementById("summary").innerText =
        `Income: ₹${income} | Expense: ₹${expense}`;

    updateChart();
}

function updateChart() {
    let ctx = document.getElementById("myChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Income", "Expense"],
            datasets: [{
                data: [income, expense],
                backgroundColor: ["#4CAF50", "#ff6384"]
            }]
        }
    });
}
