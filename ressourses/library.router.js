const express = require('express');

const {
  addOnebook,
  getOnebook,
  getbooks,
  updateOnebook,
  deleteOnebook,
} = require('./library.controller');
const verifyPayload = require('../../middlewares/verifyPayload');

const router = express.Router();

/**
 * Route pour obtenir tous les livres
 * GET /
 * POST /
 */
router.route('').get(getbooks).post(verifyPayload, addOnebook);

/**
 * Route pour obtenir, mettre à jour et supprimer un livre spécifique
 * GET /:id
 * PUT /:id
 * DELETE /:id
 */
router
  .route('/:id')
  .get(getOnebook)
  .put(updateOnebook)
  .delete(deleteOnebook);

module.exports = router;
