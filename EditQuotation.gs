var goodsdata = editFormSheet.getRange('C14:H53')

function editQuot() {

  var quotRef = setting.getRange("B1").getValue();
  var counter = setting.getRange("B2").getValue()

  var masterData = ss.getSheetByName('Master')
  var editId = editFormSheet.getRange('J6').getValue()
  var newId = quotRef + (counter + 1)

  editFormSheet.getRange('H6').setValue(newId)
  var partname = editFormSheet.getRange('C4')
  var partadd = editFormSheet.getRange('C5')
  var partadd2 = editFormSheet.getRange('C6')
  var quotDate = editFormSheet.getRange('H5')
  var gst = editFormSheet.getRange('G56')
  var gstAmount = editFormSheet.getRange('H56')
  var totalAmount = editFormSheet.getRange('H57')
  var remark = editFormSheet.getRange('C55')
  var terms = editFormSheet.getRange('B66')
  var sign = editFormSheet.getRange('B68')
  var attn = editFormSheet.getRange('D7')
  var quotFor = editFormSheet.getRange('D9')

  goodsdata.clearContent()

  var mastersheet = masterData.getRange(2, 1, masterData.getLastRow(), 24).getValues().filter(f => f[0] == editId)
  var array1 = mastersheet[0]
  partname.setValue(array1[4])
  partadd.setValue(array1[5])
  partadd2.setValue(array1[6])
  quotDate.setValue(array1[7])
  gst.setValue(array1[15])
  gstAmount.setValue('=if(H55="", "", H55*G56)')
  totalAmount.setValue('=ROUND(H55+H56)')
  remark.setValue(array1[18])
  // terms.setValue(array1[19])
  // sign.setValue(array1[20])
  attn.setValue(array1[22])
  quotFor.setValue(array1[23])


  var descript = masterData.getRange(2, 1, masterData.getLastRow(), 18).getValues().filter(f => f[0] == editId)
  var leng = descript.length

  var des = []
  var formula = '=ARRAYFORMULA(IF(G14:G53="","",G14:G53*E14:E53))'
  // var editDesc = editFormSheet.getRange(i+13,3,i,6)
  descript.forEach(e => des.push([e[9], e[10], e[11], e[12], e[13], ""]))
  Logger.log(des)
  editFormSheet.getRange(14, 3, des.length, des[0].length).setValues(des)
  editFormSheet.getRange('H14').setValue('=ARRAYFORMULA(IF(G14:G53="","",G14:G53*E14:E53))')
}






function editmaster() {
  var attn = editFormSheet.getRange('D7').getValue()
  var quotFor = editFormSheet.getRange('D9').getValue()
  var newid = setting.getRange('B1').getValue()
  var newid1 = setting.getRange('B2').getValue() + 1
  var newId = (newid + newid1)
  var masterData = ss.getSheetByName('Master')
  var id = editFormSheet.getRange('J6').getValue()
  var newId = newid + newid1
  var previoId = id
  var status = 'Active'
  var time = new Date()
  var partname = editFormSheet.getRange('C4').getValue()
  var partadd = editFormSheet.getRange('C5').getValue()
  var partadd2 = editFormSheet.getRange('C6').getValue()
  var quotDate = editFormSheet.getRange('H5').getValue()
  var gst = editFormSheet.getRange('G56').getValue()
  var gstAmount = editFormSheet.getRange('H56').getValue()
  var totalAmount = editFormSheet.getRange('H57').getValue()
  var remark = editFormSheet.getRange('C55').getValue()
  var terms = editFormSheet.getRange('B66').getValue()
  var sign = editFormSheet.getRange('B68').getValue()
  var goodsdata = editFormSheet.getRange('B14:H53').getValues().filter(f => f[2] != "")
  var data = [newId, previoId, status, time, partname, partadd, partadd2, quotDate]
  var data2 = [gst, gstAmount, totalAmount, remark, terms, sign]
  var myData = masterData.getRange(2, 1, masterData.getLastRow(), 21).getValues()
  var mastersheet = myData.filter(f => f[0] == id)
  var pdfId = getPDF("Edit Form", 68)[1];
  var pdf = getPDF("Edit Form", 68)[0];
  var folderID = setting.getRange('B3').getValue() //fetch from setting
  try {
    DriveApp.getFileById(pdfId).moveTo(DriveApp.getFolderById(folderID));
  } catch (e) { Logger.log(e.stack); }
  goodsdata.forEach(e => e.unshift(...data))
  // Logger.log(goodsdata)
  goodsdata.forEach(e => e.push(...data2, pdf, attn, quotFor))
  // Logger.log(goodsdata)
  masterData.getRange(masterData.getLastRow() + 1, 1, goodsdata.length, 24).setValues(goodsdata)
  setting.getRange('B2').setValue(newid1)
  resetPreviousNo(id, newId, myData, masterData)
  clearEditForm()
}

function resetPreviousNo(id, newId, myData, masterData) {
  myData.forEach((r, i) => {
    if (r[1] == id) {
      masterData.getRange(i + 2, 3).setValue('Inactive');
    }
  })
}






function clearEditForm() {
  editFormSheet.getRange('D7').clearContent()
  editFormSheet.getRange('D9').clearContent()
  editFormSheet.getRange('C4').clearContent()
  editFormSheet.getRange('C55').clearContent()
  editFormSheet.getRange('C5').clearContent()
  editFormSheet.getRange('C6').clearContent()
  editFormSheet.getRange('J6').clearContent()
  editFormSheet.getRange('H5').clearContent()
  editFormSheet.getRange('H6').clearContent()
  editFormSheet.getRange('J66').clearContent()
  editFormSheet.getRange('G56').clearContent()
  //  editFormSheet.getRange('H56').clearContent()
  editFormSheet.getRange('J68').clearContent()
  editFormSheet.getRange('C14:G53').clearContent()

}


