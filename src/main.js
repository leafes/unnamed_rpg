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
      ctx.fillStyle = '#FFFFFF20';
      ctx.fillRect(this.x, this.y, this.h, this.w);
    },
    moveTo(newX, newY) {
      this.x = newX;
      this.y = newY;
    },
  }
  const controls = {
    keys: [],
    velX: 0,
    velY: 0,
    maxspeed: 1000
  }
  document.body.addEventListener("keydown", (key) => { controls.keys[key.code] = true });
  document.body.addEventListener("keyup", (key) => { controls.keys[key.code] = false });
  const updateControls = () => {
     if (controls.keys['ArrowUp']) {
      controls.velY -= 1
      console.log(controls.velY)
     }
     if (controls.keys['ArrowDown']) {
      controls.velY += 1
     }
     if (controls.keys['ArrowRight']) {
      controls.velX += 1
     }
     if (controls.keys['ArrowLeft']) {
      controls.velX -= 1
     }

     player.moveTo(player.getX() + controls.velX * 0.17, player.getY() + controls.velY * 0.17);

    //  setTimeout(updateControls, 50);
  }


  const update = () => {
    updateControls();
    player.draw();
    console.log(controls.keys['ArrowUp']);
  }

  setInterval(() => update(), 20)
})