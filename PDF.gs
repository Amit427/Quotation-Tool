function getPDF(sheetName,lastRow){
  var ss = SpreadsheetApp.getActive();
  sheet = ss.getSheetByName(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${ss.getId()}/export?format=pdf&portrait=true&range=A1:I${lastRow}&gid=${sheet.getSheetId()}`;
  const pdfBlob = UrlFetchApp.fetch(url, { headers: { authorization: "Bearer " + ScriptApp.getOAuthToken() } }).getBlob().setName("Quotation.pdf");
  var file = DriveApp.createFile(pdfBlob);
   var fileUrl = file.getUrl();
   var fileId = file.getId()
  Logger.log(fileURl);
  return [fileURl,fileId];
}

