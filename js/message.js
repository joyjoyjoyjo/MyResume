var APP_ID = 'v5w27JD80wqIR8qAsSqzyeMr-gzGzoHsz';
var APP_KEY = 'Oy97U2VQmj7MUfpdvT7PJ4Pl';

AV.init({
    appId: APP_ID,
    appKey: APP_KEY
});

let myForm = document.querySelector('#postMessageForm')

myForm.addEventListener('submit', function (e) {
    e.preventDefault()
    let content = myForm.querySelector(`input[name=content]`).value
    var Message = AV.Object.extend('Message');
    var message = new Message();
    message.save({
        'content': content
    }).then(function (object) {
        alert('存入成功')
    })
})

//var TestObject = AV.Object.extend('TestObject');
//var testObject = new TestObject();
//testObject.save({
//    words: 'Hello World!'
//}).then(function (object) {
//    alert('LeanCloud Rocks!');
//})