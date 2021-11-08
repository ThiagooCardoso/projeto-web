    //criar ou abrir database
    var Database_Name = 'AnimaisDatabase';   
    var Version = 1.0;    
    var Text_Description = 'Database dos Animais';    
    var Database_Size = 2 * 1024 * 1024;    
    var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size, OnSuccessCreate()); 
    
    function OnSuccessCreate() {    
        console.log('Database Created Sucessfully');    
    }  
   // import {db}from 'projeto-web\web sql db\dbDieta.js';
    
     


  
window.addEventListener('load',createSelect()) ;         
    

//inserir banco de dados em um select
function createSelect() {

    
    dbObj.transaction(function(tx) {
        //Busca os valores Banco de dados 
        tx.executeSql('SELECT * FROM Cadastro_Dietas ', [], function(a, result) {
            var rows = result.rows;
            // Inicia a string com valores necessários para montar o select
            var options = ` <label for="Dietas"></label>
                            <select class="form-control" id="diet" name="Dietas">
                            <option></option>`;





            // Insere cada usuario do banco de dados como uma opção no select
            for (var i = 0; i < rows.length; i++) {
                options += `<option>${rows[i].nomeDieta}</option>`;
            }

            // Finaliza a string necessaria para montar o select
            options += `</select>`;

            // Insere o select montado na div
            document.getElementById("Select").innerHTML += options;


        },null);
    });
}
function Insert() { 
    //cria tabela
    dbObj.transaction(function (tx) {    
        tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Animal (id integer primary key asc, Idade integer, Peso integer, Raça string not null, Sexo string,Dieta string, Data string)',
        [],
        function() {console.log("Tabela criada com sucesso!");},
        function(){alert("tabela não criada!")} 
        )
    }); 
    
    //inserir dados na tabela
    var idade = document.getElementById("age").value;    
    var peso = document.getElementById("weight").value;    
    var raça = document.getElementById("breed").value;  
    var sexo = document.getElementById("Sexo").value;
    var dieta = document.getElementById("Diet").value;
    var data = document.getElementById("DataEntrada").value
    dbObj.transaction(function (tx) {    
        tx.executeSql('INSERT INTO Cadastro_Animal(Idade, Peso, Raça, Sexo,Dieta, Data) values(?,?,?,?,?,?);', 
        [idade,peso,raça,sexo,dieta,data],
        null,
        null);
 
    });    
}    