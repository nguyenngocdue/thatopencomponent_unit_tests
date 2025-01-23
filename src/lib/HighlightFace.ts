import * as THREE from 'three';

/**
 * Highlights a face of a geometry by changing its vertex colors.
 * 
 * @param intersect - The intersection object returned by Raycaster.
 * @param color - The color to highlight the face (default is red).
 */
export const highlightFace = (
  intersect: THREE.Intersection,
  color: THREE.Color = new THREE.Color(1, 0, 0) // Default red
) => {
  // Extract face and geometry
  const face = intersect.face;
  const geometry = intersect.object.geometry as THREE.BufferGeometry;

  if (!face || !geometry.attributes.color) {
    console.warn('Face or color attribute is missing on the geometry.');
    return;
  }

  // Access the color array
  const colorArray = geometry.attributes.color.array as Float32Array;

  // Update the color of the vertices of the face
  colorArray[face.a * 3] = color.r;
  colorArray[face.a * 3 + 1] = color.g;
  colorArray[face.a * 3 + 2] = color.b;

  colorArray[face.b * 3] = color.r;
  colorArray[face.b * 3 + 1] = color.g;
  colorArray[face.b * 3 + 2] = color.b;

  colorArray[face.c * 3] = color.r;
  colorArray[face.c * 3 + 1] = color.g;
  colorArray[face.c * 3 + 2] = color.b;

  // Mark the color attribute as needing update
  geometry.attributes.color.needsUpdate = true;
};
