import { Analyser, FFT } from "tone";
import { polySynth } from "./Play";

let analyser: Analyser;
let spectrum: HTMLCanvasElement | undefined = undefined;
let spectrumCtx: any = undefined;

const Draw = () => {
  DrawSpectrum(analyser, spectrumCtx);
  requestAnimationFrame(Draw);
};

const DrawSpectrum = (analyser, ctx) => {
  const width = ctx.canvas.width;
  const height = ctx.canvas.height;
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  const scaling = height / 260;

  analyser.getByteFrequencyData(freqData);

  ctx.fillStyle = "rgba(255, 255, 255)"; // Fade
  ctx.fillRect(0, 0, width, height);

  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgb(64, 64, 64)";
  ctx.beginPath();

  for (let x = 0; x < width; x++) {
    ctx.lineTo(Math.log(x) * 120 - 140, height - freqData[x] * scaling);
    ctx.lineTo(x, height - freqData[x] * scaling);
  }

  ctx.stroke();

  // console.log("CTX", ctx);
};

function CreateSpectrum(): void {
  spectrum = document.getElementById("spectrum") as HTMLCanvasElement;
  if (!spectrum) return;

  spectrumCtx = spectrum.getContext("2d");
  if (!spectrumCtx) return;

  spectrumCtx.canvas.width = spectrumCtx.canvas.clientWidth * 2;

  DrawSpectrum(analyser, spectrumCtx);
}

function CreateAnalyser(): void {
  if (analyser) return;
  analyser = new Analyser();
  // TODO: use .chain? How?
  if (polySynth) polySynth.connect(analyser).toDestination();
  analyser.connect(polySynth);

  CreateSpectrum();
}

CreateAnalyser();
Draw();
