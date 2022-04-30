// Import Koa
// eslint-disable-next-line import/no-unresolved
const Koa = require('Koa');
const bodyParser = require('koa-bodyparser');
// const estateRoutes = require('./routes/estates.routes');
const mongoose = require('mongoose');
const Router = require('@koa/router');
const json = require('koa-json');
const isEmail = require('validator/lib/isEmail');
const regions = require('./data/kraje.json');
const districts = require('./data/okresy.json');

mongoose.connect('mongodb://localhost:27017/RealEstates');
mongoose.connection.on('error', console.error);
mongoose.connection.once('open', () => {
  console.log('Connected to DB with mongoose');
});

// *********************
// Custom Validators
const isRegion = (value) => {
  // Checks for valid region is Czech Republic
  for (const region of regions.polozky) {
    if (region.nazev.cs === value) {
    //   console.log(region.nazev.cs);
      return true;
    }
  }
  return false;
};

// function definition needs to be used to correctly access 'this' context
// eslint-disable-next-line func-names
const isDistrict = function (value) {
  // first checks if the given district is valid, then checks if it is from the right region
  for (const district of districts.polozky) {
    if (district.nazev.cs === value) {
      for (const region of regions.polozky) {
        if (this.region === region.nazev.cs) {
          if (district.kraj === region.id) {
            return true;
          }
          return false;
        }
      }
    }
  }
  return false;
};

// *********************
// DB schemas
const estateSchema = new mongoose.Schema({
  estateType: {
    type: String,
    required: true,
    enum: {
      values: ['house', 'apartment'],
      message: '"{VALUE}" is not valid estate type.',
    },
  },
  fullName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50,
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (v) => /^\+420\d{9}$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: isEmail,
      message: 'Not valid email address.',
    },
  },
  region: {
    type: String,
    required: true,
    validate: {
      validator: isRegion,
      message: 'The given Region is not valid',
    },
  },
  district: {
    type: String,
    required: true,
    validate: {
      validator: isDistrict,
      message: 'The given District is not valid',
    },
  },
});

const Estate = mongoose.model('Estate', estateSchema);

// *********************
// ROUTES
const router = new Router();

// GET
router.get('/lead', async (ctx) => {
  const estates = await Estate.find();
  ctx.body = estates;
});

// POST
router.post('/lead', async (ctx) => {
  const newEstate = Estate(ctx.request.body);
  try {
    await newEstate.save();
    ctx.response.status = 200;
    ctx.body = newEstate;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = err.message;
  }
});

// GET ID
router.get('/lead/:id', async (ctx) => {
  try {
    ctx.body = await Estate.findById(ctx.params.id);
    // crx.response.status = 200;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = 'Error: Not found';
  }
});

// PUT
router.put('/lead/:id', async (ctx) => {
  try {
    await Estate.findByIdAndUpdate(ctx.params.id, ctx.request.body);
    const updatedEstate = await Estate.findById(ctx.params.id);
    ctx.body = updatedEstate;
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = err.message;
  }
});

router.delete('/lead/:id', async (ctx) => {
  try {
    await Estate.findByIdAndDelete(ctx.params.id);
    ctx.body = 'Successfully removed';
  } catch (err) {
    ctx.response.status = 400;
    ctx.body = err.message;
  }
});

// *********************
// Start App
const app = new Koa();

app.use(json());
app.use(bodyParser());

app.use(router.routes()).use(router.allowedMethods());

app.listen(8000);

console.log('App is running');
