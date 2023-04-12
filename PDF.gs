function getFileAsBlob2(exportUrl) {
let response = UrlFetchApp.fetch(exportUrl, {
muteHttpExceptions: true,
headers: {
Authorization: ' Bearer ' +  ScriptApp.getOAuthToken(),
},
});
return response.getBlob();
}

function getPdfUrl2(url,sheet,range,pdfName,folderId){
var blob = _getAsBlob2(url,sheet,range);
var pdfurl = _exportBlob2(blob,pdfName,folderId)
return pdfurl
}

function _getAsBlob2(url, sheet, range){
var rangeParam = ''
var sheetParam = ''
if (range) {
rangeParam =
'&r1=' + (range.getRow() - 1)
+ '&r2=' + range.getLastRow()
+ '&c1=' + (range.getColumn() - 1)
+ '&c2=' + range.getLastColumn()
}
if (sheet) {
sheetParam = '&gid=' + sheet.getSheetId()
}
var exportUrl = url.replace(/\/edit.*$/, '')
+ '/export?exportFormat=pdf&format=pdf'
+ '&size=A4'
+ '&portrait=true'
+ '&fitw=true'       
+ '&top_margin=0.50'              
+ '&bottom_margin=0.50' 
+ '&scale=4'         
+ '&left_margin=0.2'             
+ '&right_margin=0.2'           
+ '&sheetnames=false&printtitle=false'
+ '&pagenum=false'
+ '&gridlines=false'
+ '&fzr=true'  
+ sheetParam
+ rangeParam
Logger.log('exportUrl=' + exportUrl)
var response = UrlFetchApp.fetch(exportUrl,{
headers: { 
Authorization: 'Bearer ' +  ScriptApp.getOAuthToken(),
},
})
return response.getBlob()
}
function _exportBlob2(blob, fileName,folderLink) {
blob = blob.setName(fileName)
if (folderLink == null || folderLink == "" || folderLink == undefined) {
Logger.log(folderLink)
var maindrive = DriveApp.getRootFolder();
} else {
var maindrive = DriveApp.getFolderById(folderLink);
}
var pdfFile = maindrive.createFile(blob).setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.VIEW).getUrl();  
return pdfFile ;
}


// Get google file Id
const getDriveFileIdFromUrl2 = (url) => url.match(/[-\w]{25,}/);
