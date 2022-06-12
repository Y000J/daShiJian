window.onload = function () {
    let layer = layui.layer;
    // 获取参数对象
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    // 初始化文章列表
    initArticleList();
    function initArticleList() {
        $.ajax({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/article/list',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                // 使用模板引擎渲染表格数据
                let tableHtml = template('article_table', res);
                $('tbody').html(tableHtml);
                console.log(tableHtml);
            }
        }) 
    }
    




}