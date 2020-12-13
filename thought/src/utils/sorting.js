export default function mergeSort(array) {
  divide(array)
  // console.log(array);
  function divide(array) {
    if (array.length < 2) {
      return array;
    } else {
      const half = Math.floor(array.length / 2);
      const left = array.slice(0, half);
      const right = array.slice(half, array.length + 1);
      return merge(divide(left), divide(right))
    }
  }
  function merge(left, right) {
    let buffer = []
    const start = left[0].index;
    const end = right[right.length - 1].index;
    while (left.length !== 0 && right.length !== 0) {
      if (left[0].value < right[0].value) {
        buffer.push(left.shift())
      } else {
        buffer.push(right.shift())
      }
    }
    while (left.length !== 0) {
      buffer.push(left.shift())
    }
    while (right.length !== 0) {
      buffer.push(right.shift())
    }
    for (let i = start, j = 0; i < end, j < buffer.length; j++, i++) {
      // let colorDiv = document.getElementById(`${buffer[j].index}`)
      // let barDiv = document.getElementById(`${i}`);
      // let height = buffer[j].value;
      buffer[j].index = i;
      // setTimeout(() => {
      //   colorDiv.style.backgroundColor = 'magenta'
      //   setTimeout(() => {
      //     colorDiv.style.backgroundColor = 'aqua'
      //     barDiv.style.height = `${height}px`;
      //   }, 50);
      // }, j * 50);
    }
    array.splice(start, buffer.length, ...buffer);
    return buffer;
  }
}