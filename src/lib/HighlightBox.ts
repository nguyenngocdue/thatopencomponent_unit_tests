import * as THREE from 'three';

/**
 * Highlights the entire object by changing all vertex colors.
 * 
 * @param object - The THREE.Mesh object to highlight.
 * @param color - The color to highlight the object (default is red).
 */
export const highlightBox = (
    object: THREE.Mesh,
    color: THREE.Color = new THREE.Color(1, 0, 0) // Default red
  ) => {
    const geometry = object.geometry as THREE.BufferGeometry;
  
    if (!geometry.attributes.color) {
      console.warn('Color attribute is missing on the geometry.');
      return;
    }
  
    // Access the color array
    const colorArray = geometry.attributes.color.array as Float32Array;
  
    // Update the color of all vertices
    for (let i = 0; i < colorArray.length; i += 3) {
      colorArray[i] = color.r;
      colorArray[i + 1] = color.g;
      colorArray[i + 2] = color.b;
    }
  
    // Mark the color attribute as needing update
    geometry.attributes.color.needsUpdate = true;
  };
  