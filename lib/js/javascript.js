let expression = "";

    function addValue(realValue, displayValue = realValue) {
      expression += realValue; 
      document.getElementById("answer").textContent += displayValue; 
    }

    function clearDisplay() {
      expression = "";
      document.getElementById("answer").textContent = "";
    }

    function calculate() {
      const display = document.getElementById("answer");
      try {
        const result = eval(expression);
        display.textContent = result;
        expression = result.toString(); 
      } catch {
        display.textContent = "Error!";
        expression = "";
      }
    }

    function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
    }

    
    setInterval(updateClock, 10000);
    updateClock();

    async function updateBattery() {
      try {
        const battery = await navigator.getBattery();
        const level = Math.round(battery.level * 100);
        const isCharging = battery.charging;
        const batteryLevel = document.getElementById('battery-level');
        const chargingIcon = document.getElementById('chargingIcon')

        batteryLevel.style.width = `${level}%`;

        if (isCharging) {
          batteryLevel.classList.add('charging');
          chargingIcon.style.display = 'block';
        } else {
          batteryLevel.classList.remove('charging');
          chargingIcon.style.display = 'none';
        }

        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
      } catch (error) {

        const batteryLevel = document.getElementById('battery-level');
        batteryLevel.style.width = '100%';
      }
    }

    updateBattery();