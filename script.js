let total = 0;
let expense = 0;
let chart;

// Load saved data on start
window.onload = function () {
    let saved = JSON.parse(localStorage.getItem("expenses")) || [];

    saved.forEach(item => {
        createExpense(item.amount, item.category, false);
    });

    updateUI();
};

function addExpense() {
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;

    if (amount === "" || amount <= 0) return;

    amount = Number(amount);

    createExpense(amount, category, true);

    document.getElementById("amount").value = "";
}

function createExpense(amount, category, save) {
    expense += amount;
    total += amount;

    let li = document.createElement("li");
    li.innerText = `${category} - ₹${amount}`;

    let btn = document.createElement("button");
    btn.innerText = "Delete";

    btn.onclick = function () {
        expense -= amount;
        total -= amount;

        li.remove();

        removeFromStorage(amount, category);

        updateUI();
    };

    li.appendChild(btn);
    document.getElementById("list").appendChild(li);

    if (save) {
        let saved = JSON.parse(localStorage.getItem("expenses")) || [];
        saved.push({ amount, category });
        localStorage.setItem("expenses", JSON.stringify(saved));
    }

    updateUI();
}

function removeFromStorage(amount, category) {
    let saved = JSON.parse(localStorage.getItem("expenses")) || [];

    saved = saved.filter(item => !(item.amount === amount && item.category === category));

    localStorage.setItem("expenses", JSON.stringify(saved));
}

function updateUI() {
    document.getElementById("total").innerText = "Total: ₹" + total;
    updateChart();
}

function updateChart() {
    let ctx = document.getElementById("myChart").getContext("2d");

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Expense"],
            datasets: [{
                data: [expense],
                backgroundColor: ["#ff6384"]
            }]
        }
    });
}