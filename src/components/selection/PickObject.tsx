import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from 'three-mesh-bvh';
import { resetColors } from '../../lib/ResetColors';

const PickObject = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    let currentSelectedBox: THREE.Mesh | null = null; // Lưu trạng thái box được chọn hiện tại

    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222);

        // Camera setup
        const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(10, 15, 20);

        // Renderer setup
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // Generate geometries and materials
        const geometries: THREE.BoxGeometry[] = [];
        for (let i = 0; i < 4; i++) {
            const geometry = new THREE.BoxGeometry(5, 5, 2);
            geometry.translate(3*i, 0, 3 * i); // Dịch chuyển box theo trục Z
            geometries.push(geometry);
        }

        const materials = geometries.map(() => new THREE.MeshBasicMaterial({ vertexColors: true }));

        // Create boxes
        const boxes = geometries.map((geometry, index) => {
            const colors = new Float32Array(geometry.attributes.position.count * 3);
            for (let i = 0; i < colors.length; i += 3) {
                colors[i] = Math.random(); // Random R
                colors[i + 1] = Math.random(); // Random G
                colors[i + 2] = Math.random(); // Random B
            }

            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const box = new THREE.Mesh(geometry, materials[index]);
            scene.add(box);

            // Apply BVH
            geometry.computeBoundsTree = computeBoundsTree;
            geometry.disposeBoundsTree = disposeBoundsTree;
            box.raycast = acceleratedRaycast;
            geometry.computeBoundsTree();

            return box;
        });

        // Reset colors handler
        const resetColorsHandler = () => {
            resetColors(boxes);
        };

        // Highlight logic
        const highlightBox = (box: THREE.Mesh) => {
            const geometry = box.geometry as THREE.BufferGeometry;
            const colorArray = geometry.attributes.color.array as Float32Array;

            // Set all vertices to red
            for (let i = 0; i < colorArray.length; i += 3) {
                colorArray[i] = 1; // Red
                colorArray[i + 1] = 0; // Green
                colorArray[i + 2] = 0; // Blue
            }
            geometry.attributes.color.needsUpdate = true;
        };

        // Handle mouse click
        const onMouseClick = (event: MouseEvent) => {
            // Raycaster setup
            const raycaster = new THREE.Raycaster();
            const mouse = new THREE.Vector2();

            // Convert mouse position to NDC
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            // Perform raycasting
            raycaster.setFromCamera(mouse, camera);

            let clickedBox: THREE.Mesh | null = null;

            // Check intersections
            boxes.forEach((box) => {
                const intersects = raycaster.intersectObject(box);
                if (intersects.length > 0) {
                    clickedBox = box;
                }
            });

            if (clickedBox) {
                if (currentSelectedBox === clickedBox) {
                    // Deselect the box
                    console.log('Deselecting box...');
                    resetColorsHandler(); // Reset all colors
                    currentSelectedBox = null; // Clear the selected box
                } else {
                    // Select a new box
                    console.log('Selecting new box...');
                    resetColorsHandler(); // Reset all colors
                    highlightBox(clickedBox); // Highlight the selected box
                    currentSelectedBox = clickedBox; // Update the selected box
                }
            }
        };

        window.addEventListener('click', onMouseClick);

        // OrbitControls setup
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
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []); // Không phụ thuộc vào state của React

    return <div ref={mountRef} />;
};

export default PickObject;
