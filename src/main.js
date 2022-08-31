window.addEventListener('load', () => {
  const canvas = document.getElementById('mainScreen');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.fillStyle = '#FFFFFF';

  const player = {
    x: canvas.width / 2,
    y: canvas.height / 2.5,
    w: 25,
    h: 25,
    hp: 10,
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
    drawHp() {
      ctx.fillStyle = '#FFFFFF99';
      ctx.fillText(this.hp, this.x - 3, this.y - this.h / 2);
    },
    moveTo(newX, newY) {
      this.x = newX;
      this.y = newY;
    },
  }
  const controls = {
    keys: [],
    x: player.getX(),
    y: player.getY(),
    velX: 0,
    velY: 4,
    maxspeed: 4,
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

     controls.velY = controls.velY * 0.93;
     controls.velX = controls.velX * 0.93;

     controls.x = controls.x + controls.velX;
     controls.y = controls.y + controls.velY;

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

  const ui = () => {
      ctx.font = '15px "Press Start 2P"';
      ctx.fillText('Рабочее название: "Квадрат"', 30, 40);
      ctx.fillText('Стата:', window.innerWidth - 100, 40);
      ctx.fillText(`EXP: 1/10`, window.innerWidth - 150, 70);

      ctx.fillText(`X: ${player.x.toFixed(2)} | Y: ${player.y.toFixed(2)}`, 30, 70);
  }

  const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.drawHp();
    player.draw();
    updateControls();
    console.log(controls.keys['ArrowUp']);
  }

  const gameCycle = setInterval(() => {
    update();
    ui();
  }, 15);

  gameCycle();
})