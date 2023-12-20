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

// Создаем три стержня для буквы "Н"
const geometry1 = new THREE.BoxGeometry(1, 5, 1);
const letterPart1 = new THREE.Mesh(geometry1, material);
letterPart1.position.x = -2;

const geometry2 = new THREE.BoxGeometry(4, 1, 1);
const letterPart2 = new THREE.Mesh(geometry2, material);
letterPart2.position.y = 0.5;

const geometry3 = new THREE.BoxGeometry(1, 5, 1);
const letterPart3 = new THREE.Mesh(geometry3, material);
letterPart3.position.x = 2;

// Добавляем части буквы на сцену
const letterGroup = new THREE.Group();
letterGroup.add(letterPart1);
letterGroup.add(letterPart2);
letterGroup.add(letterPart3);

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