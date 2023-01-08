import mysql from 'mysql2';
import colors from 'colors';

export const db = mysql.createConnection({
	host: 'database-1.cxsmhfcyfyu4.us-east-1.rds.amazonaws.com',
	user: 'root',
	password: 'password',
	database: 'social',
	insecureAuth: true,
});

db.connect(function (err) {
	if (err) throw err;
	console.log('Mysql database is Connected!'.cyan.underline);
});
