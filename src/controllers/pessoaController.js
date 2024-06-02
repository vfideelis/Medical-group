const Pessoa = require('../models/Classes/PessoaClass');
const Endereco = require('../models/Classes/enderecoClass')
const Perfis = require ('../models/Classes/perfisClass')
const Consulta = require ('../models/Classes/consultaClass')
const {novoRegistroPessoa} = require('../models/Queries/PessoaQuerie');
const {pegaTodasEspecialidades} = require('../models/Queries/PessoaQuerie')
const Login = require('../models/Classes/loginClass');
const Telefone = require('../models/Classes/telefoneClass');
const Funcionario = require('../models/Classes/funcionarioClass');
const Paciente = require('../models/Classes/pacienteClass');
const Especialidade = require('../models/Classes/especialidadeClass');



/*
 
*/ 

const controllers = {
  registroDeUsuario: async (req,res) => { //create usuario que só funciona se o usuario que estiver registrando for adm
    try{
      // dados da tabela pessoa
      const {nome,cpf,genero,dataNasc,email} = req.body;
      // dados da tabela endereco
      const {logradouro,bairro,estado,numero,complemento,cep} = req.body;
      // dados da tabela telefones
      const {telefones} = req.body;
      // tipo da tabela perfil
      const {personPerfil} = req.body;
      // dados da tabela funcionario
      const {dataAdmissao,crm} = req.body;
      // dados para tabela especialidade
      const {idEspec,descEspecialidade} = req.body;
      // dados para confirmar se é adm.
      const {perfilRegister} = req.body;

      if(perfilRegister !== 'administrador') {
        res.json({cadastroMessage: "você só pode registrar um cliente caso você seja um administrador!",result:false})
        return
      }

      const date = new Date();

      console.log(date)
    
      const personObj = new Pessoa (null,nome,cpf,dataNasc,genero,email,date)

    
      const enderecoObj = new Endereco (null,logradouro,bairro,estado,numero,complemento,cep)
      
      

      function randomizaSenha () {
        let passReceive = ''
        for(let i = 0; i <= 7; i++) {
          let numActualy = Math.floor(Math.random() * 10)
          passReceive += numActualy.toString()
          console.log(passReceive)
        }
        return passReceive
      }
      
      const loginObj = new Login (null,cpf,randomizaSenha(),0) 

      const telefoneObj = new Telefone (null,telefones)
      
      const perfilObj = new Perfis (null,personPerfil)
       

      let funcionarioObj = ''
      let especialidadeObj = ''
      if(dataAdmissao && descEspecialidade) {
        funcionarioObj = new Funcionario (null,dataAdmissao,crm? crm:null );
        especialidadeObj = new Especialidade (idEspec,descEspecialidade);
      }

       const retornaSucessFailure = await novoRegistroPessoa(personObj,enderecoObj,telefoneObj,loginObj,perfilObj,funcionarioObj === '' ? null : funcionarioObj, especialidadeObj == '' ? null : especialidadeObj)
    

      res.json( retornaSucessFailure )
      }catch (e) {
        res.json({cadastroMessage: `usuario não foi registrado, motivo: ${e}`,result:false})
    }
  },

  retornaEspecialidades: async (req,res) => {
    pegaTodasEspecialidades()
  }

}


module.exports = controllers