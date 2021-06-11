const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({
    filename: (req, file, cb) => {
      cb(null, Date.now() + "--" + file.originalname);
    },
  }),
});
