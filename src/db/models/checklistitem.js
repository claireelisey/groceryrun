'use strict';

module.exports = (sequelize, DataTypes) => {
    
    const ChecklistItem = sequelize.define('ChecklistItem', {
        body: DataTypes.STRING
    }, {});

    ChecklistItem.associate = function(models) {
        // associations can be defined here
    };

    return ChecklistItem;
};