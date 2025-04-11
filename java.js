const player = document.getElementById('player');
const block = document.getElementById('block');
const scoreElement = document.getElementById('score');
let score = 0;

// وظائف الحركة كما هي
function moveLeft() {
    const curLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (curLeft <= 0) return;
    player.style.left = (curLeft - 100) + "px";
}

function moveRight() {
    const curLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    if (curLeft >= 200) return;
    player.style.left = (curLeft + 100) + "px";
}

// أحداث لوحة المفاتيح (كما هي)
document.addEventListener('keydown', (event) => {
    if(event.key == "ArrowLeft") moveLeft();
    else if(event.key == "ArrowRight") moveRight();
});

// إنشاء أزرار اللمس
function createTouchButtons() {
    const controlsDiv = document.createElement('div');
    controlsDiv.style.position = 'fixed';
    controlsDiv.style.bottom = '20px';
    controlsDiv.style.width = '100%';
    controlsDiv.style.display = 'flex';
    controlsDiv.style.justifyContent = 'center';
    controlsDiv.style.gap = '60px';
    controlsDiv.style.zIndex = '100';
    
    const leftBtn = document.createElement('button');
    leftBtn.innerHTML = '⬅';
    leftBtn.style.fontSize = '30px';
    leftBtn.style.padding = '15px 25px';
    leftBtn.style.borderRadius = '50%';
    leftBtn.style.border = 'none';
    leftBtn.style.background = 'rgba(0,0,0,0.5)';
    leftBtn.style.color = 'white';
    
    const rightBtn = document.createElement('button');
    rightBtn.innerHTML = '➡';
    rightBtn.style.fontSize = '30px';
    rightBtn.style.padding = '15px 25px';
    rightBtn.style.borderRadius = '50%';
    rightBtn.style.border = 'none';
    rightBtn.style.background = 'rgba(0,0,0,0.5)';
    rightBtn.style.color = 'white';
    
    // أحداث اللمس
    leftBtn.addEventListener('touchstart', moveLeft);
    rightBtn.addEventListener('touchstart', moveRight);
    
    // لمنع السلوك الافتراضي
    leftBtn.addEventListener('touchmove', (e) => e.preventDefault());
    rightBtn.addEventListener('touchmove', (e) => e.preventDefault());
    
    controlsDiv.appendChild(leftBtn);
    controlsDiv.appendChild(rightBtn);
    document.body.appendChild(controlsDiv);
}

createTouchButtons();

// بقية الكود كما هي
block.addEventListener('animationiteration', () => {
    const randPos = Math.floor((Math.random() * 3)) * 100;
    block.style.left = randPos + "px";
    score++;  
    scoreElement.innerHTML = `Score: ${score}`;
});

setInterval(() => {
    let playerLeft = parseInt(window.getComputedStyle(player).getPropertyValue('left'));
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue('left'));
    let blockTop = parseInt(window.getComputedStyle(block).getPropertyValue('top'));
    
    if (playerLeft == blockLeft && blockTop < 450 && blockTop > 310) {
        alert(`Game Over! Your Score: ${score}`);
        block.style.top = -100 + 'px';
        score = 0;
        location.reload();
    }
}, 1);