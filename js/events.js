PlayState.onHeroVsSpider = function(hero, spider) {
    this.sfx.stomp.play();

    if (spider.body.touching.up) {
        var spiderPosition = spider.position;

        hero.bounce();
        spider.die();

        this.enemyKillCount++;

        var newCoin = { "x": spiderPosition.x+30, "y": spiderPosition.y };
        this.spawnCoin(newCoin);
        this.sfx.coin.play();
        
    } else if (!this.hero.isDying) {
        this.hero.isDying = true;
        this.hero.body.enable = false;
        this.game.input.enabled = false;
        this.hero.die(function() {
            PlayState.fadeCamera(false, function() {
                PlayState.game.state.restart(true, false, {
                    level: 0,
                });
            });
        });
    }
};

PlayState.onHeroVsCoin = function(hero, coin) {
    this.sfx.coin.play();
    this.coinCount++;
    this.coinFont.text = 'x' + this.coinCount;
    coin.kill();
};

PlayState.onHeroVsDoor = function(hero, door) {
    if (this.coinCount == this.coinCountWin) {
        if (!this.heroMovingToDoor) {
            this.heroMovingToDoor = true;
            this.game.input.enabled = false;
            this.sfx.door.play();
            this.door.animations.play('open');
        }
    }
};

PlayState.onHeroVsKey = function(hero, key) {
    this.heroHasKey = true;
    this.sfx.key.play();
    this.keyIcon.frame = 1;
    key.kill();

    var keyCoins = this.game.cache.getJSON(`level:${PlayState.level}`).keyCoins;
    keyCoins.forEach(this.spawnCoin, this);
};

PlayState.onHeroInDoor = function() {
    this.hero.animations.play('blink').onComplete.addOnce(function() {
        var tracker = 0;
        var limit = 20;
        var intervalId = window.setInterval(function() {
            var xAxis = Math.floor(Math.random() * Math.floor(940))
            var newHeart = { "x": xAxis, "y": 0 };
            PlayState.spawnHeart(newHeart);
            tracker++;
            if (tracker > limit) {
                clearInterval(intervalId);
            };
          }, 300);
    }, this);
};
