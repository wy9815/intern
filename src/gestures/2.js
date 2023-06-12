const fp = require("fingerpose");

const Num2Gesture = new fp.GestureDescription('num_2');

Num2Gesture.addCurl(fp.Finger.Index, fp.FingerCurl.NoCurl);
Num2Gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
//Num1Gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Thumb, fp.Finger.Ring, fp.Finger.Pinky]) {
    Num2Gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

module.exports = Num2Gesture;