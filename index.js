const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express();
const PORT = 8000


app.use(express.urlencoded({extended:false}));


app.get('/users' , (req, res) => {
    const html  = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;

    res.send(html);
})


//Routes
app.get('/api/users', (req, res) => {
    return res.json(users);
})

app.get('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id );
    return res.json(user);
})

app.post("/api/users" , (req, res) => {
    //todo: Create a new user
    const body = req.body;
    users.push({id: users.length + 1, ...body});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err , data) => {
        return res.json({status: "Added"});
    })


    
    

   

})

app.patch("/api/users/:id" , (res, req) => {
    //todo: Edit a user with id
    return req.json({status: "Pending"});
    
})


app.delete("/api/users/:id" , (res, req) => {
    //todo: Delete a user with id
    return req.json({status: "Pending"});
    
})



 
app.listen(PORT, (()=>{
    console.log(`Server Started ay port ${PORT}`)
}))
