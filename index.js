var express = require('express');
var ejs = require('ejs');
var request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();
const port = process.env.PORT || 3000;
/*const multer = require('multer');*/
const fs = require('fs');


app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({ extended: true }));

/*
const mysql = require('mysql');

const con = mysql.createConnection({
  host: '127.0.0.1',
  user: 'master',
  password: '0000',
  database: 'KETA'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

app.post('/result', (req, res) => {
  const passportNumber = req.body['passport-number'];
  const birthDate = formatDate(req.body.birthdate);

  // 데이터 유효성 검사
  if (!passportNumber || !birthDate) {
    return res.render('result', { result: { error: '데이터가 유효하지 않습니다. 다시 작성해주세요.' } });
  }

  const sql = `SELECT r.*, a.surname
               FROM result r
               LEFT OUTER JOIN apply a ON r.passportnumber = a.passportnumber AND r.birth = a.birth
               WHERE r.passportnumber = '${passportNumber}' AND r.birth = '${birthDate}'`;

  con.query(sql, (err, result, fields) => {
    if (err) {
      console.error(err);
      return res.render('result', { result: { error: '데이터가 유효하지 않습니다. mm/dd/yyyy에 맞춰 작성해주세요' } });
    }

    let response = {};
    if (result.length > 0) {
      if (result[0].status === 'O') {
        response.message = `${result[0].surname} 님은 현재 ETA의 발급이 완료된 상태입니다.`;
      } else {
        response.message = `${result[0].surname} 님은 현재 ETA의 발급이 완료되지 않은 상태입니다.`;
      }
    } else {
      response.error = 'Provided passport number and birth date do not match any ETA records.';
      response.message = '유효하지 않은 데이터입니다.';
    }

    res.render('result', { result: response });
  });
});

app.post('/apply', (request, response) => {
  const checkQuery = "SELECT * FROM pay WHERE id = 4";
  const insertQuery = "INSERT INTO apply SET ?";
  const applyData = {
    passportnumber: request.body.passportnumber,
    continent: request.body.continent,
    country: request.body.country,
    email: request.body.email,
    othercitizen: request.body.othercitizen,
    exPothercountry: request.body.exPothercountry,
    gender: request.body.gender,
    surname: request.body.surname,
    givenname: request.body.givenname,
    birth: formatDate(request.body.birth),
    passExpire: formatDate(request.body.passExpire),
    phonenumber: request.body.phonenumber,
    exPkorea: request.body.exPkorea,
    purpose: request.body.purpose,
    koreaaddress: request.body.koreaaddress,
    koreanumber: request.body.koreanumber,
    job: request.body.job,
    disease: request.body.disease,
    guilty: request.body.guilty,
    paymentMethod: request.body.paymentMethod,
    created_time: new Date(),
    updated_time: new Date()
  };

  con.query(checkQuery, (err, result) => {
    if (err) {
      console.error(err);
      response.status(500).send("등록 중 오류가 발생했습니다.");
    } else {
      if (result.length > 0) {
        con.query(insertQuery, applyData, (err, result, fields) => {
          if (err) {
            console.error(err);
            response.status(500).send("등록 중 오류가 발생했습니다.");
          } else {
            console.log(result);
            response.send("등록 완료");
          }
        });
      } else {
        response.send("결제가 완료되지 않았습니다.");
      }
    }
  });
});

app.post('/save-photo', (req, res) => {
  const uploadDirectory = path.join(__dirname, 'public', 'assets', 'passport'); // 저장할 디렉토리 경로

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = Date.now();
      cb(null, timestamp + ext);
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 최대 파일 크기 5MB로 제한
  }).single('photo');

  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("파일 업로드 중 오류가 발생했습니다.");
    } else {
      res.send("파일 업로드 완료");
    }
  });
});


app.post('/save-photo-real', (req, res) => {
  const uploadDirectory = path.join(__dirname, 'public', 'assets', 'photo'); // 저장할 디렉토리 경로

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      const timestamp = Date.now();
      cb(null, timestamp + ext);
    }
  });

  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 최대 파일 크기 5MB로 제한
  }).single('photo');

  upload(req, res, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("파일 업로드 중 오류가 발생했습니다.");
    } else {
      res.send("파일 업로드 완료");
    }
  });
});

*/
/********** */


/*
function formatDate(date) {
  const parts = date.split('/');
  const formattedDate = `${parts[2]}-${parts[0]}-${parts[1]}`;
  return formattedDate;
}

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/guide', function (req, res) {
  res.render('guide');
});

app.get('/result', function (req, res) {
  res.render('result', { result: {} });
});


app.get('/apply', function (req, res) {
  res.sendFile(path.join(__dirname, 'html/form.html'));
});


app.get('/iamport', function (req, res) {
  res.cookie('cookieName', 'cookieValue', { sameSite: 'Strict', secure: true });
  res.render('iamport');
});

app.post('/apply', (req, res) => {
  const currentDateTime = new Date();
  const year = currentDateTime.getFullYear();
  const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
  const day = String(currentDateTime.getDate()).padStart(2, '0');
  const hour = String(currentDateTime.getHours()).padStart(2, '0');
  const uploadDirectory = path.join(__dirname, 'public', 'assets', 'passport', `${year}-${month}-${day}-${hour}`);

  if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
  }

  const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, uploadDirectory);
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const timestamp = Date.now();
        cb(null, timestamp + ext);
      }
    }),
    limits: { fileSize: 5 * 1024 * 1024 } // 최대 파일 크기 5MB로 제한
  }).single('photo');

  upload(req, res, function (err) {
    if (req.file) {
      console.log('파일이 업로드되었습니다:', req.file);
      // 업로드된 파일을 다른 경로로 이동하거나 추가적인 작업을 수행할 수 있습니다.
      // 예를 들어, 파일명을 변경하거나 파일 정보를 데이터베이스에 저장할 수 있습니다.
    } else {
      console.log('업로드된 파일이 없습니다.');
    }

    // 파일 업로드 외에 다른 작업들을 수행합니다.
    // ...
  });
});
*/


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/about', function (req, res) {
  res.render('about');
});

app.get('/price', function (req, res) {
  res.render('price');
});


app.get('/gallery', function (req, res) {
  res.render('gallery');
});


app.get('/reservation', function (req, res) {
  res.render('reservation');
});


app.get('/review', function (req, res) {
  res.render('review');
});


app.listen(port, function () {
  console.log("Listening on port", port);
});

