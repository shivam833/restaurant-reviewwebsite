const mongoose=require('mongoose');
const schema=mongoose.Schema;


const RestaurantSchema=new schema({
  title:String,
  location:String,
  description:String,
  
});

const Restaurant=mongoose.model('Restaurant',RestaurantSchema);
module.exports=Restaurant;