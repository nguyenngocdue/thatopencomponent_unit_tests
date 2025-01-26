import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'dat.gui';

const InteractiveCubes: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Variables
        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let raycaster: THREE.Raycaster;
        let renderer: THREE.WebGLRenderer;
        let stats: Stats;
        let INTERSECTED: THREE.Object3D | null = null;
        let theta = 0;
        const radius = 5;
        let controls: OrbitControls;
        const pointer = new THREE.Vector2();
        const gui = new GUI();
        const settings = {
            cubeCount: 200,
            positionRange: 40,
            rotationRange: Math.PI * 2,
            scaleRange: 0.5,
        }
        const objects: THREE.Mesh[] = [];

        // Initialize scene
        const init = () => {
            // Camera
            camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.set(10, 10, 10);

            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xf0f0f0);

            // Light
            const light = new THREE.DirectionalLight(0xffffff, 1);
            light.position.set(1, 1, 1).normalize();
            scene.add(light);



            // Raycaster
            raycaster = new THREE.Raycaster();

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            if (mountRef.current) {
                mountRef.current.appendChild(renderer.domElement);
            }

            // Stats
            stats = Stats();
            document.body.appendChild(stats.dom);

            // OrbitControls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.update();

            // Add initial objects
            addCubes(settings.cubeCount);

            // GUI
           // GUI cập nhật các thuộc tính
            gui.add(settings, 'cubeCount', 1, 2000, 1).name('Cube Count').onChange((value: any) => {
                updateCubes(value);
            });

            gui.add(settings, 'positionRange', 10, 100, 1).name('Position Range').onChange(() => {
                updateCubes(settings.cubeCount);
            });

            gui.add(settings, 'rotationRange', Math.PI, Math.PI * 4, 0.1).name('Rotation Range').onChange(() => {
                updateCubes(settings.cubeCount);
            });

            gui.add(settings, 'scaleRange', 0.1, 2, 0.1).name('Scale Range').onChange(() => {
                updateCubes(settings.cubeCount);
            });


            // Event listeners
            document.addEventListener('mousemove', onPointerMove);
            window.addEventListener('resize', onWindowResize);
        };

        const addCubes = (count: number) => {
            // Objects
            const geometry = new THREE.BoxGeometry();
            for (let i = 0; i < count; i++) {
                const object = new THREE.Mesh(
                    geometry,
                    new THREE.MeshLambertMaterial({ color: Math.random() * 0xffffff })
                );

                 // Vị trí ngẫu nhiên trong phạm vi điều chỉnh
                object.position.x = Math.random() * settings.positionRange - settings.positionRange / 2;
                object.position.y = Math.random() * settings.positionRange - settings.positionRange / 2;
                object.position.z = Math.random() * settings.positionRange - settings.positionRange / 2;

                // Góc xoay ngẫu nhiên trong phạm vi điều chỉnh
                object.rotation.x = Math.random() * settings.rotationRange;
                object.rotation.y = Math.random() * settings.rotationRange;
                object.rotation.z = Math.random() * settings.rotationRange;

                // Tỉ lệ ngẫu nhiên trong phạm vi điều chỉnh
                object.scale.x = Math.random() * settings.scaleRange + 0.5;
                object.scale.y = Math.random() * settings.scaleRange + 0.5;
                object.scale.z = Math.random() * settings.scaleRange + 0.5;


                objects.push(object);
                scene.add(object);
            }
        };
        const clearCubes = () => {
            while(objects.length > 0) {
                const obj = objects.pop();
                if (obj) scene.remove(obj);
            }
        }

        const updateCubes = (newCount: number)=> {
            clearCubes();
            addCubes(newCount);
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        const onPointerMove = (event: MouseEvent) => {
            pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };



        const animate = () => {
            stats.update();
            // renderer.render(scene, camera);
            render();
            requestAnimationFrame(animate);
        };



        const render = () => {
            console.log(scene.children);
            // theta += 0.1;

            // camera.position.x = radius * Math.sin(THREE.MathUtils.degToRad(theta));
            // camera.position.y = radius * Math.sin(THREE.MathUtils.degToRad(theta));
            // camera.position.z = radius * Math.cos(THREE.MathUtils.degToRad(theta));
            // camera.lookAt(scene.position);

            camera.updateMatrixWorld();

            // Find intersections
            raycaster.setFromCamera(pointer, camera);

            const intersects = raycaster.intersectObjects(scene.children, false);

            if (intersects.length > 0) {
                if (INTERSECTED !== intersects[0].object) {
                    if (INTERSECTED) {
                        const material = (INTERSECTED as THREE.Mesh).material as THREE.MeshLambertMaterial;
                        material.emissive.setHex((INTERSECTED as any).currentHex);
                    }

                    INTERSECTED = intersects[0].object;
                    const material = (INTERSECTED as THREE.Mesh).material as THREE.MeshLambertMaterial;
                    (INTERSECTED as any).currentHex = material.emissive.getHex();
                    material.emissive.setHex(0xff0000);
                }
            } else {
                if (INTERSECTED) {
                    const material = (INTERSECTED as THREE.Mesh).material as THREE.MeshLambertMaterial;
                    material.emissive.setHex((INTERSECTED as any).currentHex);
                }
                INTERSECTED = null;
            }


            renderer.render(scene, camera);
        };

        // Initialize and start animation
        init();
        animate();

        // Cleanup
        return () => {
            gui.destroy();
            // document.removeEventListener('mousemove', onPointerMove);
            window.removeEventListener('resize', onWindowResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default InteractiveCubes;
function addCubes(cubeCount: number) {
    throw new Error('Function not implemented.');
}

