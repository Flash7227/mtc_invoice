const oracle = require("../config/oracle");
const helper = require("../utils/helper");
var moment = require("moment");
const logger = require("../utils/logger");

exports.Cust = async (req, res) => {
  const input = req.query;
  const token = await helper.getToken();
  const url = `${process.env.API_BILL}/subs/customer/${input["id"]}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json["result"]["code"] == 0) {
    if (json["objects"].length == 0) {
      return res.json({ success: false, message: "Хэрэглэгч олдсонгүй" });
    }
    const addr = await getAddr(token, json["objects"][0]["addrId"]);
    json["objects"][0]["address"] = addr;
    return res.json({ success: true, data: json["objects"][0] });
  }
  return res.json({
    success: false,
    data: json
  });
}

exports.CustInfo = async (req, res) => {
  const input = req.query;
  const token = await helper.getToken();
  const url = `${process.env.API_BILL}/subs/customer?${input["type"]}=${input["id"]}&total=true&nitem=10&page=${input["page"]}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json["result"]["code"] == 0) {
    json["input"] = input;
    return res.json({ success: true, data: json });
  } else {
    return res.json({ success: false, data: json, message: "Хэрэглэгч олдсонгүй" });
  }
}

exports.Subs = async (req, res) => {
  const input = req.query;
  const token = await helper.getToken();
  const url = `${process.env.API_BILL}/subs/subscriber?${input["type"]}=${input["id"]}&total=true&nitem=10&incTerm=false&page=${input['page']}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json["result"]["code"] == 0) {
    return res.json({ success: true, data: json });
  }
  return res.json({ success: false, data: json });
}

const getAddr = async (token, addrId) => {
  const url = `${process.env.API_BILL}/subs/address/${addrId}/extension`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    if (json["result"]["code"] == 0) {
      return json["objects"][0]["fullAddress"];
    }
  } catch (e) {
    console.log(e);
  }
  return null;
};


exports.Products = async (req, res) => {
  const custId = req.query.custId;
  const token = await helper.getToken();
  const prepaid = await getPrePaid(token, custId);
  const postpaidSubs = await findPostPaidSubs(token, custId);
  const postpaid = await getPostPaid(token, postpaidSubs);
  return res.json({
    success: true,
    data: {
      prepaid: prepaid,
      postpaid: postpaid,
      // billAcntId: postpaidSubs ? postpaidSubs.billAcntId : null
    }
  });
}

const getPrePaid = async (token, custId) => {
  const url = `${process.env.API_BILL}/subs/customer/${custId}/account?billType=PPD`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json["result"]["code"] == 0) {
    return json["objects"];
  }
  return [];
}

const findPostPaidSubs = async (token, custId) => {
  const url = `${process.env.API_BILL}/subs/subscriber?custId=${custId}&billType=PST`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const response = await fetch(url, options);
  const json = await response.json();
  if (json["objects"].length > 0) {
    const filtered = json.objects.filter(row => !row.subs.userId.includes('B'));
    if (filtered[0]) {
      return filtered[0]['subs'];
    } else {
      return json["objects"][0]['subs'];
    }
  }
  return null;
}

const getPostPaid = async (token, subs) => {
  if (subs) {
    const currentMonth = moment().format("YYYYMM");
    const lastMonth = moment().subtract(3, "months").format("YYYYMM");
    const url = `${process.env.API_BILL}/bs/charge/hist/subscriber/${subs['subsId']}?from=${lastMonth}&until=${currentMonth}&billAcntId=${subs['billAcntId']}&searchType=billAcntId&total=true&nitem=10&page=1`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      if (json["objects"]) {
        json["objects"].map((d) => (d["userId"] = subs['userId'])); //USERID = 0 BUGD IRSENG HUVIRGASAN GHDE YAGAD GDGIIG SANAHQ BN
        return json["objects"];
      }
    } catch (e) {
      console.log(e);
    }
  }
  return [];
};