/**
 * Created by admin on 2017/9/13.
 */
var url = require("url");
window['analog'] = {
  route(req,res,project) {
    var method = req.method;
    var pathname = url.parse(req.url).pathname;
    console.log("About to route a request for " + pathname);
    window['interfdb'].getInterfByfullPathAndMethod(project.name,req.url,method).then((interf)=>{
      window['analog'].getActiveIntdata(project,interf,res);
    },(err)=>{
      window['interfdb'].getInterfByfullPathAndMethod(project.name,pathname,method).then((interf)=>{
        window['analog'].getActiveIntdata(project,interf,res);
      },(err)=>{
        let text = {err:err};
        let code = 400;
        this.back(text,code,res);
      });
    });
  },
  /**
   * 获取激活状态的数据
   */
  getActiveIntdata(project,interf,res){
    window['intdatadb'].getActiveIntdataByParent(project.name,interf.id).then((intdata)=>{
      window['analog'].dealIntdata(intdata,res);
    },(err)=>{
      let text = {err:"无模拟数据"};
      let code = 400;
      this.back(text,code,res);
    });
  },
  dealIntdata(intdata,res){
    var text,code = 200;
    console.log(intdata.type);
    switch(intdata.type){
      case 'text':
        try{
          text = JSON.parse(intdata.content);
        }catch(err){
          console.log(err);
          text = intdata.content;
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
  },
  /**
   * 返回数据
   * @param text
   * @param code
   * @param res
   */
  back(text,code,res){
    console.log(code);
    let type = typeof text == 'object' ? "application/json;":"text/plain;";
    res.writeHead(code, {"Content-Type": type + ";charset=UTF-8"});
    res.write(typeof text == 'object'?JSON.stringify(text):text,'utf8');
    res.end();
  }
}
