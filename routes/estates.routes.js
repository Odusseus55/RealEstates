const Router = require("@koa/router");

const { createEstate, getEstates } = require("../api/estates.api");

const router = new Router();

//GET 
router.get('/', async (ctx) => {
    ctx.body = await getEstates();
})

//POST
router.post('/', async (ctx) => {
    let estates = ctx.request.body;
    estates = await createEstate(estates);
    ctx.response.status = 200;
    ctx.body = estates;
})

module.exports = router;