# Backlog do Viveiro
## Documento herdado. Escrito ao longo do 1º semestre de 2026 pela equipe anterior. Última alteração: 2026-05-28.

#### Aviso de quem escreveu: algumas destas histórias passaram pela revisão do cliente e outras não. Não me lembro quais. Boa sorte. — R.M.

# Histórias escritas
## V-01 — Página da pessoa — 5 pontos
Como aluno que encontrou uma ideia interessante, quero ver a página de quem a publicou, para saber se temos interesses em comum antes de procurá-la.

Pronto quando:

clicar no nome do autor, em qualquer cartão, abre a página dessa pessoa;
a página mostra nome, tipo (aluno ou professor), curso e interesses;
a página lista as ideias publicadas por essa pessoa, com o título clicável;
se a pessoa não publicou nenhuma ideia, aparece a frase "ainda não publicou ideias" no lugar da lista vazia;
existe um caminho de volta ao mural sem usar o botão do navegador.

## V-02 — Filtro por curso — 5 pontos
Como usuário, quero poder buscar ideias por curso para procurar alunos que se interessem pelas mesmas coisas que eu, estando em determinado curso. Seria útil um filtro por curso na barra lateral do mural. Pronto quando:

a página exigir que o aluno exponha o curso dele;
uma função que filtra cursos de acordo com a pesquisa da pessoa estiver funcionando plenamente.

## V-03 — Publicar uma ideia — 8 pontos
Como aluno com uma ideia na cabeça, quero publicá-la sem depender de ninguém, para que ela exista antes de eu esquecer.

Pronto quando:

existe um formulário com título, resumo e tags;
ao enviar, a ideia aparece no topo do mural imediatamente, sem recarregar a página;
a ideia criada traz, como autor, o nome de quem está navegando, e a data de hoje;
título vazio impede o envio e mostra uma mensagem dizendo o que falta;
a contagem total de ideias exibida no mural aumenta em um.

## V-04 — Encontrar ideias que combinam comigo — 13 pontos
Como visitante do mural, quero encontrar rapidamente as ideias que combinam comigo, para não perder tempo.

Pronto quando:

busca filtrar corretamente;
página tiver acesso as idéias que você se interessa, para te recomendar itens parecidos;
a interface estiver de fácil visualização e entendimento;
a busca for rápida;
o resultado for relevante.

## V-05 — Entrar e sair de um grupo — 13 pontos
Como aluno que quer se aproximar de um tema, quero entrar num grupo, para acompanhar o que se discute ali.

Pronto quando:

a lista de grupos mostra, em cada grupo, se estou dentro ou fora;
entrar acrescenta meu nome à lista de membros e o contador sobe;
sair remove meu nome e o contador desce;
a lista mostra os nomes dos membros, não apenas o número;
trocar a pessoa em "navegando como" muda corretamente o que aparece como "meus grupos";
o grupo tem um chat aberto onde todos podem expor suas ideias;

## V-06 — Estados da ideia — 8 pontos
Como usuário, quero que as ideias tenham estados, para que os estados das ideias fiquem registrados.

Pronto quando:

os estados estiverem implementados.
quando o criador das ideias receber notificações de como está seu projeto
indicar em qual estado o projeto está
Obs.: falamos em três estados — semente, germinando, proposta.

## V-07 — Registrar interesse em participar — 5 pontos
Como aluno que quer entrar num projeto, quero declarar interesse numa ideia, para que quem a propôs saiba que pode me chamar.

Pronto quando:

cada cartão tem um controle "tenho interesse em participar";
ao acionar, meu nome passa a constar na lista de interessados daquela ideia;
a mesma pessoa não consegue se registrar duas vezes na mesma ideia;
é possível desfazer o interesse, e o nome sai da lista;
o número de interessados exibido no cartão corresponde ao tamanho da lista.

## V-08 — Não perder o que foi escrito — 8 pontos
Como usuário, quero não perder o que escrevi, para não ter que digitar tudo de novo.

Pronto quando:

os dados forem salvos em localStorage usando JSON.stringify, e recuperados no carregamento da página.
Os dados irem para um tipo de rascunho em uma área específica sem se o mural

## V-09 — Aviso de novo interessado — 13 pontos
Como aluno com uma ideia publicada, quero receber uma notificação no celular quando alguém demonstrar interesse, para não perder a chance de formar grupo.

Pronto quando:

ao registrar interesse, o autor recebe uma notificação no celular em até um minuto;
a notificação mostra o nome de quem se interessou e o título da ideia;
tocar na notificação abre a ideia correspondente.
Caixa de entrada
Anotações de conversa.

## V-10 — ideias paradas
Como usuario, quero conseguir fazer rascunhos de ideias, edita-las e postar no momento em que achar que a ideia esta boa.

Pronto quando:
ter uma pagina para deixar apenas rascunhos de ideias, e deixa-las paradas para quando eu tiver interesse de botar a ideia.
conseguir editar as ideia e posta-las quando o usuario quiser.
### V-11 — relatório por curso
### V-12 — exportar / importar o estado
## Defeitos conhecidos
#### Nenhum destes foi priorizado. Estão aqui para não serem esquecidos.

#### B-01 — depois de clicar numa tag, não há como desfazer o filtro; só recarregando a página.
#### B-02 — quando a busca não encontra nada, o mural fica em branco, sem nenhuma explicação.
#### B-03 — a data aparece como 2026-03-14 em vez de 14/03/2026.
#### B-04 — buscar robotica não encontra "Robótica"; buscar Musica não encontra "música".
#### B-05 — o número de apoios no cartão só muda depois que se refaz a busca.
#### B-06 — título comprido vaza para fora do cartão e atravessa o cartão vizinho.

## Registro da triagem — 30/07

| História | Situação em que foi recebida | O que foi alterado | Justificativa |
|---|---|---|---|
| V-02 | ... | ... | ... |
