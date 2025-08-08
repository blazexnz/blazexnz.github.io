document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gridContainer");
  const gridSizeSelect = document.getElementById("gridSize");
  const shapeTypeSelect = document.getElementById("shapeType");
  const resetBtn = document.getElementById("resetBtn");
  const circleSizeSelect = document.getElementById("circleSize");
  const gridSizeLabel = document.getElementById("gridSizeLabel");
  const circleSizeLabel = document.getElementById("circleSizeLabel");
  const colorPicker = document.getElementById("colorPicker");

  // Position buttons
  const posTopBtn = document.getElementById("posTop");
  const posMiddleBtn = document.getElementById("posMiddle");
  const posBottomBtn = document.getElementById("posBottom");

  // Dot size in px (fixed)
  const DOT_SIZE = 25;

  // Current selected color for toggling dots
  let currentColor = colorPicker.value;

  // Undo/redo stacks: each entry = {index: dotIndex, prevColor: string|null, newColor: string|null}
  // prevColor or newColor can be null (means no color)
  let undoStack = [];
  let redoStack = [];

  // To keep track of dots for undo/redo by index
  let dots = [];

  // Create grid and assign dots array
  function createGrid(size, shape) {
    gridContainer.innerHTML = "";
    dots = [];

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

        // Store dot index for event handler
        dot.dataset.index = i;

        dot.addEventListener("click", () => {
          toggleDotColor(i);
        });

        gridContainer.appendChild(dot);
        dots.push(dot);
      }
    } else if (shape === "circle") {
      // Circle layout

      const minContainerSize = 200;
      const maxContainerSize = 600;
      const rings = size;

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
          dot.style.width = `${DOT_SIZE}px`;
          dot.style.height = `${DOT_SIZE}px`;
          dot.style.left = `${x - DOT_SIZE / 2}px`;
          dot.style.top = `${y - DOT_SIZE / 2}px`;

          const dotIndex = dotsPlaced; // capture current index for closure
          dot.dataset.index = dotIndex;

          dot.addEventListener("click", () => {
            toggleDotColor(dotIndex);
          });

          gridContainer.appendChild(dot);
          dots.push(dot);
          dotsPlaced++;
        }
      }
    }
  }

  // Set a dot color, or clear color if null
  function setDotColor(dot, color) {
    if (color) {
      dot.style.backgroundColor = color;
    } else {
      dot.style.backgroundColor = "white";
    }
  }

  // Get current dot color or null if white/no color
  function getDotColor(dot) {
    const bg = dot.style.backgroundColor;
    // If default white or empty string, treat as no color
    if (!bg || bg === "white" || bg === "rgb(255, 255, 255)") {
      return null;
    }
    return bg;
  }

  // Toggle dot color on click: use currentColor if no color, clear if colored
  // Records action in undoStack, clears redoStack
  function toggleDotColor(index) {
    const dot = dots[index];
    const prevColor = getDotColor(dot);
    const newColor = prevColor === null ? currentColor : null;

    // Apply new color
    setDotColor(dot, newColor);

    // Push action to undo stack
    undoStack.push({ index, prevColor, newColor });

    // Clear redo stack because new action
    redoStack = [];
  }

  // Undo last action
  function undo() {
    if (undoStack.length === 0) return;

    const lastAction = undoStack.pop();
    const { index, prevColor, newColor } = lastAction;

    // Revert dot to prevColor
    setDotColor(dots[index], prevColor);

    // Push to redo stack the inverse action
    redoStack.push({ index, prevColor: newColor, newColor: prevColor });
  }

  // Redo last undone action
  function redo() {
    if (redoStack.length === 0) return;

    const action = redoStack.pop();
    const { index, prevColor, newColor } = action;

    // Apply newColor again
    setDotColor(dots[index], newColor);

    // Push back to undo stack
    undoStack.push({ index, prevColor, newColor });
  }

  function updateGrid() {
    const shape = shapeTypeSelect.value;

    // Clear history stacks on reset/change grid
    undoStack = [];
    redoStack = [];

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

  // Support both click and touch for mobile fix
  function addPointerListener(button, position) {
    button.addEventListener("click", () => setPosition(position));
    button.addEventListener("touchstart", (e) => {
      e.preventDefault();
      setPosition(position);
    }, {passive: false});
  }

  addPointerListener(posTopBtn, "top");
  addPointerListener(posMiddleBtn, "middle");
  addPointerListener(posBottomBtn, "bottom");

  shapeTypeSelect.addEventListener("change", updateGrid);
  gridSizeSelect.addEventListener("change", updateGrid);
  circleSizeSelect.addEventListener("change", updateGrid);
  resetBtn.addEventListener("click", updateGrid);

  // Update currentColor on picker change
  colorPicker.addEventListener("input", (e) => {
    currentColor = e.target.value;
  });

  // Keyboard shortcuts for Undo and Redo: Ctrl+Z and Ctrl+Y
  document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === "z") {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === "y" || (e.shiftKey && e.key.toLowerCase() === "z"))) {
      e.preventDefault();
      redo();
    }
  });

  // Initialize
  updateGrid();
  setPosition("bottom"); // default to bottom
});
