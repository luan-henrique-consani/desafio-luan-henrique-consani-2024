class RecintosZoo {
    constructor() {
        this.recintos = {
            recinto1: [{
                id: 1,
                bioma: ['savana'],
                tamanhoTotal: 10,
                quantidadeAnimal: 3,
                especie: 'macaco'
            }],
            recinto2: [{
                id: 2,
                bioma: ['floresta'],
                tamanhoTotal: 5,
                quantidadeAnimal: 0,
                especie: ''
            }],
            recinto3: [{
                id: 3,
                bioma: ['savana' ,'rio'],
                tamanhoTotal: 7,
                quantidadeAnimal: 1,
                especie: 'gazela'
            }],
            recinto4: [{
                id: 4,
                bioma: ['rio'],
                tamanhoTotal: 8,
                quantidadeAnimal: 0,
                especie: ''
            }],
            recinto5: [{
                id: 5,
                bioma: ['savana'],
                tamanhoTotal: 9,
                quantidadeAnimal: 1,
                especie: 'leao'
            }]
        };

        this.animais = {
            leao: [{
                tamanho: 3,
                bioma: ['savana'],
                carnivoro: true
            }],
            leopardo: [{
                tamanho: 2,
                bioma: ['savana'],
                carnivoro: true
            }],
            crocodilo: [{
                tamanho: 3,
                bioma: ['rio'],
                carnivoro: true
            }],
            macaco: [{
                tamanho: 1,
                bioma: ['savana', 'floresta'],
                carnivoro: false
            }],
            gazela: [{
                tamanho: 2,
                bioma: ['savana'],
                carnivoro: false
            }],
            hipopotamo: [{
                tamanho: 4,
                bioma: ['savana', 'rio'],
                carnivoro: false
            }]
        };
    }
 
    analisaRecintos(animal, quantidade) {
        animal = animal.toLowerCase();

        const animalSelecionado = this.animais[animal];
        const informacaoQuantidade = quantidade;

        if (!animalSelecionado) {
            console.log('Este animal não existe!');
            return;
        }
        if (informacaoQuantidade <= 0) {
            console.log('Quantidade inválida');
            return;
        }

        const info = animalSelecionado[0];
        let recintoDisponivel = false;

        for (let key in this.recintos) {
            let recinto = this.recintos[key][0];
            let espacoOcupado = recinto.quantidadeAnimal * (this.animais[recinto.especie]?.[0].tamanho || 0);


            const biomaAdequado = this.verificarSeExisteBioma(info.bioma, recinto.bioma);
            const espacoNecessario = info.tamanho * quantidade;
            let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado;
            let quantidadeAtual = espacoDisponivel - (quantidade * info.tamanho);

            if (!biomaAdequado) {
                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s). Pois o bioma não é o certo`);
                console.log('--------------------------------------------------------------------------------------------');
                continue;
            }
            
            if (espacoNecessario > espacoDisponivel) {

                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s). Pois e quantidade é indisponível`);
                console.log('--------------------------------------------------------------------------------------------');
                continue;
            }

            if (recinto.quantidadeAnimal > 0) {
                if (info.carnivoro && recinto.especie !== animal) {

                    console.log('--------------------------------------------------------------------------------------------');
                    console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s). Pois esse animal não é das mesma espécie`);
                    console.log('--------------------------------------------------------------------------------------------');
                    continue;
                }

                const especieAtual = this.animais[recinto.especie]?.[0];
                if (especieAtual?.carnivoro && recinto.especie !== animal) {

                    console.log('--------------------------------------------------------------------------------------');
                    console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s). Pois esse animal não é carnivoro`);
                    console.log('--------------------------------------------------------------------------------------');
                    continue;
                }

                if (recinto.especie === animal) {
                    console.log('--------------------------------------------------------------------------------------------');
                    console.log(`| O Recinto ${recinto.id} é adequado para ${quantidade} ${animal}(s). Espaço livre: ${quantidadeAtual} ,total: ${recinto.tamanhoTotal}`);
                    console.log('--------------------------------------------------------------------------------------------');
                    recintoDisponivel = true;
                    continue;
                }
            }

            if (recinto.especie && !this.confortavel(recinto, info)) {

                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s).`);
                console.log('--------------------------------------------------------------------------------------------');
                continue;
            }

            if (animal === 'hipopotamo' && recinto.quantidadeAnimal > 0 && !(recinto.bioma.includes('savana') && recinto.bioma.includes('rio'))) {

                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s). Pois já tem outra espécie.`);
                console.log('--------------------------------------------------------------------------------------------');;
                continue;
            }

            if (animal === 'macaco' && (!['savana'] || ['floresta'] || ['savana', 'floresta']).includes(recinto.bioma)) {

                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s).`);
                console.log('--------------------------------------------------------------------------------------------');
                continue;
            }

            if (animal === 'macaco' && recinto.quantidadeAnimal === 0 && quantidade === 1) {
                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s) porque está vazio.`);
                console.log('--------------------------------------------------------------------------------------------');
                continue;
            }

            if (animal === 'macaco' && recinto.quantidadeAnimal > 0 && (recinto.especie === 'macaco' || quantidade <= 1)) {
                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} é adequado para ${quantidade} ${animal}(s). Espaço livre: ${quantidadeAtual}, total: ${recinto.tamanhoTotal}`);
                console.log('--------------------------------------------------------------------------------------------');
                recintoDisponivel = true;
                continue;
            }

            if (recinto.especie !== animal && recinto.quantidadeAnimal !== 0) {
                quantidadeAtual -= 1;

            }

            if(quantidadeAtual < 0){

                console.log('--------------------------------------------------------------------------------------------');
                console.log(`| O Recinto ${recinto.id} não é adequado para ${quantidade} ${animal}(s).`);
                console.log('--------------------------------------------------------------------------------------------');
                console.log('')
                continue

            }

            console.log('--------------------------------------------------------------------------------------------');
            console.log(`| O Recinto ${recinto.id} é adequado para ${quantidade} ${animal}(s). Espaço livre: ${quantidadeAtual}, total: ${recinto.tamanhoTotal}`);
            console.log('--------------------------------------------------------------------------------------------');
            recintoDisponivel = true;
        }

        if (!recintoDisponivel) {

            console.log('--------------------------------------------------------------------------------------------');
            console.log(`| Nenhum reinto é adequado para ${quantidade} ${animal}(s).                                             |`);
            console.log('--------------------------------------------------------------------------------------------');
            console.log('')
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

    verificarSeExisteBioma(bioma1, bioma2) {
        return bioma1.some(element =>
            bioma2.includes(element)

        );
    }

}

const result = new RecintosZoo().analisaRecintos('leao', 1);
export { RecintosZoo as RecintosZoo };
