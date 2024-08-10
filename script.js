
document.addEventListener("DOMContentLoaded", function() {
    // Initial resource levels with random values between 50% and 100%
    let oxygenLevel = Math.random() * 50 + 50;
    let waterLevel = Math.random() * 50 + 50;
    let fuelLevel = Math.random() * 50 + 50;

    // Base consumption rates (percentage per second)
    const baseOxygenConsumptionRate = 0.5;
    const baseWaterConsumptionRate = 0.3;
    const baseFuelConsumptionRate = 0.2;

    // Elements to update
    const oxygenBar = document.getElementById('oxygen-bar');
    const waterBar = document.getElementById('water-bar');
    const fuelBar = document.getElementById('fuel-bar');
    const oxygenLevelText = document.getElementById('oxygen-level');
    const waterLevelText = document.getElementById('water-level');
    const fuelLevelText = document.getElementById('fuel-level');

    // Buttons
    const oxygenBtn = document.getElementById('oxygen-btn');
    const waterBtn = document.getElementById('water-btn');
    const fuelBtn = document.getElementById('fuel-btn');

    // Data for Chart.js
    const labels = [];
    const oxygenData = [];
    const waterData = [];
    const fuelData = [];

    // Setup Chart.js
    const ctx = document.getElementById('resourceChart').getContext('2d');
    const resourceChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Oxygen Level',
                data: oxygenData,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Water Level',
                data: waterData,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                fill: false
            },
            {
                label: 'Fuel Level',
                data: fuelData,
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });

    // Function to get a random fluctuation that can be positive or negative
    function getRandomFluctuation(rate) {
        // Random fluctuation between -0.2 and +0.2
        const fluctuation = (Math.random() - 0.5) * 3;
        return rate + fluctuation;
    }

    // Function to get random resource change
    function getRandomResourceChange() {
        // Randomly decide to either increase or decrease
        return (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 0.5);
    }

    // Function to update resource levels and bars
    function updateResources() {
        // Apply random fluctuations to the consumption rates
        const oxygenConsumptionRate = getRandomFluctuation(baseOxygenConsumptionRate)+0.1;
        const waterConsumptionRate = getRandomFluctuation(baseWaterConsumptionRate)+0.2;
        const fuelConsumptionRate = getRandomFluctuation(baseFuelConsumptionRate)*0.1 +0.5;

        // Random resource change
        const oxygenChange = getRandomResourceChange();
        const waterChange = getRandomResourceChange();
        const fuelChange = getRandomResourceChange();

        // Update levels
        oxygenLevel -= oxygenConsumptionRate;
        waterLevel -= waterConsumptionRate;
        fuelLevel -= fuelConsumptionRate;

        // Apply random changes
        oxygenLevel += oxygenChange;
        waterLevel += waterChange;
        fuelLevel += fuelChange;

        // Ensure levels do not go below 0 or above 100
        if (oxygenLevel < 0) oxygenLevel = 0;
        if (oxygenLevel > 100) oxygenLevel = 100;
        if (waterLevel < 0) waterLevel = 0;
        if (waterLevel > 100) waterLevel = 100;
        if (fuelLevel < 0) fuelLevel = 0;
        if (fuelLevel > 100) fuelLevel = 100;

        // Update the bars
        oxygenBar.style.width = oxygenLevel + "%";
        waterBar.style.width = waterLevel + "%";
        fuelBar.style.width = fuelLevel + "%";

        // Update the text
        oxygenLevelText.textContent = `Level: ${oxygenLevel.toFixed(1)}%`;
        waterLevelText.textContent = `Level: ${waterLevel.toFixed(1)}%`;
        fuelLevelText.textContent = `Level: ${fuelLevel.toFixed(1)}%`;

        // Add data to Chart.js
        labels.push(labels.length);
        oxygenData.push(oxygenLevel.toFixed(1));
        waterData.push(waterLevel.toFixed(1));
        fuelData.push(fuelLevel.toFixed(1));

        // Update the chart
        resourceChart.update();

        // Check for critical levels
        checkCriticalLevels();
    }

    // Function to check for critical levels and trigger alerts
    function checkCriticalLevels() {
        if (oxygenLevel < 20) {
            oxygenBar.classList.add('low');
            alert("Warning: Oxygen level critical!");
        }
        if (waterLevel < 20) {
            waterBar.classList.add('low');
            alert("Warning: Water level critical!");
        }
        if (fuelLevel < 20) {
            fuelBar.classList.add('low');
            alert("Warning: Fuel level critical!");
        }
    }

    // Function to add resource levels
    function addResource(resource, amount) {
        resource += amount;
        if (resource > 100) resource = 100;
        return resource;
    }

    // Event listeners for the buttons
    oxygenBtn.addEventListener('click', function() {
        oxygenLevel = addResource(oxygenLevel, 10);
        updateResources();
    });

    waterBtn.addEventListener('click', function() {
        waterLevel = addResource(waterLevel, 10);
        updateResources();
    });

    fuelBtn.addEventListener('click', function() {
        fuelLevel = addResource(fuelLevel, 10);
        updateResources();
    });

    // Update resources every second
    setInterval(updateResources, 1000);
});
