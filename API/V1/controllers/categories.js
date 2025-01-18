const mongoose = require('mongoose');
const CategoryModel = require('../models/categories');

module.exports = {
    getAll: (req, res) => {
        try {
            CategoryModel.find()
                .then((categories) => res.status(200).json(categories))
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
            CategoryModel.find({ Cid: req.params.id })
                .then((categories) => {
                    if (categories.length === 0) {
                        return res.status(404).json({ msg: `Category with Cid ${req.params.id} not found` });
                    }
                    res.status(200).json(categories);
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
            if (!req.body || Object.keys(req.body).length === 0) {
                return res.status(400).json({ message: "Invalid request body" });
            }

            const data = await CategoryModel.insertMany([req.body]);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error adding new category:", error);
            return res.status(500).json({ message: "Failed to add category", error });
        }
    },

    updateById: (req, res) => {
        try {
            CategoryModel.updateOne({ Cid: req.params.id }, req.body)
                .then((data) => {
                    return res.status(200).json(data);
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

    deleteById: (req, res) => {
        const catId = req.params.id;
        CategoryModel.findOneAndDelete({ Cid: catId })
            .then((deletedCategory) => {
                if (!deletedCategory) {
                    return res.status(404).json({ msg: `Category with Cid ${catId} not found` });
                }
                res.status(200).json({ msg: `Category deleted`, category: deletedCategory });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ msg: `Error server number 505`, error: err.message });
            });
    }
};
