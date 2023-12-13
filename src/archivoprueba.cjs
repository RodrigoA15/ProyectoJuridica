const fs = require('fs');




// Ruta para obtener la lista de archivos en la carpeta compartida

  const folderPath = '\\\\192.168.28.100\\programacion y datos\\RodrigoJR\\PDFJuridica\\2023\\diciembre\\12';

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return console.log({ error: 'Error al leer la carpeta compartida.' });
    }

    console.log({ files });
  });


;
