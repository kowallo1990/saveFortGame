class Lost extends Phaser.Scene {
  constructor() {
    super({key:"Lost"});
  }

  preload() {
    this.load.image('background', 'assets/background.png');
    this.load.image('gameOver', 'assets/gameOver.png');
    this.load.image('playAgain', 'assets/playAgain.png');
  }

  create() {
    this.add.image((window.innerWidth/2), (window.innerHeight/2), 'background');
    this.add.text((window.innerWidth*0.45), (window.innerHeight*0.1), 'Punkty: ' + myPoints, { fontSize: '32px', fill: '#000', fontFamily: 'Comic Sans MS' });
    this.add.image((window.innerWidth/2), (window.innerHeight*0.3), 'gameOver');
    var playAgain = this.add.image((window.innerWidth/2), (window.innerHeight*0.7), 'playAgain');
    playAgain.setInteractive().on('pointerdown', function(event) {
        this.scene.start('NewGame');
    }, this)
  }
}
