Vue.http.options.emulateJSON = true;
Vue.config.devtools = true;

var vm = new Vue({
	el: '#container',
	ready: function() {
		this.$http.get('/questions/get').then(function(response){
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