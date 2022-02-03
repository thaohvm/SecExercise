const fs = require('fs');
function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(`file content: ${data}`);
    });
}

cat(process.argv[2])
