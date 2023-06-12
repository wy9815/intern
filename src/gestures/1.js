const fp = require("fingerpose");

const Num1Gesture = new fp.GestureDescription('num_1');

Num1Gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);

for (let finger of [fp.Finger.Thumb, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    Num1Gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

module.exports = Num1Gesture;