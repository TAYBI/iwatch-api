const OrderItem = require("../models/orderItem.model");

exports.createOrderItem = async (req, res) => {
  try {
    console.log(req.body);
    const orderItem = await OrderItem.create(req.body);
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderItems = async (req, res) => {
  try {
    const orderItems = await OrderItem.find({});
    res.status(200).json(orderItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getOrderItemById = async (req, res) => {
  try {
    const orderItem = await OrderItem.findById(req.params.id);
    if (!orderItem)
      return res.status(404).json({ message: "Order Item not found" });
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!orderItem)
      return res.status(404).json({ message: "Order Item not found" });
    res.status(200).json(orderItem);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteOrderItem = async (req, res) => {
  try {
    const orderItem = await OrderItem.findByIdAndDelete(req.params.id);
    if (!orderItem)
      return res.status(404).json({ message: "Order Item not found" });
    res.status(200).json({ message: "Order Item deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
