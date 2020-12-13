import React, { useRef, useState } from 'react';
import { useFrame } from 'react-three-fiber';
import { Scene } from 'three';

function Box({ position, newColor, edges, name, handleClick }) {
  const [color, setColor] = useState('')
  const mesh = useRef(null)
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y = 0.01;
  // })

  const handler = (e) => {
    console.log('first neighbor: ' + e.object.userData.edges[0])
    console.log('object name: ' + e.object.name)
    if (color !== 'red') {
      setColor('red')
      setTimeout(() => {
        setColor('')
      }, 1000);
    } else {
      setColor('blue')
    }
  }
  return (
    <mesh position={position} name={name} ref={mesh} userData={{ message: 'message', edges: edges, position: position, color: newColor }} onClick={handleClick} >
      <sphereBufferGeometry attach='geometry' args={[0.2, 500]} />
      <meshStandardMaterial attach='material' color={newColor} />
    </mesh>
  )
}

export default Box
