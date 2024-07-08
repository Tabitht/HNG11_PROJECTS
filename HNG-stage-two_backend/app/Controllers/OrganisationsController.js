const services = require('../Services/OrganisationServices');

async function getUser(request, response) {
    try{
        const results = await services.getUserOrganisation(request.params, request.user);
        response.status(200).json(results)
    } catch (error) {
        console.error('error fetching user:', error);
        response.status(500).json({
            status: 'error',
            message: error.message || 'server error',
            statusCode: error.statusCode || 500
        });
    }
};

async function getAll(request, response) {
    try{
        const results = await services.getAllOrganisation(request.user);
        response.status(200).json(results)
    } catch (error) {
        console.error('Error fetching organisations:', error);
        response.status(500).json({
            status: 'error',
            message: 'server error',
            statusCode: 500
        });
    }
};

async function getOne(request, response) {
    try{
        const results = await services.getOneOrganisation(request.user, req.params);
        response.status(200).json(results)
    } catch (error) {
        response.status(404).json({
            status: 'fail',
            message: error.message || 'server error',
            statusCode: 404 || 500
        });
    }
};

async function add(request, response) {
    try{
        const results = await services.addUser(req.params, req.body);
        response.status(200).json(results)
    } catch (error) {
        console.error('Error adding user to organisation:', error);
        response.status(error.statusCode).json({
            status: 'fail',
            message: error.message,
            statusCode: 400
        });
    };
};

async function createOrg(request, response) {
    try{
        const results = await services.createOrganisation(request.body, request.user);
        response.status(201).json(results)
    } catch (error) {
        response.status(400).json({
            status: error.status || 'Bad Request',
            message: error.message || 'Client error',
            statusCode: 400
        });
    };
}
module.exports = {
    getUser,
    getAll,
    getOne,
    add,
    createOrg
}