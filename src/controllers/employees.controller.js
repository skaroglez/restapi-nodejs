import { pool } from "../db.js";

export const getEmployees = async (req, res) =>
{
    try{
        const query ="SELECT * FROM employees";
        const [rows] = await pool.query(query,[]);
        res.send(rows);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
    
};
export const getEmployee = async (req, res) =>
{
    try{
        const { id } = req.params;
        const query ="SELECT * FROM employees WHERE id = ?";
        const [rows] = await pool.query(query,[id]);
    
        if(rows.length <= 0){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        res.send(rows[0]);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};


export const createEmployee = async (req, res) => {
    try{
        const { name, salary } = req.body;
        const query ="INSERT INTO employees (name, salary) VALUES (?, ?)";
    
        const [rows] = await pool.query(query, [name, salary]);
        res.send({
            id: rows.insertId,
            name,
            salary
        });
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};

export const updateEmployee = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, salary } = req.body;
        
        const query ="UPDATE employees SET name = IFNULL(?, name), salary = IFNULL(?, salary) WHERE id = ?";
        const [result] = await pool.query(query,[name, salary, id]);
        if(result.affectedRows === 0){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        res.status(202).json({
            message:"Employee updated"
        });
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};

export const deleteEmployee = async (req, res) => {
    try{
        const { id } = req.params;
   
        const query ="DELETE FROM employees WHERE id=?";
        const [result] = await pool.query(query,[id]);
    
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        res.status(204);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};