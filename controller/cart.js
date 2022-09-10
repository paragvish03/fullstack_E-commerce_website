
const { Cart, Product } = require('../models')

async function updateCart(req, res) {
    const cartId = req.params.id;
    try {
        const xcart = await Cart.findByPk(cartId);
        if (xcart) {

            const productIds = req.body.productIds;
            //const alreadyAddedProducts = await cart.getProduct();

            const products = await Product.findAll({ where: { id: productIds } })


            if (products.length > 0) {
                console.log(xcart,products)

               await xcart.setProduct(products)
                console.log('\n hello2')

               // const cartProducts = await cart.getProduct()

                let totalCost = 0;
                const addedProducts = []

            
               // res.send({ totalCost, addedProducts })
               console.log('>>>><<<<<<<<<<<>>>>>>><<<<<<')
            } else {
                res.status(400).send({ msg: 'Products does not exist' })
            }

        } else {
            res.status(400).send({ msg: 'hello Cart does not exist' })
        }

    } catch (err) {
        res.status(500).send({ msg: 'Internal server error', err })
    }
}

async function getCart(req, res) {
    const cartId = req.params.id;
    try {
        const cart = await Cart.findByPk(cartId);
        if (cart) {
            const cartProducts = await cart.getProduct()

            let totalCost = 0;
            const addedProducts = []

            for (let i = 0; i < cartProducts.length; i++) {

                totalCost = totalCost + cartProducts[i].dataValues.cost;

                addedProducts.push({
                    id: cartProducts[i].dataValues.id,
                    name: cartProducts[i].dataValues.name,
                    cost: cartProducts[i].dataValues.cost,
                    description: cartProducts[i].dataValues.description
                })
            }
            res.send({ totalCost, addedProducts })
        } else {
            res.status(400).send({ msg: 'bye Cart does not exist' })
        }

    } catch (err) {
        res.status(500).send({ msg: 'Internal server error', err })
    }
}

async function update_cart(req,res){
let cartid = req.params.id





}


module.exports = { updateCart, getCart }