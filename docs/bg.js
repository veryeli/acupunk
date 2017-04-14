'use strict';

var FG = [123, 123, 123];
var BG = [255, 255, 255];
var SMOOTHNESS = 500;
var R = 1;
var AGE_RANGE = [30, 100];
var NUM_AGENTS = 12000;
var LINE_WIDTH = 1;

var _Math = Math;
var cos = _Math.cos;
var PI = _Math.PI;
var sin = _Math.sin;

var canvas = document.createElement('canvas');
var W = undefined,
    H = undefined;
canvas.style.background = 'rgb(' + BG + ')';
document.body.appendChild(canvas);

var ctx = canvas.getContext('2d');

function init() {
    W = canvas.width = window.innerWidth * 2;
    H = canvas.height = window.innerHeight * 2;

    ctx.lineWidth = LINE_WIDTH;
    ctx.fillStyle = 'rgb(' + BG + ')';

    draw();
}

function draw() {
    var simplex = new SimplexNoise();
    ctx.fillRect(0, 0, W, H);

    var n = NUM_AGENTS + 1;
    while (--n) {if (window.CP.shouldStopExecution(2)){break;}
        var maxAge = Math.max(0, Math.floor(Math.random() * (AGE_RANGE[1] - AGE_RANGE[0]) + AGE_RANGE[0]));

        var x = Math.random() * W;
        var y = Math.random() * H;
        var age = maxAge;
        while (x > 0 && y > 0 && x < W && y < H && --age) {if (window.CP.shouldStopExecution(1)){break;}
            var theta = simplex.noise2D(x / SMOOTHNESS, y / SMOOTHNESS) * PI;
            var opacity = 1 - Math.abs(age / maxAge - 1 / 2) * 2;
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(' + FG + ', ' + opacity + ')';
            ctx.moveTo(x, y);
            x += R * cos(theta);
            y += R * sin(theta);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
window.CP.exitedLoop(1);

    }
window.CP.exitedLoop(2);

}

init();
document.body.addEventListener('click', draw, false);

var debounce = undefined;
window.addEventListener('resize', function () {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(init, 200);
});
