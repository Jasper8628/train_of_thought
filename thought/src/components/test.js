const array = [];
const r = 10;
for (let i = 0; i < 6.28; i = i + 0.6) {
  for (let j = 0; j < 6.28; j = j + 0.6) {
    let x = Math.cos(j) * r;
    let y = Math.sin(j) * Math.sin(i) * r;
    let z = Math.sin(i) * r;
    array.push({ x, y, z })
  }
}
console.log(array.length)

class Node {
  constructor(position, edges) {
    this.position = position
    this.edges = edges
  }
  get edge() {
    const random = Math.floor(Math.random() * 3)
    return this.edges[random]
  }
  trigger() {
    this.edges.forEach(edge => {
      const node = new Node(edge)
      console.log(node.edges)
      setTimeout(() => {
        node.trigger()
      }, 100);

    });
  }
}
const newNode = new Node([1, 2, 3], []);
newNode.trigger()