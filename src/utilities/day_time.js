let str = "20130203_140310";
const year = parseInt(str.substring(0, 4));

const month = parseInt(str.substring(4, 6));
const day = parseInt(str.substring(6, 8));
const hour = parseInt(str.substring(9, 11));
console.log(year, month, day, hour)

const img = "unclear";
const clear_dict = {}
const unclear_dict = {}

if (img == "clear") {
	exit

	if (clear_dict[month]) {
		if (clear_dict[day]) {
			clear_dict[month].total += 1;
			clear_dict[month][day] += 1;
		} else {
			clear_dict[month].total = 1;
			clear_dict[month][day] = 1;
		}
	}
	else {
		clear_dict[month] = {};
		clear_dict[month][day] = 1
		clear_dict[month].total += 1;
	}
} else {
	if (unclear_dict[month]) {
		if (unclear_dict[day]) {
			unclear_dict[month].total += 1;
			unclear_dict[month][day] += 1;
		} else {
			unclear_dict[month][day] = 1;
			unclear_dict[month].total = 1;
		}
	}
	else {
		unclear_dict[month] = {};
		unclear_dict[month][day] = 1;
		unclear_dict[month].total = 1;
	}
}
console.log(clear_dict)
console.log(unclear_dict)

function day_in_month(clear_dict, month) {
	let q = clear_dict[month];
	return q;
}


// console.log(day_in_month(clear_dict, 01))