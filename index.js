const Scheduler = require('./lib/scheduler');
const { parseFile } = require('./lib/fileparser');

function main() {
    const s = new Scheduler();

    const THE_FILE_PATH = 'ass.txt';

    const addToScheduler = function (line) {
        const nums = line.split(',');

        s.addPCB(
            nums[0],
            nums[1],
            nums[2],
            nums[3]
        );
    };

    parseFile(THE_FILE_PATH, addToScheduler)
        .then(function () {
        });

}

main();