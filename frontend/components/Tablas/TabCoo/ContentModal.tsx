import React, { useState } from 'react';
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
import { Send } from 'lucide-react';
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
const ContentModal = (informe: Informe) => {
    return (
        <>
        <h2 className="text-2xl font-bold mb-6">Aspecto General</h2>
              <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
                <Card className="flex flex-col gap-4 w-full">
                  <CardHeader className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">Capacidad</h2>
                    <p className="text-sm text-default-500">
                      (Aptitud para comprender y ejecutar las órdenes e
                      iniciativa para actuar y resolver situaciones en forma
                      independiente, así como en forma conjunta a través del
                      trabajo en equipo)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={informe.aspectos_generales.capacidad}
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
                    <h2 className="text-lg font-semibold">Responsabilidad</h2>
                    <p className="text-sm text-default-500">
                      (forma como el estudiante cumple las diversas actividades
                      o tareas que le son encomendadas.)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={responzabilidad}
                      onValueChange={setResponzabilidad}
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
                    <h2 className="text-lg font-semibold">Asistencia</h2>
                    <p className="text-sm text-default-500">
                      (Cumplimiento de horarios y compromisos)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={asistencia}
                      onValueChange={setAsistencia}
                    >
                      <Radio
                        value="1"
                        description="Se ausenta reiteradamente."
                      />
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
                    <h2 className="text-lg font-semibold">Comportamiento</h2>
                    <p className="text-sm text-default-500">
                      (Actitud y grado de aceptación que el estudiante asume
                      frente a diversas instrucciones, hechos y órdenes
                      impartidas por su supervisor)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={comportamiento}
                      onValueChange={setComportamiento}
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
                    <h2 className="text-lg font-semibold">Adaptabilidad</h2>
                    <p className="text-sm text-default-500">
                      (Grado de integración a equipos de trabajo en función de
                      objetivos comunes)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={adaptabilidad}
                      onValueChange={setAdaptabilidad}
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
                <Card className="flex flex-col gap-4 w-full">
                  <CardHeader className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">Iniciativa</h2>
                    <p className="text-sm text-default-500">
                      (Realiza trabajos y propone soluciones alternativas)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={iniciativa}
                      onValueChange={setIniciativa}
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
              <h2 className="text-2xl font-bold mb-6">Aspecto Tecnico</h2>
              <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
                <Card className="flex flex-col gap-4 w-full">
                  <CardHeader className="flex flex-col items-start">
                    <h2 className="text-lg font-semibold">
                      Solución de problemas
                    </h2>
                    <p className="text-sm text-default-500">
                      (creatividad, ejecución de ideas o proyectos)
                    </p>
                  </CardHeader>
                  <CardBody className="flex flex-col gap-4 w-full ">
                    <RadioGroup
                      label="Seleccione una opción"
                      value={solucion}
                      onValueChange={setSolucion}
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
                    <h2 className="text-lg font-semibold">Conocimientos</h2>
                    <p className="text-sm text-default-500">
                      (demuestra conocimientos y habilidades en la realización
                      de las actividades encomendadas)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={conocimientos}
                      onValueChange={setConocimientos}
                    >
                      <Radio
                        value="1"
                        description="Posee conocimientos elementales incompletos."
                      />
                      <Radio
                        value="3"
                        description="Posee conocimientos parciales."
                      />
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
                    <h2 className="text-lg font-semibold">Organización</h2>
                    <p className="text-sm text-default-500">
                      (organiza adecuadamente las actividades que se le
                      encomiendan)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={organizacion}
                      onValueChange={setOrganizacion}
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
                    <h2 className="text-lg font-semibold">
                      Capacidad de decisión
                    </h2>
                    <p className="text-sm text-default-500">
                      (toma decisiones con buen juicio y criterio)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={decision}
                      onValueChange={setDecision}
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
              <h2 className="text-2xl font-bold mb-6">
                Aspectos comunicacionales
              </h2>
              <div className="w-full mx-auto px-6 flex flex-col gap-4 mb-4">
                <Card className="flex flex-col gap-4 w-full">
                  <CardHeader className="flex flex-col items-start w-full">
                    <h2 className="text-lg font-semibold">
                      Comunicación escrita
                    </h2>
                    <p className="text-sm text-default-500">
                      (Capacidad para expresarse por escrito)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={c_escrita}
                      onValueChange={setC_escrita}
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
                    <h2 className="text-lg font-semibold">Comunicación oral</h2>
                    <p className="text-sm text-default-500">
                      (Capacidad para expresarse oralmente)
                    </p>
                  </CardHeader>
                  <CardBody>
                    <RadioGroup
                      label="Seleccione una opción"
                      value={c_oral}
                      onValueChange={setC_oral}
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
              <h2 className="text-2xl font-bold mb-6">
                Opinión del empleador con respecto del practicante
              </h2>
              <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
                <Card>
                  <CardHeader className="flex flex-col items-start w-full">
                    <h2 className="text-lg font-semibold">
                      Opinión del empleador con respecto del practicante
                    </h2>
                  </CardHeader>
                  <CardBody>
                    <div className="space-y-6 w-full">
                      {/* Question 1 */}
                      <div className="space-y-2">
                        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto] gap-4 items-center p-1">
                          <p className="text-sm">
                            ¿Volvería a contratar al mismo estudiante en la
                            práctica?
                          </p>
                          <RadioGroup
                            orientation="horizontal"
                            value={p1?.respuesta}
                            onValueChange={(value) =>
                              setP1({ ...p1, respuesta: value })
                            }
                          >
                            <Radio value="true">Sí</Radio>
                            <Radio value="false">No</Radio>
                          </RadioGroup>
                        </div>
                        <div>
                          <h1 className="text-sm font-semibold">Comentario</h1>

                          <Textarea
                            id="comment1"
                            placeholder="Añada un comentario (opcional)"
                            value={p1?.comentario}
                            onChange={(e) =>
                              setP1({ ...p1, comentario: e.target.value })
                            }
                            className="mt-1"
                            minRows={1}
                            variant="faded"
                          />
                        </div>
                      </div>
                      {/* Question 2 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          Si existiera la posibilidad ¿Contrataría al estudiante
                          para trabajar en la empresa?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p2.respuesta}
                          onValueChange={(value) =>
                            setP2({ ...p2, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>

                        <Textarea
                          id="comment2"
                          placeholder="Añada un comentario (opcional)"
                          value={p2?.comentario}
                          onChange={(e) =>
                            setP2({ ...p2, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 3 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿Volvería a contratar otro practicante de la Escuela
                          de Ingeniería Civil Informática de la Universidad de
                          Valparaiso?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p3.respuesta}
                          onValueChange={(value) =>
                            setP3({ ...p3, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment3"
                          placeholder="Añada un comentario (opcional)"
                          value={p3?.comentario}
                          onChange={(e) =>
                            setP3({ ...p3, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 4 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿El practicante posee falencias en los conocimientos
                          que debería tener un profesional recién egresado en
                          ingeniería informática? ¿Cuáles?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p4.respuesta}
                          onValueChange={(value) =>
                            setP4({ ...p4, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment4"
                          placeholder="Añada un comentario (opcional)"
                          value={p4?.comentario}
                          onChange={(e) =>
                            setP4({ ...p4, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 5 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿El practicante generó conflictos dentro de la
                          organización?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p5.respuesta}
                          onValueChange={(value) =>
                            setP5({ ...p5, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment5"
                          placeholder="Añada un comentario (opcional)"
                          value={p5?.comentario}
                          onChange={(e) =>
                            setP5({ ...p5, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 6 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿El practicante fue un aporte dentro de la
                          organización?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p6.respuesta}
                          onValueChange={(value) =>
                            setP6({ ...p6, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment6"
                          placeholder="Añada un comentario (opcional)"
                          value={p6?.comentario}
                          onChange={(e) =>
                            setP6({ ...p6, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 7 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿Le gustaría recibir ofertas de estudiantes en
                          práctica del Escuela de Ingeniería Civil Informática
                          para futuro?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p7.respuesta}
                          onValueChange={(value) =>
                            setP7({ ...p7, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment7"
                          placeholder="Añada un comentario (opcional)"
                          value={p7?.comentario}
                          onChange={(e) =>
                            setP7({ ...p7, comentario: e.target.value })
                          }
                          className="mt-1"
                          minRows={1}
                          variant="faded"
                        />
                      </div>
                      {/* Question 8 */}
                      <div className="grid grid-cols-[1fr,auto,auto] gap-4 items-center">
                        <p className="text-sm">
                          ¿Le gustaría recibir ofertas de titulados del Escuela
                          de Ingeniería Civil Informática para trabajar en su
                          empresa?
                        </p>
                        <RadioGroup
                          orientation="horizontal"
                          value={p8.respuesta}
                          onValueChange={(value) =>
                            setP8({ ...p8, respuesta: value })
                          }
                        >
                          <Radio value="true">Sí</Radio>
                          <Radio value="false">No</Radio>
                        </RadioGroup>
                      </div>
                      <div>
                        <h1 className="text-sm font-semibold">Comentario</h1>
                        <Textarea
                          id="comment8"
                          placeholder="Añada un comentario (opcional)"
                          value={p8?.comentario}
                          onChange={(e) =>
                            setP8({ ...p8, comentario: e.target.value })
                          }
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
              <h2 className="text-2xl font-bold mb-6">
                Opinión o comentarios del Empleador respecto del practicante
                (opcional)
              </h2>
              <Textarea
                className="w-full"
                label="Observaciones"
                placeholder="Ingrese observaciones"
                rows={2}
                maxLength={240}
                maxRows={3}
                variant="bordered"
                value={opinion}
                onValueChange={setOpinion}
              />
              <div className="max-w-4xl mx-auto px-6 flex flex-col gap-4 mb-4">
                <Button
                  className="font-medium text-small text-default-500"
                  endContent={<Send size={16} className="text-default-500" />}
                  size="sm"
                  variant="flat"
                  color="success"
                  onPress={handleSend}
                >
                  Enviar
                </Button>
              </div>
        </>
    );
};

export default ContentModal;