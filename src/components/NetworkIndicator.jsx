import useOnlineStatus from "../hooks/useOnlineStatus";

export default function NetworkIndicator() {
  const online = useOnlineStatus();

  return (
    <div
      className={`fixed top-2 right-2 px-3 py-1 rounded-full text-white text-xs font-semibold ${
        online ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {online ? "Online" : "Offline"}
    </div>
  );
}