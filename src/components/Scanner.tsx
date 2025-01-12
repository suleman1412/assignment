import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Result {
  symbol: string;
  profit: number;
}

function Scanner() {
  const [opportunities, setOpportunities] = useState<Result[]>([]);
  const { isDarkMode, toggleDarkMode } = useTheme();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      const message = event.data;
      const pricesObject: Result = JSON.parse(message);
      setOpportunities((prev) => [...prev, pricesObject]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket Error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className={`min-h-screen p-8 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Live Arbitrage Opportunities</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${
              isDarkMode ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        <div className={`rounded-lg shadow-lg overflow-y-auto h-[500px] ${
          isDarkMode ? "bg-gray-800" : "bg-white"
        }`}>
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
              }`}>
                <th className="px-6 py-4 text-left">Symbol</th>
                <th className="px-6 py-4 text-right">Profit</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    isDarkMode ? "border-gray-700 hover:bg-gray-700" : "border-gray-100 hover:bg-gray-50"
                  }`}
                >
                  <td className="px-6 py-4">{opportunity.symbol}</td>
                  <td className={`px-6 py-4 text-right ${
                    opportunity.profit >= 0 ? "text-green-500" : "text-red-500"
                  }`}>
                    {opportunity.profit.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {opportunities.length === 0 && (
                <tr>
                  <td
                    colSpan={2}
                    className={`px-6 py-8 text-center ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Waiting for arbitrage opportunities...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 text-sm text-right">
          <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>
            Total opportunities: {opportunities.length}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Scanner;