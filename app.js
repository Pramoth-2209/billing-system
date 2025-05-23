const express=require('express');
const bodyparser=require('body-parser');
const app=express();

let prdetail=[];
app.use(bodyparser.urlencoded({extended:false}))
app.set('view engine','ejs')
app.use(express.static('public'));

app.get('/',(req,res)=>{
    res.render('index',{prdetail})
})

app.post('/add',(req,res)=>{
    const{prname,prquantity,prrate,prcustomer}=req.body;
    const amount=Number(prquantity)*Number(prrate);
    prdetail.push({prname,prquantity:Number(prquantity),prrate:Number(prrate),amount,prcustomer})
    res.redirect('/')
})

app.post('/clear',(req,res)=>{
    prdetail=[];
    res.redirect('/');
})

app.post('/bill',(req,res)=>{
    const currentdate=new Date().toLocaleString();
    let a=0;
    a=a+1;
    res.render('print',{prdetail,datetime:currentdate,a:a})
})

app.listen(3000,()=>{
    console.log("app runs in localhost 3000")
})


