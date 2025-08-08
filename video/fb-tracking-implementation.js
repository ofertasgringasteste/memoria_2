/**
 * IMPLEMENTAÇÃO DO RASTREAMENTO FACEBOOK ADS - PÁGINA VIDEO
 * Video Sales Letter (VSL) - Brain Song
 */

document.addEventListener('DOMContentLoaded', () => {
    const waitForTracking = setInterval(() => {
        if (window.fbTracking) {
            clearInterval(waitForTracking);
            initializeVideoPageTracking();
        }
    }, 100);
});

function initializeVideoPageTracking() {
    const tracking = window.fbTracking;
    
    const pageConfig = {
        name: 'Brain Song - Video Sales Letter',
        category: 'Saúde - Memória',
        value: 0,
        productId: 'brain-song-vsl'
    };

    // Rastreamento inicial da página
    tracking.trackViewContent({
        name: pageConfig.name,
        category: pageConfig.category,
        value: pageConfig.value,
        ids: [pageConfig.productId],
        custom: {
            page_type: 'video_sales_letter',
            product_type: 'brain_health',
            target_audience: 'memory_improvement'
        }
    });

    setupVideoPageSpecificTracking();
    console.log('✅ Rastreamento específico da página video inicializado');
}

function setupVideoPageSpecificTracking() {
    const tracking = window.fbTracking;

    // Rastreamento do headline principal
    const mainHeadline = document.querySelector('.s1hding2, .headline-box');
    if (mainHeadline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('vsl_headline_view', {
                        name: 'Headline VSL Visualizado',
                        category: 'Video Sales',
                        custom: {
                            headline_text: mainHeadline.textContent.substring(0, 100),
                            page: 'video'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(mainHeadline);
    }

    // Rastreamento específico do vídeo
    setupVideoTracking();
    
    // Rastreamento de controles de vídeo
    setupVideoControlsTracking();
    
    // Rastreamento de botões de compra
    setupVSLPurchaseTracking();
    
    // Rastreamento de elementos de urgência
    setupUrgencyTracking();
}

function setupVideoTracking() {
    const tracking = window.fbTracking;

    // Aguarda o carregamento do Wistia
    const waitForWistia = setInterval(() => {
        if (window.Wistia && window.Wistia.api) {
            clearInterval(waitForWistia);
            
            const videos = window.Wistia.api.all();
            videos.forEach(video => {
                // Rastreamento de início do vídeo
                video.bind('play', () => {
                    tracking.trackCustomEvent('vsl_video_start', {
                        name: 'Vídeo VSL Iniciado',
                        category: 'Video Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name,
                            page: 'video'
                        }
                    });
                });

                // Rastreamento de progresso do vídeo
                let progressMilestones = new Set();
                video.bind('timechange', (time) => {
                    const percent = Math.round((time / video.duration()) * 100);
                    const milestones = [10, 25, 50, 75, 90, 100];
                    
                    milestones.forEach(milestone => {
                        if (percent >= milestone && !progressMilestones.has(milestone)) {
                            progressMilestones.add(milestone);
                            
                            tracking.trackCustomEvent('vsl_video_progress', {
                                name: `Vídeo VSL ${milestone}%`,
                                category: 'Video Engagement',
                                custom: {
                                    video_id: video.id,
                                    video_name: video.name,
                                    progress_percentage: milestone,
                                    time_seconds: time,
                                    page: 'video'
                                }
                            });
                        }
                    });
                });

                // Rastreamento de pausa
                video.bind('pause', () => {
                    tracking.trackCustomEvent('vsl_video_pause', {
                        name: 'Vídeo VSL Pausado',
                        category: 'Video Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name,
                            current_time: video.time(),
                            page: 'video'
                        }
                    });
                });

                // Rastreamento de retomada
                video.bind('play', () => {
                    tracking.trackCustomEvent('vsl_video_resume', {
                        name: 'Vídeo VSL Retomado',
                        category: 'Video Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name,
                            current_time: video.time(),
                            page: 'video'
                        }
                    });
                });

                // Rastreamento de conclusão do vídeo
                video.bind('end', () => {
                    tracking.trackCustomEvent('vsl_video_complete', {
                        name: 'Vídeo VSL Completo',
                        category: 'Video Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name,
                            total_duration: video.duration(),
                            page: 'video'
                        }
                    });
                });

                // Rastreamento de cliques no vídeo
                video.bind('click', () => {
                    tracking.trackCustomEvent('vsl_video_click', {
                        name: 'Clique no Vídeo VSL',
                        category: 'Video Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name,
                            current_time: video.time(),
                            page: 'video'
                        }
                    });
                });
            });
        }
    }, 1000);
}

