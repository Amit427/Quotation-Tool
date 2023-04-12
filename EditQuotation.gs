function editQuot(){

var masterData = ss.getSheetByName('Master') 
var editId = editFormSheet.getRange('H6').getValue()
var newId = ""
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
var goodsdata = editFormSheet.getRange('B14:H53')

goodsdata.clearContent()

var mastersheet = masterData.getRange(2,1,masterData.getLastRow(),21).getValues().filter(f=>f[0] == editId)
var array1 = mastersheet[0]
partname.setValue(array1[4])
partadd.setValue(array1[5])
partadd2.setValue(array1[6])
quotDate.setValue(array1[7])
gst.setValue(array1[15])
gstAmount.setValue(array1[16])
totalAmount.setValue(array1[17])
remark.setValue(array1[18])
terms.setValue(array1[19])
sign.setValue(array1[20])


var descript = masterData.getRange(2,1,masterData.getLastRow(),18).getValues().filter(f=>f[0] == editId)
var leng = descript.length
Logger.log(leng)
var des = []

// var editDesc = editFormSheet.getRange(i+13,3,i,6)
descript.forEach(e=>des.push([e[9],e[10],e[11],e[12],e[13],e[14]]))  
Logger.log(des)
editFormSheet.getRange(14,3,des.length,des[0].length).setValues(des)
}



