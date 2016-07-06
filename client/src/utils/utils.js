import $ from 'jquery';

export default {
    callApi: function(url, method, callback) {
        $.ajax({
            url: url,
            method,
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: (data) => {
                if (data.success) {
                    callback(data);
                } else {
                    alert(data.error);
                }
            }
        });
    }
}
