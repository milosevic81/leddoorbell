input.onButtonPressed(Button.A, function () {
    toggleOn()
    setOutPin()
    setScreen()
})
function setScreen () {
    if (on) {
        basic.showIcon(IconNames.SmallSquare)
    } else {
        basic.clearScreen()
    }
}
function toggleOn () {
    on = !(on)
}
function detektDoubleTap () {
    if (target > input.runningTime()) {
        toggleOn()
    } else {
        target = input.runningTime() + delay
    }
}
input.onSound(DetectedSound.Loud, function () {
    detektDoubleTap()
    setOutPin()
    setScreen()
})
input.onButtonPressed(Button.B, function () {
    ringBell()
})
function ringBell () {
    basic.showIcon(IconNames.Diamond)
    for (let index = 0; index < 3; index++) {
        music.playTone(659, music.beat(BeatFraction.Half))
        music.playTone(523, music.beat(BeatFraction.Half))
    }
    setScreen()
}
function setOutPin () {
    if (on) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
let target = 0
let on = false
let delay = 0
pins.digitalWritePin(DigitalPin.P0, 0)
delay = 600
