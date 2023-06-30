const informarIdade = alert("Qual a sua idade");


function classificarIdade(){
    let idade = document.getElementById('input-idade').value;

    if(!idade ){
        return alert('Favor digitar sua idade');
    }else if(idade <=15){
        return alert("Pessoa Jovem");
    }else if(idade <=64){
        return alert('Pessoa Adulta');
    }else{
        return alert("Pessoa Idosa");
    }

}