import { useEffect, useState } from "react";
import Card from "./Card";
import search from "../assets/search.svg";
import { User } from "../utils/types";

const ListView = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("http://localhost:3001/users");
      const data = await res.json();
      setUsers(data);
    };
    getUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    if (
      user.first.toLowerCase().startsWith(input.toLowerCase()) ||
      user.last.toLowerCase().startsWith(input.toLowerCase())
    ) {
      return user;
    }
  });

  return (
    <div className="w-full flex flex-col gap-5">
      <div>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white">
          <img className="h-5 w-5 m-2" src={search} alt="search.svg" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search user by first or last name"
            className="flex-1 outline-none px-2"
          />
        </div>
      </div>
      <div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => {
            return <Card key={user.id} user={user} />;
          })
        ) : (
          <p>No users.</p>
        )}
      </div>
    </div>
  );
};

export default ListView;
