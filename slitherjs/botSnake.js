
/**
 * Bot extension of the core snake
 * @param  {Phaser.Game} game      game object
 * @param  {String} spriteKey Phaser sprite key
 * @param  {Number} x         coordinate
 * @param  {Number} y         coordinate
 */
BotSnake = function(game, spriteKey, x, y) {
    Snake.call(this, game, spriteKey, x, y);
    this.trend = 1;
}

BotSnake.prototype = Object.create(Snake.prototype);
BotSnake.prototype.constructor = BotSnake;

/**
  * Thêm chức năng vào phương pháp cập nhật con rắn ban đầu để con rắn bot này
  * có thể biến ngẫu nhiên
  */
BotSnake.prototype.tempUpdate = BotSnake.prototype.update;
BotSnake.prototype.update = function() {
    this.head.body.setZeroRotation();

    // đảm bảo rằng bot tiếp tục quay theo một hướng cho một
    // lượng thời gian đáng kể trước khi chuyển hướng
    if (Util.randomInt(1,20) == 1) {
        this.trend *= -1;
    }
    this.head.body.rotateRight(this.trend * this.rotationSpeed);
    this.tempUpdate();
}
