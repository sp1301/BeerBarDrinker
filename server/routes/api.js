const express = require('express');
var router = express.Router();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'sampak.clhgy6smxmsq.us-east-1.rds.amazonaws.com',
  user     : 'spak7128',
  password : 'Thought9sam',
  database : 'DrinkerBeerBar'
});


router.put('/putUser',function(req,res){
  res.contentType('application/json');
  
  //var entry = [req.body.name, req.body.city, req.body.phone, req.body.age, req.body.happy, req.body.music, req.body.personality];

   var drinker = {
        Name: req.body.Name,
        City: req.body.City,
        PhoneNum: req.body.PhoneNum,
        Age: req.body.Age,
        PrefTime: req.body.PrefTime,
        Music: req.body.Music,
        Personality: req.body.Personality

    };

  var sql = "INSERT INTO Drinkers SET ?";

  var query = connection.query(sql, drinker, function (err, rows, fields) {
    if (err) throw err
  })

  res.send(req.body);
});


router.put('/putRating',function(req,res){
  res.contentType('application/json');
  
     var rating = {
        Name: req.body.Name,
        PhoneNum: req.body.PhoneNum,
        bar: req.body.bar,
        rating: req.body.rating
    };


  var sql = "INSERT INTO BarRating SET ?";

  var query = connection.query(sql, rating, function (err, rows, fields) {
    if (err) throw err
  })

  res.send(req.body);
});

/* GET api listing. */

router.get('/getUser',function(req,res){

  var sql = "SELECT * FROM Drinkers WHERE PhoneNum= ?";
  var filter = [req.query.phone];

  var query = connection.query(sql, filter, function (err, rows, fields) {
    if (err) throw err

        res.send(JSON.stringify(rows));
        res.end();
  })
});

