/**
 * SISTEMA DE RASTREAMENTO AVANÇADO PARA FACEBOOK ADS
 * Versão: 2.0
 * Data: 2024
 * 
 * Este sistema inclui:
 * - Pixel do Facebook configurado
 * - Eventos personalizados
 * - Rastreamento de conversões
 * - Sistema de UTM tracking
 * - Analytics avançados
 */

// Configurações do Pixel
const FB_PIXEL_CONFIG = {
    pixelId: '1478137953324470',
    accessToken: 'EAARAixYN78IBPDf9arUDfM6ZBfXZAZBiW098fBMilrCRqLX4sPjZCr09PK2suvtej3HKLfB6gmJh00hnOOLZAp4Pstc4FlWHgkHlYdFczZBZAsIjAtI3Ju8GCAfCgCDcVlqPgS1moOwv9kbegkbAkU6ZCmxQAWh5ZAm6fkqcFd1uoFMpmfS5ZCtyKZBLXhBZBfZBJ3VQtIAZDZD',
    events: {
        pageView: 'PageView',
        viewContent: 'ViewContent',
        addToCart: 'AddToCart',
        initiateCheckout: 'InitiateCheckout',
        purchase: 'Purchase',
        lead: 'Lead',
        completeRegistration: 'CompleteRegistration',
        custom: 'CustomEvent'
    }
};

// Classe principal do sistema de rastreamento
class FacebookTrackingSystem {
    constructor() {
        this.pixelId = FB_PIXEL_CONFIG.pixelId;
        this.accessToken = FB_PIXEL_CONFIG.accessToken;
        this.events = FB_PIXEL_CONFIG.events;
        this.userData = {};
        this.sessionData = {};
        this.conversionData = {};
        this.init();
    }

    // Inicialização do sistema
    init() {
        this.loadFacebookPixel();
        this.setupEventListeners();
        this.trackPageView();
        this.setupUTMTracking();
        this.initializeAnalytics();
        console.log('✅ Sistema de rastreamento Facebook Ads inicializado');
    }

    // Carrega o Pixel do Facebook
    loadFacebookPixel() {
        // Carrega o script do Facebook Pixel
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        
        fbq('init', this.pixelId);
        fbq('track', 'PageView');
    }

