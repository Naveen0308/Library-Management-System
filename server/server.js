const express=require('express');
const mysql=require('mysql2');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());
const db=mysql.createConnection({
    host:'bij9onsn12pl9gqmalve-mysql.services.clever-cloud.com',
    user:'udrcmp3b4fnve67g',
    password:'8Z48zUAOwvcwKeRLIWNZ',
    database:'bij9onsn12pl9gqmalve'
});


db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});


app.post('/api/login', async (req, res) => {
  try {
      const { email, password } = req.body;
      const sql = 'SELECT * FROM users WHERE email = ?';

      db.query(sql, [email], (err, result) => {
          if (err) {
              console.error('Error executing MySQL query:', err);
              res.status(500).json({ error: 'Internal Server Error' });
          } else {
              if (result.length === 0) {
                  res.status(401).json({ error: 'Enter Valid Email and Password' });
              } else {
                  const passwordMatch = password === result[0].password;
                  if (!passwordMatch) {
                      res.status(401).json({ error: 'Incorrect email or password' });
                  } else {
                      res.status(200).json({ success: true, email: result[0].email, userId: result[0].id, message: 'Login successfully done' });
                  }
              }
          }
      });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Log received data
    console.log('Received data:', req.body);

    const query = 'INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)';
    const values = [name, username, email, password];

    // Execute the query
    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
      } else {
        res.status(201).json({ success: true, message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




app.get('/',(req,res)=>{
  const sql="SELECT * FROM Books";
  db.query(sql,(err,data)=>{
      if(err) return res.json(err);
      return res.json(data);
  })
})


  app.listen(8081,()=>{
    console.log('Server is running on port 8081');
  })