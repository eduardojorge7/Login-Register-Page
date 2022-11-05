const bodyParser = require("body-parser");
const express = require("express");
const server = express();
var path = require('path');

server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

server.use(express.static('www')); /* caminho arquivos html & css */

server.set('view engine', 'ejs'); /*template ejs */
server.set('views', './views');

let usuarios = [];

server.post('/cadastrar', function(req, res){
    let usuario = {};
    usuario.nome = req.body.nome;
    usuario.email = req.body.email;
    usuario.usuario = req.body.usuario
    usuario.senha = req.body.senha;
    usuarios.push(usuario);
    res.send(usuarios);
})

server.post("/login", function (req, res){
	
	for (let i = 0; i < usuarios.length; i++) {
		if (req.body.usuario == usuarios[i].usuario && req.body.senha == usuarios[i].senha) {
			res.render("main", {nome: req.body.usuario, msg: "", link: ""});
            return;
		}
	}
    res.render("main", {nome: req.body.usuario, msg: "User not found... ", link: "/cadastrar.html"});
});


server.listen(3000, ()=>{
    console.log('servidor rodando...');
})
