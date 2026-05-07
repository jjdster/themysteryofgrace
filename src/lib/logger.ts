export const studyLogger = {
  logSessionInteraction: async (sessionId: string, lessonTitle: string, data: any) => {
    console.log('Logged', sessionId, lessonTitle, data);
  }
};
