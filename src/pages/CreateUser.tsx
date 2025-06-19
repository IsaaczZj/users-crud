import { use, useEffect, useState } from "react";
import Button from "../components/Button";
import type { User } from "../types/user";
import UserList from "../components/UserList";
import { toast, ToastContainer } from "react-toastify";
import FormUser from "../components/FormUser";
import { v4 as uuid } from "uuid";

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);

  async function removeUser(user: User) {
    const originalUsers = users;
    const newUsers = users?.filter((currentUser) => currentUser.id !== user.id);
    setUsers(newUsers as User[]);

    try {
      const response = await fetch(`http://localhost:3000/users/${user.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao excluir o usuario");
      }
      toast.success(`Usuário ${user.name} foi excluido(a) com sucesso`);
    } catch (error) {
      toast.error("Erro ao excluir o usuario");
      console.log(error);
      setUsers(originalUsers);
    }
  }
  function cancelEdit() {
    setSelectedUser(null);
  }
  async function saveUser() {
    if (
      !selectedUser?.name ||
      !selectedUser?.email ||
      !selectedUser?.password
    ) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }
    try {
      const isUserExist = users?.find((user) => user.id === selectedUser?.id);
      if (isUserExist) {
        const response = await fetch(
          `http://localhost:3000/users/${selectedUser.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedUser),
          }
        );
        if (!response.ok) {
          throw new Error("Erro ao atualizar usuário");
        }
        const updateUser = await response.json();

        const newUsers = users?.map((user) =>
          user.id === selectedUser.id ? updateUser : user
        );
        setUsers(newUsers as User[]);
        toast.success(`Usuário ${updateUser.name} foi atualizado com sucesso`);
      } else {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedUser),
        });
        if (!response.ok) {
          throw new Error("Erro ao criar o usuário");
        }
        const newUser = await response.json();

        setUsers([...(users || []), newUser]);
        toast.success(`Usuário ${newUser.name} foi criado com sucesso`);
      }
      setSelectedUser(null);
    } catch (e) {
      toast.error("Erro ao salvar o usuário");
      console.log(e);
    }
  }
  function selectionUser(userSelect: Partial<User> = {}) {
    setSelectedUser(userSelect);
  }
  function editUser(user: Partial<User>) {
    setSelectedUser(user);
  }

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) throw new Error("Erro em buscar usuários");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);
  if (isLoading) {
    return <p className="text-center">Carregando...</p>;
  }
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center ">
      <div className="lg:w-[1280px] sm:max-w-7xl p-10 h-full">
        <div className="flex w-full justify-between items-center gap-4">
          <h1 className="text-3xl font-semibold ">Cadastro de Usuários</h1>
          <Button variant="green" onClick={() => selectionUser({ id: uuid() })}>
            Novo usuário
          </Button>
        </div>
        <div>
          {selectedUser ? (
            <FormUser
              user={selectedUser}
              editUser={setSelectedUser}
              calcelEdit={cancelEdit}
              saveUser={saveUser}
            />
          ) : (
            <UserList
              users={users}
              removeUser={removeUser}
              editUser={editUser}
            />
          )}
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}
