/**
 * 向模态框传递rid的值
 */
$('#commentModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var rid = button.data('rid');
    $("#rid").val(rid);
});

/**
 * 创建项目
 * @returns {boolean}
 */
function createProject() {
    $.ajax({
        url: '/post/createProject',
        data: $("#projectInfoForm").serialize(),
        type: 'POST',
        dataType: 'text',
        success: function(msg){
            if(msg === "fail"){
                alert("创建失败，请重试");
                return false;
            }else if(msg === "success") {
                alert("创建成功");
                window.location.href="/post/myProjects?page=1";
            }
        },
        error: function (exc) {
            alert("发生错误，请重试");
            console.log(exc);
        }
    });

    return false;
}

/**
 * 编辑项目
 * @returns {boolean}
 */
function editProject() {
    var pid = getQueryString("pid");

    $.ajax({
        url: '/post/editProject?pid=' + pid,
        data: $("#projectInfoForm").serialize(),
        type: 'POST',
        dataType: 'text',
        success: function(msg){
            if(msg === "wrong_user"){
                alert("该用户无操作权限");
                return false;
            }else if(msg === "fail"){
                alert("编辑失败，请重试");
                return false;
            }else if(msg === "success") {
                alert("编辑成功");
                window.location.href="/post/myProjects?page=1";
            }
        },
        error: function (exc) {
            alert("发生错误，请重试");
            console.log(exc);
        }
    });

    return false;
    
}

/**
 * 搜索项目
 * @returns {boolean}
 */
function doSearch() {
    var form = $("#searchProjectForm").serialize();
    window.location.href = '/post/searchResult?' + form +'&page=1';
    return false;
}

/**
 * 添加需求
 * @returns {boolean}
 */
function createRequirement() {
    let pid = getQueryString("pid");
    let form_data = new FormData($('#requirementInfoForm')[0]);
    form_data.append('file', $('#file')[0].files[0]);
    $.ajax({
        url: '/post/createRequirement?pid=' + pid,
        data: form_data,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function(msg){
            if(msg === "fail"){
                alert("提交失败，请重试");
            }else if(msg === "success") {
                alert("提交成功");
                window.location.href="/post/project?pid=" + pid + "&page=1";
            }
        },
        error: function (exc) {
            alert("发生错误，请重试");
            console.log(exc);
        }
    });
}

/**
 * 编辑需求
 * @returns {boolean}
 */
function editRequirement() {
    let pid = getQueryString("pid");
    let rid = getQueryString("rid");
    let form_data = new FormData($('#requirementInfoForm')[0]);
    form_data.append('file', $('#file')[0].files[0]);
    $.ajax({
        url: '/post/editRequirement?pid=' + pid + '&rid=' + rid,
        data: form_data,
        type: 'POST',
        dataType: 'text',
        processData: false,
        contentType: false,

        success: function(msg){
            if(msg === "wrong_user"){
                alert("该用户无操作权限");
                return false;
            }else if(msg === "fail"){
                alert("编辑失败，请重试");
                return false;
            }else if(msg === "success") {
                alert("编辑成功");
                window.location.href="/post/project?pid=" + pid + "&page=1";
            }
        },
        error: function (exc) {
            alert("发生错误，请重试");
            console.log(exc);
        }
    });

    return false;
}

/**
 * 评论需求
 * @returns {boolean}
 */
function comment() {

    $.ajax({
        url: '/post/comment',
        data: $("#commentForm").serialize(),
        type: 'POST',
        dataType: 'text',
        success: function(msg){
            if(msg === "fail"){
                alert("评论失败，请重试");
                return false;
            }else if(msg ==="success") {
                window.location.reload();
            }
        },
        error: function (exc) {
            alert("发生错误，请重试");
            console.log(exc);
        }
    });

    return false;
}

/**
 * 点赞/取消点赞
 */
function like(like, rid, pid) {
    let data = {like:like, pid:pid, rid:rid};
    $.ajax({
        url: '/post/like',
        data: data,
        type: 'GET',
        success: function(msg){
            window.location.reload();
        },
        error: function (exc) {
            alert("发生错误，请重试");
            window.location.reload();
            console.log(exc);
        }
    });

    return false;
}

/**
 * 进入项目帖子
 * @param pid
 */
function goToPost(pid) {
    window.location.href = '/post/project?pid=' + pid + '&page=1';
}

/**
 * 进入提交需求
 * @param pid
 */
function goToCreateRequirement(pid) {
    window.location.href = '/post/sendRequirement?pid=' + pid;
}

/**
 * 进入编辑需求
 * @param pid
 * @param rid
 */
function goToEditRequirement(pid, rid) {
    window.location.href = '/post/sendRequirement?pid=' + pid + '&rid=' + rid;
}

/**
 * 进入编辑项目
 * @param pid
 */
function goToEditProject(pid) {
    window.location.href = '/post/sendProject?pid=' + pid;
}

/**
 * 整合重复需求
 * @param pid
 */
function goToManageRequirement(pid) {
    $.ajax({
        url: "/reorganizeRequirement?pid=" + pid,
        type: "GET",
        success: function (msg) {
            console.log(msg);
            alert("Success!")
            window.location.href = '/repeat?pid=' + pid + '&page=1';

        },
        fail: function(msg){
            console.log(msg)
        },
        error: function (exc) {
            console.log(exc)
        }
    })
}