$(document).ready(function(){
    const accessToken = localStorage.getItem("accessToken")
    getAllUser(accessToken);
    getIdUser();
})

getAllUser = async(accessToken) => {
    await $.ajax({
        url: "https://p-nestjs-ecommerce.onrender.com/api/v1/users",
        type: 'Get',
        headers: {
            'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
            'Content-Type': 'application/json',
        },
        dataType: 'json', // added data type
        success: function(res) {
            let data = res.data.result ;
            console.log(data);
            for(let key in data)
            {
                getRole(data[key].role, accessToken, function(nameRole){
                    const status = "Đang hoạt động";
                    if(data[key].isDeleted == true){
                        status = "Đã bị xóa";
                    }
                    $('#users').append(
                        `
                            <tr>
                                <td class="email" id ="${data[key]._id}" >${data[key].email}</td>
                                <td class="fullname">${data[key].fullname}</td>
                                <td class="address">${data[key].address}</td>
                                <td class="role">${nameRole}</td>
                                <td class="status">${status}</td>
                            </tr>
                        `
                    )
                });
            }
        }
    })
}

getRole = async(id, accessToken, callBack) => {
    await $.ajax({
        url: `https://p-nestjs-ecommerce.onrender.com/api/v1/roles/${id}`,
        type: 'Get',
        headers: {
            'Authorization': 'Bearer ' + accessToken, // Thêm access token vào header
            'Content-Type': 'application/json',
        },
        dataType: 'json', // added data type
        success: function(res) {
            const nameRoll = res.data.name;
            callBack(nameRoll);
        }
    }) 
}

getIdUser = () => {
    $(document).on('click', '.update', function(){
        let id = $(this).attr('id');
        console.log(id);
        localStorage.setItem('userId', id);  // Store the id in localStorage
    });
    $(document).on('click', '.btn_update .btn', function(){
        window.location.href = "../../View/user/Update.html";
    });
}