"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controller/usuarios");
const router = (0, express_1.Router)();
router.post("/registrar", usuarios_1.registrarUsuario);
router.get("/", usuarios_1.getUsuarios);
router.post("/login", usuarios_1.getUsuario);
router.put("/:id", usuarios_1.putUsuario);
router.delete("/:id", usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuario.js.map