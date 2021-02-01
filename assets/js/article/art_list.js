$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function (data) {
        var dt = new Date(data)
        // const dt = new Date(date)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return `${y} ${m} ${d} ${hh}:${mm}:${ss}`
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var q = {
        pagenum: 1,// 页码值，默认请求第一页的数据
        pagesize: 2,
        cate_id: '',
        state: '',

    }

    initTable()

    initCate()
    // 获取数据
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layer.msg('获取信息失败')
                var htmlStr = template('tpl-cate', res)

                $('tbody').html(htmlStr)
                // 调用渲染分页方法
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'GET',
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) return layui.msg('获取信息列表失败')
                var htmlStr = template('tel', res)
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)

                // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    // 为筛选表单绑定 submit 事件
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })
    // 渲染分页数据
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',//容器
            count: total,//总条数
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//设置默认选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log(obj);
                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                // 把最新的条目数，赋值到 q 这个查询参数对象的 pagesize 属性中
                q.pagesize = obj.limit
                // first（是否首次，一般用于初始加载的判断）
                if (!first) {
                    initTable()
                }
            }
        })
    }
    // 通过代理的形式，为删除按钮绑定点击事件处理函数
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'GET',
                url: "/my/article/delete/" + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) return layer.msg('删除文章失败！')
                    layer.msg('删除文章成功！')

                    layer.close(index);
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
        });
    })
})