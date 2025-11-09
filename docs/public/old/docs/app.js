document.addEventListener('DOMContentLoaded', function () {
  console.log("JavaScript is loaded");

 // Select elements
const mobileMenu = document.getElementById("mobile-menu");
const navbarMenu = document.querySelector(".navbar__menu");

// Toggle the 'active' class on click
mobileMenu.addEventListener("click", () => {
  navbarMenu.classList.toggle("active");
  mobileMenu.classList.toggle("is-active"); // For bar animations
});


  // Select all popup buttons
  const popupBtns = document.querySelectorAll(".proj__btn");
  console.log("Popup buttons selected:", popupBtns); // Check if buttons are being selected

  // Loop through each button and attach event listener
  popupBtns.forEach(button => {
    const popupId = button.getAttribute("data-popup");  // Get corresponding popup ID
    console.log("Popup ID for button:", popupId); // Check which popup ID is associated with the button

    const popup = document.getElementById(popupId);  // Find the popup by ID
    const closeBtn = popup ? popup.querySelector(".close") : null;  // Find the close button inside the popup

    // Ensure the popup and close button exist before adding listeners
    if (popup && closeBtn) {
      console.log("Popup element found:", popup);
      console.log("Close button found:", closeBtn);

      // Open popup when button is clicked
      button.addEventListener("click", function () {
        console.log("Popup button clicked!"); // Log when the button is clicked
        popup.style.display = "block"; // Open the popup
      });

      // Close popup when close button is clicked
      closeBtn.addEventListener("click", function () {
        console.log("Close button clicked!"); // Log when the close button is clicked
        popup.style.display = "none"; // Close the popup
      });

      // Close popup when clicking outside the popup
      window.addEventListener("click", function (event) {
        if (event.target === popup) {
          console.log("Click outside detected!"); // Log if the click is outside the popup
          popup.style.display = "none"; // Close the popup
        }
      });
    } else {
      console.log("Popup or close button not found for popup ID:", popupId); // Log if popup or close button isn't found
    }
  });
  const emailButton = document.getElementById("email-button");
  if (emailButton) {
    emailButton.addEventListener("click", function () {
      const email = "sebzafa@gmail.com";
      const subject = encodeURIComponent("We want to hire you! :D");
      const body = encodeURIComponent("$80 hour too!!");

      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
      window.open(gmailLink, "_blank");
    });
  } else {
    console.error("Email button not found!");
  }

  /* snek script */
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");
  
  if (window.location.pathname.endsWith("resume.html")) {
    document.addEventListener("keydown", function (event) {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(event.key)) {
        event.preventDefault();
      }
    });
  }
  
  let lastUpdateTime = 0; // Tracks the last time the game updated
  const updateInterval = 100; // Time (in milliseconds) between updates
  
  const GRID_SIZE = 16;
  const TILE_SIZE = canvas.width / GRID_SIZE;
  
  let snake = [{ x: 8, y: 8 }];
  let velocity = { x: 0, y: 0 };
  let collect = { x: 11, y: 3 };
  let snakeLength = 1;
  let started = false;
  
  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowRight":
        if (velocity.x === 0) velocity = { x: 1, y: 0 };
        break;
      case "ArrowLeft":
        if (velocity.x === 0) velocity = { x: -1, y: 0 };
        break;
      case "ArrowUp":
        if (velocity.y === 0) velocity = { x: 0, y: -1 };
        break;
      case "ArrowDown":
        if (velocity.y === 0) velocity = { x: 0, y: 1 };
        break;
      case " ":
        if (!started) started = true;
        break;
      case "r":
        resetGame();
        break;
    }
  });
  
  // Mobile controls
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  
  canvas.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  
    // Start the game on tap
    if (!started) {
      started = true;
    }
  });
  
  canvas.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX;
    touchEndY = e.changedTouches[0].clientY;
  
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
  
    // Determine swipe direction
    if (Math.abs(dx) > Math.abs(dy)) {
      // Horizontal swipe
      if (dx > 0 && velocity.x === 0) {
        velocity = { x: 1, y: 0 }; // Swipe right
      } else if (dx < 0 && velocity.x === 0) {
        velocity = { x: -1, y: 0 }; // Swipe left
      }
    } else {
      // Vertical swipe
      if (dy > 0 && velocity.y === 0) {
        velocity = { x: 0, y: 1 }; // Swipe down
      } else if (dy < 0 && velocity.y === 0) {
        velocity = { x: 0, y: -1 }; // Swipe up
      }
    }
  });
  
  function resetGame() {
    snake = [{ x: 8, y: 8 }];
    velocity = { x: 0, y: 0 };
    collect = { x: 11, y: 3 };
    snakeLength = 1;
    started = false;
  }
  
  function updateGame() {
    if (!started) return;
  
    // Move the snake
    const head = { x: snake[0].x + velocity.x, y: snake[0].y + velocity.y };
    head.x = (head.x + GRID_SIZE) % GRID_SIZE;
    head.y = (head.y + GRID_SIZE) % GRID_SIZE;
    snake.unshift(head);
  
    // Handle collecting
    if (head.x === collect.x && head.y === collect.y) {
      snakeLength++;
      collect = { x: Math.floor(Math.random() * GRID_SIZE), y: Math.floor(Math.random() * GRID_SIZE) };
    }
  
    // Trim the snake to its length
    while (snake.length > snakeLength) {
      snake.pop();
    }
  
    // Check for self-collision
    for (let i = 1; i < snake.length; i++) {
      if (snake[i].x === head.x && snake[i].y === head.y) {
        resetGame();
      }
    }
  }
  
  function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw the snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index % 2 === 0 ? "green" : "yellow";
      ctx.fillRect(segment.x * TILE_SIZE, segment.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    });
  
    // Draw the collectable
    ctx.fillStyle = "red";
    ctx.fillRect(collect.x * TILE_SIZE, collect.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  
    // Draw start message
    if (!started) {
      ctx.fillStyle = "white";
      ctx.font = "32px Helvetica";
      ctx.fillText("PRESS SPACE TO PLAY", canvas.width / 2 - 165, canvas.height / 2 + 100);
      ctx.fillText("USE ARROW KEYS", canvas.width / 2 - 150, canvas.height / 2 + 150);
    }
  
    // Draw score
    ctx.fillStyle = "white";
    ctx.font = "32px Arial";
    ctx.fillText(`Score: ${snakeLength}`, 15, 40);
  }
  
  function gameLoop(timestamp) {
    // Only update the game if enough time has passed
    if (timestamp - lastUpdateTime >= updateInterval) {
      lastUpdateTime = timestamp;
      updateGame();
    }
  
    drawGame(); // Draw the game every frame for smooth visuals
    requestAnimationFrame(gameLoop);
  }
  
  resetGame();
  gameLoop();
});  