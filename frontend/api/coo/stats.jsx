"use client";
import { backendUrl } from "../../config/config";
export const obtenerEstadisticasFasesSolicitudes = async () => {
    const response = await fetch(`${backendUrl}/stats/estadisticasFasesSolicitudes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error("Error al actualizar datos del usuario");
        }
        }
export const obtenerStatsAreas = async () => {
    const response = await fetch(`${backendUrl}/stats/areasPracticas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
        if (response.ok) {
            const data = await response.json();
            console.log('areas',data);
            return data;
        } else {
            throw new Error("Error al actualizar datos del usuario");
        }
        }
