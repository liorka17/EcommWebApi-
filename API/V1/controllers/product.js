const mongoose = require('mongoose');
const ProductModel = require('../models/product');

module.exports = {
    getAll: (req, res) => {
        try {
            ProductModel.find()
                .then((products) => res.status(200).json(products))
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ msg: `500 server error`, error: err.message });
                });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: `500 server error`, error: err.message });
        }
    },

    getById: (req, res) => {
        try {
            ProductModel.find({ Pid: req.params.id })
                .then((products) => {
                    if (products.length === 0) {
                        return res.status(404).json({ msg: `Product with pid ${req.params.id} not found` });
                    }
                    res.status(200).json(products);
                })
                .catch((err) => {
                    console.error(err);
                    res.status(500).json({ msg: `500 server error`, error: err.message });
                });
        } catch (err) {
            console.error(err);
            res.status(500).json({ msg: `500 server error`, error: err.message });
        }
    },
    addNew: async (req, res) => {
        try {
            // וודא ש-body לא ריק
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Invalid request body" });
            }
    
            // הכנס את המוצר למסד הנתונים
            const data = await ProductModel.insertMany([req.body]);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error adding new product:", error);
            return res.status(500).json({ message: "Failed to add product", error });
        }
    },    
    // addNew: (req, res) => {
    //     const product = new ProductModel({
    //         _id: new mongoose.Types.ObjectId(),
    //         Pname: req.body.Pname,
    //         Price: req.body.Price,
    //         Picname: req.body.Picname,
    //         Pdesc: req.body.Pdesc,
    //         Cid: req.body.Cid,
    //         Pid: req.body.Pid
    //     });
    //     product.save()
    //         .then((savedProduct) => res.status(200).json({ msg: `New product added`, product: savedProduct }))
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ msg: `Error server number 505`, error: err.message });
    //         });
    // },

    updateById:(req,res)=>{
        try{
                ProductModel.updateOne({Pid:req.params.id},req.body).then((data)=>
                {
                    return res.status(200).json(data);
                });
        }
        catch
        {
            return res.status(500).json({msg:`500 server error`})
        }
    },
    // updateById: (req, res) => {
    //     const prodid = req.params.id;
    //     ProductModel.findOneAndUpdate(
    //         { Pid: prodid },
    //         {
    //             Pid: req.body.Pid,
    //             Pname: req.body.Pname,
    //             Price: req.body.Price,
    //             Picname: req.body.Picname,
    //             Pdesc: req.body.Pdesc,
    //             cid: req.body.cid,
    //         },
    //         { new: true }
    //     )
    //         .then((updatedProduct) => {
    //             if (!updatedProduct) {
    //                 return res.status(404).json({ msg: `Product with Pid ${prodid} not found` });
    //             }
    //             res.status(200).json({ msg: `Product updated`, product: updatedProduct });
    //         })
    //         .catch((err) => {
    //             console.error(err);
    //             res.status(500).json({ msg: `Error server number 505`, error: err.message });
    //         });
    // },

    deleteById: (req, res) => {
        const prodid = req.params.id;
        ProductModel.findOneAndDelete({ Pid: prodid })
            .then((deletedProduct) => {
                if (!deletedProduct) {
                    return res.status(404).json({ msg: `Product with Pid ${prodid} not found` });
                }
                res.status(200).json({ msg: `Product deleted`, product: deletedProduct });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ msg: `Error server number 505`, error: err.message });
            });
    }
};
