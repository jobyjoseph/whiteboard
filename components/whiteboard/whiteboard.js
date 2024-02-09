"use client";
import React, { useEffect } from "react";
import styles from "./whiteboard.module.css";

function WhiteBoard() {
  let canvas;
  let context;
  let eraserCursor;
  let drawing = false;

  useEffect(() => {
    canvas = document?.getElementById("whiteboard");
    context = canvas?.getContext("2d");

    // Set canvas to full screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function startPosition(e) {
      drawing = true;
      draw(e);
    }

    function endPosition() {
      drawing = false;
      context.beginPath();
    }

    function draw(e) {
      if (!drawing) return;

      context.lineWidth = 5;
      context.lineCap = "round";
      context.strokeStyle = "black";

      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
    }

    // Event listeners
    canvas.addEventListener("mousedown", startPosition);
    canvas.addEventListener("mouseup", endPosition);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseout", endPosition);
  }, []);

  function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function toggleEraseMode() {
    erasing = !erasing;

    if (erasing) {
      document.getElementById("eraseButton").textContent = "Toggle Draw";
    } else {
      document.getElementById("eraseButton").textContent = "Toggle Erase";
    }
  }

  return (
    <>
      <canvas className={styles.whiteboard} id="whiteboard"></canvas>
      <button className={styles.clearButton} onClick={clearCanvas}>
        CLEAR
      </button>
    </>
  );
}

export default WhiteBoard;
