const trollColours = {
  'karkat': '#626262',
  'terezi': '#008282',
  'gamzee': '#008282',
  'tavros': '#a15000',
  'vriska': '#005682',
  'kanaya': '#008141',
  'equius': '#000056',
  'aradia': '#a10000',
  'nepeta': '#416600',
  'eridan': '#6a006a',
  'feferi': '#77003c',
  'sollux': '#a1a100'
};

const trollChatNamesFull = {
  'karkat': 'carcinoGeneticist',
  'terezi': 'gallowsCallibrator',
  'gamzee': 'terminallyCapricious',
  'tavros': 'adiosToreador',
  'vriska': 'arachnidsGrip',
  'kanaya': 'grimAuxiliatrix',
  'equius': 'centaursTesticle',
  'aradia': 'apocalypseArisen',
  'nepeta': 'arsenicCatnip',
  'eridan': 'caligulasAquarium',
  'feferi': 'cuttlefishCuller',
  'sollux': 'twinArmageddons'
};

const trollChatNamesShort = {
  'karkat': 'CG',
  'terezi': 'GC',
  'gamzee': 'TC',
  'tavros': 'AT',
  'vriska': 'AG',
  'kanaya': 'GA',
  'equius': 'CT',
  'aradia': 'AA',
  'nepeta': 'AC',
  'eridan': 'CA',
  'feferi': 'CC',
  'sollux': 'TA'
};

function convert(troll, content) {
  switch (troll) {
    case 'karkat': return convertKarkat(content);
    case 'terezi': return convertTerezi(content);
    case 'gamzee': return convertGamzee(content);
    case 'tavros': return convertTavros(content);
    case 'vriska': return convertVriska(content);
    case 'kanaya': return convertKanaya(content);
    case 'equius': return convertEquius(content);
    case 'aradia': return convertAradia(content);
    case 'nepeta': return convertNepeta(content);
    case 'eridan': return convertEridan(content);
    case 'feferi': return convertFeferi(content);
    case 'sollux': return convertSollux(content);
  }
  throw new Error('Unknown troll: ' + troll);
}

function convertKarkat(content) {
  return content.toUpperCase();
}

function convertTerezi(content) {
  return content
    .toUpperCase()
    .replace(/O/g, '0')
    .replace(/I/g, '1')
    .replace(/E/g, '3')
    .replace(/A/g, '4');
}

function convertGamzee(content) {
  return mapPerLine(content, convertUpperLower);
}

function convertTavros(content) {
  return swapCase(content);
}

function convertVriska(content) {
  return content
    .replace(/b/gi, '8')
    .replace(/ate/gi, '8')
    .replace(/ai(n't)/gi, '8$1');
}

function convertKanaya(content) {
  return content.replace(/\b\w/g, w => w.toUpperCase());
}

function convertEquius(content) {
  return mapPerLine(content, line => 'D --> ' + line)
    .replace(/oo/gi, '00')
    .replace(/ue/gi, '00')
    .replace(/\b(e)x/gi, '$1%');
}

function convertAradia(content) {
  return content
    .toLowerCase()
    .replace(/oo/gi, '00');
}

function convertNepeta(content) {
  return mapPerLine(content, line => ':33 < ' + line)
    .toLowerCase()
    .replace(/ee/g, '33')
    .replace(/\b([fp])er/g, '$1urr');
}

function convertEridan(content) {
  return content
    .replace(/([vw])/gi, '$1$1');
}

function convertFeferi(content) {
  return content
    .replace(/h/gi, ')(')
    .replace(/E/g, '-E');
}

function convertSollux(content) {
  return content
  .toLowerCase()
    .replace(/i/g, 'ii')
    .replace(/s/g, '2')
    .replace(/\bto\b/g, 'two');
}

function mapPerLine(content, f) {
  return content.split('\n').map(f).join('\n');
}

function convertUpperLower(content, lineIndex) {
  let output = "";
  for (const c of contents) {
    output += (index + lineIndex) % 2 === 0 ? c.toLowerCase() : c.toUpperCase();
  }
  return output;
}

function swapCase(contents) {
  let output = "";
  for (const c of contents) {
    output += c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
  }
  return output;
}

function formatLineBreaks(trollNameShort, content) {
  return content.split('\n').map(line => `<br/><span>${trollNameShort}: ${line}</span>`);
}

$(() => {
  $('#convert').on('click', () => {
    const troll = $('#troll-select').val();
    const content = $('#text-input').val();

    const trollNameFull = trollChatNamesFull[troll];
    const trollNameShort = trollChatNamesShort[troll];

    $('#output-area').css('color', trollColours[troll]);
    $('#output-troll-name').text(`${trollNameFull}  [${trollNameShort}]`);
    $('#output-troll-content').html(formatLineBreaks(trollNameShort, convert(troll, content)));

    $('#input-area').hide();
    $('#output-area').show();
  });
});
