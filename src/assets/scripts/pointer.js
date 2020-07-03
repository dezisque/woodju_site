var $ = document.querySelector.bind(document);
var $on = document.addEventListener.bind(document);

var xmouse, ymouse;

$on('mousemove', function (e) {
    xmouse = e.clientX || e.pageX;
    ymouse = e.clientY || e.pageY;
});

var ball = document.getElementById('pointer__circle');
var x = void 0,
    y = void 0,
    dx = void 0,
    dy = void 0,
    key = -1;
var yscroll = 0;
window.onscroll = function (e) {yscroll = window.scrollY; };


var followMouse = function followMouse() {
    key = requestAnimationFrame(followMouse);

    if(!x || !y) {
        x = xmouse;
        y = ymouse;
    } else {
        dx = (xmouse - x) * 0.3;
        dy = (ymouse - y) * 0.3;
        if(Math.abs(dx) + Math.abs(dy) < 0.1) {
            x = xmouse;
            y = ymouse;
        } else {
            x += dx;
            y += dy;
        }
    }
    ball.style.left = x + 'px';
    ball.style.top = (y + yscroll) + 'px';
}
followMouse()
/**
 * Created by wimeg on 29.11.2019.
 */
