// ==========================================
// CONTADOR EM TEMPO REAL
// ==========================================
const dataInicioNamoro = new Date('2025-11-20T00:00:00'); // Ajuste sua data aqui!

function atualizarContador() {
    const agora = new Date();
    const diferencaEmMilissegundos = agora - dataInicioNamoro;

    const dias = Math.floor(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencaEmMilissegundos % (1000 * 60 * 60)) / (1000 * 60));

    const elementoContador = document.getElementById('contador-tempo');
    if (elementoContador) {
        elementoContador.innerHTML = `${dias}d ${horas}h ${minutos}m`;
    }
}

atualizarContador();
setInterval(atualizarContador, 60000);

// ==========================================
// CARROSSEL
// ==========================================
let indiceAtual = 0;

function mudarFoto(direcao) {
    const trilho = document.getElementById('track-momentos');
    const slides = trilho.querySelectorAll('.carousel-slide');
    const totalFotos = slides.length;
    
    if (totalFotos === 0) return;

    indiceAtual += direcao;

    if (indiceAtual >= totalFotos) { indiceAtual = 0; }
    if (indiceAtual < 0) { indiceAtual = totalFotos - 1; }

    trilho.style.transform = `translateX(-${indiceAtual * 100}%)`;
}

// ==========================================
// BOTÃO FINAL: CELEBRAR
// ==========================================
function celebrar() {
    const card = document.getElementById('conteudo-card');
    
    card.innerHTML = `
        <span class="wrapped-badge" style="background: #1db954; color: black;">PLAYLIST ATUALIZADA</span>
        <h2 class="wrapped-title" style="color: #1db954; margin-top: 15px; font-size: 2.5rem;">Feliz Dia dos Namorados! ❤️</h2>
        <p class="wrapped-desc" style="color: #b3b3b3;">Que os próximos meses sejam tão incríveis quanto esses. Te amo!</p>
        <div style="font-size: 50px; margin-top: 20px; animation: pulse 1.5s infinite;">💌</div>
    `;

    setInterval(criarCoracao, 200);
}

function criarCoracao() {
    const coracao = document.createElement('div');
    coracao.classList.add('coracao');
    
    const simbolos = ['❤️', '💚', '💖','✨'];
    coracao.innerText = simbolos[Math.floor(Math.random() * simbolos.length)];
    
    coracao.style.left = Math.random() * 100 + "vw";
    coracao.style.fontSize = Math.random() * 20 + 20 + "px";
    coracao.style.animationDuration = Math.random() * 2 + 3 + "s";
    
    document.body.appendChild(coracao);

    setTimeout(() => {
        coracao.remove();
    }, 4000);
}

// ==========================================
// ACCORDION (HISTÓRIAS INTERATIVAS)
// ==========================================
function toggleAccordion(botaoClicado) {
    const item = botaoClicado.parentElement;
    const todosItens = document.querySelectorAll('.accordion-item');
    todosItens.forEach(i => { if(i !== item) i.classList.remove('active'); });
    item.classList.toggle('active');
}

// ==========================================
// EXPANDIR PLAYER NO MOBILE
// ==========================================
function togglePlayerExpand() {
    const player = document.getElementById('music-player');
    if (player.classList.contains('collapsed')) {
        player.classList.remove('collapsed');
        player.classList.add('expanded');
    } else {
        player.classList.remove('expanded');
        player.classList.add('collapsed');
    }
}

// Controla o Play/Pause sem fechar ou abrir o reprodutor
function toggleMúsica(event) {
    if(event) {
        event.stopPropagation(); 
    }
    
    const musica = document.getElementById('background-music');
    const playBtn = document.getElementById('play-button');

    const iconePlay = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M8 5v14l11-7z"></path></svg>`;
    const iconePause = `<svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"></path></svg>`;

    if (musica.paused) {
        musica.play().catch(e => console.log("Aguardando interação do usuário."));
        playBtn.innerHTML = iconePause;
    } else {
        musica.pause();
        playBtn.innerHTML = iconePlay;
    }
}