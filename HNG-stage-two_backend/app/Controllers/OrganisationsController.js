const services = require('../Services/OrganisationServices');

async function getUser(request, response) {
    try{
        const results = await services.getUserOrganisation(request.params.id, request.user.userId);
        response.status(200).json(results)
    } catch (error) {
        response.status(400).json({
            status: 'Bad Request',
            message: error.message || 'Client error',
            statusCode: 400
        });
    }
};

async function getAll(request, response) {
    try{
        const results = await services.getAllOrganisation(request.user.userId);
        response.status(200).json(results)
    } catch (error) {
        response.status(404).json({
            status: 'error',
            message: error.message,
            statusCode: 400
        });
    }
};

async function getOne(request, response) {
    try{
        const results = await services.getOneOrganisation(request.user.userId, req.params);
        response.status(200).json(results)
    } catch (error) {
        response.status(404).json({
            status: 'error',
            message: error.message,
            statusCode: 400
        });
    }
};

async function add(request, response) {
    try{
        const results = await services.addUser(request.user.userId, req.params, req.body);
        response.status(200).json(results)
    } catch (error) {
        response.status(422 || 403).json({
            status: 'error',
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
            status: 'Bad Request',
            message: 'Client error',
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