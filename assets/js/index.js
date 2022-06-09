window.onload = function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo();

    // 退出按钮
    // 引入layui  提示组件
    let layer = layui.layer;
    document.querySelector('#outBtn').addEventListener('click', () => {
        outBtn(layer);
    })
}

    // 获取用户基本信息
    function getUserInfo() {
        axios({
            method: 'GET',
            url: 'http://www.liulongbin.top:3007/my/userinfo',
            // 请求头
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
        }).then(function (res) {
            if (JSON.parse(res.request.responseText).status === 1 && JSON.parse(res.request.responseText).message === '身份认证失败！') {
                location.href = './login.html';
            } else {
                if (res.data.status !== 0) {
                    return layer.msg(res.data.message);
                }
                // 渲染用户头像和昵称
                nicknameAndHeadpor(res.data.data)
            }
        });
    }

    // 渲染用户头像和昵称
    function nicknameAndHeadpor(data) {
        // 昵称
        // 检查是否是管理员账号
        let name = data.nickname || data.username
        let unames = document.querySelectorAll('.uname');
        let imgHead = document.querySelectorAll('.layui-nav-img');
        let txtHeadPor = document.querySelectorAll('.txtHeadPor');
        for (const k of unames) {
            k.innerHTML = name;
        }
        // 头像
        if (data.user_pic !== null) {
            // 渲染图片头像
            for (let i = 0; i < txtHead.length; i++) {
                // txtHeadPor[i].style.display = 'none';
                imgHead[i].style.display = 'inline-block'

            }
        } else {
            // 渲染文本头像
            for (let i = 0; i < imgHead.length; i++) {
                imgHead[i].style.display = 'none';
                txtHeadPor[i].style.display = 'inline-block'
                txtHeadPor[i].innerHTML = data.nickname[0].toUpperCase();
            }
        }
    }

    // 退出按钮
    function outBtn(layer) {
        layer.confirm('您确定要退出嘛?', { icon: 3, title: '提示' }, function (index) {
            // 清空本地token
            localStorage.removeItem('token');
            location.href = './login.html';
            layer.close(index);
        });
    }