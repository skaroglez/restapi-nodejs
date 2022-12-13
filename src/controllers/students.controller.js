import { pool } from "../db.js";

export const getStudents = async (req, res) =>
{
    try{
        const query ="SELECT * FROM students";
        const [rows] = await pool.query(query,[]);

        rows.forEach(element => {
            var year =  element.dateAdmission.getFullYear().toString();
            var month = ( element.dateAdmission.getMonth() + 101).toString().substring(1);
            var day = ( element.dateAdmission.getDate() + 100).toString().substring(1);
            
            element.dateAdmission = day + "/" + month + "/" + year;      
        });
        res.send(rows);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
    
};
export const getStudent = async (req, res) =>
{
    try{
        const { id } = req.params;
        const query ="SELECT * FROM students WHERE id = ?";
        const [rows] = await pool.query(query,[id]);
    
        if(rows.length <= 0){
            return res.status(404).json({
                message:"Student not found"
            });
        }
        res.send(rows[0]);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};


export const createStudent = async (req, res) => {
    try{
        const { name, dateAdmission } = req.body;
        const query ="INSERT INTO students (name, dateAdmission) VALUES (?, ?)";
    
        const [rows] = await pool.query(query, [name, dateAdmission]);
        res.send({
            id: rows.insertId,
            name,
            dateAdmission
        });
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};

export const updateStudent = async (req, res) => {
    try{
        const { id } = req.params;
        const { name, dateAdmission } = req.body;
        
        const query ="UPDATE students SET name = IFNULL(?, name), dateAdmission = IFNULL(?, dateAdmission) WHERE id = ?";
        const [result] = await pool.query(query,[name, dateAdmission, id]);
        if(result.affectedRows === 0){
            return res.status(404).json({
                message:"Student not found"
            });
        }
        res.status(202).json({
            message:"Student updated"
        });
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};

export const deleteStudent = async (req, res) => {
    try{
        const { id } = req.params;
   
        const query ="DELETE FROM students WHERE id=?";
        const [result] = await pool.query(query,[id]);
    
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message:"Student not found"
            });
        }
        res.status(204);
    }catch(error){
        res.status(500).json({
            message:'Something goes wrong'
        });
    }
};