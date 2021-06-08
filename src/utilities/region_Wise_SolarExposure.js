import { Bar } from 'react-chartjs-2';
import * as React from 'react';

const state = {
	labels: [
		'Arunachal Pradesh(AR)',
		'Assam(AS)',
		'Bihar(BR)',
		'Chhattisgarh(CG)',
		'Goa(GA)',
		'Gujarat(GJ)',
		'Haryana(HR)',
		'Himachal Pradesh(HP)', 'Jharkhand(JH)',
		'Karnataka(KA)',
		'Kerala(KL)',
		'Madhya Pradesh(MP)',
		'Maharashtra(MH)',
		'Manipur(MN)',
		'Meghalaya(ML)',

		'Mizoram(MZ)',
		'Nagaland(NL)',
		'Odisha(OR)',
		'Punjab(PB)',
		'Rajasthan(RJ)',
		'Sikkim(SK)',
		'Tamil Nadu(TN)',
		'Telangana(TG)',
		'Tripura(TR)',
		'Uttar Pradesh(UP)',
		'Uttarakhand(UK)',
		'West Bengal(WB)',
		'Union territories',
		'Andaman and Nicobar(AN)',
		'Chandigarh(CH)',
		'Dadra and Nagar Haveli and Daman and Diu(DD)',
		'Jammu and Kashmir(JK)',
		'Ladakh(LA)',
		'Lakshadweep(LD)',
		'National Capital Territory of Delhi(DL)',
		'Puducherry(PY)'],
	datasets: [
		{
			label: 'Comparion of Solar Exposure Hours Within States',
			backgroundColor: 'rgba(75,192,192,1)',
			borderColor: 'rgba(0,0,0,1)',
			borderWidth: 2,
			data: [565, 764, 767, 343, 213, 434, 535, 6, 4, 6, 7686, 867, 5456, 989, 766, 3423, 54, 54, 66, 32, 7786, 45, 42, 878, 997, 67, 87, 67897, 976, 97, 69]
		}
	]
}

export default class RegionWiseSolarExposure extends React.Component {
	render() {
		return (<div class="chart" >
			<Bar data={state}
				height={1392}
				width={400}
				options={{
					responsive: true,
					maintainAspectRatio: false,
					title: {
						display: true,
						text: 'Prediction Result',
						fontsize: 20,
					},

					legend: {
						display: true,
						position: 'right'
					}
				}
				} />
		</div>);
	}
}
// JavaScript source code
