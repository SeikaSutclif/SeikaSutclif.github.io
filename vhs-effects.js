// VHS filter effects for the analog horror experience
import { config } from './config.js';

// VHS effect elements
const vhsEffect = document.createElement('div');
const tvSwitch = document.createElement('div');
const timeCode = document.createElement('div');
const timestamp = document.createElement('div');
let recordingStartTime = null;

// Initialize VHS filter elements
export function initVhsEffects() {
    vhsEffect.className = 'vhs-effect';
    tvSwitch.className = 'tv-switch';
    timeCode.className = 'time-code';
    timestamp.className = 'timestamp';
    
    document.body.appendChild(vhsEffect);
    document.body.appendChild(tvSwitch);
    document.body.appendChild(timeCode);
    document.body.appendChild(timestamp);
    
    // Add VHS tracking lines overlay
    const trackingLines = document.createElement('div');
    trackingLines.className = 'tracking-lines';
    document.body.appendChild(trackingLines);
    
    // Add VHS color distortion overlay
    const colorDistortion = document.createElement('div');
    colorDistortion.className = 'color-distortion';
    document.body.appendChild(colorDistortion);
    
    // Add VHS head contamination
    const headContamination = document.createElement('div');
    headContamination.className = 'head-contamination';
    document.body.appendChild(headContamination);
    
    // Initialize recording time
    recordingStartTime = Date.now();
    
    // Start recurring VHS effects
    updateTimeCode();
    updateTimestamp();
    simulateTvNoise();
    
    setInterval(simulateTrackingError, 10000 + Math.random() * 15000);
    setInterval(updateTimeCode, 1000);
    setInterval(simulateTvSwitch, 30000 + Math.random() * 30000);
    setInterval(simulateHeadContamination, 12000 + Math.random() * 8000);
    setInterval(simulateColorDrift, 5000);
}

// Simulate VHS tracking error
export function simulateTrackingError() {
    vhsEffect.style.opacity = '1';
    vhsEffect.style.backgroundImage = `
        repeating-linear-gradient(
            0deg,
            rgba(255,255,255,0.1) 0px,
            rgba(255,255,255,0.1) ${Math.random() * 3}px,
            transparent ${Math.random() * 5}px,
            transparent ${Math.random() * 10}px
        )
    `;
    
    document.body.style.transform = `translateY(${Math.random() * 20 - 10}px)`;
    
    // Track jitter effect
    const trackingLines = document.querySelector('.tracking-lines');
    trackingLines.style.opacity = '1';
    trackingLines.style.transform = `translateY(${Math.random() * 30}px)`;
    
    // Reset after delay
    setTimeout(() => {
        document.body.style.transform = 'none';
        vhsEffect.style.opacity = '0.5';
        trackingLines.style.opacity = '0.3';
        trackingLines.style.transform = 'none';
    }, 1000);
}

// Simulate TV on/off switch
export function simulateTvSwitch() {
    tvSwitch.style.opacity = '1';
    
    setTimeout(() => {
        tvSwitch.style.opacity = '0';
    }, 100);
}

// Generate VHS TV noise
function simulateTvNoise() {
    const noise = document.createElement('canvas');
    const ctx = noise.getContext('2d');
    
    noise.width = window.innerWidth / 4;
    noise.height = window.innerHeight / 4;
    
    function drawNoise() {
        const imageData = ctx.createImageData(noise.width, noise.height);
        const data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            const value = Math.floor(Math.random() * 255 * 0.05);
            data[i] = value;     // red
            data[i+1] = value;   // green
            data[i+2] = value;   // blue
            data[i+3] = 255;     // alpha
        }
        
        ctx.putImageData(imageData, 0, 0);
        vhsEffect.style.backgroundImage = `url(${noise.toDataURL()})`;
        
        requestAnimationFrame(drawNoise);
    }
    
    drawNoise();
}

// Update VHS recorder time code
function updateTimeCode() {
    if (!recordingStartTime) return;
    
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const hours = Math.floor(elapsed / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((elapsed % 3600) / 60).toString().padStart(2, '0');
    const seconds = Math.floor(elapsed % 60).toString().padStart(2, '0');
    const frames = Math.floor((Date.now() % 1000) / 40).toString().padStart(2, '0');
    
    timeCode.textContent = `REC ${hours}:${minutes}:${seconds}:${frames}`;
    
    // Randomly make it blink
    if (Math.random() < 0.1) {
        timeCode.style.visibility = timeCode.style.visibility === 'hidden' ? 'visible' : 'hidden';
    } else {
        timeCode.style.visibility = 'visible';
    }
}

// Update VHS timestamp
function updateTimestamp() {
    // Replace random date with current date
    const currentDate = new Date();
    
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };
    
    timestamp.textContent = currentDate.toLocaleDateString('es-ES', options).replace(/\//g, '-');
}

// Simulate VHS head contamination
function simulateHeadContamination() {
    const headContamination = document.querySelector('.head-contamination');
    headContamination.style.opacity = '0.7';
    headContamination.style.height = `${Math.random() * 10 + 5}px`;
    
    setTimeout(() => {
        headContamination.style.opacity = '0';
    }, 1000 + Math.random() * 2000);
}

// Simulate VHS color drift
function simulateColorDrift() {
    const colorDistortion = document.querySelector('.color-distortion');
    const intensity = Math.random() * 4 + 2;
    
    colorDistortion.style.transform = `translateX(${intensity}px)`;
    
    setTimeout(() => {
        colorDistortion.style.transform = 'translateX(0px)';
    }, 1000 + Math.random() * 2000);
}

// Apply VHS filter to image
export function applyVhsFilterToImage(ctx, width, height) {
    // Add VHS noise
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    
    // Apply scanlines
    for (let i = 0; i < height; i++) {
        if (i % 2 === 0) continue;
        
        for (let j = 0; j < width; j++) {
            const index = (i * width + j) * 4;
            data[index] = Math.min(255, data[index] * 0.9);
            data[index + 1] = Math.min(255, data[index + 1] * 0.9);
            data[index + 2] = Math.min(255, data[index + 2] * 0.9);
        }
    }
    
    // Color channel bleeding
    const copyData = new Uint8ClampedArray(data);
    const offsetX = Math.floor(Math.random() * 8) - 4;
    
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const index = (i * width + j) * 4;
            const redIndex = (i * width + Math.max(0, Math.min(width - 1, j + offsetX))) * 4;
            
            // Red channel shift
            data[index] = copyData[redIndex];
        }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Add horizontal tracking lines
    for (let y = Math.random() * height; y < height; y += 20 + Math.random() * 30) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, y, width, 2);
    }
    
    // Add date stamp
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '14px monospace';
    ctx.fillText(timestamp.textContent, 10, height - 10);
}
