$(function () {
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    })

    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{4,12}$/
            , '密码必须4到12位，且不能出现空格'
        ],
        repwd: function (value) {

            var pwd = $('.reg-box [name=password]').val()
            // console.log(pwd);
            if (pwd !== value) {
                return '两次密码输入不一致'
                //    return layer.msg('两次密码输入不一致');
            }
        }
    })
    // 表单提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/api/reguser',

            // url: 'http://www.liulongbin.top:3006/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg(res.message)
                // console.log('注册成功');
                layer.msg('注册成功')
                $('#link_login').click()
                // $(this).resize().val('')
                $('#form_reg [name=uname]').val('')
                $('#form_reg [name=password]').val('')
            }
        })

    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        console.log($(this).serialize());
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return console.log(res.message);//layer.msg(res.message) 
                layer.msg('登录成功！')
            }
        })
    })
})