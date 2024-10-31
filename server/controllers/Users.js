const User = require("../models/User");
var moment = require("moment");

exports.List = async (req, res, next) => {
  const query = req.query;
  try {
    const rows = await User.findAll({ where: query });
    return res.json({
      success: true,
      data: rows
    });
  } catch (error) {
    next(error);
  }
};
