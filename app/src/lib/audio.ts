import Pizzicato = require("pizzicato");

export function playHorn(): void {
    const sound = new Pizzicato.Sound({ source: "wave", options: { release: 3 } });
    sound.play();
    setTimeout(() => sound.stop(), 500);
}
