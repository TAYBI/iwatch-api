const express = require("express");
const router = express.Router();

const {
  createOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
} = require("../controllers/orderItem.controller");

router.post("/", createOrderItem);
router.get("/:id", getOrderItemById);
router.put("/:id", updateOrderItem);
router.delete("/:id", deleteOrderItem);

module.exports = router;
