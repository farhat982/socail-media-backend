import express from 'express';
import colors from 'colors';
import cors from 'cors';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import relationshipRoutes from './routes/relationships.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import bodyParser from 'body-parser';
import helmet from 'helmet'

const app = express();

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true);
	next();
});
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(helmet());

app.use(cookieParser());
app.use(
	cors({ origin: 'https://social-media-backend-i91c.onrender.com', credentials: true })
);
app.set('trust proxy', 1);


//upload images in own server//
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../frontend/public/upload');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post('/api/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});
//upload images in own server//

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/relationships', relationshipRoutes);

app.listen(8000, () => {
  console.log('Server is running on Port 8000'.yellow.underline);
});
