// Import Koa
const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
const estateRoutes = require('./routes/estates.routes');

// Start App
const app = new Koa();


//const dbclient = require('./dal/index');

app.use(bodyParser());

app.use(estateRoutes.routes()).use(estateRoutes.allowedMethods());

//Welcome message
// app.use(async ctx => {
//     ctx.body = "Welcome to Koa"
// });

app.listen(3000);

console.log("App is running");