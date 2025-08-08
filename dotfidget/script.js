document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gridContainer");
  const gridSizeSelect = document.getElementById("gridSize");
  const shapeTypeSelect = document.getElementById("shapeType");
  const resetBtn = document.getElementById("resetBtn");
  const circleSizeSelect = document.getElementById("circleSize");
  const gridSizeLabel = document.getElementById("gridSizeLabel");
  const circleSizeLabel = document.getElementById("circleSizeLabel");

  // Position buttons
  const posTopBtn = document.getElementById("posTop");
  const posMiddleBtn = document.getElementById("posMiddle");
  const posBottomBtn = document.getElementById("posBottom");

  // Dot size in px (fixed)
  const DOT_SIZE = 25;
  const DOT_BORDER = 2; // border thickness on each side, included in dot size

  function createGrid(size, shape) {
    gridContainer.innerHTML = "";

    if (shape === "square") {
      // Grid layout - fixed style
      gridContainer.style.position = "relative";
      gridContainer.style.display = "grid";
      gridContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;
      gridContainer.style.width = "auto";
      gridContainer.style.height = "auto";
      gridContainer.style.justifyContent = "start";
      gridContainer.style.padding = "15px";

      for (let i = 0; i < size * size; i++) {
        const dot = document.createElement("div");
        dot.classList.add("dot", shape);
        dot.addEventListener("click", () => {
          dot.classList.toggle("active");
        });
        gridContainer.appendChild(dot);
      }
    } else if (shape === "circle") {
      // Circle layout

      // Dynamic container size based on rings (circleSize)
      // Smaller rings => smaller container; bigger rings => bigger container
      // Define min and max container sizes:
      const minContainerSize = 200;
      const maxContainerSize = 600;
      const rings = size;

      // Linear interpolation for container size based on rings (3 to 10)
      const clampedRings = Math.min(Math.max(rings, 3), 10);
      const containerSize = minContainerSize + ((clampedRings - 3) / (10 - 3)) * (maxContainerSize - minContainerSize);

      gridContainer.style.position = "relative";
      gridContainer.style.display = "block";
      gridContainer.style.width = `${containerSize}px`;
      gridContainer.style.height = `${containerSize}px`;
      gridContainer.style.gridTemplateColumns = "";
      gridContainer.style.justifyContent = "";
      gridContainer.style.padding = "0";

      const centerX = containerSize / 2;
      const centerY = containerSize / 2;
      const maxRadius = containerSize / 2 - DOT_SIZE; // leave margin for dots

      let dotsPlaced = 0;

      for (let ring = 0; ring < rings; ring++) {
        const radius = (ring / (rings - 1)) * maxRadius;

        const desiredSpacing = DOT_SIZE + 6;
        const circumference = 2 * Math.PI * radius;
        let approxDotsInRing = 0;

        if (ring === 0) {
          approxDotsInRing = 1; // center dot
        } else {
          approxDotsInRing = Math.max(3, Math.round(circumference / desiredSpacing));
        }

        for (let i = 0; i < approxDotsInRing; i++) {
          if (dotsPlaced >= rings * rings * 3) break;

          const angle = (i / approxDotsInRing) * 2 * Math.PI;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);

          const dot = document.createElement("div");
          dot.classList.add("dot", shape);
          dot.style.position = "absolute";
          dot.style.left = `${x - DOT_SIZE / 2}px`;
          dot.style.top = `${y - DOT_SIZE / 2}px`;
          dot.addEventListener("click", () => {
            dot.classList.toggle("active");
          });

          gridContainer.appendChild(dot);
          dotsPlaced++;
        }
      }
    }
  }

  function updateGrid() {
    const shape = shapeTypeSelect.value;

    if (shape === "circle") {
      circleSizeSelect.style.display = "";
      circleSizeLabel.style.display = "";
      gridSizeSelect.style.display = "none";
      gridSizeLabel.style.display = "none";

      const rings = parseInt(circleSizeSelect.value);
      createGrid(rings, shape);
    } else {
      circleSizeSelect.style.display = "none";
      circleSizeLabel.style.display = "none";
      gridSizeSelect.style.display = "";
      gridSizeLabel.style.display = "";

      const size = parseInt(gridSizeSelect.value);
      createGrid(size, shape);
    }
  }

  function setPosition(position) {
    gridContainer.classList.remove("position-top", "position-middle", "position-bottom");
    gridContainer.classList.add(`position-${position}`);

    // Update active button styling
    posTopBtn.classList.toggle("active", position === "top");
    posMiddleBtn.classList.toggle("active", position === "middle");
    posBottomBtn.classList.toggle("active", position === "bottom");
  }

  posTopBtn.addEventListener("click", () => setPosition("top"));
  posMiddleBtn.addEventListener("click", () => setPosition("middle"));
  posBottomBtn.addEventListener("click", () => setPosition("bottom"));

  shapeTypeSelect.addEventListener("change", updateGrid);
  gridSizeSelect.addEventListener("change", updateGrid);
  circleSizeSelect.addEventListener("change", updateGrid);
  resetBtn.addEventListener("click", updateGrid);

  // Initialize
  updateGrid();
  setPosition("bottom"); // default to bottom
});
