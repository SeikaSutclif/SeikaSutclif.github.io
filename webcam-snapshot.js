// Module to handle webcam snapshots and display them on the page
import { config } from './config.js';
import { createGlitchEffect } from './app.js';
import { applyVhsFilterToImage } from './vhs-effects.js';

// Take a webcam snapshot and display it on the page
export function takeAndDisplaySnapshot() {
    const webcam = document.getElementById('webcam');
    const snapshot = document.getElementById('snapshot');
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
    
    // Add VHS effect timestamp to the snapshot
    addVhsTimestamp(context, snapshot.width, snapshot.height);
    
    return new Promise(resolve => {
        // Show the snapshot for a few seconds then hide
        setTimeout(() => {
            snapshot.classList.add('hidden');
            resolve();
        }, config.timing.snapshotDuration || 3000);
    });
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

// Add VHS timestamp to the snapshot
function addVhsTimestamp(ctx, width, height) {
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
    
    const timestamp = currentDate.toLocaleDateString('es-ES', options).replace(/\//g, '-');
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.font = '16px monospace';
    ctx.fillText(timestamp, 10, height - 10);
}