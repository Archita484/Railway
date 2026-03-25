function searchTrain() {

    let from = document.querySelector('input[placeholder="From"]').value;
    let to = document.querySelector('input[placeholder="To"]').value;
    let date = document.querySelector('input[type="date"]').value;

    if (!from || !to || !date) {
        alert("Please fill all details!");
        return;
    }

    fetch("http://localhost:3000/search", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            from: from.toUpperCase(),
            to: to.toUpperCase()
        })
    })
    .then(res => res.json())
    .then(data => {
        displayResults(data);
    })
    .catch(err => {
        console.log(err);
        alert("Error fetching trains");
    });
}

function displayResults(trains) {

    let resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "";

    if (trains.length === 0) {
        resultDiv.innerHTML = "<p>No trains found</p>";
        return;
    }

    trains.forEach(train => {
        resultDiv.innerHTML += `
            <div style="background:white; margin:10px; padding:15px; border-radius:10px;">
                <b>${train.train_name}</b><br>
                ${train.source} → ${train.destination}<br>
                Departure: ${train.departure} | Arrival: ${train.arrival}<br>
                Duration: ${train.duration}
            </div>
        `;
    });
}