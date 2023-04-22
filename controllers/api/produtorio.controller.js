var express = require("express");
var router = express.Router();


router.get('/', produtorio);

module.exports = router;

function calcRecursive(m, n) {
    if (m == n)
        return m + 1/m;
    
    return calcRecursive(m + 1, n) * (m + 1/m);
}

function calcIterative(m, n) {
    let result = 1;
    for (let i = m; i <= n; i++) {

        result *= i + 1/i;
    }
    return result;
}
 
 async function produtorio(req, res) {
    
    if ((req.query.mode != 'iterative' && req.query.mode != 'recursive') || !(parseInt(req.query.m) > 0) || !(parseInt(req.query.n) >= parseInt(req.query.m)))
        return res.status(400).send({
            error: 'parâmetro(s) inválido(s)',
            pattern: '?mode={recursive|iterative}&m={number greater than zero}&n={number greater than or equal to m}'
        });
    
    let limInf = parseInt(req.query.m);
    let limSup = parseInt(req.query.n);
    
    if (req.query.mode == 'recursive')
        return res.status(200).send({result: calcRecursive(limInf, limSup)});
    else if (req.query.mode == 'iterative')
        return res.status(200).send({result: calcIterative(limInf, limSup)});
}
