const express = require('express');
const Ninja = require('../models/Ninja');
const router = express.Router();

/* 
    GET 
    all ninjas from database
*/
router.get('/ninjas', async (req, res, next) => {
    try {
        const data = await Ninja.find();
        if (data.length <= 0) {
            res.send({
                message: 'There is no data... Try adding some'
            })
        }
        res.send(data)
    } catch (error) {
        next(error);
    }
});

/* 
    GET
    get ninjas by id

*/
router.get('/ninjas/:id', async (req, res, next) => {
    try {
        const data = await Ninja.findById(req.params.id);
        if (!data) {
            const newError = new Error(`Resource not found!: ${req.params.id} maybe deleted`);
            next(newError)
        }
        res.send(data)

    } catch (error) {
        const newError = new Error(`Resource not found!: ${req.params.id}`);
        next(newError)
    }

})

/* 
    POST 
    add ninjas to database
*/
router.post('/ninjas', (req, res, next) => {

    Ninja.create(req.body).then(ninja => {
        res.send({
            data: ninja._doc,
            message: "Ninja saved successfully!"
        })
    }).catch(error => {
        next(error)
    })

});

/* 
    PUT 
    update a ninja from database
*/
router.put('/ninjas/:id', (req, res, next) => {

    Ninja.findOneAndUpdate({ _id: req.params.id }, req.body).then((oldData) => {
        if (oldData) {
            Ninja.findById({ _id: req.params.id }).then(data => {
                if (data) {
                    res.send({
                        oldData: oldData,
                        newData: data,
                        message: "Ninja updated successfully!"
                    })
                } else {
                    next()
                }
            }).catch(error => {
                res.send(error)
            })
        } else {
            next();
        }

    }).catch(error => {
        res.send(error)
    })
});

/* 
    DELETE 
    delete a ninja from database
*/
router.delete('/ninjas/:id', (req, res, next) => {

    Ninja.findOneAndDelete({ _id: req.params.id }).then(data => {
        res.send({
            data: data._doc,
            message: 'Ninja deleted successfully!'

        })
    }).catch(err => {
        res.send(err)
    })
});

module.exports = router;
