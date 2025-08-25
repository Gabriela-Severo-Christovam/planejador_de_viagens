/**
 * Módulo para gerenciar dados de rotas, pedágios e informações relacionadas
 */

/**
 * Array de objetos contendo informações sobre rotas entre cidades
 * Cada rota contém:
 * - origem: cidade de origem
 * - destino: cidade de destino
 * - distancia: distância em km entre as cidades
 * - pedagios: número de praças de pedágio no trajeto
 * - valorPedagios: valor total dos pedágios no trajeto
 * - restaurantes: número de restaurantes disponíveis no trajeto
 * - custoMedioRefeicao: custo médio por refeição nos restaurantes do trajeto
 * - tempoEstimado: tempo estimado em horas (sem paradas) baseado em velocidade média de 80km/h
 * - pontosTuristicos: pontos turísticos no caminho
 */
const routes = [
    {
        id: 1,
        origem: "São Paulo",
        destino: "Rio de Janeiro",
        distancia: 430,
        pedagios: 8,
        valorPedagios: 76.90,
        restaurantes: 12,
        custoMedioRefeicao: 35.00,
        tempoEstimado: 5.5,
        pontosTuristicos: ["Aparecida do Norte", "Serra das Araras", "Paraty"]
    },
    {
        id: 2,
        origem: "São Paulo",
        destino: "Belo Horizonte",
        distancia: 580,
        pedagios: 6,
        valorPedagios: 54.30,
        restaurantes: 8,
        custoMedioRefeicao: 30.00,
        tempoEstimado: 7.2,
        pontosTuristicos: ["Serra da Mantiqueira", "São João del Rei", "Tiradentes"]
    },
    {
        id: 3,
        origem: "São Paulo",
        destino: "Curitiba",
        distancia: 410,
        pedagios: 7,
        valorPedagios: 68.50,
        restaurantes: 10,
        custoMedioRefeicao: 28.00,
        tempoEstimado: 5.1,
        pontosTuristicos: ["Registro", "Morretes", "Paranaguá"]
    },
    {
        id: 4,
        origem: "Rio de Janeiro",
        destino: "Vitória",
        distancia: 520,
        pedagios: 4,
        valorPedagios: 42.80,
        restaurantes: 6,
        custoMedioRefeicao: 32.00,
        tempoEstimado: 6.5,
        pontosTuristicos: ["Campos dos Goytacazes", "Guarapari", "Vila Velha"]
    },
    {
        id: 5,
        origem: "Belo Horizonte",
        destino: "Brasília",
        distancia: 740,
        pedagios: 3,
        valorPedagios: 28.50,
        restaurantes: 9,
        custoMedioRefeicao: 33.00,
        tempoEstimado: 9.2,
        pontosTuristicos: ["Três Marias", "Paracatu", "Cristalina"]
    },
    {
        id: 6,
        origem: "Curitiba",
        destino: "Porto Alegre",
        distancia: 710,
        pedagios: 9,
        valorPedagios: 89.70,
        restaurantes: 14,
        custoMedioRefeicao: 34.00,
        tempoEstimado: 8.9,
        pontosTuristicos: ["Joinville", "Florianópolis", "Torres"]
    },
    {
        id: 7,
        origem: "Brasília",
        destino: "Goiânia",
        distancia: 210,
        pedagios: 1,
        valorPedagios: 8.30,
        restaurantes: 5,
        custoMedioRefeicao: 28.00,
        tempoEstimado: 2.6,
        pontosTuristicos: ["Anápolis", "Pirenópolis"]
    },
    {
        id: 8,
        origem: "Salvador",
        destino: "Recife",
        distancia: 850,
        pedagios: 2,
        valorPedagios: 18.40,
        restaurantes: 11,
        custoMedioRefeicao: 29.00,
        tempoEstimado: 10.6,
        pontosTuristicos: ["Aracaju", "Maceió", "João Pessoa"]
    },
    {
        id: 9,
        origem: "Fortaleza",
        destino: "Natal",
        distancia: 520,
        pedagios: 1,
        valorPedagios: 9.20,
        restaurantes: 7,
        custoMedioRefeicao: 27.00,
        tempoEstimado: 6.5,
        pontosTuristicos: ["Mossoró", "Canoa Quebrada", "Tibau"]
    },
    {
        id: 10,
        origem: "Manaus",
        destino: "Belém",
        distancia: 3050,
        pedagios: 0,
        valorPedagios: 0,
        restaurantes: 15,
        custoMedioRefeicao: 38.00,
        tempoEstimado: 38.1,
        pontosTuristicos: ["Santarém", "Parintins", "Itacoatiara"]
    }
];

