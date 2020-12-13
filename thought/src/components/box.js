import React, { useRef } from 'react';
import { useFrame } from 'react-three-fiber';

function Box({ position, newColor, edges, name, handleClick }) {
  const mesh = useRef(null)
  // useFrame(() => {
  //   mesh.current.rotation.x = mesh.current.rotation.y = 0.01;
  // })

  return (
    <mesh
      position={position}
      name={name}
      ref={mesh}
      userData={{ edges: edges, position: position, color: newColor }}
      onClick={handleClick} >
      <sphereBufferGeometry attach='geometry' args={[0.2, 500]} />
      <meshStandardMaterial attach='material' color={newColor} />
    </mesh>
  )
}

export default Box
