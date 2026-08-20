# Definição de Pronto — Viveiro

> Documento herdado. Última alteração: 2026-08-13.

## Definição geral

Uma história está pronta quando todos os requisitos definidos no backlog são cumpridos.

**Perfil do autor:** ao clicar no nome do autor em qualquer cartão, o usuário deve acessar a página de perfil, que exibe nome, tipo (aluno ou professor), curso, interesses e as ideias publicadas, com títulos clicáveis. Caso não existam publicações, deve aparecer **"Ainda não publicou ideias"**. Deve haver um caminho claro de retorno ao mural, sem depender do botão voltar do navegador.

**Busca e criação de ideias:** o filtro por curso deve funcionar corretamente, assim como a busca, que deve ser rápida e apresentar resultados relevantes. O formulário de criação deve conter título, resumo e tags. Ao enviar, a ideia aparece imediatamente no topo do mural, sem recarregar a página, registrando automaticamente o nome do usuário atual como autor e a data do dia. O envio deve ser bloqueado quando o título estiver vazio, com uma mensagem informando o que falta, e a contagem total de ideias deve aumentar em um. A interface deve ser amigável.

**Entrar e sair de grupos (V-05):** a lista de grupos deve indicar claramente se o usuário está dentro ou fora. Ao entrar, seu nome é adicionado à lista de membros e o contador aumenta; ao sair, o nome é removido e o contador diminui. A lista deve mostrar os nomes dos membros, não apenas a quantidade. Alterar a pessoa no campo **"Navegando como"** deve atualizar corretamente a seção **"Meus grupos"**.

**Interesse em ideias:** devem existir os três estados da ideia: **Semente, Germinando e Proposta**. Cada cartão deve possuir o controle **"Tenho interesse em participar"**. Ao demonstrar interesse, o nome do usuário é adicionado à lista de interessados, sem permitir duplicações. Também deve ser possível desfazer o interesse, removendo o nome da lista. O número exibido no cartão deve corresponder exatamente à quantidade de interessados.

**Persistência e notificações:** os dados devem ser armazenados no `localStorage` utilizando `JSON.stringify` e recuperados automaticamente ao carregar a página. Quando alguém demonstrar interesse, o autor do projeto deve receber, em até 1 minuto, uma notificação no celular informando o nome da pessoa interessada e o título da ideia. Ao tocar na notificação, o usuário deve ser direcionado para a ideia correspondente.

**Conclusão:** com todos esses requisitos implementados e funcionando conforme definido no backlog, a história é considerada pronta.


## Critérios de aceitação

Ver o BACKLOG.md, essa é história criada através de outra história.

---
