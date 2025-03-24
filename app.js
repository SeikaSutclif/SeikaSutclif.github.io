import { config } from './config.js';
import 'howler';
import { svgImages, createCreepyImage, positionCreepyImage, showCreepyImage } from './images.js';
import { initVhsEffects, simulateTrackingError, simulateTvSwitch, applyVhsFilterToImage } from './vhs-effects.js';

// DOM elements
const startBtn = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');
const mainContent = document.getElementById('main-content');
const messagesContainer = document.getElementById('messages');
const cursorFollower = document.getElementById('cursor-follower');
const glitchOverlay = document.getElementById('glitch-overlay');
const eye = document.getElementById('eye');
const cameraPermission = document.getElementById('camera-permission');
const cameraBtn = document.getElementById('camera-btn');
const webcam = document.getElementById('webcam');
const snapshot = document.getElementById('snapshot');

// State variables
let messageIndex = 0;
let hasStarted = false;
let hasShownSnapshot = false;
let documentHasFocus = true;
let lastActivity = Date.now();
let eyePositions = [];
let mouseX = 0;
let mouseY = 0;

// Sound effects
const sounds = {
    whisper: new Howl({
        src: ['https://assets.codepen.io/21542/howler-push.mp3'],
        volume: config.sounds.whisperVolume,
        loop: false
    }),
    heartbeat: new Howl({
        src: ['https://assets.codepen.io/21542/howler-sfx-levelup.mp3'],
        volume: config.sounds.heartbeatVolume,
        loop: true
    }),
    static: new Howl({
        src: ['https://assets.codepen.io/21542/howler-sfx-leveldown.mp3'],
        volume: config.sounds.staticVolume,
        loop: true
    }),
    knocking: new Howl({
        src: ['https://assets.codepen.io/21542/howler-sfx-levelup.mp3'], // Reusing existing sound as knock
        volume: config.sounds.knockingVolume,
        loop: false,
        rate: 0.5 // Slow down to make it sound like knocking
    })
};

// Initialize the experience
startBtn.addEventListener('click', startExperience);
cameraBtn.addEventListener('click', requestCameraAccess);

// Mouse tracking
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Update cursor follower
    cursorFollower.style.left = `${mouseX + 15}px`;
    cursorFollower.style.top = `${mouseY + 15}px`;
    
    // Show/hide cursor follower randomly
    if (hasStarted && Math.random() < 0.01) {
        cursorFollower.style.opacity = cursorFollower.style.opacity === '0' ? '1' : '0';
    }
    
    lastActivity = Date.now();
});

// Track focus/visibility
document.addEventListener('visibilitychange', () => {
    documentHasFocus = document.visibilityState === 'visible';
    if (hasStarted && documentHasFocus) {
        triggerFocusReaction();
    }
});

window.addEventListener('focus', () => {
    documentHasFocus = true;
    if (hasStarted) {
        triggerFocusReaction();
    }
});

window.addEventListener('blur', () => {
    documentHasFocus = false;
});

// Start the psychological horror experience
function startExperience() {
    hasStarted = true;
    introScreen.classList.add('hidden');
    mainContent.classList.remove('hidden');
    
    // Start ambient sounds
    sounds.heartbeat.play();
    
    // Initialize VHS effects
    initVhsEffects();
    
    // Begin the message sequence
    setTimeout(showNextMessage, config.timing.initialDelay);
    
    // Set up recurring effects
    setInterval(createGlitchEffect, config.timing.glitchFrequency);
    setInterval(moveEye, config.timing.eyeMovementFrequency);
    setInterval(showRandomCreepyImage, 15000); // Show creepy images periodically
    
    // Generate random eye positions
    for (let i = 0; i < 10; i++) {
        eyePositions.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
        });
    }
    
    // Check for inactivity
    setInterval(checkInactivity, 5000);
}

