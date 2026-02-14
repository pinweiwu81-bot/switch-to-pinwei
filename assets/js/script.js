// Game Content Data
const gameContent = {
    'career': {
        title: "Career Mode 💼",
        body: `...` // Fallback content if needed, but we use separate pages now
    },
    'skills': {
        title: "Skill Master ⚡",
        body: `...`
    },
    'story': {
        title: "Pin-Wei's Story 🌲",
        body: `...`
    },
    'connect': {
        title: "Connect Now 📬",
        body: `
            <div style="text-align:center; padding: 20px;">
                <h3>Ready to Start a New Game?</h3>
                <p>I am open for roles in <b>Operations</b>, <b>Customer Success</b>, and <b>Growth</b>.</p>
                <br>
                <h2 style="color:#0095f6">pinweiwu81@gmail.com</h2>
            </div>
        `
    }
};

// Navigation Logic
const library = document.getElementById('gameLibrary');
const games = document.querySelectorAll('.game-item');
let currentIndex = 0;

// Sound Effects
const audioClick = new Audio('assets/click.mp3');
const audioSnap = new Audio('assets/snap.mp3');

function playSound(type) {
    const sound = type === 'snap' ? audioSnap : audioClick;
    sound.volume = 0.2;
    sound.play().catch(e => { /* Ignore missing file error */ });
}

function updateSelection() {
    games.forEach((game, index) => {
        if (index === currentIndex) {
            game.classList.add('active');
            game.focus(); // Ensure it's reachable
        } else {
            game.classList.remove('active');
        }
    });

    const activeGame = games[currentIndex];
    const libraryWidth = library.offsetWidth;
    const itemLeft = activeGame.offsetLeft;
    const itemWidth = activeGame.offsetWidth;
    const scrollPos = itemLeft - (libraryWidth / 2) + (itemWidth / 2);

    library.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
    });

    playSound('click');
}

updateSelection();

// Keyboard Listeners
document.addEventListener('keydown', (e) => {
    // If modal is open
    const modal = document.getElementById('gameModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape' || e.key === 'b' || e.key === 'B') {
            closeModal();
            playSound('snap');
        }
        return;
    }

    if (e.key === 'ArrowRight') {
        if (currentIndex < games.length - 1) {
            currentIndex++;
            updateSelection();
        }
    } else if (e.key === 'ArrowLeft') {
        if (currentIndex > 0) {
            currentIndex--;
            updateSelection();
        }
    } else if (e.key === 'Enter' || e.key === 'a' || e.key === 'A') {
        const gameId = games[currentIndex].dataset.id;
        launchGame(gameId);
        playSound('snap');
    }
});

// Click Interaction
games.forEach((game, index) => {
    game.addEventListener('click', () => {
        currentIndex = index;
        updateSelection();
        const gameId = game.dataset.id;
        launchGame(gameId);
    });
});

// Launch Game Logic
function launchGame(id) {
    if (id === 'career') {
        // Launch 8-Bit Career Mode
        window.location.href = 'pages/game_career.html';
    } else if (id === 'story') {
        // Launch Otome Story Mode
        window.location.href = 'pages/game_story.html';
    } else if (id === 'skills') {
        // Launch Pokemon Battle Mode
        window.location.href = 'pages/game_skills.html';
    } else if (id === 'connect') {
        // Launch Credits / Contact Mode
        window.location.href = 'pages/game_contact.html';
    } else {
        // Fallback to Modal for other games (if any logic fails)
        openModal(id);
    }
}

// Modal Logic
function openModal(id) {
    const modal = document.getElementById('gameModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const content = gameContent[id];

    if (content) {
        title.innerHTML = content.title;
        body.innerHTML = content.body;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.classList.remove('active');
    setTimeout(() => {
        modal.style.display = 'none';
        if (games[currentIndex]) games[currentIndex].focus();
    }, 200);
}

function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    document.getElementById('clock').innerText = timeString;
}
setInterval(updateClock, 1000);
updateClock();
