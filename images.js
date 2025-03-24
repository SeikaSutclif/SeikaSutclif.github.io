// Collection of creepy SVG images for the analog horror experience
export const svgImages = {
    // Distorted face
    distortedFace: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                <feDisplacementMap in="SourceGraphic" scale="10"/>
            </filter>
            <g filter="url(#noise)">
                <circle cx="100" cy="80" r="60" fill="#1a0000" />
                <ellipse cx="80" cy="70" rx="10" ry="15" fill="#300" />
                <ellipse cx="120" cy="70" rx="10" ry="15" fill="#300" />
                <ellipse cx="80" cy="70" rx="5" ry="7" fill="black" />
                <ellipse cx="120" cy="70" rx="5" ry="7" fill="black" />
                <path d="M70 120 Q100 140 130 120" stroke="#600" stroke-width="2" fill="none" />
                <path d="M60 50 Q70 30 90 40" stroke="#300" stroke-width="2" fill="none" />
                <path d="M140 50 Q130 30 110 40" stroke="#300" stroke-width="2" fill="none" />
            </g>
        </svg>
    `,
    
    // Creepy hands reaching
    creepyHands: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="distortion">
                <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" />
                <feDisplacementMap in="SourceGraphic" scale="5" />
            </filter>
            <g filter="url(#distortion)" opacity="0.8">
                <path d="M50 200 C60 180 55 170 65 160 C75 150 70 140 75 130 C80 120 75 110 80 100 C85 90 80 80 85 70" 
                      stroke="#600" stroke-width="3" fill="none" />
                <path d="M70 200 C80 180 75 170 85 160 C95 150 90 140 95 130 C100 120 95 110 100 100 C105 90 100 80 105 70" 
                      stroke="#600" stroke-width="3" fill="none" />
                <path d="M90 200 C100 180 95 170 105 160 C115 150 110 140 115 130 C120 120 115 110 120 100 C125 90 120 80 125 70" 
                      stroke="#600" stroke-width="3" fill="none" />
                <path d="M110 200 C120 180 115 170 125 160 C135 150 130 140 135 130 C140 120 135 110 140 100 C145 90 140 80 145 70" 
                      stroke="#600" stroke-width="3" fill="none" />
                <path d="M130 200 C140 180 135 170 145 160 C155 150 150 140 155 130 C160 120 155 110 160 100 C165 90 160 80 165 70" 
                      stroke="#600" stroke-width="3" fill="none" />
            </g>
        </svg>
    `,
    
    // Glitchy TV static
    staticNoise: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="tvNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="200" height="200" filter="url(#tvNoise)" opacity="0.3"/>
        </svg>
    `,
    
    // Creepy symbols
    occultSymbols: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="none" stroke="#600" stroke-width="2" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="#600" stroke-width="2" />
            <polygon points="100,20 120,80 180,80 130,120 150,180 100,140 50,180 70,120 20,80 80,80" 
                     fill="none" stroke="#600" stroke-width="2" />
            <circle cx="100" cy="100" r="10" fill="#600" />
            <path d="M60,60 L140,140 M60,140 L140,60" stroke="#600" stroke-width="3" />
        </svg>
    `,
    
    // Creepy creature shadow
    creatureShadow: `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="blur">
                <feGaussianBlur stdDeviation="3" />
            </filter>
            <g filter="url(#blur)" opacity="0.7">
                <ellipse cx="100" cy="180" rx="50" ry="10" fill="#300" />
                <path d="M80 180 L85 120 L75 90 L90 70 L85 40 L100 20 L115 40 L110 70 L125 90 L115 120 L120 180" fill="#300" />
                <circle cx="100" cy="15" r="10" fill="#300" />
                <path d="M70 95 L40 80 M130 95 L160 80" stroke="#300" stroke-width="4" />
            </g>
        </svg>
    `
};

// Function to create and append a creepy image element to the document
export function createCreepyImage(svgString, width = 200, height = 200) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'creepy-image';
    imageContainer.style.position = 'fixed';
    imageContainer.style.width = `${width}px`;
    imageContainer.style.height = `${height}px`;
    imageContainer.style.pointerEvents = 'none';
    imageContainer.style.zIndex = '6';
    imageContainer.style.opacity = '0';
    imageContainer.style.transition = 'opacity 0.5s';
    imageContainer.innerHTML = svgString;
    
    // Apply random filters and animations
    const filters = [
        'hue-rotate(90deg) saturate(2)',
        'brightness(0.7) contrast(1.5)',
        'sepia(0.5) hue-rotate(300deg)',
        'invert(0.3) hue-rotate(180deg)'
    ];
    
    imageContainer.style.filter = filters[Math.floor(Math.random() * filters.length)];
    
    document.body.appendChild(imageContainer);
    return imageContainer;
}

// Position the image in a specific location
export function positionCreepyImage(imageElement, x, y) {
    imageElement.style.left = `${x}px`;
    imageElement.style.top = `${y}px`;
}

// Make the image visible with a fade in effect
export function showCreepyImage(imageElement, duration = 3000) {
    setTimeout(() => {
        imageElement.style.opacity = '0.8';
        setTimeout(() => {
            imageElement.style.opacity = '0';
            setTimeout(() => {
                imageElement.remove();
            }, 500);
        }, duration);
    }, 100);
}