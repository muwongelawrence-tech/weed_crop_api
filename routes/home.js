const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
console.log('listening on port 3400');
res.send('Hello welcome to the weed crop feedback system......');
});

module.exports = router;

