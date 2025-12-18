import React, { useEffect, useState } from "react";

export default function CacheStatus() {
  const [cacheSize, setCacheSize] = useState(null);

  useEffect(() => {
    if ("storage" in navigator && "estimate" in navigator.storage) {
      navigator.storage.estimate().then(estimate => {
        setCacheSize((estimate.usage / (1024 * 1024)).toFixed(2)); // MB
      });
    }
  }, []);

  return (
    <div className="p-2 text-sm text-gray-700">
      Cache Usage: {cacheSize ? `${cacheSize} MB` : "Calculating..."}
    </div>
  );
}