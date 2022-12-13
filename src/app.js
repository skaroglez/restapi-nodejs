import morgan from "morgan";
import express from "express";

import employeesRoutes from "./routes/employees.routes.js";
import indexRoutes from "./routes/index.routes.js";
const app = express();

//settings
app.set('json spaces', 2);

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// routes
app.use(indexRoutes);
app.use('/api', employeesRoutes);
app.use((req, res, next)=>{
    res.status(404).json({
        message:'endpoint not found'
    });
});

export default app;