window.addEventListener('load', () => {
  const canvas = document.getElementById('mainScreen');
  const ctx = canvas.getContext('2d');
  canvas.width = 800;
  canvas.height = 640;

  const player = {
    x: 10,
    y: 10,
    w: 25,
    h: 25,
    speed: 2,
    getX() {
      return this.x;
    },
    getY() {
      return this.y;
    },
    draw() {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(this.x, this.y, this.h, this.w);
    },
    moveTo(newX, newY) {
      this.x = newX;
      this.y = newY;
    },
  }
  const controls = {
    keys: [],
    x: 10,
    y: 10,
    velX: 0,
    velY: 0,
    maxspeed: 30,
  }
  document.body.addEventListener("keydown", (key) => { controls.keys[key.code] = true });
  document.body.addEventListener("keyup", (key) => { controls.keys[key.code] = false });
  const updateControls = () => {
    const maxspeed = controls.maxspeed;
     if (controls.keys['ArrowUp']) {
      if (controls.velY > -maxspeed) controls.velY -= 1;
     }
     if (controls.keys['ArrowDown']) {
      if (controls.velY < maxspeed) controls.velY += 1;
     }
     if (controls.keys['ArrowRight']) {
      if (controls.velX < maxspeed) controls.velX += 1;
     }
     if (controls.keys['ArrowLeft']) {
      if (controls.velX > -maxspeed) controls.velX -= 1;
     }

     controls.x = player.getX() + controls.velX * 0.1;
     controls.y = player.getY() + controls.velY * 0.1;

     if (controls.x + player.w > canvas.width) {
      controls.x = canvas.width - player.w;
      controls.velX = -1;
     }
     if (controls.x <= 0) {
      controls.x = 0;
      controls.velX = 1;
     }
     if (controls.y <= 0) {
      controls.y = 0;
      controls.velY = 1;
     }
     if (controls.y + player.h > canvas.height) {
      controls.y = canvas.height - player.h;
      controls.velY = -1;
     }

     player.moveTo(controls.x, controls.y);
  }


  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    updateControls();
    player.draw();
    console.log(controls.keys['ArrowUp']);
  }

  setInterval(() => update(), 10)
})