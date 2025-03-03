let content_hiding_submit = document.getElementById('content-hiding-submit');
let content_hiding_password = document.getElementById('content-hiding-password');
let content_hiding_error = document.getElementById('content-hiding-error');
// 点击验证
if (content_hiding_submit){
    content_hiding_submit.onclick = function () {
        content_hiding_error.style.display = 'none';
        let content_hiding_password_value = content_hiding_password.value;
        if (!content_hiding_password_value) {
            content_hiding_password.focus();
            content_hiding_error.innerText = '请输入' + content_hiding_js_obj.wechat_text;
            content_hiding_error.style.display = 'inline-block';
            return;
        }
        const formData = new FormData();
        formData.append('action', 'check_password');
        formData.append('password', content_hiding_password_value);
        fetch(content_hiding_js_obj.ajax_url, {
            method: 'POST',
            body:formData
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('请求出错');
                }
                return response.json()
            })
            .then(data => {
                if (data.status == 2){
                    content_hiding_error.innerText = data.msg;
                    content_hiding_error.style.display = 'inline-block';
                } else {
                    location.reload();
                }
            })
            .catch((error) => {
                content_hiding_error.innerText = error.toString();
                content_hiding_error.style.display = 'inline-block';
            });
    };
}