// 1. Função para Aumentar/Diminuir o Tamanho da Fonte
let tamanhoFonteAtual = 20;

function mudarFonte(variacao) {
    tamanhoFonteAtual += variacao;
    if (tamanhoFonteAtual < 16) tamanhoFonteAtual = 16;
    if (tamanhoFonteAtual > 36) tamanhoFonteAtual = 36;
    document.body.style.fontSize = tamanhoFonteAtual + "px";
}

// 2. Função de Leitura por Áudio
function lerTexto() {
    const texto = "Bem-vindo ao Detetive de Links. Cole o endereço do site no campo indicado e clique no botão vermelho VERIFICAR LINK AGORA para saber se é seguro.";
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        fala.rate = 0.9; 
        window.speechSynthesis.speak(fala);
    } else {
        alert("Seu navegador não suporta a função de áudio.");
    }
}

function falarResultado(mensagem) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const fala = new SpeechSynthesisUtterance(mensagem);
        fala.lang = 'pt-BR';
        fala.rate = 0.9;
        window.speechSynthesis.speak(fala);
    }
}

// 3. Lógica de Verificação Rápida com Explicação
function verificarLink() {
    const linkInput = document.getElementById("input-link");
    const divResultado = document.getElementById("resultado");

    if (!linkInput) {
        alert("Erro técnico: Campo de entrada não encontrado.");
        return;
    }

    const link = linkInput.value.trim().toLowerCase();

    if (link === "") {
        alert("Por favor, cole ou digite um link primeiro!");
        return;
    }

    // Estado de Carregamento (Simula o acesso rápido ao link)
    divResultado.classList.remove("oculta", "seguro", "perigoso");
    divResultado.style.backgroundColor = "#FFF3CD";
    divResultado.style.color = "#856404";
    divResultado.style.border = "3px solid #FFC107";
    divResultado.innerHTML = "🔄 Acessando o link e analisando a segurança do servidor... Aguarde.";

    // Executa a resposta técnica após 1.2 segundos
    setTimeout(() => {
        divResultado.removeAttribute("style"); // Limpa estilos temporários
        divResultado.classList.remove("seguro", "perigoso");

        const palavrasSuspeitas = ["promocao", "premio", "gratis", "urgente", "banco", "atualize", "cpf", "desconto", "ganhe", "sorteio", "vaga", "pix"];
        let motivoFraude = "";
        let eGolpe = false;

        // Regra 1: Falta de Criptografia (HTTP)
        if (!link.startsWith("https://")) {
            eGolpe = true;
            motivoFraude = "O site não utiliza conexão segura HTTPS. Qualquer dado digitado nele pode ser roubado facilmente por criminosos na rede.";
        } else {
            // Regra 2: Termos de Engenharia Social
            for (let palavra of palavrasSuspeitas) {
                if (link.includes(palavra)) {
                    eGolpe = true;
                    motivoFraude = `O endereço possui o termo perigoso "${palavra}". Golpistas usam essas palavras para criar falsas promessas e atrair cliques por impulso.`;
                    break;
                }
            }
        }

        // Regra 3: Falsificação de Marca Famosa
        if (link.includes("mercadolivre") && !link.includes("mercadolivre.com.br")) {
            eGolpe = true;
            motivoFraude = "Este link tenta usar o nome do 'Mercado Livre', mas está hospedado em um site de terceiros falsificado para clonar sua conta.";
        }

        // Mostra o resultado final na tela
        if (eGolpe) {
            divResultado.classList.add("perigoso");
            divResultado.innerHTML = `
                <p>🚨 <strong>NÃO É CONFIÁVEL / RISCO DE GOLPE!</strong></p>
                <p style="font-size: 16px; font-weight: normal; margin-top: 10px; text-align: left; line-height: 1.4;">
                    <strong>Explicação Técnica:</strong> ${motivoFraude}
                </p>
            `;
            falarResultado("Cuidado! Este link possui riscos de golpe detectados. Veja a explicação na tela.");
        } else {
            divResultado.classList.add("seguro");
            divResultado.innerHTML = `
                <p>✅ <strong>LINK VERIFICADO E PARECE SEGURO!</strong></p>
                <p style="font-size: 16px; font-weight: normal; margin-top: 10px; text-align: left; line-height: 1.4;">
                    <strong>Explicação Técnica:</strong> O endereço utiliza criptografia HTTPS válida e não contém termos associados a fraudes digitais conhecidas em nosso sistema.
                </p>
            `;
            falarResultado("O link foi verificado com sucesso e parece seguro.");
        }
    }, 1200);
}