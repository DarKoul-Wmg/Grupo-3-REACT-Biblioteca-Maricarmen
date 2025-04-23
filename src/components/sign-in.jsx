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
    try {
      const token = await logIn(username, password); // Llamar a la API para obtener el token
      login(token); // Usar el contexto para iniciar sesión
    } catch (err) {
      setError("Credenciales inválidas");
    }
  };
  return (
    <div className="flex w-full h-full items-center justify-center flex-col gap-6 p-4">
      <Card className="w-full max-w-md">
        <form className="p-6 flex flex-col gap-4" onSubmit={handleLogin}>
          <h1 className="w-full text-center font-bold text-xl">
            Inicia Sessió
          </h1>

          <div className="flex flex-col gap-4">
            <Input
              label="Correu electrònic"
              id="login-mail"
              type="email"
              placeholder="usuari@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contrasenya"
              id="login-password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-end">
              <Button type="submit" className="w-full sm:w-2/4">
                Inicia Sessio
              </Button>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </form>
      </Card>
    </div>
  );
}
