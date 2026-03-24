import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.127.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.127.0/examples/jsm/controls/OrbitControls.js";

const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("./Door_Wood_001_basecolor.jpg");

const envTextureLoader = new THREE.CubeTextureLoader();
const environmentMapTexture = envTextureLoader.load([
  "./environmentmaps/px.png",
  "./environmentmaps/nx.png",
  "./environmentmaps/py.png",
  "./environmentmaps/ny.png",
  "./environmentmaps/pz.png",
  "./environmentmaps/nz.png",
]);

const scene = new THREE.Scene();
scene.background = environmentMapTexture;

const material = new THREE.MeshStandardMaterial();
material.envMap = environmentMapTexture;
material.side = THREE.DoubleSide;
material.metalness = 0.9;
material.roughness = 0;

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(2, 2, 2);
scene.add(ambientLight, directionalLight);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material,
);
torus.position.x = 1.5;
scene.add(sphere, plane, torus);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 5;
scene.add(camera);

const canvas = document.querySelector(".webgl");
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const helper = () => {
  sphere.rotation.y += 0.01;
  torus.rotation.x += 0.01;
  plane.rotation.y += 0.01;

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(helper);
};
helper();
