const http = require('http');

const server = http.createServer((req, res) => {
	  res.statusCode = 200;
	  res.setHeader('Content-Type', 'text/plain');
	  res.end('سلام از سرور backend!');
});

const port = 8080;
server.listen(port, () => {
	  console.log(`سرور در پورت ${port} در حال اجراست`);
});

