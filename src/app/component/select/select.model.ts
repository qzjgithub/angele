/**
 * Created by admin on 2017/6/19.
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
   */
  disabled: false,
  /**
   * 是否默认选中一条数据
   * true表示要默认选中，false表示不默认选中
   * 默认为true
   */
  selected: true,
  /**
   * 要展示的下拉列表
   */
  data:[],
  /**
   * 展示文本获取方式
   * 如果是字符串，读取data中此关键字的数据
   * 如果是方法，获取该方法执行后的返回值
   * 默认text
   */
  realText:'text',
  /**
   * 实际值获取方式
   * 如果是字符串，读取data中此关键字的数据
   * 如果是方法，获取该方法执行后的返回值,方法内传入某条数据value,此条索引index,整个数组arr
   * 默认value
   */
  realValue:'value',
  /**
   * 当前是否可编辑
   * 默认不可编辑
   * 可编辑状态和输入框一样
   */
  editable:false,
  /**
   * 设置不能重复的验证，下拉框独有
   */
  norepeat:false
};
