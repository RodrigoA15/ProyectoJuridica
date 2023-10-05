import Respuesta from "../../models/respuesta_radicado.js";
import multer from "multer";

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
    const { id_asignacion, numero_radicado_respuesta } = req.body;

    const newRespuesta = new Respuesta({
      id_asignacion,
      numero_radicado_respuesta,
    });

    const savedRespuesta = await newRespuesta.save();

    if (savedRespuesta) {
      res.status(200).json("Respuesta Creada");
    } else {
      res.status(500).json("Hubo un error al crear la respuesta");
    }
  } catch (error) {
    res.status(500).json(`Error createRespuesta ${error}`);
    console.log(error);
  }
};

export const savedFilePDF = async (req, res) => {
  try {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "C:\\Users\\SISTEMAS\\Documents");
      },

      filename: (req, file, cb) => {
        // Guarda el archivo con el nombre original
        cb(null, file.originalname);
      },
    });

    const upload = multer({
      storage,
      dest: "./Documents",
      fileFilter: (req, file, cb) => {
        const filetypes = /pdf/;
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype) {
          return cb(null, true);
        }

        cb("Tipo de archivo no valido");
      },
    });

    upload.single("respuesta_pdf")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error creating filed" + err });
      }

      res.status(200).json({ message: "Archivo cargado exitosamente" });
    });
  } catch (error) {
    console.log(error);
  }
};

export const respuestasporRadicado = async (req, res) => {
  try {
    const response = await Respuesta.find({})
      .populate({
        path: "id_asignacion",
        populate: {
          path: "id_radicado",
          match: { numero_radicado: req.params.numero_radicado },
        },
      })
      .exec();
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
  }
};
