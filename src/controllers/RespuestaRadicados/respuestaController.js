import Respuesta from "../../models/respuesta_radicado.js";
import multer from "multer";
import path from "path";
import SambaClient from "samba-client";
import Radicados from "../../models/radicados.js";

export const getAllRespuestas = async (req, res) => {
  try {
    const response = await Respuesta.find({}).populate({
      path: "id_asignacion",
      populate: {
        path: "id_radicado",
      },
    });

    if (response.length > 0) {
      res.status(200).json(response);
    } else {
      res.status(404).json("No se encontraron resultados en la busqueda");
    }
  } catch (error) {
    res.status(500).json(`Error getAll Respuestas ${error.message}`);
  }
};

export const createRespuesta = async (req, res) => {
  try {
    let nombreArchivo;
    let urlArchivos;

    // Define Samba share options
    const sambaOptions = {
      address: "\\\\192.168.28.100\\programacion y datos",
      username: "",
      password: "",
      domain: "WORKGROUP",
      maxProtocol: "SMB3",
      maskCmd: true,
    };

    new SambaClient(sambaOptions);

    // Path to save the PDF file in the Samba share
    const pathPdf =
      "\\\\192.168.28.100\\programacion y datos\\RodrigoJR\\PDFJuridica";

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, pathPdf);
      },
      filename: (req, file, cb) => {
        nombreArchivo = file.originalname;
        cb(null, nombreArchivo);
      },
    });

    const upload = multer({
      storage,
      fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype) {
          return cb(null, true);
        }
        cb(new Error("Archivo invalido "));
      },
    }).single("respuesta_pdf");

    upload(req, res, async (err) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error creating file: " + err.message });
      }

      urlArchivos = path.join(pathPdf, nombreArchivo);
      const { id_asignacion, numero_radicado_respuesta } = req.body;

      const newRespuesta = new Respuesta({
        id_asignacion,
        numero_radicado_respuesta,
        urlArchivo: urlArchivos,
      });

      const savedRespuesta = await newRespuesta.save();

      if (savedRespuesta) {
        res.status(200).json({ message: "Respuesta creada" });
      } else {
        res.status(500).json({ error: "Hubo un error al crear la respuesta" });
      }
    });
  } catch (error) {
    console.error("Error in createRespuesta:", error);
    res.status(500).json({ error: `Error createRespuesta ${error.message}` });
  }
};

export const respuestasporRadicado = async (req, res) => {
  try {
    const response = await Respuesta.find({})
      .populate({
        path: "id_asignacion",

        populate: [
          {
            path: "id_radicado",
            match: {
              id_departamento: req.params.id_departamento,
              numero_radicado: req.params.numero_radicado,
            },

            populate: {
              path: "id_asunto",
              select: "nombre_asunto",
            },
          },
          {
            path: "id_usuario",
            select: "username",
          },
        ],
      })
      .lean();
    const validacion = response.filter((respuesta) => {
      return respuesta.id_asignacion.id_radicado !== null;
    });

    if (validacion.length > 0) {
      res.status(200).json(validacion);
    } else {
      res.status(404).json("No se encontraron asignaciones pendientes");
    }
  } catch (error) {
    res.status(500).json(`error respuestas por radicado ${error}`);
    console.log(error);
  }
};

export const respuestasJuridica = async (req, res) => {
  try {
    const response = await Respuesta.find({})
      .populate({
        path: "id_asignacion",
        populate: [
          {
            path: "id_radicado",
            match: {
              id_departamento: req.params.id_departamento,
              numero_radicado: req.params.numero_radicado,
            },
            populate: [
              {
                path: "id_asunto",
                select: "nombre_asunto",
              },
              {
                path: "estado_radicado",
              },
            ],
          },
          {
            path: "id_usuario",
            select: "username",
          },
        ],
      })
      .lean();

    const filteredResponses = response.filter(
      (r1) => r1.id_asignacion.id_radicado !== null
    );

    if (filteredResponses.length > 0) {
      res.status(200).json(filteredResponses);
    } else {
      res.status(404).json("No se encontraron respuestas");
    }
  } catch (error) {
    res.status(500).json(`Error en respuestasJuridica: ${error.message}`);
  }
};

//Usuarios con mas repuestas

export const answersByUser = async (req, res) => {
  try {
    const fecha = Radicados.find().select("fecha_radicado");

    // const respuestas = await Respuesta.aggregate([
    //   {
    //     $match: {
    //       $or: [
    //         { id_asignacion: "652fd8bfa7d837a7d83ca584" },
    //         // { numero_radicado_respuesta: 23 },
    //       ],
    //     },
    //   },
    // ]);

    const respuestas = await Respuesta.aggregate([
      {
        $group: {
          _id: "$_id",
          times: { $sum: "$times_count" },
          asignacion: { $first: "$id_asignacion" },
        },
      },

      {
        $limit: 5,
      },

      {
        $lookup: {
          from: "Asignaciones",
          localField: "id_asignacion",
          foreignField: "id_asignacion",
          as: "Asignaicon",
        },
      },

      {
        $unwind: "$asignacion",
      },
    ]);

    // const respuestas = await Respuesta.find();

    res.status(200).json(respuestas);
  } catch (error) {
    res.status(500).json(`error respuestas por usuarios ${error}`);
  }
};
