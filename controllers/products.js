const createStatsCollector = require('mocha/lib/stats-collector');
const Products = require('../models/products');
var obj = {
    selectAll: async(req, res) => {
        res.status(200).json(
            await Products.findAll({
                order: [
                    ['id', 'asc']
                ]
            })
        );
    },
    insert: async(req, res) => {
        const body = req.body;
        const objP = await Products.create({
            name: body.name,
            price: body.price,
            mrp: body.mrp,
            stock: body.stock,
            isPublished: false
        });
        objP.id = null;
        res.status(201).json(objP);
    },
    delete: function(req, res) {
        res.status(405).json();
    },
    patch: function(req, res) {
        const id = req.params.id;
        Products.findByPk(id).then(proyect => {
            if (proyect) {
                let mensajes = [];
                if (proyect.mrp < proyect.price) {
                    mensajes.push('MRP should be less than equal to the Price');
                }
                if (proyect.stock == 0) {
                    mensajes.push('Stock count is 0');
                }
                console.log(mensajes, proyect.mrp, proyect.price, proyect.stock);
                if (mensajes.length > 0) {
                    return res.status(422).json(mensajes);
                }
                proyect.isPublished = true;
                proyect.save();
                return res.status(204).json();
            }
        });

    }
};
module.exports = obj;