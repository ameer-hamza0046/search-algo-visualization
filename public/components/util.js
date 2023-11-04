// range [0, floor(a))
function rand(a) {
  return Math.floor(Math.random() * Math.floor(a));
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

const util = {
  rand: rand,
  shuffleArray: shuffleArray,
};

export default util;
