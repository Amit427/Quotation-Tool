function onOpen(e) {
  SpreadsheetApp.getUi().createMenu('AUTOMATION')
    .addItem('Get Data in Form', 'goods')
    .addItem('Create PDF', 'master')
    .addSeparator()
    .addItem('Create Edit Quotation', 'editmaster')
    .addItem('Reset', 'reset')
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
  var sheetName1 = "Edit Form";
  var range = e.range;
  var sheet = range.getSheet();
  var row = e.range.getRow();
  var col = e.range.getColumn();

  if (sheetName === e.source.getActiveSheet().getName() && col == 4 && row >= 14 && row <= 53) {
    goods()
  }
  if (sheetName === e.source.getActiveSheet().getName() && row === 4 && col === 3) {
    goods()
  }
  if (sheetName1 === e.source.getActiveSheet().getName() && row === 6 && col === 10) {
    editQuot()
  }
}

var follow = ss.getSheetByName('Follow-Up Master')

function reset() {
  formSheet.getRange('J6').setFormula('=IFNA(VLOOKUP(C4,\'Customer Master\'!A2:R,18),"")')
  formSheet.getRange('H14').setValue('=ARRAYFORMULA(IF(G14:G53="","",G14:G53*E14:E53))')
  // editFormSheet.getRange('H14').setValue('=ARRAYFORMULA(IF(G14:G53="","",G14:G53*E14:E53))')
  formSheet.getRange('H6').setValue('=TODAY()')
  formSheet.getRange('G55').setValue('=if(sum(G14:G53)=0,"",sum(G14:G53))')
  editFormSheet.getRange('G55').setValue('=if(sum(G14:G53)=0,"",sum(G14:G53))')
  formSheet.getRange('H55').setValue('=sum(H14:H53)')
  editFormSheet.getRange('H55').setValue('=sum(H14:H53)')
  formSheet.getRange('H56').setValue('=if(H55="", "", H55*G56)')
  editFormSheet.getRange('H56').setValue('=if(H55="", "", H55*G56)')
  formSheet.getRange('H57').setValue('=ROUND(H55+H56)')
  editFormSheet.getRange('H57').setValue('=ROUND(H55+H56)')
  formSheet.getRange('D57').setValue('=if(INR(H57)="Rupees Zero Only","",INR(H57))')
  editFormSheet.getRange('D57').setValue('=if(INR(H57)="Rupees Zero Only","",INR(H57))')
  var fformulaT = '=IF(C4="","",IF(J66=\'Terms and Conditions\'!M15,\'Terms and Conditions\'!A15,""))';
  formSheet.getRange('B65').setValue(fformulaT)
  var eformulaT = '=IF(C4="","",IF(J66=\'Terms and Conditions\'!M15,\'Terms and Conditions\'!A15,""))';
  editFormSheet.getRange('B65').setValue(eformulaT)

  var fformula1 = '=IFS(C4="","",J66=\'Terms and Conditions\'!M1,\'Terms and Conditions\'!A1,J66=\'Terms and Conditions\'!M15,\'Terms and Conditions\'!A17,J66=\'Terms and Conditions\'!M29,\'Terms and Conditions\'!A29,J66=\'Terms and Conditions\'!M39,\'Terms and Conditions\'!A39,J66=\'Terms and Conditions\'!M50,\'Terms and Conditions\'!A50,J66=\'Terms and Conditions\'!M57,\'Terms and Conditions\'!A57)						'
  formSheet.getRange('B66').setValue(fformula1)


  var eformula1 = '=IFNA(IFS(J66="",VLOOKUP(C4,Master!E2:T,16,0),J66=\'Terms and Conditions\'!M1,\'Terms and Conditions\'!A1,J66=\'Terms and Conditions\'!M15,\'Terms and Conditions\'!A17,J66=\'Terms and Conditions\'!M29,\'Terms and Conditions\'!A29,J66=\'Terms and Conditions\'!M39,\'Terms and Conditions\'!A39,J66=\'Terms and Conditions\'!M50,\'Terms and Conditions\'!A50,J66=\'Terms and Conditions\'!M57,\'Terms and Conditions\'!A57),""'
  editFormSheet.getRange('B66').setValue(eformula1)



  var fformula2 = '=IFNA(IFS(C4="","",J68=Signature!I1,Signature!A1,J68=Signature!I8,Signature!A8,J68=Signature!I16,Signature!A16,J68=Signature!I23,Signature!A23,J68=Signature!I30,Signature!A30,J68=Signature!I37,Signature!A37,J68=Signature!I44,Signature!A44),""'
  formSheet.getRange('B68').setValue(fformula2)


  var eformula2 = '=IFNA(IFS(J68="",VLOOKUP(C4,Master!E2:U,17,0),J68=Signature!I1,Signature!A1,J68=Signature!I8,Signature!A8,J68=Signature!I16,Signature!A16,J68=Signature!I23,Signature!A23,J68=Signature!I30,Signature!A30,J68=Signature!I37,Signature!A37,J68=Signature!I44,Signature!A44),""'
  editFormSheet.getRange('B68').setValue(eformula2)


  editFormSheet.getRange('J4').setFormula('=IFNA(VLOOKUP(C4,\'Customer Master\'!A2:R,18),"")')
  follow.getRange('A2').setValue('=ARRAYFORMULA(IFNA(VLOOKUP(D2:D,\'Customer Master\'!$A$2:$R,18,0),""))')
}


