    //criar ou abrir database
    var Database_Name = 'Database Dietas e Animais';   
    var Version = 1.0;    
    var Text_Description = 'Database Dietas e Animais';    
    var Database_Size = 2 * 1024 * 1024;    
    var dbObj = openDatabase(Database_Name, Version, Text_Description, Database_Size, OnSuccessCreate()); 

    
    function OnSuccessCreate() {    
        console.log('Database Created Sucessfully');    
    }  

    if (document.title=="Cadastro Animal"){
        window.addEventListener('load',createSelect());
    }
    window.addEventListener('load',createTables());   

//criar tabelas
function createTables(){
 //tabela animais
 dbObj.transaction(function (tx) {    
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Animal (id integer primary key asc, Idade integer, Peso integer, Raça string not null, Sexo string,Dieta string, Data string)',
    [],
    function() {console.log("Tabela criada com sucesso!");},
    function(){alert("tabela não criada!")} 
    )
}); 
//tabela dietas
dbObj.transaction (function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Dietas (id integer primary key asc, nomeDieta string, QuantidadeInsumos integer)',
    [],
    function (){console.log("Tabela criada com sucesso!")},
    function (){console.log ("Erro ao criar tabela!!")}  
    );
}   
);
}

function InsereDieta(){
     //inserir na tabela Dietas
     var dieta = document.getElementById("dietname").value; 
     var qtdinsumos = document.getElementById("Quantidadeinsumos").value;
     dbObj.transaction (function(tx){
     tx.executeSql ('INSERT INTO Cadastro_Dietas(nomeDieta, QuantidadeInsumos) values(?,?)',
     [dieta,qtdinsumos],
     function(){alert("tabela preenchida!")},
     null
     );
 }
 );
  
  //adicionar colunas na tabela 
  for ( var i = 1; i <=qtdinsumos;i++){

      var nomeinsumo = document.getElementById("supplyname"+i).value;
      var quantidade = document.getElementById("quantity"+i).value;
      var duracao = document.getElementById("duration"+i).value;

      dbObj.transaction (function(tx){
          tx.executeSql('ALTER TABLE Cadastro_Dietas ADD NomeInsumo('+i+') VARCHAR(255) NOT NULL DEFAULT',
          [],
          function (){console.log("Coluna nome insumo adicionada  com sucesso!")},
          function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
          );
          tx.executeSql('ALTER TABLE  Cadastro_Dietas ADD Quantidade('+i+') INTEGER  DEFAULT',
          [],
          function (){console.log("Coluna  quantidade adicionada  com sucesso!")},
          function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
          );
          tx.executeSql('ALTER TABLE Cadastro_Dietas ADD Duração('+i+') INTEGER DEFAULT',
          [],
          function (){console.log("Coluna  Duração adicionada  com sucesso!")},
          function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
          );
      }   
      );
      
      //inserir na tabela Dietas
      
      dbObj.transaction (function(tx){
          tx.executeSql ('INSERT INTO Cadastro_Dietas(NomeInsumo('+i+'),Quantidade('+i+'),Duração('+i+')) values(?,?,?)',
          [nomeinsumo,quantidade,duracao],
          function(){alert("tabela foi  preenchida!")},
          function(){alert("valores nao inseridos")}
          );
      }
      );
  }  
  
}

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
            document.getElementById("Select").innerHTML = options;


        },null);
    });
}


//inserir na tabela animais
function Insert() { 
    
    //inserir dados na tabela Animais
    var idade = document.getElementById("age").value;    
    var peso = document.getElementById("weight").value;    
    var raça = document.getElementById("breed").value;  
    var sexo = document.getElementById("Sexo").value;
    var data = document.getElementById("DataEntrada").value
    dbObj.transaction(function (tx) {    
        tx.executeSql('INSERT INTO Cadastro_Animal(Idade, Peso, Raça, Sexo,Dieta, Data) values(?,?,?,?,?,?);', 
        [idade,peso,raça,sexo,dieta,data],
        null,
        null);
 
    });
    
      
     
}    