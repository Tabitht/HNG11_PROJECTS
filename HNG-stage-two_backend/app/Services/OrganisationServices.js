//const Organisation = require('../Model/Organisation');
//const User = require('../Model/User');
const { User, Organisation } = require('../Model/Users-and-Organisation');


async function getUserOrganisation(userID, loginId) {
    console.log(userID);
    if (loginId.userId !== userID) {
        console.log('user not found');
        const error = new Error('You can only access your own data');
        error.statusCode = 403;
        throw error;
    }

    const userData = await User.findByPk(userID, {
      attributes: ['userId', 'firstName', 'lastName', 'email', 'phone'],
      include: {
        model: Organisation,
        attributes: ['orgId', 'name', 'description'],
      }
    });

    if (!userData) {
      console.log('user not found');
        const error = new Error('You can only access your own data');
        error.statusCode = 404;
        throw error;
      };
    

    return {
        status: 'success',
        message: 'User retrieved successfully',
        data: userData
    };
}


async function getAllOrganisation(user) {
    console.log(user);
    const organisations = await Organisation.findAll({
        include: {
            model: User,
            where: { userId: user.userId },
            attributes: ['userId', 'firstName', 'lastName']
    },
    attributes: ['orgId', 'name', 'description']
    });
    
    return {
        status: 'success',
        message: 'Organisations retrieved successfully',
        data: {
            organisations
        }
    };
}

async function getOneOrganisation(user, orgId) {
    const organisation = await Organisation.findOne({
        where: { orgId },
        include: {
            model: User,
            where: { userId: user.userId },
            attributes: ['userId', 'firstName', 'lastName'],
      },
      attributes: ['orgId', 'name', 'description']
    });

    if (!organisation) {
        const error = new Error('Organisation not found or access denied');
        throw error;
    }

    return {
        status: 'success',
        message: 'Organisation retrieved successfully',
        data: organisation
    }
}

async function addUser(orgId, userId) {

    if (!userId) {
        const error = new Error('User ID is required');
        error.statusCode = 400;
        throw error;
    }

     const organisation = await Organisation.findByPk(orgId);
    if (!organisation) {
        const error = new Error('Organisation not found');
        error.statusCode = 400;
        throw error;
    }

    const newUser = await User.findByPk(userId);

    if (!newUser) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    await organisation.addUser (newUser);

    return {
        status: 'success',
        message: 'User added to organisation successfully',
    }
}


async function createOrganisation(orgData, user) {

    if (!orgData.name) {
      const error = new Error('Name is required');
      error.statusCode = 400
        throw error
      }

    const organisation = await Organisation.create({ name: orgData.name, description: orgData.description });
    await organisation.addUser(user);

    return {
        status: 'success',
        message: 'Organisation created successfully',
        data: {
            orgId: organisation.orgId,
            name: organisation.name,
            description: organisation.description
        }
    };
}
module.exports = {
    getUserOrganisation,
    getAllOrganisation,
    getOneOrganisation,
    addUser,
    createOrganisation
}