// Show messages one by one
function showNextMessage() {
    if (messageIndex >= config.messages.length) {
        messageIndex = 0; // Loop back to beginning
    }
    
    const message = config.messages[messageIndex];
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;
    
    // Add analog horror text effects randomly
    if (Math.random() < 0.4) {
        messageElement.classList.add('color-aberration');
    }
    
    if (Math.random() < 0.3) {
        messageElement.classList.add('analog-distortion');
    }
    
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(messageElement);
    
    // Trigger a whisper sound with some messages
    if (Math.random() < 0.5) {
        sounds.whisper.play();
    }
    
    // Apply glitch effect to some messages
    if (Math.random() < 0.7) {
        messageElement.classList.add('glitch');
    }
    
    // Show creepy image with certain messages
    if (Math.random() < 0.4) {
        showRandomCreepyImage();
    }
    
    // Show message
    setTimeout(() => {
        messageElement.classList.add('visible');
    }, 100);
    
    // Special triggers based on message content
    if (message.includes('webcam') || message.includes('see your face')) {
        setTimeout(() => {
            eye.style.opacity = '1';
            moveEye();
        }, 1000);
    } else if (message.includes('show you what I see') && !hasShownSnapshot) {
        setTimeout(requestCameraPermissionPrompt, 1000);
    } else if (message.includes('oyes eso') || message.includes('llamando a tu puerta')) {
        // Play knocking sound
        playKnockingSound();
    } else if (message.includes('Abre la puerta')) {
        // Create door effect and intensify
        createDoorEffect();
        simulateTrackingError();
    } else if (message.includes('yo mismo abriré')) {
        // Create maximum horror effect
        simulateDoorOpening();
    }
    
    messageIndex++;
    
    // Schedule next message
    setTimeout(() => {
        messageElement.classList.remove('visible');
        setTimeout(showNextMessage, 1000);
    }, config.timing.messageDuration);
}

// Create visual glitch effects
function createGlitchEffect() {
    // Random glitch overlay
    glitchOverlay.style.opacity = '0.5';
    glitchOverlay.style.left = `${Math.random() * 10 - 5}px`;
    glitchOverlay.style.top = `${Math.random() * 10 - 5}px`;
    glitchOverlay.style.backgroundImage = `
        linear-gradient(
            ${Math.random() * 360}deg,
            var(--glitch-color-1) ${Math.random() * 100}%,
            transparent
        )
    `;
    
    // Screen shake effect
    document.body.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
    
    // Red flash effect
    if (Math.random() < config.visualEffects.redFlashIntensity * 0.3) {
        document.body.style.backgroundColor = '#300';
        setTimeout(() => {
            document.body.style.backgroundColor = 'var(--main-bg)';
        }, 50);
    }
    
    // Add VHS tracking lines
    // Removed, now handled by vhs-effects.js
    
    // Play glitch sound
    if (Math.random() < 0.3) {
        sounds.static.play();
    }
    
    // Reset after a short delay
    setTimeout(() => {
        glitchOverlay.style.opacity = '0';
        document.body.style.transform = 'none';
    }, 300);
}

// Move the eye element to follow or predict user
function moveEye() {
    if (!eye.style.opacity || eye.style.opacity === '0') return;
    
    // Choose between following cursor or jumping to random position
    if (Math.random() < 0.7) {
        // Follow cursor with slight delay/prediction
        const targetX = mouseX + (Math.random() * 100 - 50);
        const targetY = mouseY + (Math.random() * 100 - 50);
        
        eye.style.left = `${targetX}px`;
        eye.style.top = `${targetY}px`;
    } else {
        // Jump to a random pre-defined position (to create unsettling effect)
        const randomPosition = eyePositions[Math.floor(Math.random() * eyePositions.length)];
        eye.style.left = `${randomPosition.x}px`;
        eye.style.top = `${randomPosition.y}px`;
    }
}

// Handle inactivity
function checkInactivity() {
    const inactiveTime = Date.now() - lastActivity;
    
    // If user has been inactive for more than 10 seconds
    if (hasStarted && inactiveTime > 10000) {
        // Trigger a "we're still watching" effect
        createGlitchEffect();
        
        // Show eye if it's hidden
        if (eye.style.opacity === '0' || !eye.style.opacity) {
            eye.style.opacity = '1';
            moveEye();
            
            // Create a whisper sound
            sounds.whisper.play();
        }
    }
}

