window.onload = function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 选择图片功能
    $('#getImgBtn').on('click', function () {
        $('#imgFile').click()
    });
    // 上传图片
    $('#imgFile').on('change', function (e) {
        uploadImg(e);
    });
    $('#setAvatarBtn').on('click', function () {
        setAvatar()
    })

    // 上传图片函数
    function uploadImg(e) {
        if (e.target.files.length === 0) {
            layui.layer.msg('未选择图片！')
        }
        // 将选择的图片上传
        // 拿到上传的图片
        let file = e.target.files[0];
        let url = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', url)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    }
    // 设置头像函数
    function setAvatar() {
        let dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');      // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            method: 'POST',
            url: 'http://www.liulongbin.top:3007/my/update/avatar',
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            data: {
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg(res.message);
                window.parent.getUserInfo();
            }
        })
    }
}
