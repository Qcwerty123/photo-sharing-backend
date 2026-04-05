const express = require('express');
const cors = require('cors');

// Import dữ liệu từ thư mục modelData
const models = require('./modelData/models'); 

const app = express();

// Bật CORS để cho phép Frontend gọi API
app.use(cors());

// 1. API: /test/info
app.get('/test/info', (req, res) => {
    res.status(200).json(models.schemaInfo());
});

// 2. API: /user/list
app.get('/user/list', (req, res) => {
    res.status(200).json(models.userListModel());
});

// 3. API: /user/:id
app.get('/user/:id', (req, res) => {
    const user = models.userModel(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "Người dùng không tồn tại" });
    }
    res.status(200).json(user);
});

// 4. API: /photosOfUser/:id
app.get('/photosOfUser/:id', (req, res) => {
    const photos = models.photoOfUserModel(req.params.id);
    if (!photos || photos.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy ảnh" });
    }
    res.status(200).json(photos);
});

// Bắt các đường dẫn không tồn tại (404)
app.use((req, res) => {
    res.status(404).json({ message: "API endpoint không tồn tại" });
});

// Khởi động server
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`✅ Backend Server đang chạy tại: http://localhost:${PORT}`);
});