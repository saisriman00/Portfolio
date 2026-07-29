import re, html
from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from mysql.connector import Error

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])  # Vite port

DB = dict(host="localhost", port=3306, user="root", password="sai2004", database="portfolio_db", charset="utf8mb4")

def sanitize(v, n=500):
    return html.escape(v.strip())[:n]

def valid_email(e):
    return bool(re.match(r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$", e))

@app.route("/api/contact", methods=["POST"])
def contact():
    d = request.get_json(silent=True) or {}
    name    = d.get("name","").strip()
    email   = d.get("email","").strip()
    message = d.get("message","").strip()

    errs = []
    if not name:                  errs.append("Name is required.")
    if not valid_email(email):    errs.append("Valid email required.")
    if len(message) < 10:        errs.append("Message must be at least 10 characters.")
    if errs: return jsonify(success=False, errors=errs), 400

    conn = cur = None
    try:
        conn = mysql.connector.connect(**DB)
        cur  = conn.cursor(prepared=True)
        cur.execute(
            "INSERT INTO portfolio_messages (name,email,message) VALUES (%s,%s,%s)",
            (sanitize(name,100), sanitize(email,150), sanitize(message,2000))
        )
        conn.commit()
        return jsonify(success=True, message="Saved!", id=cur.lastrowid), 201
    except Error as e:
        app.logger.error(e)
        return jsonify(success=False, errors=["Database error."]), 500
    finally:
        if cur:  cur.close()
        if conn and conn.is_connected(): conn.close()

@app.route("/api/health")
def health():
    return jsonify(status="ok")

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
