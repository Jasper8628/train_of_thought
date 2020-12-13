import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Canvas, useFrame } from 'react-three-fiber';
import { OrbitControls } from 'drei';
import mergeSort from './utils/sorting';
import Box from './components/box';

function App() {
  useEffect(() => {
    loop();
  }, []);

  const loop = () => {
    const newArray = []
    let count = 0;
    const r = 6;
    const incr = 0.17;
    for (let i = 0; i < 6.28; i = i + incr) {
      for (let j = 0; j < 6.28; j = j + incr) {
        let x = Math.cos(j) * Math.cos(i) * r;
        let y = Math.sin(j) * Math.cos(i) * r;
        let z = Math.sin(i) * r;
        newArray.push({
          ID: count,
          ready: true,
          position: [x, y, z],
          color: 'teal'
        })
        count++;
      }
    }
    // storing ALL distances between each point in the array for sorting
    newArray.forEach(element => {
      const distCollection = []
      newArray.forEach(point => {
        const x = (element.position[0] - point.position[0]) * (element.position[0] - point.position[0]);
        const y = (element.position[1] - point.position[1]) * (element.position[1] - point.position[1]);
        const z = (element.position[2] - point.position[2]) * (element.position[2] - point.position[2]);
        const dist = x + y + z
        // adding 'index' property because the mergeSort method requires both 'value' and 'index'
        const index = newArray.indexOf(point)
        distCollection.push({ value: dist, index: index, ID: point.ID })
      });
      // sorting by distance, for now, is to assume all clusters are spacially related
      // but in reality concepts can be related from far away 
      // think 'apple', 'red', 'blood', related but potentially spacially far apart
      mergeSort(distCollection)
      element.edges = [
        distCollection[2].ID,
        distCollection[3].ID,
        distCollection[4].ID,
        distCollection[5].ID,
        distCollection[6].ID
      ]
    });

    setArray(newArray)
  }
  const [array, setArray] = useState([]);

  const handleClick = (e) => {
    const color = e.object.userData.color;
    console.log(color)
    const name = e.object.name;
    const edges = e.object.userData.edges.filter(edge => array[edge].ready);
    console.log(edges)
    const array2 = [...array]
    array2[name].color = "red";
    array2[name].ready = false;
    const random = Math.floor(Math.random() * 3);
    const edge = edges[random];
    setArray(array2);
    spread(edge)
    setTimeout(() => {
      array2[name].color = 'teal';
      array2[name].ready = true
      setArray(array2);
    }, 1200);
  }

  const spread = (name) => {
    const edges = array[name].edges.filter(edge => array[edge].ready);
    if (edges.length) {
      const random = Math.floor(Math.random() * edges.length);
      const edge = edges[random];
      setTimeout(() => {
        const array2 = [...array];
        array2[name].color = 'red';
        array2[name].ready = false;
        setArray(array2);
        setTimeout(() => {
          array2[name].color = 'blue';
          setArray(array2);
          setTimeout(() => {
            array2[name].color = 'teal';
            array2[name].ready = true
            setArray(array2);
          }, 1200);
        }, 400);
        spread(edge)
      }, 100);
    } else {
      const random = Math.floor(Math.random() * 1369)
      spread(random)
    }

  }
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
              <Box
                handleClick={handleClick}
                key={index}
                name={position.ID}
                edges={position.edges}
                position={position.position}
                newColor={
                  position.ID <= 0 ? 'yellow' :
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
