let selectedItem = null;

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function dropToZone(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const element = document.getElementById(id);
  let target = ev.target;
  while (!target.classList.contains('dropzone') && target !== document.body) {
    target = target.parentElement;
  }
  if (target.classList.contains('dropzone')) {
    target.appendChild(element);
    clearSelection();
  }
}

function dropToPool(ev) {
  ev.preventDefault();
  const id = ev.dataTransfer.getData("text");
  const element = document.getElementById(id);
  document.getElementById("pool").appendChild(element);
  clearSelection();
}

function selectFood(el) {
  if (selectedItem === el) {
    clearSelection();
  } else {
    clearSelection();
    selectedItem = el;
    selectedItem.classList.add("selected");
  }
}

function moveSelectedToZone(zone) {
  if (selectedItem) {
    zone.appendChild(selectedItem);
    clearSelection();
  }
}

function clearSelection() {
  if (selectedItem) {
    selectedItem.classList.remove("selected");
    selectedItem = null;
  }
}

function checkAnswers() {
  const healthyZone = document.getElementById("healthy");
  const junkZone = document.getElementById("junk");
  const pool = document.getElementById("pool");
  const resultEl = document.getElementById("result");

  if (pool.children.length > 0) {
    resultEl.style.color = "#d29922";
    resultEl.textContent = "Ainda existem alimentos não classificados!";
    return;
  }

  let total = 8;
  let correct = 0;

  const healthyItems = healthyZone.getElementsByClassName("food-item");
  for (let item of healthyItems) {
    if (item.getAttribute("data-type") === "healthy") {
      item.className = "food-item correct";
      correct++;
    } else {
      item.className = "food-item wrong";
    }
  }

  const junkItems = junkZone.getElementsByClassName("food-item");
  for (let item of junkItems) {
    if (item.getAttribute("data-type") === "junk") {
      item.className = "food-item correct";
      correct++;
    } else {
      item.className = "food-item wrong";
    }
  }

  if (correct === total) {
    resultEl.style.color = "#2ea043";
    resultEl.textContent = `Excelente! Acertaste todos os ${total} alimentos! 🎉`;
  } else {
    resultEl.style.color = "#f85149";
    resultEl.textContent = `Acertaste ${correct} de ${total}. Corrige os itens a vermelho!`;
  }
}

function resetGame() {
  const pool = document.getElementById("pool");
  const items = document.querySelectorAll(".food-item");
  
  items.forEach(item => {
    item.className = "food-item";
    pool.appendChild(item);
  });

  const resultEl = document.getElementById("result");
  resultEl.textContent = "";
  clearSelection();
}