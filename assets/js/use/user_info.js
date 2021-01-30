$(function () {
    // var form = layui.form
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })
    initUserInfo()
    // 初始化用户的信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('获取用户基本信息失败')

                form.val('formUserInfo', res.data)

            }
        })

    }
    // 重置按钮
    $('.btnReset').on('click', function (e) {
        // e.preventDefault()
        e.preventDefault()
        initUserInfo()
    })
    // // 表单提交事件
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: '/my/userinfo',
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('更新列表失败')
                // 调用他父亲的里js的方法
                window.parent.getUserInfo()
                // window.parent.getUserInfo()
            }
        })
    })
    // $.ajax({
    //     method: 'POST',
    //     url: '/my/userinfo',
    //     data: $(this).serialize(),
    //     success: function (res) {
    //         if (res.status !== 0) {
    //             return layer.msg('更新用户信息失败！')
    //         }
    //         layer.msg('更新用户信息成功！')
    //         // 调用父页面中的方法，重新渲染用户的头像和用户的信息
    //         window.parent.getUserInfo()
    //     }
    // })
})