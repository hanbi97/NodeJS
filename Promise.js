STATUS_PENDING = 'pending'
STATUS_RESOLVED = 'resolved' //fulfilled
STATUS_REJECTED = 'rejected'

class Promise{
    constructor(fn){
        this.status=STATUS_PENDING;
        this.callbacks = [];
        try{
        fn(this.resolve.bind(this),this.reject.bind(this));
        }catch(err){
            this.reject(err);
        }
    }

    then(callback){
        if(this.status===STATUS_PENDING){
            this.callbacks.push(callback(this.value)); //add callback
            return new Promise(fn);
        }
        if(this.status===STATUS_RESOLVED){
            return new Promise((resolve)=>resolve(callback(this.value)));
        }
    }

    resolve(value){
        this.value=value;
        this.status=STATUS_RESOLVED;
        this.callbacks.forEach(lastcall=>lastcall());
    }

    reject(value){
        this.value=value;
        this.status=STATUS_REJECTED;
    }
}

module.exports = Promise;

/*
Promise 객체는 instance 생성 시 executor 함수를 인자로 받고, 이 executor은 resolve, reject 콜백 인자로 받아 실행
1. status 표시
2. then chaining ->a.then().then()
   promise1: a
   promise2: prmoise1.then()
then이 끝나면 promise를 return하는 듯
3. resolve 시 callback 실행
   미리 callback을 따로 저장해 놓고 then 실행 시 그걸 가져다 쓰게 함
*/

/*
bind(): 호출 시 새로운 함수 생성, this의 값을 영구히 바꿀 수 있음
func.bind(thisArg[,arg1[,arg2[,...]]])
thisArg: func의 this에 전달하는 값
지정한 this 및 매개변수들을 사용해 변경한 원본 함수의 복제본을 리턴
ex. 태어난 해는 항상 같지만 직업을 자유롭게 바꾸는 업데이트 함수를 만드는 경우에 사용
*/
