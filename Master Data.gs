var masterData = ss.getSheetByName('Master') 
var id = formSheet.getRange('H6').getValue()
var previoId = ""
var status = 'New'
var time = new Date()
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
var goodsdata = formSheet.getRange('B14:H53').getValues().filter(f=>f[2]!="")
var data = [id,previoId,status,time,partname,partadd,partadd2,quotDate]
var data2 = [gst,gstAmount,totalAmount,remark,term,sign]
var mastersheet = masterData.getRange(2,1,masterData.getLastRow(),21).getValues().filter(f=>f[0] == id)


function master(){
  goodsdata.forEach(e=>e.unshift(...data))
  // Logger.log(goodsdata)
  goodsdata.forEach(e=>e.push(...data2))
  // Logger.log(goodsdata)
masterData.getRange(masterData.getLastRow()+1,1,goodsdata.length,21).setValues(goodsdata)
formSheet.getRange('C14:G53').clearContent()
}






// ID	Previous ID	Status	TimeStamp	Party Name	Party Address	Pary Address 2	Quotation Date	S No	HSN  / SAC	Description of Goods and Services	Rates (₹)	Unit	Qty	Amount (₹) 	GST%	GST Amount	Total Amount	Remarks	Terms & Conditons	Signature