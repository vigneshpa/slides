import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

import revealMath from 'reveal.js/plugin/math/math.esm';
import revealZoom from 'reveal.js/plugin/zoom/zoom.esm';
import './inductor.ts';

let deck = new Reveal({
  math: {
    mathjax: 'https://cdn.jsdelivr.net/gh/mathjax/mathjax@2.7.8/MathJax.js',
    config: 'TeX-AMS_HTML-full',
    // pass other options into `MathJax.Hub.Config()`
    TeX: { Macros: { RR: '{\\bf R}' } },
  },
  plugins: [revealMath, revealZoom],
});
deck.initialize();