// React when user returns to the tab
function triggerFocusReaction() {
    // Create an immediate glitch effect
    createGlitchEffect();
    
    // Show a custom message for returning
    const currentMessage = messagesContainer.querySelector('.message');
    if (currentMessage) {
        currentMessage.textContent = "Volviste. Sabía que lo harías.";
        currentMessage.classList.add('glitch');
    }
    
    // Make eye visible and move it
    eye.style.opacity = '1';
    moveEye();
    
    // Play sound
    sounds.whisper.play();
    
    // Show a creepy image when user returns
    showRandomCreepyImage();
}

// Camera snapshot functionality
function requestCameraPermissionPrompt() {
    if (hasShownSnapshot) return;
    cameraPermission.classList.remove('hidden');
}

function requestCameraAccess() {
    cameraPermission.classList.add('hidden');
    
    // Request webcam access
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            webcam.srcObject = stream;
            webcam.play();
            
            // Take snapshot after a short delay
            setTimeout(takeSnapshot, 2000);
        })
        .catch(err => {
            console.error("Camera access denied:", err);
            // If denied, continue with the experience
            showNextMessage();
        });
}

function takeSnapshot() {
    const context = snapshot.getContext('2d');
    
    // Set canvas dimensions to match video
    snapshot.width = webcam.videoWidth;
    snapshot.height = webcam.videoHeight;
    
    // Draw the video frame on the canvas
    context.drawImage(webcam, 0, 0, snapshot.width, snapshot.height);
    
    // Apply glitch effect to the image
    applyImageGlitch(context, snapshot.width, snapshot.height);
    
    // Display the snapshot
    snapshot.classList.remove('hidden');
    snapshot.style.position = 'fixed';
    snapshot.style.top = '50%';
    snapshot.style.left = '50%';
    snapshot.style.transform = 'translate(-50%, -50%)';
    snapshot.style.maxWidth = '80%';
    snapshot.style.maxHeight = '80%';
    snapshot.style.zIndex = '20';
    snapshot.style.opacity = '0.8';
    snapshot.style.filter = 'hue-rotate(180deg) contrast(1.5)';
    
    // Create maximum psychological impact
    createGlitchEffect();
    sounds.whisper.play();
    
    // Show the snapshot briefly then hide
    setTimeout(() => {
        snapshot.classList.add('hidden');
        hasShownSnapshot = true;
        
        // Stop the webcam stream
        const tracks = webcam.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        webcam.srcObject = null;
        
        // Continue with next messages
        showNextMessage();
    }, 3000);
}

// Apply image glitch effects
function applyImageGlitch(ctx, width, height) {
    // Random glitch effects on the image
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Add random noise and distortion
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.1) {
            data[i] = 255;  // R
            data[i+1] = 0;  // G
            data[i+2] = 0;  // B
        }
        
        if (Math.random() < 0.01) {
            const offset = Math.floor(Math.random() * 100) * 4;
            if (i + offset < data.length) {
                data[i] = data[i + offset];
                data[i+1] = data[i+1 + offset];
                data[i+2] = data[i+2 + offset];
            }
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Apply VHS filter effects
    applyVhsFilterToImage(ctx, width, height);
    
    // Add text overlay
    ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
    ctx.font = '24px "Special Elite", cursive';
    ctx.fillText("TE VEO", width/2 - 60, 40);
}

