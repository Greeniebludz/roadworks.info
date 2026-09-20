document.getElementById("loadDataBtn").addEventListener("click", async () => {
  const debug = document.getElementById("debug");

  try {
    const response = await fetch("data/sample.json");
    const data = await response.json();

    debug.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    debug.textContent = "Error loading data: " + err;
  }
});
