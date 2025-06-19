import { Edit2, SquarePen, Trash2 } from "lucide-react";
import type { User } from "../types/user";
import Button from "./Button";

type UserItemProps = {
  user: User;
  removeUser: (user: User) => void;
  editUser:(user:Partial<User>) => void
};

export default function UserItem({ user, removeUser,editUser }: UserItemProps) {
  return (
    <li className="bg-zinc-900 flex items-center px-6 py-3 justify-between rounded-xl">
      <div className="flex flex-col">
        <span className="text-xl font-semibold">{user.name}</span>
        <span className="text-zinc-500">{user.email}</span>
      </div>
      <div className="flex gap-2">
        <Button variant="blue" onClick={() => editUser(user)}>
          <SquarePen />
        </Button>
        <Button variant="red" onClick={() => removeUser(user)}>
          <Trash2 />
        </Button>
      </div>
    </li>
  );
}
