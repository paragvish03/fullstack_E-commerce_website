const { sequelize, Cart, Product } = require('../models')
const router = require('express').Router()
const { check_token, check_roles } = require('../middlware/authjwt')



// cart add
router.get('/cart/add/product/:id', [check_token], async (req, res) => {
    let id = req.params.id;
    let cartid = req.UserID

    let result = await Cart.findOne({ where: { id: cartid } })
    let productid = await Product.findOne({ where: { id: id } })

    if (result) {
        //create cart
        let cartaddproduct = await productid.addCart(result)
        ///console.log(result)
        res.send({ mssge: "added into product" })
    } else {


        res.send({ mssge: "problem in cart" })
    }

})

//carts function
router.get('/user/cart/details', [check_token], async (req, res) => {

    let cartId = req.UserID
    let result = await Cart.findByPk(cartId)

    if (result) {

        //let cartId = req.UserID
        let cartitems = await Product.findAll({

            include: { model: Cart, where: { id: cartId } },

        });
        let totalsum = 0;
        for (let i = 0; i < cartitems.length; i++) {
            totalsum += cartitems[i].dataValues.price
        }

       // console.log("><><><><>" + totalsum)
        res.render('cart', { cartitems, totalsum })

        //res.send(cartitems[5].dataValues.name)
    } else {
        res.send({ message: "error with cart" })

    }

})

//cart remove items
router.get('/user/cart/details/:id',[check_token], async (req, res) => {
    let id = req.params.id
    let cartId = req.UserID
    let result = await Cart.findByPk(cartId)
    let productID = await Product.findByPk(id)

    if (result) {

        //let cartId = req.UserID
        let cartitems = await result.removeProduct(productID);
        let totalsum = 0;
        for (let i = 0; i < cartitems.length; i++) {
            totalsum += cartitems[i].dataValues.price
        }

       // console.log("><><><><>" + totalsum)
       // res.render('cart')

     res.send({mssge:"cartitems removed successfully"})
    } else {
        res.send({ message: "error with cart" })

    }

})



module.exports = {cartRoutes : router}