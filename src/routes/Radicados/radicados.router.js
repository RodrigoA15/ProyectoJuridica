import { Router } from "express";
import * as RadicadosController from "../../controllers/Radicados/radicadoController.js";
import { authRequired } from "../../middlewares/validateToken.js";
// import { validateSchema } from "../../middlewares/validator.js";
// import { radicadoSchema } from "../../schemas/radicadosSchema.js";
import * as ExcelRadicados from "../../controllers/Radicados/QuerysExcel.js";
const router = Router();

//Radicados>>>>>>>
router.get("/radicados", authRequired, RadicadosController.getRadicados);
router.post("/radicados", RadicadosController.createRadicados);
router.get(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.getByIdRadicados
);
router.put(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.updateRadicados
);
router.delete(
  "/radicados/:id_radicado",
  authRequired,
  RadicadosController.deleteRadicado
);
//Consulta por departamentos>>>>
router.get(
  "/depsistemas_radicados",
  authRequired,
  RadicadosController.departamentoRadicado
);

router.get(
  "/depjuridica_radicados/:id_departamento",
  authRequired,
  RadicadosController.juridicaRadicado
);

//AllRadicadosPendientes
router.get("/radicados_pendientes", RadicadosController.allRadicadosPendientes);
//AllRadicadosAsignados
router.get("/radicados_asignados", RadicadosController.allRadicadosAsignados);
//AllRadicadoRespuestas
router.get("/radicado_respuestas", RadicadosController.allRadicadosRespondidos);
//Chart Entidad
router.get(
  "/chart_entidad2/:fechainicio/:fechafin",
  RadicadosController.chartEntidad
);
//Chart Radicados
router.get(
  "/chart_radicados/:fecha_inicio/:fecha_fin",
  RadicadosController.queryChartRadicados
);
//Chart Canal Entrada
router.get(
  "/chart_canal/:fechainicio/:fechafin",
  RadicadosController.queryChartCanalEntrada
);
//Actualizacion departamento >>>
router.put(
  "/reasignacion_departamento/:id_radicado",
  RadicadosController.updateDepartamento
);
//Grafica Radicados Departamento
router.get(
  "/chartdepartamentos/:fecha_inicio/:fecha_fin",
  RadicadosController.chartDepartamentoRadicados
);
////////////////////////////////////////////Querys Excel/////////////////////////////////
// router.get("/radicadoxlsx", ExcelRadicados.allRadicados);
router.get("/radicadop", ExcelRadicados.allRadicadosExcel);

// router.get("/descargarData", ExcelRadicados.dtaexcel);

router.post("/data", RadicadosController.dataFake);

export default router;
