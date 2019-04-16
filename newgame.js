class NewGame extends Phaser.Scene {
  constructor() {
    super({key:"NewGame"});
    this.a;
    this.b;
    this.SPEED = 500;
    this.ROTATION_SPEED = 2 * Math.PI / 4;
    this.ROTATION_SPEED_DEGREES = Phaser.Math.RadToDeg(this.ROTATION_SPEED*8);
    this.TOLERANCE = 0.01 * this.ROTATION_SPEED;
    this.velocityFromRotation = Phaser.Physics.Arcade.ArcadePhysics.prototype.velocityFromRotation;
    this.sin = Math.sin;
    this.cos = Math.cos;
    this.atan2 = Math.atan2;
    this.player;
    this.stars;
    this.fort;
    this.starCounter = 0;
    this.score = 0;
    this.scoreText;
  }

  preload() {
    this.load.image('star', 'assets/star.png');
    this.load.image('fort', 'assets/fort.png');
    this.load.image('dude', 'assets/ludek.png');
    this.load.image('background', 'assets/background.png');
  }

  create() {

    this.add.image((window.innerWidth/2), (window.innerHeight/2), 'background');
    this.scoreText = this.add.text(16, 16, 'Punkty: 0', { fontSize: '32px', fill: '#000', fontFamily: 'Comic Sans MS' });
    this.player = this.physics.add.sprite(100, 450, 'dude')
            .setVelocity(this.SPEED, 0);

    this.player.setCollideWorldBounds(true);

    this.stars = this.physics.add.group();
    this.stars.create(50, 50, 'star');
    Phaser.Actions.Call(this.stars.getChildren(), function(go) {
      this.moveTofort(go)
    }, this)﻿

    var fort = this.physics.add.staticGroup();
    fort.create((window.innerWidth/2), (window.innerHeight/2), 'fort').refreshBody();


    this.physics.add.overlap(this.player, this.stars, this.destroyStar, null, this);
    this.physics.add.overlap(this.stars, fort, this.loosing, null, this);
    this.physics.add.collider(this.player, fort);
  }

  update() {
    this.pointerMove(this.input.activePointer);
    this.velocityFromRotation(this.player.rotation, this.SPEED, this.player.body.velocity);
  }

  moveTofort(el) {
    game.scene.scenes[0].physics.moveTo(el, (window.innerWidth/2), (window.innerHeight/2), 100);
  }

  getStarInfo() {
    var percent = Math.floor(Math.random()*100);
    if (percent < 25) {
      this.a = 0;
      this.b = Math.floor(Math.random()*window.innerHeight);
    } else if (percent > 25 && percent < 50) {
      this.a = window.innerWidth;
      this.b = Math.floor(Math.random()*window.innerHeight);
    } else if (percent > 50 && percent < 75) {
      this.a = Math.floor(Math.random()*window.innerWidth);
      this.b = window.innerHeight;
    } else {
      this.a = Math.floor(Math.random()*window.innerWidth);
      this.b = 0;
    }

  }

  pointerMove (pointer) {
    var angleToPointer = Phaser.Math.Angle.BetweenPoints(this.player, pointer);
    var angleDelta = angleToPointer - this.player.rotation;

    angleDelta = this.atan2(this.sin(angleDelta), this.cos(angleDelta));

    if(Math.abs(this.player.x - pointer.worldX) <= 30 && Math.abs(this.player.y - pointer.worldY) <= 30) {
      this.SPEED = 0;
      this.player.setAngularVelocity(0);
    } else {
      this.SPEED = 500;
      if (Phaser.Math.Within(angleDelta, 0, this.TOLERANCE)) {
        this.player.rotation = angleToPointer;
        this.player.setAngularVelocity(0);
      } else {
        this.player.setAngularVelocity(Math.sign(angleDelta) * this.ROTATION_SPEED_DEGREES);
      }
    }
  }
  destroyStar (player, star) {
      star.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Punkty: ' + this.score);

      if (this.stars.countActive(true) === 0)
      {

        this.starCounter ++;
        for (var i = 0; this.starCounter > i; i++) {
          this.getStarInfo();
          var newStar = this.stars.create(this.a, this.b, 'star');
          this.moveTofort(newStar);
        }
      }
  }
  loosing() {
    this.scene.start('Lost');
    this.starCounter = 0;
    myPoints = this.score;
    this.score = 0;
  }
}
