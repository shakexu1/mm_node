define([], function() {
	"use strict";
	return {
		"name": "admin",
		"sort": 1,
		"routes": [{
			"name": "root",
			"path": "/",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}, {
			"name": "sys",
			"path": "/sys",
			"redirect": "/sys/web"
		}, {
			"name": "sys_web",
			"path": "/sys/web",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}, {
			"name": "sys_user",
			"path": "/sys/user",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}, {
			"name": "sys_user_form",
			"path": "/sys/user_form",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}, {
			"name": "app",
			"path": "/sys/app",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}, {
			"name": "app_form",
			"path": "/sys/app_form",
			"component": "",
			"level": 1,
			"oauth": {
				"signIn": true,
				"gm": 2,
				"admin_group": []
			}
		}],
		"top": [],
		"left": [],
		"bottom": [],
		"right": [],
		"desktop": [],
		"quick": [],
		"main": [{
			"title": "系统",
			"url": "/sys",
			"display": 3,
			"sub": [{
				"title": "网站设置",
				"url": "/sys/web"
			}, {
				"title": "用户管理",
				"url": "/sys/user"
			}, {
				"title": "应用管理",
				"url": "/sys/app"
			}]
		}]
	}
});