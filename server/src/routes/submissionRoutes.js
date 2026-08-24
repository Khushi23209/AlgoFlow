const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const runCode = require("../../docker/runner");
const { requireAuth } = require("../config/passport");


router.post("/",requireAuth, async (req, res) => {
  try {
    const { problem_id, code } = req.body;
    const user_id = req.user.id;
    if (!user_id || !problem_id || !code) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    
    const result = await pool.query(
      "INSERT INTO submissions (user_id, problem_id, code) VALUES ($1, $2, $3) RETURNING *",
      [user_id, problem_id, code]
    );

    
    const executionResult = await runCode(code);

    console.log("Execution result:", executionResult);

    
    let status;
    let trace;

    if (executionResult.exitCode === 0) {
      try {
        trace = JSON.parse(executionResult.stdout);
        status = "Completed";
      } catch (parseErr) {
        status = "Failed";
        trace = null;
      }
    } else {
      status = "Failed";
      trace = null;
    }

    
    const updatedResult = await pool.query(
    `
        UPDATE submissions
        SET trace = $1,
            status = $2
        WHERE id = $3
        RETURNING *
    `,
    [
        trace ? JSON.stringify(trace) : null,
        status,
        result.rows[0].id,
    ]
    );

   
    res.status(201).json(updatedResult.rows[0]);

  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

router.get("/:id", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM submissions WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Submission not found",
      });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

module.exports = router;