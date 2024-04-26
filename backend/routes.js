const router = require('express').Router();
const {welcome,record,playrecording,getreports,getpatient,gethistory,getpatients} = require('./controllers/functions')
const {uploadFile,formatFile,image,getTxt} = require('./controllers/llmapis')
// const {chatbot} = require('./controllers/chatbot')
router.post('/welcome',welcome)
router.post('/upload',uploadFile)
router.post('/format',formatFile)
router.post('/getreports',getreports)
router.post('/getpatient',getpatient)
router.post('/gethistory',gethistory)
// router.post('/chatbot',chatbot)
router.post('/record',record)
router.get('/image/:id',image)
router.get('/playrecording/:id',playrecording)
router.post('/getpatients',getpatients)
router.get('/getresponse',getTxt);
module.exports = router