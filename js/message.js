!function () {
    var view = document.querySelector('section.message')

    var model = {
        init: function () {
            var APP_ID = 'v5w27JD80wqIR8qAsSqzyeMr-gzGzoHsz'
            var APP_KEY = 'Oy97U2VQmj7MUfpdvT7PJ4Pl'
            AV.init({ appId: APP_ID, appKey: APP_KEY })
        },
        fetch: function () {
            var query = new AV.Query('Message');
            return query.find()
        },
        save: function (name, content) {
            var Message = AV.Object.extend('Message')
            var message = new Message()
            return message.save({
                content: content,
                name: name
            })
        }
    }
    var controller = {
        view: null,
        model: null,
        messageList: null,
        init: function (view, model) {
            this.view = view
            this.model = model
            this.messageList = view.querySelector(`#messageList`)
            this.form = view.querySelector('form')
            this.model.init()
            this.loadMessages()
            this.bindEvents()
        },
        loadMessages: function () {
            this.model.fetch().then(
                (messages) => {
                    let array = messages.map((item) => item.attributes)
                    array.forEach((item) => {
                        let li = document.createElement('li')
                        li.innerText = `${item.name}:${item.content}`
                        this.messageList.append(li)
                    })
                })
        },
        bindEvents: function () {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault()
                this.saveMessages()
            })
        },
        saveMessages: function () {
            let myform = this.form
            let content = myform.querySelector('input[name=content]').value
            let name = myform.querySelector('input[name=name]').value
            if (content ==='' ||name==''||content ===' ' ||name==' '||content == null||name == null||name == undefined||content == undefined) {
                alert("用户名或输入内容不能为空！")
                myform.querySelector('input[name=content]').value = ''
                myform.querySelector('input[name=name]').value = ''
            } else {
                this.model.save(name, content).then(function (object) {
                    let li = document.createElement('li')
                    li.innerText = `${object.attributes.name}:${object.attributes.content}`
                    let messageList = document.querySelector('#messageList')
                    messageList.append(li)
                    myform.querySelector('input[name=content]').value = ''
                })
            }
        }
    }
    controller.init(view, model)
}.call()


