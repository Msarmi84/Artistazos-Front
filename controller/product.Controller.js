const jwt = require('jsonwebtoken');
const connection = require('../config/dbConexion')

let secret = 'claveSecreta'
class productController {

    //devuelve todos los productos
    getProducts = (req, res) => {

        const sql = `SELECT * FROM product WHERE deleted = 0`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(results);
            }
        });
    };

    //muestra todos los productos de un usuario en concreto
    getProductsByUserId = (req, res) => {

        const user_id = req.params.user_id;
        const sql = `SELECT * FROM product WHERE user_id = ${user_id} AND deleted = 0`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(results);
            }
        });
    }

    //muestra toda la información de un producto
    getProductById = (req, res) => {

        const sql = `SELECT * FROM product WHERE product_id = ${req.body.product_id} AND deleted = 0`;

        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                res.status(200).json(results[0]);
            }
        });
    };



    addProduct = (req, res) => {
        const user_id = req.params.user_id
        const {
            product_name,
            category,
            description,
            price,
            tag
        } = req.body;
        console.log('console del req.body');
        console.log(req.body)

        console.log(req.file)

        let sql = `INSERT INTO product (user_id, product_name, category, description, price) VALUES (${user_id}, '${product_name}', ${category} , '${description}', ${price})`;
        if (req.file) {
            sql = `INSERT INTO product (user_id, product_name, category, description, product_photo, price) VALUES (${user_id}, '${product_name}', ${category}, '${description}', '${req.file.filename}', ${price})`;
        }
        connection.query(sql, (error, results) => {
            console.log(results)
            let idProduct = results.insertId;
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                if (req.body.tag) {
                    this.addTag(idProduct, tag);
                }
                res.status(200).json(results)
            }
        });
    }



    addTag = (product_id, tag) => {
      let productId = product_id;
      let tags = tag;
      tags = tags.splice(-1, 1)

      tags = tags.toString();
 
      tags = tags.split(', ');
      if(tags.length >= 1 && tags !== 'undefined' && tags !== ''){
        let deleteOldTags = `DELETE FROM product_tag WHERE product_id = ${product_id}`;
        connection.query(deleteOldTags, (error, result) => {
          if (error) {
              console.log(error);
          } else {
          for (let i = 0; i <= tags.length; i++) {
              let tag_name = tags[i];
              let addTags = `INSERT INTO tag (tag_name) VALUES ('${tag_name}')`;
              connection.query(addTags, (error, results) => {
                  // if (error) {
                  //   console.log(error);
                  //   // res.status(400).json({ error });

                  // } else {
                  let tagId = `SELECT tag_id FROM tag WHERE tag_name = '${tag_name}'`;

                  connection.query(tagId, (error, result2) => {
                      let tagIdFinal = result2[0].tag_id;

                      if (error) {
                          console.log(error);
                          // res.status(400).json({ error });

                      } else {
                          let insertTagId = `INSERT INTO product_tag (tag_id, product_id) VALUES (${tagIdFinal}, ${productId})`;
                          connection.query(insertTagId, (error, result3) => {
                              if (error) {
                                  console.log(error);
                                  // res.status(400).json({ error });
                              } else {
                                  return result3;
                              }
                          })
                      }
                  })

                  // }
              });
          }
      }
    });
      
    }
  }


    updateProduct = (req, res) => {
        const {
            product_name,
            category,
            description,
            price,
            tag
        } = req.body;
        console.log(req.body, "..........................")
        let sql = `UPDATE product SET product_name = '${product_name}', category = ${category}, description = '${description}', 
       price = ${price}, update_at = now() WHERE product_id = ${req.params.product_id}`;
        if (req.file) {
            sql = `UPDATE product SET product_name = '${product_name}', category = ${category}, description = '${description}', 
        product_photo = '${req.file.filename}', price = ${price}, update_at = now() WHERE product_id = ${req.params.product_id}`;
        }


        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                if (req.body.tag) {
                    this.addTag(req.params.product_id, tag);
                }
                console.log(results);
                res.status(200).json(results);
            }
        });
    };



    deleteProduct = (req, res) => {
        const sql = `DELETE FROM product WHERE product_id = ${req.params.product_id}`;
        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                console.log(results);
                res.status(200).json();
            }
        });
    };


    logicDeleteProduct = (req, res) => {
        const sql = `UPDATE product SET deleted = 1, delete_at = now() WHERE product_id= ${req.params.product_id}`;
        connection.query(sql, (error, results) => {
            if (error) {
                console.log(error);
                res.status(400).json({ error });
            } else {
                console.log(results);
                res.status(200).json();
            }
        });
    };







    // //en este controller recibo el token del frotn(angular) y compruebo que el token es correcto(valido)
    // verifyToken(req, res) {
    //     const token = req.header('token')
    //     console.log(token)
    //         //el metodo verify recibe dos cosas. 1- el  token que queremos decodificar. 2- la clave secreta con la que codificamos el token
    //     const decoded = jwt.verify(token, secret)
    //     console.log(decoded)
    //     res.json(decoded)
    // }

}


module.exports = new productController();