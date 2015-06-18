// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = (Math.floor(Math.random() * 3) * 83) + 83;
    this.speed = (Math.random() * 10) * 10 + 30;

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 500) {
        var enemyPosition = allEnemies.indexOf(this);
        allEnemies.splice(enemyPosition, 1);
        createEnemies();

    }
    if (this.y === player.y && this.x + 70 > player.x && this.x < player.x + 70) {
        removeImg();
        var heartImage = document.createElement("img");
        heartImage.style.cssText = 'position:absolute;top:415px;left:50%';
        heartImage.setAttribute("src", "images/Heart.png");
        heartImage.classList.add('animated');
        heartImage.classList.add('bounceOutUp');
        document.querySelector('.header').appendChild(heartImage);
        setHighScore();
        resetScore();
        updateScore();
        updateGems();
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 415;
    this.speed = 100;
    this.score = 0;
    this.gem = 0;
    this.highScore = 0;
    this.highGems = 0;
};

Player.prototype.update = function(dt) {
    if (this.y == 0) {
        this.score += 1;
        removeImg();
        var scoreImage = document.createElement("img");
        scoreImage.style.cssText = 'position:absolute;top:55px;left:50%';
        scoreImage.setAttribute("src", "images/Star.png");
        scoreImage.classList.add('animated');
        scoreImage.classList.add('bounceOutUp');
        document.querySelector('.header').appendChild(scoreImage);
        updateScore(this.score);
    }
};


Player.prototype.handleInput = function(input) {
    switch (input) {
        case 'left':
            if (this.x > 0) {
                this.x += -50.5;
            }
            break;
        case 'up':
            if (this.y > 0) {
                this.y += -83;
            }
            break;
        case 'right':
            if (this.x < 404) {
                this.x += 50.5;
            }
            break;
        case 'down':
            if (this.y < 415) {
                this.y += 83;
            }
            break;
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];

function createEnemies() {
    allEnemies.push(new Enemy());
}

function createFirstEnemies() {
    var count = 1;
    while (count < 6) {
        createEnemies();
        count++;
    }
}

createFirstEnemies();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});



function updateScore() {
    var scoreDisplay = document.querySelectorAll('#current-score');
    player.x = 202;
    player.y = 415;
    scoreDisplay[0].innerHTML = player.score;
}

function setHighScore() {
    if (player.score > player.highScore) {
        player.highScore = player.score;
    }
    if (player.gem > player.highGems) {
        player.highGems = player.gem;
    }
    var lastScore = document.querySelectorAll('.high-score');
    lastScore[0].innerHTML = player.highScore;
    var lastGem = document.querySelectorAll('.high-gem');
    lastGem[0].innerHTML = player.highGems;
}

function resetScore() {
    player.score = 0;
    player.gem = 0;
}

function removeImg() {
    var img = document.querySelectorAll('.animated');
    if (img) {
        for (var i = 0; i < img.length; i++) {
            img[i].parentNode.removeChild(img[i]);
        }
    }

}


// BLUE GEMS our player must avoid
var BlueGem = function() {
    this.sprite = 'images/Gem-Blue.png';
    this.x = -101;
    this.y = (Math.floor(Math.random() * 3) * 83) + 83;
    this.speed = (Math.random() * 10) * 10 + 30;

};


BlueGem.prototype.update = function(dt) {

    this.x += this.speed * dt;
    if (this.x > 500) {
        allGems.pop();
        createBlueGem();
    }
    if (this.y === player.y && this.x + 70 > player.x && this.x < player.x + 70) {
        player.gem += 1;
        this.x = 500;
        updateGems();
    }

};

// Draw the Blue Gemon the screen, required method for game
BlueGem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


function updateGems() {
    var gemDisplay = document.querySelectorAll('#current-gems');
    gemDisplay[0].innerHTML = player.gem;
}

var allGems = [];

function createBlueGem() {
    allGems.push(new BlueGem());
}
createBlueGem();