const { mongo } = require('mongoose');
const Order = require('../models/orderModel');
const createHttpError = require('http-errors');
const mongoose = require('mongoose');

const addOrder = async(req, res, next) => {

    try {

        const order = new Order(req.body);
        await order.save();
        res.status(201).json({success: true, message: "Order added successfully", data: order});

    } catch (error) {
        next(error);
    }

}

const getOrderById = async(req, res, next) => {

    try {

        const { id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid Order ID"));
        }

        const order = await Order.findById(req.params.id);
        if (!order) {
            return next(createHttpError(404, "Order not found"));
        }
        res.status(200).json({success: true, data: order});

    } catch (error) {
        next(error);
    }
}

const getOrders = async(req, res, next) => {

    try {

        const orders = await Order.find();
        res.status(200).json({success: true, data: orders});

    } catch (error) {
        next(error);
    }

}

const updateOrder = async(req, res, next) => {

    try {

        const { orderStatus } = req.body;
        const{ id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return next(createHttpError(404, "Invalid Order ID"));
        }

        const order = await Order.findByIdAndUpdate(id, { orderStatus }, { new: true });

        if (!order) {
            return next(createHttpError(404, "Order not found"));
        }
        res.status(200).json({success: true, message: "Order updated successfully", data: order});

    } catch (error) {
        next(error);
    }

}



module.exports = { addOrder, getOrderById , updateOrder, getOrders };