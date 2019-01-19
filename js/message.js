var APP_ID = 'v5w27JD80wqIR8qAsSqzyeMr-gzGzoHsz';
var APP_KEY = 'Oy97U2VQmj7MUfpdvT7PJ4Pl';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

var query = new AV.Query('Message');
query.find()
    .then(function (messages) {
        let array = messages.map((item) => item.attributes)
        array.forEach((item) => {
            let li = document.createElement('li')
            li.innerText = `${item.name}:${item.content}`
            let messageList = document.querySelector('#messageList')
            messageList.append(li)
        });
    }, function (error) {
        // 异常处理
    })

let myform = document.querySelector('#postMessageForm')

myform.addEventListener('submit', function (e) {
    e.preventDefault()
    let content = myform.querySelector('input[name=content]').value
    let name = myform.querySelector('input[name=name]').value
    //创建一个叫Message的表
    var Message = AV.Object.extend('Message')
    //在表中创建一行数据
    var message = new Message()
    message.save({
        content: content,
        name: name
    }).then(function (object) {
        let li = document.createElement('li')
        li.innerText = `${object.attributes.name}:${object.attributes.content}`
        let messageList = document.querySelector('#messageList')
        messageList.append(li)
        myform.querySelector('input[name=content]').value = ''
    })
})

//
//var Message = AV.Object.extend('Message');

///var testObject = new TestObject();
//testObject.save({
 //   words: 'Hello World!'
//}).then(function (object) {
//    alert('LeanCloud Rocks!');
//})