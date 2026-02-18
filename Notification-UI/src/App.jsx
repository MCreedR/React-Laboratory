import React, { useEffect, useState } from "react";

function App() {
  const [logs, setLogs] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ templateId: "", recipient: "" });

  const fetchLogs = () => {
    fetch("https://localhost:7226/api/notifications/logs")
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error("Eroare loguri:", err));
  };

  const fetchTemplates = () => {
    fetch("https://localhost:7226/api/templates")
      .then((res) => res.json())
      .then((data) => setTemplates(data));
  };

  useEffect(() => {
    fetchLogs();
    fetchTemplates();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://localhost:7226/api/notifications/send",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: parseInt(formData.templateId),
          recipient: formData.recipient,
        }),
      },
    );

    if (response.ok) {
      setIsModalOpen(false);
      setFormData({ templateId: "", recipient: "" });
      fetchLogs(); // Reîncărcăm tabelul automat!
    } else {
      alert("Eroare la trimitere!");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this log?")) {
      try {
        const response = await fetch(
          `https://localhost:7226/api/notifications/logs/${id}`,
          {
            method: "DELETE",
          },
        );

        if (response.ok) {
          fetchLogs();
        } else {
          alert("Failed to delete the log.");
        }
      } catch (err) {
        console.error("Error deleting log:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Notification <span className="text-blue-600">Dashboard</span>
          </h1>
  
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
          >
            New Notification
          </button>
        </header>

        
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-14 py-4 text-sm font-semibold text-gray-600">
                  Type
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Recipient
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Message
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Date
                </th>
                <th className="px-8 py-4 text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-blue-50/50">
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${log.type === "Email" ? "bg-purple-100 text-purple-700" : "bg-green-100 text-green-700"}`}
                    >
                      {log.type === "Email" ? "📧 Email" : "📱 SMS"}
                    </span>
                  </td>
                  <td className="px-6 py-4">{log.recipient}</td>
                  <td className="px-6 py-4 truncate max-w-xs">{log.message}</td>
                  <td className="px-6 py-4">
                    {new Date(log.sentAt).toLocaleString("ro-RO")}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`flex items-center gap-1 text-sm font-medium ${log.isSuccess ? "text-green-500" : "text-red-500"}`}
                    >
                      ● {log.isSuccess ? "Succes" : "Eroare"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDelete(log.id)}
                      className="text-red-500 hover:text-red-700 transition font-medium text-sm border border-red-200 px-3 py-1 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODALUL DE TRIMITERE */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h2 className="text-xl font-bold mb-4">Send Notification</h2>
            <form onSubmit={handleSend}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Choose Template
                </label>
                <select
                  className="w-full mt-1 p-2 border rounded-lg"
                  required
                  value={formData.templateId}
                  onChange={(e) =>
                    setFormData({ ...formData, templateId: e.target.value })
                  }
                >
                  <option value="">Select template...</option>
                  {templates.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Recipient (Email/Tel)
                </label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded-lg"
                  placeholder="ex: example@email.com"
                  required
                  value={formData.recipient}
                  onChange={(e) =>
                    setFormData({ ...formData, recipient: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
