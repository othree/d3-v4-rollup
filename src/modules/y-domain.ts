import { max } from 'd3-array';

var log10 = function(x) {
  return Math.log(x) * Math.LOG10E;
};

const MAPPING = [
  // [first digit, log offset]
  null,
  [2, 0], // 1
  [4, 0], // 2
  [4, 0], // 3
  [8, 0], // 4
  [8, 0], // 5
  [8, 0], // 6
  [8, 0], // 7
  [2, 1], // 8
  [2, 1], // 9
];

export default function (data) {
  var maxValue = max(data, function(d) { return d.close; });
  var firstDigit = parseInt(maxValue.toString()[0], 10);
  var digits = Math.floor(log10(maxValue));
  var ytop = MAPPING[firstDigit];

  return [0, ytop[0] * Math.pow(10, digits + ytop[1])];
}
