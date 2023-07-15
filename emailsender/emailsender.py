import requests
import mysql.connector
from bs4 import BeautifulSoup
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import requests
from requests.exceptions import MissingSchema, InvalidURL

mydb = mysql.connector.connect(host = "sql6.freesqldatabase.com", user="sql6632226",passwd="tiCaZ5XnGz",database = "sql6632226" )
mycursor = mydb.cursor()

#loop through product table and get prices of each of the product

def pdtloop():
    mycursor.execute("SELECT * FROM products")
    rows = mycursor.fetchall()
    # Loop through the links and print them
    for row in rows:
        URL = row[1]
        headers = { "User-Agent" : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/114.0'}
        try:
            page = requests.get(URL, headers=headers)
            soup = BeautifulSoup(page.content, 'html.parser')
        except (MissingSchema, InvalidURL):
            continue
        title = soup.find(id="productTitle").get_text()
        price = soup.find("span",class_ = "a-price-whole").get_text()
        price = price[:-1]
        price = price.replace(',', '')
        price = float(price)
        update_query = "UPDATE products SET name = %s WHERE ASIN = %s"
        mycursor.execute(update_query, (title, row[0]))
        update_query = "UPDATE products SET pricenow = %s WHERE ASIN = %s"
        mycursor.execute(update_query, (price, row[0]))
    mydb.commit()

def sendmail(email,title,pricelimit,URL):
     sender_email = "pricetrackingsite@gmail.com"
     receiver_email = email
     subject = "Price drop alert"
     message = "Hello , the price of" +  title + "has dropped below Rs." + str(pricelimit) + " .Follow the link below to view " + URL 
     smtp_server = "smtp.gmail.com"
     smtp_port = 587
     server = smtplib.SMTP(smtp_server, smtp_port)
     server.starttls()
     email_password = "" #emailpassword goes here
     server.login(sender_email, email_password)
     email = MIMEMultipart()
     email["From"] = sender_email
     email["To"] = receiver_email
     email["Subject"] = subject
     email.attach(MIMEText(message, "plain"))
     server.sendmail(sender_email, receiver_email, email.as_string())
     server.quit()

#loop through product table and get prices of each of the product
def bridgeloop():
    query = """
            SELECT users.email, products.name, products.pdtlink,products.pricenow,bridge.price_limit, bridge.last,bridge.s_no
            FROM bridge
            JOIN users ON bridge.upk = users.s_no
            JOIN products ON bridge.asin = products.ASIN
            """
    mycursor.execute(query)
    results = mycursor.fetchall()
    for result in results:
        email = result[0]
        name = result[1]
        pdtlink = result[2]
        pricenow=result[3]
        pricelimit = result[4]
        last = result[5]
        b_s_no = result[6]
        if pricelimit >= pricenow and last != '1':
            sendmail(email,name,pricelimit,pdtlink)
            update_query = f"""
                UPDATE bridge
                SET last = '1'
                WHERE s_no = {b_s_no}
            """
            mycursor.execute(update_query)
        elif last == 'n':
            update_query = f"""
                UPDATE bridge
                SET last = '0'
                WHERE s_no = {b_s_no}
            """
            mycursor.execute(update_query)
    mydb.commit()

pdtloop()
bridgeloop()
mycursor.close()
mydb.close()

