window.onload = function () {
    var form = layui.form;
    // 通过form.verify()函数自定义效验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6-12位，且不能出现空格'],
        // 校验两次密码是否一致
        repwd: function (value) {
            // value 是确认密码框的内容
            const pwd = $('[name=newPwd]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })
    form.on('submit(*)', function () {
        $.ajax({
            method: "POST",
            url: 'http://www.liulongbin.top:3007/my/updatepwd',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: $('#form_Init').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message);
                // 重置输入框
                $('#resetBtn').click();
            }
        })
        return false;
    })
}