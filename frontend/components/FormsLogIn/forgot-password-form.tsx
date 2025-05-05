"use client"
import { useState } from "react"
import {
  Input,
  Button,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react"
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react"
import { useRut } from "react-rut-formatter"
import { backendUrl } from "@/config/config"
import { useRouter } from "next/navigation"

interface ForgotPasswordFormProps {
  onClose: () => void
  userType: string | null
}

export default function ForgotPasswordForm({
  onClose,
  userType,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { rut, updateRut, isValid: isRutValid } = useRut()
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState(false)
  const [canResend, setCanResend] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(0)

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const startResendCooldown = () => {
    setCanResend(false)
    setResendSeconds(120)

    const interval = setInterval(() => {
      setResendSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const requestVerificationCode = async () => {
    setIsLoading(true)

    try {
      const url = userType === "sup"
        ? `${backendUrl}/supervisor/verificarCorreo`
        : `${backendUrl}/usuario/verificarRut`

      const body = userType === "sup"
        ? { correoSupervisor: email }
        : { rut: rut.raw }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!response.ok) throw new Error("Error al enviar código de verificación")

      setSentCode(true)
      startResendCooldown()
    } catch (err) {
      setErrors({
        ...(userType === "sup"
          ? { email: "Error al verificar correo" }
          : { rut: "Error al verificar RUT" }),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = async () => {
    if (step === 1 && validateStep1()) {
      await requestVerificationCode()
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      try {
        setIsLoading(true)

        const url = userType === "sup"
          ? `${backendUrl}/supervisor/verificarCodigo`
          : `${backendUrl}/usuario/verificarCodigo`

        const body = userType === "sup"
          ? { correoSupervisor: email, codigo: verificationCode }
          : { rut: rut.raw, codigo: verificationCode }

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (!response.ok) throw new Error("Código inválido")

        setStep(3)
      } catch (err) {
        setErrors({ code: "Código de verificación inválido o expirado" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSubmit = async () => {
    if (validateStep3()) {
      setIsLoading(true)

      try {
        const url = userType === "sup"
          ? `${backendUrl}/supervisor/reestablecerPassword`
          : `${backendUrl}/usuario/reestablecerPassword`

        const body = userType === "sup"
          ? { correoSupervisor: email, nuevaPassword: newPassword }
          : { rut: rut.raw, nuevaPassword: newPassword }

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })

        if (!response.ok) throw new Error("No se pudo cambiar la contraseña")

        onClose()
        alert("Contraseña reestablecida con éxito")
        router.push("/login")
      } catch (err) {
        setErrors({ newPassword: "Error al reestablecer la contraseña" })
      } finally {
        setIsLoading(false)
      }
    }
  }

  const sendVerificationCode = () => {
    if (step === 1) {
      handleNextStep()
    } else if (step === 2) {
      requestVerificationCode()
    }
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

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">¿No recibiste el código?</p>
              <Button
                color="primary"
                variant="light"
                onPress={sendVerificationCode}
                isLoading={isLoading}
                isDisabled={!canResend}
              >
                {canResend
                  ? "Reenviar Código"
                  : `Reenviar en ${Math.floor(resendSeconds / 60)
                      .toString()
                      .padStart(1, "0")}:${(resendSeconds % 60).toString().padStart(2, "0")}`}
              </Button>
            </div>
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
                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <div className="text-sm">
              <p>La contraseña debe:</p>
              <ul className="list-disc pl-5 mt-1">
                <li className={newPassword.length >= 8 ? "text-green-500" : ""}>Tener al menos 8 caracteres</li>
                <li className={/[A-Z]/.test(newPassword) ? "text-green-500" : ""}>Incluir al menos una letra mayúscula</li>
                <li className={/[0-9]/.test(newPassword) ? "text-green-500" : ""}>Incluir al menos un número</li>
              </ul>
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <div className="w-full flex justify-between">
          {step > 1 ? (
            <Button color="default" variant="light" onPress={() => setStep(step - 1)} startContent={<ArrowLeft size={16} />}>
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
              Cambiar Contraseña
            </Button>
          )}
        </div>
      </ModalFooter>
    </>
  )
}
