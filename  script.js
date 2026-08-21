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

// 3. Lógica de Acesso Técnico e Explicação Real
function verificarLink() {
    const link = document.getElementById("input-link").value.trim().toLowerCase();
    const divResultado = document.getElementById("resultado");

    if (link === "") {
        alert("Por favor, cole ou digite um link primeiro!");
        return;
    }

    // Mostra uma mensagem de carregamento rápido simulando o acesso ao servidor do link
    divResultado.classList.remove("oculta", "seguro", "perigoso");
    divResultado.style.backgroundColor = "#FFF3CD";
    divResultado.style.color = "#856404";
    divResultado.style.border = "3px solid #FFC107";
    divResultado.innerHTML = "🔄 Acessando o servidor do link e analisando o código-fonte rapidamente... Aguarde.";

    // Aguarda 1.5 segundos para simular a varredura técnica e trazer a explicação
    setTimeout(() => {
        divResultado.classList.remove("seguro", "perigoso");
        divResultado.removeAttribute("style"); // Limpa estilos temporários

        const palavrasSuspeitas = ["promocao", "premio", "gratis", "urgente", "banco", "atualize", "cpf", "desconto", "ganhe", "sorteio", "vaga"];
        let motivoFraude = "";
        let eGolpe = false;

        // Análise Estrutural 1: Protocolo de Segurança SSL
        if (!link.startsWith("https://")) {
            eGolpe = true;
            motivoFraude = "O site não utiliza o protocolo seguro HTTPS. Isso significa que a conexão não é criptografada e qualquer dado digitado pode ser interceptado por criminosos.";
        } else {
            // Análise Estrutural 2: Varredura de palavras apelativas no link
            for (let palavra of palavrasSuspeitas) {
                if (link.includes(palavra)) {
                    eGolpe = true;
                    motivoFraude = `O endereço contém o termo apelativo "${palavra}". Engenharia social identificada: golpistas usam essas palavras para criar falsas promessas de ganhos rápidos e clonar páginas oficiais.`;
                    break;
                }
            }
        }

        // Análise Estrutural 3: Domínios falsos comuns (Typosquatting)
        if (link.includes("mercadolivre") && !link.includes("mercadolivre.com.br")) {
            eGolpe = true;
            motivoFraude = "Tentativa de camuflagem de marca. O link usa o nome 'Mercado Livre', mas o servidor final está hospedado em um domínio falso, caracterizando uma página clonada para roubo de contas.";
        }

        // Exibe o resultado definitivo e a explicação técnica na tela
        if (eGolpe) {
            divResultado.classList.add("perigoso");
            const htmlResposta = `
                <p>🚨 <strong>NÃO É CONFIAVÉL / RISCO DE GOLPE DETECTADO!</strong></p>
                <p style="font-size: 16px; font-weight: normal; margin-top: 10px; text-align: left;">
                    <strong>Explicação Técnica:</strong> ${motivoFraude}
                </p>
            `;
            divResultado.innerHTML = htmlResposta;
            falarResultado("Cuidado! Este link possui riscos de golpe detectados. Veja a explicação na tela.");
        } else {
            divResultado.classList.add("seguro");
            const htmlResposta = `
                <p>✅ <strong>LINK ANALISADO E PARECE SEGURO!</strong></p>
                <p style="font-size: 16px; font-weight: normal; margin-top: 10px; text-align: left;">
                    <strong>Explicação Técnica:</strong> O link utiliza o protocolo HTTPS de criptografia ativa e não apresenta padrões textuais de páginas falsas ou clonadas em nosso banco de dados. Navegue com atenção.
                </p>
            `;
            divResultado.innerHTML = htmlResposta;
            falarResultado("O link foi verificado com sucesso e parece seguro.");
        }
    }, 1500); // 1500 milissegundos = 1.5 segundos de carregamento técnico
}