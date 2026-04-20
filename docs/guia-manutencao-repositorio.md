# Guia de manutencao do repositorio TRAMA

Este documento explica como liberar acesso para outras pessoas, como atualizar o sistema com seguranca e como fazer `pull`, `commit` e `push` no fluxo diario do projeto.

## 1. Como dar acesso para outras pessoas

Se a pessoa vai ajudar na manutencao, o caminho mais simples e adicionar como colaboradora no GitHub.

### Passo a passo

1. Abra o repositorio no GitHub.
2. Clique em `Settings`.
3. No menu lateral, entre em `Collaborators` ou `Collaborators and teams`.
4. Clique em `Add people` ou `Invite a collaborator`.
5. Pesquise pelo usuario ou email da pessoa.
6. Envie o convite.
7. A pessoa precisa aceitar o convite para conseguir acessar o repositorio.

### Permissoes recomendadas

- `Read`: pode apenas ver o codigo.
- `Write`: pode contribuir com commits e branches.
- `Maintain`: pode ajudar na manutencao sem controlar todas as configuracoes.
- `Admin`: somente para quem administra o repositorio.

Para manutencao tecnica do site, normalmente `Write` ou `Maintain` ja sao suficientes.

### Se o projeto for de uma organizacao

Se o repositorio estiver dentro de uma organizacao, o ideal e criar um time de manutencao e conceder acesso ao time, em vez de convidar pessoas uma a uma.

## 2. Como a equipe deve trabalhar

O fluxo recomendado e sempre trabalhar em branch separada e nunca editar direto na `main`.

### Como a pessoa pega o repositorio pela primeira vez

Depois de receber acesso ao repositorio no GitHub, a pessoa pode clonar o projeto de duas formas:

#### Via SSH

Use esta opcao se a pessoa ja tiver uma chave SSH configurada na conta do GitHub.

```bash
git clone git@github.com:LeonardoCavalcante/trama.git
```

Vantagens:

- Nao pede PAT a cada push.
- Funciona bem para quem usa o Git com frequencia.

#### Via HTTPS

Use esta opcao se a pessoa preferir autenticar com token ou ainda nao tiver SSH configurado.

```bash
git clone https://github.com/LeonardoCavalcante/trama.git
```

Na primeira vez em que o Git pedir autenticacao, o usuario informa:

- `Username`: o nome de usuario do GitHub.
- `Password`: o PAT pessoal da propria conta.

#### Qual metodo escolher

- Se a pessoa ja usa SSH no computador, pode continuar com SSH.
- Se a pessoa prefere simplicidade no primeiro acesso, HTTPS com PAT tambem funciona.
- O importante e manter um metodo consistente no computador dela.

### Fluxo basico

1. Atualizar a branch local com as mudancas mais recentes.
2. Criar uma branch para a tarefa.
3. Fazer as alteracoes.
4. Validar localmente.
5. Commitar.
6. Fazer push da branch.
7. Abrir pull request quando o processo de revisao existir.

### Exemplo de branch

- `fix/header-mobile`
- `feat/blog-novo-post`
- `chore/ajuste-links`

## 3. Como baixar as atualizacoes mais recentes

Antes de comecar qualquer manutencao, puxe a versao mais nova do repositorio.

```bash
git checkout main
git pull origin main
```

Se sua equipe trabalha com branch por tarefa, a pessoa pode atualizar a propria branch assim:

```bash
git pull origin main
```

ou, se precisar trazer mudancas de uma branch especifica:

```bash
git pull origin nome-da-branch
```

## 4. Como criar uma branch de manutencao

Depois de atualizar a `main`, crie uma branch propria para a tarefa:

```bash
git checkout -b feat/nome-da-tarefa
```

Exemplo:

```bash
git checkout -b fix/menu-mobile
```

## 5. Como registrar alteracoes com commit

Depois de editar os arquivos:

```bash
git status
git add .
git commit -m "Descricao curta da alteracao"
```

### Boas mensagens de commit

- `Corrige menu no mobile`
- `Ajusta card do blog`
- `Atualiza secao de pessoas`
- `Adiciona novo post`

As mensagens devem ser curtas e objetivas.

## 6. Como enviar as mudancas para o GitHub

Depois do commit, envie a branch para o remoto:

```bash
git push -u origin feat/nome-da-tarefa
```

Se a branch ja existir e voce estiver atualizando a mesma branch, normalmente basta:

```bash
git push
```

## 7. Como atualizar a branch principal com seguranca

O recomendado e nunca dar push direto na `main` sem revisao.

Fluxo sugerido:

