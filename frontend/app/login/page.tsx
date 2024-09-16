"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, LogIn } from "lucide-react";
import { Input, Button } from "@nextui-org/react";
import { useRut } from "react-rut-formatter";
import { useRouter } from "next/navigation"; // Importa el router de Next.js
import { funcionlogin, funcionloginSup } from "../../api/standar";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { rut, updateRut, isValid } = useRut();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<string | null>(null); // Estado local para userType
  const router = useRouter();

  // useEffect para sincronizar userType con localStorage solo en el cliente
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType);
    }
  }, []);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (userType === "sup") {
      funcionloginSup(email, password, userType, isValid, setIsLoading, router);
    } else {
      funcionlogin(rut, password, userType, isValid, setIsLoading, router);
    }
  };

  if (!userType) {
    return null; // Evitar renderizar hasta que el userType esté definido
  }

  return (
    <div className="max-w-md">
      <form
        onSubmit={handleSubmit}
        className="text-center backdrop-blur-md bg-white bg-opacity-70 rounded-xl shadow-2xl p-8 space-y-6 transition-all duration-500 ease-in-out w-[500px]"
        onKeyDown={handleKeyDown}
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2">Bienvenido</h1>
          <p className="text-black">Inicia sesión en tu cuenta</p>
        </div>

        <div className="space-y-4 text-white">
          {userType === "sup" ? (
            <Input
              size="lg"
              className="dark"
              id="email"
              type="email"
              placeholder="Email"
              variant="flat"
              isInvalid={!isEmailValid(email)}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              startContent={<User className="text-blue-200" size={20} />}
            />
          ) : (
            <Input
              size="lg"
              className="dark"
              id="rut"
              type="text"
              placeholder="RUT"
              value={rut.formatted}
              onChange={(e) => updateRut(e.target.value)}
              disableAnimation={true}
              startContent={<User className="text-blue-200" size={20} />}
            />
          )}
          <Input
            size="lg"
            className="dark"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endContent={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={18} className="text-blue-200" /> : <Eye size={18} className="text-blue-200" />}
              </button>
            }
            startContent={<Lock className="text-blue-200" size={20} />}
          />
        </div>

        <Button onClick={handleSubmit} type="submit" color="secondary" size="lg">
          <LogIn size={18} />
          Iniciar Sesión
        </Button>

        <div className="text-center flex flex-col gap-1">
          <a href="#" className="text-sm text-black hover:text-blue-100 transition-colors duration-300">
            ¿Olvidaste tu contraseña?
          </a>
          <a href="#" className="text-sm text-black hover:text-blue-100 transition-colors duration-300">
            Registrarse
          </a>
        </div>
      </form>
    </div>
  );
}
