const express = require("express");
const pool = require("../config/db");
const router = express.Router();

router.get("/", async (req,res) =>{
    const result = await pool.query("SELECT * FROM problems")
    res.json(result.rows);
});

router.get("/:id", async (req,res) =>{
    try{
        const {id} = req.params;
        const result = await pool.query("SELECT  * FROM problems WHERE id = $1",[id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Problem not found" });
        }
        res.json(result.rows[0]);
    }catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Something went wrong" });
  }
})



module.exports = router;