
const mongoose = require('mongoose');
const Usuario = require('../model/usuarioSchema.js');


const criarUsuario = async (nome, senha, pontos, latitude, longitude) => {
    const usuario = new Usuario({nome: nome, 
                                senha:senha,
                                pontos:pontos,
                                latitude:latitude,
                                longitude:longitude
    })
        if(usuario) {

            return usuario.save();
        }
        throw new Error('Não foi possível criar um usuário')
       
}

const acharUsuario = async (usuarioID) => {   
    try{
        const usuario = await Usuario.findById(usuarioID).exec();

        return usuario;
    }catch (error){
        console.log(error);
        console.log("Usuario não encontrado!!");
    }
}

const atualizarUsuario = async(usuarioID, nome, senha, pontos, latitude, longitude ) =>{

    try {
        const resposta = await Usuario.findById(usuarioID);
        if(resposta){
            const usuario = await Usuario.updateOne({_id: usuarioID},
                                                   {$set:
                                                   {nome: nome,
                                                    senha: senha,
                                                    pontos: pontos,
                                                    latitude: latitude,
                                                    longitude:longitude}});

            //console.log(resposta.nome);
            return "atualizacao de " + resposta.nome + " realizada com sucesso!!";
     }
    } catch (error) {

        console.log(error);
        console.log('Usuario não encontrado!!');
    }
}

const deletarUsuario = async(usuarioID) =>{
    const verificacao = await Usuario.findById(usuarioID);
    if(verificacao){
        const usuario = await Usuario.deleteOne({_id:usuarioID});
          console.log(usuario)

      } else {
          console.log("id não existe")
      }
}

const atualizarPontos = async (usuario, pontos) => {    
    try{
        session = await mongoose.startSession();
        session.startTransaction();

        usuario.pontos = usuario.pontos + pontos;        
        
        await session.commitTransaction();
        console.log (usuario.nome +", Pontos atuais: " + usuario.pontos);
        
    }catch (error){
        console.log(error);
        session.abortTransaction();

    }finally{

        if(session){
            session.endSession();
        }
    }
}





module.exports.usuario = {criarUsuario, acharUsuario, atualizarUsuario, deletarUsuario, atualizarPontos};