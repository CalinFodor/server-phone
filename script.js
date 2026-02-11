async function loadStats() {
      const res = await fetch("http://192.168.222.114:3000/stats");
      const data = await res.json();
      
      // Update Battery (Accessing the parsed JSON from termux)
      document.getElementById('bat-bar').innerText = data.battery.display;
      document.getElementById('bat-bar').style.width = data.battery.display; 

      // Update Storage (Using the percentage for a progress bar width)
      document.getElementById('stor-text').innerText = data.storage.display;
      document.getElementById('store-bar').style.width = data.storage.percent;
      document.getElementById('store-bar').innerText = data.storage.percent;

      // Update Memory (Accessing our new 'display' string)
      document.getElementById('mem-text').innerText = data.memory.display;
      document.getElementById('mem-bar').innerText = data.memory.percent;
      document.getElementById('mem-bar').style.width = data.memory.percent;


        }
setInterval(loadStats, 2000);
loadStats();