$(function() {
	//给验证码图片注册事件
	/*$("#vcode").click(
			function() {
				// $(this).attr("src","/VerifyCodeServlet?"+Math.random());
				$(this).attr("src",
						"user_ajax/verifyCode?" + new Date().toLocaleString());
			});*/
	//检查学号是否已经被注册
	$("input[name=studentId]").blur(
			function() {
				var studentId = $(this).val();
				if (!formObj.checkNull("username", "学号不能为空")) {
					formObj.setMsg("username", "学号不能为空");
				} else {
					$.ajax({
						url:"/user/studentId",
						type:"post",
						data:{"studentId":studentId},
						dataType:"json",
						success:function(result){
							if (result.status!=200) {
								$("#studentId_msg").html("该学号已注册");
							} else{
								$("#studentId_msg").html("<font color='green'></font>");
							}
						},
						error:function(){
							alert("请求失败！");
						}
					});
				}
			});
	//给注册表单注册submit事件
	$("form").submit(function(){
		return register();
	});
});
function register(){
	var studentId=$("form input[name=studentId]").val();
	var studentName=$("form input[name=studentName]").val();
	var Password=$("form input[name=password]").val();
	var Password2=$("form input[name=password2]").val();
	var studentGrade=$("form input[name=studentGrade]").val();
	var studentCollege=$("form input[name=studentCollege]").val();
	var studentMajor=$("form input[name=studentMajor]").val();
	//var vcode=$("form input[name=valistr]").val();
	var flag=formObj.checkForm();
	if(flag){
		$.ajax({
			url:"/user/save",
			type:"post",
			data:{
				  "studentId":studentId,
				  "studentName":studentName,
				  "password":password,
				  "studentGrade":studentGrade,
				  "studentCollege":studentCollege,
				  "studentMajor":studentMajor,
				 },
			dataType:"json",
			success:function(result){
				if(result.status==200){
					alert("注册成功,转向登录页面")
					window.location.href="./login.html";
				}else{
					alert(result.msg);
				}
			},
			error:function(){
				alert("请求失败！");
			}
		});
	}
	
	return false;
}
var formObj = {
	checkForm : function() {
		var flag = true;
		// 非空验证
		flag = this.checkNull("studentId", "用户名不能为空");
		flag = this.checkNull("studentName","姓名不能为空") && flag;
		flag = this.checkNull("password", "密码不能为空") && flag;
		flag = this.checkNull("password2", "确认密码不能为空") && flag;
		flag = this.checkNull("studentGrade", "年级不能为空") && flag;
		flag = this.checkNull("studentCollege", "学院不能为空") && flag;
		flag = this.checkNull("studentMajor", "专业不能为空") && flag;
		// 两次输入的密码是否相同
		flag = this.checkPassword("password", "两次密码不相同") && flag;
		// 邮箱格式
		// 返回flag
		return flag;
	},
	checkNull : function(name, msg) {
		var value = $("input[name=" + name + "]").val();
		if ($.trim(value) == "") {
			this.setMsg(name, msg);
			return false;
		}
		else this.setMsg(name,"");
		return true;
	},
	checkPassword : function(name, msg) {
		var pwd = $("input[name=" + name + "]").val();
		var pwd2 = $("input[name=" + name + "2]").val();
		if ($.trim(pwd) != "" && $.trim(pwd2) != "") {
			if (pwd != pwd2) {
				this.setMsg(name, msg);
				return false;
			}
		}
		return true;
	},
	checkEmail : function(name, msg) {
		var value = $("input[name=" + name + "]").val();
		var reg = /^\w+@\w+(\.\w+)+$/;
		if (!reg.test(value)) {
			this.setMsg(name, msg);
			return false;
		}
		return true;
	},
	setMsg : function(name, msg) {
		$("#" + name + "_msg").text(msg);
	}
};