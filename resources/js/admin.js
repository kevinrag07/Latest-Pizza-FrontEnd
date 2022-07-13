import axios from 'axios'
import moment from 'moment'
import Noty from 'noty'

export function initAdmin(socket) {
    const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })

    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            if( !menuItem.qty == 0) {
                return `
                    <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
                `
            }
        }).join('')
    }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                    <td class="border-1 border-primary py-3">
                        <p class="mb-1 text-primary">${ order._id }</p>
                        <div class="mb-1 pt-3">${ renderItems(order.items) }</div>
                    </td>
                    <td class="border-1 border-primary">${ order.customerId.name }</td>
                    <td class="border-1 border-primary">${ order.address }</td>
                    <td class="border-1 border-primary">
                    <div class="p-0">
                        <form action="/admin/order/status" method="POST">
                            <input type="hidden" name="orderId" value="${ order._id }">
                            <select name="status" onchange="this.form.submit()" class="py-2 w-auto pe-5 ps-2 bg-black text-white border-2 border-primary rounded-3">
                                <option value="order_placed"
                                    ${ order.status === 'order_placed' ? 'selected' : '' }>
                                    Placed</option>
                                <option value="confirmed" ${ order.status === 'confirmed' ? 'selected' : '' }>
                                    Confirmed</option>
                                <option value="prepared" ${ order.status === 'prepared' ? 'selected' : '' }>
                                    Prepared</option>
                                <option value="delivered" ${ order.status === 'delivered' ? 'selected' : '' }>
                                    Delivered
                                </option>
                                <option value="completed" ${ order.status === 'completed' ? 'selected' : '' }>
                                    Completed
                                </option>
                            </select>
                        </form>
                    </div>
                    </td>
                    <td class="border-1 border-primary">
                        ${ moment(order.createdAt).format('hh:mm A') }
                    </td>
                    <td class="border-1 border-primary px-4 py-2">
                        ${ order.paymentType === 'card' ? 'Paid' : 'Not Paid' }
                    </td>
                </tr>
            `
        }).join('')
    }
    // Socket
    socket.on('orderPlaced', (order) => {
        // new Noty({
        //     type: 'success',
        //     timeout: 1000,
        //     text: 'New Order!',
        //     progressBar: false,
        // }).show();
        const toast = swal.mixin({
            toast:true,
            position:'top-end',
            showConfirmButton:false,
            timer:1000
        });
        toast({
            type:'success',
            title:'New Order!'
        })
        orders.unshift(order)
        orderTableBody.innerHTML = ''
        orderTableBody.innerHTML = generateMarkup(orders)
    })
}