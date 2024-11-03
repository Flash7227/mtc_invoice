const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.List = async (req, res) => {
    const rows = await User.findAll();
    return res.send({
        success: true,
        data: rows
    })
}

exports.Login = async (req, res) => {
    const body = req.body;
    try {
        const row = await User.findOne({ where: { username: body.bill_username } });
        if (row) {
            const checkLogin = await billLogin(body);
            if (checkLogin["code"] == 0) {
                const token = jwt.sign({ user: row }, process.env.JWT_SECRET, {
                    expiresIn: "4h",
                });
                res.cookie("INVOICE_USERNAME", row["username"], {
                    maxAge: 14400000,
                    httpOnly: false,
                });
                res.cookie("INVOICE_TOKEN", token, { maxAge: 14400000, httpOnly: false });
                res.cookie("INVOICE_MENU", row["menu"], { maxAge: 14400000, httpOnly: false });
                res.cookie("INVOICE_AREA", row["area"], { maxAge: 14400000, httpOnly: false });
                res.cookie("INVOICE_DESC", row["desc"], { maxAge: 14400000, httpOnly: false });
                return res.send({
                    success: true,
                    message: "Амжилттай нэвтэрлээ.",
                    data: row
                })
            } else {
                return res.send({
                    success: false,
                    message: "Нууц үг буруу байна."
                })
            }
        } else {
            return res.send({
                success: false,
                message: "Нэвтрэх эрхгүй байна."
            })
        }
    } catch (e) {
        return res.send({
            success: false,
            message: e.message
        })
    }
}

exports.Logout = async (req, res) => {
    res.cookie("INVOICE_USERNAME", "", { maxAge: 0, httpOnly: false });
    res.cookie("INVOICE_TOKEN", "", { maxAge: 0, httpOnly: false });
    res.cookie("INVOICE_MENU", "", { maxAge: 0, httpOnly: false });
    res.cookie("INVOICE_AREA", "", { maxAge: 0, httpOnly: false });
    res.cookie("INVOICE_DESC", "", { maxAge: 0, httpOnly: false });
    return res.send({
        success: true,
        message: "Системээс гарлаа."
    })
}

const billLogin = async (input) => {
    const body = {
        user: input["bill_username"],
        password: input["password"],
    };
    try {
        const url = process.env.API_BILL + "/auth/login";
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        };
        const response = await fetch(url, requestOptions);
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
}