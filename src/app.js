/* Viveiro — lógica da página */

var estado = {
  pessoa: null,
  busca: "",
  tag: null,
  curso: "",
  aba: "mural",
  detalheIdeia: null,
  detalhePessoa: null
};

var CHAVE = "viveiro_estado";

function pessoaPorId(id) {
  for (var i = 0; i < DADOS.pessoas.length; i++) {
    if (DADOS.pessoas[i].id === id) return DADOS.pessoas[i];
  }
  return null;
}

function nomeDe(id) {
  var p = pessoaPorId(id);
  return p ? p.nome : "(desconhecido)";
}

function ideiaPorId(id) {
  for (var i = 0; i < DADOS.ideias.length; i++) {
    if (DADOS.ideias[i].id === id) return DADOS.ideias[i];
  }
  return null;
}

function normalizarTexto(texto) {
  return String(texto || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function estadoDaIdeia(ideia) {
  return ideia.estado || "semente";
}

function ideiasVisiveis() {
  var resultado = [];
  var busca = normalizarTexto(estado.busca);

  for (var i = 0; i < DADOS.ideias.length; i++) {
    var ideia = DADOS.ideias[i];
    var texto = normalizarTexto(ideia.titulo) + " " + normalizarTexto(ideia.resumo);
    var casaTexto = busca === "" || texto.includes(busca);
    var casaTag = estado.tag === null || ideia.tags.indexOf(estado.tag) >= 0;
    var autor = pessoaPorId(ideia.autor);
    var casaCurso = estado.curso === "" || (autor && autor.curso === estado.curso);

    if (casaTexto && casaTag && casaCurso) resultado.push(ideia);
  }

  return resultado;
}

function salvarEstado() {
  var dados = {
    pessoa: estado.pessoa,
    rascunhos: obterRascunhos(),
    interesses: obterInteresses(),
    grupos: obterGruposLocais(),
    mensagens: obterMensagens(),
    ideias: DADOS.ideias
  };

  localStorage.setItem(CHAVE, JSON.stringify(dados));
}

function carregarEstado() {
  var salvo = localStorage.getItem(CHAVE);
  if (!salvo) return;

  try {
    var dados = JSON.parse(salvo);

    if (dados.pessoa && pessoaPorId(Number(dados.pessoa))) {
      estado.pessoa = Number(dados.pessoa);
    }

    if (Array.isArray(dados.rascunhos)) localStorage.setItem("viveiro_rascunhos", JSON.stringify(dados.rascunhos));
    if (dados.interesses) localStorage.setItem("viveiro_interesses", JSON.stringify(dados.interesses));
    if (dados.grupos) localStorage.setItem("viveiro_grupos", JSON.stringify(dados.grupos));
    if (dados.mensagens) localStorage.setItem("viveiro_mensagens", JSON.stringify(dados.mensagens));

    if (Array.isArray(dados.ideias)) {
      DADOS.ideias = dados.ideias;
    }
  } catch (e) {
    localStorage.removeItem(CHAVE);
  }
}

function obterRascunhos() {
  try { return JSON.parse(localStorage.getItem("viveiro_rascunhos") || "[]"); }
  catch (e) { return []; }
}

function gravarRascunhos(lista) {
  localStorage.setItem("viveiro_rascunhos", JSON.stringify(lista));
}

function obterInteresses() {
  try { return JSON.parse(localStorage.getItem("viveiro_interesses") || "{}"); }
  catch (e) { return {}; }
}

function obterGruposLocais() {
  try { return JSON.parse(localStorage.getItem("viveiro_grupos") || "{}"); }
  catch (e) { return {}; }
}

function obterMensagens() {
  try { return JSON.parse(localStorage.getItem("viveiro_mensagens") || "{}"); }
  catch (e) { return {}; }
}

function desenhar() {
  desenharSeletorDePessoas();
  preencherCursos();
  desenharMural();
  desenharGrupos();
  desenharRascunhos();
  desenharPerfil();
  aplicarAba();
  document.getElementById("base").textContent = "base " + DADOS.codigo;
}

function preencherCursos() {
  var select = document.getElementById("filtro-curso");
  var cursos = [];
  for (var i = 0; i < DADOS.pessoas.length; i++) {
    if (cursos.indexOf(DADOS.pessoas[i].curso) < 0) cursos.push(DADOS.pessoas[i].curso);
  }
  cursos.sort();

  if (select.options.length === 1) {
    for (var j = 0; j < cursos.length; j++) {
      var op = document.createElement("option");
      op.value = cursos[j];
      op.textContent = cursos[j];
      select.appendChild(op);
    }
  }
  select.value = estado.curso;
}

function desenharSeletorDePessoas() {
  var alvo = document.getElementById("quem");
  if (alvo.options.length === 0) {
    for (var i = 0; i < DADOS.pessoas.length; i++) {
      var p = DADOS.pessoas[i];
      var opcao = document.createElement("option");
      opcao.value = p.id;
      opcao.textContent = p.nome + " (" + p.curso + ")";
      alvo.appendChild(opcao);
    }
  }
  alvo.value = estado.pessoa;
}

function desenharMural() {
  var lista = ideiasVisiveis();
  var alvo = document.getElementById("cartoes");
  alvo.innerHTML = "";

  if (lista.length === 0) {
    var mensagem = document.createElement("p");
    mensagem.className = "sem-resultados";
    mensagem.textContent = "Nenhuma ideia encontrada com os filtros atuais.";
    alvo.appendChild(mensagem);
  }

  for (var i = 0; i < lista.length; i++) {
    alvo.appendChild(montarCartao(lista[i]));
  }

  document.getElementById("contagem").textContent = lista.length + " de " + DADOS.ideias.length + " ideias";

  var aviso = document.getElementById("filtro-ativo");
  var filtros = [];
  if (estado.tag !== null) filtros.push("etiqueta: " + estado.tag);
  if (estado.curso !== "") filtros.push("curso: " + estado.curso);
  if (estado.busca !== "") filtros.push("busca: " + estado.busca);
  aviso.textContent = filtros.length ? "filtros ativos — " + filtros.join(" · ") : "";

  document.getElementById("recomendacoes").innerHTML = montarRecomendacoes();
}

function montarCartao(ideia) {
  var cartao = document.createElement("article");
  cartao.className = "cartao";

  var titulo = document.createElement("h3");
  var linkTitulo = document.createElement("button");
  linkTitulo.className = "link-titulo";
  linkTitulo.type = "button";
  linkTitulo.textContent = ideia.titulo;
  linkTitulo.onclick = function () { abrirIdeia(ideia.id); };
  titulo.appendChild(linkTitulo);
  cartao.appendChild(titulo);

  var autoria = document.createElement("div");
  autoria.className = "autoria";
  var linkAutor = document.createElement("button");
  linkAutor.className = "link-autor";
  linkAutor.type = "button";
  linkAutor.textContent = nomeDe(ideia.autor);
  linkAutor.onclick = function () { abrirPessoa(ideia.autor); };
  autoria.appendChild(linkAutor);
  autoria.appendChild(document.createTextNode(" · " + formatarData(ideia.data)));
  cartao.appendChild(autoria);

  var estadoEl = document.createElement("span");
  estadoEl.className = "estado " + estadoDaIdeia(ideia);
  estadoEl.textContent = estadoDaIdeia(ideia);
  cartao.appendChild(estadoEl);

  var resumo = document.createElement("p");
  resumo.className = "resumo";
  resumo.textContent = ideia.resumo;
  cartao.appendChild(resumo);

  var tags = document.createElement("div");
  tags.className = "tags";
  for (var i = 0; i < ideia.tags.length; i++) {
    var etiqueta = document.createElement("button");
    etiqueta.type = "button";
    etiqueta.className = "etiqueta";
    etiqueta.textContent = ideia.tags[i];
    etiqueta.onclick = criarCliqueDeTag(ideia.tags[i]);
    tags.appendChild(etiqueta);
  }
  cartao.appendChild(tags);

  var acoes = document.createElement("div");
  acoes.className = "acoes-cartao";

  var interesse = document.createElement("button");
  interesse.type = "button";
  interesse.className = "botao-interesse";
  interesse.textContent = tenhoInteresse(ideia.id) ? "retirar interesse" : "tenho interesse em participar";
  interesse.onclick = function () { alternarInteresse(ideia.id); };
  acoes.appendChild(interesse);

  var apoiar = document.createElement("button");
  apoiar.type = "button";
  apoiar.className = "apoiar";
  apoiar.textContent = "apoiar";
  apoiar.onclick = criarCliqueDeApoio(ideia.id);
  acoes.appendChild(apoiar);

  var contador = document.createElement("span");
  contador.className = "apoios";
  contador.textContent = ideia.apoios + " apoios";
  acoes.appendChild(contador);

  var interessesCount = document.createElement("span");
  interessesCount.className = "apoios";
  interessesCount.textContent = quantidadeInteressados(ideia.id) + " interessados";
  acoes.appendChild(interessesCount);

  cartao.appendChild(acoes);
  return cartao;
}

function formatarData(data) {
  var partes = String(data || "").split("-");
  if (partes.length !== 3) return data;
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function criarCliqueDeTag(tag) {
  return function () {
    estado.tag = estado.tag === tag ? null : tag;
    desenharMural();
  };
}

function criarCliqueDeApoio(idIdeia) {
  return function () {
    var ideia = ideiaPorId(idIdeia);
    if (!ideia) return;
    ideia.apoios = Number(ideia.apoios || 0) + 1;
    salvarEstado();
    desenharMural();
  };
}

function alternarInteresse(idIdeia) {
  var interesses = obterInteresses();
  var chave = String(idIdeia);
  var lista = interesses[chave] || [];
  var indice = lista.indexOf(estado.pessoa);
  var ideia = ideiaPorId(idIdeia);

  if (indice >= 0) {
    lista.splice(indice, 1);
  } else {
    lista.push(estado.pessoa);
    criarNotificacao(ideia, estado.pessoa);
  }

  interesses[chave] = lista;
  localStorage.setItem("viveiro_interesses", JSON.stringify(interesses));
  salvarEstado();
  desenharMural();
}

function tenhoInteresse(idIdeia) {
  var interesses = obterInteresses();
  var lista = interesses[String(idIdeia)] || [];
  return lista.indexOf(estado.pessoa) >= 0;
}

function quantidadeInteressados(idIdeia) {
  var interesses = obterInteresses();
  return (interesses[String(idIdeia)] || []).length;
}

function criarNotificacao(ideia, pessoaId) {
  if (!ideia) return;
  var texto = nomeDe(pessoaId) + " demonstrou interesse em participar de \"" + ideia.titulo + "\".";
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification("Novo interessado no Viveiro", { body: texto });
  } else if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().then(function () {
      if (Notification.permission === "granted") {
        new Notification("Novo interessado no Viveiro", { body: texto });
      }
    });
  }
}

function montarRecomendacoes() {
  var pessoa = pessoaPorId(estado.pessoa);
  if (!pessoa) return "";

  var recomendadas = [];
  for (var i = 0; i < DADOS.ideias.length; i++) {
    var ideia = DADOS.ideias[i];
    var score = 0;
    for (var j = 0; j < pessoa.interesses.length; j++) {
      if (ideia.tags.indexOf(pessoa.interesses[j]) >= 0) score++;
    }
    if (score > 0) recomendadas.push({ ideia: ideia, score: score });
  }

  recomendadas.sort(function (a, b) { return b.score - a.score; });
  if (recomendadas.length === 0) return "";

  var texto = "<div class=\"recomendacao-cabecalho\"><strong>Ideias que combinam com seus interesses</strong><span>com base nas suas tags de interesse</span></div><div class=\"recomendacao-lista\">";
  var limite = Math.min(3, recomendadas.length);
  for (var k = 0; k < limite; k++) {
    texto += "<button type=\"button\" class=\"recomendacao-item\" data-id=\"" + recomendadas[k].ideia.id + "\">" + escapeHtml(recomendadas[k].ideia.titulo) + "</button>";
  }
  texto += "</div>";
  return texto;
}

function escaparTexto(texto) {
  return String(texto).replace(/[&<>\"']/g, function (c) {
    return {"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c];
  });
}
var escapeHtml = escaparTexto;

function abrirIdeia(id) {
  estado.detalheIdeia = id;
  estado.aba = "detalhe";
  document.getElementById("mural").className = "escondido";
  document.getElementById("grupos").className = "escondido";
  document.getElementById("rascunhos").className = "escondido";
  document.getElementById("pessoa").className = "escondido";
  document.getElementById("ideia-detalhe").className = "";

  var ideia = ideiaPorId(id);
  var alvo = document.getElementById("detalhe-conteudo");
  alvo.innerHTML = "";
  if (!ideia) return;

  var h2 = document.createElement("h2");
  h2.textContent = ideia.titulo;
  alvo.appendChild(h2);
  var p = document.createElement("p");
  p.textContent = ideia.resumo;
  alvo.appendChild(p);

  var estadoAtual = document.createElement("div");
  estadoAtual.className = "controle-estado";
  estadoAtual.innerHTML = "<strong>Estado do projeto:</strong> ";
  var select = document.createElement("select");
  ["semente", "germinando", "proposta"].forEach(function (nomeEstado) {
    var op = document.createElement("option");
    op.value = nomeEstado;
    op.textContent = nomeEstado;
    select.appendChild(op);
  });
  select.value = estadoDaIdeia(ideia);
  select.onchange = function () {
    ideia.estado = this.value;
    salvarEstado();
    criarNotificacaoEstado(ideia);
    abrirIdeia(id);
    desenharMural();
  };
  estadoAtual.appendChild(select);
  alvo.appendChild(estadoAtual);

  var autor = document.createElement("button");
  autor.type = "button";
  autor.className = "link-autor grande";
  autor.textContent = "Publicado por " + nomeDe(ideia.autor);
  autor.onclick = function () { abrirPessoa(ideia.autor); };
  alvo.appendChild(autor);

  var interessados = document.createElement("p");
  var ids = obterInteresses()[String(ideia.id)] || [];
  interessados.textContent = "Interessados: " + (ids.length ? ids.map(nomeDe).join(", ") : "nenhum ainda");
  alvo.appendChild(interessados);

  var mensagens = montarChat("ideia", ideia.id);
  alvo.appendChild(mensagens);
}

function criarNotificacaoEstado(ideia) {
  if (Number(ideia.autor) !== Number(estado.pessoa)) return;
  if (!("Notification" in window)) return;
  var texto = "Sua ideia \"" + ideia.titulo + "\" está no estado \"" + estadoDaIdeia(ideia) + "\".";
  if (Notification.permission === "granted") new Notification("Atualização da ideia", { body: texto });
}

function montarChat(tipo, id) {
  var caixa = document.createElement("div");
  caixa.className = "chat-box";
  var h3 = document.createElement("h3");
  h3.textContent = "Conversa";
  caixa.appendChild(h3);

  var mensagens = obterMensagens();
  var chave = tipo + ":" + id;
  var lista = mensagens[chave] || [];
  var historico = document.createElement("div");
  historico.className = "chat-historico";
  for (var i = 0; i < lista.length; i++) {
    var item = document.createElement("p");
    item.innerHTML = "<strong>" + escapeHtml(nomeDe(lista[i].autor)) + ":</strong> " + escapeHtml(lista[i].texto);
    historico.appendChild(item);
  }
  caixa.appendChild(historico);

  var linha = document.createElement("div");
  linha.className = "chat-linha";
  var input = document.createElement("input");
  input.placeholder = "escreva uma mensagem...";
  var botao = document.createElement("button");
  botao.type = "button";
  botao.textContent = "enviar";
  botao.onclick = function () {
    var texto = input.value.trim();
    if (!texto) return;
    lista.push({ autor: estado.pessoa, texto: texto, data: new Date().toISOString() });
    mensagens[chave] = lista;
    localStorage.setItem("viveiro_mensagens", JSON.stringify(mensagens));
    abrirIdeia(id);
  };
  linha.appendChild(input);
  linha.appendChild(botao);
  caixa.appendChild(linha);
  return caixa;
}

function desenharGrupos() {
  var alvo = document.getElementById("lista-grupos");
  alvo.innerHTML = "";
  var locais = obterGruposLocais();

  for (var i = 0; i < DADOS.grupos.length; i++) {
    var g = DADOS.grupos[i];
    var item = document.createElement("li");
    var dentro = g.membros.indexOf(estado.pessoa) >= 0;
    if (locais[g.id] && locais[g.id].membros) {
      g = copiarGrupo(g);
      g.membros = locais[g.id].membros;
      dentro = g.membros.indexOf(estado.pessoa) >= 0;
    }

    var topo = document.createElement("div");
    topo.className = "grupo-topo";
    var nome = document.createElement("span");
    nome.className = "nome";
    nome.textContent = g.nome;
    topo.appendChild(nome);

    var quantos = document.createElement("span");
    quantos.className = "quantos";
    quantos.textContent = g.membros.length + " membros";
    topo.appendChild(quantos);
    item.appendChild(topo);

    var descricao = document.createElement("p");
    descricao.className = "descricao";
    descricao.textContent = g.descricao;
    item.appendChild(descricao);

    var membros = document.createElement("p");
    membros.className = "membros";
    membros.textContent = "Membros: " + (g.membros.length ? g.membros.map(nomeDe).join(", ") : "nenhum");
    item.appendChild(membros);

    var botoes = document.createElement("div");
    botoes.className = "acoes-grupo";
    var entrar = document.createElement("button");
    entrar.type = "button";
    entrar.textContent = dentro ? "sair do grupo" : "entrar no grupo";
    entrar.onclick = function (grupoId) {
      return function () { alternarGrupo(grupoId); };
    }(g.id);
    botoes.appendChild(entrar);

    var chat = document.createElement("button");
    chat.type = "button";
    chat.textContent = "abrir chat";
    chat.onclick = function (grupoId) {
      return function () { abrirChatGrupo(grupoId); };
    }(g.id);
    botoes.appendChild(chat);

    item.appendChild(botoes);
    alvo.appendChild(item);
  }
}

function copiarGrupo(g) {
  return { id: g.id, nome: g.nome, descricao: g.descricao, membros: g.membros.slice() };
}

function alternarGrupo(idGrupo) {
  var locais = obterGruposLocais();
  var base = null;
  for (var i = 0; i < DADOS.grupos.length; i++) if (DADOS.grupos[i].id === idGrupo) base = DADOS.grupos[i];
  if (!base) return;

  var g = locais[idGrupo] ? copiarGrupo(locais[idGrupo]) : copiarGrupo(base);
  var pos = g.membros.indexOf(estado.pessoa);
  if (pos >= 0) g.membros.splice(pos, 1);
  else g.membros.push(estado.pessoa);
  locais[idGrupo] = g;
  localStorage.setItem("viveiro_grupos", JSON.stringify(locais));
  salvarEstado();
  desenharGrupos();
}

function abrirChatGrupo(idGrupo) {
  var box = document.createElement("div");
  box.className = "modal-chat";
  var base = null;
  for (var i = 0; i < DADOS.grupos.length; i++) if (DADOS.grupos[i].id === idGrupo) base = DADOS.grupos[i];
  if (!base) return;

  box.innerHTML = "<div class=\"modal-conteudo\"><button id=\"fechar-chat\" class=\"fechar\">×</button><h2>Chat — " + escapeHtml(base.nome) + "</h2></div>";
  document.body.appendChild(box);
  var conteudo = box.querySelector(".modal-conteudo");
  var chat = montarChat("grupo", idGrupo);
  conteudo.appendChild(chat);
  box.querySelector("#fechar-chat").onclick = function () { box.remove(); };
}

function desenharRascunhos() {
  var alvo = document.getElementById("lista-rascunhos");
  alvo.innerHTML = "";
  var lista = obterRascunhos().filter(function (r) { return Number(r.autor) === Number(estado.pessoa); });

  if (lista.length === 0) {
    alvo.innerHTML = "<p class=\"sem-resultados\">Você ainda não possui rascunhos.</p>";
    return;
  }

  for (var i = 0; i < lista.length; i++) {
    var r = lista[i];
    var card = document.createElement("article");
    card.className = "rascunho-card";
    card.innerHTML = "<h3>" + escapeHtml(r.titulo || "Sem título") + "</h3><p>" + escapeHtml(r.resumo || "Sem resumo") + "</p>";

    var editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "editar";
    editar.onclick = function (id) { return function () { editarRascunho(id); }; }(r.id);
    card.appendChild(editar);

    var publicar = document.createElement("button");
    publicar.type = "button";
    publicar.textContent = "publicar";
    publicar.onclick = function (id) { return function () { publicarRascunho(id); }; }(r.id);
    card.appendChild(publicar);

    var apagar = document.createElement("button");
    apagar.type = "button";
    apagar.textContent = "excluir";
    apagar.onclick = function (id) { return function () { excluirRascunho(id); }; }(r.id);
    card.appendChild(apagar);

    alvo.appendChild(card);
  }
}

function salvarRascunho() {
  var titulo = document.getElementById("titulo").value.trim();
  var resumo = document.getElementById("resumo").value.trim();
  var tags = document.getElementById("tags").value.trim();
  if (!titulo && !resumo && !tags) return;

  var lista = obterRascunhos();
  lista.push({
    id: Date.now(),
    titulo: titulo,
    resumo: resumo,
    tags: tags,
    autor: estado.pessoa,
    data: new Date().toISOString().slice(0, 10)
  });
  gravarRascunhos(lista);
  document.getElementById("form-ideia").reset();
  desenharRascunhos();
}

function editarRascunho(id) {
  var lista = obterRascunhos();
  var r = lista.find(function (item) { return item.id === id; });
  if (!r) return;
  document.getElementById("titulo").value = r.titulo;
  document.getElementById("resumo").value = r.resumo;
  document.getElementById("tags").value = r.tags;
  trocarAba("mural");
}

function publicarRascunho(id) {
  var lista = obterRascunhos();
  var indice = -1;
  for (var i = 0; i < lista.length; i++) if (lista[i].id === id) indice = i;
  if (indice < 0) return;

  var r = lista[indice];
  var maiorId = 0;
  for (var j = 0; j < DADOS.ideias.length; j++) if (DADOS.ideias[j].id > maiorId) maiorId = DADOS.ideias[j].id;
  DADOS.ideias.unshift({
    id: maiorId + 1,
    titulo: r.titulo,
    resumo: r.resumo,
    tags: r.tags ? r.tags.split(",").map(function (x) { return x.trim(); }).filter(Boolean) : [],
    autor: estado.pessoa,
    data: new Date().toISOString().slice(0, 10),
    apoios: 0,
    estado: "semente"
  });
  lista.splice(indice, 1);
  gravarRascunhos(lista);
  salvarEstado();
  trocarAba("mural");
  desenharMural();
}

function excluirRascunho(id) {
  var lista = obterRascunhos().filter(function (r) { return r.id !== id; });
  gravarRascunhos(lista);
  desenharRascunhos();
}

function publicarIdeia() {
  var titulo = document.getElementById("titulo").value.trim();
  var resumo = document.getElementById("resumo").value.trim();
  var tagsTexto = document.getElementById("tags").value.trim();
  var erro = document.getElementById("erro-ideia");

  if (titulo === "") {
    erro.textContent = "O título é obrigatório.";
    document.getElementById("titulo").focus();
    return;
  }

  var tags = tagsTexto ? tagsTexto.split(",").map(function (tag) { return tag.trim(); }).filter(Boolean) : [];
  var maiorId = 0;
  for (var i = 0; i < DADOS.ideias.length; i++) if (DADOS.ideias[i].id > maiorId) maiorId = DADOS.ideias[i].id;

  DADOS.ideias.unshift({
    id: maiorId + 1,
    titulo: titulo,
    resumo: resumo,
    tags: tags,
    autor: estado.pessoa,
    data: new Date().toISOString().slice(0, 10),
    apoios: 0,
    estado: "semente"
  });

  erro.textContent = "";
  document.getElementById("form-ideia").reset();
  salvarEstado();
  desenharMural();
}

function desenharPerfil() {
  var alvo = document.getElementById("perfil-pessoa");
  var id = estado.detalhePessoa !== null ? estado.detalhePessoa : estado.pessoa;
  var p = pessoaPorId(id);
  if (!p) return;

  alvo.innerHTML = "";
  var h2 = document.createElement("h2");
  h2.textContent = p.nome;
  alvo.appendChild(h2);

  var info = document.createElement("p");
  info.textContent = p.tipo + " · " + p.curso;
  alvo.appendChild(info);

  var interesses = document.createElement("p");
  interesses.innerHTML = "<strong>Interesses:</strong> " + p.interesses.map(escapeHtml).join(", ");
  alvo.appendChild(interesses);

  var titulo = document.createElement("h3");
  titulo.textContent = "Ideias publicadas";
  alvo.appendChild(titulo);

  var ideias = DADOS.ideias.filter(function (ideia) { return Number(ideia.autor) === Number(p.id); });
  if (ideias.length === 0) {
    var vazio = document.createElement("p");
    vazio.textContent = "ainda não publicou ideias";
    alvo.appendChild(vazio);
  } else {
    var ul = document.createElement("ul");
    for (var i = 0; i < ideias.length; i++) {
      var li = document.createElement("li");
      var bt = document.createElement("button");
      bt.type = "button";
      bt.className = "link-titulo";
      bt.textContent = ideias[i].titulo;
      bt.onclick = function (id) { return function () { abrirIdeia(id); }; }(ideias[i].id);
      li.appendChild(bt);
      ul.appendChild(li);
    }
    alvo.appendChild(ul);
  }
}

function abrirPessoa(id) {
  estado.detalhePessoa = id;
  estado.aba = "pessoa";
  aplicarAba();
  desenharPerfil();
}

function trocarAba(qual) {
  estado.aba = qual;
  estado.detalhePessoa = null;
  aplicarAba();
  if (qual === "mural") desenharMural();
  if (qual === "grupos") desenharGrupos();
  if (qual === "rascunhos") desenharRascunhos();
  if (qual === "pessoa") desenharPerfil();
}

function aplicarAba() {
  var secoes = ["mural", "grupos", "rascunhos", "pessoa", "ideia-detalhe"];
  for (var i = 0; i < secoes.length; i++) document.getElementById(secoes[i]).className = "escondido";
  if (estado.aba === "detalhe") document.getElementById("ideia-detalhe").className = "";
  else document.getElementById(estado.aba).className = "";

  document.getElementById("aba-mural").className = estado.aba === "mural" ? "aba ativa" : "aba";
  document.getElementById("aba-grupos").className = estado.aba === "grupos" ? "aba ativa" : "aba";
  document.getElementById("aba-rascunhos").className = estado.aba === "rascunhos" ? "aba ativa" : "aba";
  document.getElementById("aba-pessoa").className = estado.aba === "pessoa" ? "aba ativa" : "aba";
}

function exportarEstado() {
  var dados = localStorage.getItem(CHAVE) || "";
  var blob = new Blob([dados], { type: "application/json" });
  var url = URL.createObjectURL(blob);
  var a = document.createElement("a");
  a.href = url;
  a.download = "viveiro-estado.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importarEstado(arquivo) {
  var leitor = new FileReader();
  leitor.onload = function () {
    try {
      var dados = JSON.parse(leitor.result);
      localStorage.setItem(CHAVE, JSON.stringify(dados));
      location.reload();
    } catch (e) {
      alert("Arquivo de estado inválido.");
    }
  };
  leitor.readAsText(arquivo);
}

function iniciar() {
  estado.pessoa = DADOS.pessoas[0].id;
  carregarEstado();

  document.getElementById("busca").oninput = function (e) {
    estado.busca = e.target.value;
    desenharMural();
  };

  document.getElementById("filtro-curso").onchange = function (e) {
    estado.curso = e.target.value;
    desenharMural();
  };

  document.getElementById("limpar-filtros").onclick = function () {
    estado.busca = "";
    estado.curso = "";
    estado.tag = null;
    document.getElementById("busca").value = "";
    document.getElementById("filtro-curso").value = "";
    desenharMural();
  };

  document.getElementById("quem").onchange = function (e) {
    estado.pessoa = Number(e.target.value);
    salvarEstado();
    desenharMural();
    desenharGrupos();
    desenharRascunhos();
    desenharPerfil();
  };

  document.getElementById("form-ideia").onsubmit = function (e) {
    e.preventDefault();
    publicarIdeia();
  };

  document.getElementById("salvar-rascunho").onclick = salvarRascunho;
  document.getElementById("aba-mural").onclick = function () { trocarAba("mural"); };
  document.getElementById("aba-grupos").onclick = function () { trocarAba("grupos"); };
  document.getElementById("aba-rascunhos").onclick = function () { trocarAba("rascunhos"); };
  document.getElementById("aba-pessoa").onclick = function () { trocarAba("pessoa"); };
  document.getElementById("voltar-mural").onclick = function () { trocarAba("mural"); };

  document.getElementById("recomendacoes").onclick = function (e) {
    var botao = e.target.closest(".recomendacao-item");
    if (botao) abrirIdeia(Number(botao.getAttribute("data-id")));
  };

  desenhar();
}

iniciar();
