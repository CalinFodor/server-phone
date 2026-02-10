async function loadStats() {
      const res = await fetch("http://192.168.222.114:3000/stats");
      const data = await res.json();
      
      document.getElementById('battery-level').innerText = data.battery.level + '%';
      document.getElementById('memory-usage').innerText = data.memory;
      document.getElementById('storage-status').innerText = data.storage;
    }
    setInterval(loadStats, 2000);
    loadStats();