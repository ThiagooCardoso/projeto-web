
function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) { //Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else { //Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function save() {
    //gera um id unico
    var id = generateUUID();
    var nome = document.getElementById('nomedieta').value;
    var quantidade = document.getElementById('Quantidadeinsumos').value;

    db.transaction(function(tx) {

        tx.executeSql('INSERT INTO dietas (id, nome) VALUES (?, ?)', [id, nome],
            //callback sucesso
            function() {
                for (var i = 1; i <= quantidade; i++) {
                    var nomeInsumo = document.getElementById('supplyname' + i).value;
                    var qtdInsumos = document.getElementById('quantity' + i).value;
                    var duracao = document.getElementById('duration' + i).value;
                    tx.executeSql('INSERT INTO dietaInsumos (idDieta, nomeInsumo, qtdInsumos, duracao) VALUES (?,?,?,?)', [id, nomeInsumo, qtdInsumos, duracao],
                        //callback sucesso
                        function() {

                            swal.fire({
                                icon: "success",
                                title: "Dieta cadastrada com sucesso!",
                            });

                        }
                    );
                }
            }
        );


    });
}

//selecionar das dietas
function getDietas(callback){
    db.transaction(function(tx){
        tx.executeSql('SELECT id,nome, FROM dietas ORDER BY nome',[],
        function(tx,resultado){
            callback(resultado);
        },
        function(erro){
            console.log(erro);
        })
    });
}


function redy() {
    if (document.getElementById('btn-save')) {
        document.getElementById('btn-save').addEventListener('click', save);
    }
    //if (document.getElementById('btn-search')) document.getElementById('btn-search').addEventListener('click', search);
    criarTabelaDietaseInsumos();
    console.log("Chamou controller");

}
