const helper = require("../utils/helper");

exports.OtherList = async (req, res) => {
  const token = await helper.getToken();
    const url = process.env.API_BILL + "/bs/charge/otherpym?all";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });
      const json = await response.json();
      return res.json({ success: true, data: json['objects'] });
    } catch (e) {
      console.log(e);
    }
  }