const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app= require('express');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST, 
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,

});

var temp='' ;





exports.form= async (req, res)=>
{
    message = '';
   if(req.method == "POST")
   {
      var post  = req.body;
      var email_id= post.email_id;
      var phone= post.phone;
      var t_id= post.t_id;
      var c_id= post.c_id;
      var cd= post.cd;
 
	  if (!req.files)
				return res.status(400).send('No files were uploaded.');
 
		var file = req.files.img;
		var img_name =file.name;
 
	  	 if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" )
           {
                                 
              file.mv('public/images/upload_images/'+file.name, function(err)
                    {
                             
	              if (err)
 
	                return res.status(500).send(err);
      					var sql = "INSERT INTO `complaint`(`email_id`,`mobile_no`,`t_id`,`com_type`, `images` ,`com_desc`) VALUES ('" + email_id + "','" + phone + "','" + t_id + "','" + c_id + "','" + file + "','" + cd + "')";
                           //console.log(sql);
    						var query = db.query(sql, function(err, result) 
                            {

                             function between(min, max) 
                                {  
                                    return Math.floor(Math.random() * (max - min + 1) + min)
                                   
                                }
                                  console.log(between(1,300));
    							 res.render('complaint_id'+result.insertId);
    						});
					});
          }
           else 
           {
            message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
            res.render('form',{message: message});
           }
   }
   
   else
    {
      res.render('complaint_id',
       {
        message: '👍 complaint registered  successfuly✅'
       })
    }
};



 /*exports.form =(req, res) =>
{
    


/*exports.form = async (req,res) =>
{

    console.log(temp);
    try
    {
          // store all the user input data
  const userDetails=req.body;
 
  // insert user data into users table
  /*var sql = 'INSERT INTO complaint SET ?';
  db.query(sql, userDetails,function (err, results) { 
      if (err)
      {
       console.log(err)
      }
      
      else
        {
            console.log(results);
            return res.render('complaint_id',{
                message: '👍 complaint registered  successfuly✅'
            }); 
        }

  });*/
   /* console.log(req.body);
    
    const { email_id,mobile_no,t_id,com_type,images,com_desc } = req.body;
    var file=req.files;

    db.query('INSERT INTO complaint SET ?' ,{email_id: email_id,mobile_no: mobile_no,t_id: t_id,com_type: com_type,images: images,com_desc: com_desc}, async(error, results) => {
        if(error)
        {
            console.log(error);

        }
        else
        {
            console.log(results);
            return res.render('form',{
                message: '👍 complaint registered  successfuly✅'
            }); 
        }
    }) */

    
  /*  catch(error)
    {
        console.log(error);
    } */
 

   






exports.login = async (req,res) => 
{
    try
    {
        const { email,password} = req.body;

        if( !email || !password)
        {
            return res.status(400).render('login',
            {
                message: '🤦🏻‍♂️Please provide an email and password'
            });
        }
        else
        {

         db.query('SELECT email_id,password FROM user_register WHERE email_id =?' ,[email] , async(error,results)=>
         {
            console.log(results);
            if( !results || !(await bcrypt.compare(password,results[0].password)))
            {
                res.status(401).render('login', 
                {
                    message: '👎Email or Password is incorrect❎'
                })
            }
            else
            {
                db.query('SELECT name FROM user_register where email_id=?' ,[email] ,async(error,results)=>
                {
                    
                    
                    temp = email;
                   

                
                    console.log(results);
                   // let x=toString(results);
                    return res.render('services',
                    {
                    message: ('Welcome: ' +temp +" 🙋‍♂️") 
                    }); 
               });
            }
         });
       }

    }
    
    catch(error)
    {
        console.log(error);
    }
}

exports.register =(req, res) =>
{
    console.log(req.body);
    
    const { name,mobile,email,password} = req.body;

    db.query('SELECT email_id FROM user_register WHERE email_id= ?' ,[email],async (error, results) => {
        if(error) {
            console.log(error);

        }

        if( results.length > 0)
        {
            return res.render('register', {
                message: '🤷‍♂️ The User already Exists'
            });
        }  

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);


       /* var q = "Insert into user_register (name, mobile_no, email, user_id, password) VALUES ('" + req.body.name + "', " + req.body.mobile_no + ", " + req.body.email + ", " + req.body.user_id +"," + req.body.password +" )";
        connection.query(q, function(err){
            if(err) throw err
            res.render("login", {message: 'data saved!!'});
        });
*/
        
        db.query('INSERT INTO user_register SET ?' ,{name: name,mobile_no: mobile,email_id: email,password: hashedPassword}, async(error, results) => {
            if(error)
            {
                console.log(error);

            }
            else
            {
                console.log(results);
                return res.render('register',{
                    message: '👍 User registered ✅'
                }); 
            }
        }) 
    
    });





    
}