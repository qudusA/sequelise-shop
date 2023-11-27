const path = require("path");

const sequelize = require("./util/database");
const User = require("./models/user");
const Cart = require("./models/cart");
const Order = require("./models/order");
const Product = require("./models/product");
const CartItem = require("./models/cartItem");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
// const db = require('./util/database');

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

console.log("env", process.env.DATABASE_PASS);
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      //   console.log("app.js", req.user);
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// user and product {one to many}
User.hasMany(Product, { onDelete: "CASCADE" });
Product.belongsTo(User, { onDelete: "CASCADE" });

// user and cart {one to one}
User.hasOne(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(User, { onDelete: "CASCADE" });

// product and cart {many to many}
Product.belongsToMany(Cart, { onDelete: "CASCADE", through: CartItem });
Cart.belongsToMany(Product, { onDelete: "CASCADE", through: CartItem });

// user and order {one to many}
User.hasMany(Order, { onDelete: "CASCADE" });
Order.hasMany(User, { onDelete: "CASCADE" });

// product and order {many to many}
Product.belongsToMany(Order, { onDelete: "CASCADE", through: "productorder" });
Order.belongsToMany(Product, { onDelete: "CASCADE", through: "productorder" });

sequelize
  .sync({ alter: true })
  .then((product) => {
    // console.log(product);
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        email: "test@test.com",
        phone: "09087991161",
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
