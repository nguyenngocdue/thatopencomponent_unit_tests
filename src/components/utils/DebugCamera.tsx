import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const DebugCamera = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    // Main Camera setup
    const mainCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    mainCamera.position.set(0, 5, 15);

    // Debug Camera setup
    const debugCamera = new THREE.PerspectiveCamera(
      50, // FOV
      1, // Aspect ratio
      0.1,
      1000
    );
    debugCamera.position.set(10, 10, 10);
    debugCamera.lookAt(0, 0, 0);

    // Create Frustum visualization
    const frustumHelper = new THREE.CameraHelper(debugCamera);
    scene.add(frustumHelper);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Box setup
    const boxGeometry = new THREE.BoxGeometry(5, 5, 5);
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // OrbitControls for main camera
    const controls = new OrbitControls(mainCamera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update the frustum helper
      frustumHelper.update();

      controls.update();
      renderer.render(scene, mainCamera);
    };
    animate();

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default DebugCamera;
