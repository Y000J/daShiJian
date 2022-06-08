window.onload = function () {
    // 调用getUserInfo获取用户基本信息
    getUserInfo()
}
// 获取用户基本信息
function getUserInfo() {
    let layer = layui.layer;
    axios({
        method: 'GET',
        url: 'http://www.liulongbin.top:3007/my/userinfo',
        // 请求头
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
    }).then(function (res) {
        nicknameAndHeadpor(res.data)
    });
}

// 渲染用户头像和昵称
function nicknameAndHeadpor(data) {
    if (data.status !== 0) {
        return layer.msg(data.message);
    }
    let unames = document.querySelectorAll('.uname');
    for (const k of unames) {
        k.innerHTML = data.data.username;
    }
}