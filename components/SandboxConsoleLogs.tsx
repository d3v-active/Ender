import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * SandboxConsoleLogs fetches logs from the sandbox-logs API and displays them.
 * It uses a simple polling mechanism (default 1500ms) and renders the logs
 * in a scrollable, glass‑morphism styled container.
 */
const POLL_INTERVAL_MS = 1500; // default interval, can be tweaked by the user
const MAX_LOG_LINES = 500; // prevent unbounded growth

export default function SandboxConsoleLogs() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLogs = async () => {
      try {
        const res = await fetch('/api/sandbox-logs');
        if (!res.ok) throw new Error('Failed to fetch logs');
        const data = await res.json();
        if (isMounted) {
          const newLines: string[] = Array.isArray(data.logs) ? data.logs : [];
          setLogs(prev => {
            const combined = [...prev, ...newLines];
            // keep only the most recent MAX_LOG_LINES
            return combined.slice(-MAX_LOG_LINES);
          });
          setLoading(false);
        }
      } catch (e) {
        console.error(e);
        if (isMounted) setLoading(false);
      }
    };

    // Initial fetch
    fetchLogs();
    const interval = setInterval(fetchLogs, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative rounded-lg overflow-hidden border border-gray-700 bg-gray-900/70 backdrop-blur-sm p-4 min-h-[200px]">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50">
          <Loader2 className="animate-spin w-6 h-6 text-gray-400" />
        </div>
      )}
      <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap overflow-y-auto max-h-96">
        {logs.length > 0 ? logs.join('\n') : 'No logs yet...'}
      </pre>
    </div>
  );
}
