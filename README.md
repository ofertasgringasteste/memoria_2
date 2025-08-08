# Memoria #2 - VSL Completa

## 📋 Descrição do Projeto

Este é um projeto de VSL (Video Sales Letter) completo para um produto de memória e cognição. O projeto foi configurado com SpeedSellX como processador de pagamento e inclui múltiplas páginas para otimização de conversão.

## 🏗️ Estrutura do Projeto

```
Memoria #2/
├── video/           # VSL Principal
│   ├── index.html   # Página principal da VSL
│   ├── js/          # Scripts JavaScript
│   ├── css/         # Estilos CSS
│   ├── images/      # Imagens da VSL
│   └── fonts/       # Fontes personalizadas
├── text/            # Página de Texto Alternativa
│   ├── index.html   # Versão em texto da oferta
│   ├── css/         # Estilos CSS
│   ├── images/      # Imagens da página
│   └── js/          # Scripts JavaScript
└── pag1/            # Página de Captura
    ├── index.html   # Página de captura de leads
    ├── js/          # Scripts JavaScript
    ├── images/      # Imagens da página
    └── fonts/       # Fontes personalizadas
```

## 🚀 Funcionalidades

### ✅ VSL Principal (`video/`)
- **Vídeo hospedado no Wistia** (ID: `l8a2teak66`)
- **Botão de compra com delay** (1009 segundos ≈ 16.8 minutos)
- **Controles personalizados** para som e continuação
- **Sistema de referências científicas** dinâmicas
- **Checkout integrado** com SpeedSellX

### ✅ Página de Texto (`text/`)
- **Versão alternativa** da oferta em formato texto
- **Otimizada para SEO** e acessibilidade
- **Mesmo checkout** SpeedSellX integrado
- **Design responsivo** para todos os dispositivos

### ✅ Página de Captura (`pag1/`)
- **Página de captura de leads** com design profissional
- **Redirecionamento automático** para a VSL principal
- **Sistema de tracking UTMify** integrado
- **Design otimizado** para conversão

## 💳 Configuração de Pagamento

### SpeedSellX
- **URL de Checkout**: `https://pay.speedsellx.com/68954DB7B8B8F`
- **Preço**: $17,90
- **Processador**: SpeedSellX (substituído do ClickBank)

## 🔧 Configurações Técnicas

### VSL Principal
- **Tempo de delay do botão**: 1009 segundos
- **ID do vídeo**: `l8a2teak66`
- **Plataforma de vídeo**: Wistia
- **Scripts principais**:
  - `E-v1.js` - Controle de reprodução
  - `scripts-2.0.2.min.js` - Interações gerais
  - `config-2.0.0.min.js` - Configurações
  - `references.js` - Referências científicas

### Tracking e Analytics
- **UTMify**: Configurado para rastreamento de campanhas
- **ClickMagick**: Integrado para tracking avançado
- **Parâmetros UTM**: Suportados em todas as páginas

## 🎯 Fluxo de Conversão

1. **Captura** (`pag1/`) → Redireciona para VSL
2. **VSL** (`video/`) → Apresenta o produto
3. **Checkout** → SpeedSellX para pagamento
4. **Alternativa** (`text/`) → Versão em texto

## 📱 Responsividade

- **Desktop**: Otimizado para telas grandes
- **Tablet**: Layout adaptativo
- **Mobile**: Design mobile-first
- **Cross-browser**: Compatível com todos os navegadores

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilos e animações
- **JavaScript** - Interatividade
- **jQuery** - Manipulação DOM
- **Wistia** - Hospedagem de vídeo
- **SpeedSellX** - Processamento de pagamento

## 🔒 Segurança

- **HTTPS** obrigatório para checkout
- **Validação de entrada** em todos os formulários
- **Sanitização de dados** implementada
- **CORS** configurado adequadamente

## 📊 Performance

- **Imagens otimizadas** (WebP + fallbacks)
- **CSS/JS minificados** para carregamento rápido
- **Lazy loading** implementado
- **CDN** para recursos externos

## 🚀 Deploy

### Local
```bash
# Iniciar servidor local
python3 -m http.server 8080

# Acessar:
# - VSL: http://localhost:8080/video/
# - Texto: http://localhost:8080/text/
# - Captura: http://localhost:8080/pag1/
```

### Produção
- **Hospedagem**: Qualquer servidor web estático
- **Domínio**: Configurar DNS adequadamente
- **SSL**: Certificado obrigatório para checkout

## 📝 Changelog

### v1.0.0 (Atual)
- ✅ Removido ClickBank completamente
- ✅ Configurado SpeedSellX como processador
- ✅ Limpeza de caracteres especiais
- ✅ Redirecionamento de links em pag1/
- ✅ Atualização de preços para $17,90
- ✅ Integração UTMify para tracking
- ✅ Otimização de performance

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o projeto, entre em contato através do email configurado nas páginas.

---

**Desenvolvido com ❤️ para máxima conversão** 