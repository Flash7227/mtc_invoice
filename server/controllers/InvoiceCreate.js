exports.Calculate = async (req, res) => {
    const body = req.body;
    if(body.postpaid){

    }
    if(body.prepaid){

    }
    if(body.other){

    }
    console.log(body);
    return res.json(req.body);
}