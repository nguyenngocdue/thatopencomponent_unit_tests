import * as THREE from 'three';
// @ts-ignore
import { OrbitControls } from '../assets/js/OrbitControls.js';
// @ts-ignore
import { OrbitControlsGizmo } from '../assets/js/OrbitControlsGizmo.js';
import { useEffect } from 'react';



export const Cube = () => {
  useEffect(() => {
    // renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(0x333333));
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(15, 12, 12);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Orbit Controls Gizmo
    const controlsGizmo = new OrbitControlsGizmo(controls, { size: 100, padding: 8 });

    // Add the Gizmo to the document
    document.body.appendChild(controlsGizmo.domElement);

    // ambient light
    scene.add(new THREE.AmbientLight(0x222222));

    // directional light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(2, 2, 0);
    scene.add(light);

    // axes Helper
    const axesHelper = new THREE.AxesHelper(15);
    scene.add(axesHelper);

    // Grid Helper
    scene.add(new THREE.GridHelper(10, 10, '#666666', '#222222'));

    // geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);

    // material
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.7,
    });

    // mesh
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0.5, 0);
    scene.add(mesh);

    // animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      controls.update();
    };
    animate();

    // Resize handling
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', resize);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(renderer.domElement);
      document.body.removeChild(controlsGizmo.domElement);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return null;
};
