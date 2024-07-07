const express = require('express');
const { getUser, createOrg, getAll, getOne, add } = require('../Controllers/OrganisationsController');
const authenticateuser = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/api/users/:id', authenticateuser, getUser);
router.get('/api/organisations', authenticateuser, getAll);
router.get('./api/organisations/:orgId', authenticateuser, getOne);
router.post('./api/organisations/:orgId/users', authenticateuser, add);
router.post('/api/organisations', authenticateuser, createOrg);

module.exports = router;