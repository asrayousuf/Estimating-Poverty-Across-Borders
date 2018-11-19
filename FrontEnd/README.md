
# Get Start
1. Download/git clone the github folder *Yu-Ho*
2. Install NodeJs from [NodeJs Official Page](https://nodejs.org/en). 
3. Open Terminal and *cd* to your file project
4. Run in terminal: ```npm install```
5. Then: ```npm start```
6. Navigate to `http://localhost:3000/`

# Develop D3 Component in React 
1. Basic concept of React JS. React allows us to compose a web app using a variety of **components**. In other words, if you want to create two D3 pie charts and put it into your web app with different set of input data, you need to write two pieces of similiar code into HTML or calling JavaScript function twice. However, using React, you can create a **component** called ```<BarChart/>``` and then you pass different data into it. Then it can display different shapes of bar chart. Just like a function. 

2. Basic component look like below and **data** / **size** are the parameters of the BarChart component.  

```
<div>
    <BarChart data={[5,10,1,3]} size={[200,300]} />
</div>
```


3. Please go the file ```/src/views/Dashboard/Dashboard.jsx``` and find the component ```<BarChart data... />``` and go to another file ```src/d3_components/BarChart.js```. You will see how to integrate a D3 component (**BarChart**) into React web app (**DashBoard**). 

4. The applicatio should look like: 

![Alt text](https://imgur.com/a/GuEKE5G)


# Reference
[Light Bootstrap Dashboard React](http://lbd-react.creative-tim.com/)

