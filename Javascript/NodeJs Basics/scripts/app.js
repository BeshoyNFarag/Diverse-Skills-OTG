// const readline = require('readline');
// const fs = require('fs');
// // const rl = readline.createInterface({
// //   input: process.stdin,
// //   output: process.stdout
// // });

// // rl.question('What is your name? ', (name) => {
// //   console.log(`Hello, ${name}!`);
// //   rl.close();
// // });

// // rl.on('close', () => {
// //   console.log('Goodbye!');
// //   process.exit(0);
// // });

// const text = fs.readFileSync('input.txt', 'utf8');
// console.log(text);


// const data = `This is some new data to write to the file: ${text}`;
// const writeStream = fs.writeFileSync('output.txt',data, 'utf8');

// const meh = fs.readFileSync('output.txt', 'utf8');
// console.log(meh);

const http = require('http');
const fs = require('fs');
const url = require('url');

const htmlData = fs.readFileSync('../html/index.html', 'utf8');

const server = http.createServer((req, res) => {
   
   let url = req.url;
   res.end(url);
   
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Server is listening on port 3000');
});