import React, { useContext, useState } from "react";
import Input from "./ui/input-label-unit";
import Button from "./ui/button";
import { AuthContext } from "../contexts/authcontext";
import UserProfile from "./user-profile";
import { updateUserProfile } from "../services/api";

export default function UserForm() {
  const { user, userToken } = useContext(AuthContext);
  const [email, setEmail] = useState(user?.email || "");
  const [telefon, setTelefon] = useState(user?.telefon || "");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updateUserProfile(userToken, email, telefon, avatar);
      setSuccessMessage("Perfil actualitzat correctament.");
    } catch (err) {
      setErrorMessage(err.message || "Error en actualitzar el perfil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex content-evenly gap-1">
      <UserProfile
        firstName={user?.first_name || "Nom"}
        lastName={user?.last_name || "Cognom"}
        school={user?.centre || "IES Exemple"}
        image={user?.imatge || null}
        role={user?.groups || ["usuari"]}
      />
      <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm">
        <div className=" py-2 border-b border-gray-200">
          <h3 className="text-gray-800 font-semibold">
            Edita la informació de l'usuari
          </h3>
        </div>
        <div className="p-2">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nom
                </label>
                <Input
                  type="text"
                  value={user?.first_name || ""}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cognom
                </label>
                <Input
                  type="text"
                  value={user?.last_name || ""}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número de telèfon
                </label>
                <Input
                  type="text"
                  value={telefon}
                  onChange={(e) => setTelefon(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Correu electrònic
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Foto de perfil
                </label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="mt-4 text-right">
              <Button
                type="submit"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              >
                {loading ? "Actualitzant..." : "Enviar"}
              </Button>
            </div>
          </form>
          {successMessage && (
            <p className="text-green-600 text-sm mt-2">{successMessage}</p>
          )}
          {errorMessage && (
            <p className="text-red-600 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}
