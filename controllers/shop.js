const Product = require("../models/product");
const Cart = require("../models/cart");
const CartItem = require("../models/cartItem");
const cartItems = require("../models/cartItem");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      const rows = products;
      res.render("shop/product-list", {
        prods: rows,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then(({ dataValues }) => {
      // console.log(dataValues);
      const produ = dataValues;
      // const produ = prod.toJSON();
      res.render("shop/product-detail", {
        product: produ,
        pageTitle: produ.title,
        path: "/products",
      });
    })
    .catch((err) => console.log(err));
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      const rows = products;
      // console.log(rows);
      res.render("shop/index", {
        prods: rows,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  // Cart.getCart((cart) => {
  // Product.fetchAll((products) => {
  //   const cartProducts = [];
  //   for (product of products) {
  //     const cartProductData = cart.products.find(
  //       (prod) => prod.id === product.id
  //     );
  //     if (cartProductData) {
  //       cartProducts.push({ productData: product, qty: cartProductData.qty });
  //     }
  //   }
  // res.render("shop/cart", {
  //   path: "/cart",
  //   pageTitle: "Your Cart",
  //   products: cartProducts,
  // });
  // });
  // });
  CartItem.findAll()
    .then((carts) => {
      // console.log("getcart", carts);
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: carts,
      });
    })
    .catch((err) => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // Product.findById(prodId, (product) => {
  //   Cart.addProduct(prodId, product.price);
  // });
  // res.redirect("/cart");
  let cartProd;
  Product.findByPk(prodId)
    .then((product) => {
      const prod = product.toJSON();

      // copy the product doc to another onj
      ({ ...cartProd } = prod);

      // create new array
      return CartItem.findAll();
    })
    .then((cartsArr) => {
      const [...Arr] = cartsArr;

      // check if the object exist in the array
      const cartIn = Arr.findIndex(
        (cur, indx, array) => cartProd.id === cur.productId
      );
      // if exist increase qty by 1
      if (cartIn >= 0) {
        // const foundObj = Arr.find((cur, indx, array) => {
        //   return indx === cartIn;
        // });

        const ans = Arr.slice(cartIn, cartIn + 1)[0];

        // console.log("findIndex", foundObj.toJSON());
        console.log("slice", ans.toJSON());
        const newQty = ans.quantity + 1;
        // cartItems.update({ quantity: newQty }, { where: { id: ans.id } });

        ans.update({
          quantity: newQty,
        });

        ans.save();
      }
      //  if it doesn't exist
      if (cartIn === -1) {
        cartItems.create({
          title: cartProd.title,
          // price: prod.price,
          // userId: prod.userId,
          productId: cartProd.id,
          quantity: 1,
        });
      }
      // console.log("1", Arr);
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
