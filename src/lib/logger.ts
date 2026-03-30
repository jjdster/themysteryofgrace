// --- Logging Utility ---
export const studyLogger = {
  log: async (lessonTitle: string, interaction: { type: 'question' | 'quiz' | 'chat', data: any }) => {
    // 1. Local Storage Logging
    const logs = JSON.parse(localStorage.getItem('study_logs') || '[]');
    const logEntry = {
      timestamp: new Date().toISOString(),
      lesson: lessonTitle,
      ...interaction
    };
    logs.push(logEntry);
    localStorage.setItem('study_logs', JSON.stringify(logs));

    // 2. Remote Logging to Google Docs (via Backend)
    try {
      const response = await fetch('/api/logs/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lesson: lessonTitle, interaction })
      });
      
      const result = await response.json();
      if (result.status === 'fallback') {
        console.info("Remote log fallback:", result.message);
      } else if (!response.ok) {
        console.warn("Remote log failed with status:", response.status);
      }
    } catch (error) {
      console.warn("Failed to send remote log:", error);
    }
  },
  getLogs: () => JSON.parse(localStorage.getItem('study_logs') || '[]'),
  clearLogs: () => localStorage.removeItem('study_logs'),
  download: () => {
    const logs = studyLogger.getLogs();
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `study_logs_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  }
};
