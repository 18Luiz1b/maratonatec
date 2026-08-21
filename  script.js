// 1. Função para Aumentar/Diminuir o Tamanho da Fonte
let tamanhoFonteAtual = 20;

function mudarFonte(variacao) {
    tamanhoFonteAtual += variacao;
    // Limite mínimo de 16px e máximo de 36px para não quebrar o site
    if (tamanhoFonteAtual < 16) tamanhoFonteAtual = 16;
    if (tamanhoFonteAtual > 36) tamanhoFonteAtual = 36;
    
    document.body.style.fontSize = tamanhoFonteAtual + "px";
}

// 2. Função de Leitura por Áudio (Voz do Navegador)
function lerTexto() {
    const texto = "Bem-vindo ao Detetive de Links. Cole o endereço do site no campo indicado e clique no botão vermelho VERIFICAR LINK AGORA para saber se é seguro.";
    
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Para leituras anteriores antes de começar
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; 
        window.speechSynthesis.speak(fala);
    } else {
        alert("Seu navegador não suporta a função de áudio.");
    }
}

// 3. Função para LER O RESULTADO em voz alta automaticamente
function falarResultado(mensagem) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); // Para leituras anteriores
        const fala = new SpeechSynthesisUtterance(mensagem);
        fala.lang = 'pt-BR';
        fala.rate = 0.9;
        window.speechSynthesis.speak(fala);
    }
}

// 4. Lógica de Validação do Link Corrigida
function verificarLink() {
    const link = document.getElementById("input-link").value.trim().toLowerCase();
    const divResultado = document.getElementById("resultado");

    if (link === "") {
        alert("Por favor, cole ou digite um link primeiro!");
        return;
    }

    // Remove as classes antigas para atualizar o visual do resultado
    divResultado.classList.remove("oculta", "seguro", "perigoso");

    // Lista de palavras que golpistas usam frequentemente
    const palavrasSuspeitas = ["promocao", "premio", "gratis", "urgente", "banco", "atualize", "cpf", "desconto", "ganhe", "sorteio"];
    
    let eGolpe = false;

    // REGRA 1: Se o link NÃO começar com https://, já é considerado inseguro
    if (!link.startsWith("https://")) {
        eGolpe = true;
    } else {
        // REGRA 2: Se começar com https://, passamos a checar as palavras suspeitas
        for (let i = 0; i < palavrasSuspeitas.length; i++) {
            if (link.includes(palavrasSuspeitas[i])) {
                eGolpe = true;
                break; // Se achou uma palavra perigosa, interrompe o loop
            }
        }
    }

    // Exibe o resultado na tela e ativa o áudio
    if (eGolpe) {
        divResultado.classList.add("perigoso");
        const mensagem = "CUIDADO! Este link parece ser PERIGOSO ou FALSO. Não abra e não digite seus dados!";
        divResultado.innerHTML = "🚨 " + mensagem;
        falarResultado(mensagem);
    } else {
        divResultado.classList.add("seguro");
        const mensagem = "PARECE SEGURO! Este endereço parece correto. Mas lembre-se: nunca passe sua senha para ninguém.";
        divResultado.innerHTML = "✅ " + mensagem;
        falarResultado(mensagem);
    }
}