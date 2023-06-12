const fp = require("fingerpose");

const Num4Gesture = new fp.GestureDescription('num_4');

Num4Gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.FullCurl, 1.0);
Num4Gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
Num4Gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
//Num1Gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Index, fp.Finger.Middle, fp.Finger.Ring, fp.Finger.Pinky]) {
    Num4Gesture.addCurl(finger, fp.FingerCurl.NoCurl);
}

module.exports = Num4Gesture;