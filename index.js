const arrayContainer = document.getElementById("array-container");

function generateArray() {
  arrayContainer.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    const barHeight = Math.floor(Math.random() * 80) + 20;
    const arrayBar = document.createElement("div");
    arrayBar.classList.add("array-bar");
    arrayBar.style.height = `${barHeight}%`;
    arrayContainer.appendChild(arrayBar);
  }
}

async function bubbleSort() {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < bars.length - 1; i++) {
      for (let j = 0; j < bars.length - i - 1; j++) {
        bars[j].style.backgroundColor = "#ff6f61";
        bars[j + 1].style.backgroundColor = "#ff6f61";
        if (parseInt(bars[j].style.height) > parseInt(bars[j + 1].style.height)) {
          await swap(bars[j], bars[j + 1]);
        }
        bars[j].style.backgroundColor = "white";
        bars[j + 1].style.backgroundColor = "white";
      }
      bars[bars.length - 1 - i].style.backgroundColor = "#6b6b6b";
    }
  }
  
  function swap(bar1, bar2) {
    return new Promise((resolve) => {
      const tempHeight = bar1.style.height;
      bar1.style.height = bar2.style.height;
      bar2.style.height = tempHeight;
      setTimeout(() => {
        resolve();
      }, 300);
    });
  }
  
  

async function quickSort() {
  const bars = document.querySelectorAll(".array-bar");
  const heights = Array.from(bars).map((bar) => parseInt(bar.style.height));
  await quickSortHelper(heights, 0, heights.length - 1, bars);
}

async function quickSortHelper(arr, low, high, bars) {
  if (low < high) {
    const pivotIndex = await partition(arr, low, high, bars);
    await quickSortHelper(arr, low, pivotIndex - 1, bars);
    await quickSortHelper(arr, pivotIndex + 1, high, bars);
  }
}

async function partition(arr, low, high, bars) {
  const pivot = arr[high];
  bars[high].style.backgroundColor = "#ff6f61";
  let i = low - 1;
  for (let j = low; j < high; j++) {
    bars[j].style.backgroundColor = "#ff6f61";
    await delay(300);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      bars[i].style.height = `${arr[i]}%`;
      bars[j].style.height = `${arr[j]}%`;
    }
    bars[j].style.backgroundColor = "white";
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  bars[i + 1].style.height = `${arr[i + 1]}%`;
  bars[high].style.height = `${arr[high]}%`;
  bars[high].style.backgroundColor = "white";
  return i + 1;
}

async function countingSort() {
  const bars = document.querySelectorAll(".array-bar");
  const heights = Array.from(bars).map((bar) => parseInt(bar.style.height));
  const max = Math.max(...heights);
  const count = Array(max + 1).fill(0);

  for (let height of heights) count[height]++;

  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i] > 0) {
      heights[index++] = i;
      count[i]--;
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.height = `${heights[i]}%`;
    bars[i].style.backgroundColor = "#6b6b6b";
    await delay(300);
    bars[i].style.backgroundColor = "white";
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

generateArray();
