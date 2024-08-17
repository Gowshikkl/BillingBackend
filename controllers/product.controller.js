const connection = require('../config/db-connect');

exports.get_products = (req,res)=>{
    const sql = "SELECT * FROM products";  
    connection.query(sql,(err,reuslts)=>{
        if(err){
            res.status(500).send(err);
            return;
        }
        res.json(reuslts);
    })
}

exports.add_product = (req,res)=>{
    const { product_price, product_name } = req.body;
    const sql = "INSERT INTO products (product_price, product_name , product_stock ) VALUES (?, ? , ?)"
    if (!product_price || !product_name) {
        return res.status(400).json( {status : 400 , message :"Product price and name are required." } );
    }

    connection.query(sql,[product_price,product_name,100],(err,result)=>{
        if(err){
            return res.status(500).json({ status : 500, message: err.toString() });
        }
        res.status(201).json({ message: 'Product added successfully', id: result.insertId });
    })
}

exports.update_product = (req, res)=>{
    const {id,...data} =req.body;
    if(!id){
        return res.status(400).json({ status : 400 , message : "Product id is missing"})
    }
    const keys = Object.keys(data);
    if(keys.length === 0) {
        return res.status(400).json({ status : 400 , message : "No fields to update provided."})
    }
    const updateQuery = `UPDATE products SET ${keys.map(key => `${key} = ?`).join(', ')} WHERE id = ?`;
    const values = [...keys.map(key => data[key]), id];
    connection.query(updateQuery, values, (err, result) => {
        if (err) {
            console.error('Failed to update product: ', err);
            return res.status(500).json({ message: 'Failed to update product.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product updated successfully.' });
    });
}

exports.delete_product = (req,res)=>{
    const { id } = req.body; 

    if (!id) {
        return res.status(400).json({ message: 'Product id is required.' });
    }

    const deleteProductQuery = 'DELETE FROM products WHERE id = ?';

    connection.query(deleteProductQuery, [id], (err, result) => {
        if (err) {
            console.error('Failed to delete product: ', err);
            return res.status(500).json({ message: 'Failed to delete product.' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Product not found.' });
        }

        res.status(200).json({ message: 'Product deleted successfully.' });
    });
}