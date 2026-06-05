const express = require('express')
const {registerUser, loginUser, getUserProfile, updateUserProfile} = require('../controllers/authController')
const {protect} = require('../middlewares/authMiddleware')
const upload = require('../middlewares/uploadMiddleware')

const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/profile", protect, getUserProfile)
router.put("/profile", protect, updateUserProfile)

router.post("/upload-image", upload.single("image"), (req, res) => {
    try {
        if (!req.file){
            return res.status(400).json({message: "No file uploaded"})
        }
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/`

        res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: imageUrl,
            filename: req.file.filename
        })
    } catch (error) {
        res.status(500).json({message: "Upload failed", error: error.message})
    }
    
})

module.exports = router