    // Configura listeners de eventos
    setupEventListeners() {
        // Rastreamento de cliques em botões
        document.addEventListener('click', (e) => {
            this.trackButtonClick(e);
        });

        // Rastreamento de scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.trackScrollDepth();
            }, 100);
        });

        // Rastreamento de tempo na página
        this.trackTimeOnPage();

        // Rastreamento de formulários
        document.addEventListener('submit', (e) => {
            this.trackFormSubmission(e);
        });

        // Rastreamento de vídeos
        this.setupVideoTracking();
    }

    // Rastreamento de visualização de página
    trackPageView() {
        const pageData = {
            content_name: document.title,
            content_category: this.getPageCategory(),
            content_type: 'product',
            value: this.getPageValue(),
            currency: 'BRL',
            user_data: this.getUserData(),
            custom_data: {
                page_url: window.location.href,
                referrer: document.referrer,
                user_agent: navigator.userAgent,
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.pageView, pageData);
        this.logEvent('PageView', pageData);
    }

    // Rastreamento de visualização de conteúdo
    trackViewContent(contentData = {}) {
        const eventData = {
            content_name: contentData.name || document.title,
            content_category: contentData.category || this.getPageCategory(),
            content_type: contentData.type || 'product',
            value: contentData.value || this.getPageValue(),
            currency: 'BRL',
            content_ids: contentData.ids || [],
            user_data: this.getUserData(),
            custom_data: {
                ...contentData.custom,
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.viewContent, eventData);
        this.logEvent('ViewContent', eventData);
    }

    // Rastreamento de adição ao carrinho
    trackAddToCart(productData = {}) {
        const eventData = {
            content_name: productData.name || 'Produto',
            content_category: productData.category || 'Saúde',
            content_type: 'product',
            value: productData.value || 0,
            currency: 'BRL',
            content_ids: productData.ids || [],
            num_items: productData.quantity || 1,
            user_data: this.getUserData(),
            custom_data: {
                product_id: productData.id,
                product_name: productData.name,
                product_price: productData.price,
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.addToCart, eventData);
        this.logEvent('AddToCart', eventData);
    }

    // Rastreamento de início de checkout
    trackInitiateCheckout(checkoutData = {}) {
        const eventData = {
            content_name: checkoutData.name || 'Checkout',
            content_category: checkoutData.category || 'Saúde',
            content_type: 'product',
            value: checkoutData.value || 0,
            currency: 'BRL',
            content_ids: checkoutData.ids || [],
            num_items: checkoutData.quantity || 1,
            user_data: this.getUserData(),
            custom_data: {
                checkout_id: this.generateCheckoutId(),
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.initiateCheckout, eventData);
        this.logEvent('InitiateCheckout', eventData);
    }

    // Rastreamento de compra
    trackPurchase(purchaseData = {}) {
        const eventData = {
            content_name: purchaseData.name || 'Compra',
            content_category: purchaseData.category || 'Saúde',
            content_type: 'product',
            value: purchaseData.value || 0,
            currency: 'BRL',
            content_ids: purchaseData.ids || [],
            num_items: purchaseData.quantity || 1,
            order_id: purchaseData.orderId || this.generateOrderId(),
            user_data: this.getUserData(),
            custom_data: {
                payment_method: purchaseData.paymentMethod,
                shipping_method: purchaseData.shippingMethod,
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.purchase, eventData);
        this.logEvent('Purchase', eventData);
        
        // Salva dados da conversão
        this.saveConversionData(eventData);
    }

    // Rastreamento de leads
    trackLead(leadData = {}) {
        const eventData = {
            content_name: leadData.name || 'Lead',
            content_category: leadData.category || 'Saúde',
            content_type: 'product',
            value: leadData.value || 0,
            currency: 'BRL',
            user_data: this.getUserData(),
            custom_data: {
                lead_source: leadData.source || 'website',
                lead_type: leadData.type || 'form',
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.lead, eventData);
        this.logEvent('Lead', eventData);
    }

    // Rastreamento de registro completo
    trackCompleteRegistration(registrationData = {}) {
        const eventData = {
            content_name: registrationData.name || 'Registro',
            content_category: registrationData.category || 'Saúde',
            content_type: 'product',
            value: registrationData.value || 0,
            currency: 'BRL',
            user_data: this.getUserData(),
            custom_data: {
                registration_source: registrationData.source || 'website',
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', this.events.completeRegistration, eventData);
        this.logEvent('CompleteRegistration', eventData);
    }

    // Evento personalizado
    trackCustomEvent(eventName, eventData = {}) {
        const customEventData = {
            content_name: eventData.name || eventName,
            content_category: eventData.category || 'Custom',
            content_type: 'product',
            value: eventData.value || 0,
            currency: 'BRL',
            user_data: this.getUserData(),
            custom_data: {
                ...eventData.custom,
                timestamp: new Date().toISOString()
            }
        };

        fbq('track', eventName, customEventData);
        this.logEvent(eventName, customEventData);
    }

    // Rastreamento de cliques em botões
    trackButtonClick(event) {
        const button = event.target.closest('button, a, [role="button"]');
        if (!button) return;

        const buttonText = button.textContent.trim();
        const buttonId = button.id || button.className;
        const buttonHref = button.href || '';

        // Identifica tipo de botão baseado no texto ou classe
        let eventType = 'button_click';
        let eventData = {};

        if (buttonText.toLowerCase().includes('comprar') || 
            buttonText.toLowerCase().includes('buy') ||
            buttonText.toLowerCase().includes('order')) {
            eventType = 'buy_button_click';
            eventData = {
                name: 'Botão Comprar',
                category: 'Saúde',
                value: this.getPageValue(),
                custom: {
                    button_text: buttonText,
                    button_id: buttonId,
                    button_url: buttonHref
                }
            };
        } else if (buttonText.toLowerCase().includes('assistir') || 
                   buttonText.toLowerCase().includes('watch') ||
                   buttonText.toLowerCase().includes('vídeo')) {
            eventType = 'video_button_click';
            eventData = {
                name: 'Botão Vídeo',
                category: 'Saúde',
                custom: {
                    button_text: buttonText,
                    button_id: buttonId
                }
            };
        } else if (buttonText.toLowerCase().includes('saiba mais') || 
                   buttonText.toLowerCase().includes('learn more')) {
            eventType = 'learn_more_click';
            eventData = {
                name: 'Saiba Mais',
                category: 'Saúde',
                custom: {
                    button_text: buttonText,
                    button_id: buttonId
                }
            };
        }

        this.trackCustomEvent(eventType, eventData);
    }

    // Rastreamento de profundidade de scroll
    trackScrollDepth() {
        const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        
        // Rastreia apenas em marcos específicos
        const milestones = [25, 50, 75, 90];
        if (milestones.includes(scrollPercent)) {
            this.trackCustomEvent('scroll_depth', {
                name: `Scroll ${scrollPercent}%`,
                category: 'Engagement',
                custom: {
                    scroll_percentage: scrollPercent,
                    page_url: window.location.href
                }
            });
        }
    }

    // Rastreamento de tempo na página
    trackTimeOnPage() {
        let timeOnPage = 0;
        const interval = setInterval(() => {
            timeOnPage += 10;
            
            // Rastreia em marcos de tempo
            const milestones = [30, 60, 120, 300, 600];
            if (milestones.includes(timeOnPage)) {
                this.trackCustomEvent('time_on_page', {
                    name: `Tempo na Página ${timeOnPage}s`,
                    category: 'Engagement',
                    custom: {
                        time_seconds: timeOnPage,
                        page_url: window.location.href
                    }
                });
            }
        }, 10000); // A cada 10 segundos

        // Para o tracking quando a página é fechada
        window.addEventListener('beforeunload', () => {
            clearInterval(interval);
        });
    }

    // Rastreamento de submissão de formulários
    trackFormSubmission(event) {
        const form = event.target;
        const formId = form.id || form.className;
        const formAction = form.action || '';

        this.trackLead({
            name: 'Formulário Preenchido',
            category: 'Saúde',
            source: 'form',
            type: formId,
            custom: {
                form_id: formId,
                form_action: formAction,
                form_fields: this.getFormFields(form)
            }
        });
    }

    // Configuração de rastreamento de vídeo
    setupVideoTracking() {
        // Rastreamento para vídeos do Wistia
        if (window.Wistia) {
            window.Wistia.api.all().forEach(video => {
                video.bind('play', () => {
                    this.trackCustomEvent('video_play', {
                        name: 'Vídeo Iniciado',
                        category: 'Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name
                        }
                    });
                });

                video.bind('timechange', (time) => {
                    const percent = Math.round((time / video.duration()) * 100);
                    const milestones = [25, 50, 75, 90, 100];
                    
                    if (milestones.includes(percent)) {
                        this.trackCustomEvent('video_progress', {
                            name: `Vídeo ${percent}%`,
                            category: 'Engagement',
                            custom: {
                                video_id: video.id,
                                video_name: video.name,
                                progress_percentage: percent
                            }
                        });
                    }
                });

                video.bind('end', () => {
                    this.trackCustomEvent('video_complete', {
                        name: 'Vídeo Completo',
                        category: 'Engagement',
                        custom: {
                            video_id: video.id,
                            video_name: video.name
                        }
                    });
                });
            });
        }
    }

    // Configuração de UTM tracking
    setupUTMTracking() {
        const urlParams = new URLSearchParams(window.location.search);
        const utmParams = {
            utm_source: urlParams.get('utm_source'),
            utm_medium: urlParams.get('utm_medium'),
            utm_campaign: urlParams.get('utm_campaign'),
            utm_term: urlParams.get('utm_term'),
            utm_content: urlParams.get('utm_content')
        };

        // Salva UTM params no sessionStorage
        if (Object.values(utmParams).some(param => param)) {
            sessionStorage.setItem('fb_utm_params', JSON.stringify(utmParams));
        }

        // Adiciona UTM params aos eventos
        this.utmParams = utmParams;
    }

    // Inicialização do analytics
    initializeAnalytics() {
        // Configura Google Analytics se disponível
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GTM-PVX2RXCL', {
                custom_map: {
                    'custom_parameter_1': 'fb_pixel_id',
                    'custom_parameter_2': 'utm_source',
                    'custom_parameter_3': 'utm_campaign'
                }
            });
        }

        // Configura dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            'fb_pixel_id': this.pixelId,
            'utm_source': this.utmParams?.utm_source,
            'utm_campaign': this.utmParams?.utm_campaign
        });
    }

    // Métodos auxiliares
    getUserData() {
        return {
            em: this.hashData(this.getCookie('user_email') || ''),
            ph: this.hashData(this.getCookie('user_phone') || ''),
            external_id: this.getCookie('user_id') || '',
            client_ip_address: this.getClientIP(),
            client_user_agent: navigator.userAgent,
            fbc: this.getCookie('_fbc') || '',
            fbp: this.getCookie('_fbp') || ''
        };
    }

    getPageCategory() {
        const path = window.location.pathname;
        if (path.includes('pag1')) return 'Landing Page';
        if (path.includes('text')) return 'Sales Page';
        if (path.includes('video')) return 'Video Sales Letter';
        return 'Saúde';
    }

    getPageValue() {
        // Valor baseado na página
        const path = window.location.pathname;
        if (path.includes('pag1')) return 0;
        if (path.includes('text')) return 0;
        if (path.includes('video')) return 0;
        return 0;
    }

    getFormFields(form) {
        const fields = {};
        const formElements = form.elements;
        
        for (let i = 0; i < formElements.length; i++) {
            const element = formElements[i];
            if (element.name && element.type !== 'submit') {
                fields[element.name] = element.type;
            }
        }
        
        return fields;
    }

    generateCheckoutId() {
        return 'checkout_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    generateOrderId() {
        return 'order_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    hashData(data) {
        if (!data) return '';
        // Implementar hash SHA256 se necessário
        return btoa(data).replace(/[^a-zA-Z0-9]/g, '');
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
    }

    getClientIP() {
        // Implementar detecção de IP se necessário
        return '';
    }

    saveConversionData(data) {
        this.conversionData = {
            ...this.conversionData,
            [data.order_id]: {
                ...data,
                timestamp: new Date().toISOString()
            }
        };
        
        // Salva no localStorage
        localStorage.setItem('fb_conversions', JSON.stringify(this.conversionData));
    }

    logEvent(eventName, eventData) {
        console.log(`📊 Facebook Event: ${eventName}`, eventData);
        
        // Envia para analytics interno se necessário
        if (window.dataLayer) {
            window.dataLayer.push({
                event: 'fb_event',
                fb_event_name: eventName,
                fb_event_data: eventData
            });
        }
    }

    // Métodos públicos para uso externo
    trackProductView(productData) {
        this.trackViewContent(productData);
    }

    trackAddToCartEvent(productData) {
        this.trackAddToCart(productData);
    }

    trackPurchaseEvent(purchaseData) {
        this.trackPurchase(purchaseData);
    }

    trackLeadEvent(leadData) {
        this.trackLead(leadData);
    }

    // Relatórios
    getConversionReport() {
        return this.conversionData;
    }

    getUTMReport() {
        return this.utmParams;
    }
}

// Inicialização automática quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    window.fbTracking = new FacebookTrackingSystem();
});

// Exporta para uso em outros scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FacebookTrackingSystem;
} 