'use strict'

const mongoose = require('mongoose')
const Roles = require('../models/roles/roles.model')
const seedRoles = [
    {
        name: 'Super Admin'
    },
    {
        name: 'Admin'
    },
    {
        name: 'User'
    }
];


const seedDB = async () => {
    await Roles.deleteMany({});
    await Roles.insertMany(seedRoles);
}

module.exports = seedDB