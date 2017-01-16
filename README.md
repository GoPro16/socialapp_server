#Social App API 

##Installation
```bash
$ npm install
```
Open the server.js file and if the app doesn't work on the default port 3000, then change the code like so:
```js
models.sequelize.sync({force: false}).then(function () {
  var server = app.listen(process.env.PORT,process.env.IP, function() {
    console.log('Express server listening');
  });
});
```

##Usage
Run the App:
```bash
$ npm start
```
Go To local address for control panel
