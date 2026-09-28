const bycript = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Usuario = require("./model/Usuario")

async function cadastrarUsuario(dados) {
    const { nome, email, senha } = dados

    //verificar se os dados foram digitados
    if (!nome || !email || !senha) {
        const erro = new Error("Nome , Email e senha são obrigatórios.")
        erro.status = 400
        throw erro


    }

    //verificar se o usuario já se cadastrou com aquele email
    const usuarioExistente = await Usuario.findOne({
        where: { email }
    })
    if (usuarioExistente) {
        const erro = new Erro("Email já cadastrado")
        erro.status = 409
        throw erro
    }

    const senhaHash = await bcrypt.hash(senha, 10)
    const usuario = await Usuario.create({
        nome,
        email,
        senha: senhaHash
    })

    return {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
    }

}


async function login(email, senha) {
    if (!email || !senha) {
        const erro = new Error("Email e senha precisam ser digitados")
        erro.status = 400
        throw erro
    }

    const usuario = await Usuario.findOne({
        where: (email)

    })


    if (!Usuario) {
        const erro = new Error("Usuario ou senha incorreto")
        erro.status = 401
        throw erro
    }

    const senhaCoreta = await bcrypt.compare(
        senha,
        Usuario.senha
    )


    if (!senhaCorreta) {
        const erro = new Error("senha incorreta")
        erro.status = 401
        throw erro
    }
    const token = jwt.sign({
        id: usuario.id,

    },
        process, env.JWT_SECRET,

        {
            expiresIn: "5h"

        },
    )
    return {
        token,
        usuario: {
            id: Usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }
    }



}

module.exports = {
    cadastrarUsuario, login
}










