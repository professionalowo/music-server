const players = [...document.querySelectorAll('audio')];

const vol = Number(getCookie("volume")) || 1;
console.log(`Set volume to ${vol}`)

if (vol) {
    for (let player of players) {
        player.volume = vol;
    }
}

for (let player of players) {
    player.onvolumechange = () => {
        document.cookie = `volume=${player.volume}`
        players.forEach(p => p.volume = player.volume)
    }
    player.onended = () => {
        if (player.loop) return;
        const next = players[players.indexOf(player) + 1 % players.length] || players[0];
        next.play();
    }
    const loopButton = player.parentElement.querySelector("button");
    player.loopButton = loopButton;
    loopButton.onclick = () => {
        const img = loopButton.querySelector("img")
        if (player.loop) {
            player.loop = false;
            img.src = "/static/img/repeat.svg"
        } else { 
            player.loop = true;
            img.src = "/static/img/repeat-1.svg"
        }
    }
}



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}