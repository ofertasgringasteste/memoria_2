# 🎯 Sistema de Rastreamento Avançado Facebook Ads - Brain Song

## 📋 Visão Geral

Este sistema de rastreamento avançado para Facebook Ads foi desenvolvido especificamente para o projeto **Brain Song**, oferecendo rastreamento completo de conversões, eventos personalizados e analytics detalhados.

### ✨ Características Principais

- **Pixel do Facebook configurado** com ID: `1478137953324470`
- **Eventos personalizados** para cada página do funil
- **Rastreamento de vídeos** (Wistia)
- **Sistema de UTM tracking** automático
- **Dashboard interativo** para visualização de dados
- **Configuração centralizada** e fácil manutenção

## 🚀 Instalação e Configuração

### 1. Estrutura de Arquivos

```
📁 facebook-tracking-system/
├── 📄 facebook-tracking-system.js     # Sistema principal
├── 📄 fb-tracking-config.js           # Configuração centralizada
├── 📄 fb-tracking-dashboard.html      # Dashboard de visualização
├── 📁 pag1/
│   └── 📄 fb-tracking-implementation.js
├── 📁 text/
│   └── 📄 fb-tracking-implementation.js
└── 📁 video/
    └── 📄 fb-tracking-implementation.js
```

### 2. Implementação nas Páginas

#### Para a página `pag1/index.html`:

```html
<!-- Adicione antes do fechamento do </head> -->
<script src="../facebook-tracking-system.js"></script>
<script src="../fb-tracking-config.js"></script>
<script src="fb-tracking-implementation.js"></script>
```

#### Para a página `text/index.html`:

```html
<!-- Adicione antes do fechamento do </head> -->
<script src="../facebook-tracking-system.js"></script>
<script src="../fb-tracking-config.js"></script>
<script src="fb-tracking-implementation.js"></script>
```

#### Para a página `video/index.html`:

```html
<!-- Adicione antes do fechamento do </head> -->
<script src="../facebook-tracking-system.js"></script>
<script src="../fb-tracking-config.js"></script>
<script src="fb-tracking-implementation.js"></script>
```

## 📊 Eventos Rastreados

### Eventos Padrão do Facebook
- **PageView** - Visualização de página
- **ViewContent** - Visualização de conteúdo
- **AddToCart** - Adição ao carrinho
- **InitiateCheckout** - Início de checkout
- **Purchase** - Compra realizada
- **Lead** - Lead capturado
- **CompleteRegistration** - Registro completo

### Eventos Personalizados

#### Landing Page (pag1)
- `headline_view` - Título principal visualizado
- `testimonial_view` - Depoimento visualizado
- `benefits_view` - Lista de benefícios visualizada
- `form_field_focus` - Campo de formulário focado
- `text_page_click` - Clique para página de vendas
- `video_page_click` - Clique para página de vídeo

#### Sales Page (text)
- `sales_headline_view` - Headline de vendas visualizado
- `benefit_section_view` - Seção de benefício visualizada
- `guarantee_view` - Garantia visualizada
- `pricing_view` - Preço visualizado
- `scroll_milestone` - Marcos de scroll (25%, 50%, 75%, 90%)

#### Video Sales Letter (video)
- `vsl_headline_view` - Headline VSL visualizado
- `vsl_video_start` - Vídeo iniciado
- `vsl_video_progress` - Progresso do vídeo (10%, 25%, 50%, 75%, 90%, 100%)
- `vsl_video_complete` - Vídeo completo
- `vsl_video_pause` - Vídeo pausado
- `vsl_video_resume` - Vídeo retomado
- `vsl_sound_toggle` - Controle de som
- `vsl_urgency_view` - Elemento de urgência visualizado

### Eventos de Engajamento
- `scroll_depth` - Profundidade de scroll
- `time_on_page` - Tempo na página
- `reading_time` - Tempo de leitura
- `user_interaction` - Interações do usuário

## 🎮 Como Usar

### Rastreamento Automático

O sistema rastreia automaticamente:
- Visualizações de página
- Cliques em botões
- Scroll da página
- Tempo na página
- Formulários preenchidos
- Vídeos assistidos

### Rastreamento Manual

Para eventos específicos, use as funções disponíveis:

```javascript
// Rastreamento de seção específica
window.pag1Tracking.trackSectionView('benefícios', {
    section_id: 'benefits-section',
    content_type: 'list'
});

// Rastreamento de interação
window.textPageTracking.trackSalesEvent('urgency_click', {
    urgency_type: 'limited_time',
    time_remaining: '2:30:00'
});

// Rastreamento de vídeo
window.videoPageTracking.trackVideoEvent('video_rewind', {
    rewind_from: 120,
    rewind_to: 90
});
```

