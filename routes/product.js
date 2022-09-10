const { sequelize, Cart, Product } = require('../models')
const router = require('express').Router()
const { check_token, check_roles } = require('../middlware/authjwt')
const { Op } = require('sequelize')


//CATEGORY SEARCH
router.get('/product', async (req, res) => {
    let result = await Product.findAll()

    res.render('index2', { userData: result })
    // res.json(result)
})
router.get('/product/smartphone', async (req, res) => {
    let result = await Product.findAll({ where: { CategoryId: "2" } })

    res.render('index2', { userData: result })
    // res.json(result)
})
router.get('/product/watch', async (req, res) => {
    let result = await Product.findAll({ where: { CategoryId: "1" } })
    res.render('index2', { userData: result })
    // res.json(result)
})
router.get('/product/laptop', async (req, res) => {
    let result = await Product.findAll({ where: { CategoryId: "3" } })
    res.render('index2', { userData: result })
    // res.json(result)
})
router.get('/product/earphone', async (req, res) => {
    let result = await Product.findAll({ where: { CategoryId: "4" } })
    res.render('index2', { userData: result })
    // res.json(result)
})


//product details
router.get('/product/:id', async (req, res) => {
    id = req.params.id
    let result = await Product.findOne({ where: { id: id } })
    res.render('details', { userData: result })
    // res.json(result)
})


//SEARCH FROM search BAR
router.get('/product/search', async (req, res) => {
    search1 = req.body.search1
    console.log(search1)
    let result = await Product.findAll({ where: { name: { [Op.like]: `${search}%` }, }, })
    res.render('index2', { userData: result })
    // res.json(result)
})
//search between range for mobiles smartphones
router.get('/product/smartphone/filter', async (req, res) => {
    search1 = req.query.search1
    search2 = req.query.search2
    console.log(req.query)
    let result = await Product.findAll({ where: { CategoryId: "2", price: { [Op.between]: [`${search1}`, `${search2}`] }, }, })
    res.render('index2', { userData: result })
    // res.json(result)
})

router.get('/product/laptop/filter', async (req, res) => {
    search1 = req.query.search1
    search2 = req.query.search2
    console.log(req.query)
    let result = await Product.findAll({ where: { CategoryId: "3", price: { [Op.between]: [`${search1}`, `${search2}`] }, }, })
    res.render('index2', { userData: result })
    // res.json(result)
})




//admin access ONLY
router.get('/admin', [check_token], (req, res) => {

    res.render('admin')

})
router.post('/add/product', async (req, res) => {
    detail = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        CategoryId: req.body.CategoryId,
        url: req.body.url,
        about: req.body.about
    }
    let result = await Product.create(detail)

    res.render('admin', { message: "added" })


})

router.delete('/add/delete', async (req, res) => {
    id = req.body.id
    let result = await Product.destroy({ where: { id: id } })
    res.send({ mssge: "deleted product" })

})

router.put('/add/modify', async (req, res) => {
    id = req.body.id
    let result = await Product.update(req.body, { where: { id: id } })
    res.send({ mssge: "deleted product" })
})


module.exports = {
    productRoutes: router
}

//,[check_token,check_roles],