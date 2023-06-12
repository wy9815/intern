const fp = require("fingerpose");

const Num0Gesture = new fp.GestureDescription('num_0');

for (let finger of [fp.Finger.Thumb, fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    Num0Gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

module.exports = Num0Gesture;