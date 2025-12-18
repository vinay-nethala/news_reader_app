export default function CacheManagementPanel() {
  const clearCache = () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: "CLEAR_CACHE" });
      alert("Cache clear command sent");
    } else {
      alert("Service Worker not ready");
    }
  };

  return (
    <div className="p-4 border rounded shadow-md my-4">
      <h3 className="font-semibold mb-2">Cache Management</h3>
      <button
        onClick={clearCache}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Clear Cache
      </button>
    </div>
  );
}