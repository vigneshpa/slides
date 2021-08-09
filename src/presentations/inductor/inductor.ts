const angVelCurrentRatio = 1;
const inductance = 10;

let voltage = 0;
let rps = 0;

const volEl = document.getElementById('voltageValue')!;
(<any>window).onVoltage = (val: string) => {
  voltage = +val;
  volEl.innerText = (+val).toFixed(1);
};
const curEl = document.getElementById('currentValue')!;

const wheelEl = document.getElementById('flywheel')!;
console.log(wheelEl);
let wheelR: number = 0;

let currentIntegral: number = 0;

let loadtype: 'Resistive' | 'Inductive' = 'Resistive';
(<any>window).toogleResInd = () => (currentIntegral = 0) || (loadtype = loadtype === 'Inductive' ? 'Resistive' : 'Inductive');

// Resistor function
const integrateResistorCurrent = (delta: number) => voltage / 10;

// Inductor function
const integrateInductorCurrent = (delta: number) => (currentIntegral += (delta * voltage) / inductance);

let previousTS: number = 0;
const step: FrameRequestCallback = timeStamp => {
  const delta = (timeStamp - previousTS) / 1000;

  const current = loadtype === 'Resistive' ? integrateResistorCurrent(delta) : integrateInductorCurrent(delta);

  rps = angVelCurrentRatio * current;

  wheelR += rps * delta * 360;
  wheelEl.style.rotate = `${wheelR}deg`;

  // --
  curEl.innerText = current.toFixed(1);
  previousTS = timeStamp;
  window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);
