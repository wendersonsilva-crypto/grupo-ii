# Definição de Pronto — Viveiro

> Documento herdado. Última alteração: 2026-08-13.

## Definição geral

Uma história está pronta quando o programa da pessoa ao clicar no nome do autor em qualquer cartão abre a página do perfil.
A página exibe o nome, tipo (aluno ou professor), curso e interesses.
Lista as ideias publicadas pela pessoa, com títulos clicáveis.
Se a pessoa não tiver publicado nada, exibe a mensagem: "Ainda não publicou ideias".
Possui um caminho claro de volta ao mural sem precisar do botão de voltar do navegador.
O filtro por curso está funcionando corretamente.
Existe um formulário com título, resumo e tags.
Ao enviar, a ideia surge imediatamente no topo do mural, sem recarregar a página.
A ideia criada registra o nome de quem está navegando como autor e a data do dia.
Caso o título esteja vazio, o envio é impedido e é exibida uma mensagem avisando o que falta.
A contagem total de ideias do mural é incrementada em um
A interface é amigável.
A busca é rápida.
Os resultados retornados são relevantes.
5. Entrar e sair de um grupo (V-05)
A lista de grupos indica claramente se o usuário atual está dentro ou fora.
Ao entrar, o nome do usuário é adicionado à lista de membros e o contador sobe.
Ao sair, o nome é removido e o contador desce.
A lista exibe os nomes dos membros, e não apenas a quantidade numérica.
Trocar a pessoa no campo "Navegando como" atualiza corretamente o que aparece na seção "Meus grupos".
Os três estados da ideia estão implementados: Semente, Germinando e Proposta.
Cada cartão possui o controle "Tenho interesse em participar".
adicionar, o nome do usuário passa a constar na lista de interessados do projeto.
A mesma pessoa não consegue se registrar duas vezes na mesma ideia.
É possível desfazer o interesse, removendo o nome da lista.
O número de interessados no cartão corresponde exatamente ao tamanho da lista.
Os dados são salvos no localStorage usando JSON.stringify e recuperados automaticamente ao carregar a página.
Ao registrar interesse, o autor do projeto recebe uma notificação no celular em até 1 minuto.
A notificação informa o nome de quem se interessou e o título da ideia.
Tocar na notificação redireciona e abre a ideia correspondente.
com todos esses requisitos cumpridos, de acordo com o backlog, a historia está pronta.

## Critérios de aceitação

Ver o BACKLOG.md, essa é história criada através de outra história.

---
