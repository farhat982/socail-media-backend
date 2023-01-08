import mysql from 'mysql2';
import colors from 'colors';

export const db = mysql.createConnection({
	host: 'database-3.cxsmhfcyfyu4.us-east-1.rds.amazonaws.com',
	user: 'root',
	password: 'password',
	database: 'social',
});

db.connect(function (err) {
	if (err) {
		return console.error('error: ' + err.message);
	}

	console.log('Connected to the MySQL server.');
});
