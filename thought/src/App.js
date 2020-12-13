import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import { EventDispatcher } from 'three';
// import { Box } from 'drei';

const Box = ({ position, newColor, edges }) => {
  const [color, setColor] = useState('')
  const mesh = useRef(null)

  const handler = (e) => {
    console.log('number of edges: ' + e.object.userData.edges)
    if (color !== 'red') {
      setColor('red')
      setTimeout(() => {
        setColor('')
      }, 1000);
    } else {
      setColor('teal')
    }
  }
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;

  })
  return (
    <mesh position={position} ref={mesh} userData={{ message: 'message', edges: edges, position: position }} onClick={handler} >
      <sphereBufferGeometry attach='geometry' args={[0.2, 500]} />
      <meshStandardMaterial attach='material' color={color ? color : newColor} />
    </mesh>

  )
}

function App() {
  // const r = 10;
  useEffect(() => {
    loop();
  }, [])
  const loop = () => {
    const newArray = []
    let count = 0;
    const r = 6;
    const incr = 0.3;
    for (let i = -3; i < 3; i = i + incr) {
      for (let j = -3; j < 3; j = j + incr) {
        let x = Math.cos(j) * Math.cos(i) * r;
        let y = Math.sin(j) * Math.cos(i) * r;
        let z = Math.sin(i) * r;

        let x1 = Math.cos(j) * Math.cos(i + incr) * r;
        let y1 = Math.sin(j) * Math.cos(i + incr) * r;
        let z1 = Math.sin(i + incr) * r;
        let x2 = Math.cos(j) * Math.cos(i - incr) * r;
        let y2 = Math.sin(j) * Math.cos(i - incr) * r;
        let z2 = Math.sin(i - incr) * r;
        let x3 = Math.cos(j + incr) * Math.cos(i) * r;
        let y3 = Math.sin(j + incr) * Math.cos(i) * r;
        let z3 = Math.sin(i) * r;
        let x4 = Math.cos(j - incr) * Math.cos(i) * r;
        let y4 = Math.sin(j - incr) * Math.cos(i) * r;
        let z4 = Math.sin(i) * r;

        newArray.push({
          ID: count,
          position: [x, y, z],
          edges: [[x1, y1, z1], [x2, y2, z2], [x3, y3, z3], [x4, y4, z4]],
          color: 'blue'
        })
        count++;
      }
    }
    newArray.forEach(element => {
      const distCollection = []
      newArray.forEach(point => {
        const x = (element.position[0] - point.position[0]) * (element.position[0] - point.position[0]);
        const y = (element.position[1] - point.position[1]) * (element.position[1] - point.position[1]);
        const z = (element.position[2] - point.position[2]) * (element.position[2] - point.position[2]);
        const dist = x + y + z
        distCollection.push({ distance: dist, position: point.position })
      });
      element.edges = distCollection.length
    });

    setArray(newArray)
  }
  const [array, setArray] = useState([]);
  // }, [array])
  return (
    <>
      <Canvas
      //  camera={{ position: [-5, 2, 10], fov: 1700 }}
      >
        <ambientLight intensity={0.1} />
        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1.5}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        {
          array.length !== 0 ?
            array.map((position, index) => (
              <Box key={index}
                edges={position.edges}
                position={position.position}
                newColor={
                  position.ID <= 10 ? 'red' :
                    position.color} />
            ))
            : <Box position={[0, 0, 0]} />
        }
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default App;
