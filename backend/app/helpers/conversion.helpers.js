const puppeteer = require("puppeteer");
async function convertHTMLtoPDF(html, datos) {

    const browser = await puppeteer.launch({headless:'new'});
    const page = await browser.newPage();
    const htmlvar = html
      .replace('{{count}}', datos.count)
      .replace('{{razonsocial}}', datos.razonSocial) // Por ingresar
      .replace('{{direccion}}', datos.direccion)     
      .replace('{{region}}', datos.region)
      .replace('{{rut}}', datos.rut)
      .replace('{{semestre}}', datos.semestre) // Por ingresar.
      .replace('{{horas}}', datos.horas) // Dependiente de npractica
      .replace('{{fecha actual}}', obtenerFechaActual())
      .replace('{{anio actual}}', obteneranioActual())
      .replace('{{npractica}}', datos.numeroPractica) // Por ingresar.
      .replace('{{SR nombre1 nombre2 apellido1 apellido2}}', `${datos.nombre1} ${datos.nombre2} ${datos.apellido1} ${datos.apellido2}`)
      .replace('{{NOMAPE}}', `${datos.nombre1} ${datos.apellido1}`);
    await page.setContent(htmlvar , {waitUntil: 'domcontentloaded'});
  
    const pdfConfig = await page.pdf({
      format: 'Letter',
    });
  
    return pdfConfig;
}
  
function obteneranioActual() {
    const fecha = new Date();
    const anio = fecha.getFullYear();
    return `${anio}`;
}
  function obtenerFechaActual() {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }
  module.exports = convertHTMLtoPDF;