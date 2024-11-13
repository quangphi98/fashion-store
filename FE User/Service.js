//use component header
fetch('/publish/share/header/header.html')
            .then(response => response.text())
            .then(data => {
                // Tạo một phần tử DOM ảo để chứa nội dung HTML gốc
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                
                // Lấy thẻ div cần chèn từ HTML gốc
                const myDiv = doc.querySelector('header');
                
                // Chèn thẻ div vào HTML đích
                const targetDiv = document.querySelector('header');
                if (myDiv && targetDiv) {
                    targetDiv.appendChild(myDiv);
                    amountProduct();
                } else {
                    console.error('Không tìm thấy phần tử header');
                }
            })
            .catch(error => console.error('Lỗi:', error));
            
//use component footer
fetch('../../publish/share/footer/footer.html')
            .then(response => response.text())
            .then(data => {
                // Tạo một phần tử DOM ảo để chứa nội dung HTML gốc
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                
                // Lấy thẻ div cần chèn từ HTML gốc
                const myDiv = doc.querySelector('footer');
                
                // Chèn thẻ div vào HTML đích
                document.querySelector('footer').appendChild(myDiv);
            })
            .catch(error => console.error('Lỗi:', error));
            
$(document).ready(async function(){
    await login();
    await getInfor();
    await getAddress();
})

const login = async () => {
    const urlApiLogin = 'https://p-nestjs-ecommerce.onrender.com/api/v1/auth/login'

    await $.ajax({
        url: urlApiLogin,
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: '1234@gmail.com',
            password: 'Aavata123@'
        }),
        success: function(response) {
          console.log(response);
          localStorage.setItem('accessToken',response.data.access_token);
        },
        error: function(response) {
            console.log(response);
        }
      });
}

const getInfor = () => {
    $.ajax({
        url : 'https://p-nestjs-ecommerce.onrender.com/api/v1/auth/account',
        type : 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        success: function(res) {
            const data = res.data._id;
            const email = res.data.email;
            localStorage.setItem('idUser', data);
            localStorage.setItem('emailUser', email);
        },
        error: function(status) {
            console.log(status)
        }
    })
}

const getAddress = () =>{
    const urlAddess = `https://p-nestjs-ecommerce.onrender.com/api/v1/addresses`;
    $.ajax({
        url: urlAddess,
        type: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem('accessToken')},
        contentType: "application/json",
        success: function(res){
            const idAddress = res.data[0]._id;
            localStorage.setItem('idAddress', idAddress);
        },
        error: function(err){
            console.log(err)
        }
    })
}