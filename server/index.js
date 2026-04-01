const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// Paths
const publicDir = path.join(__dirname, '..', 'public');
const uploadsDir = path.join(publicDir, 'uploads');
const dataDir = path.join(__dirname, '..', 'data');
const dataFile = path.join(dataDir, 'images.json');

// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);

// Default images
const defaultImages = {
  profile: '/images/2.png',
  projects: [
    '/images/project1.jpg',
    '/images/project2.JPG',
    '/images/project3.JPG'
  ]
};

// Load or initialize data file
function loadImages() {
  try {
    if (!fs.existsSync(dataFile)) {
      fs.writeFileSync(dataFile, JSON.stringify(defaultImages, null, 2));
      return defaultImages;
    }
    const content = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error('Failed to load images.json, using defaults:', err);
    return defaultImages;
  }
}

function saveImages(images) {
  fs.writeFileSync(dataFile, JSON.stringify(images, null, 2));
}

// View engine and static
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));
app.use('/public', express.static(publicDir));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));
app.use('/styles', express.static(path.join(__dirname, '..', 'styles')));
app.use('/javascript', express.static(path.join(__dirname, '..', 'javascript')));

app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + unique + ext);
  }
});
const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  const images = loadImages();
  res.render('index', { images });
});

app.post('/upload/profile', upload.single('profileImage'), (req, res) => {
  if (!req.file) return res.redirect('/');
  const images = loadImages();
  images.profile = '/public/uploads/' + req.file.filename;
  saveImages(images);
  res.redirect('/');
});

app.post('/upload/project/:idx', upload.single('projectImage'), (req, res) => {
  const index = parseInt(req.params.idx, 10);
  if (!req.file || Number.isNaN(index)) return res.redirect('/');
  const images = loadImages();
  if (!Array.isArray(images.projects)) images.projects = [];
  images.projects[index] = '/public/uploads/' + req.file.filename;
  saveImages(images);
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


