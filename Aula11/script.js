
function obterTarefas() {
    const dados =
        localStorage.getItem("tarefas");
    return dados ? JSON.parse(dados) : [];
}

function adicionar() {
    const campo = document.querySelector("#tarefa");
    const tarefa = campo.value.trim();
    if (tarefa === "") return;
    const tarefas = obterTarefas();
    tarefas.push(tarefa);
    localStorage.setItem("tarefas",
        JSON.stringify(tarefas));
    campo.value = "";
    listar();
}

function listar() {
    const lista = document.querySelector("#lista");
    lista.innerHTML = "";
    obterTarefas().forEach(tarefa => {
        const item = document.createElement("li");
        item.textContent = tarefa;
        lista.appendChild(item);
    });
}
listar();