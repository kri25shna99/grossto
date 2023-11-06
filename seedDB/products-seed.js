const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const setter = require("faker");
const makeconnectionDB = require("./../config/db");
makeconnectionDB();

async function funproducts() {
  setter.seed(0);

  
  const cerealsname = [
    "Bajra, 1lb",
    "Barley, 1lb",
    "Maize, 1lb",
    "Rice, 1lb",
    "Wheat, 1lb",
  ];
  const cerealslink = [
    "https://i.ibb.co/G99Hf02/Bajra.jpg",
    "https://i.ibb.co/MnLyqT4/Barley.jpg",
    "https://i.ibb.co/DrYMFKb/Maize.jpg",
    "https://i.ibb.co/G2vnJBL/Rice.jpg",
    "https://i.ibb.co/CnjzXT8/Wheat.jpg",
  ];


  const nutsname = [
    "Arecanuts, 1lb",
    "Cashewnuts, 1lb",
  ];

  const nutslink = [
    "https://i.ibb.co/S7RdxrQ/Arecanut.jpg",
    "https://i.ibb.co/9NR30TL/Cashewnut.jpg",
  ];


  const pulsesname = [
    "Rajma, 1lb",
    "Blackgram, 1lb",
    "Black Pepper, 1lb",
    "Moong Daal, 1lb",
    "Soya Bean, 1lb",
    "Urad Daal, 1lb",
  ];

  const pulseslink = [
    "https://i.ibb.co/BPkLcRq/Bean.jpg",
    "https://i.ibb.co/mX2PDsy/Blackgram.jpg",
    "https://i.ibb.co/JsTWcKg/Blackpepper.jpg",
    "https://i.ibb.co/zrMtxFz/Moong-Green-Gram.jpg",
    "https://i.ibb.co/cvwqf6J/Soyabean.jpg",
    "https://i.ibb.co/X5Mqbnz/Urad.jpg",
  ];


  const vegetablesname = [
    "Ginger, 1lb",
    "Tomato, 1lb",
    "Potato, 1lb",
    "Bell Pepper, 1lb",
    "Cabbage, 1lb",
    "Bottle Gourd, 1lb",
    "Carrot, 1lb",
    "Cauliflower, 1lb",
    "Red Chilly, 1lb",
    "Celantro, 1lb",
    "Cowpea, 1lb",
    "Drumstick, 1lb",
    "Garlic, 1lb",
    "Lemon, 1lb",
  ];
  const vegetableslink = [
    "https://i.ibb.co/DK7bGsp/10000119-2-3-fresho-ginger.jpg",
    "https://i.ibb.co/8cBf4S6/10000200-2-2-fresho-tomato-hybrid-WWwp-BCh.jpg",
    "https://i.ibb.co/KrWC4yv/10000159-2-7-fresho-potato.jpg",
    "https://i.ibb.co/ryY1zkq/10000069-2-28-fresho-capsicum-green.jpg",
    "https://i.ibb.co/b34Sw1n/Cabbage-un5f-VUy.jpg",
    "https://i.ibb.co/tbbrX51/Bottle-Gourd.jpg",
    "https://i.ibb.co/HC71T3c/Carrot.jpg",
    "https://i.ibb.co/JBGcnxh/Cauliflower.jpg",
    "https://i.ibb.co/Sm6PKwk/Chillies.jpg",
    "https://i.ibb.co/YcwmfCm/Coriander.jpg",
    "https://i.ibb.co/hWZ5k7q/Cowpea.jpg",
    "https://i.ibb.co/yYnK5Z9/Drum-Stick.jpg",
    "https://i.ibb.co/Db08HJD/Garlic.jpg",
    "https://i.ibb.co/NpWT2gF/Lemon.jpg",
  ];



  const fruitsname = [
    "Banana, 1lb",
    "Coconut, 1lb",
    "Grapes, 1lb",
    "Orange, 1lb",
    "Papaya, 1lb",
    "Pineapple, 1lb",
    "Sugarcane, 1lb",
  ];
  const fruitslink = [
    "https://i.ibb.co/BBCd3tC/Banana.jpg",
    "https://i.ibb.co/qgK8f7d/Coconut.jpg",
    "https://i.ibb.co/MhW1L1M/Grapes.jpg",
    "https://i.ibb.co/VM7TTmq/Orange.jpg",
    "https://i.ibb.co/xh5gJj8/Papaya.jpg",
    "https://i.ibb.co/JCfLkSg/Pineapple.jpg",
    "https://i.ibb.co/8d0s1Xr/Sugarcane.jpg",
  ];


  const spicesname = [
    "Turmeric, 1lb",
  ];
  const spiceslink = [
    "https://i.ibb.co/7YPM3z8/Turmeric.jpg",
  ];



  const oilseedsname = [
    "Castor Seeds, 1lb",
    "Cotton, 1lb",
    "Groundnut, 1lb",
    "Guar Seeds, 1lb",
  ];
  const oilseedslink = [
    "https://i.ibb.co/PWSG5MJ/Castor-seed.jpg",
    "https://i.ibb.co/4NYTGJ2/Cotton.jpg",
    "https://i.ibb.co/SxW00JB/Groundnut.jpg",
    "https://i.ibb.co/VqyZVyT/Guar-seed.jpg",
  ];

  async function funprod(prodnamearray, prodlinkarray, categorynames) {
    try {
      const assignid = await Category.findOne({ title: categorynames });
      for (let i = 0; i < prodnamearray.length; i++) {
        let newproductadd = new Product({
          imagePath: prodlinkarray[i],
          title: prodnamearray[i],
          category: assignid._id,
          description: "This is the best product you can find on Grossto and this product is the most selling one also. The product is very high quality and fresh and the makers of this product are well experienced and they maintained very high quality standards for this products.",
          price: setter.random.number({ min: 10, max: 50 }),
          productCode: setter.helpers.replaceSymbolWithNumber("####-##########"),
        });
        await newproductadd.save();
      }
    } catch (error) {
      return error;
    }
  }

  async function funcall() {
    await mongoose.disconnect();
  }

  await funprod(cerealsname, cerealslink, "Cereals");
  await funprod(pulsesname, pulseslink, "Pulses");
  await funprod(nutsname, nutslink, "Nuts");
  await funprod(vegetablesname, vegetableslink, "Vegetables");
  await funprod(fruitsname, fruitslink, "Fruits");
  await funprod(spicesname, spiceslink, "Spices");
  await funprod(oilseedsname, oilseedslink, "Oil Seeds");
  await funcall();
}

funproducts();
