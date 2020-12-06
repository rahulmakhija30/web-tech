const express = require('express');
const fs = require('fs');
const historyApiFallback = require('connect-history-api-fallback');
const mongoose = require('mongoose');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const Appointments = require('./models/Appointment');

const cors          = require('cors');
const bodyParser    = require('body-parser');

const config = require('../config/config');
const webpackConfig = require('../webpack.config');

const MongoClient   = require('mongodb').MongoClient;
const Patient       = require('./models/FormModel');
const { response } = require('express');
const url             = "mongodb://localhost/formPatient";

const isDev = process.env.NODE_ENV !== 'production';
const port  = process.env.PORT || 8080;


// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(isDev ? config.db_dev : config.db);

mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
require('./routes')(app);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(historyApiFallback({
    verbose: false
  }));

  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: path.resolve(__dirname, '../client/public'),
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, '../dist')));
} else {
  app.use(express.static(path.resolve(__dirname, '../dist')));
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'));
    res.end();
  });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post('/formPatient', function(req, res){
  var newUser = new Patient(req.body);

  Patient.find({ email: req.body.email }, function (err, docs) {
      if (err){
          console.log(err);
      }

      else{

          if(docs.length == 0){
              console.log(newUser.email);
              newUser.save(function (err, patient) {
                  if (err) res.send({status:0, result:err});
                  else res.send({status:1, result:patient});
              });
          }

          else{
              console.log("patient name", newUser.name, " exists");
              console.log(docs);

              MongoClient.connect(url, function(error, db) {
                      if(error) throw error;
                      var dbo = db.db("clinic_db");
                      dbo.collection("patients").updateOne({email: newUser.email},
                          {$set: {
                              age: newUser.age
                      }});
                      dbo.collection("patients").updateOne({email: newUser.email},
                          {
                              $push:{
                                  height:             newUser.height[0],
                                  weight:             newUser.weight[0],
                                  bloodSugar:         newUser.bloodSugar[0],
                                  bpDia:              newUser.bpDia[0],
                                  bpSys:              newUser.bpSys[0],
                                  hemoglobin:         newUser.hemoglobin[0]
                              }
                          })
                  });
          }

      }
  });
});


app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.info('>>> 🌎 Open http://0.0.0.0:%s/ in your browser.', port);
});

module.exports = app;
