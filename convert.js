const node_xj = require("xls-to-json");
const fs = require('fs');


const argv = require('minimist')(process.argv.slice(2));


const opts = {};


opts.input = argv.input;
opts.output = "output.json";
argv.sheet ? opts.sheet = argv.sheet : null;

console.log(opts);
node_xj(opts, function(err, result) {
  if (err) {
    console.error(err);
    return false
  }

  debugger;

  let card = '';
  let cards = '';

  result.map(item => {


    card += `BEGIN:VCARD\n`;
    card += `VERSION:2.1\n`;
    card += `N:;${item.name};;;\n`;
    card += `FN:${item.name}\n`;
    card += `TEL;CELL;PREF:${item.home}\n`;
    if (item.cell !== '') {card += `TEL;HOME:${item.cell}\n`;}
    if (item.work !== '') {card += `TEL;HOME:${item.work}\n`;}
    card += `END:VCARD\n`;


    cards += card;
    card = "";


  })
  ;


  fs.writeFile(__dirname + "/" + argv.output, cards, function(err) {
    if (err) {
      return console.log(err);
    }

    console.log("The file was saved!");
  });

});