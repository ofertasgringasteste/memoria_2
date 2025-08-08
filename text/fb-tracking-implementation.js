/**
 * IMPLEMENTAÇÃO DO RASTREAMENTO FACEBOOK ADS - PÁGINA TEXT
 * Sales Page - Brain Song
 */

document.addEventListener('DOMContentLoaded', () => {
    const waitForTracking = setInterval(() => {
        if (window.fbTracking) {
            clearInterval(waitForTracking);
            initializeTextPageTracking();
        }
    }, 100);
});

function initializeTextPageTracking() {
    const tracking = window.fbTracking;
    
    const pageConfig = {
        name: 'Brain Song - Sales Page',
        category: 'Saúde - Memória',
        value: 0,
        productId: 'brain-song-sales'
    };

    // Rastreamento inicial da página
    tracking.trackViewContent({
        name: pageConfig.name,
        category: pageConfig.category,
        value: pageConfig.value,
        ids: [pageConfig.productId],
        custom: {
            page_type: 'sales_page',
            product_type: 'brain_health',
            target_audience: 'memory_improvement'
        }
    });

    setupTextPageSpecificTracking();
    console.log('✅ Rastreamento específico da página text inicializado');
}

function setupTextPageSpecificTracking() {
    const tracking = window.fbTracking;

    // Rastreamento do headline principal
    const mainHeadline = document.querySelector('.s1hding1, .s1hding2');
    if (mainHeadline) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('sales_headline_view', {
                        name: 'Headline de Vendas Visualizado',
                        category: 'Sales',
                        custom: {
                            headline_text: mainHeadline.textContent.substring(0, 100),
                            page: 'text'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(mainHeadline);
    }

    // Rastreamento de seções de benefícios
    const benefitSections = document.querySelectorAll('.s1bx, .s2bx, .s3bx');
    benefitSections.forEach((section, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('benefit_section_view', {
                        name: `Seção de Benefício ${index + 1} Visualizada`,
                        category: 'Sales',
                        custom: {
                            section_number: index + 1,
                            section_content: section.textContent.substring(0, 200),
                            page: 'text'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(section);
    });

    // Rastreamento de depoimentos
    const testimonials = document.querySelectorAll('.testimonial, .review, .s1tbx');
    testimonials.forEach((testimonial, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('testimonial_view', {
                        name: `Depoimento ${index + 1} Visualizado`,
                        category: 'Social Proof',
                        custom: {
                            testimonial_number: index + 1,
                            page: 'text'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(testimonial);
    });

    // Rastreamento de botões de compra
    setupPurchaseButtonTracking();
    
    // Rastreamento de garantias
    setupGuaranteeTracking();
    
    // Rastreamento de preços
    setupPricingTracking();
}

function setupPurchaseButtonTracking() {
    const tracking = window.fbTracking;

    const buyButtons = document.querySelectorAll('button, a, [role="button"]');
    buyButtons.forEach(button => {
        const buttonText = button.textContent.toLowerCase();
        
        if (buttonText.includes('comprar') || buttonText.includes('buy') || 
            buttonText.includes('order') || buttonText.includes('adicionar')) {
            
            button.addEventListener('click', (e) => {
                tracking.trackInitiateCheckout({
                    name: 'Início de Checkout - Sales Page',
                    category: 'Saúde - Memória',
                    value: 0, // Ajustar conforme o preço real
                    custom: {
                        button_text: button.textContent.trim(),
                        button_id: button.id || button.className,
                        page: 'text',
                        product_name: 'Brain Song'
                    }
                });
            });
        }
    });
}

function setupGuaranteeTracking() {
    const tracking = window.fbTracking;

    const guaranteeElements = document.querySelectorAll('.guarantee, .warranty, .risk-free');
    guaranteeElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('guarantee_view', {
                        name: 'Garantia Visualizada',
                        category: 'Trust',
                        custom: {
                            guarantee_text: element.textContent.substring(0, 100),
                            page: 'text'
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(element);
    });
}

function setupPricingTracking() {
    const tracking = window.fbTracking;

    const priceElements = document.querySelectorAll('.price, .cost, .value');
    priceElements.forEach(element => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tracking.trackCustomEvent('pricing_view', {
                        name: 'Preço Visualizado',
                        category: 'Sales',
                        custom: {
                            price_text: element.textContent.trim(),
                            page: 'text'
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
window.textPageTracking = {
    trackSalesEvent: function(eventType, eventData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent(eventType, {
                name: `Evento de Venda: ${eventType}`,
                category: 'Sales',
                custom: {
                    page: 'text',
                    ...eventData
                }
            });
        }
    },

    trackUrgencyEvent: function(urgencyType, urgencyData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('urgency_event', {
                name: `Urgência: ${urgencyType}`,
                category: 'Sales',
                custom: {
                    urgency_type: urgencyType,
                    page: 'text',
                    ...urgencyData
                }
            });
        }
    },

    trackObjectionHandling: function(objectionType, objectionData = {}) {
        if (window.fbTracking) {
            window.fbTracking.trackCustomEvent('objection_handling', {
                name: `Tratamento de Objeção: ${objectionType}`,
                category: 'Sales',
                custom: {
                    objection_type: objectionType,
                    page: 'text',
                    ...objectionData
                }
            });
        }
    }
};

// Rastreamento de scroll para identificar pontos de interesse
let scrollMilestones = [25, 50, 75, 90];
let trackedMilestones = new Set();

window.addEventListener('scroll', () => {
    const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    
    scrollMilestones.forEach(milestone => {
        if (scrollPercent >= milestone && !trackedMilestones.has(milestone)) {
            trackedMilestones.add(milestone);
            window.textPageTracking.trackSalesEvent('scroll_milestone', {
                scroll_percentage: milestone,
                page: 'text'
            });
        }
    });
}); 