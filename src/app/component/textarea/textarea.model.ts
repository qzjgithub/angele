/**
 * Created by admin on 2017/6/23.
 */
export const param = {
  /**
   * 次输入框的名字，唯一标识，获取value时value的名字，传入后台的数据名字
   * 默认'value'
   */
  name:'test',
  /**
   * 是否可以为空
   * true表示不可为空,如果要自定义提示消息，可直接传入字符串
   * 默认为true
   */
  required: true,
  /**
   * 检查数据长度，如1-128
   * 默认无不存在，不限制长度
   */
  // length:'3-6',
  /**
   * 要填写数据的格式类型
   * IP,EMAIL,NUMBER,TEXT(普通文本)...
   * 默认为TEXT
   * 可写{type:'TEXT',msg:'自定义提示信息'}的形式来重写提示信息
   */
  dataType: 'TEXT',
  /**
   * 添加额外的正则验证
   * 在dataType验证成功之后才做验证
   * 默认不存在
   * 逐条验证，reg是验证正则，msg是验证出错的提示信息
   * name表示给此条验证一个名字，可用于获取此条验证是否通过。可为空，为空则默认为'reg_'+index，index是此条验证在数组中的位置
   *
   * reg也可以接收一个方法，返回true表示成功，返回false表示验证失败
   * 方法由本组件调用，内部传入输入框值function(value)
   *
   * reg可接受一个请求路径，默认以json格式传入{value:value}
   * 返回json{result:true}表示验证通过，返回json{result:false}表示验证失败
   */
  // regular: [{reg:/^[\S]+$/,msg:'不能有空格换行',name:''}],
  /**
   * 定义在输入框右边框内的小图标，按数组顺序依次显示
   * 默认不存在
   * 提供几种默认样式"SELECT","EYE"等
   * 也可自定义class
   * 字符串表示class或种类，对象加入event字段表示是否启用默认样式的默认事件
   */
  // icon:['SELECT',{class:'EYE',event:true},'common'],
  /**
   * 加在com-input元素下第一个子元素的class
   * 提供用户自定义样式的入口
   * 默认不存在
   */
  // class:'',
  /**
   * 未输入内容时的提示消息
   */
  // placeholder:'请输入×××',
  /**
   * 默认值
   */
  value: '',
  /**
   * 输入框模式
   * 分为display（展示）和edit（编辑）
   * 默认为edit
   */
  pattern:'edit',
  /**
   * 输入项的禁用状态
   * true表示被禁用，false表示启用
   * 默认false
   * display模式下也可启用，鼠标进入时转化
   */
  disabled: false
};
