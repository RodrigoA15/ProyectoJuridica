import express from "express";
import morgan from "morgan";
//Rutas
import routeAsunto from "./src/routes/Asunto/Asunto.router.js";
import routeAuth from "./src/routes/Auth/auth.router.js";
import routeCanal from "./src/routes/Canal_Entrada/canal.router.js";
import routeDepartamentos from "./src/routes/Departamentos/departamento.router.js";
import routeEntidad from "./src/routes/Entidad/entidad.router.js";
import routeProcedencia from "./src/routes/Procedencia/procendencia.router.js";
import routeRadicados from "./src/routes/Radicados/radicados.router.js";
import routeRoles from "./src/routes/Roles/roles.router.js";
import routeTipificacion from "./src/routes/Tipificacion/tipificacion.router.js";
import routeEstado from "./src/routes/EstadoRadicados/estadoRdos.router.js";
import routeAsiganacion from "./src/routes/Asignaciones/asignar.router.js";
import routerRespuesta from "./src/routes/RespuestaRadicados/respuesta.router.js";
import routerHistorial from "./src/routes/Historial/Historial.router.js";
import routerUsuariosQX from "./src/routes/UsuariosQX/usuariosQX.router.js";
import routerCourt from "./src/routes/routesQX/Courts.router.js";
import routerEntityCourts from "./src/routes/EntidadesJuridicas/entidadJuridica.router.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const ruta = "/api";
const app = express();
const corsOptions = {
  origin: "http://192.168.28.74:3000",
  // origin: "http://localhost:3000",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
//rutas>>>>>
app.use(`${ruta}/asunto`, routeAsunto);
app.use(`${ruta}/auth`, routeAuth);
app.use(`${ruta}/canal`, routeCanal);
app.use(`${ruta}/departamentos`, routeDepartamentos);
app.use(`${ruta}/entidad`, routeEntidad);
app.use(`${ruta}/procedencia`, routeProcedencia);
app.use(`${ruta}/radicados`, routeRadicados);
app.use(`${ruta}/roles`, routeRoles);
app.use(`${ruta}/tipificacion`, routeTipificacion);
app.use(`${ruta}`, routeEstado);
app.use(`${ruta}`, routeAsiganacion);
app.use(`${ruta}`, routerRespuesta);
app.use(`${ruta}`, routerHistorial);
app.use(`${ruta}`, routerUsuariosQX);
app.use(`${ruta}`, routerCourt);
app.use(`${ruta}`, routerEntityCourts);

export default app;
