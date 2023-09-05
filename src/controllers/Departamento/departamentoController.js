import Departamento from "../../models/departamentos.js";

export const getDepartamento = async (req, res) => {
  try {
    const departamentos = await Departamento.find();

    if (departamentos.length > 0) {
      res.status(200).json(departamentos);
    } else {
      res.status(404).json("No se encontraton departamentos");
    }
  } catch (error) {
    console.log(`error departamentos: ${error}`);
  }
};

export const createDepartamento = async (req, res) => {
  try {
    const { nombre_departamento } = req.body;
    const newDepartamento = new Departamento({
      nombre_departamento,
    });

    await newDepartamento.save();
    res.status(200).json(newDepartamento);
  } catch (error) {
    res.status(500).json("Error al crear departamento", error);
  }
};

export const getDepartamentoById = async (req, res) => {
  try {
    const departamento = await Departamento.findById({
      _id: req.params.id_departamento,
    });

    if (!departamento) {
      res.status(404).json("NO se encontro el departamento");
    } else {
      res.status(200).json(departamento);
      console.log(departamento);
    }
  } catch (error) {
    res.json(error);
    console.log(error);
  }
};

export const updateDepartamento = async (req, res) => {
  try {
    const { nombre_departamento } = req.body;
    await Departamento.findByIdAndUpdate(
      {
        _id: req.params.id_departamento,
      },
      {
        nombre_departamento,
      },
      {
        new: true,
      }
    );

    return res.json(`Actualizado correctamente`);
  } catch (error) {
    res.status(500).json("Error de servidor", error);
  }
};

export const deleteDepartamento = async (req, res) => {
  try {
    const deleteDepartamento = await Departamento.findByIdAndDelete(
      req.params.id_departamento
    );
    if (!deleteDepartamento) {
      res.status(404).json("Departamento not found");
    } else {
      res.status(404).json("Eliminado correctamente");
    }
  } catch (error) {
    res.status(500).json(`Error de servidor ${error}`);
  }
};
