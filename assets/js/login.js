$(function () {
    // 点击切换注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });
    // 点击切换登录
    $('#link_login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    });
    // 从layui中获取from对象
    var from = layui.form;
    // 通过form.verify()函数自定义效验规则
    from.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // value 是确认密码框的内容
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    let url = 'http://www.liulongbin.top:3007';
    // 从layui中获取from对象
    let layer = layui.layer;
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        let data = `username=${$('.reg-box [name=username]').val()}&password=${$('.reg-box [name=password]').val()}`
        // 提交POST请求
        axios({
            method: 'POST',
            url: url + '/api/reguser',
            data: data
        }).then(function (res) {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            layer.msg('注册成功！');
            // 注册成功后跳转到登录页面
            $('#link_login').click();
        })
    })
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        let data = `username=${$('.login-box [name=username]').val()}&password=${$('.login-box [name=password]').val()}`
        axios({
            method: 'post',
            url: url + '/api/login',
            data: data
        }).then(res => {
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            layer.msg('登录成功！');
            // 将token存入本地存储
            localStorage.setItem('token', res.data.token)
            // 登录成功后跳转到index页面
            location.href = './index.html';
        })
    })

})