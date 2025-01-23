import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SimpleWaveEffect: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // **Scene setup**
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x222222); // Nền xám tối

        // **Camera setup**
        const camera = new THREE.PerspectiveCamera(
            75, // Góc nhìn
            window.innerWidth / window.innerHeight, // Tỷ lệ khung hình
            0.1, // Mặt phẳng cắt gần
            1000 // Mặt phẳng cắt xa
        );
        camera.position.set(0, 3, 5); // Đặt camera để nhìn mặt phẳng từ trên xuống
        camera.lookAt(0, 0, 0); // Camera nhìn vào tâm

        // **Renderer setup**
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current?.appendChild(renderer.domElement);

        // **Vertex Shader** (Tạo hiệu ứng gợn sóng)
        const vertexShader = `
            uniform float time; // Uniform để nhận thời gian
            void main() {
                vec3 pos = position; // Lấy vị trí ban đầu của đỉnh
                pos.z += sin(pos.x * 4.0 + time) * 0.2; // Tạo sóng trên trục Z
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `;

        // **Fragment Shader** (Màu xanh lá cố định)
        const fragmentShader = `
            void main() {
                gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0); // Màu xanh lá cây
            }
        `;



        // **Material**
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: {
                time: { value: 0.1 } // Khởi tạo uniform time
            }
        });

        // **Geometry and Mesh**
        const geometry = new THREE.PlaneGeometry(
            5, // Chiều rộng
            5, // Chiều cao
            20, // Số lượng đoạn chia theo chiều rộng
            20 // Số lượng đoạn chia theo chiều cao
        );
        const plane = new THREE.Mesh(geometry, material);
        plane.rotation.x = -Math.PI / 2; // Đặt mặt phẳng nằm ngang
        scene.add(plane); // Thêm mặt phẳng vào scene

        // **Animation loop**
        const clock = new THREE.Clock();
        const animate = () => {
            material.uniforms.time.value = clock.getElapsedTime(); // Cập nhật thời gian
            renderer.render(scene, camera); // Render frame
            requestAnimationFrame(animate); // Tiếp tục vòng lặp
        };
        animate();

        // **Cleanup**
        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, []);

    return <div ref={mountRef} />;
};

export default SimpleWaveEffect;
