const express = require('express');
const { getUser, createOrg, getAll, getOne, add } = require('../Controllers/OrganisationsController');
const authenticateuser = require('../middlewares/authMiddleware');
const validateCreateOrg = require('../middlewares/createOrganisationValidation');
const router = express.Router();

router.get('/api/users/:id', authenticateuser, getUser);
router.get('/api/organisations', authenticateuser, getAll);
router.get('/api/organisations/:orgId', authenticateuser, getOne);
router.post('/api/organisations/:orgId/users', authenticateuser, add);
router.post('/api/organisations', validateCreateOrg, authenticateuser, createOrg);

module.exports = router;