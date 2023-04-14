var masterData = ss.getSheetByName('Master')
var id = formSheet.getRange('H6').getValue()
var previoId = ""
var status = 'Active'
var time = new Date()
var attn = formSheet.getRange('D7').getValue()
var quotFor = formSheet.getRange('D9').getValue()
var partname = formSheet.getRange('C4').getValue()
var partadd = formSheet.getRange('C5').getValue()
var partadd2 = formSheet.getRange('C6').getValue()
var quotDate = formSheet.getRange('H5').getValue()
var gst = formSheet.getRange('G56').getValue()
var gstAmount = formSheet.getRange('H56').getValue()
var totalAmount = formSheet.getRange('H57').getValue()
var remark = formSheet.getRange('C55').getValue()
var terms = formSheet.getRange('B66').getValue()
var sign = formSheet.getRange('B68').getValue()

var data = [id, previoId, status, time, partname, partadd, partadd2, quotDate]
var data2 = [gst, gstAmount, totalAmount, remark, terms, sign]
var mastersheet = masterData.getRange(2, 1, masterData.getLastRow(), 21).getValues().filter(f => f[0] == id)


function master() {
  var terms = formSheet.getRange('B66').getValue()
  var pdfId = getPDF("Form", 68)[1];
  var pdf = getPDF("Form", 68)[0];
  // Logger.log(pdf)
  var folderID = setting.getRange('B3').getValue() //fetch from setting
  try {
    DriveApp.getFileById(pdfId).moveTo(DriveApp.getFolderById(folderID));
  } catch (e) { Logger.log(e.stack); }

  let goodsdata = formSheet.getRange('B14:H53').getValues().filter(f => f[2] != "")
  Logger.log(goodsdata)
  goodsdata.forEach(e => e.unshift(...data))
  //  Logger.log(goodsdata)
  goodsdata.forEach(e => e.push(...data2, pdf, attn, quotFor))
  //  Logger.log(goodsdata)
  masterData.getRange(masterData.getLastRow() + 1, 1, goodsdata.length, 24).setValues(goodsdata)
  setting.getRange('B2').setValue(counter + 1)
  clearForm()
}



function clearForm() {
  formSheet.getRange('D7').clearContent()
  formSheet.getRange('D9').clearContent()
  formSheet.getRange('C4').clearContent()
  formSheet.getRange('C55').clearContent()
  formSheet.getRange('C5').clearContent()
  formSheet.getRange('C6').clearContent()
  formSheet.getRange('H6').clearContent()
  formSheet.getRange('G56').clearContent()
  formSheet.getRange('J66').clearContent()
  formSheet.getRange('J68').clearContent()
  formSheet.getRange('C14:G53').clearContent()
}










