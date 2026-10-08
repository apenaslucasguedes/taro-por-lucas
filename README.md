# tarô por lucas

Site de página única, em português, com identidade editorial baseada nas cartas fornecidas por Lucas. Nome e preços são provisórios.

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
- `assets/`: cartas originais fornecidas pelo usuário e favicon.

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
