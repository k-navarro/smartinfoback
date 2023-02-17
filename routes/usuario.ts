import { Router } from "express";
import {
  deleteUsuario,
  getUsuario,
  getUsuarios,
  registrarUsuario,
  putUsuario,
} from "../controller/usuarios";

const router = Router();

router.post("/registrar", registrarUsuario);
router.get("/", getUsuarios);
router.post("/login", getUsuario);
router.put("/:id", putUsuario);
router.delete("/:id", deleteUsuario);

export default router;
