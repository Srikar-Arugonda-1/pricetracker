from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app) 

def extract_asin(link):
    start_index = link.find("/dp/") + 4  
    if start_index == -1:
        return None  
    asin = link[start_index:start_index + 10]  
    if len(asin) != 10:
        return None 
    return asin

connection = pymysql.connect(
    host='sql6.freesqldatabase.com',
    user='sql6632226',
    password='tiCaZ5XnGz',
    database='sql6632226',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('pass')
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM users WHERE email=%s"
            cursor.execute(query, email)
            user = cursor.fetchone()

            if not user:
                return jsonify({"success": False, "message": "Email not registered,try signing up first"})

            if user["password"] == password:
                return jsonify({"success": True})
            else:
                return jsonify({"success": False, "message": "Incorrect password"})
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred"})
    
@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('pass')
    try:
        with connection.cursor() as cursor:
            query = "SELECT * FROM users WHERE email=%s"
            cursor.execute(query, email)
            user = cursor.fetchone()

            if not user:
                try:
                  with connection.cursor() as cursor:
                    query = "INSERT into users (email,password) VALUES (%s,%s)"
                    cursor.execute(query, (email, password))                    
                    connection.commit()
                    return jsonify({"success": True, "message": "Account created.Proceed logging in"})
                except Exception as e:
                    return jsonify({"success": False, "message": "An error occurred"})
            else:
                return jsonify({"success": False, "message": "An account with that email already exists."})
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred"})
    
@app.route('/api/addlist', methods=['POST'])
def addlist():
    data = request.get_json()
    link = data.get('link')
    price = data.get('price')
    email = data.get('email')
    asin = extract_asin(link)
    last = 'n'
    if asin == None:
        return jsonify({"success": False, "message": "Invalid Link"})
    try:
        with connection.cursor() as cursor:
            query = "SELECT s_no FROM users WHERE email=%s"
            cursor.execute(query, email)
            user = cursor.fetchone()
            if user is not None:
                s_no = user['s_no']
            else:
                return jsonify({"success": False, "message": "An error occurred"})
                
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred"})
    

    try:
        with connection.cursor() as cursor:
            query = "INSERT into products (ASIN,pdtlink) VALUES (%s,%s)"    
            cursor.execute(query, (asin, link))   
            query = "INSERT into bridge (price_limit,last,upk,asin) VALUES (%s,%s,%s,%s)" 
            cursor.execute(query, (price,last,s_no,asin))
            connection.commit()
            return jsonify({"success": True, "message": "Updated wishlist"})
    except Exception as e:
        return jsonify({"success": False, "message": "An error occurred"})

if __name__ == '__main__':
    app.run()
