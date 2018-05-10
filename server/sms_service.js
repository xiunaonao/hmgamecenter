let crypto = require('crypto');
let http=require('http');

const _sms=()=>{
	let obj={
		//ip:'bjmtn.b2m.cn',
		ip:'http://sdkhttp:eucp.b2m.cn',
		AES:()=>{
			let json=`{
				"mobile":18314898769,
				"content":"【泓唛科技】测试短信",
				"requestTime":1525930678513
			}`
			let buffer=new Buffer(json)
			Buffer.prototype.toByteArray = function () {
			   return Array.prototype.slice.call(this, 0)
			}
			//console.log(buffer.toByteArray())


			var data = buffer;
			//console.log('Original cleartext: ' + data);
			var algorithm = 'aes-128-ecb';
			var key = 'C1E979992EE9BF9B';
			var clearEncoding = 'utf8';
			var iv = "";
			//var cipherEncoding = 'hex';
			//If the next line is uncommented, the final cleartext is wrong.
			var cipherEncoding = 'base64';
			var cipher = crypto.createCipheriv(algorithm, key,iv);

			var cipherChunks = [];
			cipherChunks.push(cipher.update(data, clearEncoding, cipherEncoding));
			cipherChunks.push(cipher.final(cipherEncoding));
			//console.log(cipherEncoding + ' ciphertext: ' + cipherChunks.join(''));

			var decipher = crypto.createDecipheriv(algorithm, key,iv);
			var plainChunks = [];
			for (var i = 0;i < cipherChunks.length;i++) {
			 plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));

			}
			plainChunks.push(decipher.final(clearEncoding));
			//console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));

			return cipherChunks.join('')

		},
		ReqSms:(str)=>{
			let opt={
				host:obj.ip,
				path:'/inter/sendSingleSMS',
				method: 'POST',
 				headers: {
 					'appId':"EUCP-EMY-SMS1-1UROD",
 					'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',  
    				'Content-Length':Buffer.byteLength(str)
 				}
			}
			let req=http.request(opt,(res)=>{
				//console.log(Object.keys(res))
				//console.log('Status:',res.statusCode);  
			    console.log('headers:',JSON.stringify(res.headers));  
			    res.setEncoding('utf-8');  
			    res.on('data',function(chun){  
			        console.log('body分隔线---------------------------------\r\n');  
			        console.info(chun);  
			    });  
			    res.on('end',function(){  
			        console.log('No more data in response.');  
			    });  

			})
			req.on('error',function(err){  
			    console.error(err)
			})
			req.write(str)

		}
	}

	return obj
}

let sms=_sms();

sms.ReqSms(sms.AES())

module.exports=_sms()
