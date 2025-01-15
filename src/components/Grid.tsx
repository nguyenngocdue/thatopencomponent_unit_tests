import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import * as BUI from '@thatopen/ui';
import Stats from 'stats.js';
import { Cube } from './Cube';

export const Grid = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const gridGeometryRef = useRef<THREE.BoxGeometry | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const gridRef = useRef<OBC.Grid | null>(null);
  const [isReady, setReady] = useState(false);

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
    sceneRef.current = world.scene.three; // Gán scene

    components.init();

    // Thêm geometry cho cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    gridGeometryRef.current = geometry;

    // Cấu hình grids
    const grids = components.get(OBC.Grids);
    const grid = grids.create(world);
    gridRef.current = grid;

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
    stats.showPanel(0); // Hiển thị FPS
    container.appendChild(stats.dom);

    // Thêm Stats vào vòng lặp renderer
    world.renderer.onBeforeUpdate.add(() => stats.begin());
    world.renderer.onAfterUpdate.add(() => stats.end());

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);
    setReady(true);

    return () => {
      window.removeEventListener('resize', handleResize);
      stats.dom.remove();
      geometry.dispose();
    };
  }, []);


  return (
    <>
      <div
        id="container"
        ref={containerRef}
      >
      </div>

      <div className=''>
        {containerRef.current && sceneRef.current && cameraRef.current && gridGeometryRef.current && rendererRef.current && (
          <Cube
            container={containerRef.current}
            scene={sceneRef.current}
            camera={cameraRef.current}
            geometry={gridGeometryRef.current}
            renderer={rendererRef.current}
          />
        )}
      </div>

      
    </>
  );

};
