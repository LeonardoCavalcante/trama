# TRAMA — Site Institucional

Site institucional do laboratório **TRAMA (Transportes e Meio Ambiente)** da Universidade Federal do Ceará (UFC).

🌐 **Produção (em migração):** [www.tramaufc.com.br](https://www.tramaufc.com.br/)
🚧 **Preview:** [leonardocavalcante.github.io/trama](https://leonardocavalcante.github.io/trama/)

---

## Stack

Projeto **100% estático**: HTML + CSS + JavaScript puros. Sem frameworks, sem build, sem dependências.

- HTML5 semântico
- CSS3 com variáveis (paleta em `assets/css/variables.css`)
- JavaScript ES6+ (sem libs)
- Fontes: Manrope + Sora (Google Fonts)
- Hospedagem: GitHub Pages

---

## Como rodar localmente

```bash
# Opção mais simples — apenas abre o arquivo no navegador
open index.html

# Opção recomendada — Python (necessário para o mapa-múndi de parceiros funcionar)
python3 -m http.server 8000
# Acesse http://localhost:8000
```

No VS Code, a extensão **Live Server** é a forma mais prática.

---

## Estrutura

```
trama/
├── index.html               # Início
├── pages/                   # Demais páginas (Sobre, Pessoas, Pesquisa, etc.)
│   └── blog/posts/          # Posts do blog (1 arquivo HTML por post)
├── assets/
│   ├── css/                 # reset, variables, style, responsive
│   ├── js/main.js           # Todo o JS (nav, modais, blog, mapa)
│   ├── images/              # Imagens de conteúdo
│   │   ├── logos/           # Logos de parceiros
│   │   └── maps/            # SVG do mapa-múndi
│   └── icons/               # Ícones temáticos SVG
├── templates/               # Templates editoriais (markdown)
├── docs/                    # Documentação
├── robots.txt               # SEO
└── sitemap.xml              # SEO
```

---

## Manutenção e adição de conteúdo

**📖 Consulte sempre o guia completo:** [`docs/guia-manutencao-repositorio.md`](docs/guia-manutencao-repositorio.md)

O guia cobre:
- Como rodar o site localmente
- Como adicionar **blog post**, **pesquisador**, **parceiro**, **oportunidade**, **projeto**, **publicação**, **serviço**
- Como editar **menu**, **rodapé**, **cores**
- Como adicionar **país no mapa-múndi**
- Fluxo Git da equipe (clone, branch, commit, push, PR)
- Deploy no GitHub Pages e migração para `tramaufc.com.br`
- Solução de problemas comuns
- Checklist de publicação

---

## Páginas do site

| Página | Arquivo | Conteúdo |
|---|---|---|
| Início | `index.html` | Visão geral, áreas de concentração |
| Sobre | `pages/sobre.html` | Missão, valores, linha do tempo, localização |
| Equipe | `pages/pessoas.html` | Coordenação, doutorandos, mestrandos, IC, colaboradores |
| Parceiros | `pages/parceiros.html` | Logos por categoria + mapa-múndi interativo |
| Infraestrutura | `pages/infraestrutura.html` | Linha de pesquisa |
| Planejamento | `pages/planejamento.html` | Linha de pesquisa |
| Projetos | `pages/projetos.html` | Projetos em andamento |
| Publicações | `pages/publicacoes.html` | Artigos, teses, dissertações |
| Serviços | `pages/servicos.html` | Ensaios, consultoria, treinamentos |
| Oportunidades | `pages/oportunidades.html` | Bolsas, vagas, editais, eventos |
| Blog | `pages/blog.html` | Lista de posts (filtrável por categoria) |

---

## Como contribuir

1. Receba acesso ao repositório (peça ao administrador).
2. `git clone https://github.com/LeonardoCavalcante/trama.git`
3. Crie uma branch: `git checkout -b feat/nome-da-tarefa`
4. Faça as alterações e teste localmente.
5. Commit + push: `git push -u origin feat/nome-da-tarefa`
6. Abra Pull Request no GitHub para revisão.

Detalhes completos em [`docs/guia-manutencao-repositorio.md`](docs/guia-manutencao-repositorio.md).

---

## Licença e créditos

Conteúdo institucional do laboratório TRAMA / UFC.

Recursos de terceiros utilizados:
- Mapa-múndi base: [SimpleMaps](https://simplemaps.com) (MIT)
- Bandeiras: [flagcdn.com](https://flagcdn.com) (CDN gratuita)
- Ícones de redes sociais: [Simple Icons](https://simpleicons.org)
- Fontes: Manrope e Sora via [Google Fonts](https://fonts.google.com/)
