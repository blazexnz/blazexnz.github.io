document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gridContainer");
  const gridSizeSelect = document.getElementById("gridSize");
  const shapeTypeSelect = document.getElementById("shapeType");
  const resetBtn = document.getElementById("resetBtn");
  const circleSizeSelect = document.getElementById("circleSize");
  const gridSizeLabel = document.getElementById("gridSizeLabel");
  const circleSizeLabel = document.getElementById("circleSizeLabel");

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

      // Calculate dot spacing - closer for fewer rings, more spaced for more rings
      // The dots are placed on rings evenly spaced by radius
      // We'll position dots on rings from radius = 0 to maxRadius

      let dotsPlaced = 0;
      // We'll try to place dots on each ring proportionally
      // Ring 0 = center dot only

      for (let ring = 0; ring < rings; ring++) {
        // radius grows with ring number
        // To ensure even spacing between rings, radius is proportional to ring number
        // For 1 ring (ring=0), radius=0 (center dot), for last ring radius=maxRadius
        const radius = (ring / (rings - 1)) * maxRadius;

        // Calculate number of dots on this ring
        // Dot spacing depends on containerSize and rings to keep proximity dynamic
        // Approximate circumference / desired spacing:
        // desired spacing between dots is roughly DOT_SIZE + 4px margin for comfortable click
        const desiredSpacing = DOT_SIZE + 6; // dot + margin
        const circumference = 2 * Math.PI * radius;
        let approxDotsInRing = 0;

        if (ring === 0) {
          approxDotsInRing = 1; // center dot
        } else {
          approxDotsInRing = Math.max(3, Math.round(circumference / desiredSpacing));
        }

        for (let i = 0; i < approxDotsInRing; i++) {
          if (dotsPlaced >= rings * rings * 3) break; // safety limit to prevent infinite

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

    // Show/hide size selects based on shape
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

  shapeTypeSelect.addEventListener("change", updateGrid);
  gridSizeSelect.addEventListener("change", updateGrid);
  circleSizeSelect.addEventListener("change", updateGrid);
  resetBtn.addEventListener("click", updateGrid);

  // Initialize
  updateGrid();
});
