//Criar database e abrir
var Database_Name = 'DietasDatabase';    
var Version = 1.0;    
var Text_Description = 'Database das Dietas';    
var Database_Size = 2 * 1024 * 1024;    
var db = openDatabase(Database_Name, Version, Text_Description, Database_Size, OnSuccessCreate());  



           
function OnSuccessCreate() {    
    console.log('Database Created Sucessfully');    
} 


 //cria tabela
 db.transaction (function(tx){
    tx.executeSql('CREATE TABLE IF NOT EXISTS Cadastro_Dietas (id integer primary key asc, nomeDieta string, QuantidadeInsumos integer)',
    [],
    function (){console.log("Tabela criada com sucesso!")},
    function (){console.log ("Erro ao criar tabela!!")}  
    );
}   
);

 

function Insert(){ 

       //inserir na tabela
       var dieta = document.getElementById("dietname").value; 
       var qtdinsumos = document.getElementById("Quantidadeinsumos").value;
   db.transaction (function(tx){
       tx.executeSql ('INSERT INTO Cadastro_Dietas(nomeDieta, QuantidadeInsumos) values(?,?)',
       [dieta,qtdinsumos],
       function(){alert("tabela preenchida!")},
       null
       );
   }
   );
    
    //adicionar colunas na tabela 
    for ( var i = 1; i <qtdinsumos;i++){

        var nomeinsumo = document.getElementById("supplyname"+i).value;
        var quantidade = document.getElementById("quantity"+i).value;
        var duracao = document.getElementById("duration"+i).value;

        db.transaction (function(tx){
            tx.executeSql('ALTER TABLE Cadastro_Dietas ADD NomeInsumo('+i+') VARCHAR(255) NOT NULL DEFAULT',
            [],
            function (){console.log("Coluna nome insumo adicionada  com sucesso!")},
            function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
            );
            tx.executeSql('ALTER TABLE  Cadastro_Dietas ADD Quantidade('+i+') INTEGER NOT NULL DEFAULT',
            [],
            function (){console.log("Coluna  quantidade adicionada  com sucesso!")},
            function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
            );
            tx.executeSql('ALTER TABLE Cadastro_Dietas ADD Duração('+i+') INTEGER NOT NULL DEFAULT',
            [],
            function (){console.log("Coluna  Duração adicionada  com sucesso!")},
            function (){console.log ("Erro ao ADICIONAR COLUNAS tabela!!")}  
            );
        }   
        );
        
        //inserir na tabela
        
        db.transaction (function(tx){
            tx.executeSql ('INSERT INTO Cadastro_Dietas(NomeInsumo('+i+'),Quantidade('+i+'),Duração('+i+')) values(?,?,?)',
            [nomeinsumo,quantidade,duracao],
            function(){alert("tabela foi  preenchida!")},
            function(){alert("valores nao inseridos")}
            );
        }
        );
    
    }
}
    
    
    
