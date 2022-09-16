// Dependencies
const express = require("express");

// route ဖိုင်တွေကို server-နဲ့ချိတ်ဆက်ခြင်း
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// express server-တည်ထောင်ခြင်း
const app = express();

// PORT-နံပါတ်သတ်မှတ်ခြင်း
const PORT = process.env.PORT || 3000;

// ဝင်လာသမျှ စာ(data)နဲ့ စာဖိုင်တွဲ(array)တွေကို ပြောင်းလဲပေးခြင်း
app.use(express.urlencoded({ extended: true }));

// ဝင်လာသမျှကို json-ပြောင်းလဲပေးခြင်း
app.use(express.json());

app.use(express.static("public"));
app.use("/api", apiRoutes); //ဒါကတော့ api
app.use("/", htmlRoutes); //ဒီကောင်က default

app.listen(PORT, () => {
  console.log(`API server is listening at http://localhost:${PORT}! 🚀`);
});
