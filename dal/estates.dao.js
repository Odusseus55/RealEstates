// Connect to MongoDB with DB name and collection
const estates = require('./index').db('RealEstates').collection('estates');

const save = async ({ estateType, fullName, phone }) => {
    const result = await estates.insertOne({ estateType, fullName, phone });
    console.log(result)
    if (result.acknowledged) {
        return 'Data Successfully inserted';
    }
    return "Couldn't insert the data"
}

const getAll = async () => {
    const cursor = await estates.find();
    return cursor.toArray();
}

module.exports = { save, getAll }
