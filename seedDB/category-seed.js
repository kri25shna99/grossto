const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Category = require("../models/category");
const mongoose = require("mongoose");
const makeconnectionDB = require("./../config/db");
makeconnectionDB();

async function funcategories() {
  async function funcat(titleStr) {
    try {
      const categ = await new Category({ title: titleStr });
      await categ.save();
    } catch (error) {
      return error;
    }
  }

  async function funcall() {
    await mongoose.disconnect();
  }
  await funcat("Cereals");
  await funcat("Pulses");
  await funcat("Vegetables");
  await funcat("Fruits");
  await funcat("Nuts");
  await funcat("Oil Seeds");
  await funcat("Spices");
  await funcall();
}

funcategories();
