const math = require("mathjs")
const express = require("express");
const app = express();
const PORT = process.env.PORT || 80;

function split(str, index) {
    const result = [str.slice(0, index), str.slice(index)];
    return result;
}

app.get("/api" , (req, res) => {
    if (req.query.hasOwnProperty("eq")){
        eq = req.query.eq;
        equation = eq.replace(" ", "+");
        try{
            sol = math.evaluate(equation);
            res.send({
                equation: equation,
                result: sol
            });
        }
        catch(err){
            errStr = err.toString() + " in the equation";
            splitAt = errStr.indexOf(":");
            errType = errStr.slice(0, splitAt);
            error = errStr.slice(splitAt + 2, this.END);
            errObj = {
                Type: errType,
                Error: error
            };
            res.send(errObj);
        }
    }
});

app.listen(PORT, () => {
    console.log("listening to the port " + PORT);
});