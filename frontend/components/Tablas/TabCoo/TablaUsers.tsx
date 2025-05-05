import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Spinner,
  Tooltip,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  RadioGroup,
  Radio,
  Divider,
} from "@nextui-org/react";
import toast, { Toaster } from "react-hot-toast";
import {
  UserX,
  UserPen,
  EllipsisVertical,
  Search,
  Send,
  CircleX,
  Plus,
} from "lucide-react";
import { useRut } from "react-rut-formatter";
import { backendUrl } from "@/config/config";
import {
  crearUsuarioAdm,
  editarUsuarioAdm,
  eliminarUsuarioAdm,
} from "@/api/coo/solicitudes";
import { Usuario } from "@/types/interfaces";
export default function TablaUsers({ token }: { token: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState(""); // Valor de búsqueda
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const { rut, updateRut, isValid } = useRut();
  const [userSelected, setUserSelected] = useState<Usuario>({
    rut: "",
    tipoUsuario: 0,
    nombre1: "",
    nombre2: "",
    apellido1: "",
    apellido2: "",
    telefono: "",
    correo: "",
    direccion: "",
  });
  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const [newUser, setNewUser] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const loadUsuarios = useCallback(async () => {
    try {
      let res = await fetch(`${backendUrl}/coordinador/obtener`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });
      let json = await res.json();
      setUsuarios(json.coordinadores); // Ajusta al objeto de respuesta correcto
      setIsLoading(false);
    } catch (error) {
      console.error("Error al cargar los usuarios", error);
      setIsLoading(false);
    }
  }, [token]);
  const handleEdit = async (user: Usuario) => {
    setUserSelected(user);
    setNewUser(false);
    onOpen();
  };
  const handleDelete = async (user: Usuario) => {
    try {
      let res = await eliminarUsuarioAdm(token, user.rut);
      if (res.ok) loadUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario", error);
    }
  };
  // Cargar y actualizar la tabla automáticamente
  useEffect(() => {
    loadUsuarios();
    const intervalId = setInterval(loadUsuarios, 10000); // Actualiza cada 10 segundos
    return () => clearInterval(intervalId);
  }, [loadUsuarios]);

  // Filtrado de usuarios
  const filteredUsuarios = useMemo(() => {
    return usuarios.filter(
      (user) =>
        user.rut.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.nombre1.toLowerCase().includes(filterValue.toLowerCase()) ||
        user.apellido1.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [usuarios, filterValue]);
  const renderActions = (user: Usuario) => (
    <div className="relative flex justify-center items-center">
      <Dropdown>
        <DropdownTrigger>
          <Button isIconOnly size="lg" variant="light">
            <EllipsisVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem
            key="edit"
            startContent={<UserPen />}
            color="warning"
            onPress={() => handleEdit(user)}
          >
            Editar
          </DropdownItem>
          <DropdownItem
            key="delete"
            startContent={<UserX />}
            color="danger"
            onPress={() => handleDelete(user)}
          >
            Eliminar
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
  return (
    <>
      <Drawer
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "data-[placement=right]:sm:m-2 data-[placement=left]:sm:m-2  rounded-medium",
        }}
        isOpen={isOpen}
        onOpenChange={() => {
          onOpenChange();
          setUserSelected({
            rut: "",
            tipoUsuario: 0,
            nombre1: "",
            nombre2: "",
            apellido1: "",
            apellido2: "",
            telefono: "",
            correo: "",
            direccion: "",
          });
          updateRut("");
        }}
        size="2xl"
      >
        <DrawerContent>
          {(onClose) => (
            <>
              <Toaster />
              <DrawerHeader className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 p-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
                <Tooltip content="Close">
                  <Button
                    isIconOnly
                    className="text-black-500"
                    size="sm"
                    variant="light"
                    onPress={onClose}
                  >
                    <svg
                      fill="none"
                      height="20"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                    </svg>
                  </Button>
                </Tooltip>
                <div className="w-full flex justify-between items-center gap-2">
                  <h1 className="text-lg font-bold text-black-500">
                    {newUser
                      ? "Crear nuevo usuario administrativo"
                      : "Editar usuario"}
                  </h1>
                  <Button
                    className="font-medium text-small text-black-500 z-51"
                    size="sm"
                    startContent={<CircleX color="red" />}
                    variant="flat"
                    color="danger"
                    onPress={() => {
                      setUserSelected({
                        rut: "",
                        tipoUsuario: 0,
                        nombre1: "",
                        nombre2: "",
                        apellido1: "",
                        apellido2: "",
                        telefono: "",
                        correo: "",
                        direccion: "",
                      });
                      onClose();
                    }}
                  >
                    Cerrar
                  </Button>
                </div>
              </DrawerHeader>
              <DrawerBody className="pt-16">
                <div className="flex flex-col gap-2 py-4 ">
                  <div className="flex flex-col gap-4">
                    <Input
                      size="md"
                      label="Rut"
                      placeholder="Ingrese Rut"
                      id="rut"
                      type="text"
                      value={newUser ? rut.formatted : userSelected.rut}
                      onChange={(e) => {
                        if (newUser) {
                          updateRut(e.target.value);
                        } else {
                          setUserSelected({
                            ...userSelected,
                            rut: e.target.value,
                          });
                        }
                      }}
                      isRequired={newUser}
                      maxLength={12}
                      variant="bordered"
                      isDisabled={!newUser}
                      isInvalid={newUser ? !isValid : false}
                    />
                    <Input
                      label="Primer Nombre"
                      placeholder="Ingrese Primer Nombre"
                      value={userSelected.nombre1}
                      isRequired={newUser}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          nombre1: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                    />
                    <Input
                      label="Segundo Nombre"
                      placeholder="Ingrese Segundo Nombre"
                      value={userSelected.nombre2}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          nombre2: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                    />
                    <Input
                      label="Primer Apellido"
                      placeholder="Ingrese Primer Apellido"
                      value={userSelected.apellido1}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          apellido1: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                      isRequired={true}
                    />
                    <Input
                      label="Segundo Apellido"
                      placeholder="Ingrese Segundo Apellido"
                      value={userSelected.apellido2}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          apellido2: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                    />
                    <Input
                      label="Correo"
                      placeholder="Ingrese Correo"
                      value={userSelected.correo}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          correo: e.target.value,
                        })
                      }
                      variant="bordered"
                      isRequired={true}
                      size="md"
                      maxLength={45}
                      isInvalid={!isEmailValid(userSelected.correo)}
                    />
                    <Input
                      label="Teléfono"
                      placeholder="Ingrese numero de Teléfono/Celular"
                      value={userSelected.telefono}
                      isRequired={true}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          telefono: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                      maxLength={10}
                    />
                    <Input
                      label="Dirección"
                      placeholder="Ingrese Dirección"
                      value={userSelected.direccion}
                      onChange={(e) =>
                        setUserSelected({
                          ...userSelected,
                          direccion: e.target.value,
                        })
                      }
                      variant="bordered"
                      size="md"
                    />
                    <Divider />
                    <RadioGroup
                      label="Seleccione el tipo de usuario"
                      value={userSelected.tipoUsuario.toString()}
                      classNames={{
                        label: "text-black-500",
                      }}
                      size="lg"
                      onValueChange={(value) =>
                        setUserSelected({
                          ...userSelected,
                          tipoUsuario: parseInt(value),
                        })
                      }
                    >
                      <Radio
                        value="2"
                        classNames={{
                          label: "text-default-500",
                        }}
                        size="md"
                      >
                        Coordinador
                      </Radio>
                      <Radio
                        value="3"
                        classNames={{
                          label: "text-default-500",
                        }}
                        size="md"
                      >
                        Administrador
                      </Radio>
                      <Radio
                        value="4"
                        classNames={{
                          label: "text-default-500",
                        }}
                        size="md"
                      >
                        Jefe de Carrera
                      </Radio>
                    </RadioGroup>
                  </div>
                </div>
              </DrawerBody>
              <DrawerFooter className="flex flex-col gap-1">
                <Button
                  className="font-medium text-small text-black-500 z-51"
                  size="sm"
                  startContent={<Send />}
                  variant="flat"
                  color="success"
                  onPress={() => {
                    if (newUser) {
                      if (
                        !isValid ||
                        !userSelected.nombre1 ||
                        !userSelected.correo ||
                        !isEmailValid(userSelected.correo) ||
                        !userSelected.telefono
                      ) {
                        toast.error(
                          "Por favor complete todos los campos requeridos"
                        );
                        return;
                      } else {
                        const data = {
                          rut: rut.raw,
                          tipoUsuario: userSelected.tipoUsuario,
                          nombre1: userSelected.nombre1,
                          nombre2: userSelected.nombre2,
                          apellido1: userSelected.apellido1,
                          apellido2: userSelected.apellido2,
                          telefono: userSelected.telefono,
                          correo: userSelected.correo,
                          direccion: userSelected.direccion,
                        };
                        crearUsuarioAdm(token, data).then((res) => {
                          if (res.ok) {
                            toast.success("Usuario creado correctamente");
                            loadUsuarios();
                            onClose();
                          } else {
                            toast.error("Error al crear el usuario");
                          }
                        });
                      }
                    } else {
                      toast.success("seleccionado");
                      editarUsuarioAdm(token, userSelected).then((res) => {
                        if (res.ok) {
                          toast.success("Usuario editado correctamente", {
                            position: "top-right",
                          });
                          loadUsuarios();
                          onClose();
                        }
                      });
                    }
                  }}
                >
                  {newUser ? "Crear Usuario" : "Editar Usuario"}
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
      <div className="flex justify-between items-center mb-4 p-2 gap-4">
        <Input
          placeholder="Buscar por RUT, Nombre o Apellido..."
          startContent={<Search />}
          value={filterValue}
          onValueChange={setFilterValue}
          variant="bordered"
        />
        <Button
          color="secondary"
          size="md"
          startContent={<Plus size={20} color="white" />}
          onPress={() => {
            setNewUser(true);
            onOpen();
          }}
          className="absolute top-0 right-0 m-[2rem]"
        >
          Agregar Usuario
        </Button>
      </div>
      <Table
        aria-label="Tabla de usuarios"
        classNames={{
          table: "min-h-[200px] max-h-[93.5vh]",
          th: "bg-[#656565] text-white font-bold text-md",
        }}
        shadow="none"
        isStriped
      >
        <TableHeader>
          <TableColumn key="rut" style={{ textAlign: "center" }}>
            RUT
          </TableColumn>
          <TableColumn key="nombre" style={{ textAlign: "center" }}>
            NOMBRE
          </TableColumn>
          <TableColumn key="apellido" style={{ textAlign: "center" }}>
            APELLIDO
          </TableColumn>
          <TableColumn key="correo" style={{ textAlign: "center" }}>
            CORREO
          </TableColumn>
          <TableColumn key="telefono" style={{ textAlign: "center" }}>
            TELÉFONO
          </TableColumn>
          <TableColumn key="direccion" style={{ textAlign: "center" }}>
            DIRECCIÓN
          </TableColumn>
          <TableColumn key="actions" style={{ textAlign: "center" }}>
            ACCIONES
          </TableColumn>
        </TableHeader>
        <TableBody
          items={filteredUsuarios}
          isLoading={isLoading}
          loadingContent={<Spinner label="Cargando usuarios..." />}
          emptyContent={
            <div className="text-center p-4">
              <p className="text-gray-500 font-bold">
                No hay usuarios disponibles para mostrar.
              </p>
            </div>
          }
        >
          {(user) => (
            <TableRow key={user.rut}>
              <TableCell style={{ textAlign: "center" }}>{user.rut}</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {user.nombre1} {user.nombre2}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {user.apellido1} {user.apellido2}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {user.correo}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {user.telefono}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {user.direccion}
              </TableCell>
              <TableCell style={{ textAlign: "center" }}>
                {renderActions(user)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
