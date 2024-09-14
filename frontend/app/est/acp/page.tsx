'use client';
import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem, Input, Image } from '@nextui-org/react';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from '../../../styles/styleop.module.css';
import Datosest from '@/components/Tablas/datosest';
import { datosEMP } from '../../../api/est/solicitudes.jsx';
import TodoList from '../../../components/tareas';
export default function Acp() {
  const [datos, setData] = useState({});
  const router = useRouter();
  const Token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const idSolicitud =
    typeof window !== 'undefined' ? localStorage.getItem('idSolicitud') : null;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datos = await datosEMP(idSolicitud);
        setData(datos.empresa);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      }
    };
    fetchData();
  }, [idSolicitud]);
  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href='https://informatica.uv.cl/' className={styles.boxe13}>
          <Image
            radius='none'
            src='../UV.svg'
            alt='Descripción del SVG'
            width={'100%'}
            height={'50%'}
          />
          <Image
            radius='none'
            src='../Logo_Practica_Blanco.svg'
            alt='Descripción del SVG'
            width={'100%'}
            height={'50%'}
          />
        </NextLink>
        <div className={styles.boxe12}>
          <Button
            className={styles.botNextEst}
            variant='light'
            onClick={() => {
              router.back();
            }}
          >
            Mis Solicitud
          </Button>
          <Button className={styles.botEst} variant='light'>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.boxe20}>
        <div className={styles.boxe21}> iconos notificaciones, usuario</div>
        <div className={styles.boxe22Soli}>
          <div className={styles.boxe220soli}>
            <div className={styles.boxe2201soli}>
              <div className={styles.boxe22010soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-rs'
                      placeholder={datos.razonSocial}
                      radius='sm'
                      size='lg'
                      label='Razon social'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-dir'
                      placeholder={datos.direccion}
                      radius='sm'
                      size='lg'
                      label='Direccion'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-ciud'
                      placeholder={datos.ciudad}
                      radius='sm'
                      size='lg'
                      label='Ciudad'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                </div>
              </div>
              <div className={styles.boxe22011soli}>
                <div className={styles.boxe220110soli}>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-rut'
                      placeholder={datos.rutEmpresa}
                      radius='sm'
                      size='lg'
                      label='Rut'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-region'
                      placeholder={datos.region}
                      radius='sm'
                      size='lg'
                      label='Region'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                  <div className={styles.boxe2201100soli}>
                    <Input
                      id='input-rub'
                      placeholder={datos.rubro}
                      radius='sm'
                      size='lg'
                      label='Rubro'
                      labelPlacement='outside'
                      classNames={{
                        inputWrapper: ['bg-default-200/50', '!cursor-text'],
                        label: ['!text-white'],
                      }}
                      isDisabled
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.boxe2200soli}>
              <div className={styles.boxe22000acp}>
                <Input id="Fecha_inicio" radius="sm"
                      size="lg"
                      label="Fecha inicio"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text","w-1/2"],
                        label: ["!text-white"],
                      }}/>
                <Input id="Fecha_termino" radius="sm"
                      size="lg"
                      label="Fecha termino"
                      labelPlacement="outside"
                      classNames={{
                        inputWrapper: ["bg-default-200/50", "!cursor-text","w-1/2"],
                        label: ["!text-white"],
                      }}/>
              </div>
            </div>
            <div className={styles.boxe22001acp}>
              <p>Tareas de practica</p>
              <TodoList />
            </div>
          </div>
          <div className={styles.boxe221soli}>
            <div className={styles.boxe2210soli}>
              <Datosest token={Token} />
            </div>
            <div className={styles.boxe2210soli}>
              Datos supervisor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}