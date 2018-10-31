import csv
import sys
import requests 
import json

filename = sys.argv[1]
with open(filename) as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_reader)
    URL = 'https://nominatim.openstreetmap.org/reverse'
    SEARCH_URL = 'https://nominatim.openstreetmap.org/search'
    for row in csv_reader:
        longitude = row[0]
        latitude = row[1]
        PARAMS = {'format': 'jsonv2', 'lat':latitude, 'lon': longitude}

        response = requests.get(url = URL, params = PARAMS) 
        data = response.json()
        state = data['address']['state']
        country = data['address']['country']
        if 'county' in data['address']:
            county = data['address']['county']
        else:
            county = data['address']['region']
        if 'city' in data['address']:
            city = data['address']['city']
        elif 'town' in data['address']:
            city = data['address']['town']
        elif 'village' in data['address']:
            city = data['address']['village']
        else:
            city = data['address']['hamlet']
        print(city + " "+ county)
        SEARCH_PARAMS = {'format': 'jsonv2', 'county': county, 'state': state, 'country': country}
        res = requests.get(url = SEARCH_URL, params = SEARCH_PARAMS)
        dt = res.json()
        print(dt)
        bbox = dt[0]['boundingbox']
        print(bbox)
        '''
        overpass_url = "http://overpass-api.de/api/interpreter"
        overpass_query = """
        [out:json];
        (node["power"="tower"]({{bbox}});
         way["surface"="asphalt"]({{bbox}});
         rel["waterway"="river"]({{bbox}});
        );
        out count;
        """
        response = requests.get(overpass_url, params={'data': overpass_query})
        data = response.json()
        print(data)
        '''
