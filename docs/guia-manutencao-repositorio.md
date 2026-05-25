# Guia de Manutenção do Site TRAMA

Este guia explica **tudo o que é necessário para manter o site do TRAMA atualizado**: como adicionar conteúdo, editar páginas, publicar mudanças e colaborar em equipe. Foi escrito para que qualquer pessoa com noções básicas de HTML e Git consiga dar suporte ao site.

---

## Sumário

1. [Visão geral do projeto](#1-visão-geral-do-projeto)
2. [Estrutura de pastas e arquivos](#2-estrutura-de-pastas-e-arquivos)
3. [Como rodar o site no seu computador](#3-como-rodar-o-site-no-seu-computador)
4. [Como adicionar conteúdo](#4-como-adicionar-conteúdo)
    - 4.1. [Novo post no Blog](#41-novo-post-no-blog)
    - 4.2. [Novo pesquisador (Pessoas)](#42-novo-pesquisador-pessoas)
    - 4.3. [Novo parceiro institucional](#43-novo-parceiro-institucional)
    - 4.4. [Nova oportunidade (bolsa, vaga, edital, evento)](#44-nova-oportunidade)
    - 4.5. [Novo projeto](#45-novo-projeto)
    - 4.6. [Nova publicação científica](#46-nova-publicação-científica)
    - 4.7. [Novo serviço prestado](#47-novo-serviço-prestado)
5. [Como editar elementos globais](#5-como-editar-elementos-globais)
    - 5.1. [Menu de navegação](#51-menu-de-navegação)
    - 5.2. [Rodapé (endereço, redes sociais)](#52-rodapé)
    - 5.3. [Cores e fontes (paleta visual)](#53-cores-e-fontes)
6. [Imagens: onde colocar e como nomear](#6-imagens)
7. [Mapa-múndi de parceiros: adicionar país](#7-mapa-múndi-de-parceiros)
8. [SEO: o que está configurado](#8-seo)
9. [Git: fluxo de trabalho da equipe](#9-git-fluxo-de-trabalho)
10. [Publicação (GitHub Pages e domínio final)](#10-publicação)
11. [Solução de problemas comuns](#11-solução-de-problemas-comuns)
12. [Checklist antes de publicar](#12-checklist-antes-de-publicar)

---

## 1. Visão geral do projeto

O site do TRAMA é **estático**: feito apenas com HTML, CSS e JavaScript puros, **sem frameworks, sem build, sem dependências externas instaladas**. Isso significa:

- Não há `npm install`, não há comando `build`, não há servidor de aplicação.
- Para editar, basta abrir o arquivo no editor (VS Code, por exemplo) e salvar.
- Para publicar, basta dar `push` no GitHub — o GitHub Pages serve os arquivos como estão.

**Tecnologias usadas:**
- HTML5 semântico
- CSS3 com variáveis (`assets/css/variables.css`)
- JavaScript ES6+ (sem libs)
- Fontes Google Fonts (Manrope + Sora)
- SVG inline para mapas e ícones

**Idioma:** todo o conteúdo está em português (pt-BR). Mantenha acentuação e ortografia ao editar.

---

## 2. Estrutura de pastas e arquivos

```
trama/
├── index.html                    ← Página inicial (Início)
├── robots.txt                    ← Regras para buscadores
├── sitemap.xml                   ← Mapa de URLs para SEO
├── README.md                     ← Apresentação rápida do repositório
├── CLAUDE.md                     ← Instruções para o assistente Claude (não publicar)
├── .gitignore                    ← Arquivos ignorados pelo Git
│
├── pages/                        ← Páginas internas
│   ├── sobre.html                ← Sobre o laboratório
│   ├── pessoas.html              ← Equipe (coordenação, doutorado, mestrado, IC, colaboradores)
│   ├── parceiros.html            ← Logos institucionais + mapa-múndi
│   ├── infraestrutura.html       ← Linha de pesquisa
│   ├── planejamento.html         ← Linha de pesquisa
│   ├── projetos.html             ← Projetos em andamento
│   ├── publicacoes.html          ← Artigos, teses, dissertações
│   ├── servicos.html             ← Serviços prestados (ensaios, consultoria, treinamentos)
│   ├── oportunidades.html        ← Bolsas, vagas, editais, eventos
│   ├── blog.html                 ← Lista de posts do blog
│   └── blog/
│       └── posts/                ← Posts completos (um arquivo HTML por post)
│           └── post-inventario-emissoes.html
│
├── assets/
│   ├── css/
│   │   ├── reset.css             ← Reset CSS básico
│   │   ├── variables.css         ← Paleta de cores, fontes, espaçamentos
│   │   ├── style.css             ← Estilos principais (com índice no topo)
│   │   └── responsive.css        ← Adaptações para mobile/tablet (breakpoint 980px)
│   ├── js/
│   │   └── main.js               ← Todo o JavaScript (nav, modais, blog, mapa)
│   ├── images/
│   │   ├── logo-trama.png        ← Logos do laboratório e parceiros visuais
│   │   ├── ...                   ← Imagens de conteúdo (hero, blog, etc.)
│   │   └── maps/
│   │       └── world-map.svg     ← Mapa-múndi usado em parceiros.html
│   └── icons/                    ← Ícones SVG temáticos (calor, CO₂...)
│
├── templates/
│   └── blog-publicacao-template.md  ← Roteiro editorial interno para posts
│
└── docs/
    └── guia-manutencao-repositorio.md   ← Este arquivo
```

**Princípio organizacional**: cada página HTML é independente — repetimos o cabeçalho/rodapé em cada uma porque não há sistema de templates. Quando precisar editar o menu ou o rodapé, **edite em todas as páginas** (existe um padrão repetido que facilita o "search and replace").

---

## 3. Como rodar o site no seu computador

### Opção 1 — abrir direto no navegador (mais simples)

Clique duas vezes em `index.html`. Funciona para **a maioria** das páginas, mas o **mapa-múndi da página Parceiros NÃO carregará** desse jeito (por causa de uma proteção do navegador chamada CORS, que bloqueia leitura de arquivos locais via JavaScript).

### Opção 2 — Live Server (recomendado para edição diária)

1. No VS Code, instale a extensão **Live Server** (Ritwick Dey).
2. Clique com botão direito em `index.html` → "Open with Live Server".
3. O site abre em `http://127.0.0.1:5500/` e recarrega automaticamente ao salvar.

### Opção 3 — servidor Python (sem instalar nada extra se você tem Python)

No terminal, dentro da pasta do projeto:

```bash
python3 -m http.server 8000
```

Abra no navegador: `http://localhost:8000`.

---

## 4. Como adicionar conteúdo

> **Regra de ouro**: antes de adicionar conteúdo novo, abra um arquivo já existente do mesmo tipo (ex.: um post do blog), **copie o exemplo** e ajuste. Não precisa escrever HTML do zero.

### 4.1. Novo post no Blog

**Passo 1 — Preencha o template editorial**
Antes de mexer no HTML, use `templates/blog-publicacao-template.md` para organizar título, autor, categoria, imagens e texto. É só um documento de referência, não vai para o site.

**Passo 2 — Crie o arquivo HTML do post**
- Vá em `pages/blog/posts/`.
- Copie o arquivo `post-inventario-emissoes.html` e renomeie para algo descritivo em **kebab-case** (palavras separadas por hífen, tudo minúsculo, sem acentos). Exemplos:
  - `post-pavimentos-frios.html`
  - `post-mobilidade-ativa-fortaleza.html`
- Abra o novo arquivo e edite:
  - `<title>` — título da aba do navegador
  - `<meta name="description">` — resumo do post (até 160 caracteres)
  - `<link rel="canonical">` — atualize a URL para refletir o nome do arquivo novo
  - Conteúdo do `<main>` — texto, imagens, citações

**Passo 3 — Crie o card na lista do blog**
- Abra `pages/blog.html`.
- Dentro de `<div class="blog-grid">`, copie um card existente:

```html
<a class="blog-card-link" href="blog/posts/post-NOME-DO-ARQUIVO.html"
   data-category="CATEGORIA"
   aria-label="Abrir publicação: TÍTULO">
  <article class="blog-card">
    <img src="../assets/images/CAMINHO-DA-IMAGEM.jpg" alt="Descrição da imagem" />
    <div class="blog-card__content">
      <p class="blog-card__kicker">CATEGORIA VISÍVEL</p>
      <h3>TÍTULO DO POST</h3>
      <p>RESUMO CURTO (2-3 linhas).</p>
      <div class="blog-card__meta"><span>DATA</span><span>TEMPO DE LEITURA</span></div>
    </div>
  </article>
</a>
```

**Categorias permitidas** (use exatamente esses valores em `data-category`):
- `mobilidade-urbana`
- `pavimentacao`
- `logistica`
- `qualidade-do-ar`
- `extensao`

**Passo 4 — (Opcional) Marcar como destaque da semana**
Acrescente `data-featured="true"` no card escolhido. **Apenas um post por vez** pode ter esse atributo. O JavaScript automaticamente renderiza o destaque no topo da página. Para tirar do destaque, basta remover o atributo.

**Passo 5 — Adicionar ao sitemap (recomendado para SEO)**
Abra `sitemap.xml` e adicione:

```xml
<url>
  <loc>https://www.tramaufc.com.br/pages/blog/posts/post-NOME-DO-ARQUIVO.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.6</priority>
</url>
```

---

### 4.2. Novo pesquisador (Pessoas)

Abra `pages/pessoas.html` e encontre o grupo apropriado (`#grupo-doutorado`, `#grupo-mestrado`, `#grupo-ic`, `#grupo-pesquisadores`, `#grupo-colaboradores`, `#grupo-egressos`).

Dentro de `<div class="people-grid people-grid--XXX">`, adicione:

```html
<button class="people-node people-node--XXX" type="button"
  data-nome="Nome Completo"
  data-vinculo="Mestrando(a) / Doutorando(a) / IC / Pesquisador(a)"
  data-pesquisa="Tema de pesquisa em 1-2 linhas"
  data-concentracao="Área de concentração"
  data-orcid="0000-0000-0000-0000">
  <span class="people-avatar">XX</span>
  <span class="people-meta">
    <strong>Nome Completo</strong>
    <small>Vínculo</small>
  </span>
</button>
```

Onde `XXX` é o nível (`doutorado`, `mestrado`, `ic`, `pesquisador`, `colaborador`, `egresso`) e `XX` são as **iniciais** do nome (aparecem no avatar como fallback caso não tenha foto).

**Atributos opcionais que enriquecem o modal:**
- `data-orcid="0000-0000-0000-0000"` — ID ORCID. Use o ID real (16 dígitos com hífens). Enquanto for `0000-0000-0000-0000`, o link fica oculto no modal.
- `data-foto="https://url-da-foto.jpg"` — foto personalizada (se omitido, gera avatar genérico).
- `data-linkedin="https://linkedin.com/in/usuario"` — link do LinkedIn.
- `data-lattes="http://lattes.cnpq.br/0000000000000000"` — link do Currículo Lattes.

O modal de detalhes (que abre ao clicar) é renderizado automaticamente pelo `main.js`.

---

### 4.3. Novo parceiro institucional

Abra `pages/parceiros.html`. Identifique a categoria correta (`Universidades`, `Agências de fomento`, `Gestão pública`, `Redes técnicas`) e adicione um item dentro da `<ul class="logo-grid">`:

```html
<li>
  <button class="logo-tile" type="button" data-partner
    data-nome="Nome Completo da Instituição"
    data-pais="Brasil"
    data-tipo="Universidade"
    data-periodo="2022 – atual"
    data-escopo="Descrição da cooperação em 1-2 linhas."
    data-site="https://site-da-instituicao.br">
    <img src="../assets/images/logos/nome-do-arquivo.png" alt="Logo NOME" />
  </button>
</li>
```

**Logo da instituição:**
- Coloque o arquivo em `assets/images/logos/` (crie a pasta se não existir).
- Formato preferido: **PNG com fundo transparente** ou **SVG**.
- Dimensão recomendada: ~300×140 px (proporção 16:9).
- Enquanto não tiver a logo real, pode usar placeholder: `https://placehold.co/300x140/ffffff/1c3c1f?text=NOME`.

Clicar no logo abre um **modal automático** com os dados preenchidos nos `data-*`.

---

### 4.4. Nova oportunidade

Abra `pages/oportunidades.html`. Dentro de `<div class="oportunidades-grid">`, adicione um card:

```html
<article class="oportunidade-card" data-oportunidade-tipo="bolsa">
  <header class="oportunidade-card__head">
    <span class="oportunidade-tag oportunidade-tag--bolsa">Bolsa</span>
    <span class="oportunidade-status oportunidade-status--aberto">Aberto</span>
  </header>
  <h3>Título da oportunidade</h3>
  <p>Descrição em 2-3 linhas.</p>
  <dl class="oportunidade-meta">
    <div><dt>Prazo</dt><dd>30 de junho de 2026</dd></div>
    <div><dt>Nível</dt><dd>Doutorado</dd></div>
  </dl>
  <a class="btn-outline" href="LINK-DO-EDITAL" target="_blank" rel="noopener">Saber mais</a>
</article>
```

**Tipos aceitos** em `data-oportunidade-tipo` (também usados nas classes `oportunidade-tag--XXX`):
- `bolsa` — Bolsas de estudo
- `vaga` — Vagas de pesquisador/colaborador
- `edital` — Editais e processos seletivos
- `evento` — Eventos, workshops, seminários

**Status** (use uma das duas classes em `oportunidade-status--XXX`):
- `aberto` — pintado em verde (oportunidade ainda válida)
- `encerrado` — cinza (mantém histórico)

O filtro por tipo no topo da página é automático — basta usar `data-oportunidade-tipo` correto.

---

### 4.5. Novo projeto

Abra `pages/projetos.html`. Encontre `<div class="project-grid">` e copie um `<article class="project-card">` existente. Ajuste imagem, título, descrição e tag colorida.

---

### 4.6. Nova publicação científica

Abra `pages/publicacoes.html`. Adicione um novo item na lista seguindo o padrão de citação acadêmica (autores, ano, título, veículo, link DOI/PDF).

---

### 4.7. Novo serviço prestado

Abra `pages/servicos.html`. Dentro de `<div class="servicos-grid">`, adicione um novo `<article class="servico-card">` seguindo o padrão dos existentes (tag de categoria + título + parágrafo + lista de subitens).

---

## 5. Como editar elementos globais

### 5.1. Menu de navegação

O menu está duplicado em **cada página HTML** (não há sistema de includes). Para editar, use **busca global** no editor (Ctrl+Shift+F no VS Code):

- Procure por `<nav class="site-nav"` — todas as ocorrências aparecem.
- Edite em todas as páginas, mantendo a mesma estrutura.

**Estrutura atual do menu:**
- Início
- Sobre
- Pessoas (dropdown: Equipe, Parceiros)
- Pesquisa (dropdown: Infraestrutura, Planejamento, Projetos, Publicações)
- Atuação (dropdown: Serviços Prestados, Oportunidades e Divulgações)
- Blog

**Atenção**: o caminho dos links muda dependendo da pasta da página:
- Em `index.html` (raiz): `href="pages/sobre.html"`
- Em `pages/*.html`: `href="sobre.html"`
- Em `pages/blog/posts/*.html`: `href="../../sobre.html"`

### 5.2. Rodapé

O rodapé também é duplicado em todas as páginas. Tem 4 colunas:

1. Logo + **mini-mapa do Google Maps** apontando para o DET/UFC (iframe).
2. Endereço completo.
3. Contato (e-mail, telefone).
4. Ícones de redes sociais (YouTube, Instagram, LinkedIn).

**Para alterar endereço, telefone ou e-mail**: edite manualmente em todos os HTML (busca global por "trama@ufc.br" ou pelo bloco `<h3>Endereço</h3>`).

**Para alterar redes sociais**: substitua o `href="#"` pelo link real em cada `<a class="footer-social" ...>`.

### 5.3. Cores e fontes

Toda a paleta visual está em **`assets/css/variables.css`** (arquivo curto e simples). Mudar uma variável afeta o site inteiro automaticamente.

Cores principais:
- `--brand` — verde TRAMA (cor primária)
- `--rose` — rosa de destaque
- `--text` — cor do texto
- `--bg` — cor de fundo

---

## 6. Imagens

**Onde colocar:**
- Logos de instituições parceiras → `assets/images/logos/` (criar se não existir)
- Imagens de blog/conteúdo → `assets/images/`
- Ícones SVG temáticos → `assets/icons/`
- Mapas e assets técnicos → `assets/images/maps/`

**Boas práticas:**
- **Nomes**: kebab-case, sem acentos, sem espaços. Ex.: `corredor-onibus-fortaleza.jpg`, não `Corredor Ônibus.jpg`.
- **Formato**: JPG para fotos, PNG para imagens com transparência, SVG para ícones e logos vetoriais, WebP se quiser compressão moderna.
- **Tamanho**: comprima antes de subir. Fotos não precisam passar de ~250 KB. Use [tinypng.com](https://tinypng.com) para reduzir.
- **Alt text**: sempre preencha o atributo `alt="..."` com descrição objetiva. Importante para acessibilidade e SEO.

---

## 7. Mapa-múndi de parceiros

O mapa em `pages/parceiros.html` colore automaticamente países a partir de seus **códigos ISO 3166-1 alpha-2 em maiúsculo** (BR, PT, US, FR, GB, DE, JP, AR...).

**Para adicionar um país parceiro:**

1. Abra `pages/parceiros.html` e localize:

```html
<div class="world-map"
     ...
     data-home="BR"
     data-partners="PT,US,FR,GB,DE,JP,AR">
```

2. Adicione o código do país na lista `data-partners` (separado por vírgula, sem espaços). Exemplo, para incluir Itália:

```html
data-partners="PT,US,FR,GB,DE,JP,AR,IT"
```

3. Salve. O país será pintado automaticamente, e a bandeira aparecerá no mapa (puxada do serviço gratuito flagcdn.com).

**Lista de códigos comuns**: `BR` Brasil, `PT` Portugal, `US` EUA, `GB` Reino Unido, `FR` França, `DE` Alemanha, `IT` Itália, `ES` Espanha, `JP` Japão, `CN` China, `KR` Coreia do Sul, `AR` Argentina, `CL` Chile, `MX` México, `CA` Canadá, `AU` Austrália.

**Controles do mapa**: botões +/− para zoom, botão ⟳ para resetar, arrastar com o mouse para deslocar, roda do mouse para zoom.

---

## 8. SEO

O site já vem com SEO técnico configurado. Você **não precisa mexer no dia a dia**, mas é bom saber onde fica:

- `<title>`, `<meta description>`, Open Graph e Twitter Card → no `<head>` de cada página
- `<link rel="canonical">` → URL definitiva da página (todas apontam para `www.tramaufc.com.br`)
- `robots.txt` → na raiz, libera todos os buscadores
- `sitemap.xml` → na raiz, lista todas as URLs. **Adicione novas páginas aqui sempre que criar uma.**
- JSON-LD estruturado (`ResearchOrganization`) → na home (`index.html`)

**Quando migrar para o domínio definitivo `tramaufc.com.br`:** nada precisa mudar (já está apontando para lá). Apenas configure o CNAME no GitHub Pages.

---

## 9. Git: fluxo de trabalho

### Acesso ao repositório

Para liberar acesso a uma pessoa:
1. GitHub → repositório → **Settings** → **Collaborators** → **Add people**.
2. Permissões recomendadas:
   - `Read` — apenas leitura
   - `Write` — pode commitar e criar branches (recomendado para colaboradores)
   - `Maintain` — pode ajudar na manutenção sem mexer em settings críticas
   - `Admin` — só para administradores do projeto

### Primeiro acesso (clonar o projeto)

```bash
git clone https://github.com/LeonardoCavalcante/trama.git
cd trama
```

Quando o Git pedir autenticação:
- `Username`: seu usuário do GitHub
- `Password`: seu **Personal Access Token (PAT)** — gere em https://github.com/settings/tokens

> ⚠️ **NUNCA** compartilhe seu PAT. Cada pessoa gera o próprio. Não cole PAT em arquivos do projeto.

### Fluxo diário

```bash
# 1. Trazer atualizações
git checkout main
git pull origin main

# 2. Criar branch para sua tarefa
git checkout -b feat/nome-curto-tarefa
# Exemplos: feat/post-pavimentos, fix/menu-mobile, content/novo-pesquisador

# 3. Fazer as alterações no editor

# 4. Ver o que mudou
git status

# 5. Adicionar e commitar
git add .
git commit -m "Adiciona post sobre pavimentos frios"

# 6. Enviar para o GitHub
git push -u origin feat/nome-curto-tarefa

# 7. No GitHub, abrir Pull Request para a main e pedir revisão
```

### Boas mensagens de commit

Comece com verbo no imperativo, sem ponto final:
- `Adiciona post sobre mobilidade ativa`
- `Corrige cor do botão no mobile`
- `Atualiza endereço do rodapé`
- `Remove pesquisador egresso`

### Resolução de conflitos

Se `git pull` reclamar de conflito:
1. Abra o arquivo conflitado — você verá blocos com `<<<<<<<`, `=======`, `>>>>>>>`.
2. Escolha qual versão manter (ou combine as duas), removendo os marcadores.
3. Salve, depois rode:

```bash
git add .
git commit -m "Resolve conflito em NOME-DO-ARQUIVO"
```

Se o conflito for grande, converse com a pessoa que alterou o mesmo arquivo antes de prosseguir.

---

## 10. Publicação

### GitHub Pages (preview e produção)

O site é servido automaticamente pelo GitHub Pages a cada push na branch `main`.

**Configuração inicial** (já feita, mas para referência):
1. GitHub → **Settings** → **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` / pasta: `/(root)`

URL atual: `https://leonardocavalcante.github.io/trama/`

### Migrar para o domínio definitivo (`tramaufc.com.br`)

1. Criar um arquivo `CNAME` na raiz do repositório contendo apenas: `www.tramaufc.com.br`
2. No painel do domínio (provedor `tramaufc.com.br`), configurar registro DNS:
   - `CNAME` `www` → `leonardocavalcante.github.io`
   - `A` (apex) → IPs do GitHub Pages: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
3. No GitHub → Settings → Pages → preencher "Custom domain" com `www.tramaufc.com.br` e ativar "Enforce HTTPS".
4. Aguardar propagação DNS (10 min a algumas horas).

---

## 11. Solução de problemas comuns

| Problema | Causa provável | Solução |
|---|---|---|
| Mapa-múndi não aparece ao abrir HTML local | CORS bloqueia `fetch()` de arquivo local | Use Live Server ou `python3 -m http.server` |
| Imagem aparece quebrada após upload | Nome do arquivo com maiúscula ou acento no HTML mas minúscula no servidor | Conferir caso, lembrar que Linux é case-sensitive |
| Mudança não aparece no site após push | Cache do navegador | `Ctrl+Shift+R` (hard refresh). Em mobile, limpar cache do app |
| Menu dropdown não abre no celular | JS não carregou ou erro no console | Abrir DevTools → Console e verificar erros |
| Filtro do blog não funciona | `data-category` no card está diferente das categorias permitidas | Conferir lista no item 4.1 |
| Tooltip do mapa não aparece | Mouse precisa estar sobre um país (não sobre o oceano) | Esperado |
| Bandeira de país parceiro não aparece | flagcdn.com pode estar fora do ar (raro) ou país sem cobertura | Verificar conexão; se persistir, baixar bandeira local em `assets/images/flags/` |
| Site quebrou após uma mudança | Algum HTML ficou inválido | Use `git diff` ou `git log` para ver o que mudou, e `git revert` para desfazer commit |

---

## 12. Checklist antes de publicar

Antes de fazer `git push` para a `main`:

- [ ] O conteúdo abre sem erro no Live Server (ou Python server).
- [ ] Os links internos novos funcionam (testar clicando).
- [ ] O layout continua correto em mobile (use DevTools, modo responsivo, ~375 px de largura).
- [ ] Imagens novas têm atributo `alt` preenchido.
- [ ] Se criou página nova: adicionou ao `sitemap.xml`?
- [ ] Se mexeu no menu: editou em **todas** as páginas?
- [ ] Nenhum arquivo sensível foi adicionado (PAT, .env, credenciais).
- [ ] `git status` está limpo.
- [ ] Mensagem de commit descritiva.

---

## Em caso de dúvida

- Olhe um arquivo existente do mesmo tipo e copie a estrutura.
- Use a busca global do VS Code (Ctrl+Shift+F) para entender onde algo está sendo usado.
- Em último caso, abra uma issue no repositório descrevendo o problema com prints.

Site mantido pela equipe do TRAMA — Universidade Federal do Ceará.
