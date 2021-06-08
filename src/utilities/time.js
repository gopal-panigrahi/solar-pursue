var str = "20130102_140310";
var res = str.substring(4, 11);
var Mth = res.substring(0, 2);
var Month = parseInt(Mth);

var Day = res.substring(2, 4);
var Year = parseInt(Day);
var Hr = res.substring(5, 8);
var Hour = parseInt(Hr);
var TotalHourinMonth;
var TotalHourinDay
var img = "clear";

var clear_dict = { 01: 1, 02: 0, 03: 5, 04: 0, 05: 0, 06: 0, 07: 0, 08: 0, 09: 0, 10: 0, 11: 0, 12: 0 };
var unclear_dict = { 01: 0, 02: 0, 03: 0, 04: 0, 05: 0, 06: 0, 07: 0, 08: 0, 09: 0, 10: 0, 11: 0, 12: 0 };



if (img == "clear") {

  clear_dict[Month] = clear_dict[Month] + 1;

}

if (img == "unclear") {

  unclear_dict[Month] = unclear_dict[Month] + 1;

}




function quaterly(clear_dict) {
  First_quaterly = clear_dict[01] + clear_dict[02] + clear_dict[03];
  Second_quaterly = clear_dict[04] + clear_dict[05] + clear_dict[06];
  Third_quaterly = clear_dict[07] + clear_dict[08] + clear_dict[09];
  Fourth_quaterly = clear_dict[10] + clear_dict[11] + clear_dict[12];
  var quat = [First_quaterly, Second_quaterly, Third_quaterly, Fourth_quaterly]
  return quat
}

function month_wise_clearsky_in_year(clear_dict) {
  return clear_dict;

}


function clear_unclear_in_a_year_per_month_for_bar_plot(clear_dict, unclear_dict) {
  Obj = { clear_dict, unclear_dict };
  return Obj
}
