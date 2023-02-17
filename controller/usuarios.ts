import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const registrarUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  try {
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email,
      },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `el email ya tiene un usuario asignado`,
      });
    }

    const usuario = new Usuario(body);
    await usuario.save();
    res.json({ msg: "usuario creado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Hable con el admin",
    });
  }
};

export const getUsuario = async (req: Request, res: Response) => {
  const { body } = req;

  const usuario = await Usuario.findOne({
    where: {
      email: body.email,
    },
  });

  if (usuario) {
    let accesPassword = usuario.dataValues.password;

    //accesPassword=bcrypt.compareSync(usuario.dataValues.password,accesPassword);
    console.log(body.password);
    if (accesPassword === body.password) {
      res.status(200).json({ msg: `user logueado exit` });
    } else {
      res.status(500).json({ msg: "credenciales incorrectas" });
    }
  } else {
    res.status(404).json({
      msg: `el usuario no existe ${body.email}`,
    });
  }
};

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();
  res.json(usuarios);
};

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({
        msg: `el usuario no esxiste con el id` + id,
      });
    }

    await usuario.update(body);

    res.json(usuario);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    return res.status(404).json({
      msg: `el usuario no esxiste con el id` + id,
    });
  }

  await usuario.destroy();

  res.json(usuario);
};
