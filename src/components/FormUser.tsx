import type { User } from "../types/user";
import Button from "./Button";
import Input from "./Input";

type FormUserProps = {
  user?: Partial<User>;
  calcelEdit: () => void;
  editUser: (user: Partial<User>) => void;
  saveUser: () => void;
};
export default function FormUser({
  user,
  editUser,
  calcelEdit,
  saveUser,
}: FormUserProps) {
  return (
    <form>
      <Input
        label="Nome"
        value={user?.name ?? ""}
        onChange={({ target }) => editUser({ ...user, name: target.value })}
      />
      <div className="grid grid-cols-2 mt-4 gap-4">
        <Input
          label="Email"
          value={user?.email ?? ""}
          onChange={({ target }) => editUser({ ...user, email: target.value })}
        />
        <Input
          label="Senha"
          type="password"
          value={user?.password ?? ""}
          onChange={({ target }) =>
            editUser({ ...user, password: target.value })
          }
        />
      </div>
      <div className="flex gap-2 mt-4">
        <Button variant="blue" onClick={saveUser}>
          Salvar
        </Button>
        <Button variant="red" onClick={calcelEdit}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
