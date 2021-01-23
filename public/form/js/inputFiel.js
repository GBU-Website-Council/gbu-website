import axios from "axios";
import loader from "./loader";
import alert from "./alert";
import { ConnectionStates } from "mongoose";
import { json } from "body-parser";

exports.postData = async (data, url) => {
  try {
    // console.log("Posting");
    const res = await axios({
      method: "POST",
      url,
      data,
    });
    console.log(res);
    if (res.data.status == "success") {
      loader.hideLoder();
      alert.show("success", "Updated", "form-content");
      setTimeout(() => {
        alert.hide();
      }, 3000);
    }
  } catch (err) {
    console.log(err);
    loader.hideLoder();
    alert.show("error", err.response.data.message, "form-content");
    setTimeout(() => {
      alert.hide();
    }, 3000);
    // console.log(error);
  }
};

exports.getSetData = (data, fields) => {
  const inputData = `<div id="form-field-container"> <div id="form-fiels" class=""> <div class="font-weight-normal" style="color: #ffff; background-color:#78335d; padding: 10px 0px; "> <h5 class="ml-3" style="font-waight : 350"><%TITLE%></h5> </div> <div class="textarea-ck"> <textarea class="form-control" id="<%NAME%>" style="visibility: hidden ; height : 0px;"><%DATA%></textarea></div></div><br></div>`;
  let child = "";
  Object.keys(fields).forEach((key) => {
    let str = inputData.replace("<%TITLE%>", fields[key]);
    if (data?.[key]) {
      str = str.replace("<%DATA%>", data[key]);
    } else {
      str = str.replace("<%DATA%>", "");
    }
    child += str.replace("<%NAME%>", key);
  });
  return child;
};

