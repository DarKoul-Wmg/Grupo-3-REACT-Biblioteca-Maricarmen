import Input from "./ui/input-label-unit";
import Card from "./ui/card";
import Button from "./ui/button";
import { useContext, useState } from "react";
import { logIn } from "../services/api";
import { AuthContext } from "../contexts/authcontext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Llamar a la API para obtener el token
      const token = await logIn(email, password);

      // Usar el contexto para iniciar sesión
      login(token);
    } catch (err) {
      console.error("Login failed:", err.message);
      setError("Credencials invàlides");
    }
  };

  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-6 p-4 bg-blue-100 dark:bg-[#141414]">
      <Card className="w-full max-w-md dark:bg-[#282828]">
        <form
          className="p-6 flex flex-col gap-4 dark:text-white"
          onSubmit={handleLogin}
        >
          <p className="w-full text-center font-bold text-xl dark:text-white text-black">
            Inicia Sessió
          </p>

          <div className="flex flex-col gap-4">
            <Input
              label="Correu electrònic"
              id="login-mail"
              type="email"
              placeholder="usuari@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="dark:bg-[#3c3c3c] dark:text-white dark:placeholder:text-white"
            />
            <Input
              label="Contrasenya"
              id="login-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="dark:bg-[#3c3c3c] dark:text-white dark:placeholder:text-white"
            />
            <div className="flex justify-end">
              <Button type="submit" variant="outline">
                Inicia Sessió
              </Button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center dark:text-red-400">
              {error}
            </p>
          )}
        </form>
      </Card>
    </div>
  );
}
