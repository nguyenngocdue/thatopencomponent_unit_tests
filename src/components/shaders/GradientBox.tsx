import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const GradientBox: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // **Scene setup**
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222); // Dark gray background

        // **Camera setup**
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 10); // Camera position

        // **Renderer setup**
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // **Vertex Shader**
        const vertexShader = `
            varying vec2 vUv; // Declare a varying variable to pass UV coordinates to the fragment shader
            void main() {
                vUv = uv; // Pass the UV coordinates from the geometry to the fragment shader
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
            }
        `;

        // **Fragment Shader**
        const fragmentShader = `
            varying vec2 vUv; // Receive the UV coordinates from the vertex shader
            void main() {
                vec3 color = vec3(vUv.x, vUv.y, 1.0); // Create a gradient using UV coordinates
                gl_FragColor = vec4(color, 1.0); // Output the color
            }
        `;

        // **Material**
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
        });

        // **Geometry and Mesh**
        const geometry = new THREE.BoxGeometry(5, 5, 5); // Create a box geometry
        const box = new THREE.Mesh(geometry, material); // Apply the shader material to the box
        scene.add(box); // Add the box to the scene

        // **Animation loop**
        const animate = () => {
            box.rotation.x += 0.01; // Rotate the box around the X-axis
            box.rotation.y += 0.01; // Rotate the box around the Y-axis
            renderer.render(scene, camera); // Render the scene and camera
            requestAnimationFrame(animate); // Loop the animation
        };
        animate();

        // **Cleanup**
        return () => {
            mountRef.current?.removeChild(renderer.domElement); // Remove the canvas when the component unmounts
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />;
};

export default GradientBox;
