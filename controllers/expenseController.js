const Expense = require("../models/expenseModel");
const jwt = require("jsonwebtoken");
const { getTokenFrom } = require("../utils/helper");
const { JWT_SECRET } = require("../utils/config");

// Create New Expense
const createExpense = async (req, res) => {
  try {
    //verify user token

    const token = getTokenFrom(req);

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    //getting data from FE

    const { category, amount, date, description } = req.body;

    //   Validation
    if (!category || !amount || !date || !description) {
      return res.status(401).json({ message: "Please fill all fields" });
    }

    // Create Expense
    const expense = await Expense.create({
      user: decodedToken.id,
      category,
      amount,
      date,
      description,
    });

    //sending response data to FE

    res.status(201).json({ message: "Expense added Successfully" });
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all Expenses
const getExpenses = async (req, res) => {
  try {
    //verify user token

    const token = getTokenFrom(req);

    if (!token) {
      return res.status(401).json({ message: "not Authorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    const expenses = await Expense.find({ user: decodedToken.id }).sort(
      "-createdAt"
    );

    //sending response data to FE

    res.status(200).json(expenses);
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get single Expense
const getExpenseByID = async (req, res) => {
  try {
    //verify user token

    const token = getTokenFrom(req);

    if (!token) {
      return res.status(401).json({ message: "not authorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    const expense = await Expense.findById(req.params.id);

    //sending response data to FE

    res.status(200).json(expense);
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  try {
    //verfiy user token

    const token = getTokenFrom(req);

    if (!token) {
      return res.status(401).json({ message: "Not Authorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    const expense = await Expense.findById(req.params.id);

    // if Expense doesnt exist
    if (!expense) {
      return res.status(401).json({ message: "Expense not found" });
    }

    await expense.remove();

    const updatedExpenseList = await Expense.find({ user: decodedToken.id });

    //sending response data to FE

    res.status(200).json({ updatedExpenseList });
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  try {
    //verify user token

    const token = getTokenFrom(req);

    if (!token) {
      return res.status(401).json({ message: "not Authorized" });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken.id) {
      return res
        .status(401)
        .json({ message: "session timeout please login again" });
    }

    const { category, amount, date, description } = req.body;

    const { id } = req.params;

    const expense = await Expense.findById(id);

    // if expense doesnt exist
    if (!expense) {
      return res.status(404).json({ message: "expense not found" });
    }

    // Match expense to its user
    if (expense.user.toString() !== decodedToken.id) {
      return res.status(401).json({ message: "User not Authorized" });
    }

    // Update Expense
    await Expense.findByIdAndUpdate(
      { _id: id },
      {
        category,
        amount,
        date,
        description,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    //sending response data to FE

    res.status(200).json("Expense updated Successfully");
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getExpenseByID,
  deleteExpense,
  updateExpense,
};
