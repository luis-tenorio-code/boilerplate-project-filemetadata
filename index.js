var express = require('express');
var cors = require('cors');
const multer = require('multer');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

/* 
Microservicio de metadatos de archivo
Debes proporcionar tu propio proyecto, no la URL del ejemplo.
Esperando:Puedes enviar un formulario que incluya una carga de archivo.
Esperando:El campo de entrada del archivo de formulario tiene el atributo name establecido en upfile.
Esperando:Cuando envíes un archivo, recibirás él name, type y size del archivo en bytes dentro de la respuesta JSON.
*/

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  const { originalname, mimetype, size } = req.file;
  res.json({ name: originalname, type: mimetype, size });
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port);
});
