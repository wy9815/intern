import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import './App.css';
import { drawHand } from "./utils";
import * as fp from "fingerpose";
import Num1Gesture from "./gestures/1.js";
import Num2Gesture from "./gestures/2.js";
import Num3Gesture from "./gestures/3.js";
import Num4Gesture from "./gestures/4.js";
import Num5Gesture from "./gestures/5.js";
import Num0Gesture from "./gestures/0.js";


function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const [output, setOutput] = useState(null);
  const label = {
    num_1: 1,
    num_2: 2,
    num_3: 3,
    num_4: 4,
    num_5: 5,
    num_0: 0
  };

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      setInterval(() => {
        detect(net);
      }, 100);
    };

  //const runHandpose = async () => {
    //const net = await handpose.load();
    //console.log("handpose model loaded");
    // loop and detect hand
    //setInterval(() => {
      //detect(net)
    //}, 100);

  //})
  const detect = async (net) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current != null && webcamRef.current.video.readyState === 4) {
      // get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // set video width and height
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;
      // set canvas width and height
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      // make detection
      const hand = await net.estimateHands(video);

      if (hand.length > 0) {
        const GE = new fp.GestureEstimator([
          Num1Gesture,
          Num2Gesture,
          Num3Gesture,
          Num4Gesture,
          Num5Gesture,
          Num0Gesture
        ])
        const gesture = await GE.estimate(hand[0].landmarks, 8);
        if (gesture.gestures !== undefined && gesture.gestures.length > 0) {
          const confidence = gesture.gestures.map(
            (prediction) => prediction.score
          );
          const maxConfidence = confidence.indexOf(
            Math.max.apply(null, confidence)
          );
          const maxConfidenceGesture = gesture.gestures[maxConfidence]
          console.log(maxConfidenceGesture);

          let pred_label
          switch(maxConfidenceGesture.name){
            case 'num_1':
              pred_label = 1;
              break;
            case 'num_2':
              pred_label = 2;
              break;
            case 'num_3':
              pred_label = 3;
              break;
            case 'num_4':
              pred_label = 4;
              break;
            case 'num_5':
              pred_label = 5;
              break;
            case 'num_0':
              pred_label = 0;
              break;
            default:
              pred_label = null
              break;
          }
          setOutput(pred_label); 
        }
      }

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);

    }
  }

  runHandpose();
}, []);

    return (
      <div className="App">
        <header className="App-header">
          <Webcam ref={webcamRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480
            }} />
          <canvas ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 9,
              width: 640,
              height: 480
            }} />

    {output !== null && (
      <div
      style={{
        position: "absolute",
        marginLeft: "auto",
        marginRight: "auto",
        left: 400,
        bottom: 500,
        right: 0,
        zIndex: 10,
        textAlign: "center",
        height: 100,
        transform: 'translateY(-50%)',
        fontSize: "48px",
        fontWeight: 'bold', // Add font for better visibility
      }}
    >
      {output}
    </div>
  )}
        </header>
      </div>
    );
  }

export default App;