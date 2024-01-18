const player = document.getElementById('player');
const loopButton = document.getElementById('loop');

const vol = Number(getCookie("volume")) || 1;
console.log(`Set volume to ${vol}`)

if (vol) {
    player.volume = vol;
}


player.onvolumechange = () => {
    document.cookie = `volume=${player.volume}`
}

loopButton.addEventListener("click", (e) => {
    player.loop = !player.loop;
    const img = loopButton.querySelector("img")
    if (player.loop)
        img.src = "/static/img/repeat-1.svg"
    else
        img.src = "/static/img/repeat.svg"
})


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