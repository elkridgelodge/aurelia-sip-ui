Meteor.methods({
  didnumber: function (insecureusername) {
//try {
    var url = 'https://backoffice.voipinnovations.com/Services/APIService.asmx?op=getDIDs'
//    var areacode = Meteor.users.findOne({_id: userid}).phones[0].phone.substr(0,3)
//    var areacode = Meteor.users.findOne({_id: userid}).username.substr(0,3)
console.log('insecureusername is ' + insecureusername)
var areacode = insecureusername.substr(0,3)
console.log("areacode is " + areacode)
    var username = ''
    var password = ''
    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                   '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
                   '  <soap:Body>' +
                   '    <getDIDs xmlns="http://tempuri.org/">' +
                   '      <login>' + username + '</login>' +
                   '      <secret>' + password + '</secret>' +
                   '      <state></state>' +
                   '      <lata></lata>' +
                   '      <rateCenter></rateCenter>' +
                   '      <npa>' + areacode + '</npa>' +
                   '      <nxx></nxx>' +
                   '      <tier>0</tier>' +
                   '      <t38></t38>' +
                   '      <cnam></cnam>' +
                   '      <sms></sms>' +
                   '      <network></network>' +
                   '    </getDIDs>' +
                   '  </soap:Body>' +
                   '</soap:Envelope>'
    response =  HTTP.call("POST", url, {content: envelope, headers: {'Content-Type': 'text/xml'}})
    var result = xml2js.parseStringSync(response.content)["soap:Envelope"]["soap:Body"][0].getDIDsResponse[0].getDIDsResult[0]
    if (result.responseCode == 100) {
      var didsuggestion = result.DIDLocators[0].DIDLocator[0].tn[0]
      return didsuggestion
    } else if (result.responseCode == 101) {
      var informationalresponse = result
      return result.responseMessage
      return "result was " + Object.keys(result)
    } else {
//      return "guru meditation: " + result.responseCode + ' keys: ' + Object.keys(result)
      return "guru meditation: " + result.responseCode + ' message: ' + result.responseMessage
    }
  },
})
