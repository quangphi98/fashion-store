$(document).ready(function(){
    const idUser = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");

    getUser(idUser, accessToken)
    getAllRole(accessToken)
    updateRoll(idUser, accessToken)
})

getAllRole = (accessToken) =>{
    $("update").click(async function(){
        await $.ajax({
            url: `https://p-nestjs-ecommerce.onrender.com/api/v1/roles/`,
            type: 'Get',
            headers: {
                'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
                'Content-Type': 'application/json',
            },
            dataType: 'json', // added data type
            success: function(res) {
                const data = res.data.result;
                console.log(res)
                const role = data.map(item => 
                        `
                            <option value="${item._id}">${item.name}</option>
                        `
                );
                $('#role_select').html(role.join());
            }
        }) 
    })
}

getUser = async(id, accessToken) => {
    await $.ajax({
        url: `https://p-nestjs-ecommerce.onrender.com/api/v1/users/${id}`,
        type: 'Get',
        headers: {
            'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
            'Content-Type': 'application/json',
        },
        dataType: 'json', // added data type
        success: function(res) {
            console.log(res.data.role);
            const idRole = res.data.role;
            $('#role_select').val(idRole);
        }
    }) 
}

updateRoll = async(id, accessToken) =>{
    await $.ajax({
        url: `https://p-nestjs-ecommerce.onrender.com/api/v1/users/${id}`,
        type: 'Patch',
        headers: {
            'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            roleId:  $('#role_select').val()
        }),
        success: function(response) {
          var messeage = 'Sửa thành công';
          alert(messeage);
          window.location.href = './List.html';
        },
        error: function(response) {
            console.log(response);
        }
    }) 
}

