import { useEffect, useState } from "react";
import Button from "../components/Button";
import type { User } from "../types/user";
import UserList from "../components/UserList";

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    try {
      setIsLoading(true);
      async function getUsers() {
        const response = await fetch("http://localhost:3000/users");
        if (!response.ok) throw new Error("Erro em buscar usuários");
        const data = await response.json();
        setUsers(data);
      }
      getUsers()
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    
  }, []);
  if (isLoading) {
    return <p className="text-center">Carregando...</p>;
  }
  return (
    <div className="h-screen w-screen bg-black flex flex-col items-center justify-center">
      <div className="min-w-5xl p-10 border-2 h-full">
        <div className="flex w-full justify-between items-center mb-10">
          <h1 className="text-3xl font-semibold">Cadastro de Usuários</h1>
          <Button variant="green">Novo usuário</Button>
        </div>
        <div>
          <UserList users={users}/>
        </div>
      </div>
    </div>
  );
}
