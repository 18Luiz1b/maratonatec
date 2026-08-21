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
    
    // Verifica se o navegador suporta voz
    if ('speechSynthesis' in window) {
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; // Fala um pouco mais devagar para facilitar
        window.speechSynthesis.speak(fala);
    } else {
        alert("Seu navegador não suporta a função de áudio.");
    }
}

// 3. Função para LER O RESULTADO em voz alta automaticamente
function falarResultado(mensagem) {
    if ('speechSynthesis' in window) {
        const fala = new SpeechSynthesisUtterance(mensagem);
        fala.lang = 'pt-BR';
        fala.rate = 0.9;
        window.speechSynthesis.speak(fala);
    }
}

// 4. Lógica de Validação do Link
function verificarLink() {
    const link = document.getElementById("input-link").value.trim().toLowerCase();
    const divResultado = document.getElementById("resultado");

    if (link === "") {
        alert("Por favor, cole ou digite um link primeiro!");
        return;
    }

    divResultado.classList.remove("oculta", "seguro", "perigoso");

    // Simulação de Verificação de Segurança (Exemplo de regras)
    // Palavras comuns em golpes
    const palavrasSuspeitas = ["promocao", "premio", "gratis", "urgente", "banco", "atualize", "cpf", "desconto"];
    
    let eGolpe = false;

    // Se não tiver "https://", ou tiver palavras suspeitas, considera perigoso
    for (let palavra of palavrasSuspeitas) {
        if (link.includes(palavra) || !link.startsWith("https://")) {
            eGolpe = true;
            break;
        }
    }

    // Exibe o resultado na tela e fala em áudio
    if (eGolpe) {
        divResultado.classList.add("perigoso");
        const mensagem = "CUIDADO! Este link parece ser PERIGOSO ou FALSO. Não abra e não digite seus dados!";
        divResultado.innerHTML = "❌ " + mensagem;
        falarResultado(mensagem);
    } else {
        divResultado.classList.add("seguro");
        const mensagem = "PARECE SEGURO! Este endereço parece correto. Mas lembre-se: nunca passe sua senha para ninguém.";
        divResultado.innerHTML = "✅ " + mensagem;
        falarResultado(mensagem);
    }
}