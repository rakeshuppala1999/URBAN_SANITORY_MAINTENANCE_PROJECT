const express =require('express')
//const { stat } = require('fs')
const app = express()
const port = 8522

app.use(express.static('public'))
app.use('/css',express.static(__dirname+ 'public/css'))
app.use('/images', express.static(__dirname + 'public/images'))

app.set('views','./views')
app.set('view engine', 'hbs')



app.get('',(req,res)=>{
  res.render('login.hbs',{text: 'this is rakesh'})

})



app.listen(port, ()=>console.info('Listening on port number  $ {port}'))