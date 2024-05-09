const {Router} = require('express');
const employeeRouter = Router();
const authMiddleware = require('../middlewares/authMiddleware')
const {getAllEmployees,getEmployeeById,createEmployee,updateEmployee,deleteEmployee} = require('../controler/employeeController')



const path = require('path');
const multer = require('multer');

// ============================== Multer configuration for uploading mainImage ===========================
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join(__dirname,'../public/Images'));
    },
    filename:function(req,file,cb) {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage ,
    fileFilter:(req, file, cb) => {
     const allowedExtensions = ['.jpeg','.png','.jpg','.webp'];
     // Get the file extension by using path module
     const fileExtension = path.extname(file.originalname).toLowerCase();
   
     // Check if the file extension is allowed
     if (allowedExtensions.includes(fileExtension)) {
       cb(null, true);
     } else {
       const error = new multer.MulterError('Only JPEG files are allowed');
       error.code = 'LIMIT_FILE_TYPES'; //  Set a custom error code
       cb(error);
     }
   },
    limits: { fileSize: 1024 * 1024 } // 1MB size limit size 
   });




employeeRouter.route('/getAllEmployee').get(authMiddleware,getAllEmployees);
employeeRouter.route('/employee/:id').get(authMiddleware,getEmployeeById);
employeeRouter.route('/employeeCreate').post(authMiddleware,upload.single('image'),createEmployee);
employeeRouter.route('/employeeUpdate/:id').post(authMiddleware,updateEmployee);
employeeRouter.route('/deleteEmployee/:id').delete(authMiddleware,deleteEmployee)


module.exports = employeeRouter;
