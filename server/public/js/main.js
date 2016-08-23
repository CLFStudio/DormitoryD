Vue.http.options.emulateJSON = true;
Vue.config.devtools = true;

var vm = new Vue({
	el: '#container',
	ready: function() {
		this.$http.get('/questions.json').then(function(response){
			this.$set('questions', response.json().data)
			if(localStorage.r==1){
				this.index=response.json().length-1;
			}
      	});
	},	
	data: {
		index:0,
		ans:{},
		questions:''
	},
	methods: {
		click: function(index,select) {
			this.ans[index]=select;
			this.index=this.index+1;
			if(this.index==this.questions.length-1&&localStorage.r!=1){
				this.$http.post('/ans/post', this.ans, { emulateJSON: true }).then(function(res) {
					var ans = JSON.parse(res.body);
                	if(ans.ok) {localStorage.r=1;alert("提交成功");}
					else alert("Wrong.Please ask Admin");
				});
			}
		},
		reverse: function(){
			this.index=this.index-1;
		}
	}	
});


window.onload = function () {
	var container = document.getElementById('container'),
		quesMask = document.getElementsByClassName('quesMask')[0],
		authIdSub = document.getElementById('authIdSub'),
		authId = document.getElementById('authId');
	quesMask.classList.add('showQues');
	authIdSub.addEventListener('click',function(){
		if(authId.value!=''){
			vm.ans.authId=authId.value;
			quesMask.classList.remove('showQues');
		}
	})
	container.style.opacity=1;
}

$(document).on("touchstart", ".action-btn:not(.disable)", function (e) {
    var $this = $(this);
    var flag = true;
    //遍历子类
    $this.find("*").each(function () {
        //查看有没有子类触发过active动作
        if ($(this).hasClass("active")) flag = false;
    });
    //如果子类已经触发了active动作，父类则取消active触发操作
    if (flag) $this.addClass("active");
});

$(document).on("touchmove", ".action-btn:not(.disable)", function (e) {
    if ($(this).hasClass("active")) $(this).removeClass("active");
});

$(document).on("touchend", ".action-btn:not(.disable)", function (e) {
    if ($(this).hasClass("active")) $(this).removeClass("active");
});
