const fs = require('fs');

fs.readFile('input.txt', 'utf8', (err, data)) => {
    if (err) {
        console.error(err);
        return;
    }
    else{
        console.log(data.toString());
    }
};

fs.writeFile('output.txt', 'Hello, World!', function (err) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('File has been written successfully.');
    });