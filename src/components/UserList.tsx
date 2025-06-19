import type { User } from "../types/user";
import UserItem from "./UserItem";

type UserListProps = {
  users: User[] | null;
  removeUser: (user: User) => void;
  editUser:(user:Partial<User>) => void
};

export default function UserList({ users, removeUser,editUser }: UserListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-2 w-full h-[500px] overflow-y-scroll">
        {users?.map((user) => (
          <UserItem key={user.id} user={user} removeUser={removeUser} editUser={editUser}/>
        ))}
      </ul>
    </div>
  );
}
