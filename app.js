const express=require('express');
const app=express();
const path = require('path');
const mongoose=require('mongoose');
const Restaurant = require('./models/restaurant');
const methodOverride = require('method-override');
mongoose.connect('mongodb://localhost/RestaurantReview', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


app.use(methodOverride('_method'));
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get('/',(req,res)=>{
    res.render('home');

});
app.get('/restaurants',async (req,res)=>{
    const restaurants= await Restaurant.find({});
    res.render('restaurant/index',{restaurants});

});
app.get('/restaurant/new', async (req, res,) => {
   
    res.render('restaurant/new');
});
app.get('/restaurants/:id', async (req, res,) => {
    const restaurant = await Restaurant.findById(req.params.id)
    res.render('restaurant/show', { restaurant });
});

app.get('/makeRestaurant',async (req,res)=>{
   const temp= new Restaurant({title:'joker'})
    await temp.save();
    res.send(temp);
});
app.get('/restaurant/:id/edit', async (req, res) => {
    const restaurant = await Restaurant.findById(req.params.id)
    res.render('restaurant/edit', { restaurant });
})
app.post('/restaurants', async (req, res) => {
  
    const restaurant = new Restaurant(req.body.restaurant);
    await restaurant.save();
    res.redirect(`/restaurants/${restaurant._id}`)
})

app.put('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndUpdate(id, { ...req.body.restaurant });
    res.redirect(`/restaurants/${restaurant._id}`)
});
app.delete('/restaurants/:id', async (req, res) => {
    const { id } = req.params;
    await Restaurant.findByIdAndDelete(id);
    res.redirect('/restaurants');
})
app.listen(3000,() => {
    console.log('listening on port 3000');
});