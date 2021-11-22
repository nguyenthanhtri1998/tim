Game = function(game) {}

Game.prototype = {
    preload: function() {

        //load asset
        this.game.load.image('circle','asset/circle.png');
        this.game.load.image('circle1','asset/circle1.png');
        this.game.load.image('circle2','asset/circle2.png');
        this.game.load.image('circle3','asset/circle3.png');
        this.game.load.image('circle4','asset/circle4.png');
        this.game.load.image('circle5','asset/circle5.png');
    	this.game.load.image('shadow', 'asset/white-shadow.png');
    	this.game.load.image('background', 'asset/tile.png');

    	this.game.load.image('eye-white', 'asset/eye-white.png');
    	this.game.load.image('eye-black', 'asset/eye-black.png');

        this.game.load.image('food', 'asset/hex.png');
    },
    create: function() {
        var width = this.game.width;
        var height = this.game.height;

        this.game.world.setBounds(-width, -height, width*3, height*3);
    	this.game.stage.backgroundColor = '#444';

        // thêm nền gạch 
        var background = this.game.add.tileSprite(-width, -height,
            this.game.world.width, this.game.world.height, 'background');

        //initialize physics and groups
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.foodGroup = this.game.add.group();
        this.snakeHeadCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.foodCollisionGroup = this.game.physics.p2.createCollisionGroup();

        //add food randomly
        for (var i = 0 ; i < 300 ; i++) {
            this.initFood(Util.randomInt(-width, width*3), Util.randomInt(-height, height*3));
        }

        this.game.snakes = [];

        //create player
        var snake = new PlayerSnake(this.game, 'circle', 0, 0);
        this.game.camera.follow(snake.head);

        //create bots
        new BotSnake(this.game, 'circle2', -400, 100);
        new BotSnake(this.game, 'circle1', 200, 200);
        new BotSnake(this.game, 'circle3', -500, 0);       
        new BotSnake(this.game, 'circle4', -900, 0);
        new BotSnake(this.game, 'circle5', 100, 0);
        new BotSnake(this.game, 'circle5', 1000, 0);
        new BotSnake(this.game, 'circle4', 1200, 100);
        new BotSnake(this.game, 'circle3', 600, 100);
        new BotSnake(this.game, 'circle2', 800, 100);
        setTimeout(() => {new BotSnake(this.game, 'circle2', -600, 0);new BotSnake(this.game, 'circle', 800, 0);new BotSnake(this.game, 'circle1', 200, 0);new BotSnake(this.game, 'circle1', 0, 0);}, 4000);
        setTimeout(() => {new BotSnake(this.game, 'circle4', 1000, 0);new BotSnake(this.game, 'circle4', -1000, 0);}, 9000);
        setTimeout(() => {new BotSnake(this.game, 'circle2', 1100, 0);new BotSnake(this.game, 'circle3', -1100, 0);}, 15000);
        setTimeout(() => {new BotSnake(this.game, 'circle2', -600, 0);new BotSnake(this.game, 'circle', 800, 0);new BotSnake(this.game, 'circle1', 200, 0);new BotSnake(this.game, 'circle1', 0, 0);}, 20000);
        setTimeout(() => {new BotSnake(this.game, 'circle2', 200, 0);new BotSnake(this.game, 'circle3', -400, 0);}, 25000);
        setTimeout(() => {new BotSnake(this.game, 'circle2', -600, 0);new BotSnake(this.game, 'circle', 800, 0);new BotSnake(this.game, 'circle1', 200, 0);new BotSnake(this.game, 'circle1', 0, 0);}, 30000);
        setTimeout(() => {new BotSnake(this.game, 'circle4', 6000, 0);new BotSnake(this.game, 'circle4', -1000, 0);}, 35000);
        setTimeout(() => {new BotSnake(this.game, 'circle1', -1600, 010);new BotSnake(this.game, 'circle2', 1800, 1000);new BotSnake(this.game, 'circle5', 1200, 0);new BotSnake(this.game, 'circle1', 0, 0);}, 40000);
          

        // khởi tạo nhóm rắn và va chạm
        for (var i = 0 ; i < this.game.snakes.length ; i++) {
            var snake = this.game.snakes[i];
            snake.head.body.setCollisionGroup(this.snakeHeadCollisionGroup);
            snake.head.body.collides([this.foodCollisionGroup]);
            //callback for when a snake is destroyed
            snake.addDestroyedCallback(this.snakeDestroyed, this);
        }
    },
    /**
     * Main update loop
     */
    update: function() {
        // cập nhật các thành phần trò chơi
        for (var i = this.game.snakes.length - 1 ; i >= 0 ; i--) {
            this.game.snakes[i].update();
        }
        for (var i = this.foodGroup.children.length - 1 ; i >= 0 ; i--) {
            var f = this.foodGroup.children[i];
            f.food.update();
        }
    },
    /**
     * Tạo một miếng thức ăn tại một điểm
     * @param  {number} x x-coordinate
     * @param  {number} y y-coordinate
     * @return {Food}   food object created
     */
    initFood: function(x, y) {
        var f = new Food(this.game, x, y);
        f.sprite.body.setCollisionGroup(this.foodCollisionGroup);
        this.foodGroup.add(f.sprite);
        f.sprite.body.collides([this.snakeHeadCollisionGroup]);
        return f;
    },
    snakeDestroyed: function(snake) {
        // đặt thức ăn nơi con rắn bị tiêu diệt
        for (var i = 0 ; i < snake.headPath.length ;
        i += Math.round(snake.headPath.length / snake.snakeLength) * 2) {
            this.initFood(
                snake.headPath[i].x + Util.randomInt(-10,10),
                snake.headPath[i].y + Util.randomInt(-10,10)
            );
        }
    }
};
let dom_replay = document.querySelector("#replay");
function initialize() {
    CTX.imageSmoothingEnabled = false;
    KEY.listen();
    var snake = new PlayerSnake(this.game, 'circle', 0, 0);
    this.game.camera.follow(snake.head);
    dom_replay.addEventListener("click", reset, false);
    loop();
  }

  