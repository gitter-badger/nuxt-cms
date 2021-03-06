/**
 * 工具类
 */
//手机号码
const MOBILEPHONE_REGEXP = /^(0)?1([3|4|5|7|8])+([0-9]){9,10}$/;
//邮箱
const EMAIL_REGEXP = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/i;
//身份证
const DICARD_REGEXP = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

export default{
    //货币格式化
    formatCurrency(num){
        num = num||'0';
        num = num.toString().replace(/\$|\,/g,'');
        if(isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num*100+0.50000000001);
        var cents = num%100;
        num = Math.floor(num/100).toString();
        if(cents<10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)
            num = num.substring(0,num.length-(4*i+3))+','+
                num.substring(num.length-(4*i+3));
        return (((sign)?'':'-') + num + '.' + cents);
    },
    //返回所有结果集,格式为[[1,2,3],[4,5,6]...]
    combine(array){

        if(!(array instanceof Array)){
            console.error('非法数组');
            return;
        }

        var r= [];
        (function f(t,a,n){
            if (n === array.length) return r.push(t);

            for(var i=0; i<a[n].length; i++){
                f(t.concat(a[n][i]),a,n+1);
            }

        })([],array,array.length - array.length);

        return r;
    },
    //移除所有值为假的对象，返回对象本身
    compactObj(obj){
        for(var v in obj){
            if(obj.hasOwnProperty(v)){
                if(!obj[v]){
                    delete obj[v];
                }
            }
        }
        return obj;
    },
    //移除所有值为假的数组，返回数组本身
    compactArray(array){

        if(!(array instanceof Array)){
            console.error('非法数组');
            return;
        }

        let index = -1,
            length = array.length;

        while (++index < length) {
            let value = array[index];
            if (!value) {
                array.splice(index,1);
            }
        }
        return array;
    },
    //验证。暂时支持：手机号、邮箱、身份证。后面补
    regCheck(num,type){
        var flag;

        if(!type){
            console.warn('传入你要检测的类型');
            return;
        }

        type = type.toLocaleLowerCase();
        switch (type) {
            case 'mobile_phone':
                flag = MOBILEPHONE_REGEXP.test(num);
                break;
            case 'e_mail':
                flag = EMAIL_REGEXP.test(num);
                break;
            case 'id_card':
                flag = DICARD_REGEXP.test(num);
                break;
            //no default:
        }
        return flag;
    }
};