// Show creepy images
function showRandomCreepyImage() {
    if (!hasStarted) return;
    
    // Pick a random image from our collection
    const imageKeys = Object.keys(svgImages);
    const randomImageKey = imageKeys[Math.floor(Math.random() * imageKeys.length)];
    const randomSvg = svgImages[randomImageKey];
    
    // Create the image with a random size
    const size = 150 + Math.floor(Math.random() * 200);
    const creepyImage = createCreepyImage(randomSvg, size, size);
    
    // Position it randomly - prefer corners and edges for more scare effect
    let x, y;
    const positionType = Math.random();
    
    if (positionType < 0.25) {
        // Corner
        x = Math.random() < 0.5 ? 0 : window.innerWidth - size;
        y = Math.random() < 0.5 ? 0 : window.innerHeight - size;
    } else if (positionType < 0.6) {
        // Edge
        if (Math.random() < 0.5) {
            x = Math.random() * (window.innerWidth - size);
            y = Math.random() < 0.5 ? 0 : window.innerHeight - size;
        } else {
            x = Math.random() < 0.5 ? 0 : window.innerWidth - size;
            y = Math.random() * (window.innerHeight - size);
        }
    } else {
        // Random position
        x = Math.random() * (window.innerWidth - size);
        y = Math.random() * (window.innerHeight - size);
    }
    
    positionCreepyImage(creepyImage, x, y);
    
    // Show briefly and then hide
    const duration = 1000 + Math.random() * 3000;
    showCreepyImage(creepyImage, duration);
    
    // Add a glitch effect when showing an image
    createGlitchEffect();
    
    // Sometimes play a whisper when showing an image
    if (Math.random() < 0.7) {
        sounds.whisper.play();
    }
}

// Play knocking sound effect
function playKnockingSound() {
    sounds.knocking.play();
    
    // Repeat knocking 3 times
    setTimeout(() => sounds.knocking.play(), 1500);
    setTimeout(() => sounds.knocking.play(), 3000);
    
    // Make the screen slightly shake with each knock
    document.body.style.transform = 'translate(5px, 0)';
    setTimeout(() => {
        document.body.style.transform = 'translate(-5px, 0)';
        setTimeout(() => {
            document.body.style.transform = 'none';
        }, 200);
    }, 200);
}

// Create door effect
function createDoorEffect() {
    // Add door visual element
    const door = document.createElement('div');
    door.id = 'scary-door';
    door.style.position = 'fixed';
    door.style.width = '100%';
    door.style.height = '100%';
    door.style.background = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Crect x=\'10\' y=\'5\' width=\'80\' height=\'90\' fill=\'%23200000\' /%3E%3C/svg%3E") center/cover no-repeat';
    door.style.opacity = '0';
    door.style.transition = 'opacity 2s';
    door.style.zIndex = '5';
    
    document.body.appendChild(door);
    
    // Fade in door
    setTimeout(() => {
        door.style.opacity = '0.7';
        sounds.heartbeat.rate(1.5); // Speed up heartbeat
    }, 500);
}

// Simulate door opening with maximum horror effect
function simulateDoorOpening() {
    // Maximum glitch effects
    createGlitchEffect();
    simulateTrackingError();
    
    const door = document.getElementById('scary-door');
    if (door) {
        // Door opening animation
        door.style.transition = 'transform 3s, opacity 4s';
        door.style.transformOrigin = 'left';
        door.style.transform = 'perspective(500px) rotateY(70deg)';
        
        // Create a figure silhouette behind the door
        const silhouette = document.createElement('div');
        silhouette.style.position = 'fixed';
        silhouette.style.width = '100%';
        silhouette.style.height = '100%';
        silhouette.style.background = 'black';
        silhouette.style.clipPath = 'polygon(45% 0, 55% 0, 60% 15%, 55% 30%, 60% 45%, 57% 60%, 60% 85%, 55% 100%, 45% 100%, 40% 85%, 43% 60%, 40% 45%, 45% 30%, 40% 15%)';
        silhouette.style.zIndex = '4';
        silhouette.style.opacity = '0';
        
        document.body.appendChild(silhouette);
        
        // Show silhouette slowly
        setTimeout(() => {
            silhouette.style.transition = 'opacity 2s';
            silhouette.style.opacity = '1';
            sounds.whisper.play();
            sounds.static.play();
            
            // Full screen glitch
            document.body.style.animation = 'glitch 0.2s infinite';
            
            // Create red flash
            document.body.style.backgroundColor = '#300';
            setTimeout(() => {
                document.body.style.backgroundColor = 'var(--main-bg)';
            }, 100);
            
            // Show multiple creepy images
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    showRandomCreepyImage();
                }, i * 500);
            }
        }, 2000);
    }
}