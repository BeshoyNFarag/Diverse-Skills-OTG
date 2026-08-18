const {v4: uuid} = require('uuid');
const {format} = require('date-fns');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');


const logEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd HH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try {
        if (!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }

        await fsPromises.appendFile('logs/eventLog.txt', logItem, 'utf-8');
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {logEvents};