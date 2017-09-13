/**
 * Created by admin on 2017/9/13.
 */
var http = require("http");
var url = require("url");
window['controlService'] ={
  service:{},
  start: function(project) {
    function onRequest(request, response) {
      var pathname = url.parse(request.url).pathname;
      console.log("Request for " + pathname + " received.");

      window['analog'].route(request,response,project);

      /*response.writeHead(200, {"Content-Type": "text/plain"});
       response.write("Hello World");
       response.end();*/
    }

    var service = this.service[project.name] || http.createServer(onRequest);
    service.on('close',function(){
      console.log('server close');
    })
    service.listen(project.port);
    console.log("Server has started.");
  },
  stop: function(project){
    this.service[project.name].close();
    delete this.service[project.name];
  }
}
