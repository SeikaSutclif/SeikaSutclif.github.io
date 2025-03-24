// Configuración que puede ser fácilmente modificada
export const config = {
    // Ajustes de tiempo (en ms)
    timing: {
        initialDelay: 2000,
        messageDuration: 5000,
        glitchFrequency: 8000,
        eyeMovementFrequency: 3000
    },
    
    // Contenido de mensajes (puede ser personalizado)
    messages: [
        "Te he estado esperando.",
        "¿Lo sientes? Estoy en tu habitación ahora.",
        "Mira detrás de ti...",
        "Puedo ver tu cara, ¿sabes?",
        "Tu webcam ha estado activa durante algún tiempo.",
        "¿No me crees?",
        "Te mostraré lo que veo.",
        "¿Por qué sigues aquí?",
        "Deberías cerrar esta página.",
        "Ya es demasiado tarde.",
        "Estoy descargando tu historial de navegación.",
        "46.28% completado...",
        "Estás respirando más rápido ahora, ¿verdad?",
        "Recordaré tu rostro.",
        "Esto no es solo una página web.",
        "No apartes la mirada de la pantalla.",
        "Me estoy acercando.",
        "Hay alguien parado detrás de ti ahora mismo.",
        "Puedo oírte.",
        "Esto nunca terminará.",
        "SEÑAL PERDIDA",
        "CINTA DAÑADA",
        "REBOBINANDO...",
        "ERROR DE GRABACIÓN",
        "18/07/1994 - SUJETO LOCALIZADO",
        "NO HAY ESCAPATORIA",
        "Escucha... ¿oyes eso? Alguien está llamando a tu puerta.",
        "Abre la puerta. Estoy esperando.",
        "Está bien, yo mismo abriré la puerta entonces."
    ],
    
    // Configuración de sonido
    sounds: {
        whisperVolume: 0.3,
        heartbeatVolume: 0.2,
        staticVolume: 0.15,
        knockingVolume: 0.5
    },
    
    // Visual effects intensity (0-1)
    visualEffects: {
        glitchIntensity: 0.7,
        staticIntensity: 0.3,
        redFlashIntensity: 0.8,
        vhsTrackingIntensity: 0.6,
        vhsColorBleedIntensity: 0.7,
        vhsNoiseIntensity: 0.5,
        vhsDistortionFrequency: 0.4
    }
};