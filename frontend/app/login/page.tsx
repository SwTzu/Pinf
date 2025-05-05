"use client";
import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, LogIn, ArrowLeftToLine, Mail, UserPlus, KeyRound } from 'lucide-react';
import { Input, Button, Spinner, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { useRut } from "react-rut-formatter";
import { useRouter } from "next/navigation";
import { funcionlogin, funcionloginSup } from "../../api/standar";
import RegisterForm from "@/components/FormsLogIn/register-form";
import ForgotPasswordForm from "@/components/FormsLogIn/forgot-password-form";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { rut, updateRut, isValid } = useRut();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const router = useRouter();
  
  // Modal states
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

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
    setIsLoading(true);
    if (userType === "sup") {
      funcionloginSup(email, password, userType, isValid, setIsLoading, router);
    } else {
      funcionlogin(rut, password, userType, isValid, setIsLoading, router);
    }
  };

  const openRegisterModal = () => {
    setIsRegisterOpen(true);
  };

  const openForgotPasswordModal = () => {
    setIsForgotPasswordOpen(true);
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
        <ArrowLeftToLine size={24} onClick={() => router.back()} className="absolute top-4 left-4 cursor-pointer hover:text-blue-500 transition-colors duration-300"/>
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

        <Button
          onPress={() => handleSubmit(new Event('submit'))}
          type="submit"
          color="secondary"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? (
            <Spinner color="white" />
          ) : (
            <>
              <LogIn size={18} />
              Iniciar Sesión
            </>
          )}
        </Button>

        <div className="text-center flex flex-col gap-1">
          <a 
            href="#" 
            className="text-sm text-black hover:text-blue-500 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              openForgotPasswordModal();
            }}
          >
            ¿Olvidaste tu contraseña?
          </a>
            {userType === "est" && (
            <a 
              href="#" 
              className="text-sm text-black hover:text-blue-500 transition-colors duration-300"
              onClick={(e) => {
              e.preventDefault();
              openRegisterModal();
              }}
            >
              Registrarse
            </a>
            )}
        </div>
      </form>

      {/* Modal para Registro */}
      <Modal 
        isOpen={isRegisterOpen} 
        onOpenChange={setIsRegisterOpen}
        size="2xl"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <RegisterForm onClose={onClose} userType={userType} />
          )}
        </ModalContent>
      </Modal>

      {/* Modal para Recuperar Contraseña */}
      <Modal 
        isOpen={isForgotPasswordOpen} 
        onOpenChange={setIsForgotPasswordOpen}
        size="lg"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <ForgotPasswordForm onClose={onClose} userType={userType} />
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
