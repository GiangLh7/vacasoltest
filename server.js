var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var mandrillEmailService = require('./services/Emailservice');
var User = require('./models/User');

//connect to the database
mongoose.connect(process.env.MONGODB || process.env.MONGOLAB_URI || 'localhost');
mongoose.connection.on('error', function() {
  console.log('MongoDB Connection Error. Please make sure that MongoDB is running.');
  process.exit(1);
});

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**
 * server rest-api
 */
app.post('/api/user/signup', function(req, res, next) {
  var user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email.toLowerCase(),
    languages: req.body.languages
  });

  //check the existence of the email
  User.findOne({ email: req.body.email.toLowerCase() }, function(err, existingUser) {
    //if the email already exists
    if (existingUser) {
      return res.send(409,{success: false, field: 'email', message: 'email already exists'});
    }

    //if not exist, then save the user
    user.save(function(err) {
      if (err) {
        return next(err);
      }

      var data = {
        "template_name": 'Test sign-up confirm',
        "template_content": [
          {
            "name": "user_name",
            "content": user.firstName + ' ' + user.lastName
          },
          {
            "name": "user_email",
            "content": user.email
          }
        ],
        "message": {
          "to":[{"email": user.email}]
        }
      };
      mandrillEmailService.sendTemplate(data, function (e, r, body) {
          if(e) {
            return next(e);
          }
          else {
            if (r.statusCode == 200) {
              res.send({success: true});
            } else {
              res.send({success: true, message: 'error when sending email'});
            }
          }
      });
    });
  });
});

app.get('/api/user/checkUnique', function (req, res, next) {
  var prop = req.body.property || req.query.property;
  var val = req.body.value || req.query.value;
  var queryString = '{"' + prop + '":"' + val.toLowerCase() + '"}';
  var queryObj = JSON.parse(queryString);
  User.findOne(queryObj, function(err, existingUser) {
    //if the email already exists
    if (existingUser) {
      return res.send(200, {status: false});
    }
    return res.send(200, {status: true});
  });
});

/**
 * start listening incoming requests
 */
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});