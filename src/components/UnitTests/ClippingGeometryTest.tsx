import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let box: THREE.Mesh;
let clippingPlane: THREE.Plane;
let planeHelper: THREE.PlaneHelper;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function init(mount: HTMLDivElement) {
  // Camera
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  camera.position.set(2, 2, 5);

  // Scene
  scene = new THREE.Scene();
  scene.add(new THREE.AmbientLight(0x404040)); // Ambient light

  // Light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  // Clipping Plane
  clippingPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0.05); // Mặt phẳng mặc định
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.localClippingEnabled = true; // Cho phép clipping
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // Plane Helper
  planeHelper = new THREE.PlaneHelper(clippingPlane, 2, 0xff0000); // Hiển thị mặt phẳng
  scene.add(planeHelper);

  // Box Geometry
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x44aa88,
    shininess: 100,
    vertexColors: true, // Bật màu cho từng đỉnh để thay đổi khi hover
    clippingPlanes: [clippingPlane], // Áp dụng mặt phẳng cắt
    clipShadows: true,
  });

  // Gán màu ban đầu cho các đỉnh
  const colors = [];
  for (let i = 0; i < geometry.attributes.position.count; i++) {
    colors.push(0.27, 0.67, 0.53); // Màu xanh mặc định
  }
  geometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3) // Gắn màu
  );

  box = new THREE.Mesh(geometry, material);
  scene.add(box);

  // Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  // Raycaster và Mouse
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let hoveredFaceIndex = null; // Lưu trữ mặt đang được hover

  // Hàm xử lý hover
  function onMouseMove(event: MouseEvent) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(box);

    if (intersects.length > 0) {
      const intersect = intersects[0];

      // Nếu hover vào mặt mới, cập nhật hiệu ứng sáng
      if (hoveredFaceIndex !== intersect.faceIndex) {
        hoveredFaceIndex = intersect.faceIndex;

        // Đổi màu khi hover
        const faceColors = geometry.attributes.color;
        for (let i = 0; i < faceColors.count; i++) {
          if (i === hoveredFaceIndex * 3 || i === hoveredFaceIndex * 3 + 1 || i === hoveredFaceIndex * 3 + 2) {
            faceColors.setXYZ(i, 1, 1, 0); // Màu vàng khi hover
          } else {
            faceColors.setXYZ(i, 0.27, 0.67, 0.53); // Màu mặc định
          }
        }
        faceColors.needsUpdate = true; // Cập nhật màu sắc
      }
    } else {
      // Không hover vào mặt nào, đặt lại màu mặc định
      if (hoveredFaceIndex !== null) {
        hoveredFaceIndex = null;

        const faceColors = geometry.attributes.color;
        for (let i = 0; i < faceColors.count; i++) {
          faceColors.setXYZ(i, 0.27, 0.67, 0.53); // Màu mặc định
        }
        faceColors.needsUpdate = true;
      }
    }
  }

  // GUI
  const gui = new GUI();
  const clippingFolder = gui.addFolder("Clipping Plane");
  const planeProps = {
    normalX: clippingPlane.normal.x,
    normalY: clippingPlane.normal.y,
    normalZ: clippingPlane.normal.z,
    constant: clippingPlane.constant,
  };

  // GUI Controls
  clippingFolder.add(planeProps, "normalX", -1, 1, 0.01).onChange((value) => {
    clippingPlane.normal.x = value;
    planeHelper.updateMatrixWorld(); // Cập nhật PlaneHelper
  });
  clippingFolder.add(planeProps, "normalY", -2, 2, 0.01).onChange((value) => {
    clippingPlane.normal.y = value;
    planeHelper.updateMatrixWorld(); // Cập nhật PlaneHelper
  });
  clippingFolder.add(planeProps, "normalZ", -1, 1, 0.01).onChange((value) => {
    clippingPlane.normal.z = value;
    planeHelper.updateMatrixWorld(); // Cập nhật PlaneHelper
  });
  clippingFolder.add(planeProps, "constant", -1, 1, 0.01).onChange((value) => {
    clippingPlane.constant = value;
    planeHelper.updateMatrixWorld(); // Cập nhật PlaneHelper
  });

  clippingFolder.open();

  // Lắng nghe sự kiện chuột
  window.addEventListener("mousemove", onMouseMove);

  // Append renderer to the DOM
  mount.appendChild(renderer.domElement);

  // Resize event listener
  window.addEventListener("resize", onWindowResize);

  animate();
}


export class ClippingPlaneWithHelper extends Component {
  mount: React.RefObject<HTMLDivElement>;
  constructor(props: {}) {
    super(props);
    this.mount = React.createRef();
  }

  componentDidMount() {
    init(this.mount.current);
  }

  componentWillUnmount() {
    while (this.mount.current.firstChild) {
      this.mount.current.removeChild(this.mount.current.firstChild);
    }
    window.removeEventListener("resize", onWindowResize);
  }

  render() {
    return <div ref={this.mount} style={{ width: "100%", height: "100%" }}></div>;
  }
}

export default ClippingPlaneWithHelper;
