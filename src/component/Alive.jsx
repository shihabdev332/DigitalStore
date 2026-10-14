import { useEffect } from "react";
import { serverUrl } from "../../config";

const Alive = () => {
  useEffect(() => {
    if (!serverUrl) return undefined;

    const pingServer = async () => {
      try {
        const response = await fetch(`${serverUrl.replace(/\/$/, "")}/health`, {
          method: "GET",
          cache: "no-store",
          signal: AbortSignal.timeout(10_000),
        });
        await response.body?.cancel();
      } catch {
        // Heartbeats run silently; the next interval will retry.
      }
    };

    const intervalId = window.setInterval(pingServer, 30_000);
    return () => window.clearInterval(intervalId);
  }, []);

  return null;
};

export default Alive;