//Aqui estou executando o codigo assim que o DOM é carregado
document.addEventListener("DOMContentLoaded", () => {
  //elementos <select>
  const origemSelect = document.getElementById("origem");
  const destinoSelect = document.getElementById("destino");

  //crio uma lista de cidade e origem usando o Set(remove oq está duplicado)
  const cidadesOrigem = [...new Set(routes.map(rota => rota.origem))];
  const cidadesDestino = [...new Set(routes.map(rota => rota.destino))];

  //aqui eu estou criando uma função que cria opções nos selects
  function criarOpcao(text) {
    const opt = document.createElement("option");
    opt.value = text;
    opt.textContent = text;
    return opt;
  }

  //adicionando as cidades como opções nos <selects>
  cidadesOrigem.forEach(cidade => origemSelect.appendChild(criarOpcao(cidade)));
  cidadesDestino.forEach(cidade => destinoSelect.appendChild(criarOpcao(cidade)));

  //selecionando o formulário para adicionar eventos de submit e reset
  const form = document.querySelector("form");


  form.addEventListener("submit", e => {
    e.preventDefault(); //impede o envio padrão do formulario

    //lê os valores do formulário substituindo ',' por '.' para o parseFloat funcionar
    const origem = origemSelect.value;
    const destino = destinoSelect.value;
    const consumo = parseFloat(document.getElementById("consumo").value.replace(",", "."));
    const precoCombustivel = parseFloat(document.getElementById("precoCombustivel").value.replace(",", "."));
    const velocidadeMedia = parseFloat(document.getElementById("velocidadeMedia").value.replace(",", "."));

    //Aqui estou validando se todos os campos foram prenchidos, caso não será exibido um sweet alert notificando que o campo é invalido 
    if (!origem || !destino || isNaN(consumo) || isNaN(precoCombustivel) || isNaN(velocidadeMedia)) {
      Swal.fire({
                title: 'Campo Invalido, por favor preencha todos os campos!',
                text: 'Este é um Alerta Informativo.',
                icon: 'info'
      });
      return;
    };

    //Aqui validando origem e destino pois não podem ser iguais 
    if (origem === destino) {
      Swal.fire({
                title: 'Origem e destino não podem ser iguais!',
                text: 'Este é um Alerta Informativo.',
                icon: 'info'
      });
      return;
    };

    //busca a rota correspondente no array de rotas
    const rota = routes.find(r => r.origem === origem && r.destino === destino);

    //se a rota não for encontrada mostra o alerta
    if (!rota) {
        Swal.fire({
                title: 'Rota não encontrada para a origem e destino selecionados!',
                text: 'Este é um Alerta Informativo.',
                icon: 'info'
        });
      return;
    }

    //Exibindo informações da rota na tela 
    document.getElementById("infoDistancia").textContent = `${rota.distancia} km`;
    document.getElementById("infoPedagios").textContent = rota.pedagios;
    document.getElementById("infoValorPedagios").textContent = `R$ ${rota.valorPedagios.toFixed(2)}`;
    document.getElementById("infoRestaurantes").textContent = rota.restaurantes;
    document.getElementById("infoTempoEstimado").textContent = `${rota.tempoEstimado.toFixed(1)} h (80 km/h)`;
    document.getElementById("infoPontos").textContent = rota.pontosTuristicos.join(", ");

    //fazendo os calculos com base na rota e nos dados do usuario 
    const litrosNecessarios = rota.distancia / consumo;
    const custoCombustivel = litrosNecessarios * precoCombustivel;
    const tempoAjustado = rota.distancia / velocidadeMedia;
    const custoAlimentacao = rota.restaurantes * rota.custoMedioRefeicao;
    const custoPedagios = rota.valorPedagios;
    const custoTotal = custoCombustivel + custoAlimentacao + custoPedagios;

    //exibe os resultados dos calculos na interface
    document.getElementById("resLitros").textContent = litrosNecessarios.toFixed(2) + " L";
    document.getElementById("resCustoCombustivel").textContent = "R$ " + custoCombustivel.toFixed(2);
    document.getElementById("resTempo").textContent = tempoAjustado.toFixed(2) + " h";
    document.getElementById("resPedagios").textContent = "R$ " + custoPedagios.toFixed(2);
    document.getElementById("resAlimentacao").textContent = "R$ " + custoAlimentacao.toFixed(2);
    document.getElementById("resTotal").textContent = "R$ " + custoTotal.toFixed(2);
  });

  //reset
  form.addEventListener("reset", () => {
    //limpa todos os campos de exibição ao resetar o formulário
    document.getElementById("infoDistancia").textContent = "";
    document.getElementById("infoPedagios").textContent = "";
    document.getElementById("infoValorPedagios").textContent = "";
    document.getElementById("infoRestaurantes").textContent = "";
    document.getElementById("infoTempoEstimado").textContent = "";
    document.getElementById("infoPontos").textContent = "";

    document.getElementById("resLitros").textContent = "";
    document.getElementById("resCustoCombustivel").textContent = "";
    document.getElementById("resTempo").textContent = "";
    document.getElementById("resPedagios").textContent = "";
    document.getElementById("resAlimentacao").textContent = "";
    document.getElementById("resTotal").textContent = "";
  });
});
