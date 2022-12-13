import app from './app.js';
import { PORT } from "./config.js";

//starting the server
app.listen(PORT, ()=>{
    console.log('server on port ' + PORT);
});