exports.contactFun = (data, fields) => {
  Object.keys(fields).forEach((el) => {
    if (!data?.[el]) {
      data[el] = "";
    }
    data[el] = stripHtml(data[el]);
    // console.log(data[el]);
  });
  function stripHtml(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }
  let countryCode = `[
    {
      "code": "+7 840",
      "name": "Abkhazia"
    },
    {
      "code": "+93",
      "name": "Afghanistan"
    },
    {
      "code": "+355",
      "name": "Albania"
    },
    {
      "code": "+213",
      "name": "Algeria"
    },
    {
      "code": "+1 684",
      "name": "American Samoa"
    },
    {
      "code": "+376",
      "name": "Andorra"
    },
    {
      "code": "+244",
      "name": "Angola"
    },
    {
      "code": "+1 264",
      "name": "Anguilla"
    },
    {
      "code": "+1 268",
      "name": "Antigua and Barbuda"
    },
    {
      "code": "+54",
      "name": "Argentina"
    },
    {
      "code": "+374",
      "name": "Armenia"
    },
    {
      "code": "+297",
      "name": "Aruba"
    },
    {
      "code": "+247",
      "name": "Ascension"
    },
    {
      "code": "+61",
      "name": "Australia"
    },
    {
      "code": "+672",
      "name": "Australian External Territories"
    },
    {
      "code": "+43",
      "name": "Austria"
    },
    {
      "code": "+994",
      "name": "Azerbaijan"
    },
    {
      "code": "+1 242",
      "name": "Bahamas"
    },
    {
      "code": "+973",
      "name": "Bahrain"
    },
    {
      "code": "+880",
      "name": "Bangladesh"
    },
    {
      "code": "+1 246",
      "name": "Barbados"
    },
    {
      "code": "+1 268",
      "name": "Barbuda"
    },
    {
      "code": "+375",
      "name": "Belarus"
    },
    {
      "code": "+32",
      "name": "Belgium"
    },
    {
      "code": "+501",
      "name": "Belize"
    },
    {
      "code": "+229",
      "name": "Benin"
    },
    {
      "code": "+1 441",
      "name": "Bermuda"
    },
    {
      "code": "+975",
      "name": "Bhutan"
    },
    {
      "code": "+591",
      "name": "Bolivia"
    },
    {
      "code": "+387",
      "name": "Bosnia and Herzegovina"
    },
    {
      "code": "+267",
      "name": "Botswana"
    },
    {
      "code": "+55",
      "name": "Brazil"
    },
    {
      "code": "+246",
      "name": "British Indian Ocean Territory"
    },
    {
      "code": "+1 284",
      "name": "British Virgin Islands"
    },
    {
      "code": "+673",
      "name": "Brunei"
    },
    {
      "code": "+359",
      "name": "Bulgaria"
    },
    {
      "code": "+226",
      "name": "Burkina Faso"
    },
    {
      "code": "+257",
      "name": "Burundi"
    },
    {
      "code": "+855",
      "name": "Cambodia"
    },
    {
      "code": "+237",
      "name": "Cameroon"
    },
    {
      "code": "+1",
      "name": "Canada"
    },
    {
      "code": "+238",
      "name": "Cape Verde"
    },
    {
      "code": "+ 345",
      "name": "Cayman Islands"
    },
    {
      "code": "+236",
      "name": "Central African Republic"
    },
    {
      "code": "+235",
      "name": "Chad"
    },
    {
      "code": "+56",
      "name": "Chile"
    },
    {
      "code": "+86",
      "name": "China"
    },
    {
      "code": "+61",
      "name": "Christmas Island"
    },
    {
      "code": "+61",
      "name": "Cocos-Keeling Islands"
    },
    {
      "code": "+57",
      "name": "Colombia"
    },
    {
      "code": "+269",
      "name": "Comoros"
    },
    {
      "code": "+242",
      "name": "Congo"
    },
    {
      "code": "+243",
      "name": "Congo, Dem. Rep. of (Zaire)"
    },
    {
      "code": "+682",
      "name": "Cook Islands"
    },
    {
      "code": "+506",
      "name": "Costa Rica"
    },
    {
      "code": "+385",
      "name": "Croatia"
    },
    {
      "code": "+53",
      "name": "Cuba"
    },
    {
      "code": "+599",
      "name": "Curacao"
    },
    {
      "code": "+537",
      "name": "Cyprus"
    },
    {
      "code": "+420",
      "name": "Czech Republic"
    },
    {
      "code": "+45",
      "name": "Denmark"
    },
    {
      "code": "+246",
      "name": "Diego Garcia"
    },
    {
      "code": "+253",
      "name": "Djibouti"
    },
    {
      "code": "+1 767",
      "name": "Dominica"
    },
    {
      "code": "+1 809",
      "name": "Dominican Republic"
    },
    {
      "code": "+670",
      "name": "East Timor"
    },
    {
      "code": "+56",
      "name": "Easter Island"
    },
    {
      "code": "+593",
      "name": "Ecuador"
    },
    {
      "code": "+20",
      "name": "Egypt"
    },
    {
      "code": "+503",
      "name": "El Salvador"
    },
    {
      "code": "+240",
      "name": "Equatorial Guinea"
    },
    {
      "code": "+291",
      "name": "Eritrea"
    },
    {
      "code": "+372",
      "name": "Estonia"
    },
    {
      "code": "+251",
      "name": "Ethiopia"
    },
    {
      "code": "+500",
      "name": "Falkland Islands"
    },
    {
      "code": "+298",
      "name": "Faroe Islands"
    },
    {
      "code": "+679",
      "name": "Fiji"
    },
    {
      "code": "+358",
      "name": "Finland"
    },
    {
      "code": "+33",
      "name": "France"
    },
    {
      "code": "+596",
      "name": "French Antilles"
    },
    {
      "code": "+594",
      "name": "French Guiana"
    },
    {
      "code": "+689",
      "name": "French Polynesia"
    },
    {
      "code": "+241",
      "name": "Gabon"
    },
    {
      "code": "+220",
      "name": "Gambia"
    },
    {
      "code": "+995",
      "name": "Georgia"
    },
    {
      "code": "+49",
      "name": "Germany"
    },
    {
      "code": "+233",
      "name": "Ghana"
    },
    {
      "code": "+350",
      "name": "Gibraltar"
    },
    {
      "code": "+30",
      "name": "Greece"
    },
    {
      "code": "+299",
      "name": "Greenland"
    },
    {
      "code": "+1 473",
      "name": "Grenada"
    },
    {
      "code": "+590",
      "name": "Guadeloupe"
    },
    {
      "code": "+1 671",
      "name": "Guam"
    },
    {
      "code": "+502",
      "name": "Guatemala"
    },
    {
      "code": "+224",
      "name": "Guinea"
    },
    {
      "code": "+245",
      "name": "Guinea-Bissau"
    },
    {
      "code": "+595",
      "name": "Guyana"
    },
    {
      "code": "+509",
      "name": "Haiti"
    },
    {
      "code": "+504",
      "name": "Honduras"
    },
    {
      "code": "+852",
      "name": "Hong Kong SAR China"
    },
    {
      "code": "+36",
      "name": "Hungary"
    },
    {
      "code": "+354",
      "name": "Iceland"
    },
    {
      "code": "+91",
      "name": "India"
    },
    {
      "code": "+62",
      "name": "Indonesia"
    },
    {
      "code": "+98",
      "name": "Iran"
    },
    {
      "code": "+964",
      "name": "Iraq"
    },
    {
      "code": "+353",
      "name": "Ireland"
    },
    {
      "code": "+972",
      "name": "Israel"
    },
    {
      "code": "+39",
      "name": "Italy"
    },
    {
      "code": "+225",
      "name": "Ivory Coast"
    },
    {
      "code": "+1 876",
      "name": "Jamaica"
    },
    {
      "code": "+81",
      "name": "Japan"
    },
    {
      "code": "+962",
      "name": "Jordan"
    },
    {
      "code": "+7 7",
      "name": "Kazakhstan"
    },
    {
      "code": "+254",
      "name": "Kenya"
    },
    {
      "code": "+686",
      "name": "Kiribati"
    },
    {
      "code": "+965",
      "name": "Kuwait"
    },
    {
      "code": "+996",
      "name": "Kyrgyzstan"
    },
    {
      "code": "+856",
      "name": "Laos"
    },
    {
      "code": "+371",
      "name": "Latvia"
    },
    {
      "code": "+961",
      "name": "Lebanon"
    },
    {
      "code": "+266",
      "name": "Lesotho"
    },
    {
      "code": "+231",
      "name": "Liberia"
    },
    {
      "code": "+218",
      "name": "Libya"
    },
    {
      "code": "+423",
      "name": "Liechtenstein"
    },
    {
      "code": "+370",
      "name": "Lithuania"
    },
    {
      "code": "+352",
      "name": "Luxembourg"
    },
    {
      "code": "+853",
      "name": "Macau SAR China"
    },
    {
      "code": "+389",
      "name": "Macedonia"
    },
    {
      "code": "+261",
      "name": "Madagascar"
    },
    {
      "code": "+265",
      "name": "Malawi"
    },
    {
      "code": "+60",
      "name": "Malaysia"
    },
    {
      "code": "+960",
      "name": "Maldives"
    },
    {
      "code": "+223",
      "name": "Mali"
    },
    {
      "code": "+356",
      "name": "Malta"
    },
    {
      "code": "+692",
      "name": "Marshall Islands"
    },
    {
      "code": "+596",
      "name": "Martinique"
    },
    {
      "code": "+222",
      "name": "Mauritania"
    },
    {
      "code": "+230",
      "name": "Mauritius"
    },
    {
      "code": "+262",
      "name": "Mayotte"
    },
    {
      "code": "+52",
      "name": "Mexico"
    },
    {
      "code": "+691",
      "name": "Micronesia"
    },
    {
      "code": "+1 808",
      "name": "Midway Island"
    },
    {
      "code": "+373",
      "name": "Moldova"
    },
    {
      "code": "+377",
      "name": "Monaco"
    },
    {
      "code": "+976",
      "name": "Mongolia"
    },
    {
      "code": "+382",
      "name": "Montenegro"
    },
    {
      "code": "+1664",
      "name": "Montserrat"
    },
    {
      "code": "+212",
      "name": "Morocco"
    },
    {
      "code": "+95",
      "name": "Myanmar"
    },
    {
      "code": "+264",
      "name": "Namibia"
    },
    {
      "code": "+674",
      "name": "Nauru"
    },
    {
      "code": "+977",
      "name": "Nepal"
    },
    {
      "code": "+31",
      "name": "Netherlands"
    },
    {
      "code": "+599",
      "name": "Netherlands Antilles"
    },
    {
      "code": "+1 869",
      "name": "Nevis"
    },
    {
      "code": "+687",
      "name": "New Caledonia"
    },
    {
      "code": "+64",
      "name": "New Zealand"
    },
    {
      "code": "+505",
      "name": "Nicaragua"
    },
    {
      "code": "+227",
      "name": "Niger"
    },
    {
      "code": "+234",
      "name": "Nigeria"
    },
    {
      "code": "+683",
      "name": "Niue"
    },
    {
      "code": "+672",
      "name": "Norfolk Island"
    },
    {
      "code": "+850",
      "name": "North Korea"
    },
    {
      "code": "+1 670",
      "name": "Northern Mariana Islands"
    },
    {
      "code": "+47",
      "name": "Norway"
    },
    {
      "code": "+968",
      "name": "Oman"
    },
    {
      "code": "+92",
      "name": "Pakistan"
    },
    {
      "code": "+680",
      "name": "Palau"
    },
    {
      "code": "+970",
      "name": "Palestinian Territory"
    },
    {
      "code": "+507",
      "name": "Panama"
    },
    {
      "code": "+675",
      "name": "Papua New Guinea"
    },
    {
      "code": "+595",
      "name": "Paraguay"
    },
    {
      "code": "+51",
      "name": "Peru"
    },
    {
      "code": "+63",
      "name": "Philippines"
    },
    {
      "code": "+48",
      "name": "Poland"
    },
    {
      "code": "+351",
      "name": "Portugal"
    },
    {
      "code": "+1 787",
      "name": "Puerto Rico"
    },
    {
      "code": "+974",
      "name": "Qatar"
    },
    {
      "code": "+262",
      "name": "Reunion"
    },
    {
      "code": "+40",
      "name": "Romania"
    },
    {
      "code": "+7",
      "name": "Russia"
    },
    {
      "code": "+250",
      "name": "Rwanda"
    },
    {
      "code": "+685",
      "name": "Samoa"
    },
    {
      "code": "+378",
      "name": "San Marino"
    },
    {
      "code": "+966",
      "name": "Saudi Arabia"
    },
    {
      "code": "+221",
      "name": "Senegal"
    },
    {
      "code": "+381",
      "name": "Serbia"
    },
    {
      "code": "+248",
      "name": "Seychelles"
    },
    {
      "code": "+232",
      "name": "Sierra Leone"
    },
    {
      "code": "+65",
      "name": "Singapore"
    },
    {
      "code": "+421",
      "name": "Slovakia"
    },
    {
      "code": "+386",
      "name": "Slovenia"
    },
    {
      "code": "+677",
      "name": "Solomon Islands"
    },
    {
      "code": "+27",
      "name": "South Africa"
    },
    {
      "code": "+500",
      "name": "South Georgia and the South Sandwich Islands"
    },
    {
      "code": "+82",
      "name": "South Korea"
    },
    {
      "code": "+34",
      "name": "Spain"
    },
    {
      "code": "+94",
      "name": "Sri Lanka"
    },
    {
      "code": "+249",
      "name": "Sudan"
    },
    {
      "code": "+597",
      "name": "Suriname"
    },
    {
      "code": "+268",
      "name": "Swaziland"
    },
    {
      "code": "+46",
      "name": "Sweden"
    },
    {
      "code": "+41",
      "name": "Switzerland"
    },
    {
      "code": "+963",
      "name": "Syria"
    },
    {
      "code": "+886",
      "name": "Taiwan"
    },
    {
      "code": "+992",
      "name": "Tajikistan"
    },
    {
      "code": "+255",
      "name": "Tanzania"
    },
    {
      "code": "+66",
      "name": "Thailand"
    },
    {
      "code": "+670",
      "name": "Timor Leste"
    },
    {
      "code": "+228",
      "name": "Togo"
    },
    {
      "code": "+690",
      "name": "Tokelau"
    },
    {
      "code": "+676",
      "name": "Tonga"
    },
    {
      "code": "+1 868",
      "name": "Trinidad and Tobago"
    },
    {
      "code": "+216",
      "name": "Tunisia"
    },
    {
      "code": "+90",
      "name": "Turkey"
    },
    {
      "code": "+993",
      "name": "Turkmenistan"
    },
    {
      "code": "+1 649",
      "name": "Turks and Caicos Islands"
    },
    {
      "code": "+688",
      "name": "Tuvalu"
    },
    {
      "code": "+1 340",
      "name": "U.S. Virgin Islands"
    },
    {
      "code": "+256",
      "name": "Uganda"
    },
    {
      "code": "+380",
      "name": "Ukraine"
    },
    {
      "code": "+971",
      "name": "United Arab Emirates"
    },
    {
      "code": "+44",
      "name": "United Kingdom"
    },
    {
      "code": "+1",
      "name": "United States"
    },
    {
      "code": "+598",
      "name": "Uruguay"
    },
    {
      "code": "+998",
      "name": "Uzbekistan"
    },
    {
      "code": "+678",
      "name": "Vanuatu"
    },
    {
      "code": "+58",
      "name": "Venezuela"
    },
    {
      "code": "+84",
      "name": "Vietnam"
    },
    {
      "code": "+1 808",
      "name": "Wake Island"
    },
    {
      "code": "+681",
      "name": "Wallis and Futuna"
    },
    {
      "code": "+967",
      "name": "Yemen"
    },
    {
      "code": "+260",
      "name": "Zambia"
    },
    {
      "code": "+255",
      "name": "Zanzibar"
    },
    {
      "code": "+263",
      "name": "Zimbabwe"
    }
  ]`;
  countryCode = JSON.parse(countryCode);
  let contact_phone_number_code = "";
  let correspondence_phone_number_code = "";
  countryCode.forEach(el => {
    if (data.contact_phone_number_code ==  el.code) {
      contact_phone_number_code += `<option value="${el.code}" selected>${el.name} (${el.code})</option>`;
    } else {
      contact_phone_number_code += `<option value="${el.code}">${el.name} (${el.code})</option>`;
    }
    if (data.correspondence_phone_number_code == el.code) {
      correspondence_phone_number_code += `<option value="${el.code}" selected>${el.name} (${el.code})</option>`;
    } else {
      correspondence_phone_number_code += `<option value="${el.code}">${el.name} (${el.code})</option>`;
    }
  });
  let html =   `
                <div class="font-weight-normal" style="color: #ffff; background-color:#78335d; padding: 10px 0px; "> <h5 class="ml-3" style="font-waight : 350">Contact Information </h5> </div>
                <div class="textarea-ck">
                <div class="row header-profile text-left">
                    <div class="col-12 head-title">
                        <label class="form-level" for="contact_information">Address: </label>
                        <textarea id="contact_information" style="height : 100px" class="form_input" type="text" placeholder="Enter your contact address." required >${data.contact_information}</textarea>
                    </div>
                     <div class="col-12 head-title">
                        <label class="form-level" for="contact_office_number">Office phone number: </label>
                        <input type="tel" class="form_input d-inline" id="office_number" name="phone" placeholder="Enter your office number. 120 123 6548" required value = "${data.office_number}">
                    </div>
                    <div class="col-12 head-title">
                        <label class="form-level" for="contact_phone_number">Phone number: </label>
                        <div class="row">
                        <div class="col-sm-4">
                        <select class="form_select_input" name="countryCode" id="contact_phone_number_code">
                            <option data-countryCode="IN" value="+91">India (+91)</option>
                            <option data-countryCode="US" value="+1">USA (+1)</option>
                            <option data-countryCode="GB" value="+44">UK (+44)</option>
                            <optgroup label="Other countries">
                              ${contact_phone_number_code}
                            </optgroup>
                        </select>
                        </div>
                        <div class="col-sm-8">
                        <input type="text" class="form_input d-inline" id="contact_phone_number"  required value = "${data.contact_phone_number}" placeholder=" Mobile number 941 054 5482">
                        </div>
                        </div>
                    </div>
                    <div class="col-12 head-title">
                        <label class="form-level" for="contact_email">Email: </label>
                        <input id="contact_email" class="form_input" type="email" placeholder="example@gbu.ac.in" value="${data.contact_email}" required>
                    </div>
                </div> </div> <div class="font-weight-normal" style="color: #ffff; background-color:#78335d; padding: 10px 0px; "> <h5 class="ml-3" style="font-waight : 350">Correspondence Address</h5> </div>
                <div class="textarea-ck">
                <div class="row header-profile text-left">
                    <div class="col-12 head-title">
                        <label class="form-level" for="correspondence_address">Address: </label>
                        <textarea id="correspondence_address" style="height : 100px" class="form_input" type="text" placeholder="Enter your contact address." required >${data.correspondence_address}</textarea>
                    </div>
                    <div class="col-12 head-title">
                        <label class="form-level" for="correspondence_phone_number">Phone number: </label>
                        <div class="row">
                        <div class="col-sm-4">
                        <select class="form_select_input" name="countryCode" id="correspondence_phone_number_code">
                            <option data-countryCode="IN" value="+91">India (+91)</option>
                            <option data-countryCode="US" value="+1">USA (+1)</option>
                            <option data-countryCode="GB" value="+44">UK (+44)</option>
                            <optgroup label="Other countries">
                              ${correspondence_phone_number_code}
                            </optgroup>
                        </select>
                        </div>
                        <div class="col-sm-8">
                        <input type="text" class="form_input d-inline" id="correspondence_phone_number"  required value="${data.correspondence_phone_number}" placeholder = "Mobile number. 975 515 4586 ">
                        </div>
                        </div>
                    </div>
                    <div class="col-12 head-title">
                        <label class="form-level" for="correspondence_email">Email: </label>
                        <input id="correspondence_email" class="form_input" type="email" placeholder="example@mail.com" value="${data.correspondence_email}" required>
                    </div>
                </div> </div>`;

  // function getConCode(contact, coresponding) {
  //   if (contact) {
  //     var contCode = contact.split("-")[0];
  //     var contNumber = contact.split("-")[1];
  //     data.contact_phone_number = contNumber;
  //   }
  //   if (coresponding) {
  //     var coresCode = coresponding.split("-")[0];
  //     var coresNumber = coresponding.split("-")[1];
  //     data.correspondence_phone_number = coresNumber;
  //   }
  // }

  // var code1 = contact.match(/\d+\-/g)[0];
  // console.log(contact.match(/\d+\-/g)[1]);
  // data.contact_phone_number = code1;

  // // if (code1) {
  // //     code1 = code1.replace('-', '');
  // //     html = html.replace('<%CODE1%>', '<option value="' + code1 + '" selected > (+' + code1 + ')</option>')
  // // } else {
  // //     html = html.replace('<%CODE1%>', ' <option data-countryCode="IN" value="91">India (+91)</option>')
  // // }

  // var code2 = coresponding.match(/\d+\-/g)[0];
  // // code2 = code1.replace('-', '');
  // data.correspondence_phone_number = code2;
  // console.log(code2);
  // // if (code2) {
  // //     code2 = code2.replace('-', '');
  // //     html = html.replace('<%CODE2%>', '<option value="' + code2 + '" selected > (+' + code2 + ')</option>')
  // // } else {
  // //     html = html.replace('<%CODE2%>', ' <option data-countryCode="IN" value="91">India (+91)</option>')
  // // }

  return html;
};
