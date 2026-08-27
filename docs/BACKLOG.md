# Backlog do Viveiro
## Documento herdado. Escrito ao longo do 1º semestre de 2026 pela equipe anterior. Última alteração: 27-05-2026

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
Como usuário, quero poder buscar ideias por curso para procurar alunos que se interessem pelas mesmas coisas que eu, e que sejam do mesmo curso que eu. Seria útil um filtro por curso na barra lateral do mural. Pronto quando:

a página exigir que o aluno exponha o curso dele;
uma função que filtra cursos de acordo com a pesquisa da pessoa.

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
página tiver acesso as idéias que você busca, para te recomendar itens parecidos;
a interface estiver de fácil visualização e entendimento;
busca mostrar algo.

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
Como autor, quero que as ideias tenham estados, para que os estados das ideias fiquem registrados.

Pronto quando:

os estados estiverem implementados;
quando o criador das ideias receber notificações de como está seu projeto;
indicar em qual estado o projeto está;
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
Como aluno e professor, não quero perder o que escrevi, para não ter que digitar tudo de novo, e correr o risco de esquecer as informações.

Pronto quando:

os dados forem salvos, e recuperados no carregamento da página;
Os dados irem para um tipo de rascunho em uma área específica.

## V-09 — Aviso de novo interessado — 13 pontos
Como aluno com uma ideia publicada, quero receber uma notificação quando abrir a página, caso alguém demonstrar interesse, para não perder a chance de formar grupo.

Pronto quando:

ao registrar interesse, o autor quando abrir a página, pode visualizar quem interagiu com ele;
a notificação mostra o nome de quem se interessou e o título da ideia;
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

| **História**    | **Situação em que foi recebida**                                                                                | **O que foi alterado**                                                                                                                                                  | **Justificativa**                                                                                                                                        |
| --------------- | --------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **V-01**        | História escrita e já detalhada.                                                                                | Foram adicionados **5 pontos** à história. O conteúdo da história e os critérios de aceite foram mantidos.                                                              | A pontuação foi adicionada para representar o esforço estimado da implementação.                                                                         |
| **V-02**        | História escrita, porém com critério de aceite muito genérico: apenas informava que o filtro deveria funcionar. | A história foi reescrita para indicar que o usuário deve informar seu curso e que deve existir uma função de pesquisa/filtro por curso. Foram adicionados **5 pontos**. | Os critérios anteriores eram pouco específicos. A alteração busca deixar mais claro o funcionamento esperado do filtro.                                  |
| **V-03**        | História escrita e detalhada, com critérios de aceite definidos.                                                | Foram adicionados **8 pontos**. O restante da história foi mantido.                                                                                                     | A pontuação foi adicionada para estimar o esforço necessário para implementar a publicação de ideias.                                                    |
| **V-04**        | História escrita, mas os critérios eram genéricos: interface amigável, busca rápida e resultado relevante.      | Foram adicionados critérios sobre filtrar corretamente e recomendar ideias semelhantes. Também foram adicionados **13 pontos**.                                         | A alteração detalha melhor o funcionamento esperado da busca e acrescenta a recomendação de ideias relacionadas.                                         |
| **V-05**        | História escrita e com critérios de aceite definidos.                                                           | Foi adicionado um **chat aberto dentro do grupo**, além de **13 pontos**.                                                                                               | O chat amplia a funcionalidade do grupo, permitindo a comunicação entre seus membros.                                                                    |
| **V-06**        | História escrita com três estados definidos: semente, germinando e proposta.                                    | Foram adicionados **8 pontos** e uma nova exigência de notificação ao criador sobre o estado do projeto, porém a pessoa não foi especificada e a frase não informava muito                                                          | A notificação acrescenta uma nova funcionalidade, mas o critério ficou pouco claro sobre quando e como a notificação deve ocorrer.                       |
| **V-07**        | História escrita e detalhada.                                                                                   | Foram adicionados **5 pontos**. O restante foi mantido.                                                                                                                 | A funcionalidade original continua a mesma; apenas foi incluída uma estimativa de esforço.                                                               |
| **V-08**        | História escrita para evitar a perda do que foi escrito. Tinha uma linguagem muito técnica e falava o que deveria ser feito, não o resultado                                           | Foram adicionados **8 pontos** e a exigência de que os dados sejam armazenados como **rascunhos em uma área específica**, sem aparecer no mural.                        | A alteração diferencia rascunhos de ideias já publicadas, deixando mais claro onde os dados temporários devem fi        |
| **V-09**        | História escrita para avisar o autor quando alguém demonstrasse interesse. Fere a norma de que alunos não podem acessar o aparelho na escola.                                     | Foram adicionados **13 pontos**. No final dos c"**                                              | A pontuação estima o esforço da funcionalidade. Porém, o trecho sobre caixa de entrada está incompleto e precisa ser esclarecido antes da implementação. |
| **V-10**        | Estava apenas na **Caixa de entrada**, como uma anotação: "ideias paradas".                                     | A anotação foi transformada em uma história completa sobre **criar, editar, manter e publicar rascunhos de ideias**.                                                    | A funcionalidade deixou de ser apenas uma ideia pendente e passou a ter objetivo e critérios de aceite definidos.                                        |
| **V-11**        | Estava na Caixa de entrada apenas como **"relatório por curso"**.                                               | Não houve detalhamento ou alteração significativa.                                                                                                                      | Continua sendo uma anotação que precisa ser especificada antes de ser implementada.                                                                      |
| **V-12**        | Estava na Caixa de entrada apenas como **"exportar / importar o estado"**.                                      | Não houve detalhamento ou alteração significativa.                                                                                                                      | Continua sendo uma anotação que precisa ser especificada antes de ser implementada.                                                                      |
| **B-01 a B-06** | Defeitos conhecidos e não priorizados.                                                                          | Não houve alteração nos defeitos.                                                                                                                                       | Os defeitos continuam registrados para posterior priorização e correção.                                                                                 |
