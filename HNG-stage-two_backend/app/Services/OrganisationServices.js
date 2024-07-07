const { Organisation, User } = require('../model');

async function getUserOrganisation(userID, loginId) {
    const user = await User.findOne({ where: { userID }});
    if (!user) {
        const error = new Error('User not found');
        throw error;
    }
    const loggedinUser = await User.findOne({ 
        where: { id: loginId },
        include: [{ model: Organisation, as: 'Organisations' }]
    });

    const isOfsameOrganisation = await Organisation.findOne({
        where: { '$Users.userId$': userID},
        include: [{ model: User, where: { id: loginId } }]
    });

    if (!isOfsameOrganisation) {
        const error = new Error('Access Denied');
        throw error;
    }
    return {
        status: 'success',
        message: 'Organisation retrieved successfully',
        data: {
            userId: user.userId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
        }
    };
}

async function getAllOrganisation(userId) {
    const organisations = await Organisation.findAll({
        include: [{
            model: User,
            where: { id: userId }
    }]
    });
    if (!organisations.length) {
        const error = new Error('No organisations found for this user');
        throw error;
    }

    const orgData = organisations.map(org => ({
        orgId: org.orgId,
        name: org.name,
        description: org.description
    }));

    return {
        status: 'success',
        message: 'Organisations retrieved successfully',
        data: {
            organisations: orgData
        }
    }
}

async function getOneOrganisation(userId, orgId) {
    const organisation = await Organisation.findOne({
        where: { orgId },
        include: [{
            model: User,
            where: { id: userId }
    }]
    });
    if (!organisation) {
        const error = new Error('Organisation not found or access denied');
        throw error;
    }

    return {
        status: 'success',
        message: 'Organisation retrieved successfully',
        data: {
            orgId: organisation.orgId,
            name: organisation.name,
            description: organisation.description
        }
    }
}

async function addUser(userId, orgId, { userId: newUserId }) {

    if (!newUserId) {
        const error = new Error({
            errors: [
                {
                    field: 'userId',
                    message: 'User ID is required'
                }
            ]
        });
        throw error;
    }

     const organisation = await Organisation.findOne({
        where: { orgId },
        include: [{
            model: User,
            where: { id: userId }
    }]
    });
    if (!organisation) {
        const error = new Error('Access denied to the organisation');
        throw error;
    }

    const newUser = await User.findOne({
        where: { userId: newUserId },
    });

    if (!newUser) {
        const error = new Error('User not found');
        throw error;
    }

    await organisation.addUser (newUser);

    return {
        status: 'success',
        message: 'User added to organisation successfully',
    }
}


async function createOrganisation(orgData, user) {
    const organisation = await Organisation.create({ name: orgData.name, description: orgData.description });
    await user.addOrganisation(organisation);

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




