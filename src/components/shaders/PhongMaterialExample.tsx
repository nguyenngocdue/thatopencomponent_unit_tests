import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const PhongMaterialExample: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 10);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // Add Light
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(10, 10, 10);
        scene.add(pointLight);

        // Add Ambient Light
        const ambientLight = new THREE.AmbientLight(0x404040); // Gentle ambient light
        scene.add(ambientLight);

        // Phong Material
        const material = new THREE.MeshPhongMaterial({
            color: 0x2194ce,        // Màu cơ bản
            specular: 0x111111,    // Ánh sáng phản chiếu
            shininess: 30,         // Độ bóng
        });

        // Geometry and Mesh
        const geometry = new THREE.SphereGeometry(2, 32, 32); // Hình cầu
        const sphere = new THREE.Mesh(geometry, material);    // Gắn material cho geometry
        scene.add(sphere);

        // Animation
        const animate = () => {
            sphere.rotation.y += 0.01; // Xoay hình cầu
            renderer.render(scene, camera);
            requestAnimationFrame(animate);
        };
        animate();

        // Cleanup
        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default PhongMaterialExample;
