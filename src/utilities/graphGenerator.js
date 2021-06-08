const graphGenerator = {
	clear_dict: { 1: { total: 0 }, 2: { total: 0 }, 3: { total: 0 }, 4: { total: 0 }, 5: { total: 0 }, 6: { total: 0 }, 7: { total: 0 }, 8: { total: 0 }, 9: { total: 0 }, 10: { total: 0 }, 11: { total: 0 }, 12: { total: 0 } },
	unclear_dict: { 1: { total: 0 }, 2: { total: 0 }, 3: { total: 0 }, 4: { total: 0 }, 5: { total: 0 }, 6: { total: 0 }, 7: { total: 0 }, 8: { total: 0 }, 9: { total: 0 }, 10: { total: 0 }, 11: { total: 0 }, 12: { total: 0 } },
	evaluate: function (result) {
		for (const { imagePath, label } of result) {
			let imgName = imagePath.split('/')
			imgName = imgName[imgName.length - 1]
			const year = Number(imgName.substring(0, 4));
			const month = Number(imgName.substring(4, 6));
			const day = Number(imgName.substring(6, 8));

			if (label == "clear") {
				if (this.clear_dict[month][day]) {
					this.clear_dict[month].total += 1;
					this.clear_dict[month][day] += 1;
				} else {
					this.clear_dict[month].total = 1;
					this.clear_dict[month][day] = 1;
				}
			} else {
				if (this.unclear_dict[month][day]) {
					this.unclear_dict[month].total += 1;
					this.unclear_dict[month][day] += 1;
				} else {
					this.unclear_dict[month].total = 1;
					this.unclear_dict[month][day] = 1;
				}
			}
		}
	},
	hoursPerDay: function () {
		const labels = [];
		const data = [];
		for (const month in this.clear_dict) {
			for (const day in this.clear_dict[month]) {
				if (day != 'total') {
					labels.push(`${day}/${month}`);
					data.push(this.clear_dict[month][day]);
				}
			}
		}
		return { 'labels': labels, 'data': data }
	},
	hoursPerMonth: function () {
		const data = [];
		for (const month in this.clear_dict) {
			data.push(this.clear_dict[month].total);
		}
		return data
	},
	quaterly: function () {
		const first_quaterly = this.clear_dict[1].total + this.clear_dict[2].total + this.clear_dict[3].total;
		const second_quaterly = this.clear_dict[4].total + this.clear_dict[5].total + this.clear_dict[6].total;
		const third_quaterly = this.clear_dict[7].total + this.clear_dict[8].total + this.clear_dict[9].total;
		const fourth_quaterly = this.clear_dict[10].total + this.clear_dict[11].total + this.clear_dict[12].total;
		return [first_quaterly, second_quaterly, third_quaterly, fourth_quaterly]
	}
}

export default graphGenerator;
