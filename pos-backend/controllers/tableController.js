const createHttpError = require('http-errors');
const Table = require('../models/tableModel');
const tableModel = require('../models/tableModel');
const mongoose = require('mongoose');


const addTable = async (req, res, next) => {
    try {

        const { tableNo, seats } = req.body;

        if (!tableNo) {
            return next(createHttpError(400, "Table number is required"));
        }

        const isTablePresent = await Table.findOne({ tableNo });

        if (isTablePresent) {
            const error = createHttpError(400, "Table already exists");
            return next(error);
        }

        const newTable = await Table.create({ tableNo, seats });
        res.status(201).json({ success: true, message: "Table created successfully", data: newTable });
    } catch (error) {
        next(error);
    }
}

const getTables = async (req, res, next) => {

    try {

        const tables = await Table.find().populate({
            path: "currentOrder",
            select: "customerDetails"
        });
        res.status(200).json({ success: true, data: tables });

    } catch (error) {
        next(error);
    }

}

const updateTable = async (req, res, next) => {

    try {

        const { status, orderId } = req.body;
        
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid Order ID"));
        }

        const table = await Table.findByIdAndUpdate(id, { status, currentOrder: orderId }, { new: true });

        if (!table) {
            return next(createHttpError(404, "Table not found"));
        }
        res.status(200).json({ success: true, message: "Table updated successfully", data: table });
    } catch (error) {
        next(error);
    }

}

module.exports = { addTable, getTables, updateTable };