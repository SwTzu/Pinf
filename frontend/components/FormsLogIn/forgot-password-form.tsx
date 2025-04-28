"use client"
import { useState } from "react"
import { Input, Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRut } from "react-rut-formatter"

interface ForgotPasswordFormProps {
  onClose: () => void
  userType: string | null
}

export default function ForgotPasswordForm({ onClose, userType }: ForgotPasswordFormProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { rut, updateRut, isValid: isRutValid } = useRut()

  // Step 1 - Email Input
  const [email, setEmail] = useState("")

  // Step 2 - Verification Code
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState(false)

  // Step 3 - New Password
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation states
  const [errors, setErrors] = useState<{
    email?: string
    rut?: string
    code?: string
    newPassword?: string
    confirmPassword?: string
  }>({})

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateStep1 = () => {
    const newErrors: any = {}

    if (userType === "sup") {
      if (!isEmailValid(email)) {
        newErrors.email = "Email inválido"
      }
    } else {
      if (!isRutValid) {
        newErrors.rut = "RUT inválido"
      }
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

    if (newPassword.length < 8) {
      newErrors.newPassword = "La contraseña debe tener al menos 8 caracteres"
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      // Simulate sending verification code
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setSentCode(true)
        setStep(2)
      }, 1500)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = () => {
    if (validateStep3()) {
      setIsLoading(true)

      // Simulate API call for password reset
      setTimeout(() => {
        setIsLoading(false)
        // Here you would call your password reset API
        // funcionResetPassword(userType === "sup" ? email : rut.formatted, newPassword);
        onClose()
      }, 2000)
    }
  }

  const sendVerificationCode = () => {
    setIsLoading(true)

    // Simulate sending verification code
    setTimeout(() => {
      setIsLoading(false)
      setSentCode(true)
    }, 1500)
  }

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <>
      <ModalHeader className="flex flex-col gap-1">
        {step === 1 && "Recuperar Contraseña"}
        {step === 2 && "Verificación de Código"}
        {step === 3 && "Nueva Contraseña"}
      </ModalHeader>
      <ModalBody>
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-center">
              Ingresa tu {userType === "sup" ? "correo electrónico" : "RUT"} para recuperar tu contraseña
            </p>

            {userType === "sup" ? (
              <Input
                label="Correo Electrónico"
                placeholder="correo@ejemplo.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isInvalid={!!errors.email}
                errorMessage={errors.email}
                startContent={<Mail className="text-blue-200" size={18} />}
              />
            ) : (
              <Input
                label="RUT"
                placeholder="12.345.678-9"
                value={rut.formatted}
                onChange={(e) => updateRut(e.target.value)}
                isInvalid={!!errors.rut}
                errorMessage={errors.rut}
              />
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <p className="text-center">
              Hemos enviado un código de verificación a
              <strong> {userType === "sup" ? email : "tu correo registrado"}</strong>
            </p>

            <Input
              label="Código de Verificación"
              placeholder="Ingrese el código"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              isInvalid={!!errors.code}
              errorMessage={errors.code}
            />

            {!sentCode ? (
              <Button color="primary" onClick={sendVerificationCode} isLoading={isLoading}>
                Enviar Código
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">¿No recibiste el código?</p>
                <Button color="primary" variant="light" onClick={sendVerificationCode} isLoading={isLoading}>
                  Reenviar Código
                </Button>
              </div>
            )}
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input
              label="Nueva Contraseña"
              placeholder="Ingrese su nueva contraseña"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              isInvalid={!!errors.newPassword}
              errorMessage={errors.newPassword}
              startContent={<Lock className="text-blue-200" size={18} />}
              endContent={
                <button type="button" onClick={toggleNewPasswordVisibility} className="focus:outline-none">
                  {showNewPassword ? (
                    <EyeOff size={18} className="text-blue-200" />
                  ) : (
                    <Eye size={18} className="text-blue-200" />
                  )}
                </button>
              }
            />

            <Input
              label="Confirmar Contraseña"
              placeholder="Confirme su nueva contraseña"
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
              startContent={<Lock className="text-blue-200" size={18} />}
              endContent={
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="focus:outline-none">
                  {showConfirmPassword ? (
                    <EyeOff size={18} className="text-blue-200" />
                  ) : (
                    <Eye size={18} className="text-blue-200" />
                  )}
                </button>
              }
            />

            <div className="text-sm">
              <p>La contraseña debe:</p>
              <ul className="list-disc pl-5 mt-1">
                <li className={newPassword.length >= 8 ? "text-green-500" : ""}>Tener al menos 8 caracteres</li>
                <li className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>
                  Incluir al menos una letra mayúscula
                </li>
                <li className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>Incluir al menos un número</li>
              </ul>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="w-full flex justify-between">
          {step > 1 ? (
            <Button color="default" variant="light" onClick={handlePrevStep} startContent={<ArrowLeft size={16} />}>
              Atrás
            </Button>
          ) : (
            <Button color="danger" variant="light" onClick={onClose}>
              Cancelar
            </Button>
          )}

          {step < 3 ? (
            <Button
              color="primary"
              onClick={handleNextStep}
              isLoading={isLoading}
              endContent={<ArrowRight size={16} />}
            >
              Siguiente
            </Button>
          ) : (
            <Button color="success" onClick={handleSubmit} isLoading={isLoading} endContent={<CheckCircle size={16} />}>
              Cambiar Contraseña
            </Button>
          )}
        </div>
      </ModalFooter>
    </>
  )
}

