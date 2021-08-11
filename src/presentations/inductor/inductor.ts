const inductance = 10; // in Henries(H)
const resistance = 5;  // in Ohms(Ω)
const sineWaveFrequency = 0.2; // in Hertz (Hz)
const sineWaveAngularVelocity = 2 * Math.PI * sineWaveFrequency; // in rad/sec as ω=2πf
const voltageMax = 10;
const currentMax = 2;
const initialInductorCurrent = -voltageMax/(inductance*sineWaveAngularVelocity); // as -I₀=-E₀/Lω

const angularVelocityCurrentRatio = 1;

let voltage = 0;
let rps = 0;

const voltageInp = document.getElementsByName('voltage')[0] as HTMLInputElement;
voltageInp.max = voltageMax as unknown as string;
voltageInp.min = -voltageMax as unknown as string;
const volEl = document.getElementById('voltageValue')!;
window.onVoltage = (val: string) => {
  voltage = +val;
  volEl.innerText = (+val).toFixed(1);
};
const curEl = document.getElementById('currentValue')!;

const curPgr = document.getElementById('currentPgr') as HTMLProgressElement;
curPgr.max = currentMax*2;

const wheelEl = document.getElementById('flywheel')!;
let wheelR: number = 0;

let loadtype:Parameters<Window['onCircuitType']>[0] = 'Resistive';

// Current integral for integration
let currentIntegral: number = 0;

// Sine function generator
let generatorStartTS: number | null = null;
let generateSine: boolean = false;
window.onGenerateSine = checked => {
  generatorStartTS = null;
  currentIntegral = 0;
  rps = 0;
  generateSine = !!checked;
  if(generateSine && loadtype === 'InductiveCorrected')currentIntegral = initialInductorCurrent;
};

// Resistor function
const integrateResistorCurrent = (delta: number) => voltage / resistance; // as V=iR

// Inductor function
const integrateInductorCurrent = (delta: number) => (currentIntegral += (delta * voltage) / inductance); // as V=-L(di/dt)

// ResInd function
const integrateResIndCurrent = (delta: number) => (currentIntegral += (delta * (voltage - currentIntegral * resistance)) / inductance); // as V=-L(di/dt)+iR

let integrateCurrent = integrateResistorCurrent;

window.onCircuitType = loadt => {
  currentIntegral = 0;
  loadtype = loadt;
  if (generateSine) window.onGenerateSine(true);
  switch (loadt) {
    case 'Resistive':
      integrateCurrent = integrateResistorCurrent;
      break;
    case 'Inductive':
      integrateCurrent = integrateInductorCurrent;
      break;
    case 'ResInd':
      integrateCurrent = integrateResIndCurrent;
      break;
    case 'InductiveCorrected':
      integrateCurrent = integrateInductorCurrent;
      break;
    default:
      integrateCurrent = integrateResistorCurrent;
  }
};

let previousTS: number = 0;
const step: FrameRequestCallback = timeStamp => {
  const delta = (timeStamp - previousTS) / 1000;

  const current = integrateCurrent(delta);

  rps = angularVelocityCurrentRatio * current;

  wheelR += rps * delta * 360;
  if(wheelR > 5000 || wheelR < -5000)wheelR = wheelR % 360;
  wheelEl.style.transform = `rotate(${wheelR}deg)`;

  // --
  curEl.innerText = current.toFixed(1);
  curPgr.value = current + currentMax;
  if (!generatorStartTS) generatorStartTS = timeStamp;
  if (generateSine)
    (<any>volEl).innerText = ((<any>voltageInp).value = voltage =
      voltageMax * Math.sin(((timeStamp - generatorStartTS) * sineWaveAngularVelocity) / 1000)).toFixed(1);
  previousTS = timeStamp;
  window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);

interface Window {
  onVoltage: (val: string) => void;
  onCircuitType: (loadt: 'Resistive' | 'Inductive' | 'InductiveCorrected' | 'ResInd') => void;
  onGenerateSine: (checked: boolean) => void;
}