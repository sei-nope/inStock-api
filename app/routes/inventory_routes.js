// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for inventory
const Inventory = require('../models/inventory')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { inventory: { title: '', text: 'foo' } } -> { inventory: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// INDEX
// GET /inventories
router.get('/inventories', requireToken, (req, res, next) => {
  const userId = req.user._id
  Inventory.find({owner: userId})
    .sort({updatedAt: -1})
    // respond with status 200 and JSON of the inventories
    .then(inventories => {
      res.status(200).json({ inventories: inventories })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// SHOW
// GET /inventories/5a7db6c74d55bc51bdf39793
router.get('/inventories/:id', requireToken, (req, res, next) => {
  // req.params.id will be set based on the `:id` in the route
  Inventory.findById(req.params.id)
    .then(handle404)
    // if `findById` is succesful, respond with 200 and "inventory" JSON
    .then(inventory => {
      requireOwnership(req, inventory)
      res.status(200).json({ inventory: inventory.toObject() })
    })
    // if an error occurs, pass it to the handler
    .catch(next)
})

// CREATE
// POST /inventories
router.post('/inventories', requireToken, (req, res, next) => {
  const inventoryName = req.body.inventory.name
  // set owner of new inventory to be current user
  req.body.inventory.owner = req.user.id
  const userId = req.user._id
  // Check to see if the item exists
  Inventory.find({name: inventoryName})
    .then(inventories => {
      if (inventories) {
        const foundInventory = inventories.find(inventory => {
          const owner = inventory.owner._id ? inventory.owner._id : inventory.owner
          return userId.equals(owner)
        })
        if (foundInventory) {
          return Inventory.findOneAndUpdate({_id: foundInventory._id}, req.body.inventory, {new: true, runValidators: true})
        } else {
          return Inventory.create(req.body.inventory)
        }
      } else {
        // If the item does not exist continue to POST request
        return Inventory.create(req.body.inventory)
      }
    })
    .then(inventory => res.status(201).json({ inventory: inventory.toObject() }))
    .catch(next)
})

// UPDATE
// PATCH /inventories/5a7db6c74d55bc51bdf39793
router.patch('/inventories/:id', requireToken, removeBlanks, (req, res, next) => {
  // if the client attempts to change the `owner` property by including a new
  // owner, prevent that by deleting that key/value pair
  delete req.body.inventory.owner

  Inventory.findById(req.params.id)
    .then(handle404)
    .then(inventory => {
      // pass the `req` object and the Mongoose record to `requireOwnership`
      // it will throw an error if the current user isn't the owner
      requireOwnership(req, inventory)

      // pass the result of Mongoose's `.update` to the next `.then`
      return Inventory.findOneAndUpdate({_id: req.params.id}, req.body.inventory, {new: true, runValidators: true})
    })
    // if that succeeded, return 204 and no JSON
    .then(inventory => res.status(201).json({ inventory: inventory.toObject() }))
    // if an error occurs, pass it to the handler
    .catch(next)
})

// DESTROY
// DELETE /inventories/5a7db6c74d55bc51bdf39793
router.delete('/inventories/:id', requireToken, (req, res, next) => {
  Inventory.findById(req.params.id)
    .then(handle404)
    .then(inventory => {
      // throw an error if current user doesn't own `inventory`
      requireOwnership(req, inventory)
      // delete the inventory ONLY IF the above didn't throw
      inventory.deleteOne()
    })
    // send back 204 and no content if the deletion succeeded
    .then(() => res.sendStatus(204))
    // if an error occurs, pass it to the handler
    .catch(next)
})

module.exports = router