1. Criar branch de trabalho.
2. Fazer commit.
3. Enviar branch para o GitHub.
4. Abrir pull request.
5. Revisar codigo.
6. Fazer merge para `main`.

Se o projeto for pequeno e a equipe preferir trabalho direto, ainda assim e melhor revisar localmente antes do push para `main`.

## 8. Como resolver conflito de merge

Se o `git pull` informar conflito:

1. Abra os arquivos indicados.
2. Localize os marcadores de conflito.
3. Escolha a versao correta ou combine as duas.
4. Remova os marcadores do Git.
5. Rode novamente:

```bash
git add .
git commit -m "Resolve conflito de merge"
```

Se o conflito estiver grande, vale conversar com quem alterou o mesmo arquivo antes de prosseguir.

## 9. Como usar GitHub Pages nesse projeto

Como o site e estatico, a publicacao segue o branch principal.

### Configuracao basica

1. No GitHub, abra `Settings`.
2. Entre em `Pages`.
3. Em `Source`, selecione `Deploy from a branch`.
4. Em `Branch`, escolha `main`.
5. Em pasta, escolha `/(root)`.
6. Salve.

Se o repositorio estiver publico, isso normalmente funciona sem custo extra.

## 10. Como atualizar conteudo do site

### Para alterar paginas HTML

- Edite a pagina correspondente em `pages/` ou `index.html`.
- Teste os links entre paginas.
- Verifique versao desktop e mobile.

### Para alterar estilos

- Edite `assets/css/style.css`.
- Se precisar de adaptacao em telas menores, use `assets/css/responsive.css`.

### Para alterar comportamento em JavaScript

- Edite `assets/js/main.js`.
- Teste no navegador depois da alteracao.

### Para adicionar imagens

- Coloque o arquivo em `assets/images/`.
- Use nomes claros e sem espacos.
- Atualize os atributos `alt` quando a imagem for usada no HTML.

## 11. Como adicionar pessoas para manutencao sem quebrar o fluxo

Para manter o projeto organizado:

1. Defina quem pode editar HTML, CSS, JS e quem so revisa.
2. Oriente todos a usar branch separada.
3. Padronize mensagens de commit.
4. Revise alteracoes antes do merge.
5. Evite que varias pessoas editem o mesmo arquivo ao mesmo tempo.

## 12. Checklist antes de publicar qualquer alteracao

- O conteudo abre sem erro.
- Os links internos funcionam.
- O layout continua correto no celular.
- Nenhum arquivo sensivel foi enviado por engano.
- O `git status` esta limpo antes do push final.

## 13. Sobre PAT e acesso ao repositorio

Se a equipe usar HTTPS com token, o PAT serve apenas para autenticar o acesso ao GitHub.

### O PAT e seu ou da equipe?

O PAT e pessoal. Cada pessoa deve usar o proprio token, gerado na propria conta GitHub.

### O que nao fazer

- Nao enviar o seu PAT para outra pessoa.
- Nao colocar o PAT no README, em mensagem ou em arquivo publico.
- Nao reaproveitar um PAT seu para autenticar colegas de equipe.

### O que fazer no lugar

- Convidar a pessoa para o repositorio.
- Pedir para ela configurar a propria chave SSH ou gerar o proprio PAT.
- Conceder apenas a permissao necessaria para a funcao dela.

### O que o PAT pode afetar

- Um PAT fine-grained pode ser limitado a um unico repositorio.
- Um PAT classic pode ter escopos mais amplos, dependendo do que foi liberado.
- O token em si nao altera o codigo do projeto; ele so define o nivel de acesso da pessoa que o usa.

### Boas praticas

- Nao compartilhe PAT em mensagem ou documento publico.
- Se um PAT vazar, revogue imediatamente no GitHub.
- Para equipe, prefira permissao minima necessaria.

## 14. Comandos rapidos de uso diario

### Ver status

```bash
git status
```

### Trazer atualizacoes

```bash
git checkout main
git pull origin main
```

### Criar branch nova

```bash
git checkout -b feat/minha-tarefa
```

### Salvar alteracoes

```bash
git add .
git commit -m "Minha mensagem"
```

### Enviar para o GitHub

```bash
git push -u origin feat/minha-tarefa
```

## 15. Resumo do processo ideal

1. Entrar no repositorio.
2. Atualizar a branch local.
3. Criar branch de manutencao.
4. Fazer alteracoes.
5. Testar localmente.
6. Commitar.
7. Enviar para o GitHub.
8. Revisar e fazer merge.

Esse fluxo reduz conflito, evita perda de trabalho e facilita manutencao por mais de uma pessoa.