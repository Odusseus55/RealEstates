// Import Koa
const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
// const estateRoutes = require('./routes/estates.routes');
const mongoose = require('mongoose');
const Router = require("@koa/router");
const json = require('koa-json');


mongoose.connect('mongodb://localhost:27017/RealEstates');
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => {
    console.log('Connected to DB with mongoose')
})

// DB schemas
const estateSchema = new mongoose.Schema({
    estateType: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    }
})

const Estate = mongoose.model('Estate', estateSchema);


// ROUTES
const router = new Router();

//GET 
router.get('/lead', async (ctx) => {
    let estates = await Estate.find();
    ctx.body = estates;
})

// POST
router.post('/lead', async (ctx) => {
    let newEstate = Estate(ctx.request.body)
    try {
        await newEstate.save();
        ctx.response.status = 200;
        ctx.body = newEstate;
    } catch (err) {
        ctx.response.status = 400;
        ctx.body = err.message;
    }
    
   
})

// GET ID
router.get('/lead/:id', async (ctx) => {
    try {
        ctx.body = await Estate.findById(ctx.params.id);
        // crx.response.status = 200;
    }
    catch (err) {
        ctx.response.status = 400;
        ctx.body = "Error: Not found";
    }
})

// PUT
router.put('/lead/:id', async (ctx) => {
    try {
        await Estate.findByIdAndUpdate(ctx.params.id, ctx.request.body);
        let updatedEstate  = await Estate.findById(ctx.params.id);
        ctx.body = updatedEstate;
    } catch (err) {
        ctx.response.status = 400;
        ctx.body = err.message;
    }
})

router.delete('/lead/:id', async (ctx) => {
    try {
        await Estate.findByIdAndDelete(ctx.params.id);
        ctx.body = "Successfully removed";
    } catch (err) {
        ctx.response.status = 400;
        ctx.body = err.message;
    }
})


// Start App
const app = new Koa();

app.use(json());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

// Welcome message
// app.use(async ctx => {
//     // ctx.body = "Welcome to Koa"
//     console.log("Here")

    
// });

app.listen(3000);

console.log("App is running");