$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{4,12}$/
            , '密码必须4到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            console.log(777);
            console.log(value);
            if (value === $('[name=oldPwd]').val()) {
                return layer.msg('新旧密码一致')
            }
        },
        rePwd: function (value) {
            console.log(value);
            if (value !== $('[name=newPwd]').val()) {
                return layer.msg('二次密码不一致')
            }
        }
    })
    // 点击修改
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return
                console.log(res);
                $('.layui-form')[0].reset()
            }
        })
    })
})