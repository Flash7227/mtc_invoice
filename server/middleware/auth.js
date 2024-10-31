function check(req, res, next) {
 
    const header = req.headers["authorization"];
    if (typeof header != "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        var jwt = require("jsonwebtoken");
        try {
            var decoded = jwt.verify(token, "invoice");
            if (decoded) {
                next();
                return res.status(200);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return res.status(401).json({
        success: false,
        message: "Дахин нэвтэнэ үү!",
        data: [],
    });
}

function checkAdmin(req, res, next) {
    const header = req.headers["authorization"];
    if (typeof header != "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];
        var jwt = require("jsonwebtoken");
        try {
            var decoded = jwt.verify(token, "invoice");
            if (decoded) {
                if (JSON.parse(decoded["user"]["menu"]).includes('admin')) {
                    next();
                    return res.status(200);
                } else {
                    return res.status(401).json({
                        success: false,
                        message: "Эрх хүрэхгүй байна",
                        data: [],
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
    return res.status(401).json({
        success: false,
        message: "Дахин нэвтэнэ үү!",
        data: [],
    });
}

module.exports = { check, checkAdmin };
