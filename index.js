const express = require('express')
const path = require('path')
const fs = require('fs/promises')


const app = express();

const jsonPath = path.resolve('./files/toDo.json')
app.use(express.json()) //<-- middleware Incorporado


//  ------------------------------------------------------------------- GET ----------------------------------------------------------------------------------------


app.get('/tasks', async (req, res) => {
    const jsonFile = await fs.readFile(jsonPath,'utf-8')
    res.send(jsonFile)
})


//  ------------------------------------------------------------------- POST ----------------------------------------------------------------------------------------

app.post('/tasks', async (req, res) => {
    const task = req.body
    const toDoArray = JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
    const lastIndex = toDoArray.length -1 
    const newIndex = toDoArray[lastIndex].id + 1
    toDoArray.push({...task, id: newIndex})
    console.log(toDoArray);
    res.end()
})

// --------------------------------------------------------------------- Delete ---------------------------------------------------------------------------------------

app.delete('/tasks', async (req,res) => {
    const toDoArray= JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
    const {id} = req.body
    const newArray = toDoArray.filter(task => task.id !== id)
    await fs.writeFile(jsonPath, JSON.stringify(newArray))
    res.end()
})


// --------------------------------------------------------------------- UPDATE --------------------------------------------------------------------

app.put('/tasks', async (req, res) => {
    const toDoArray= JSON.parse(await fs.readFile(jsonPath, 'utf-8'))
    const {id,status} = req.body
    const idTask = toDoArray.findIndex(status => status.id === id)
    if(id >= 0){
        toDoArray[idTask].status = status
    }
    console.log(toDoArray);
    await fs.writeFile(jsonPath, JSON.stringify(toDoArray))
    res.end()
})


const PORT = 1234
app.listen(PORT, () => {
    console.log(`Servidor ${PORT}, escuchando`);
})