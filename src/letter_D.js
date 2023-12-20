import * as THREE from '../node_modules/three/src/Three.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // черный фон
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5); // Цвет света и интенсивность
directionalLight.position.set(0, 10, 10); // Позиция света
scene.add(directionalLight);

// Включение теней в рендерере
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Тип тени для более мягких краев

// Настройка источника света для генерации теней
directionalLight.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x404040); // Мягкий белый свет
scene.add(ambientLight);


// Создаем координатные оси
const axes = new THREE.AxesHelper(20);
scene.add(axes);

const material = new THREE.MeshPhongMaterial({
    color: 0xffffff
}); // белый цвет

// Создаем ножки буквы "Д"
const legGeometry = new THREE.BoxGeometry(1, 2.5, 1);
const leftLeg = new THREE.Mesh(legGeometry, material);
leftLeg.position.x = -3;

const rightLeg = new THREE.Mesh(legGeometry, material);
rightLeg.position.x = 3;

// Создаем верхнюю часть буквы "Д"
const topGeometry = new THREE.BoxGeometry(7, 1, 1);
const topPart = new THREE.Mesh(topGeometry, material);
topPart.position.y = 1;

// Создаем шапку буквы "Д"
const hatGeometry = new THREE.BoxGeometry(3.5, 1, 1);
const topHat = new THREE.Mesh(hatGeometry, material);
topHat.position.y = 5.5;
topHat.position.x = 0;

// Левая ножка шапки
const hatLeftLegGeometry = new THREE.BoxGeometry(1, 5, 1);
const hatLeftLeg = new THREE.Mesh(hatLeftLegGeometry, material);
hatLeftLeg.position.y = 3.48;
hatLeftLeg.position.x = -1.5;
hatLeftLeg.rotateZ(-0.05);

// Правая ножка шапки
const hatRightLegGeometry = new THREE.BoxGeometry(1, 5, 1);
const hatRightLeg = new THREE.Mesh(hatRightLegGeometry, material);
hatRightLeg.position.y = 3.5;
hatRightLeg.position.x = 1.5;

// Добавляем части буквы в группу
const letterGroup = new THREE.Group();
letterGroup.add(leftLeg);
letterGroup.add(rightLeg);
letterGroup.add(topPart);
letterGroup.add(topHat);
letterGroup.add(hatLeftLeg);
letterGroup.add(hatRightLeg);

letterGroup.castShadow = true; //default is false
letterGroup.receiveShadow = false; //default

// Настройка объектов для отбрасывания и приема теней
letterGroup.castShadow = true;
letterGroup.receiveShadow = true;

scene.add(letterGroup);


camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 10;

function keybordHandler(event) {
    if (event.code === 'KeyW') {
        letterGroup.rotation.x += 0.1;
    }
    if (event.code === 'KeyS') {
        letterGroup.rotation.x -= 0.1;
    }
    if (event.code === 'KeyA') {
        letterGroup.rotation.y += 0.1;
    }
    if (event.code === 'KeyD') {
        letterGroup.rotation.y -= 0.1;
    }
    if (event.code === 'KeyQ') {
        letterGroup.rotation.z += 0.1;
    }
    if (event.code === 'KeyE') {
        letterGroup.rotation.z -= 0.1;
    }
    if (event.code === 'Equal' || event.code === 'NumpadAdd') {
        letterGroup.scale.x += 0.1;
        letterGroup.scale.y += 0.1;
        letterGroup.scale.z += 0.1;
    }
    if (event.code === 'Minus' || event.code === 'NumpadSubtract') {
        letterGroup.scale.x -= 0.1;
        letterGroup.scale.y -= 0.1;
        letterGroup.scale.z -= 0.1;
    }
    if (event.code === 'KeyR') {
        letterGroup.rotation.x = 0;
        letterGroup.rotation.y = 0;
        letterGroup.rotation.z = 0;
        letterGroup.scale.x = 1;
        letterGroup.scale.y = 1;
        letterGroup.scale.z = 1;
    }
    // Control camera with arrow keys
    if (event.code === 'ArrowUp') {
        camera.position.y += 0.1;
    }
    if (event.code === 'ArrowDown') {
        camera.position.y -= 0.1;
    }
    if (event.code === 'ArrowLeft') {
        camera.position.x -= 0.1;
    }
    if (event.code === 'ArrowRight') {
        camera.position.x += 0.1;
    }
    // Camera rotation
    if (event.code === 'KeyZ') {
        camera.rotation.x += 0.1;
    }
    if (event.code === 'KeyX') {
        camera.rotation.x -= 0.1;
    }
    if (event.code === 'KeyC') {
        camera.rotation.y += 0.1;
    }
    if (event.code === 'KeyV') {
        camera.rotation.y -= 0.1;
    }
    if (event.code === 'KeyB') {
        camera.rotation.z += 0.1;
    }
    if (event.code === 'KeyN') {
        camera.rotation.z -= 0.1;
    }
    // Reset camera rotation
    if (event.code === 'KeyF') {
        camera.rotation.x = 0;
        camera.rotation.y = 0;
        camera.rotation.z = 0;
    }
    // Reset camera position
    if (event.code === 'KeyG') {
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 10;
    }
    // Camera zoom
    if (event.code === 'KeyH') {
        camera.position.z -= 0.1;
    }
    if (event.code === 'KeyJ') {
        camera.position.z += 0.1;
    }
}

document.addEventListener('keydown', keybordHandler);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();