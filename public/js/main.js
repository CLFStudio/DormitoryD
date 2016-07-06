Vue.http.options.emulateJSON = true;

var ScaleLoader = VueSpinner.ScaleLoader;

var spinner = new Vue({
	el: '#loader',
	components: {
		ScaleLoader
	},
	data () {
		return {
			color: '#3AB982',
            height: '35px',
            width: '4px',
            margin: '2px',
            radius: '2px'
		}
	}
});

var vm = new Vue({
	el: '#container',
	ready: function() {
		if(localStorage.t==1){
			this.index=this.questions.length-1;
		}
	},	
	data: {
		index:0,
		ans:{},
		questions:[
    {
	    "q": "请确定您的年级",
		"selects":["14级","15级"]
	},
	{
	    "q":"您对现在寝室分配是否满意？",
		"selects":["满意","不满意"]	
	},
    {
        "q":"您是否想要换过寝室？",
        "selects":["有过","没有"]
    },
    {
        "q":"你现在的寝室对你影响怎样？",
        "selects":["正面影响","负面影响","无"]
    },
    {
	    "q":"感谢您的认真填写"
	}
]
	},
	methods: {
		click: function(index,select) {
			var bu = document.getElementById('bu');
			this.ans[index]=select;
			this.index=this.index+1;
			if(this.index==this.questions.length-1&&localStorage.t!=1){
				this.$http.post('/ans', this.ans).then(function(res) {
					if(res.body==1) localStorage.t=1;
				});
			}
			if(this.index!=0){
				bu.style.display="block";
			}
		},
		reverse: function(){
			this.index=this.index-1;
		}
	}	
});


window.onload = function () {
	var loader = document.getElementById('loader'),
		container = document.getElementById('container');
		loader.style.opacity=0;

	container.style.opacity=1;
}