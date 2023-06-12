
const tf = require("@tensorflow/tfjs");
const handpose = require("@tensorflow-models/handpose");
const { drawHand } = require("./utils");
const fp = require("fingerpose");
const Num1Gesture = require("./gestures/1.js");
const Num2Gesture = require("./gestures/2.js");
const Num3Gesture = require("./gestures/3.js");
const Num4Gesture = require("./gestures/4.js");
const Num5Gesture = require("./gestures/5.js");
const Num0Gesture = require("./gestures/0.js");

// 创建一个空的手势数组
const gestures = [
  Num1Gesture,
  Num2Gesture,
  Num3Gesture,
  Num4Gesture,
  Num5Gesture,
  Num0Gesture,
];

// 创建一个手势识别器
const GE = new fp.GestureEstimator(gestures);

// 创建一个虚拟的 hand[0].landmarks，用于测试
const fakeLandmarks = Array(21).fill().map((_, i) => ({ x: i, y: i, z: i }));

// 进行手势识别
const recognizeGesture = async () => {
  const gesture = await GE.estimate(fakeLandmarks, 8);
  const maxConfidenceGesture = gesture.gestures[0].name;
  console.log(maxConfidenceGesture);
};

// 运行手势识别函数
recognizeGesture();