import Pizzicato = require("pizzicato");

export function playAlarm(volume: number = 1): void {
    const sound = new Pizzicato.Sound({ source: "wave", options: { release: 3 } });
    sound.volume = volume;
    sound.play();
    setTimeout(() => sound.stop(), 500);
}
