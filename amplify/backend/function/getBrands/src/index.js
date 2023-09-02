const mongoose = require("mongoose");
const brandSchema = mongoose.Schema({})
const Brands = mongoose.model("brands", brandSchema)

const getBrandsFromDb = async () => {
    console.log("Invoked <<getBrandsFromDb>>")
    const uri = process.env.DB_CONNECTION_STRING;
    try {
        mongoose.connect(uri);
        // DB Connection status - 0: disconnected; 1: connected; 2: connecting; 3: disconnecting;
        console.log("DB connection status: " + mongoose.connection.readyState);
        const data = await Brands.find()
        return data;
    } catch (error) {
        console.log("DB connection error>>>", error)
    }
}

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const data = await getBrandsFromDb();

    console.log(`EVENT: ${JSON.stringify(event)}`);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Origin': process.env.CORS_URL,
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        body: JSON.stringify(data)
    }
};
