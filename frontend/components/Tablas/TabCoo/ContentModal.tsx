import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Button,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  RadioGroup,
  Radio,
  Divider,
  Textarea,
} from "@nextui-org/react";
import { Send } from "lucide-react";
interface AspectosGenerales {
  capacidad: string;
  responzabilidad: string;
  asistencia: string;
  comportamiento: string;
  adaptabilidad: string;
  iniciativa: string;
}
interface AspectosTecnicos {
  solucion: string;
  conocimientos: string;
  organizacion: string;
  decision: string;
}
interface AspectosComunicacionales {
  comunicacion_escrita: string;
  comunicacion_oral: string;
}
interface Pregunta {
  id: number;
  respuesta: string;
  comentario: string;
}
interface Informe {
  aspectos_generales: AspectosGenerales;
  aspectos_tecnicos: AspectosTecnicos;
  aspectos_comunicacionales: AspectosComunicacionales;
  preguntas: Pregunta[];
  opinion: string;
}
const ContentModal = ({ informe }: { informe:Informe }) => {
  return (
    <div className="w-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Aspecto General</h2>
      <div className="px-6 flex flex-col gap-4 mb-4">
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Capacidad</h2>
            <p className="text-sm text-default-500">
              (Aptitud para comprender y ejecutar las órdenes e iniciativa para
              actuar y resolver situaciones en forma independiente, así como en
              forma conjunta a través del trabajo en equipo)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.capacidad}
              isDisabled
            >
              <Radio
                value="1"
                description="Necesita ayuda detallada para realizar los trabajos"
              />
              <Radio
                value="3"
                description="Necesita ayuda. Aprende metódicamente."
              />
              <Radio
                value="5"
                description="Necesita ayuda esporádica para realizar su trabajo."
              />
              <Radio
                value="7"
                description="Rara vez necesita ayuda. Aprende rápido."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Responsabilidad</h2>
            <p className="text-sm text-default-500">
              (forma como el estudiante cumple las diversas actividades o tareas
              que le son encomendadas.)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.responzabilidad}
              isDisabled
            >
              <Radio
                value="1"
                description="No finaliza el trabajo dentro del plazo otorgado."
              />
              <Radio
                value="3"
                description="Comúnmente termina el trabajo dentro del plazo otorgado."
              />
              <Radio
                value="5"
                description="Generalmente completa el trabajo dentro del plazo otorgado."
              />
              <Radio
                value="7"
                description="Completa su trabajo dentro del plazo otorgado."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Asistencia</h2>
            <p className="text-sm text-default-500">
              (Cumplimiento de horarios y compromisos)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.asistencia}
              isDisabled
            >
              <Radio value="1" description="Se ausenta reiteradamente." />
              <Radio
                value="3"
                description="Ocasionalmente se ausenta. Generalmente por buenas razones."
              />
              <Radio
                value="5"
                description="Es muy regular y puntual. Rara vez se ausenta."
              />
              <Radio
                value="7"
                description="No se ausenta ni registra atrasos."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Comportamiento</h2>
            <p className="text-sm text-default-500">
              (Actitud y grado de aceptación que el estudiante asume frente a
              diversas instrucciones, hechos y órdenes impartidas por su
              supervisor)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.comportamiento}
              isDisabled
            >
              <Radio
                value="1"
                description="Necesita supervisión permanente de manera de asegurar su atención al trabajo"
              />
              <Radio
                value="3"
                description="Trabaja irregularmente. Normalmente pone atención al trabajo"
              />
              <Radio
                value="5"
                description="Trabaja regularmente. Generalmente coloca esfuerzo y atención."
              />
              <Radio
                value="7"
                description="Trabaja regularmente. Siempre coloca esfuerzo y gran atención"
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Adaptabilidad</h2>
            <p className="text-sm text-default-500">
              (Grado de integración a equipos de trabajo en función de objetivos
              comunes)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.adaptabilidad}
              isDisabled
            >
              <Radio
                value="1"
                description="Le cuesta adaptarse. Es indeciso y resistente a los cambios."
              />
              <Radio
                value="3"
                description="Generalmente se adapta pero con dificultades."
              />
              <Radio
                value="5"
                description="Se adapta a variadas situaciones con escasa dificultad."
              />
              <Radio
                value="7"
                description="Cambia con facilidad y poco esfuerzo."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card className="flex flex-col gap-4 w-full ">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500" >Iniciativa</h2>
            <p className="text-sm text-default-500">
              (Realiza trabajos y propone soluciones alternativas)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_generales.iniciativa}
              isDisabled
            >
              <Radio
                value="1"
                description="Espera que le asignen el trabajo. Alguien debe explicárselo."
              />
              <Radio
                value="3"
                description="Espera que le asignen el trabajo. Alguien debe explicárselo."
              />
              <Radio
                value="5"
                description="Emprende el trabajo a medida que es necesitado."
              />
              <Radio
                value="7"
                description="Realiza su trabajo sin preguntar y va más allá de lo solicitado."
              />
            </RadioGroup>
          </CardBody>
        </Card>
      </div>
      <Divider />
      <h2 className="text-xl font-bold mb-6 text-gray-700">Aspecto Tecnico</h2>
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
        <Card className="flex flex-col gap-4 w-full ">
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Solución de problemas</h2>
            <p className="text-sm text-default-500">
              (creatividad, ejecución de ideas o proyectos)
            </p>
          </CardHeader>
          <CardBody className="flex flex-col gap-4 w-full ">
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_tecnicos.solucion}
              isDisabled
              className="p-1"
            >
              <Radio
                value="1"
                description="No presenta ideas ni interés por aportar soluciones."
              />
              <Radio
                value="3"
                description="Propone un 50% de las veces, soluciones innovadoras a problemas, comunicándolas eventualmente al equipo de trabajo."
              />
              <Radio
                value="5"
                description="Propone en un 80% de las veces soluciones innovadores a problemas y las comunica al equipo de trabajo, aportando a su implementación."
              />
              <Radio
                value="7"
                description="Propone en un 100% de las veces soluciones innovadores a problemas y las comunica al equipo de trabajo, aportando a su implementación."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Conocimientos</h2>
            <p className="text-sm text-default-500">
              (demuestra conocimientos y habilidades en la realización de las
              actividades encomendadas)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_tecnicos.conocimientos}
              isDisabled
            >
              <Radio
                value="1"
                description="Posee conocimientos elementales incompletos."
              />
              <Radio value="3" description="Posee conocimientos parciales." />
              <Radio
                value="5"
                description="Posee conocimientos generales y técnicos satisfactorias."
              />
              <Radio
                value="7"
                description="Posee los conocimientos técnicos suficientes para desarrollarse profesionalmente."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Organización</h2>
            <p className="text-sm text-default-500">
              (organiza adecuadamente las actividades que se le encomiendan)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_tecnicos.organizacion}
              isDisabled
            >
              <Radio
                value="1"
                description="Es incapaz de organizar sus tareas. Requiere de un guía permanente."
              />
              <Radio
                value="3"
                description="Ocasionalmente organiza sus tareas. Requiere de supervisión."
              />
              <Radio
                value="5"
                description="Generalmente organiza sus tareas. Rara vez requiere de supervisión."
              />
              <Radio
                value="7"
                description="Siempre organiza sus actividades sin requerir apoyo alguno."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Capacidad de decisión</h2>
            <p className="text-sm text-default-500">
              (toma decisiones con buen juicio y criterio)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_tecnicos.decision}
              isDisabled
            >
              <Radio
                value="1"
                description="Jamás toma una decisión por si sólo."
              />
              <Radio
                value="3"
                description="Ocasionalmente dirime con buen juicio y criterio."
              />
              <Radio
                value="5"
                description="Generalmente dirime con buen juicio y criterio."
              />
              <Radio
                value="7"
                description="Dirime con buen juicio y criterio."
              />
            </RadioGroup>
          </CardBody>
        </Card>
      </div>
      <Divider />
      <h2 className="text-xl font-bold mb-6 text-gray-700">Aspectos comunicacionales</h2>
      <div className="w-full mx-auto px-6 flex flex-col gap-4 mb-4">
        <Card className="flex flex-col gap-4 w-full">
          <CardHeader className="flex flex-col items-start w-full">
            <h2 className="text-lg font-semibold text-gray-500">Comunicación escrita</h2>
            <p className="text-sm text-default-500">
              (Capacidad para expresarse por escrito)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_comunicacionales.comunicacion_escrita}
              isDisabled
            >
              <Radio
                value="1"
                description="Posee serias dificultades para comunicarse."
              />
              <Radio
                value="3"
                description="Los informes generados poseen redacción con reparos."
              />
              <Radio
                value="5"
                description="Los informes escritos están bien redactados salvo algunas faltas de ortografía."
              />
              <Radio
                value="7"
                description="Posee buena redacción y ortografía."
              />
            </RadioGroup>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="flex flex-col items-start">
            <h2 className="text-lg font-semibold text-gray-500">Comunicación oral</h2>
            <p className="text-sm text-default-500">
              (Capacidad para expresarse oralmente)
            </p>
          </CardHeader>
          <CardBody>
            <RadioGroup
              label="Seleccione una opción"
              defaultValue={informe.aspectos_comunicacionales.comunicacion_oral}
              isDisabled
            >
              <Radio
                value="1"
                description="Posee serias dificultades para comunicarse."
              />
              <Radio
                value="3"
                description="Ocasionalmente dirime con buen juicio y criterio."
              />
              <Radio
                value="5"
                description="Generalmente dirime con buen juicio y criterio."
              />
              <Radio
                value="7"
                description="Dirime con buen juicio y criterio."
              />
            </RadioGroup>
          </CardBody>
        </Card>
      </div>
      <Divider />
      <h2 className="text-xl font-bold mb-6 text-gray-700">
        Opinión del empleador con respecto del practicante
      </h2>
      <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
        <Card>
          <CardHeader className="flex flex-col items-start w-full">
            <h2 className="text-lg font-semibold text-gray-500">
              Opinión del empleador con respecto del practicante
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-6 w-full">
              {/* Question 1 */}
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-center p-1">
                  <p className="text-sm text-gray-400">
                    ¿Volvería a contratar al mismo estudiante en la práctica?
                  </p>
                  <RadioGroup
                    orientation="horizontal"
                    defaultValue={
                      informe.preguntas.find((p) => p.id === 1)?.respuesta.toString()
                    }
                    isDisabled
                  >
                    <Radio value="true">Sí</Radio>
                    <Radio value="false">No</Radio>
                  </RadioGroup>
                </div>
                <div>
                  <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>

                  <Textarea
                    id="comment1"
                    placeholder="Añada un comentario (opcional)"
                    value={informe.preguntas.find((p) => p.id === 1)?.comentario}
                    isDisabled
                    className="mt-1"
                    minRows={1}
                    variant="faded"
                  />
                </div>
              </div>
              {/* Question 2 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center ">
                <p className="text-sm text-gray-400">
                  Si existiera la posibilidad ¿Contrataría al estudiante para
                  trabajar en la empresa?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 2)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>

                <Textarea
                  id="comment2"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 2)?.comentario}
                    isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 3 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center ">
                <p className="text-sm text-gray-400">
                  ¿Volvería a contratar otro practicante de la Escuela de
                  Ingeniería Civil Informática de la Universidad de Valparaiso?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 3)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment3"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 3)?.comentario}
                  isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 4 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <p className="text-sm text-gray-400">
                  ¿El practicante posee falencias en los conocimientos que
                  debería tener un profesional recién egresado en ingeniería
                  informática? ¿Cuáles?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 4)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment4"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 4)?.comentario}
                    isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 5 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <p className="text-sm text-gray-400">
                  ¿El practicante generó conflictos dentro de la organización?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 5)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment5"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 5)?.comentario}
                    isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 6 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <p className="text-sm text-gray-400">
                  ¿El practicante fue un aporte dentro de la organización?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 6)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment6"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 6)?.comentario}
                    isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 7 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <p className="text-sm text-gray-400">
                  ¿Le gustaría recibir ofertas de estudiantes en práctica del
                  Escuela de Ingeniería Civil Informática para futuro?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 7)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment7"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 7)?.comentario}
                    isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
              {/* Question 8 */}
              <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                <p className="text-sm text-gray-400">
                  ¿Le gustaría recibir ofertas de titulados del Escuela de
                  Ingeniería Civil Informática para trabajar en su empresa?
                </p>
                <RadioGroup
                  orientation="horizontal"
                  defaultValue={
                    informe.preguntas.find((p) => p.id === 8)?.respuesta.toString()
                  }
                  isDisabled
                >
                  <Radio value="true">Sí</Radio>
                  <Radio value="false">No</Radio>
                </RadioGroup>
              </div>
              <div>
                <h1 className="text-sm font-semibold text-gray-300">Comentario</h1>
                <Textarea
                  id="comment8"
                  placeholder="Añada un comentario (opcional)"
                  value={informe.preguntas.find((p) => p.id === 8)?.comentario}
                  isDisabled
                  className="mt-1"
                  minRows={1}
                  variant="faded"
                />
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      <Divider />
      <div className="max-w-4xl mx-auto px-6 flex flex-col mb-4">
      <h2 className="text-xl font-bold mb-6 text-gray-700">
        Opinión o comentarios del Empleador respecto del practicante (opcional)
      </h2>
      <Textarea
        className="w-full"
        label="Observaciones"
        placeholder="Ingrese observaciones"
        rows={2}
        maxLength={240}
        maxRows={3}
        variant="bordered"
        value={informe.opinion}
        isDisabled
      /></div>
    </div>
  );
};

export default ContentModal;
