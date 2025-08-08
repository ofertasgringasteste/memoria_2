/**
 * IMPLEMENTAÇÃO DO RASTREAMENTO FACEBOOK ADS - PÁGINA 1
 * Landing Page - MIT Researcher
 */

// Aguarda o carregamento do sistema principal
document.addEventListener('DOMContentLoaded', () => {
    // Aguarda o sistema de rastreamento estar disponível
    const waitForTracking = setInterval(() => {
        if (window.fbTracking) {
            clearInterval(waitForTracking);
            initializePag1Tracking();
        }
    }, 100);
});

function initializePag1Tracking() {
    const tracking = window.fbTracking;
    
    // Configurações específicas da página
    const pageConfig = {
        name: 'MIT Researcher - Landing Page',
        category: 'Saúde - Memória',
        value: 0,
        productId: 'brain-song-landing'
    };

    // Rastreamento inicial da página
    tracking.trackViewContent({
        name: pageConfig.name,
        category: pageConfig.category,
        value: pageConfig.value,
        ids: [pageConfig.productId],
        custom: {
            page_type: 'landing_page',
            product_type: 'brain_health',
            target_audience: 'memory_improvement'
        }
    });

    // Rastreamento de elementos específicos da página
    setupSpecificTracking();
    
    console.log('✅ Rastreamento específico da página 1 inicializado');
}

function setupSpecificTracking() {
    const tracking = window.fbTracking;

    // Rastreamento do título principal
    const mainHeadline = document.querySelector('.s1hding1, .s1hding2');
    if (mainHeadline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('headline_view', {
                        name: 'Título Principal Visualizado',
                        category: 'Engagement',
                        custom: {
                            headline_text: mainHeadline.textContent.substring(0, 100),
                            element_id: mainHeadline.id || 'main-headline'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(mainHeadline);
    }

    // Rastreamento da caixa de depoimento
    const testimonialBox = document.querySelector('.s1tbx');
    if (testimonialBox) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('testimonial_view', {
                        name: 'Depoimento Visualizado',
                        category: 'Social Proof',
                        custom: {
                            testimonial_type: 'doctor_testimonial',
                            doctor_name: 'Dr. James Rivers'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(testimonialBox);
    }

    // Rastreamento da lista de benefícios
    const benefitsList = document.querySelector('.s1bx-list');
    if (benefitsList) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('benefits_view', {
                        name: 'Benefícios Visualizados',
                        category: 'Engagement',
                        custom: {
                            benefits_count: entry.target.children.length,
                            benefits_type: 'memory_improvement'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(benefitsList);
    }

    // Rastreamento de cliques em links específicos
    setupLinkTracking();
    
    // Rastreamento de formulários específicos
    setupFormTracking();
}

function setupLinkTracking() {
    const tracking = window.fbTracking;

    // Rastreamento de links para a página de texto
    const textPageLinks = document.querySelectorAll('a[href*="text"], a[href*="sales"]');
    textPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            tracking.trackCustomEvent('text_page_click', {
                name: 'Clique para Página de Vendas',
                category: 'Navigation',
                custom: {
                    link_text: link.textContent.trim(),
                    link_url: link.href,
                    destination_page: 'sales_page'
                }
            });
        });
    });

    // Rastreamento de links para a página de vídeo
    const videoPageLinks = document.querySelectorAll('a[href*="video"], a[href*="vsl"]');
    videoPageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            tracking.trackCustomEvent('video_page_click', {
                name: 'Clique para Página de Vídeo',
                category: 'Navigation',
                custom: {
                    link_text: link.textContent.trim(),
                    link_url: link.href,
                    destination_page: 'video_sales_letter'
                }
            });
        });
    });
}

function setupFormTracking() {
    const tracking = window.fbTracking;

    // Rastreamento de formulários de lead
    const leadForms = document.querySelectorAll('form');
    leadForms.forEach(form => {
        // Rastreamento de início de preenchimento
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                tracking.trackCustomEvent('form_field_focus', {
                    name: 'Campo de Formulário Focado',
                    category: 'Lead Generation',
                    custom: {
                        form_id: form.id || 'lead_form',
                        field_name: input.name || input.id,
                        field_type: input.type
                    }
                });
            });
        });

        // Rastreamento de submissão
        form.addEventListener('submit', (e) => {
            tracking.trackLead({
                name: 'Lead Capturado - Landing Page',
                category: 'Saúde - Memória',
                source: 'landing_page',
                type: 'form_submission',
                custom: {
                    form_id: form.id || 'lead_form',
                    form_action: form.action,
                    page_source: 'pag1'
                }
            });
        });
    });
}

// Funções de utilidade para rastreamento manual
window.pag1Tracking = {
    // Rastreamento manual de visualização de seção
    trackSectionView: function(sectionName, sectionData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('section_view', {
                name: `Seção ${sectionName} Visualizada`,
                category: 'Engagement',
                custom: {
                    section_name: sectionName,
                    page: 'pag1',
                    ...sectionData
                }
            });
        }
    },

    // Rastreamento manual de interação
    trackInteraction: function(interactionType, interactionData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('user_interaction', {
                name: `Interação: ${interactionType}`,
                category: 'Engagement',
                custom: {
                    interaction_type: interactionType,
                    page: 'pag1',
                    ...interactionData
                }
            });
        }
    },

    // Rastreamento de tempo de leitura
    trackReadingTime: function(seconds) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('reading_time', {
                name: `Tempo de Leitura: ${seconds}s`,
                category: 'Engagement',
                custom: {
                    reading_seconds: seconds,
                    page: 'pag1'
                }
            });
        }
    }
};

// Rastreamento automático de tempo de leitura
let readingStartTime = Date.now();
window.addEventListener('beforeunload', () => {
    const readingTime = Math.round((Date.now() - readingStartTime) / 1000);
    if (readingTime > 30) { // Só rastreia se ficou mais de 30 segundos
        window.pag1Tracking.trackReadingTime(readingTime);
    }
}); 