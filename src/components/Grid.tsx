import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import * as BUI from '@thatopen/ui';
import Stats from 'stats.js';
import { OrbitControlsComponent } from './Cube';

export const Grid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Lấy container từ ref
    const container = containerRef.current;

    // Khởi tạo OBC components
    const components = new OBC.Components();
    const worlds = components.get(OBC.Worlds);
    const world = worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBC.SimpleRenderer
    >();

    // Cấu hình thế giới
    world.scene = new OBC.SimpleScene(components);
    world.renderer = new OBC.SimpleRenderer(components, container);
    world.camera = new OBC.SimpleCamera(components);

    cameraRef.current = world.camera.three; // Gán camera
    rendererRef.current = world.renderer.three; // Gán renderer

    components.init();

    // Thêm cube
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshBasicMaterial({ color: 'red' })
    );
    world.scene.three.add(cube);

    // Cấu hình 
    const grids = components.get(OBC.Grids);
    const grid = grids.create(world);

    // Tạo panel điều khiển
    const panel = BUI.Component.create<BUI.PanelSection>(() => {
      return BUI.html`
        <bim-panel label="Grids Tutorial" class="options-menu">
          <bim-panel-section collapsed label="Controls">
            <bim-checkbox label="Grid visible" checked 
              @change="${({ target }: { target: BUI.Checkbox }) => {
                grid.config.visible = target.value;
              }}">
            </bim-checkbox>
            
            <bim-color-input 
              label="Grid Color" color="#bbbbbb" 
              @input="${({ target }: { target: BUI.ColorInput }) => {
                grid.config.color = new THREE.Color(target.color);
              }}">
            </bim-color-input>
            
            <bim-number-input 
              slider step="0.1" label="Grid primary size" value="1" min="0" max="10"
              @change="${({ target }: { target: BUI.NumberInput }) => {
                grid.config.primarySize = target.value;
              }}">
            </bim-number-input>
            
            <bim-number-input 
              slider step="0.1" label="Grid secondary size" value="10" min="0" max="20"
              @change="${({ target }: { target: BUI.NumberInput }) => {
                grid.config.secondarySize = target.value;
              }}">
            </bim-number-input>
          </bim-panel-section>
        </bim-panel>
      `;
    });

    container.appendChild(panel);

    // Cấu hình Stats
    const stats = new Stats();
    stats.showPanel(2);
    container.appendChild(stats.dom);
    stats.dom.style.left = '0px';
    stats.dom.style.zIndex = 'unset';

    // Thêm Stats vào vòng lặp renderer
    world.renderer.onBeforeUpdate.add(() => stats.begin());
    world.renderer.onAfterUpdate.add(() => stats.end());

    // Cleanup khi component bị unmount
    return () => {
      world.renderer.dispose();
      container.removeChild(panel);
      container.removeChild(stats.dom);
    };
  }, []);

  return (
    <div
      id="container"
      ref={containerRef}
      style={{ position: 'relative', width: '100vw', height: '100vh' }}
    >
      {cameraRef.current && rendererRef.current && (
        <OrbitControlsComponent
          camera={cameraRef.current}
          renderer={rendererRef.current}
        />
      )}
    </div>
  );
};
