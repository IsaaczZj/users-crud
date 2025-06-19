import type { User } from "../types/user";
import UserItem from "./UserItem";

type UserListProps = {
  users: User[] | null;
  removeUser: (user: User) => void;
};

export default function UserList({ users, removeUser }: UserListProps) {
  return (
    <div>
      <ul className="flex flex-col gap-2 w-full h-[500px] overflow-y-scroll">
        {users?.map((user) => (
          <UserItem user={user} removeUser={removeUser}/>
        ))}
      </ul>
    </div>
  );
}
