import React, { useEffect, useState, useContext } from "react";
import { getLoanHistory } from "../services/api";
import { AuthContext } from "../contexts/authcontext";

export default function LoanHistoryTable() {
    const { userToken: token } = useContext(AuthContext);
    const [loanHistory, setLoanHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchLoanHistory() {
            try {
                const data = await getLoanHistory(token);
                setLoanHistory(data);
            } catch (error) {
                console.error("Error al obtener el historial de préstamos:", error);
            } finally {
                setLoading(false);
            }
        }

        if (token) {
            fetchLoanHistory();
        }
    }, [token]);

    if (!token)
        return (
            <div>
                Inicia sessió un altre cop per veure el teu historial de préstecs.
            </div>
        );
    if (loading) return <div>Carregant historial de préstecs...</div>;
    if (!loanHistory.length) return <div>No hi ha historial de préstecs.</div>;

    return (
        <div className="flex flex-col w-full max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Historial de préstecs
            </h2>
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="overflow-hidden border border-gray-200 rounded-lg shadow">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-blue-500">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">
                                        Exemplar
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">
                                        Estat
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">
                                        Data préstec
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">
                                        Data retorn
                                    </th>
                                    <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase">
                                        Anotacions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                            {[...loanHistory]
                                .sort((a, b) => {
                                    const now = new Date();
                                    const getEstat = (prestec) => {
                                        const dataPrestec = new Date(prestec.data_prestec);
                                        const dataRetorn = new Date(prestec.data_retorn);
                                        if (now >= dataPrestec && now <= dataRetorn) return "En curs";
                                        return "Retornat";
                                    };
                                
                                    const estatA = getEstat(a);
                                    const estatB = getEstat(b);
                                
                                    // "En curs" primero
                                    if (estatA === "En curs" && estatB !== "En curs") return -1;
                                    if (estatA !== "En curs" && estatB === "En curs") return 1;
                                
                                    // Si ambos son "En curs", ordenar por data_retorn ascendente
                                    if (estatA === "En curs" && estatB === "En curs") {
                                        return new Date(a.data_retorn) - new Date(b.data_retorn);
                                    }
                                
                                    // Si ambos son "Retornat", ordenar por data_retorn descendente
                                    if (estatA === "Retornat" && estatB === "Retornat") {
                                        return new Date(b.data_retorn) - new Date(a.data_retorn);
                                    }
                                
                                    return 0;
                                })
                                .map((prestec) => {
                                    // Determina el estado
                                    let estat = "En préstec";
                                    if (prestec.data_retorn !== null) {
                                        const now = new Date();
                                        const dataPrestec = new Date(prestec.data_prestec);
                                        const dataRetorn = new Date(prestec.data_retorn);
                                        if (now >= dataPrestec && now <= dataRetorn) estat = "En curs";
                                        else if (now > dataRetorn) estat = "Retornat";
                                        else estat = "-";
                                    }

                                    // Aplica clase verde si está en curso
                                    const rowClass =
                                        estat === "En curs"
                                            ? "hover:bg-blue-100 bg-green-100 transition-colors"
                                            : "hover:bg-blue-100 transition-colors";

                                    return (
                                        <tr key={prestec.id} className={rowClass}>
                                            <td className="px-4 py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all">
                                                {(() => {
                                                    const match = prestec.exemplar.match(/^(.*?-\s*)(.*)$/);
                                                    if (match) {
                                                        return (
                                                            <>
                                                                {match[1]}
                                                                <strong>{match[2]}</strong>
                                                            </>
                                                        );
                                                    }
                                                    return prestec.exemplar;
                                                })()}
                                            </td>
                                            <td className="px-4 py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all">
                                                {estat}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-left text-gray-800">
                                                {prestec.data_prestec}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-left text-gray-800">
                                                {prestec.data_retorn}
                                            </td>
                                            <td className="px-4 py-4 whitespace-pre-line text-sm text-left text-gray-800 break-all">
                                                {prestec.anotacions}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}