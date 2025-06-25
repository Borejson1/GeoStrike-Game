window.playSound = function (id, volume) {
    const audio = document.getElementById(id);
    if (audio) {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play();
    }
}