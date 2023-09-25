if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}



const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const url = process.env.DB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB Connection Error:', error);
});

db.once('open', () => {
  console.log('Connected to MongoDB Atlas');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  // for (let i = 0; i < 300; i++) {
  //   const random100 = Math.floor(Math.random() * 100);
  //   const price = Math.floor(Math.random() * 20) + 10;
  //   const camp = new Campground({
  //     //YOUR USER ID
  //     author: "5f5c330c2cd79d538f2c66d9",
  //     location: `${cities[random100].city}, ${cities[random100].admin_name}`,
  //     title: `${sample(descriptors)} ${sample(places)}`,
  //     description:
  //       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!",
  //     price,
  //     geometry: {
  //       type: "Point",
  //       coordinates: [
  //         cities[random100].longitude,
  //         cities[random100].latitude,
  //       ],
  //     },
  //     images: [
  //       {
  //         url: "https://picsum.photos/seed/picsum/200/300",
  //         filename: "YelpCamp/ahfnenvca4tha00h2ubt",
  //       },
  //       {
  //         url: "https://picsum.photos/200/300?grayscale",
  //         filename: "YelpCamp/ruyoaxgf72nzpi4y6cdi",
  //       },
  //     ],
  //   });
  // await camp.save();
  // }
};

seedDB().then(() => {
  mongoose.connection.close();
});

