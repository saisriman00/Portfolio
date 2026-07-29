"""Run:  python setup_db.py — creates DB + table automatically"""
import sys, subprocess

def install():
    subprocess.check_call([sys.executable,"-m","pip","install","mysql-connector-python"])

try:
    import mysql.connector
    from mysql.connector import Error
except ImportError:
    install()
    import mysql.connector
    from mysql.connector import Error

CFG = dict(host="localhost", port=3306, user="root", password="sai2004")

SQL = [
    "CREATE DATABASE IF NOT EXISTS portfolio_db;",
    "USE portfolio_db;",
    """CREATE TABLE IF NOT EXISTS portfolio_messages (
        id           INT          NOT NULL AUTO_INCREMENT,
        name         VARCHAR(100) NOT NULL,
        email        VARCHAR(150) NOT NULL,
        message      TEXT         NOT NULL,
        submitted_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;"""
]

print("="*50)
print("  PORTFOLIO DB SETUP")
print("="*50)
try:
    conn = mysql.connector.connect(**CFG)
    cur  = conn.cursor()
    for s in SQL:
        cur.execute(s)
        print(f"✅ {s[:55].strip()}...")
    conn.commit()
    cur.execute("DESCRIBE portfolio_messages;")
    print("\n📋 Table columns:")
    for r in cur.fetchall():
        print(f"   {r[0]:<20} {r[1]}")
    print("\n🎉 Database ready! Now run:  python app.py")
except Error as e:
    print(f"❌ Error: {e}")
    print("Make sure MySQL is running and password is correct.")
finally:
    try: cur.close(); conn.close()
    except: pass
