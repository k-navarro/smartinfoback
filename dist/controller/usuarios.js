"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.getUsuarios = exports.getUsuario = exports.registrarUsuario = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const existeEmail = yield usuario_1.default.findOne({
            where: {
                email: body.email,
            },
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `el email ya tiene un usuario asignado`,
            });
        }
        const usuario = new usuario_1.default(body);
        yield usuario.save();
        res.json({ msg: "usuario creado correctamente" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Hable con el admin",
        });
    }
});
exports.registrarUsuario = registrarUsuario;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const usuario = yield usuario_1.default.findOne({
        where: {
            email: body.email
        },
    });
    if (usuario) {
        let accesPassword = usuario.dataValues.password;
        //accesPassword=bcrypt.compareSync(usuario.dataValues.password,accesPassword);
        console.log(body.password);
        if (accesPassword === body.password) {
            res.status(200).json({ msg: `user logueado exit` });
        }
        else {
            res.status(500).json({ msg: "credenciales incorrectas" });
        }
    }
    else {
        res.status(404).json({
            msg: `el usuario no existe ${body.email}`,
        });
    }
});
exports.getUsuario = getUsuario;
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json(usuarios);
});
exports.getUsuarios = getUsuarios;
const putUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `el usuario no esxiste con el id` + id,
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "hable con el administrador",
        });
    }
});
exports.putUsuario = putUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `el usuario no esxiste con el id` + id,
        });
    }
    yield usuario.destroy();
    res.json(usuario);
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map