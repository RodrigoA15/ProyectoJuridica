import Radicados from "../../models/radicados.js";
import pkg from "exceljs";
const { Workbook } = pkg;

const NOMBRE_ARCHIVO = "Radicados";
const RUTA = "../files/radicados.xlsx";

//Not used>>>
// Json to react was used instead
export const allRadicados = async (req, res) => {
  try {
    const radicados = await Radicados.find().populate([
      { path: "id_procedencia", select: "nombre -_id" },
      { path: "id_canal_entrada", select: "nombre_canal -_id" },
      { path: "id_asunto", select: "nombre_asunto -_id" },
      { path: "id_tipificacion", select: "nombre_tipificacion -_id" },
      { path: "id_entidad", select: "nombre_entidad -_id" },
      { path: "id_departamento", select: "nombre_departamento -_id" },
    ]);

    if (radicados.length === 0) {
      return res
        .status(404)
        .json("No se encontraron resultados en la búsqueda");
    }

    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(NOMBRE_ARCHIVO);

    worksheet.columns = [
      { header: "S.no.", key: "s_no", width: 10 },
      { header: "Numero Radicado", key: "numero_radicado", width: 10 },
      { header: "Fecha Radicado", key: "fecha_radicado", width: 10 },
      { header: "Cantidad Respuesta", key: "cantidad_respuesta", width: 10 },
      { header: "Canal Entrada", key: "id_canal_entrada", width: 10 },
      { header: "Asunto", key: "id_asunto", width: 10 },
      { header: "Tipificacion", key: "id_tipificacion", width: 10 },
      { header: "Entidad", key: "id_entidad", width: 10 },
      { header: "Departamento", key: "id_departamento", width: 10 },
      { header: "Estado Radicado", key: "estado_radicado", width: 10 },
    ];

    radicados.forEach((radicado) => {
      worksheet.addRow(radicado);
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    await workbook.xlsx.writeFile(RUTA);

    res.status(200).json("Archivo de Excel creado correctamente");
  } catch (error) {
    console.error(`Error en la consulta de Excel de radicados: ${error}`);
    res.status(500).json("Error deservidor");
  }
};

export const pruebaApi = async (req, res) => {
  try {
    const radicados = await Radicados.find().populate([
      { path: "id_procedencia", select: "nombre -_id" },
      { path: "id_canal_entrada", select: "nombre_canal -_id" },
      { path: "id_asunto", select: "nombre_asunto -_id" },
      { path: "id_tipificacion", select: "nombre_tipificacion -_id" },
      { path: "id_entidad", select: "nombre_entidad -_id" },
      {
        path: "id_departamento",
        select: "nombre_departamento -_id",
      },
    ]);

    if (radicados.length > 0) {
      res.status(200).json(radicados);
    }
  } catch (error) {
    console.error(`Error en la consulta de Excel de radicados: ${error}`);
    res.status(500).json("Error de servidor");
  }
};
