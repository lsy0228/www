$(function () {
    getUserInfo()

    // 获取用户基本信息
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg('获取用户基本信息失败')

                renderAvatar(res.data) 
            },
            // 无论成功还是失败都调用
            // complete: function (res) {
            //     if (res.responseJSON.status === 1 || res.responseJSON.message === '身份认证失败！') {
            //         localStorage.removeItem('token')
            //         location.href='login.html'
            //     }
            // }
        })
        $('.btnLogin').on('click', function () {
            //    console.log('点击');
            layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
                // 1清空token
                localStorage.removeItem('token')
                // 2页面跳转到login
                location.href = 'login.html'
                //do something
                // 关闭询问框

                layer.close(index);
            });

        })
    }
    function renderAvatar(user) {
        // 更改名字
        var name = user.nickname || user.username
        $('#welcome').html(`欢迎${name}`)
        // 更改头像
        // 有头像就显示该头像，没有则显示开头字母
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
            $('.text-avater').hide()
        } else {
            var first = name[0].toUpperCase()
            $('.layui-nav-img').hide()
            $('.text-avater').html(first).show()
        }
    }
})