const oracle = require("../config/oracle");
const logger = require("../utils/logger");

exports.Send = async (req, res) => {
  const url = process.env.POSAPI_URL + "/rest/sendData";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status == 200) {
      return res.json({
        success: true,
        data: response.status,
        message: "Мэдээлэл илгээгдлээ",
      });
    } else {
      return res.json({
        success: false,
        data: response.status,
        message: response.status,
      });
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

exports.Banks = async (req, res, next) => {
  // const url = process.env.POSAPI_URL + "/rest/bankAccounts?tin=" + process.env.POS_TIN;
  const url = "http://10.0.124.100:7080" + "/rest/bankAccounts?tin=" + process.env.POS_TIN;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return res.json({ success: true, data: json });
  } catch (e) {
    console.log(e);
  }
};

exports.addressCodeUpdate = async (req, res, next) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const url = "https://api.ebarimt.mn/api/info/check/getBranchInfo";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: myHeaders,
    });
    const json = await response.json();
    if (json["data"].length > 0) {
      let statement = "DELETE FROM MTC_EBARIMT_INV_ADDRESS_CODE";
      const [rows, fields] = await oracle.query(statement);

      for (const each of json["data"]) {
        await oracle.query(
          `INSERT INTO MTC_EBARIMT_INV_ADDRESS_CODE (BRANCHCODE, BRANCHNAME, SUBBRANCHCODE, SUBBRANCHNAME) VALUES('${each["branchCode"]}', '${each["branchName"]}', '${each["subBranchCode"]}', '${each["subBranchName"]}')`
        );
      }
    }
    return res.json({
      success: true,
      data: [],
      message: "Updated with " + json["data"].length + " rows",
    });
  } catch (e) {
    return res.json({
      success: false,
      data: [],
      message: e.message,
    });
  }
};

exports.addressCodeList = async (req, res, next) => {
  try {
    const [rows, fields] = await oracle.query(
      `SELECT * FROM MTC_EBARIMT_INV_ADDRESS_CODE;`
    );
    return res.json({
      success: true,
      data: rows,
    });
  } catch (e) {
    throw e;
  }
};



exports.Locations = async (req, res, next) => {
  const sql = `SELECT  ID, ID_NAME,EXCHANGE FROM MTC_EBARIMT_INV_CODE WHERE ID=4 ORDER BY EXCHANGE`;
  try {
    const [loc, locFields] = await oracle.query(sql);
    return res.json({
      success: true,
      data: loc
    })
  } catch (e) {
    console.log(e);
    return res.json({
      success: false,
      message: e.message
    })
  }
}

