const oracle = require("../config/oracle");
var jwt = require("jsonwebtoken");

const getStaffPassword = async (staff_id) => {
  const sql = `select user_pw AS PASS from ut_co_user_mst where user_id='${staff_id}';`
  try{
    const [rows, fields] = await oracle.query(sql);
    if(rows.length > 0){
      return rows[0]['PASS'];
    }else{
      return null;
    }
  }catch(e){
    logger.error(e);
    console.log(e);
  }
}

const getToken = async (staff_id) => {
  let user =  "API_USER";
  let password = "bHu:Q7";
  if(staff_id){
    if(staff_id != 'API_USER'){
      const pass = await getStaffPassword(staff_id);
      if(pass){
        user = staff_id;
        password = pass;
      }
    }
  }
  const raw = JSON.stringify({
    user: user,
    password: password,
  });

  try {
    const url = "http://10.0.125.17:88/api/v1/auth/login";
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    // myHeaders.append("Authorization", "Bearer " + token);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json["result"]["access_token"];
  } catch (error) {
    return error;
  }
};

async function getTin(taxId) {
  const url = `https://api.ebarimt.mn/api/info/check/getTinInfo?regNo=${taxId}`;
  const options = { method: "GET", headers: { Accept: "application/json" } };
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data["data"].toString();
  } catch (error) {
    console.error(error);
  }
}

function checkTypes(arr) {
  const types = new Set();

  for (const item of Object.values(arr)) {
    types.add(item["billType"]);
    // If more than one type is found, we can stop early
    if (types.size > 2) {
      return "ALL";
    }
  }

  if (types.has("PPD") && !types.has("PST")) {
    return "PPD";
  } else if (!types.has("PPD") && types.has("PST")) {
    return "PST";
  } else {
    return "ALL";
  }
}

function calculateVat(amount) {
  // let vat = 11 * amount;
  let vat = amount / 11;
  // vat = vat / 100;
  if (!isInt(vat)) {
    return round(vat, 2);
  }
  return vat;
}

function isInt(n) {
  return n % 1 === 0;
}

function round(num, decimalPlaces = 0) {
  var p = Math.pow(10, decimalPlaces);
  var n = num * p * (1 + Number.EPSILON);
  return Math.round(n) / p;
}

function calcClassCode(domains) {
  if (domains.has(4) && domains.size == 1 || domains.has(4) && domains.has(5) && domains.size == 2) {
    return { code: "8429000", name: "Интернэт,Цахилгаан холбооны үйлчилгээ" };
  } else if (domains.has(5) && domains.size == 1) {
    return { code: "8412100", name: "Cуурин утасны үйлчилгээ" };
  } else {
    return {
      code: "8419000",
      name: "Цахилгаан холбооны бусад төрлийн үйлчилгээ",
    };
  }
}

function getStaffId(header) {
  if (typeof header != "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    try {
      var decoded = jwt.verify(token, "invoice");
      if (decoded) {
        return decoded;
      }
    } catch (e) {
      throw e;
    }
  }
}
function tokenToValue(raw){
  try {
    var decoded = jwt.verify(raw, "invoice");
    if (decoded) {
      return decoded;
    }
  } catch (e) {
    throw e;
  }
}

async function getDistrictCode(cust_id) {
  const statement = `select get_district_id(${cust_id}) as code from dual;`;
  try {
    const [rows, fields] = await oracle.query(statement);
    return rows[0]["CODE"];
  } catch (e) {
    throw e;
  }
}

module.exports = { getToken, getTin, checkTypes, calculateVat, isInt, round, calcClassCode, getStaffId, getDistrictCode, tokenToValue};