router.get('/getSells',function(req,res){

var sql = "Select Bars.*, (Select count(LikeBeer.Beer)  From LikeBeer, SellBeers Where Drinkers.Name = LikeBeer.Name and Drinkers.PhoneNum = LikeBeer.PhoneNum and SellBeers.Bar = Bars.Name and LikeBeer.Beer = SellBeers.Beer) as counter From Drinkers, Bars Where Drinkers.Name = ? and Drinkers.PhoneNum = ? and Drinkers.City = Bars.City  Group by counter desc, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});


router.get('/getIdealMatch',function(req,res){

var sql = "Select distinct ((select count(*) From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music) + ((Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and BarTender.Personality = Drinkers.Personality) * 3) +  ((Select count(*) From SellBeers, LikeBeer Where SellBeers.Bar = Bars.Name and LikeBeer.Name = Drinkers.Name and LikeBeer.PhoneNum = Drinkers.PhoneNum and SellBeers.Beer = LikeBeer.Beer) * 2) + ((Select count(*) Where Bars.Personality = Drinkers.Personality) * 3) + (round((Select sum(BarRating.rating) From BarRating Where BarRating.Bar = Bars.Name) / (Select count(*) From BarRating Where BarRating.Bar = Bars.Name))) +  (Select IFNULL((Select BarRating.rating From BarRating Where BarRating.Name = Drinkers.Name and BarRating.Bar = Bars.Name and BarRating.PhoneNum = Drinkers.PhoneNum), 3)) ) as Matches, Bars.* From Drinkers, Bars Where Drinkers.name = ? and Drinkers.PhoneNum = ? and Drinkers.city = Bars.City group by Matches desc, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/getCheapBeerBar',function(req,res){

var sql = "Select Bars.*, SellBeers.Beer as Beers, SellBeers.Price as Price From Drinkers, Bars, LikeBeer, SellBeers Where Drinkers.Name = ? and Drinkers.PhoneNum = ? and Drinkers.City = Bars.City  and Drinkers.Name = LikeBeer.Name and Drinkers.PhoneNum = LikeBeer.PhoneNum and SellBeers.Bar = Bars.Name and LikeBeer.Beer = SellBeers.Beer  group by Beers asc";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/getPerfectBar',function(req,res){

var sql = "Select distinct Bars.* From Drinkers, Bars Where Drinkers.name = ? and Drinkers.PhoneNum = ? and Drinkers.city = Bars.City and  Bars.Personality = Drinkers.Personality and exists (Select * From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and  (Drinkers.Age - BarTender.Age < 10 and Drinkers.Age - BarTender.Age > -10) and BarTender.Personality = Drinkers.Personality) and exists (select * From LikeBeer, SellBeers Where LikeBeer.name = Drinkers.name and SellBeers.Bar = Bars.Name and LikeBeer.Beer = SellBeers.Beer) and exists (select * From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music)";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/getBartenderMusicBar',function(req,res){

var sql = "Select (((select count(*) From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music)) + ((Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and BarTender.Personality = Drinkers.Personality) * 5) + ((Select count(*) Where Bars.Personality = Drinkers.Personality) * 2) +  (round((Select sum(BarRating.rating) From BarRating Where BarRating.Bar = Bars.Name) / (Select count(*) From BarRating Where BarRating.Bar = Bars.Name)) * 2) + (Select IFNULL((Select BarRating.rating From BarRating Where BarRating.Name = Drinkers.Name and BarRating.Bar = Bars.Name and BarRating.PhoneNum = Drinkers.PhoneNum), 3))) as Matches, Bars.* From Drinkers, Bars Where Drinkers.name = ? and Drinkers.PhoneNum = ? and Drinkers.city = Bars.City group by Matches desc, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/checkRateTable',function(req,res){

var sql = "Select count(*) as results From BarRating Where BarRating.Name = ? and BarRating.PhoneNum = ? and BarRating.Bar = ?";
var filter = [req.query.name, req.query.phone, req.query.bar];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err
      res.send(JSON.stringify(rows));
      res.end();
})
});
router.get('/getPopularBar',function(req,res){

var sql = "Select(Select sum((select count(*) From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music) +  ((Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and BarTender.Personality = Drinkers.Personality) * 3) +  ((Select count(*) From SellBeers, LikeBeer Where SellBeers.Bar = Bars.Name and LikeBeer.Name = Drinkers.Name and LikeBeer.PhoneNum = Drinkers.PhoneNum and SellBeers.Beer = LikeBeer.Beer) * 2) + ((Select count(*) Where Bars.Personality = Drinkers.Personality) * 3) + (round((Select sum(BarRating.rating) From BarRating Where BarRating.Bar = Bars.Name) / (Select count(*) From BarRating Where BarRating.Bar = Bars.Name)) * 2)) From Drinkers Where Drinkers.city = d.City and (Drinkers.Name != d.Name and Drinkers.PhoneNum != d.PhoneNum)) as Matches, Bars.* From Drinkers d, Bars Where d.name = ? and d.PhoneNum = ? and d.city = Bars.City  group by Matches desc, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});
router.get('/getOutOfCity',function(req,res){

var sql = "Select distinct (((select count(*) From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music) * 2) + ((Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and BarTender.Personality = Drinkers.Personality) * 5) + ((Select count(*) From SellBeers, LikeBeer Where SellBeers.Bar = Bars.Name and LikeBeer.Name = Drinkers.Name and LikeBeer.PhoneNum = Drinkers.PhoneNum and SellBeers.Beer = LikeBeer.Beer) * 3) + (Select count(*) From SellBeers Where SellBeers.Bar = Bars.Name and SellBeers.Price < 7) + (Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and (BarTender.age - Drinkers.Age < 8 and BarTender.age - Drinkers.age > -8)) +  ((Select count(*) Where Bars.Personality = Drinkers.Personality) * 3) + (round((Select sum(BarRating.rating) From BarRating Where BarRating.Bar = Bars.Name) / (Select count(*) From BarRating Where BarRating.Bar = Bars.Name)) * 2)) as Matches, Bars.* From Drinkers, Bars Where Drinkers.name = ? and Drinkers.PhoneNum = ? and Drinkers.city != Bars.City group by Matches desc, Bars.City, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});
router.get('/getBeers',function(req,res){

var sql = "SELECT * FROM Beers;";

var query = connection.query(sql, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});


router.put('/putLikeBeers',function(req,res){
  res.contentType('application/json');
  
     var like = {
        Beer: req.body.Beer,
        PhoneNum: req.body.PhoneNum,
        Name: req.body.Name
    };


  var sql = "INSERT INTO LikeBeer SET ?";

  var query = connection.query(sql, like, function (err, rows, fields) {
    if (err) throw err
  })

  res.send(req.body);
});

router.get('/getMinMax',function(req,res){

var sql = "select Beers.Beer, (Select min(Cast(SellBeers.Price AS DECIMAL(15, 2))) From SellBeers Where SellBeers.Beer = Beers.Beer) as MinPrice, (Select max(Cast(SellBeers.Price AS DECIMAL(15, 2))) From SellBeers Where SellBeers.Beer = Beers.Beer) as MaxPrice From Beers, Drinkers, LikeBeer Where Drinkers.Name = ? and Drinkers.PhoneNum = ? and LikeBeer.Name = Drinkers.Name and LikeBeer.PhoneNum = Drinkers.PhoneNum and Beers.Beer = LikeBeer.Beer Union all select Beers.Beer, (Select min(Cast(SellBeers.Price AS DECIMAL(15, 2))) From SellBeers Where SellBeers.beer = Beers.Beer) as MinPrice, (Select max(Cast(SellBeers.Price AS DECIMAL(15, 2))) From SellBeers Where SellBeers.beer = Beers.Beer) as MaxPrice From Beers, Drinkers Where Drinkers.Name = ? and Drinkers.PhoneNum = ? and not exists(Select * From LikeBeer lb2 Where lb2.Name = Drinkers.Name and lb2.PhoneNum = ? and Beers.Beer = lb2.Beer)";
var filter = [req.query.Name, req.query.PhoneNum, req.query.Name, req.query.PhoneNum, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/getMyRatings',function(req,res){

var sql = "Select * From BarRating Where BarRating.Name = ? and BarRating.PhoneNum = ?";
var filter = [req.query.Name, req.query.PhoneNum];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});

router.get('/getUpdateRating',function(req,res){

var sql = "Update BarRating Set BarRating.rating = ? Where BarRating.Name = ? and BarRating.PhoneNum = ? and BarRating.Bar = ?";
var filter = [req.query.rating, req.query.Name, req.query.PhoneNum, req.query.Bar];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err
})
  res.send('Inputted');
  res.end();
});

router.get('/getAllCities',function(req,res){

var sql = "SELECT distinct City FROM Bars group by City asc";

var query = connection.query(sql, function (err, rows, fields) {
  if (err) throw err
  res.send(rows);
  res.end();
})
});

router.get('/getIdealMatchCity',function(req,res){

var sql = "Select distinct ((select count(*) From Plays Where Plays.bar = Bars.Name and Drinkers.Music = Plays.music) + ((Select count(*) From BarTender, Employed Where Employed.bar = Bars.Name and Employed.bartender = BarTender.Name and BarTender.Personality = Drinkers.Personality) * 3) + ((Select count(*) From SellBeers, LikeBeer Where SellBeers.Bar = Bars.Name and LikeBeer.Name = Drinkers.Name and LikeBeer.PhoneNum = Drinkers.PhoneNum and SellBeers.Beer = LikeBeer.Beer) * 2) + ((Select count(*) Where Bars.Personality = Drinkers.Personality) * 3) + (round((Select sum(BarRating.rating) From BarRating Where BarRating.Bar = Bars.Name) / (Select count(*) From BarRating Where BarRating.Bar = Bars.Name))) + (Select IFNULL((Select BarRating.rating From BarRating Where BarRating.Name = Drinkers.Name and BarRating.Bar = Bars.Name and BarRating.PhoneNum = Drinkers.PhoneNum), 5))) as Matches, Bars.* From Drinkers, Bars Where Drinkers.name = ? and Drinkers.PhoneNum = ? and Bars.City = ? group by Matches desc, Bars.Name";
var filter = [req.query.Name, req.query.PhoneNum, req.query.City];

var query = connection.query(sql, filter, function (err, rows, fields) {
  if (err) throw err

      res.send(JSON.stringify(rows));
      res.end();
})
});


module.exports = router;