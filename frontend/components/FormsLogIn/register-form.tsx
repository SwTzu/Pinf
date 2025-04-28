"use client"
import { useState } from "react"
import { Input, Button, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react"
import { User, Mail, Lock, Eye, EyeOff, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import { useRut } from "react-rut-formatter"

interface RegisterFormProps {
  onClose: () => void
  userType: string | null
}

export default function RegisterForm({ onClose, userType }: RegisterFormProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { rut, updateRut, isValid: isRutValid } = useRut()

  // Step 1 - Personal Information
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [isStudent, setIsStudent] = useState(false)

  // Step 2 - Email Verification
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState(false)

  // Step 3 - Password Creation
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Validation states
  const [errors, setErrors] = useState<{
    fullName?: string
    rut?: string
    email?: string
    code?: string
    password?: string
    confirmPassword?: string
  }>({})

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isInstitutionalEmail = (email: string) => {
    // Adjust this regex to match your institutional email domains
    return email.endsWith(".uv.cl")
  }

  const validateStep1 = () => {
    const newErrors: any = {}

    if (!fullName.trim()) {
      newErrors.fullName = "El nombre completo es requerido"
    }

    if (!isRutValid) {
      newErrors.rut = "RUT inválido"
    }

    if (!isEmailValid(email)) {
      newErrors.email = "Email inválido"
    }

    if (isStudent && !isInstitutionalEmail(email)) {
      newErrors.email = "Debe usar un correo institucional"
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

    if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    }

    if (password !== confirmPassword) {
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

      // Simulate API call for registration
      setTimeout(() => {
        setIsLoading(false)
        // Here you would call your registration API
        // funcionRegistro(fullName, rut, email, password, userType);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

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
              placeholder="Ingrese su nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              isInvalid={!!errors.fullName}
              errorMessage={errors.fullName}
              startContent={<User className="text-blue-200" size={18} />}
            />

            <Input
              label="RUT"
              placeholder="12.345.678-9"
              value={rut.formatted}
              onChange={(e) => updateRut(e.target.value)}
              isInvalid={!!errors.rut}
              errorMessage={errors.rut}
              startContent={<User className="text-blue-200" size={18} />}
            />

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

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isStudent"
                checked={isStudent}
                onChange={(e) => setIsStudent(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isStudent" className="text-sm">
                Soy estudiante (requiere correo institucional)
              </label>
            </div>
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

            {!sentCode ? (
              <Button color="primary" onPress={sendVerificationCode} isLoading={isLoading}>
                Enviar Código
              </Button>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">¿No recibiste el código?</p>
                <Button color="primary" variant="light" onPress={sendVerificationCode} isLoading={isLoading}>
                  Reenviar Código
                </Button>
              </div>
            )}
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
                <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                  {showPassword ? (
                    <EyeOff size={18} className="text-blue-200" />
                  ) : (
                    <Eye size={18} className="text-blue-200" />
                  )}
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
                <li className={password.length >= 8 ? "text-green-500" : ""}>Tener al menos 8 caracteres</li>
                <li className={/[A-Z]/.test(password) ? "text-green-500" : ""}>Incluir al menos una letra mayúscula</li>
                <li className={/[0-9]/.test(password) ? "text-green-500" : ""}>Incluir al menos un número</li>
              </ul>
            </div>
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
            <Button
              color="primary"
              onPress={handleNextStep}
              isLoading={isLoading}
              endContent={<ArrowRight size={16} />}
            >
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

