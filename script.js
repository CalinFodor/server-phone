async function loadStats() {
      const res = await fetch("http://192.168.222.114:3000/stats");
      const data = await res.json();
      document.getElementById("output").innerHTML =
        `<div class="card"><pre>${JSON.stringify(data, null, 2)}</pre></div>`;
    }
    setInterval(loadStats, 2000);
    loadStats();