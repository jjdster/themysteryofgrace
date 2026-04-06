function doPost(e) {
  try {
    // Parse the incoming JSON payload
    const payload = JSON.parse(e.postData.contents);
    const type = payload.type; // 'question', 'quiz', 'chat'
    const timestamp = new Date(payload.timestamp);
    const userEmail = payload.userEmail || 'Anonymous';
    const data = payload.data || {};
    
    let question = "";
    let answer = "";
    
    // Extract data based on the interaction type
    if (type === 'question') {
      question = data.userQuestion || "";
      answer = data.aiResponse || "";
    } else if (type === 'quiz') {
      question = data.question || "";
      answer = "Selected: " + data.selected + " | Correct: " + data.correct + " | Is Correct: " + data.isCorrect;
    } else if (type === 'chat') {
      question = data.message || data.userMessage || "";
      answer = data.response || data.aiResponse || "";
    } else if (type === 'comment') {
      question = data.comment || "";
      answer = "Status: " + data.status + " | Attitude: " + data.attitude;
    } else {
      question = JSON.stringify(data);
    }
    
    // Format Month Year (e.g., "April 2026")
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const monthYear = monthNames[timestamp.getMonth()] + " " + timestamp.getFullYear();
    
    // Determine Category Name
    let categoryName = "Mystery Logs";
    if (type === 'question') categoryName = "Mystery Questions";
    else if (type === 'quiz') categoryName = "Mystery Quizzes";
    else if (type === 'chat') categoryName = "Mystery Chats";
    else if (type === 'comment') categoryName = "Mystery Comments";
    
    const docName = categoryName + " - " + monthYear;
    
    // Find or create the document in Google Drive
    let doc;
    const files = DriveApp.getFilesByName(docName);
    if (files.hasNext()) {
      doc = DocumentApp.openById(files.next().getId());
    } else {
      doc = DocumentApp.create(docName);
    }
    
    const body = doc.getBody();
    
    // Append the log in the requested order
    body.appendParagraph("--------------------------------------------------");
    body.appendParagraph("Timestamp: " + timestamp.toLocaleString());
    body.appendParagraph("User: " + userEmail);
    body.appendParagraph("Question/Message: " + question);
    body.appendParagraph("AI Response/Answer: " + answer);
    body.appendParagraph(""); // Empty line for spacing
    
    // Return success response
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
