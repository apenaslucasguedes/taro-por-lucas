# tarô por lucas

Site de página única, em português, com identidade editorial baseada nas cartas fornecidas por Lucas. HTML, CSS e JavaScript nativos, sem dependências ou etapa de build.

## Executar

Sem instalação ou build. Na pasta do projeto:

```sh
python3 -m http.server 8000
```

Abra http://localhost:8000. Também funciona abrindo `index.html` diretamente, exceto recursos do navegador que exigem contexto seguro, como copiar para a área de transferência (há alternativa manual).

## Editar

- `index.html`: conteúdo, perguntas frequentes, prazos e apresentação.
- `styles.css`: identidade visual e responsividade.
- `config.js`: número público do WhatsApp e preços.
- `script.js`: seleção da leitura, diálogo de contato e mensagem para WhatsApp.
- `assets/`: imagens editoriais otimizadas em WebP, cartas originais, textura de papel e favicon.

## Composição editorial

- Hero: `a-estrela-bg.webp`, `estrela-principal.webp` e `estrela-secundaria.webp` formam uma única composição em arco. `folhas.webp` apoia a transição lateral.
- Bloco conceitual: `a-forca-bg.webp`, com imagem aberta à margem e texto em duas alturas.
- Leituras: fundo azul profundo, colunas abertas e destaque vermelho para a leitura aprofundada. `lua.webp` aparece como ornamento lateral, sem interferir no conteúdo.
- Novas perspectivas: `julgamento-bg.webp` acompanha o texto existente sobre olhar de novo.
- Exemplo de entrega: `sacerdotisa-editorial.webp`, `roda-da-fortuna.webp` e `o-mundo.webp`, com legendas individuais e sem moldura externa.
- Sobre: composição botânica com `folhas.webp` e apresentação original de Lucas.
- Contato: `bg-lago.webp`, com camada de contraste para manter os textos legíveis.

As imagens fornecidas foram redimensionadas e comprimidas em WebP, preservando sua composição e transparência. A estrela amarela recebe recorte por CSS para ocultar o céu do arquivo e integrar a camada ao conjunto. Nenhuma imagem foi regenerada. O verso de carta é opcional e não foi incluído para evitar ornamentação excessiva.

O parallax desloca apenas as estrelas decorativas, no máximo 19,8 pixels. Usa eventos passivos, `requestAnimationFrame` e `IntersectionObserver`; suspende atualizações fora da área visível e respeita `prefers-reduced-motion`, inclusive se a preferência mudar com a página aberta. Textos, CTAs e a imagem base permanecem estáveis. Sem suporte ao observer, a composição permanece estática.

## Validação da reconstrução

Verificação em Chromium, em 11 larguras: 320, 360, 390, 600, 768, 800, 801, 1024, 1280, 1440 e 1920 pixels. Conteúdo editorial e nove FAQs comparados com a versão anterior; preços, destinos internos, imagens, ausência de overflow e dimensões do diálogo verificados.

Também foram conferidos os três tipos de leitura, mensagem e número de destino do WhatsApp sem envio, CTA geral, fechamento por Escape, retorno de foco, navegação no diálogo, preços personalizados, contato sem número, cópia manual/automática, parallax e movimento reduzido. Nenhum erro de JavaScript ou resposta HTTP de falha na rodada de QA. Safari e Firefox não foram executados nesta rodada.

Preencha `whatsapp` em `config.js` com código do país, DDD e número, apenas dígitos. Sem número configurado, o site explica que a agenda está em preparação e permite copiar uma mensagem; nunca simula envio. Com número válido, abre o WhatsApp com texto revisável pelo visitante. O site não envia mensagens automaticamente.

Valores iniciais: direta R$ 25, aprofundada R$ 40, completa R$ 50. Alterações devem ser feitas em `config.js` e nos textos de fallback do HTML, para coerência se JavaScript estiver desativado. Prazos: até 24 / 24 / 48 horas após confirmação do contexto e pagamento. Validar preços, prazos, regras de atendimento e contato antes do lançamento comercial.

## Publicar pelo GitHub

1. Criar o repositório `taro-por-lucas` na conta desejada e subir estes arquivos na branch `main`.
2. Em Settings → Pages, selecionar GitHub Actions como fonte.
3. O workflow `.github/workflows/pages.yml` publica o site a cada push para `main`. Depois de habilitar Pages, executar o workflow manualmente se o primeiro push aconteceu antes dessa configuração.

Todos os caminhos de assets são relativos e funcionam no subdiretório de um projeto GitHub Pages. O workflow envia apenas os arquivos públicos, sem README, pasta `.git` ou arquivos de configuração internos. A disponibilidade de Pages para repositórios privados depende do plano da conta; não mudar visibilidade sem a decisão do proprietário.

## Privacidade e acessibilidade

Sem analytics, cookies, fontes externas, banco de dados ou armazenamento de perguntas. O texto fica apenas na memória da página até ser copiado ou levado pelo visitante ao WhatsApp. O atendimento efetivo pelo WhatsApp deve seguir as práticas de privacidade descritas por Lucas. As perguntas frequentes são elementos nativos `details`; o diálogo usa `dialog` nativo com foco, fechamento por Escape e rótulos acessíveis. Movimento reduzido é respeitado.

As cartas foram fornecidas por Lucas para o projeto. Confirmar a permissão de uso comercial das reproduções antes de lançar publicamente. Nenhuma licença de terceiros é concedida por este repositório.
