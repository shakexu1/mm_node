define(function() {
	"use strict";

	return {
		data: function data() {
			return {
				// 标题
				title: "",
				// 添加地址
				url_add: "",
				// 删除地址
				url_del: "",
				// 修改地址
				url_set: "",
				// 查询对象地址
				url_get_obj: "",
				// 查询列表地址
				url_get_list: "",
				// 表单提交地址
				url_submit: "",
				// 上传提交地址
				url_upload: "",
				// 获取的列表
				list: [],
				// 获取上一页列表
				list_prev: [],
				// 获取下一页列表
				list_next: [],
				// 视图&验证模型
				vm: {},
				// 提交表单
				form: {},
				// 线上对象
				obj: {},
				// 查询参数
				query: {},
				// 配置
				config: {
					// 默认当前页面
					page: 1,
					// 默认页面大小
					size: 10,
					// 状态
					state: 0
				},
				// 加载进度
				loading: 0,
				// 显示进度
				showing: 0,
				// 提交进度
				posting: 0,
				// 选中项
				selete: 0,
				// 查询结果匹配数统计
				count: 0,
				// 显示隐藏，true显示，false隐藏
				show: false,
				// 响应成功或失败
				bl: false,
				// 显示方式
				display: "",
				// 关键字段
				field: "",
				// 响应提示
				tip: "",
				// 默认请求方式
				mode: "obj",
				// 响应错误消息
				message: ""
			};
		},
		methods: {
			/**
			 * @description 事件管理, 用于管理函数
			 * @param {String} name 事件名
			 * @param {Object} param1 参数1
			 * @param {Object} param2 参数2
			 * @return {Object} 返回事件特定值
			 */
			events: function events(name, param1, param2) {
				// console.log(name);
				var func = this[name];
				if (func) {
					return func(param1, param2);
				} else {
					return null;
				}
			},
			/**
			 * 回调函数(中控)
			 * @param {String} name 函数名
			 * @param {Object} param1
			 * @param {Object} param2
			 * @param {Object} param3
			 * @return {Object} 任意值
			 */
			func: function func(name, param1, param2, param3) {
				var f = this[name];
				if (f) {
					if (param1 === undefined) {
						return f();
					} else if (param2 === undefined) {
						return f(param1);
					} else if (param3 === undefined) {
						return f(param1, param2);
					} else {
						return f(param1, param2, param3);
					}
				} else {
					return null;
				}
			},
			/**
			 * @description 添加数据
			 * @param {Object} param 要添加的数据
			 * @param {Function} func 回调函数
			 */
			add: function add(param, func) {
				if (!param) {
					param = this.obj;
				}
				var pm = this.events("add_before", param) || param;
				var msg = this.events("add_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("add_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 删除数据
			 * @param {Object} param 查询条件
			 */
			del: function del(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("del_before", param) || param;
				var msg = this.events("del_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("del_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 修改数据
			 * @param {Object} param 修改项
			 * @param {String} query 查询条件
			 */
			set: function set(param, query, func) {
				if (!param) {
					param = this.obj;
				}
				if (query) {
					this.query_set = query;
				} else if (!this.query_set) {
					this.query_set = Object.assign(this.query);
				}
				var pm = this.events("set_before", param) || param;
				var msg = this.events("set_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("set_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 查询多条数据
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_list: function get_list(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("get_list_before", param) || param;
				var msg = this.events("get_list_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("get_list_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 查询一条数据
			 * @param {Object} query 查询条件
			 * @func {Function} 回调函数
			 */
			get_obj: function get_obj(param, func) {
				if (!param) {
					param = this.query;
				}
				var pm = this.events("get_obj_before", param) || param;
				var msg = this.events("get_obj_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("get_obj_main", pm, func);
				} else if (func) {
					func();
				}
				return ret;
			},
			sort: function sort(param, func) {
				var pm = this.events("sort_before", param) || param;
				var msg = this.events("sort_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("sort_main", pm, func);
				}
				return ret;
			},
			init: function init(param, func) {
				var pm = this.events("init_before", param) || param;
				var msg = this.events("init_check", pm);
				var ret;
				if (!msg) {
					ret = this.events("init_main", pm, func);
				} else if (func) {
					func();
				}
				return ret;
			},
			submit: function submit(param, func) {
				if (!param) {
					param = this.form;
				}
				var pm = this.events("submit_before", param) || param;
				var msg = this.events("submit_check", pm);
				var ret;
				if (msg) {
					this.toast(msg);
				} else {
					ret = this.events("submit_main", pm, func);
				}
				return ret;
			},
			upload: function upload(param, func) {
				var pm = this.events("upload_before", param) || param;
				var msg = this.events("upload_check", pm);
				var ret;
				if (msg) {
					this.toast(msg);
				} else {
					ret = this.events("upload_main", pm, func);
				}
				return ret;
			},
			/**
			 * @description 提示框
			 * @param {String} text 提示内容
			 * @param {Number} longTime 显示时长
			 */
			toast: function toast(text, longTime) {
				this.$.toast(text, longTime ? longTime : 2000);
			},
			/**
			 * @description 添加数据
			 * @param {Object} value 要添加的数据
			 */
			add_main: function add_main(value) {

			},
			/**
			 * @description 删除数据
			 * @param {Object} query 查询条件
			 */
			del_main: function del_main(query) {

			},
			/**
			 * @description 修改数据
			 * @param {Object} value 要修改的数据
			 * @param {Object} value 修改项
			 */
			set_main: function set_main(value, func) {
				var url = this.url_set;
				if (!url) {
					return;
				}
				var _this = this;
				this.$post(this.toUrl(this.query_set, url), value, function(json, status) {
					_this.events("set_after", json, func);
					if (json.error) {
						_this.toast(json.error.message);
					} else if (json.result) {
						if (!json.result.bl) {
							_this.toast(json.result.tip);
						}
					}
				});
			},
			/**
			 * @description 查询数据
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get: function get(query, func) {
				this.get_main(query, func);
			},
			/**
			 * @description 查询数据(主程序)
			 * @param {Object} query 查询参数
			 * @param {Function} func 回调函数
			 */
			get_main: function get_main(query, func){
				if (this.url_get_obj) {
					var _this = this;
					this.get_obj(query, function() {
						_this.search(query, func);
					});
				} else {
					this.search(query, func);
				}
			},
			/**
			 * @description 查询一条数据(主程序)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_obj_main: function get_obj_main(query, func) {
				// console.log("get_obj_main");
				var url = this.url_get_obj;
				if (!url) {
					return;
				}
				var _this = this;
				this.$get(this.toUrl(query, url), null, function(json, status) {
					var res = json.result;
					var obj = _this.events("get_obj_after", res, func);
					if (!obj && res) {
						$.push(_this, res);
						if (res.obj) {
							obj = res.obj;
						} else {
							var list = res.list;
							if (list && list.length > 0) {
								obj = list[0];
							} else {
								$.push(_this.obj, res);
							}
						}
					}
					if (obj) {
						$.push(_this.obj, obj);
					} else if (json.error) {
						console.log(json.error.message);
					} else if (!res) {
						_this.toast("服务器连接失败！");
					}
				});
			},
			/**
			 * @description 获取到对象后事件
			 * @param {Object} res 响应结果
			 * @param {Function} func 回调函数
			 */
			get_obj_after: function get_obj_after(res, func) {
				if (func) {
					func();
				}
			},
			/**
			 * @description 查询多条数据(主程序)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_list_main: function get_list_main(query, func) {
				// console.log("get_list_main");
				var url = this.url_get_list;
				if (!url) {
					return;
				}
				var _this = this;
				this.loading = 0;
				this.$get(this.toUrl(query, url), null, function(json, status) {
					_this.loading = 100;
					var res = json.result;
					var list = _this.events("get_list_after", res, func);
					if (!list && res) {
						list = res.list;
					}
					if (list) {
						_this.list.addList(list);
						if (res.count !== undefined) {
							_this.count = res.count;
						}
					} else if (json.error) {
						console.log(json.error.message);
					} else if (!res) {
						_this.toast("服务器连接失败！");
					}
				});
			},
			/**
			 * @description 获取到列表事件
			 * @param {Object} res 响应结果
			 * @param {Function} func 回调函数
			 */
			get_list_after: function get_list_after(res, func) {
				if (func) {
					func();
				}
			},
			/**
			 * 搜索
			 * @param {Object} query 查询条件
			 * @param {Boolean} bl 是否重置再搜索
			 */
			search: function search(query, bl) {
				if (bl) {
					this.reset();
				}
				if (query) {
					$.push(this.query, query);
				}
				this.query.page = 1;
				$.route.push("?" + this.toUrl(this.query));
				this.get_first(query);
			},
			/**
			 * @description 查询多条数据 (首次)
			 * @param {Object} query 查询条件
			 * @param {Function} func 回调函数
			 */
			get_first: function get_first(query, func) {
				var _this = this;
				_this.loading = 0;
				this.list.clear();
				this.list_next.clear();
				this.list_prev.clear();
				if (this.mode === "list") {
					this.get_list(q, function() {
						_this.loading = 100;
						if (_this.list.length > 0) {
							if (query.page === 1) {
								_this.next(func);
							} else {
								_this.next(function() {
									_this.prev(func);
								});
							}
						} else if (func) {
							func();
						}
					});
				} else {
					this.get_list(query, function() {
						_this.loading = 100;
						if (func) {
							func();
						}
					});
				}
			},
			/**
			 * @description 查询下一页数据
			 * @param {Function} func 回调函数
			 */
			next: function next(func) {
				console.log("next");
				var list_next = this.list_next;
				this.list.addList(list_next);
				list_next.clear();
				var q = Object.assign({}, this.query);
				if (q < this.page_count) {
					q.page += 1;
					this.get_list(q, function(res, f) {
						if (res.list) {
							list_next.addList(res.list);
						}
						if (func) {
							func();
						}
						return [];
					});
				}
			},
			/**
			 * @description 查询上一页数据
			 * @param {Function} func 回调函数
			 */
			prev: function prev(func) {
				console.log("prev");
				var lt = this.list;
				var list_prev = this.list_prev;
				list_prev.addList(lt);
				this.list.clear();
				this.list.addList(list_prev);
				list_prev.clear();
				var q = Object.assign({}, this.query);
				if (q > 1) {
					q.page -= 1;
					this.get_list(q, function(res, f) {
						if (res.list) {
							list_prev.addList(res.list);
						}
						if (func) {
							func();
						}
						return [];
					});
				}
			},
			/**
			 * 重置
			 */
			reset: function reset() {
				$.clear(this.query);
				$.push(this.query, this.config);
			},

			/**
			 * 提交表单
			 */
			submit_main: function submit_main() {
				var url = this.url_submit;
				if (url) {
					var form = this.submit_before(this.form);
					if (!form) {
						form = this.form;
					}
					var tip = this.submit_check(form);
					if (tip) {
						this.toast(tip);
					} else {
						var _this = this;
						this.$post(url, this.events("submit_before", form), function(json, status) {
							var msg = _this.events("submit_after", json, status);
							if (msg) {
								_this.toast(msg);
							}
						});
					}
				}
			},
			/**
			 * 提交前验证事件
			 * @param {Object} 请求参数
			 * @return {String} 验证成功返回null, 失败返回错误提示
			 */
			submit_check: function submit_check(param) {
				return null;
			},
			/**
			 * @description 获取到对象后事件
			 * @param {Object} json 响应结果
			 * @param {Number} status 服务器状态码
			 */
			submit_after: function submit_after(json, status) {
				if (json.result) {
					this.toast(json.result.message);
				} else if (json.error) {
					this.toast(json.error.message);
				} else {
					this.toast("服务器连接失败！");
				}
			},
			/**
			 * 上下翻页
			 * @param {Number} n 加减页码
			 */
			go: function go(n) {
				var page = this.query.page + n;
				this.goTo(page);
			},
			/**
			 * 跳转指定页
			 * @param {Number} page 页码
			 */
			goTo: function goTo(page) {
				if (page < 1) {
					page = 1;
				} else if (page > this.page_count) {
					page = this.page_count;
				}
				var query = this.query;
				var p = query.page;
				query.page = page;
				$.route.push("?" + this.toUrl(query));
				if (p + 1 == page) {
					this.next();
				} else if (p - 1 == page) {
					this.prev();
				} else {
					this.search_main();
				}
			},
			/**
			 * @description 转查询参数
			 * @param {Object} obj 被转换的对象
			 * @param {String} url 请求地址
			 * @return {String} url字符串
			 */
			toUrl: function toUrl(obj, url) {
				return $.toUrl(obj, url);
			},
			/**
			 * 初始化前函数
			 */
			init_before: function init_before(query) {
				if (!query) {
					query = this.config;
				}
				return query;
			},
			/**
			 * 初始化
			 */
			init_main: function init_main(query) {
				var _this = this;
				$.push(this.query, query);
				if ($.route.history.length > 1) {
					_this.init_after(function() {
						_this.get(query);
					})
				} else {
					_this.$get_user(function() {
						_this.init_after(function() {
							_this.get(query);
						});
					});
				}
			},
			/**
			 * 初始化后函数
			 */
			init_after: function init_after(func) {
				if (func) {
					func();
				}
			},
			/**
			 * @description 上传文件
			 * @param {Function} func 回调函数
			 */
			upload_main: function upload_main(func) {
				if (!param) {
					param = this.form;
				}
				if (msg) {
					this.toast(msg);
				} else {
					this.uploading = 0;
					var _this = this;
					this.$upload(this.url_upload, param, function(json, status) {
						_this.uploading = 100;
						_this.events("upload_after", json, func);
					});
				}
			},
			/**
			 * @description 上传完成时
			 * @param {Object} json 响应结果
			 * @param {Function} func
			 */
			upload_after: function upload_after(json, func) {
				if (json.result) {
					this.toast(json.result.tip);
				} else if (json.error) {
					this.toast(json.error.message);
				} else {
					this.toast("服务器连接失败！");
				}
				if (func) {
					func();
				}
			}
		},
		computed: {
			/**
			 * 分页数量
			 */
			page_count: function page_count() {
				return parseInt(this.count / this.size);
			}
		},
		created: function created() {
			this.showing = 0;
			this.init(this.$route.query);
		},
		mounted: function mounted() {
			this.showing = 100;
		}
	};
});
