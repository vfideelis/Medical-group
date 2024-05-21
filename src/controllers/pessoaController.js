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

const controllers = {
  registroDeCliente: async (req,res) => {
    try{
      // dados da tabela pessoa
      const {nome,cpf,genero,dataNasc,email,dataCad} = req.body;
      // dados da tabela endereco
      const {logradouro,bairro,estado,numero,complemento,cep} = req.body;
      // dados da tabela telefones
      const {telefones} = req.body;
      // tipo da tabela perfil
      const {personPerfil} = req.body;
      // dados da tabela funcionario
      const {dataAdmissao,crm} = req.body;
      //dados para tabela especialidade
      const {descEspecialidade} = req.body;
    
      const personObj = new Pessoa (null,nome,cpf,dataNasc,genero,email,dataCad)
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
      
      const loginObj = new Login (null,cpf,randomizaSenha(),'ativo') 

      const telefoneObj = new Telefone (null,...telefones)
      
      const perfilObj = new Perfis (null,personPerfil)
       

      let funcionarioObj = ''
      let especialidadeObj = ''
      if(req.body.dataAdmissao && req.body.descEspecialidade) {
        funcionarioObj = new Funcionario (null,dataAdmissao,crm? crm:null );
        especialidadeObj = new Especialidade (null,descEspecialidade);
      }

     
      novoRegistroPessoa(personObj,enderecoObj,telefoneObj,loginObj,perfilObj,funcionarioObj === '' ? null : funcionarioObj, especialidadeObj == '' ? null : especialidadeObj)
    }catch (e) {
      console.log(e)
    }
  },

  pegaEspecialidades: async (req,res) => {
    const especialidades = new Especialidade()
    let testandoReturn = pegaTodasEspecialidades()
    console.log('testando Return especialidade' )
    console.log(testandoReturn)
  }

}


module.exports = controllers