/**
 * Created by admin on 2017/9/13.
 */
var url = require("url");
window['analog'] = {
  route(req,res,project) {
    var method = req.method;
    var pathname = url.parse(req.url).pathname;
    console.log("About to route a request for " + pathname);
    var text,code = 200;
    window['interfdb'].getInterfByfullPathAndMethod(project.name,pathname,method).then((interf)=>{
      window['intdatadb'].getActiveIntdataByParent(project.name,interf.id).then((intdata)=>{
        console.log(intdata.type);
        switch(intdata.type){
          case 'text':
            try{
              text = JSON.parse(intdata.content);
            }catch(err){
              console.log(err);
              text = text;
            }
            break;
          case 'file':
            text = JSON.parse(intdata.content);
            break;
          case 'table':
            text = {msg:'待实现!'};
            break;
          default:
            text = {msg:'no data'};
        }
        code = intdata.code;
        console.log(code);
        this.back(text,code,res);
      },(err)=>{
        text = {err:"无模拟数据"};
        code = 400;
        this.back(text,code,res);
      });
    },(err)=>{
      text = {err:err};
      code = 400;
      this.back(text,code,res);
    });
  },

  back(text,code,res){
    console.log(code);
    res.writeHead(code, {"Content-Type": "application/json;charset=UTF-8"});
    res.write(typeof text == 'object'?JSON.stringify(text):text,'utf8');
    res.end();
  }
}
