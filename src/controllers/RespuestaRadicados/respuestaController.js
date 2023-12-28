import Respuesta from "../../models/respuesta_radicado.js";
import Asignacion from "../../models/asignar_radicado.js";
import multer from "multer";
import path from "node:path";
import SambaClient from "samba-client";
import fs from "node:fs";
import database from "../../../env.js";

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

//Carga respuesta radicado y archivo pdf
export const createRespuesta = async (req, res) => {
  try {
    let nombreArchivo;
    let urlArchivos;
    let pathPdf;

    //TODO Define Samba share options
    //? Add adress to ENV
    const sambaOptions = {
      address: database.address,
      username: "",
      password: "",
      domain: "WORKGROUP",
      maxProtocol: "SMB3",
      maskCmd: true,
    };

    new SambaClient(sambaOptions);

    const storage = multer.diskStorage({
      destination: async (req, file, cb) => {
        console.log(req.body);
        const { id_asignacion } = req.body;
        const response = await Asignacion.findOne({
          _id: id_asignacion,
        }).populate({
          path: "id_radicado",
        });
        console.log(`Data : ${response}`);

        const numero_radicado = response.id_radicado.numero_radicado;
        console.log(`Numerpppp ${numero_radicado}`);
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString("default", {
          month: "long",
        });
        const day = currentDate.getDate().toString().padStart(2, "0");

        pathPdf = path.join(
          `\\\\192.168.28.97\\pqr\\${year}\\${month}\\${day}\\${numero_radicado}`
        );
        //TODO Crea directorio en caso de no existir
        if (!fs.existsSync(pathPdf)) {
          try {
            fs.mkdirSync(pathPdf, { recursive: true });
            console.log("Directorio creado");
          } catch (error) {
            console.log("No se creo el directorio");
          }
        }

        cb(null, pathPdf);
      },
      filename: async (req, file, cb) => {
        nombreArchivo = file.originalname;
        cb(null, nombreArchivo);
      },
    });

    //Validacion de archivo
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
      //Creacion de registro en la base de datos
      urlArchivos = path.join(pathPdf, nombreArchivo);
      const { id_asignacion, numero_radicado_respuesta, fechaRespuesta } =
        req.body;

      const newRespuesta = new Respuesta({
        id_asignacion,
        numero_radicado_respuesta,
        urlArchivo: urlArchivos,
        fechaRespuesta: fechaRespuesta,
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

//!Visualizar pdf
//!Deprecated >>>>
export const viewPDF = async (req, res) => {
  const directorio =
    "\\\\192.168.28.100\\programacion y datos\\RodrigoJR\\PDFJuridica\\2023\\diciembre\\12";

  fs.readdir(directorio, (error, archivos) => {
    if (error) {
      console.error(error);
    } else {
      archivos.forEach((archivo) => {
        if (archivo.toLowerCase().endsWith(".pdf")) {
          const rutaCompleta = path.join(directorio, archivo);
          res.status(200).json([rutaCompleta]);
        }
      });
    }
  });
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

//!Usuarios con mas repuestas
//!Not USED >>>>>>>
// export const answersByUser = async (req, res) => {
//   try {
//     const fecha = Radicados.find().select("fecha_radicado");

//     // const respuestas = await Respuesta.aggregate([
//     //   {
//     //     $match: {
//     //       $or: [
//     //         { id_asignacion: "652fd8bfa7d837a7d83ca584" },
//     //         // { numero_radicado_respuesta: 23 },
//     //       ],
//     //     },
//     //   },
//     // ]);

//     const respuestas = await Respuesta.aggregate([
//       {
//         $group: {
//           _id: "$_id",
//           times: { $sum: "$times_count" },
//           asignacion: { $first: "$id_asignacion" },
//         },
//       },

//       {
//         $limit: 5,
//       },

//       {
//         $lookup: {
//           from: "Asignaciones",
//           localField: "id_asignacion",
//           foreignField: "id_asignacion",
//           as: "Asignaicon",
//         },
//       },

//       {
//         $unwind: "$asignacion",
//       },
//     ]);

//     // const respuestas = await Respuesta.find();

//     res.status(200).json(respuestas);
//   } catch (error) {
//     res.status(500).json(`error respuestas por usuarios ${error}`);
//   }
// };

//TODO Reporte de excel radicados con sus respuestas
export const respuestasporRadicadoExcel = async (req, res) => {
  try {
    const response = await Respuesta.find({})
      .populate({
        path: "id_asignacion",

        populate: [
          {
            path: "id_radicado",
            populate: [
              { path: "id_procedencia", select: "nombre -_id" },
              { path: "id_canal_entrada", select: "nombre_canal -_id" },
              { path: "id_asunto", select: "nombre_asunto -_id" },
              { path: "id_tipificacion", select: "nombre_tipificacion -_id" },
              { path: "id_entidad", select: "nombre_entidad -_id" },
              {
                path: "id_departamento",
                select: "nombre_departamento -_id",
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

//TODO ver pdf respuestas
export const viewPDFAnswer = async (req, res) => {
  try {
    const { prueba } = req.params;
    const data = await Respuesta.findOne({
      _id: prueba,
    });

    if (!data) {
      return res.status(404).json({ message: "No se encontraron datos." });
    }

    const archivoPath = data.urlArchivo; //TODO Usa la URL directamente
    console.log(archivoPath);
    res.sendFile(archivoPath);
  } catch (error) {
    console.error(`Error al intentar ver los PDFs: ${error}`);
    res
      .status(500)
      .json({ message: `Error al intentar ver los PDFs: ${error}` });
  }
};
