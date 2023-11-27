const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // const userId = req.user.id;
  // console.log(userId);

  req.user
    .createProduct({
      title,
      imageUrl,
      price,
      description,
      // userId,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const { edit } = req.query;
  if (!edit) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
    .then((product) => {
      if (!product) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: edit,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      return product.save();
    })
    .then((product) => {
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));

  //   const updatedProduct = new Product(
  //     prodId,
  //     updatedTitle,
  //     updatedImageUrl,
  //     updatedDesc,
  //     updatedPrice
  //   );
  //   updatedProduct.save();
  //   res.redirect("/admin/products");
};

exports.getProducts = (req, res, next) => {
  Product.findAll().then((products) => {
    // console.log(products);
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({ where: { id: prodId } })
    .then(() => {
      res.redirect("/admin/products");
    })
    .catch((err) => {
      console.log(err);
    });

  // Product.findByPk(prodId)
  //   .then((product) => {
  //     return product.destroy();
  //   })
  //   .then((p) => {
  //     console.log(p);
  //     res.redirect("/admin/products");
  //   });
};
