async function carregarProjetos() {
    try {
        const resposta = await fetch('./data.json');
        const projetos = await resposta.json();

        const niveis = ["newbie", "junior", "intermediate", "advanced", "guru"];

        const destaqueContainer = document.querySelector("#destaque .grid")
        const destaque = projetos.filter(p => p.destaque === true);
        destaque.forEach(p => {
          const card = document.createElement("div");
          card.className = "p-4 rounded-lg bg-gray-800 text-gray-100 shadow hover:shadow-lg transition";

          card.innerHTML = `
            <img src="${p.preview}" alt="${p.titulo} Preview" class="rounded mb-3 border border-gray-700">
            <h3 class="font-bold text-indigo-400 text-xl">${p.titulo}</h3>
            <p class="text-sm text-gray-400 mt-1">${p.descricao}</p>
            <ul class="text-sm mt-2 space-y-1">
            <li><strong>📅 Data:</strong> ${p.data}</li>
            <li><strong>🛠️ Tecnologias:</strong> ${p.tecnologias.join(", ")}</li>
            <li><strong>📚 Aprendizado:</strong> ${p.aprendizado}</li>
            </ul>
            <div class="mt-3 flex flex-wrap gap-3 text-sm">
            <a href="${p.demoLink}" class="text-indigo-300 hover:underline">👁️ Ver desafio</a>
            <a href="${p.repositorio}" class="text-indigo-300 hover:underline">📁 Ver repositório</a>
            </div>
          `;
          destaqueContainer.appendChild(card);
        });
        niveis.forEach(nivel => {

          const container = document.querySelector(`#${nivel.toLowerCase()} .grid`);
          const filtrados = projetos.filter(p => p.nivel === nivel);

            if (filtrados.length === 0) {
                const mensagem = document.createElement("p");
                mensagem.className = "text-gray-400 text-sm";
                mensagem.textContent = "Ainda não há desafios publicados nesse nível.";
                container.appendChild(mensagem);
                return;
            }

            filtrados.forEach(p => {
            const card = document.createElement("div");
            card.className = "p-4 rounded-lg bg-gray-800 text-gray-100 shadow hover:shadow-lg transition";

            card.innerHTML = `
                <img src="${p.preview}" alt="${p.titulo} Preview" class="rounded mb-3 border border-gray-700">
                <h3 class="font-bold text-indigo-400 text-xl">${p.titulo}</h3>
                <p class="text-sm text-gray-400 mt-1">${p.descricao}</p>
                <ul class="text-sm mt-2 space-y-1">
                <li><strong>📅 Data:</strong> ${p.data}</li>
                <li><strong>🛠️ Tecnologias:</strong> ${p.tecnologias.join(", ")}</li>
                <li><strong>📚 Aprendizado:</strong> ${p.aprendizado}</li>
                </ul>
                <div class="mt-3 flex flex-wrap gap-3 text-sm">
                <a href="${p.demoLink}" class="text-indigo-300 hover:underline">👁️ Ver desafio</a>
                <a href="${p.repositorio}" class="text-indigo-300 hover:underline">📁 Ver repositório</a>
                </div>
            `;

            container.appendChild(card);
            });
        });

    } catch (erro) {
      console.error("Erro ao carregar data.json:", erro);
    }
}

document.addEventListener("DOMContentLoaded", carregarProjetos);

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("fa-angle-down") || e.target.classList.contains("fa-angle-up")) {
    const grid = e.target.parentElement.nextElementSibling;
    if (grid) {
      const isHidden = window.getComputedStyle(grid).display === "none";
      grid.style.display = isHidden ? "grid" : "none";
      e.target.classList.toggle("fa-angle-down");
      e.target.classList.toggle("fa-angle-up");
    }
  }
});