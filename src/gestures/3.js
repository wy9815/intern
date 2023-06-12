const fp = require("fingerpose");

const Num3Gesture = new fp.GestureDescription('num_3');

Num3Gesture.addCurl(fp.Finger.Pinky, fp.FingerCurl.NoCurl);
Num3Gesture.addCurl(fp.Finger.Ring, fp.FingerCurl.NoCurl);
Num3Gesture.addCurl(fp.Finger.Middle, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Index, fp.FingerDirection.VerticalUp, 1.0);
//Num1Gesture.addCurl(fp.Finger.Thumb, fp.FingerCurl.NoCurl);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpRight, 1.0);
// Num1Gesture.addDirection(fp.Finger.Thumb, fp.FingerDirection.DiagonalUpLeft, 1.0);

for (let finger of [fp.Finger.Thumb, fp.Finger.Index]) {
    Num3Gesture.addCurl(finger, fp.FingerCurl.FullCurl, 1.0);
}

module.exports = Num3Gesture;