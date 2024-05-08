const db = require("../models");
const puppeteer = require("puppeteer");
const convertHTMLtoPDF = require('../helpers/conversion.helpers.js');
const Op = db.Sequelize.Op;
const { readFileSync } = require('fs');
const path = require('path');
const imagePath = path.join(__dirname, '../public/uv.jpg');
const imageBase64 = readFileSync(imagePath).toString('base64');
exports.conversion = async (req,res) => {
    const datos = req.body;
    const html = `<html style="display: flex;size:Letter;margin-left:12.5%;width: 612px; height: 792px;justify-content: center;">
    <head>
       <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
       <meta http-equiv="Content-Style-Type" content="text/css" />
       <meta name="generator" content="Aspose.Words for .NET 23.10.0" />
       <title></title>
    </head>
    <body style="display: block;font-family:'Times';font-size:8pt;height: 712;width: 100%;margin: 0;padding: 0;justify-content: center;">
    <header style="background-color:#ffffff00;color:#fff;display: flex;">
            <img width="190" height="100"  alt="Tu imagen de encabezado" src="data:image/jpg;base64,${imageBase64}" alt="alt text" />
           <p style="text-align:right;line-height: 1.5;letter-spacing: 1px;text-indent:304.8pt; font-size:8pt">
              <span style="font-family:'Arial Unicode MS'">{{count}}/{{anio actual}}</span>
              <span style="font-family:'Arial Unicode MS'">Valparaíso, {{fecha actual}}</span>
           </p>
     </header>
       <div>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'">Señores</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;font-size:8pt"><span style="font-family:'Arial Unicode MS'; font-weight:bold">{{razonsocial}}</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;font-size:8pt"><span style="font-family:'Arial Unicode MS'">{{direccion}}</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;font-size:8pt"><span style="font-family:'Arial Unicode MS'">{{region}}</span><span style="width:306.26pt; font-family:'Arial Unicode MS'; display:inline-block; -aw-tabstop-align:left; -aw-tabstop-pos:389.85pt">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; text-decoration:underline">Presente</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:6.5pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:6.5pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'">De mi consideración:</span><span style="width:31.5pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span><span style="width:35.4pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'">Desde el año 2005, la Universidad de Valparaíso a través de su Escuela Ingeniería Civil Informática, tiene en funcionamiento la </span><span style="font-family:'Arial Unicode MS'; font-weight:bold">Carrera Ingeniería Civil Informática.</span><span style="font-family:'Arial Unicode MS'"> Con el objeto de que las y los estudiantes, que se encuentran en el ciclo profesional de la carrera se familiaricen con el ambiente empresarial y puedan aplicar los conocimientos que han adquirido durante el transcurso de la misma, se les incentiva a la realización de dos prácticas profesionales, de acuerdo a lo estipulado en el Reglamento de Estudios de la Carrera.</span><span style="font-family:'Arial Unicode MS'; -aw-import:spaces">&#xa0; </span><span style="font-family:'Arial Unicode MS'">La primera práctica deberá tener una duración de 270 horas cronológicas y la segunda práctica una duración de 324 horas cronológicas, y al término de cada una de ellas el o la estudiante deberá presentar una memoria de práctica firmada por su Supervisor(a) que lo tenía a su cargo en la empresa debiendo completar un “Informe de Evaluación de Prácticas”, documento que será entregado por el o la estudiante interesado(a).</span><span style="font-family:'Arial Unicode MS'; -aw-import:spaces">&#xa0; </span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; -aw-import:spaces">&#xa0; </span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; font-size: 8pt;">
             <span style="font-family: 'Arial Unicode MS';">Por lo anteriormente señalado, solicito a ustedes que el </span>
             <span style="font-family: 'Arial Unicode MS'; font-weight: bold;"> {{SR nombre1 nombre2 apellido1 apellido2}}</span>
             <span style="font-family: 'Arial Unicode MS';">, Cédula de Identidad Nº </span>
             <span style="font-family: 'Arial Unicode MS'; font-weight: bold;"> {{rut}}</span>
             <span style="font-family: 'Arial Unicode MS';">, quien se encuentra en {{semestre}} semestre del Plan de Estudios Ingeniería Civil Informática, pueda realizar su </span>
             <span style="font-family: 'Arial Unicode MS'; font-weight: bold;">{{npractica}} práctica profesional</span>
             <span style="font-family: 'Arial Unicode MS';">de {{horas}} horas cronológicas en vuestra Unidad.</span>
         </p>
         
          
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'">Si el alumno </span><span style="font-family:'Arial Unicode MS'; font-weight:bold">{{NOMAPE}}</span><span style="font-family:'Arial Unicode MS'"> es aceptado por vuestra Unidad para que realice su práctica profesional, agradeceré completar el documento “Carta de Aceptación de Práctica”, el que será facilitado por el alumno seleccionado.</span><span style="font-family:'Arial Unicode MS'; -aw-import:spaces">&#xa0; </span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'">Por otra parte, cabe señalar que esta actividad se encuentra enmarcada en los requerimientos académicos y por tanto el alumno se encontrará protegido por la Ley Nº16.744, Art. 3º reglamentado por el D.S. Nº 313 Art. 1º sobre Seguro Accidente Escolar.</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-indent:141.75pt; text-align:justify; font-size:7.5pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="width:35.4pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span><span style="width:35.4pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span><span style="width:35.4pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span><span style="width:35.4pt; font-family:'Arial Unicode MS'; display:inline-block">&#xa0;</span><span style="font-family:'Arial Unicode MS'">Esperando una buena acogida a la presente, se despide muy cordialmente.</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:8pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:3pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:justify; font-size:5pt"><span style="font-family:'Arial Unicode MS'; -aw-import:ignore">&#xa0;</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:center; font-size:8pt"><span style="font-family:'Arial Unicode MS'; font-weight:bold">Rodrigo Olivares O.</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:center; font-size:7.5pt"><span style="font-family:'Arial Unicode MS'">Jefe de Carrera</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:center; font-size:7.5pt"><span style="font-family:'Arial Unicode MS'">Ingeniería Civil en Informática</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;text-align:center; font-size:7.5pt"><span style="font-family:'Arial Unicode MS'">Universidad de Valparaíso</span></p>
          <p style="line-height: 1.5;letter-spacing: 1px;font-size:6.5pt"><span style="font-family:'Arial Unicode MS'">ROO/mao.</span></p>
          <div style="-aw-headerfooter-type:footer-primary; clear:both">
            
             <p style="line-height: 1.5;letter-spacing: 1px;text-align:right; font-size:8pt"><span style="height:0pt; text-align:left; display:block; position:absolute; z-index:-65535"></span><span style="font-family:'Swiss 721 Condensed BT'; font-weight:bold; color:#003c69">General Cruz 222, 3º piso, Valparaíso</span><span style="font-family:'Swiss 721 Condensed BT'; color:#003c69"> </span><span style="font-family:Symbol; color:#003c69"></span><span style="font-family:'Swiss 721 Condensed BT'; color:#003c69"> Fono: +56 (32) 2603629 </span><span style="font-family:Symbol; color:#003c69"></span><span style="font-family:'Swiss 721 Condensed BT'; color:#003c69"> E-mail: secretaria.decom@uv.cl</span></p>
             <p style="line-height: 1.5;letter-spacing: 1px;text-align:right"><a href="http://www.uv.cl" style="text-decoration:none"><span class="Hyperlink" style="font-family:'Swiss 721 Condensed BT'; font-size:8pt">www.</span><span class="Hyperlink" style="font-family:'Swiss 721 Condensed BT'; font-size:8pt; font-weight:bold">uv</span><span class="Hyperlink" style="font-family:'Swiss 721 Condensed BT'; font-size:8pt">.cl</span></a></p>
          </div>
       </div>
    </body>
  </html>`;
  
    const pdf = await convertHTMLtoPDF(html, datos);
    res.contentType('application/pdf');
    res.send(pdf);
}