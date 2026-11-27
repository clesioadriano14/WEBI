const formulario = document.querySelector("#form-anotacao");

function obterTarefas() {
  const dados = localStorage.getItem("tarefas");
  return dados ? JSON.parse(dados) : [];
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const campoTitulo = document.querySelector("#titulo");
  const campoDescricao = document.querySelector("#descricao");

  const tarefaTitulo = campoTitulo.value.trim();
  const tarefaDescricao = campoDescricao.value.trim();

  if (tarefaTitulo === "" || tarefaDescricao === "") return;

  const tarefas = obterTarefas();
  const anotacao = {
    id: Date.now(),
    titulo: tarefaTitulo,
    descricao: tarefaDescricao
  };

  tarefas.push(anotacao);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  formulario.reset();
  listar();
});

function excluir(id) {
  const tarefasAtualizadas = obterTarefas().filter(tarefa => tarefa.id !== id);
  
  localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));
  
  listar();
}

function listar() {
  const lista = document.querySelector("#lista-anotacoes");
  lista.innerHTML = "";

  obterTarefas().forEach(tarefa => {
    const item = document.createElement("li");

    const tituloElemento = document.createElement("strong");
    tituloElemento.textContent = tarefa.titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = tarefa.descricao;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir"); 
    botaoExcluir.addEventListener("click", () => excluir(tarefa.id));

    item.appendChild(tituloElemento);
    item.appendChild(descricaoElemento);
    item.appendChild(botaoExcluir);
    
    lista.appendChild(item);
  });
}

listar();
