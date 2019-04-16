var config = {
    type: Phaser.CANVAS,
    width: window.innerWidth,
    height: window.innerHeight,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0,
                        x:0},
            debug: false
        }
    },
    scene: [Start, NewGame, Lost]
};

var game = new Phaser.Game(config);
