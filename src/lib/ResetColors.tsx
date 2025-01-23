import * as THREE from 'three';

/**
 * Reset colors for all boxes by assigning new random colors to each vertex.
 *
 * @param boxes - Array of THREE.Mesh objects to reset colors for.
 */
export const resetColors = (boxes: THREE.Mesh[]) => {
  boxes.forEach((box) => {
    const geometry = box.geometry as THREE.BufferGeometry;

    if (geometry.attributes.color) {
      const colorArray = geometry.attributes.color.array as Float32Array;

      // Assign random colors to each vertex
      for (let i = 0; i < colorArray.length; i += 3) {
        colorArray[i] = Math.random(); // Random R
        colorArray[i + 1] = Math.random(); // Random G
        colorArray[i + 2] = Math.random(); // Random B
      }

      // Mark the colors as needing an update
      geometry.attributes.color.needsUpdate = true;
    }
  });
};
