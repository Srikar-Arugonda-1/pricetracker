from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app) 

connection = pymysql.connect(
    host='sql6.freesqldatabase.com',
    user='sql6632226',
    password='tiCaZ5XnGz',
    database='sql6632226',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/api/login', methods=['POST'])
def login():
    print(f"Received login request for email: ")
    data = request.get_json()
    email = data.get('email')
    password = data.get('pass')
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM users WHERE email=%s"
            cursor.execute(query, email)
            user = cursor.fetchone()

            if not user:
                return jsonify({"success": False, "message": "Email not found"})

            if user["password"] == password:
                return jsonify({"success": True})
            else:
                return jsonify({"success": False, "message": "Incorrect password"})
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred"})

if __name__ == '__main__':
    app.run()
