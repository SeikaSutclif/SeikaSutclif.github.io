// Module to handle webcam activation and recording
import { config } from './config.js';

// Web camera stream reference
let webcamStream = null;
let isWebcamActive = false;
let hiddenWebcam = null;

// Initialize hidden webcam element
export function initHiddenWebcam() {
    // Create a hidden video element for the webcam
    hiddenWebcam = document.createElement('video');
    hiddenWebcam.id = 'hidden-webcam';
    hiddenWebcam.style.position = 'fixed';
    hiddenWebcam.style.opacity = '0';
    hiddenWebcam.style.pointerEvents = 'none';
    hiddenWebcam.style.width = '1px';
    hiddenWebcam.style.height = '1px';
    hiddenWebcam.style.overflow = 'hidden';
    document.body.appendChild(hiddenWebcam);
}

// Secretly activate webcam without user permission prompt
export function activateWebcamSilently() {
    if (isWebcamActive || !hiddenWebcam) return;
    
    // Try to access webcam without showing a browser prompt
    // Note: Modern browsers will still show permission prompt for security reasons
    navigator.mediaDevices.getUserMedia({ 
        video: { 
            facingMode: 'user',
            width: { ideal: 320 },
            height: { ideal: 240 }
        }, 
        audio: false 
    })
    .then(stream => {
        webcamStream = stream;
        hiddenWebcam.srcObject = stream;
        hiddenWebcam.play();
        isWebcamActive = true;
        
        // Simulate recording after a short delay
        setTimeout(() => {
            // Flash a recording indicator briefly
            const recIndicator = document.createElement('div');
            recIndicator.textContent = "REC";
            recIndicator.style.position = 'fixed';
            recIndicator.style.top = '20px';
            recIndicator.style.right = '20px';
            recIndicator.style.color = 'red';
            recIndicator.style.padding = '5px';
            recIndicator.style.fontFamily = 'monospace';
            recIndicator.style.opacity = '0';
            recIndicator.style.transition = 'opacity 0.3s';
            recIndicator.style.zIndex = '1000';
            document.body.appendChild(recIndicator);
            
            setTimeout(() => {
                recIndicator.style.opacity = '0.7';
                setTimeout(() => {
                    recIndicator.style.opacity = '0';
                    setTimeout(() => recIndicator.remove(), 300);
                }, 2000);
            }, 100);
        }, 3000);
    })
    .catch(err => {
        console.log("Camera access unavailable", err);
    });
}

// Stop webcam if it was activated
export function stopHiddenWebcam() {
    if (!isWebcamActive || !webcamStream) return;
    
    const tracks = webcamStream.getTracks();
    tracks.forEach(track => track.stop());
    
    webcamStream = null;
    isWebcamActive = false;
}