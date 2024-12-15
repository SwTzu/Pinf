"use client";
import React from "react";
import { Card,} from "@nextui-org/react";
import styles from "@/styles/est.module.css";
import TablaAcp from "@/components/Tablas/ACP/TablaAcp";
import TablaSuppAcp from "@/components/Tablas/ACP/TablaSuppACP";
interface CardACPProps {
  userType: string;
}
const CardACP: React.FC<CardACPProps> = ({ userType }) => {
    const Token =
        typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";
  return (
    <Card className="mb-6 mt-[1rem]">
        <h1 className="text-3xl font-bold text-gray-800 pt-[2rem] pl-[2rem]">
          Cartas de aceptacion
        </h1>
        <h2 className="text-1xl text-gray-400 pl-[2rem]">
          Vista general para cartas de aceptacion
        </h2>
        
          {userType === "sup" ? <TablaSuppAcp token={Token} /> : <TablaAcp token={Token} />}
        
      </Card>
  );
};
export default CardACP;