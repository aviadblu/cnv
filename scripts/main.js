/**
 * Created by AvB on 02/07/2015.
 */
var canvas = document.getElementById("canvas");
var drawingSurface = canvas.getContext("2d");
var backgroundCanvas = document.getElementById("background-canvas");
var backgroundDrawingSurface = backgroundCanvas.getContext("2d");
var drawingSurfaceWidth = canvas.width;
var drawingSurfaceHeight = canvas.height;

var _background = document.createElement("img");

_background.addEventListener("load", function() {
    backgroundDrawingSurface.drawImage(_background, 0, 0, drawingSurfaceWidth, drawingSurfaceHeight);
}, false);

//_background.src = "images/bg.jpg";


var Bubble = {
    position: {
        x: 220,
        y: 10
    },
    size: {
        w: 50,
        h: 50
    },
    velocity: {
        x: 0,
        y: 0
    },
    src: "images/bubble.png",
    is_loaded: false
};


var draw = function() {

    drawingSurface.clearRect(0, 0, drawingSurfaceWidth, drawingSurfaceHeight);

    var _bubble = document.createElement("img");
    _bubble.src = Bubble.src;


    if(!Bubble.is_loaded) {
        _bubble.addEventListener("load", function() {
            drawingSurface.drawImage(_bubble, Bubble.position.x, Bubble.position.y, Bubble.size.w, Bubble.size.h);
            Bubble.is_loaded = true;
        }, false);
    }
    else {
        drawingSurface.drawImage(_bubble, Bubble.position.x, Bubble.position.y, Bubble.size.w, Bubble.size.h);
    }


};


var getRes = function(v_0, t) {
    var g = 9.8;
    return {
        v: v_0 + (g * t),
        h: Math.floor((v_0 * t) + (0.5 * g * Math.pow(t,2)))
    };
};

var getV = function() {

};

var action = function() {
    frame_c++;

    var t = frame_c / 30;
    var res = getRes(Bubble.velocity.y, t);
    Bubble.position.y = Bubble.position.y + res.h;
    Bubble.velocity.y = res.v;


    if(frame_c % 30 === 0) {
        sec_c++;
    }

    if(Bubble.position.y <= 0) {
        Bubble.position.y = 0;
    }
    console.log(drawingSurfaceHeight);
    if(Bubble.position.y >= drawingSurfaceHeight - Bubble.size.h) {
        Bubble.position.y = drawingSurfaceHeight - Bubble.size.h;
        console.log("fall from " + (drawingSurfaceHeight - 100) + " [m]");
        console.log("heat in " + Bubble.velocity.y + " [m/s]");
        console.log("after " + t + " [sec]");
        clearInterval(interval);
    }

    draw();
};

var frameRate = 1000 / 30;
var interval;
var sec_c;
var frame_c;

var loop = function() {
    var _loop_ms = 1000 / frameRate;
    sec_c = 0;
    frame_c = 0;
    interval = setInterval(action,_loop_ms);
};


loop();



