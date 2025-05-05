"use client"
import { useState } from "react"
import { Input, Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRut } from "react-rut-formatter"
import { backendUrl } from "@/config/config"

interface RegisterFormProps {
  onClose: () => void
  userType: string | null
}

export default function RegisterForm({ onClose }: RegisterFormProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { rut, updateRut, isValid: isRutValid } = useRut()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState(false)

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [errors, setErrors] = useState<{
    fullName?: string
    rut?: string
    email?: string
    code?: string
    password?: string
    confirmPassword?: string
  }>({})

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const isInstitutionalEmail = (email: string) => email.endsWith("@alumnos.uv.cl")

  const validateStep1 = () => {
    const newErrors: any = {}
    if (!fullName.trim()) newErrors.fullName = "El nombre completo es requerido"
    if (!isRutValid) newErrors.rut = "RUT inválido"
    if (!isEmailValid(email)) {
      newErrors.email = "Email inválido"
    } else if (!isInstitutionalEmail(email)) {
      newErrors.email = "Debe usar un correo institucional (@alumnos.uv.cl)"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors: any = {}
    if (!verificationCode.trim() || verificationCode.length !== 6) {
      newErrors.code = "Código de verificación inválido"
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors: any = {}
    if (password.length < 8) newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = async () => {
    if (step === 1 && validateStep1()) {
      setIsLoading(true)
      try {
        const res = await fetch(`${backendUrl}/usuario/verificarRut`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rut: rut.raw, correo: email }),
        })
        if (!res.ok) throw new Error("Error al enviar código")
        setSentCode(true)
        setStep(2)
      } catch (err) {
        setErrors({ email: "No se pudo enviar el código. Intenta nuevamente." })
      } finally {
        setIsLoading(false)
      }
    } else if (step === 2 && validateStep2()) {
      setIsLoading(true)
      try {
        const res = await fetch(`${backendUrl}/usuario/verificarCodigo`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ rut: rut.raw, codigo: verificationCode }),
        })
        if (!res.ok) throw new Error("Código inválido")
        setStep(3)
      } catch (err) {
        setErrors({ code: "Código incorrecto o expirado" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (validateStep3()) {
      setIsLoading(true)
      try {
        const res = await fetch(`${backendUrl}/usuario/crear`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre: fullName,
            rut: rut.raw,
            correo: email,
            password,
          }),
        })
        if (!res.ok) throw new Error("Error al crear cuenta")
        onClose()
      } catch (err) {
        setErrors({ password: "Error al registrar. Intenta más tarde." })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword)

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {step === 1 && "Registro de Usuario"}
        {step === 2 && "Verificación de Correo"}
        {step === 3 && "Crear Contraseña"}
      </ModalHeader>
      <ModalBody>
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="Nombre Completo"
              placeholder="Juan Matias Pérez González"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName}
              startContent={<User className="text-blue-200" size={18} />}
            />
            <Input
              label="RUT"
              placeholder="12.345.678-9"
              value={rut.raw}
              onChange={(e) => updateRut(e.target.value)}
              isInvalid={!!errors.rut}
              errorMessage={errors.rut}
              startContent={<User className="text-blue-200" size={18} />}
            />
            <Input
              label="Correo Electrónico"
              placeholder="correo@alumnos.uv.cl"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
              startContent={<Mail className="text-blue-200" size={18} />}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-center">
              Hemos enviado un código de verificación a <strong>{email}</strong>
            </p>
            <Input
              label="Código de Verificación"
              placeholder="Ingrese el código"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              isInvalid={!!errors.code}
              errorMessage={errors.code}
            />
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
              startContent={<Lock className="text-blue-200" size={18} />}
              endContent={
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <Input
              label="Confirmar Contraseña"
              placeholder="Confirme su contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              startContent={<Lock className="text-blue-200" size={18} />}
              endContent={
                <button type="button" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="w-full flex justify-between">
          {step > 1 ? (
            <Button color="default" variant="light" onPress={handlePrevStep} startContent={<ArrowLeft size={16} />}>
              Atrás
            </Button>
          ) : (
            <Button color="danger" variant="light" onPress={onClose}>
              Cancelar
            </Button>
          )}
          {step < 3 ? (
            <Button color="primary" onPress={handleNextStep} isLoading={isLoading} endContent={<ArrowRight size={16} />}>
              Siguiente
            </Button>
          ) : (
            <Button color="success" onPress={handleSubmit} isLoading={isLoading} endContent={<CheckCircle size={16} />}>
              Completar Registro
            </Button>
          )}
        </div>
      </ModalFooter>
    </>
  )
}
