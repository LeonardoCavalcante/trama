# TRAMA - Site Institucional

Estrutura inicial de site estatico em HTML, CSS e JS para o laboratorio TRAMA.

## Estrutura

- `index.html`
- `assets/css/reset.css`
- `assets/css/variables.css`
- `assets/css/style.css`
- `assets/css/responsive.css`
- `assets/js/main.js`
- `assets/images/` (placeholders)
- `assets/icons/` (placeholders)

## Como executar

1. Abra o projeto no VS Code.
2. Abra o `index.html` no navegador.
3. Opcional: use extensao de live server para recarregamento automatico.

## Observacoes

- As imagens e icones estao como placeholders e devem ser substituidos pelos arquivos finais do laboratorio.
- O layout segue a referencia visual dos prints enviados.

## Blog: publicacao semanal

### Estrutura profissional de arquivos

- Pagina lista do blog: `pages/blog.html`
- Paginas de post: `pages/blog/posts/`
- Exemplo de post: `pages/blog/posts/post-inventario-emissoes.html`
- Template editorial: `templates/blog-publicacao-template.md`

### Como usar o template

O arquivo oficial para preparar uma nova publicacao e `templates/blog-publicacao-template.md`. Ele serve como guia interno de conteudo e revisao. O HTML da publicacao final fica em `pages/blog/posts/`.

### Como funciona o destaque da semana

Hoje o destaque e definido por atributo no card da grade em `pages/blog.html`: use `data-featured="true"` no card desejado. Para tirar um post do destaque e transforma-lo em post normal, basta remover esse atributo.

Se a equipe quiser automatizar isso apenas com HTML e JS, o fluxo recomendado e o seguinte:

1. Marcar um post com `data-featured="true"` no card do blog.
2. No HTML, manter uma area vazia para destaque da semana.
3. No `assets/js/main.js`, ler os cards da lista, localizar o que tiver `data-featured="true"` e renderizar esse conteudo na area de destaque.
4. Quando o atributo for removido, o JS deixa esse post apenas como card normal.

Essa abordagem funciona sem backend e sem CMS. A equipe so precisa editar o HTML do card e o JS faz a montagem visual.

### Como adicionar filtros novos

Para criar um novo filtro, siga este padrao:

1. Adicione um botao em `pages/blog.html` dentro de `.blog-tags`.
2. Defina um valor unico em `data-filter`, por exemplo `novas-tecnologias`.
3. No card da postagem, inclua o mesmo valor em `data-category`.
4. O JS em `assets/js/main.js` ja entende esse valor e filtra os posts automaticamente.

### Onde fica cada coisa

- Lista principal do blog: `pages/blog.html`
- Post completo: `pages/blog/posts/post-inventario-emissoes.html`
- Template interno da equipe: `templates/blog-publicacao-template.md`
- Logica do filtro do blog: `assets/js/main.js`
- Estilos do blog: `assets/css/style.css`

### Fluxo recomendado para publicar sem erros

1. Planejamento (segunda): definir titulo, categoria e objetivo do post.
2. Redacao (terca): escrever conteudo no template `templates/blog-publicacao-template.md`.
3. Revisao (quarta): ajustar ortografia, clareza, dados e referencias.
4. Publicacao (quinta):
	- Criar nova pagina em `pages/blog/posts/` com nome curto em kebab-case.
	- Atualizar `pages/blog.html` com card novo no bloco `blog-grid`.
	- Inserir `data-category` correto no card para funcionar no filtro.
	- Se for o destaque da semana, incluir `data-featured="true"` no card (somente um card por vez).
5. Validacao (sexta): revisar no desktop e mobile e testar links.

### Informacoes obrigatorias em cada post

- Titulo principal.
- Data de publicacao.
- Autor(es) com mini bio.
- Tempo estimado de leitura.
- Categoria.
- Imagem principal com alt text descritivo.
- Bloco final com informacoes do autor (foto + cargo + resumo).

### Padrao de categorias para o filtro funcional

Use apenas estes valores em `data-category` nos cards de `pages/blog.html`:

- `mobilidade-urbana`
- `pavimentacao`
- `logistica`
- `qualidade-do-ar`
- `extensao`

### Regras para imagens

- Preferir imagens em `assets/images/` com boa resolucao e compressao.
- Sempre preencher o atributo `alt` com descricao objetiva.
- Evitar textos embutidos na imagem.
- Manter consistencia visual (tons e linguagem institucional TRAMA).

### Checklist final antes de subir

1. Card novo abre a pagina correta do post.
2. Botao/categoria filtra corretamente no blog.
3. Post tem bloco de autor preenchido.
4. Sem links quebrados.
5. Sem erros de layout em mobile.
