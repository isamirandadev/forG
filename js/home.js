const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        document.querySelectorAll(".scramble").forEach(el => {
            const finalText = el.dataset.text;
            let iterations = 0;

            const interval = setInterval(() => {
                el.textContent = finalText
                    .split("")
                    .map((char, index) => {
                        if (index < iterations) {
                            return finalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                iterations += 1 / 3;

                if (iterations >= finalText.length) {
                    clearInterval(interval);
                    el.textContent = finalText;
                }
            }, 60);
        });
// ===============
// FIO CURVADO QUE SEGUE O SCROLL SEM ROLAGEM EXTRA
// ===============
const canvas = document.getElementById('fioCanvas');
const ctx = canvas.getContext('2d');

let width = window.innerWidth;
let height = window.innerHeight;
canvas.width = width;
canvas.height = height;

// Gerar um caminho aleatório vertical com curvas suaves
const totalPoints = 150;
const path = [];

function generatePath() {
  path.length = 0; // Limpa o caminho atual

  const baseX = width / 2; // Centraliza na tela

  for (let i = 0; i < totalPoints; i++) {
    let x = baseX + (Math.random() - 0.5) * 200; // Variação menor e centralizada
    let y = (i / (totalPoints - 1)) * 50000;
    path.push({ x, y });
  }
}

generatePath(); // inicial

// Função que desenha a parte visível do fio com base no scroll
function drawFio() {
  const scrollY = window.scrollY;
  const viewHeight = window.innerHeight;

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  let started = false;

  for (let i = 0; i < path.length - 2; i++) {
    const p1 = path[i];
    const p2 = path[i + 1];
    const midX = (p1.x + p2.x) / 2;
    const midY = (p1.y + p2.y) / 2;

    // Só desenha se o ponto estiver visível na viewport
    if (midY >= scrollY - 100 && midY <= scrollY + viewHeight + 100) {
      if (!started) {
        ctx.moveTo(p1.x, p1.y - scrollY);
        started = true;
      }
      ctx.quadraticCurveTo(p1.x, p1.y - scrollY, midX, midY - scrollY);
    }
  }

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.stroke();

  requestAnimationFrame(drawFio);
}

drawFio();

// Redimensiona canvas se a tela mudar
window.addEventListener('resize', () => {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  generatePath(); // Regenera o caminho com a nova largura
});

const audio = document.getElementById("audio");

const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const volume = document.getElementById("volume");

const cover = document.querySelector(".cover");
const songEl = document.querySelector(".song");
const artistEl = document.querySelector(".artist");
const descEl = document.querySelector(".description");

const playlistDiv = document.querySelector(".playlist");

const songs = [
  {
    name: "18",
    artist: "One Direction",
    description: "Eu te amo desde quando tinhamos 18 anos",
    file: "song/18.mp3",
    cover: "imagens/18.jpg"
  },
  {
    name: "Adore You",
    artist: "Harry Styles",
    description: "Eu andaria no fogo por você",
    file: "song/adore you.mp3",
    cover: "imagens/adore you.jpg"
  },
  {
    name: "Afraid of Letting Go",
    artist: "Now United",
    description: "Não tenho medo de arriscar com você",
    file: "song/afraid of letting go.mp3",
    cover: "imagens/afraid of letting go.jpg"
  },
  {
    name: "Alchool Free",
    artist: "Twice",
    description: "Me sinto tonta ao seu lado mesmo sem beber álcool",
    file: "song/alchool free.mp3",
    cover: "imagens/alchool free.jpg"
  },
  {
    name: "Always You",
    artist: "Louis Tomlinson",
    description: "Sempre foi você e ninguém mais",
    file: "song/always you.mp3",
    cover: "imagens/always you.jpg"
  },
  {
    name: "Beautifull Life",
    artist: "Now United",
    description: "A vida se tornou linda no dia que eu te conheci",
    file: "song/beatifull life.mp3",
    cover: "imagens/beautiful life.jpg"
  },
  {
    name: "Best of Me",
    artist: "BTS",
    description: "Você tem o meu melhor",
    file: "song/best of me.mp3",
    cover: "imagens/best of me.jpg"
  },
  {
    name: "Bite Me",
    artist: "Enhypen",
    description: "É somente eu e você nesse mundo",
    file: "song/bite me.mp3",
    cover: "imagens/bite me.jpg"
  },
  {
    name: "Brought the Heat Back",
    artist: "Enhypen",
    description: "Quem é essa pessoa pra quem você deu oi? Por que ela está sorrindo pra você desse jeito? Esse ciúmes me consumiu por inteiro",
    file: "song/brought the heat back.mp3",
    cover: "imagens/brought the heat back.jpg"
  },
  {
    name: "Closer to You",
    artist: "Jungkook",
    description: "Tudo me traz pra mais perto de você",
    file: "song/closer to you.mp3",
    cover: "imagens/closer to you.jpg"
  },
  {
    name: "Cruel Summer",
    artist: "Taylor Swift",
    description: "O verão se torna cruel sem você ao meu lado",
    file: "song/cruel summer.mp3",
    cover: "imagens/cruel summer.jpg"
  },
  {
    name: "Dimple",
    artist: "BTS",
    description: "Você é um anjo? Você é ilegal, sua existência é um crime, mas eu te quero de qualquer forma",
    file: "song/dimple.mp3",
    cover: "imagens/dimple.jpg"
  },
  {
    name: "Don't Wanna Cry",
    artist: "Seventeen",
    description: "Quando acabamos aquela primeira vez eu não aguentava mais chorar pois estava vivendo sem a metade que você levou do meu coração ",
    file: "song/dont wanna cry.mp3",
    cover: "imagens/dont wanna cry.jpg"
  },
  {
    name: "Drunk Dazed",
    artist: "Enhypen",
    description: "Você pode fazer do jeito que quiser, vá o mais longe que puder",
    file: "song/drunk dazed.mp3",
    cover: "imagens/drunk dazed.jpg"
  },
  {
    name: "Dusk Till Dawn",
    artist: "Zayn Malik",
    description: "Eu sempre estarei aqui até o amanhecer",
    file: "song/dusk till dawn.mp3",
    cover: "imagens/dusk till dawn.jpg"
  },
  {
    name: "Fancy",
    artist: "Twice",
    description: "Eu não quero saber de mais ninguém, eu te amo, eu preciso de você, eu gosto de você",
    file: "song/fancy.mp3",
    cover: "imagens/fancy.jpg"
  },
  {
    name: "Feel Special",
    artist: "Twice",
    description: "Eu me sinto especial, eu me sinto amada por sua causa",
    file: "song/feel special.mp3",
    cover: "imagens/feel special.jpg"
  },
  {
    name: "For Us",
    artist: "Taehyung",
    description: "Eu daria tudo por nós",
    file: "song/for us.mp3",
    cover: "imagens/for us.jpg"
  },
  {
    name: "Fri(END)s",
    artist: "Taehyung",
    description: "Faziam e falavamos coisas que amigos não fazem, ainda bem que colocamos o fim em amigos",
    file: "song/fri end s.mp3",
    cover: "imagens/fri end s.jpg"
  },
  {
    name: "Golden",
    artist: "Harry Styles",
    description: "Amar você é o antídoto para corações quebrados",
    file: "song/golden.mp3",
    cover: "imagens/golden.jpg"
  },
  {
    name: "HOME",
    artist: "BTS",
    description: "Você é minha casa, meu lar",
    file: "song/home.mp3",
    cover: "imagens/home.jpg"
  },
  {
    name: "Kiss You",
    artist: "One Direction",
    description: "Tudo que eu preciso é te beijar",
    file: "song/kiss you.mp3",
    cover: "imagens/kiss you.jpg"
  },
  {
    name: "Legends",
    artist: "Now United",
    description: "Eu não acreditava que seria capaz de amar alguém, até que eu te encontrei",
    file: "song/lengends lenda.mp3",
    cover: "imagens/legends lendas.jpg"
  },
  {
    name: "Little Things",
    artist: "One Direction",
    description: "Eu amo suas pequenas coisas",
    file: "song/little things.mp3",
    cover: "imagens/little things.jpg"
  },
  {
    name: "Magic Shop",
    artist: "BTS",
    description: "Sempre estarei te esperando, mesmo que não seja fisicamente, estarei em seu coração te esperando",
    file: "song/magic shop.mp3",
    cover: "imagens/magic shop.jpg"
  },
  {
    name: "Make it Right",
    artist: "BTS",
    description: "Tudo na minha vida é sobre você, até as estradas me guiam para você",
    file: "song/make it right.mp3",
    cover: "imagens/make it right.jpg"
  },
  {
    name: "Mikrosomos",
    artist: "BTS",
    description: "Você brilha, você é realmente a estrela que brilha mesmo nas noites mais escuras",
    file: "song/mikrosomos.mp3",
    cover: "imagens/mikrosomos.jpg"
  },
  {
    name: "Moonlight Sunrise",
    artist: "Twice",
    description: "Vamos fazer aquilo a noite inteira",
    file: "song/moonlight sunrise.mp3",
    cover: "imagens/moonlight sunrise.jpg"
  },
  {
    name: "Na Na Na",
    artist: "Now United",
    description: "O que você me faz, me deixa maluca",
    file: "song/na na na.mp3",
    cover: "imagens/na na na.jpg"
  },
  {
    name: "No Control",
    artist: "One Direction",
    description: "Espero que nunca consiga conter sua arma carregada quando acordamos juntos",
    file: "song/no control.mp3",
    cover: "imagens/no control.jpg"
  },
  {
    name: "One Thing",
    artist: "One Direction",
    description: "Eu preciso daquela coisa que você tem",
    file: "song/one thing.mp3",
    cover: "imagens/one thing.jpg"
  },
  {
    name: "One Way or Another",
    artist: "One Direction",
    description: "De um jeito ou de outro eu dizia que você seria meu",
    file: "song/one way or another.mp3",
    cover: "imagens/one way or another.jpg"
  },
  {
    name: "Perfect",
    artist: "One Direction",
    description: "Eu sou perfeita para você pois fui feita para você",
    file: "song/perfect.mp3",
    cover: "imagens/perfect.jpg"
  },
  {
    name: "Pied Pier",
    artist: "BTS",
    description: "Eu estou aqui para lhe salvar, para lhe destruir",
    file: "song/pied pier.mp3",
    cover: "imagens/pied pier.jpg"
  },
  {
    name: "Pillowtalk",
    artist: "One Direction",
    description: "Essa música não preciso descrever o motivo dela estar aqui, apenas conversa de amigos",
    file: "song/pillowtalk.mp3",
    cover: "imagens/pillowtalk.jpg"
  },
  {
    name: "Python",
    artist: "Got7",
    description: "Levei um tiro no peito e me apaixonei por quem atirou",
    file: "song/python.mp3",
    cover: "imagens/python.jpg"
  },
  {
    name: "Save Me",
    artist: "BTS",
    description: "Eu preciso do seu amor, ele me salva",
    file: "song/save me.mp3",
    cover: "imagens/save me.jpg"
  },
  {
    name: "Seven",
    artist: "Jungkook",
    description: "Quero passar sete dias com você fazendo @#&$!*&%$",
    file: "song/seven.mp3",
    cover: "imagens/seven.jpg"
  },
  {
    name: "Shot Glass of Tears",
    artist: "Jungkook",
    description: "Os dias sem você me fez perceber que eu sou incapaz de sentir algo, sem você eu sou apenas uma casca vazia",
    file: "song/shot glass of tears.mp3",
    cover: "imagens/shot glass of tears.jpg"
  },
  {
    name: "Slow Dancing",
    artist: "Taehyung",
    description: "Aceita dançar lentamente comigo até o amanhecer?",
    file: "song/slow dancing.mp3",
    cover: "imagens/slow dancing.jpg"
  },
  {
    name: "Standing Next to You",
    artist: "Jungkook",
    description: "Estaria parada no fogo ao seu lado",
    file: "song/standing next to you.mp3",
    cover: "imagens/standing next to you.jpg"
  },
  {
    name: "Steal My Girl",
    artist: "One Direction",
    description: "Exite bilhoes de pessoas no mundo, então, procurem outra pessoa pois você me pertence",
    file: "song/steal my girl.mp3",
    cover: "imagens/steal my girl.jpg"
  },
  {
    name: "Sunflower",
    artist: "Harry Styles",
    description: "Eu tinha seu rosto pendurado no alto de uma galeria",
    file: "song/sunflower.mp3",
    cover: "imagens/sunflower.jpg"
  },
  {
    name: "Two of Us",
    artist: "Louis Tomlinson",
    description: "Até o dia que eu morrer, eu vou estar vivendo uma vida para nós dois",
    file: "song/two of us.mp3",
    cover: "imagens/two of us.jpg"
  },
  {
    name: "What Are We Waiting For",
    artist: "Now United",
    description: "Nossa pergunta mental sempre foi o que estamos esperando? Indenpendente do que seja",
    file: "song/what are we waiting for.mp3",
    cover: "imagens/what are we waitiing for.jpg"
  },
  {
    name: "What is Love?",
    artist: "Twice",
    description: "O Twice jamais imaginaria que a resposta para esse pergunta é o nosso amor",
    file: "song/what is love.mp3",
    cover: "imagens/what is love.jpg"
  },
  {
    name: "What Makes You Beautiful",
    artist: "One Direction",
    description: "Você não sabe o quão lindo você é? Não existe níveis para descreve a enorme quantidade que você é",
    file: "song/what makes you beautiful.mp3",
    cover: "imagens/what you make you beautiful.jpg"
  },
  {
    name: "Who Would Think the Love",
    artist: "Now United",
    description: "O nosso amor tomou o tempo necessário para estar onde estamos",
    file: "song/who would think the love.mp3",
    cover: "imagens/who would think the love.jpg"
  },
  {
    name: "Wildest Dream",
    artist: "Taylor Swift",
    description: "Se um dia você me deixar, essas memórias seguirão você em toda parte",
    file: "song/wildest dream.mp3",
    cover: "imagens/wildest dream.jpg"
  }
  ,
  {
    name: "XO",
    artist: "Enhypen",
    description: "Me use como você quiser, voê é o único que existe em meu universo",
    file: "song/xo.mp3",
    cover: "imagens/xo.jpg"
  },
  {
    name: "You & I",
    artist: "One Direction",
    description: "Nada ficará entre eu e você",
    file: "song/you nd i.mp3",
    cover: "imagens/you nd i.jpg"
  }
];

let index = 0;

function loadSong(i){
    const s = songs[i];

    audio.src = s.file;
    cover.src = s.cover;
    songEl.textContent = s.name;
    artistEl.textContent = s.artist;
    descEl.textContent = s.description;

    updatePlaylist();
}

function updatePlaylist(){
    playlistDiv.innerHTML = "";

    songs.forEach((s, i) => {
        const div = document.createElement("div");
        div.textContent = s.name;

        if(i === index) div.style.color = "#1db954";

        div.onclick = () => {
            index = i;
            loadSong(index);
            audio.play();
        };

        playlistDiv.appendChild(div);
    });
}

playBtn.onclick = () => {
    if(audio.paused){
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
};

nextBtn.onclick = () => {
    index = (index + 1) % songs.length;
    loadSong(index);
    audio.play();
};

prevBtn.onclick = () => {
    index = (index - 1 + songs.length) % songs.length;
    loadSong(index);
    audio.play();
};

volume.oninput = () => {
    audio.volume = volume.value;
};

audio.onended = () => nextBtn.onclick();

loadSong(index);

function togglePlaylist() {
  const playlist = document.querySelector(".playlist");
  const arrow = document.querySelector(".toggle-playlist");

  playlist.classList.toggle("hidden");

  if (playlist.classList.contains("hidden")) {
    arrow.innerHTML = "▼";
  } else {
    arrow.innerHTML = "▲";
  }
}
const openLove = document.getElementById("openLove");
const loveModal = document.getElementById("loveModal");
const closeLove = document.getElementById("closeLove");

openLove.onclick = () => {
    loveModal.style.display = "flex";
};

closeLove.onclick = () => {
    loveModal.style.display = "none";
};

window.onclick = (e) => {
    if (e.target === loveModal) {
        loveModal.style.display = "none";
    }
};
