input.onButtonPressed(Button.A, function () {
    toggleOn()
    setOutPin()
    setScreen()
})
function setScreen () {
    if (lightOn) {
        basic.showIcon(IconNames.SmallSquare)
    } else {
        basic.clearScreen()
    }
}
function toggleOn () {
    if (!(isDoorOpen)) {
        lightOn = !(lightOn)
    }
}
function detektDoubleTap () {
    if (targetTime > input.runningTime()) {
        toggleOn()
    } else {
        targetTime = input.runningTime() + delay
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
input.onPinPressed(TouchPin.P1, function () {
    toggleOn()
    setOutPin()
    setScreen()
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
    if (lightOn) {
        pins.digitalWritePin(DigitalPin.P0, 1)
    } else {
        pins.digitalWritePin(DigitalPin.P0, 0)
    }
}
let targetTime = 0
let isDoorOpen = false
let lightOn = false
let delay = 0
pins.digitalWritePin(DigitalPin.P0, 0)
delay = 600
basic.forever(function () {
    if (isDoorOpen != !(input.pinIsPressed(TouchPin.P1))) {
        isDoorOpen = !(input.pinIsPressed(TouchPin.P1))
        lightOn = isDoorOpen
        setOutPin()
        setScreen()
    }
    basic.pause(500)
})
