"""
Utils.py contains classes/functions that filter/extract data from the excel file 
Created by: Shantanu Mantri
"""
import pandas as pd

class DataReader:
	
	def __init__(self):
		"""
		Constructor for Data Reader, which is used as an abstraction class
		so that no pandas functions need to be used in the front-end
		"""
		self.country_frame = pd.read_csv("../data/country.csv", index_col = None)
		self.mobility_frame = pd.read_csv("../data/mobility.csv", index_col = None)
	
	def get_flow(self, country, o_codmun, d_codmun):
		"""
		Gets the flow from one country to another
		Parameters
		----------
		country:   String   the country
		o_codmun : Integer  the origin district's code
		d_conmun : Integer  the destination district's code
		
		Returns
		-------
		List : A list of size 2 with the flows for 2016 and 2017
		"""
		frame = self.mobility_frame
		df_filtered = frame[(frame['Country'] == country) & (frame['origin_codmun'] == o_codmun) & (frame['destination_codmun'] == d_codmun)]
		return [df_filtered.iloc[0]['flow_2016'], df_filtered.iloc[0]['flow_2017']]

	def get_inflow(self, country, d_codemun):
		"""
		Gets the inward flow for a particular district
		Parameters
		----------
		country:   String   the country
		d_conmun : Integer  the district's code
		
		Returns
		-------
		DataFrame : A frame with all inflows for 2016 and 2017
		"""
		frame = self.mobility_frame
		df_filtered = frame[(frame['Country'] == country) & (frame['destination_codmun'] == d_codemun)]
		return df_filtered[['flow_2016', 'flow_2017']]

	def get_outflow(self, country, o_codemun):
		"""
		Gets the outward flow for a particular district
		Parameters
		----------
		country:   String   the country
		o_conmun:  Integer  the district's code
		
		Returns
		-------
		DataFrame : A frame with all outflows for 2016 and 2017
		"""
		frame = self.mobility_frame
		df_filtered = frame[(frame['Country'] == country) & (frame['origin_codmun'] == o_codemun)]
		return df_filtered[['flow_2016', 'flow_2017']]
		
	def get_average_inflow(self, country, d_codemun):
		"""
		Gets the average inward flow for a particular district
		Parameters
		----------
		country:   String   the country
		d_conmun : Integer  the district's code
		
		Returns
		-------
		List : A list of size 2 for average inflows for 2016 and 2017
		"""
		frame = self.mobility_frame
		df_filtered = frame[(frame['Country'] == country) & (frame['destination_codmun'] == d_codemun)]
		df_filtered = df_filtered[['flow_2016', 'flow_2017']]
		df_mean = df_filtered.mean()
		return [df_mean.loc['flow_2016'], df_mean.loc['flow_2017']]


	def get_average_outflow(self, country, o_codemun):
		"""
		Gets the average outward flow for a particular district
		Parameters
		----------
		country:   String   the country
		o_conmun : Integer  the district's code
		
		Returns
		-------
		List : A list of size 2 for average outflows for 2016 and 2017
		"""
		frame = self.mobility_frame
		df_filtered = frame[(frame['Country'] == country) & (frame['origin_codmun'] == o_codemun)]
		df_filtered = df_filtered[['flow_2016', 'flow_2017']]
		df_mean = df_filtered.mean()
		return [df_mean.loc['flow_2016'], df_mean.loc['flow_2017']]

	def get_hdi(self, codmun, estimated=False, year=2016):
		"""
		Gets the HDI given for a given district
		Parameters
		----------
		codmun:    Integer   the district code
		estimated: Boolean   whether or not it's the actual HDI or an estimate
		year:      Integer   The year to get the HDI for 
		
		Returns
		-------
		Pandas DataFrame  
		"""
		frame = self.country_frame
		if estimated:
			return frame.loc[codmun]['hdi_estimated_' + str(year)]
		return frame[['hdi']].loc[codmun]

	def get_cols_country(self, cols, codmun):
		"""
		Gets columns from the country csv file for a given district
		Parameters
		----------
		cols:   List     the list of columns wanted
		codmun: Integer  the district's code
		
		Returns
		-------
		Pandas DataFrame    
		"""
		frame = self.country_frame
		return frame[(frame["codmun"] == codmun)][cols]

	def get_cols_mobility(self, cols, o_codmun, d_codmun):
		"""
		Gets columns from the mobility csv file for a given district
		Parameters
		----------
		cols:     List     the list of columns wanted
		o_codmun: Integer  the district's code origin
		d_codmun: Integer  the district's code destination
		
		Returns
		-------
		Pandas DataFrame    
		"""
		frame = self.mobility_frame
		return frame[(frame["origin_codmun"] == o_codmun) & (frame["destination_codmun"] == d_codmun)][cols]

	def create_input_data(self):
		"""
		Creates input data necessary in a format appropriate for the model.
		Returns
		-------
		Pandas DataFrame: A dataframe of the input data
		"""
		frame = self.country_frame
		mob_frame = self.mobility_frame

		in_frame = mob_frame.groupby(['Country', 'origin_codmun'])[['flow_2016', 'flow_2017']].mean()
		out_frame = mob_frame.groupby(['Country', 'destination_codmun'])[['flow_2016', 'flow_2017']].mean()

		
		frame['average_inflow_2016'] = None  
		frame['average_outflow_2016'] = None
		frame['average_inflow_2017'] = None  
		frame['average_outflow_2017'] = None

		inflow_16 = []
		inflow_17 = []
		outflow_16 = []
		outflow_17 = []

		valid_incodes = in_frame.index.levels
		valid_outcodes = out_frame.index.levels

		for idx in range(len(frame)):

			row = frame.iloc[idx]
			country = row.loc['Country']
			codmun = row.loc['codmun']

			try:
				in_row = in_frame.loc[country, codmun]
				inflow_16.append(in_row.loc['flow_2016'])
				inflow_17.append(in_row.loc['flow_2017'])
			except:
				inflow_16.append(None)
				inflow_17.append(None)

			try:
				out_row = out_frame.loc[country, codmun]
				outflow_16.append(out_row.loc['flow_2016'])
				outflow_17.append(out_row.loc['flow_2017'])
			except:
				outflow_16.append(None)
				outflow_17.append(None)
			
		frame['average_inflow_2016'] = inflow_16 
		frame['average_outflow_2016'] = outflow_16
		frame['average_inflow_2017'] = inflow_17
		frame['average_outflow_2017'] = outflow_17
		frame.fillna(0, inplace=True)
		
		return frame
#Example
#d = DataReader()
#print(d.create_input_data())
#print(d.get_cols_mobility(["flow_2016"], 1939, 1939))
#print(d.get_cols_country(["hdi"], 1939))
#print(d.get_hdi(1939))