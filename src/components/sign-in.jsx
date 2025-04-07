import Input from "./ui/input-label-unit";
import Card from "./ui/card";
import Button from "./ui/button";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación básica
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
  };

  return (
    <div className="flex w-full p-5 items-center flex-col gap-3">
      <Card className="w-2/4 max-w-[300px]">
        <form className="p-5 flex flex-col gap-3">
          <h1 className="w-full text-center font-bold text-lg">Sign In</h1>

          <div className="flex flex-col gap-3 mx-auto">
            <Input
              label="Email"
              id="login-mail"
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              label="Password"
              id="login-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end">
              <Button className="w-2/4">Sign In</Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
