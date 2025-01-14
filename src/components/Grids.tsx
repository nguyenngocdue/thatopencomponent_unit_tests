import React, { useEffect } from 'react';
import * as THREE from 'three';
import * as OBC from '@thatopen/components';
import * as BUI from '@thatopen/ui';

export const Grids = () => {
    useEffect(() => {
        const container = document.getElementById('container');
        if (!container) {
            console.error('Container element not found');
            return;
        }

        const components = new OBC.Components();

        const worlds = components.get(OBC.Worlds);
        const world = worlds.create<
            OBC.SimpleScene,
            OBC.SimpleCamera,
            OBC.SimpleRenderer
        >();

        world.scene = new OBC.SimpleScene(components);
        world.renderer = new OBC.SimpleRenderer(components, container);
        world.camera = new OBC.SimpleCamera(components);

        components.init();

        const cube = new THREE.Mesh(
            new THREE.BoxGeometry(),
            new THREE.MeshBasicMaterial({ color: 'red' })
        );
        world.scene.three.add(cube);

        const grids = components.get(OBC.Grids);
        const grid = grids.create(world);

        BUI.Manager.init();

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
        document.body.append(panel);
        return () => {
            panel.remove();
            components.dispose();
        };
    }, []);

    return (
        <div id="container" style={{ width: '100vw', height: '100vh' }}>
        </div>
    );
};