### Configuração Dinâmica

```javascript
// Atualizar configuração
FBConfig.updateConfig({
    product: {
        price: 97.00
    }
});

// Obter configuração atual
const currentConfig = FBConfig.getCurrentPageConfig();
```

## 📈 Dashboard

### Acessando o Dashboard

1. Abra o arquivo `fb-tracking-dashboard.html` no navegador
2. Visualize estatísticas em tempo real
3. Analise o funil de conversão
4. Monitore eventos por página
5. Acompanhe dados de UTM

### Métricas Disponíveis

- **Visualizações de Página** - Total de PageViews
- **Eventos Rastreados** - Total de eventos enviados
- **Leads Capturados** - Formulários preenchidos
- **Inícios de Checkout** - Usuários que iniciaram compra
- **Conversões** - Compras realizadas
- **Taxa de Conversão** - Conversões/PageViews

## 🔧 Configuração Avançada

### Personalizando Eventos

Edite o arquivo `fb-tracking-config.js`:

```javascript
// Adicionar novo evento
FB_TRACKING_CONFIG.customEvents.sales.new_event = { value: 0 };

// Configurar valor de evento
FB_TRACKING_CONFIG.pages.pag1.events.headline_view = { value: 5.00 };
```

### Configurando Preços

```javascript
// Atualizar preços do produto
FB_TRACKING_CONFIG.product.variants.basic.price = 97.00;
FB_TRACKING_CONFIG.product.variants.premium.price = 147.00;
FB_TRACKING_CONFIG.product.variants.vip.price = 197.00;
```

### Debug e Logs

```javascript
// Ativar modo debug
FB_TRACKING_CONFIG.debug.enabled = true;
FB_TRACKING_CONFIG.debug.verbose = true;
```

## 🔍 Monitoramento e Analytics

### Console do Navegador

Todos os eventos são logados no console:
```
📊 Facebook Event: PageView {content_name: "MIT Researcher - Landing Page", ...}
📊 Facebook Event: Lead {content_name: "Lead Capturado - Landing Page", ...}
```

### Google Analytics

O sistema integra automaticamente com:
- Google Tag Manager (GTM-PVX2RXCL)
- DataLayer para eventos customizados
- Parâmetros personalizados

### Facebook Events Manager

Acesse o Facebook Events Manager para:
- Verificar eventos em tempo real
- Configurar conversões
- Otimizar campanhas
- Analisar performance

## 🛠️ Solução de Problemas

### Eventos não aparecem no Facebook

1. **Verifique o Pixel ID**: Confirme se está correto no `fb-tracking-config.js`
2. **Teste o Pixel**: Use o Facebook Pixel Helper
3. **Verifique Console**: Procure por erros no console do navegador
4. **Modo Debug**: Ative o modo debug para logs detalhados

### Vídeos não são rastreados

1. **Verifique Wistia**: Confirme se o Wistia está carregado
2. **Aguarde Carregamento**: O sistema aguarda o Wistia carregar
3. **Console Logs**: Verifique logs de inicialização do vídeo

### Dashboard não atualiza

1. **Refresh Manual**: Clique em "Atualizar Dashboard"
2. **Verifique JavaScript**: Confirme se não há erros no console
3. **Dados Simulados**: O dashboard usa dados simulados para demonstração

## 📱 Compatibilidade

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Mobile browsers

## 🔒 Segurança

- **Dados Criptografados**: Emails e telefones são hasheados
- **HTTPS Obrigatório**: Funciona apenas em conexões seguras
- **GDPR Compliant**: Respeita regulamentações de privacidade
- **Cookies Seguros**: Uso responsável de cookies

## 📞 Suporte

Para dúvidas ou problemas:

1. **Verifique a documentação** completa
2. **Analise os logs** no console do navegador
3. **Teste em modo debug** para informações detalhadas
4. **Consulte o Facebook Events Manager** para validação

## 🚀 Próximos Passos

1. **Implemente** o sistema nas páginas
2. **Configure** preços e valores de eventos
3. **Teste** o rastreamento em ambiente de desenvolvimento
4. **Monitore** o dashboard em produção
5. **Otimize** campanhas baseado nos dados

---

**Desenvolvido com ❤️ para maximizar conversões do Brain Song** 