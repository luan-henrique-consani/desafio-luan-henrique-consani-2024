class RecintosZoo {
    constructor() {
        this.recintos = {
            recinto1: [{
                id: 1,
                bioma: 'savana',
                tamanhoTotal: 10,
                quantidadeAnimal: 3,
                especie: 'macaco'
            }],
            recinto2: [{
                id: 2,
                bioma: 'floresta',
                tamanhoTotal: 5,
                quantidadeAnimal: 0,
                especie: ''
            }],
            recinto3: [{
                id: 3,
                bioma: 'savana e rio',
                tamanhoTotal: 7,
                quantidadeAnimal: 1,
                especie: 'gazela'
            }],
            recinto4: [{
                id: 4,
                bioma: 'rio',
                tamanhoTotal: 8,
                quantidadeAnimal: 0,
                especie: ''
            }],
            recinto5: [{
                id: 5,
                bioma: 'savana',
                tamanhoTotal: 9,
                quantidadeAnimal: 1,
                especie: 'leao'
            }]
        };

        this.animais = {
            leao: [{
                tamanho: 3,
                bioma: 'savana',
                carnivoro: true
            }],
            leopardo: [{
                tamanho: 2,
                bioma: 'savana',
                carnivoro: true
            }],
            crocodilo: [{
                tamanho: 3,
                bioma: 'rio',
                carnivoro: true
            }],
            macaco: [{
                tamanho: 1,
                bioma: 'savana',
                carnivoro: false
            }],
            gazela: [{
                tamanho: 2,
                bioma: 'savana',
                carnivoro: false
            }],
            hipopotamo: [{
                tamanho: 4,
                bioma: 'savana' && 'rio',
                carnivoro: false
            }]
        };
    }

    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();
        const informacaoAnimal = this.animais[animal];
        const informacaoQuantidade = quantidade;
        if (!informacaoAnimal) {
            console.log('Este animal não existe!');
            return;
        }
        if(informacaoQuantidade <= 0){
            console.log('Quantidade inválida');
            return;
        }

        const info = informacaoAnimal[0];
        let recintoDisponivel = false;

        for (let key in this.recintos) {
            let recinto = this.recintos[key][0];
            let espacoOcupado = recinto.quantidadeAnimal * (this.animais[recinto.especie]?.[0].tamanho || 0);

            const biomaAdequado = recinto.bioma.includes(info.bioma);
            const espacoNecessario = info.tamanho * quantidade;
            const espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;

            if (!biomaAdequado || espacoNecessario > espacoDisponivel) {
                console.log(`O ${key} não é adequado para ${quantidade} ${animal}(s).`);
                continue;
            }

            if (info.carnivoro && recinto.quantidadeAnimal >= 0 && recinto.especie !== animal) {
                console.log(`O ${key} não é adequado para ${quantidade} ${animal}(s).`);
                continue;
            }

            if (recinto.especie && !this.confortavel(recinto, info)) {
                console.log(`O ${key} não é adequado para ${quantidade} ${animal}(s).`);
                continue;
            }

            if (animal === 'hipopotamo' && !recinto.bioma.includes('savana e rio' || 'savana' || 'rio') && recinto.quantidadeAnimal > 0) {
                console.log(`O ${key} não é adequado para ${quantidade} ${animal}(s).`);
                continue;
            }

            if (animal === 'macaco' && recinto.quantidadeAnimal === 0) {
                console.log(`O ${key} não é adequado para ${quantidade} ${animal}(s).`);
                continue;
            }
            const quantidadeAtual = espacoDisponivel - (quantidade*info.tamanho); 
            console.log(`O ${key} é adequado para ${quantidade} ${animal}(s). Espaço livre:`, quantidadeAtual,`,total:`, recinto.tamanhoTotal);
            recintoDisponivel = true;
        }

        if (!recintoDisponivel) {
            console.log(`Nenhum recinto é adequado para ${quantidade} ${animal}(s).`);
        }
    }

    confortavel(recinto, informacao) {
        const especieAtual = recinto.especie;
        if (!especieAtual) return true;

        const informacaoAtual = this.animais[especieAtual]?.[0];
        if (informacaoAtual?.carnivoro && especieAtual !== informacao.especie) {
            return false;
        }
        return true;
    }
}

const result = new RecintosZoo().analisaRecintos('leao', 1);
export { RecintosZoo as RecintosZoo };
