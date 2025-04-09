import Input from "./ui/input-label-unit";
import Card from "./ui/card";
import Button from "./ui/button";
import { useContext, useState } from "react";
import { logIn } from "../services/api";
import { getUserInfo } from "../services/api";
import { AuthContext } from "../contexts/authcontext";
export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, setUserToken } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Handle login");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const token = await logIn(email, password);

      const userInfo = await getUserInfo(token);
      setUserToken(token);
      console.log("Obtained user info: ", userInfo["user-details"]);

      login(userInfo["user-details"]);

      setError(null);
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="flex w-full p-5 items-center flex-col gap-3">
      <Card className="w-2/4 max-w-[300px]">
        <form className="p-5 flex flex-col gap-3" onSubmit={handleLogin}>
          <h1 className="w-full text-center font-bold text-lg">Sign In</h1>

          <div className="flex flex-col gap-3 mx-auto">
            <Input
              label="Email"
              id="login-mail"
              type="email"
              placeholder="user@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              id="login-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <Button type="submit" className="w-2/4">
                Sign In
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </Card>
    </div>
  );
}
