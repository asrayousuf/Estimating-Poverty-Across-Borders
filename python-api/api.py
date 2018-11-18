import flask
from flask import request, jsonify
import csv


#out of 246 countries, HDI is available for 172 countries.
app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    data = {}
    with open('/home/rosygupta/mysite/Book1.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            if line_count==0:
                pass
            else:
                if row[3]:
                    country = row[3]
                    data[country] = {}
                    data[country]["latitude"] = row[1]
                    data[country]["longitude"] = row[2]
                    data[country]["hdi"] = str(0)
                    lower_country = row[3].lower()
                    with open('/home/rosygupta/mysite/Book1.csv') as second_fp:
                        read_csv = csv.reader(second_fp, delimiter=',')
                        for each_row in read_csv:
                            if lower_country ==each_row[4].lower():
                                data[country]["hdi"] = each_row[5]
            line_count += 1
    count = 0
    for key, val in data.items():
        if 'HDI' in val.keys():
            count+=1
    return jsonify(data)

if __name__ == '__main__':
    app.run()
