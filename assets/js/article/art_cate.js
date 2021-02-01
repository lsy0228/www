$(function () {
    var layer = layui.layer
    var form = layui.form
    // 获取文章信息
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {

                var htmlStr = template('tel', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    // 添加事件
    var indexAdd = null
    $('#btnAddCate').on('click', function () {

        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html() //这里content是一个普通的String
        });
    })
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layer.msg('新增列表失败')

                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })


    // 通过代理的形式，为 btn-edit 按钮绑定点击事件
    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function (e) {

        e.preventDefault()
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章内容',
            content: $('#dialog-edit').html() //这里content是一个普通的String
        });
        var id = $(this).attr('data-id')

        console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                console.log(res);
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式，为修改分类的表单绑定 submit 事件
    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg('修改文章内容失败')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    $('tbody').on('click', '.btn-delete', function (res) {
        var id = $(this).attr('data-id')
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) return layer.msg('删除内容失败')
                    layer.close(index);
                    initArtCateList()
                }
            })


        });

    })



})