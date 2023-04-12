function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('AUTOMATION')
    .addItem('Get Data', 'goods')
    .addToUi()
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
var formSheet = ss.getSheetByName('Form');
var editFormSheet = ss.getSheetByName('Edit Form');
var setting = ss.getSheetByName('Settings');
var customerMaster = ss.getSheetByName('Customer Master')
var itemMaster = ss.getSheetByName('Iteam Master')

var companyName = formSheet.getRange('C4').getValues()
var state = formSheet.getRange('C6').getValues()
var reference = formSheet.getRange('H6')

var quotRef = setting.getRange("B1").getValue();
var counter = setting.getRange("B2").getValue()

var descriptionofGood = formSheet.getRange('D14:D54').getValues().filter(f => f[0] != "")
var descriptionofGoods = itemMaster.getRange(2, 1, itemMaster.getLastRow(), 6).getValues().filter(f => f[0] != "")

function goods() {
  for (i = 0; i < descriptionofGood.length; i++) {
    Logger.log(descriptionofGood[i][0])
    for (j = 0; j < descriptionofGoods.length; j++) {
      // Logger.log(descriptionofGoods[j][1])
      if (descriptionofGood[i][0] == descriptionofGoods[j][1]) {

        formSheet.getRange(i + 14, 3).setValue(descriptionofGoods[j][0])
        formSheet.getRange(i + 14, 5).setValue(descriptionofGoods[j][2])
        formSheet.getRange(i + 14, 6).setValue(descriptionofGoods[j][3])
        formSheet.getRange(i + 14, 7).setValue(descriptionofGoods[j][4])
        // formSheet.getRange(i+14,8).setValue(descriptionofGoods[j][5])
      }
    }
  }

  var customerdetail = customerMaster.getRange(2, 1, customerMaster.getLastRow(), 6).getValues().filter(f => f[0] != "")
  for (i = 0; i < companyName.length; i++) {
    for (j = 0; j < customerdetail.length; j++) {
      if (companyName[0] == customerdetail[j][0]) {
        formSheet.getRange('C5').setValue(customerdetail[j][1])
        formSheet.getRange('C6').setValue(customerdetail[j][5])
      }
    }
  }
  var quot = quotRef + (counter + 1)
  reference.setValue(quot)
  setting.getRange('B2').setValue(counter + 1)
}

var termForm = formSheet.getRange('J66').getValue()
var termset = formSheet.getRange('B66')
var termCondition = ss.getSheetByName('Terms and Conditions')
var term = termCondition.getRange(1, 1, termCondition.getLastRow(), 13).getValues().filter(f => f[0] != "")

var signatureSheet = ss.getSheetByName('Signature')
var signsheet = signatureSheet.getRange(1, 1, signatureSheet.getLastRow(), 9).getValues().filter(f => f[0] != "")
var signform = formSheet.getRange('J68').getValue()
var signset = formSheet.getRange('B68')

function onEdit(e) {
  var ss = SpreadsheetApp.getActive()
  var sheetName = "Form";
  var range = e.range;
  var sheet = range.getSheet();
  var row = e.range.getRow();
  var col = e.range.getColumn();
  if (sheetName === e.source.getActiveSheet().getName() && row === 66 && col === 10) {

    for (i = 0; i < 1; i++) {
      for (j = 0; j < term.length; j++) {
        if (termForm == term[j][12]) {
          termset.setValue(term[j][0])
        }
      }
    }
  }
  else if (sheetName === e.source.getActiveSheet().getName() && row === 68 && col === 10) {
    SpreadsheetApp.getUi().alert('Done')
    for (i = 0; i < 1; i++) {
      for (j = 0; j < signsheet.length; j++) {
        if (signform == signsheet[j][8]) {
          signset.setValue(signsheet[j][0])
          SpreadsheetApp.getUi().alert('SET')
        }
      }
    }
  }


 if (sheetName === e.source.getActiveSheet().getName() && row === 4 && col === 3){
   goods()
 }

}





