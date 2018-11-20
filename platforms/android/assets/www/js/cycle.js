var start = null;

function cycleAnimation(timestamp) {

    var progress;

    if (start === null) start = timestamp;

    progress = timestamp - start;

    if (progress > 120) {
        oGame.animation();
        start = null;
    }

    window.requestAnimationFrame(cycleAnimation);
}

function cycle() {
    oGame.cycle();

    setTimeout(cycle, 1000);
}