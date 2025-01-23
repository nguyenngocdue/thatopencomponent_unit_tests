import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { highlightFace } from '../../lib/HighlightFace';

const SelectFace = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 5, 15);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Generate a box geometry
        const geometry = new THREE.BoxGeometry(5, 5, 5); // Box size
        const material = new THREE.MeshBasicMaterial({
            vertexColors: true, // Allow per-vertex colors
        });
        const box = new THREE.Mesh(geometry, material);
        scene.add(box);

        // Apply BVH to the geometry
        geometry.computeBoundsTree = computeBoundsTree;
        geometry.disposeBoundsTree = disposeBoundsTree;
        box.raycast = acceleratedRaycast;
        geometry.computeBoundsTree();

        // Add colors for each vertex
        const colors = new Float32Array(geometry.attributes.position.count * 3);
        for (let i = 0; i < colors.length; i += 3) {
            colors[i] = Math.random(); // Random color for R
            colors[i + 1] = Math.random(); // Random color for G
            colors[i + 2] = Math.random(); // Random color for B
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        // Raycaster setup
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        // Highlight logic
        // Handle mouse click
        const onMouseClick = (event) => {
            // Convert mouse position to normalized device coordinates
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Perform raycasting
            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(box);

            if (intersects.length > 0) {
                highlightFace(intersects[0]);
            }
        };

        window.addEventListener('click', onMouseClick);

        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            window.removeEventListener('click', onMouseClick);
            mountRef.current.removeChild(renderer.domElement);
            renderer.dispose();
            controls.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
};

export default SelectFace;
