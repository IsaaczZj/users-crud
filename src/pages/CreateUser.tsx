import { useEffect, useState } from "react";
import Button from "../components/Button";
import type { User } from "../types/user";
import UserList from "../components/UserList";
import { toast, ToastContainer } from "react-toastify";

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);

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
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="min-w-5xl p-10 h-full">
        <div className="flex w-full justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold">Cadastro de Usuários</h1>
          <Button variant="green">Novo usuário</Button>
        </div>
        <div>
          <UserList users={users} removeUser={removeUser} />
        </div>
      </div>
      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
}
