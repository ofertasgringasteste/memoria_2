/**
 * CONFIGURAÇÃO CENTRALIZADA DO SISTEMA DE RASTREAMENTO FACEBOOK ADS
 * Versão: 2.0
 */

const FB_TRACKING_CONFIG = {
    // Configurações do Pixel
    pixel: {
        id: '1478137953324470',
        accessToken: 'EAARAixYN78IBPDf9arUDfM6ZBfXZAZBiW098fBMilrCRqLX4sPjZCr09PK2suvtej3HKLfB6gmJh00hnOOLZAp4Pstc4FlWHgkHlYdFczZBZAsIjAtI3Ju8GCAfCgCDcVlqPgS1moOwv9kbegkbAkU6ZCmxQAWh5ZAm6fkqcFd1uoFMpmfS5ZCtyKZBLXhBZBfZBJ3VQtIAZDZD',
        currency: 'BRL',
        language: 'pt_BR'
    },

    // Configurações do produto
    product: {
        name: 'Brain Song',
        category: 'Saúde - Memória',
        type: 'brain_health',
        targetAudience: 'memory_improvement',
        price: 0, // Ajustar conforme necessário
        variants: {
            basic: { id: 'brain-song-basic', price: 0 },
            premium: { id: 'brain-song-premium', price: 0 },
            vip: { id: 'brain-song-vip', price: 0 }
        }
    },

    // Configurações das páginas
    pages: {
        pag1: {
            name: 'MIT Researcher - Landing Page',
            type: 'landing_page',
            value: 0,
            productId: 'brain-song-landing',
            events: {
                headline_view: { value: 0 },
                testimonial_view: { value: 0 },
                benefits_view: { value: 0 },
                form_submission: { value: 0 }
            }
        },
        text: {
            name: 'Brain Song - Sales Page',
            type: 'sales_page',
            value: 0,
            productId: 'brain-song-sales',
            events: {
                sales_headline_view: { value: 0 },
                benefit_section_view: { value: 0 },
                testimonial_view: { value: 0 },
                guarantee_view: { value: 0 },
                pricing_view: { value: 0 },
                initiate_checkout: { value: 0 }
            }
        },
        video: {
            name: 'Brain Song - Video Sales Letter',
            type: 'video_sales_letter',
            value: 0,
            productId: 'brain-song-vsl',
            events: {
                vsl_headline_view: { value: 0 },
                vsl_video_start: { value: 0 },
                vsl_video_progress: { value: 0 },
                vsl_video_complete: { value: 0 },
                vsl_urgency_view: { value: 0 },
                initiate_checkout: { value: 0 }
            }
        }
    },

    // Configurações de eventos personalizados
    customEvents: {
        // Eventos de engajamento
        engagement: {
            scroll_depth: { value: 0 },
            time_on_page: { value: 0 },
            reading_time: { value: 0 },
            user_interaction: { value: 0 }
        },

        // Eventos de vídeo
        video: {
            video_play: { value: 0 },
            video_progress: { value: 0 },
            video_complete: { value: 0 },
            video_pause: { value: 0 },
            video_resume: { value: 0 }
        },

        // Eventos de vendas
        sales: {
            buy_button_click: { value: 0 },
            video_button_click: { value: 0 },
            learn_more_click: { value: 0 },
            urgency_event: { value: 0 },
            objection_handling: { value: 0 }
        },

        // Eventos de lead generation
        leadGeneration: {
            form_field_focus: { value: 0 },
            form_submission: { value: 0 },
            lead_captured: { value: 0 }
        }
    },

    // Configurações de UTM
    utm: {
        parameters: ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'],
        storage: 'sessionStorage',
        key: 'fb_utm_params'
    },

    // Configurações de analytics
    analytics: {
        googleAnalytics: {
            enabled: true,
            trackingId: 'GTM-PVX2RXCL'
        },
        dataLayer: {
            enabled: true,
            name: 'dataLayer'
        },
        console: {
            enabled: true,
            prefix: '📊 Facebook Event:'
        }
    },

    // Configurações de performance
    performance: {
        scrollThrottle: 100,
        timeInterval: 10000,
        maxRetries: 3,
        timeout: 5000
    },

    // Configurações de debug
    debug: {
        enabled: false,
        verbose: false,
        logEvents: true,
        logErrors: true
    }
};

// Funções de utilidade para configuração
const FBConfig = {
    // Obtém configuração da página atual
    getCurrentPageConfig: function() {
        const path = window.location.pathname;
        if (path.includes('pag1')) return FB_TRACKING_CONFIG.pages.pag1;
        if (path.includes('text')) return FB_TRACKING_CONFIG.pages.text;
        if (path.includes('video')) return FB_TRACKING_CONFIG.pages.video;
        return FB_TRACKING_CONFIG.pages.pag1; // Default
    },

    // Obtém valor de evento
    getEventValue: function(eventName) {
        const pageConfig = this.getCurrentPageConfig();
        const customEvents = FB_TRACKING_CONFIG.customEvents;
        
        // Procura na página atual
        if (pageConfig.events && pageConfig.events[eventName]) {
            return pageConfig.events[eventName].value;
        }
        
        // Procura nos eventos customizados
        for (const category in customEvents) {
            if (customEvents[category][eventName]) {
                return customEvents[category][eventName].value;
            }
        }
        
        return 0; // Default
    },

    // Obtém configuração do produto
    getProductConfig: function(variant = 'basic') {
        return {
            ...FB_TRACKING_CONFIG.product,
            ...FB_TRACKING_CONFIG.product.variants[variant]
        };
    },

    // Valida configuração
    validateConfig: function() {
        const errors = [];
        
        if (!FB_TRACKING_CONFIG.pixel.id) {
            errors.push('Pixel ID não configurado');
        }
        
        if (!FB_TRACKING_CONFIG.pixel.accessToken) {
            errors.push('Access Token não configurado');
        }
        
        if (errors.length > 0) {
            console.error('❌ Erros na configuração:', errors);
            return false;
        }
        
        return true;
    },

    // Atualiza configuração dinamicamente
    updateConfig: function(newConfig) {
        Object.assign(FB_TRACKING_CONFIG, newConfig);
        console.log('✅ Configuração atualizada:', newConfig);
    },

    // Obtém configuração completa
    getConfig: function() {
        return FB_TRACKING_CONFIG;
    }
};

// Exporta para uso global
window.FBConfig = FBConfig;

// Validação inicial
if (FBConfig.validateConfig()) {
    console.log('✅ Configuração do Facebook Tracking validada com sucesso');
} else {
    console.error('❌ Configuração do Facebook Tracking inválida');
}

// Exporta para módulos
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FB_TRACKING_CONFIG, FBConfig };
} 