const fp = require("fingerpose");

const Num5Gesture = new fp.GestureDescription('num_5');

for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    Num5Gesture.addCurl(finger, fp.FingerCurl.NoCurl);
}

module.exports = Num5Gesture;