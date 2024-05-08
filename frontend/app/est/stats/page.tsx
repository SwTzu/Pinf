'use client';
import React, { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';
import styles from '../../../styles/styleop.module.css';
import { useRouter } from 'next/navigation';
export default function StatsEst() {
  const router= useRouter();
  const Token =typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const [data_emp, setData_emp] = useState([]);
  return (
    <div className={styles.EstDiv}>
      <div className={styles.boxe10}>
        <NextLink href='https://informatica.uv.cl/' className={styles.boxe13}>
        <Image
            radius="none"
            src="../UV.svg"
            alt="Descripción del SVG"
            width={"100%"}
            height={"50%"}
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
          <Button className={styles.botEst} variant='light'>
            Logout
          </Button>
        </div>
      </div>
      <div className={styles.boxe20}>
        <div className={styles.boxe21}> iconos notificaciones, usuario</div>
        <div className={styles.boxe22}>
          <div className={styles.boxe220}>Panel principal Estudiante</div>
          <div className={styles.boxe221}>
            <div className={styles.boxe2211}>
                
            </div>
            <div className={styles.boxe2210}>
              <div className={styles.boxe22100}>
                
              </div>
              <div className={styles.boxe22101}>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
