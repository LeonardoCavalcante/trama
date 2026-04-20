# Template de Publicacao do Blog TRAMA

Use este modelo para preparar cada nova postagem antes de publicar em pages/blog.html.

## 1) Metadados

- Data: DD Mmm AAAA
- Categoria: Mobilidade Urbana | Pavimentacao | Logistica | Qualidade do Ar | Extensao
- Tempo de leitura: X min
- Autor(es): Nome da equipe

## 2) Bloco em destaque (opcional)

Preencha quando a postagem for o destaque da semana.

- Marcar o card com `data-featured="true"` em `pages/blog.html`
- Garantir que apenas 1 card tenha esse atributo por vez

## 3) Card de listagem (copiar para a grade do blog)

```html
<article class="blog-card">
  <img src="../assets/images/imagem-fundo-inicial.png" alt="Descrição objetiva da imagem" />
  <div class="blog-card__content">
    <p class="blog-card__kicker">Categoria</p>
    <h3>Titulo da postagem</h3>
    <p>Resumo curto com foco no principal achado ou contribuicao da publicacao.</p>
    <div class="blog-card__meta"><span>DD Mmm AAAA</span><span>X min</span></div>
  </div>
</article>
```

## 4) Checklist de qualidade

- Titulo claro e direto
- Resumo com linguagem acessivel
- Alt text da imagem preenchido
- Ortografia revisada
- Categoria correta
- Data e tempo de leitura atualizados

## 5) Fluxo recomendado de publicacao

1. Duplicar este template para a semana atual.
2. Preencher metadados e resumo.
3. Inserir o card no bloco blog-grid de pages/blog.html.
4. Se for o principal conteudo da semana, adicionar `data-featured="true"` no card.
5. Revisar no desktop e no mobile.
