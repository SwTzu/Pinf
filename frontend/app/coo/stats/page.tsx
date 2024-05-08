'use client';
import React, { useState, useEffect } from 'react';
import { Button, Image } from '@nextui-org/react';
import NextLink from 'next/link';
import styles from '../../../styles/styleop.module.css';
import { useRouter } from 'next/navigation';
import Chart_map from "../../../components/Stats/Map/chart_map"
export default function StatsCoo() {
  const Token =typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const data = [
    {"name": "Arica y Parinacota", "value": 3352489},
    {"name": "Tarapacá", "value": 5424449},
    {"name": "Antofagasta", "value": 673623},
    {"name": "Atacama", "value": 5893105},
    {"name": "Coquimbo", "value": 490041},
    {"name": "Valparaíso", "value": 5232773},
    {"name": "Metropolitana de Santiago", "value": 6708297},
    {"name": "Libertador General Bernardo O'Higgins", "value": 5411875},
    {"name": "Maule", "value": 6170192},
    {"name": "Ñuble", "value": 3093716},
    {"name": "Biobío", "value": 3118717},
    {"name": "La Araucanía", "value": 627662},
    {"name": "Los Ríos", "value": 1626937},
    {"name": "Los Lagos", "value": 5126276},
    {"name": "Aysén del General Carlos Ibáñez del Campo", "value": 7671294},
    {"name": "Magallanes y de la Antártica Chilena", "value": 5264518}
  ];
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
              <Chart_map/>
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
