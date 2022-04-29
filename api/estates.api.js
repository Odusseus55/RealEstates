const { save, getAll } = require("../dal/estates.dao");

const createEstate = async ({ estateType, fullName, phone }) => {
    const estate = {
        estateType,
        fullName,
        phone
    }

    return await save(estate);
}

const getEstates = async () => {
    return await getAll();
}

module.exports = { createEstate, getEstates }