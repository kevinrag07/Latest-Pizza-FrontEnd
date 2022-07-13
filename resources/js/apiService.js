import axios from 'axios'
// import Noty from 'noty'

export function placeOrder(formObject) {
    axios.post('/orders', formObject).then((res) => {
        const toast = swal.mixin({
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            timer:1000
        });
        toast({
            type:'success',
            title: res.data.message
        })
        // new Noty({
        //     type: 'success',
        //     timeout: 1000,
        //     text: res.data.message,
        //     progressBar: false,
        // }).show();
        setTimeout(() => {
            window.location.href = '/customer/orders'    
        }, 1000);        
    }).catch((err) => {
        const toast = swal.mixin({
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            timer:1000
        });
        toast({
            type:'success',
            title: err.res.data.message
        })
        // new Noty({
        //     type: 'success',
        //     timeout: 1000,
        //     text: err.res.data.message,
        //     progressBar: false,
        // }).show();
    })
}