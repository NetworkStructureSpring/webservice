import app from './app/app.js';

const port = 3000;

app.listen(port, () => {
    console.log(`Todo List app listening at http://localhost:${port}`)  //Application starts from here to listen on port 3000
})