# Estimating-Poverty-Across-Borders

Team members: 
* Asra Yousuf  
* Het Sheth
* Rosy Gupta
* Shantanu Mantri
* Yu-Ho Hsieh

## Description

-------------

This is the CSE 6242 final project. We predict the HDI (Human Development Index) using social media data, immagration data, and infrastructure data. The deliveriable includes a Web App, backend service API, scripts to fetch OSM (open street map) data, and the analysis results.

## Folder Structure

-------------


├── data        # Training dataset, includes mobility, countries, and HDI prediction

├── diagram     # Analysis results and cross validation

├── FrontEnd    # FrontEnd Web App

├── models    	# Random Forest Training models

├── OSMscripts  # Scripts to fetch infrastructure data from OSM

├── python-api  # API to host server for backend services and regressor model to analyze results

├── scripts  	# Database scripts

└── README.md    

## Compilation & Experiment

-------------

If you want to run the webapp in your local machine, please first install *npm* into your computer.
If you are using windows, you can try out Anaconda Prompts. 
After the installation, please navigate to *FrontEnd* folder and run the following two commands.

```
npm install
npm run 
```

Then you should be able to reach `http://localhost:3000/` in your browser.

## Trouble Shooting
If you encounter some errors like
```
/node-sass/vendor no such file or directory in node-sass
```
please run 
```
npm rebuild node-sass
``` 

to fix the problem when you deploy web app on AWS EC2. 


# Reference
[Light Bootstrap Dashboard React](http://lbd-react.creative-tim.com/)
