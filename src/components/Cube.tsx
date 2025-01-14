import * as THREE from 'three';
import { OrbitControls } from '../assets/js/OrbitControls.js';
import { OrbitControlsGizmo } from '../assets/js/OrbitControlsGizmo.js';
import { useEffect } from 'react';

interface CubeProps {
  container: HTMLDivElement;
  scene: THREE.Scene;
  camera: THREE.Camera;
  geometry: THREE.BufferGeometry;
  renderer: THREE.WebGLRenderer;
}

export const Cube = ({ container, scene, camera, geometry, renderer }: CubeProps) => {
  useEffect(() => {
    if (!scene || !camera || !geometry || !renderer) {
      console.error("scene, camera, geometry, and renderer must be provided as props.");
      return;
    }


    console.log(container, scene, camera, geometry, renderer)


    const controls = new OrbitControls(camera, renderer.domElement);

    const controlsGizmo = new OrbitControlsGizmo(controls, {
      size: 100,
      padding: 8,
      bubbleSizePrimary: 9,
      lineWidth: 3,
    });

    container.appendChild(controlsGizmo.domElement);

    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    return () => {
      container.removeChild(controlsGizmo.domElement);
      scene.remove(mesh);
      material.dispose();
      geometry.dispose();
    };
  }, [scene, camera, geometry, renderer]);

  return null;
};
