const indexCtrl = {};

indexCtrl.renderPrincipal = (req, res) => {
    res.render('principal')
};

indexCtrl.renderMetodoPago = (req, res) => {
    res.render('shop/payments')
};


module.exports = indexCtrl;