function setupVideoControlsTracking() {
    const tracking = window.fbTracking;

    // Rastreamento de controles de som
    const soundButtons = document.querySelectorAll('.sound-pc, .sound');
    soundButtons.forEach(button => {
        button.addEventListener('click', () => {
            tracking.trackCustomEvent('vsl_sound_toggle', {
                name: 'Controle de Som VSL',
                category: 'Video Controls',
                custom: {
                    button_id: button.id || button.className,
                    page: 'video'
                }
            });
        });
    });

    // Rastreamento de controles de vídeo
    const videoButtons = document.querySelectorAll('.video-pc, .video');
    videoButtons.forEach(button => {
        button.addEventListener('click', () => {
            tracking.trackCustomEvent('vsl_video_control', {
                name: 'Controle de Vídeo VSL',
                category: 'Video Controls',
                custom: {
                    button_id: button.id || button.className,
                    page: 'video'
                }
            });
        });
    });
}

function setupVSLPurchaseTracking() {
    const tracking = window.fbTracking;

    // Rastreamento de botões de compra específicos do VSL
    const buyButtons = document.querySelectorAll('button, a, [role="button"]');
    buyButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('comprar') || buttonText.includes('buy') || 
            buttonText.includes('order') || buttonText.includes('adicionar') ||
            buttonText.includes('quero') || buttonText.includes('agora')) {
            
            button.addEventListener('click', (e) => {
                tracking.trackInitiateCheckout({
                    name: 'Início de Checkout - VSL',
                    category: 'Saúde - Memória',
                    value: 0, // Ajustar conforme o preço real
                    custom: {
                        button_text: button.textContent.trim(),
                        button_id: button.id || button.className,
                        page: 'video',
                        product_name: 'Brain Song',
                        conversion_source: 'video_sales_letter'
                    }
                });
            });
        }
    });
}

function setupUrgencyTracking() {
    const tracking = window.fbTracking;

    // Rastreamento de elementos de urgência
    const urgencyElements = document.querySelectorAll('.urgency, .limited-time, .countdown');
    urgencyElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('vsl_urgency_view', {
                        name: 'Elemento de Urgência VSL Visualizado',
                        category: 'Sales Psychology',
                        custom: {
                            urgency_text: element.textContent.substring(0, 100),
                            page: 'video'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(element);
    });
}

// Funções de utilidade para rastreamento manual
window.videoPageTracking = {
    trackVideoEvent: function(eventType, eventData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent(eventType, {
                name: `Evento de Vídeo: ${eventType}`,
                category: 'Video Sales',
                custom: {
                    page: 'video',
                    ...eventData
                }
            });
        }
    },

    trackVSLMilestone: function(milestoneType, milestoneData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('vsl_milestone', {
                name: `Marco VSL: ${milestoneType}`,
                category: 'Video Sales',
                custom: {
                    milestone_type: milestoneType,
                    page: 'video',
                    ...milestoneData
                }
            });
        }
    },

    trackVideoEngagement: function(engagementType, engagementData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('video_engagement', {
                name: `Engajamento: ${engagementType}`,
                category: 'Video Engagement',
                custom: {
                    engagement_type: engagementType,
                    page: 'video',
                    ...engagementData
                }
            });
        }
    }
};

// Rastreamento de tempo na página VSL
let vslStartTime = Date.now();
let vslMilestones = [30, 60, 120, 300, 600];
let vslTrackedMilestones = new Set();

const vslTimeInterval = setInterval(() => {
    const timeOnPage = Math.round((Date.now() - vslStartTime) / 1000);
    
    vslMilestones.forEach(milestone => {
        if (timeOnPage >= milestone && !vslTrackedMilestones.has(milestone)) {
            vslTrackedMilestones.add(milestone);
            window.videoPageTracking.trackVSLMilestone('time_on_page', {
                time_seconds: milestone,
                page: 'video'
            });
        }
    });
}, 1000);

// Para o tracking quando a página é fechada
window.addEventListener('beforeunload', () => {
    clearInterval(vslTimeInterval);
    const totalTime = Math.round((Date.now() - vslStartTime) / 1000);
    if (totalTime > 30) {
        window.videoPageTracking.trackVSLMilestone('total_time_on_page', {
            total_seconds: totalTime,
            page: 'video'
        });
    }
}); 