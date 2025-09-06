import * as THREE from 'three';

const container = document.getElementById('cube');

const scene = new THREE.Scene();
scene.background = new THREE.Color('#373737');

const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);
camera.position.z = 4;

const geometry = new THREE.BoxGeometry();
const pinkMaterial = new THREE.MeshLambertMaterial({ color: '#fd7dd4', emissive: '#fd7dd4' });
const yellowMaterial = new THREE.MeshLambertMaterial({ color: '#f7f452', emissive: '#f7f452' });
const cube = new THREE.Mesh(geometry, pinkMaterial);
const cube2 = new THREE.Mesh(geometry, yellowMaterial);
cube.position.y = 1.5;
cube2.position.y = -1.5;
scene.add(cube);
scene.add(cube2);

const light = new THREE.DirectionalLight(0xffffff, 10);
light.position.set(1, 1, 1);
scene.add(light);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();
