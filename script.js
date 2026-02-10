async function loadStats() {
      const res = await fetch("http://192.168.222.114:3000/stats");
      const data = await res.json();
      
      // Update Battery (Accessing the parsed JSON from termux)
      document.getElementById('bat-val').innerText = data.battery.percentage + '%';

      // Update Memory (Accessing our new 'display' string)
      document.getElementById('mem-val').innerText = data.memory.display;

      // Update Storage (Using the percentage for a progress bar width)
      document.getElementById('store-bar').style.width = data.storage.percent;
      document.getElementById('store-val').innerText = data.storage.display;
        }
setInterval(loadStats, 2000);
loadStats();