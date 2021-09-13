const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

const TestModel = require('../../models/test.model');

const router = express.Router();


const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://buzztechdb:*****@cluster0.wbt5l.mongodb.net/<intppl>?authSource=admin&replicaSet=atlas-111dvu-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true');

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
	{
	path: '/test',
	route: router.post('/sendInput', async function(
    req, res
  ){

    const data = req.body
    console.log(data);
    const MyModel = mongoose.model('TestModel', TestModel);
    const doc = await new MyModel(data)
    await doc.save()
    console.log(doc);
    res.json({status:"ok"})
  })
}
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
