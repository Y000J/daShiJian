window.onload = function () {

    // 输入验证
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        // 用户昵称
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称必须为1-6个字符';
            }
        }
    });
    // 初始化用户原数据
    initUserInfo(layer, form);
    // 提交修改后的表单
    form.on('submit(*)', function () {
        // e.preventDefault();
        submitUserInfo(layer);
        // 重新渲染父页面头像
        window.parent.getUserInfo();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
      });
   
    $('#resetBtn').on('click', (e) => {
        // 阻止默认行为
        e.preventDefault();
        // 初始化用户信息
        initUserInfo(layer)
    })
}


// 初始化用户信息
function initUserInfo(layer, form) {
    axios({
        method: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // 请求头
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
    }).then(function (res) {
        if (res.data.status !== 0) {
            return layer.msg(res.data.message);
        }
        // 初始化用户信息
        form.val('userInit', res.data.data)
    });
}
// 提交修改后的表单
function submitUserInfo(layer) {

    $.ajax({
        method: 'POST',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        data: $('#form_Init').serialize(),
        success: (function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message);
        })
    })
}
