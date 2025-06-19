import type { User } from "../types/user";
import UserItem from "./UserItem";
import Button from "./Button";

type UserListProps = {
  users: User[] | null;
  removeUser: (user: User) => void;
  editUser: (user: Partial<User>) => void;
};

export default function UserList({
  users,
  removeUser,
  editUser,
}: UserListProps) {
  return (
    <div>
      <header className="mb-5">
        <span className="text-2xl font-mono ">
          {users && users.length < 2
            ? `${users?.length} usuário encontrado`
            : `${users?.length} usuários encontrados`}
        </span>
      </header>
      <ul className="flex flex-col gap-2 w-full h-[500px] overflow-y-scroll">
        {users?.map((user) => (
          <UserItem
            key={user.id}
            user={user}
            removeUser={removeUser}
            editUser={editUser}
          />
        ))}
      </ul>
    </div>
  );
}
