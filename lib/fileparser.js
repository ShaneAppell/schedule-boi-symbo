const fs = require('fs');
const eventStream = require('event-stream');

const parseFile = function (filepath, process) {
  const stream = fs.createReadStream(filepath);

  return new Promise(function (yes, no) {
    stream
      .pipe(eventStream.split('\n'))
      .pipe(eventStream.mapSync(
        function (line) {
          stream.pause();
          process(line);
          stream.resume();
        })
        .on('error', err => no())
        .on('end', () => yes())
      );
  });
};

module.exports = {
  parseFile
};
