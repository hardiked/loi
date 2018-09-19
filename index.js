class DisjointSet{
	constructor(n,arr){
		this.count=n;
		this.demand=new Array(n);
		this.sz=new Array(n);
		this.idt=new Array(n);
		this.f = new Array();

		for (var i=0;i<n;i++){
		 	this.f[i]=new Array();
			// for (j=0;j<jMax;j++){
	  // 			f[i][j]=0;
	 	// 	}
		}
		for(i=0; i<n; i+=1)	{
			this.demand[i]=arr[i];
            this.idt[i] = i;
		    this.sz[i] = 1;
		}
	}

	find(p)	{
	    var rootVar = p;
	    while (rootVar != this.idt[rootVar])
	        rootVar = this.idt[rootVar];
	    while (p != rootVar) {
	        var newp = this.idt[p];
	        this.idt[p] = rootVar;
	        p = newp;
	    }
	    return rootVar;
	}

	utils(i,j){
		this.idt[i] = j; 
		this.sz[j] += this.sz[i];
		this.demand[j]+=this.demand[i];
		if(this.f[i].length==this.f[j].length){
			if(this.f[i].length==0){
				this.f[j].push(j);
			}
		}
		this.f[j].push(i);
		for(var l=0;l<this.f[i].length;l+=1){
			this.f[j].push(f[i][l]);
		}
	}

	add(x, y)	{
		var i = this.find(x);
		var j = this.find(y);
		if (i==j) return;
		// make smaller root point to larger one
		if(this.sz[i] < this.sz[j])	{
			this.utils(i,j);
		} 
		else{ 
			this.utils(j,i);
		}
		this.count--;
	}

	demanded(point){
		var x=this.find(point);
		return this.demand[x];
	}

	connected(x, y)    {
        return this.find(x) == this.find(y);
    }
	// Return the number of disjoint sets.
    count() {
        return this.count;
	}

	extract() {
        var resObj = {},
        	answer = [];
        var rootId;

        for (var id in this.idt) {
            rootId = this.find(id);

            if (typeof resObj[rootId] === 'undefined') {
                resObj[rootId] = [];
            }
            resObj[rootId].push(id);
        }

        for (var key1 in resObj) {
        	if(this.f[key1].length==0){
        		var key=parseInt(key1);
        		if(key!=0)
        			answer.push([key]);
        	}
        	else
        		answer.push(this.f[key1]);
        }
        return answer;
    }
}

var distance=[
	[0,12,11,7,10,10,9,8,6,12],
	[12,0,8,5,9,12,14,16,17,22],
	[11,8,0,9,15,17,8,18,14,22],
	[7,5,9,0,7,9,11,12,12,17],
	[10,9,15,7,0,3,17,7,15,18],
	[10,12,17,9,3,0,18,6,15,15],
	[9,14,8,11,17,18,0,16,8,16],
	[8,16,18,12,7,6,16,0,11,11],
	[6,17,14,12,15,15,8,11,0,10],
	[12,22,22,17,18,15,16,11,10,0]
];

var demand=[0,10,15,18,17,3,5,9,4,6];

var k=40;

var iMax = 9;
var jMax = 10;
var f = new Array();

for (i=0;i<iMax;i++){
 	f[i]=new Array();
 	for (j=0;j<jMax;j++){
  		f[i][j]=0;
 	}
}
var final=new Array();

for(i=1;i<=8;i++){
	for(j=2;j<=9;j++){
		if(i<j){
			f[i][j]=distance[0][i]+distance[0][j]-distance[i][j];
			final.push([f[i][j],i,j]);
		}
	}
}

function sortFunction(a, b) {
    if (a[0] === b[0]) {
        if(a[1]!=b[1]){
        	return (a[1] < b[1]) ? -1 : 1;
        }
        if(a[2]!=b[2]){
        	return (a[2] < b[2]) ? -1 : 1;
        }
        else{
        	return 0;
        }
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

final.sort(sortFunction);

var set=new DisjointSet(10,demand);

for(i=0;i<final.length;i+=1){
	if(!set.connected(final[i][1],final[i][2])){
		if(set.demanded(final[i][1])+set.demanded(final[i][2])<=k){
			set.add(final[i][1],final[i][2]);
		}
	}
}

var answer=set.extract();
console.log(answer);
console.log(answer.length);
var a=[1,12,2,3,4];
a.sort();
console.log(a);