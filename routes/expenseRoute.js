//router config

const expenseRouter = require("express").Router();

// getting controllers for expense

const {
  createExpense,
  getExpenses,
  getExpenseByID,
  deleteExpense,
  updateExpense,
} = require("../controllers/expenseController");

/*****************create new expense*******************/

expenseRouter.post("/api/expense", createExpense);

/*******************update expense*********************/

expenseRouter.patch("/api/expense/:id", updateExpense);

/*****************get all expense**********************/

expenseRouter.get("/api/expense", getExpenses);

/*****************get single expense*******************/

expenseRouter.get("/api/expense/:id", getExpenseByID);

/******************delete expense**********************/

expenseRouter.delete("/api/expense/:id", deleteExpense);

module.exports = expenseRouter;
