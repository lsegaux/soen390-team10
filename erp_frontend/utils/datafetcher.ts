import axios from 'axios';

const domain = 'http://localhost:4000';

export function loginPost(email:string, password:string) {
    return axios({
        method: 'post',
        url: `${domain}/api/v1/sign_in`,
        headers: { "Content-Type": "application/json" }, 
        data: { email, password }
    })
}

export function signUpPost(email:string, password:string, firstName:string, lastName:string, userRole:string, captcha: string) {
    return axios({
        method: 'post',
        url: `${domain}/api/v1/sign_up`,
        headers: { "Content-Type": "application/json" }, 
        data: {user: { email, password, first_name: firstName, last_name:lastName, role:userRole, captcha_response:captcha }}
    })
}

export function getBoxesInfo(index, callback) {
    axios({
        method: 'get',
        url: `${domain}/api/v1/packaging/boxes/${index}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt') },
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function getPlants(callback) {
    axios({
        method: 'get',
        url: `${domain}/api/v1/production/plants`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
    }).then(res => {
        if (res.status === 200) {
          callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function reduceBoxes(id, order_id, callback) {
    axios({
        method: 'post',
        url: `${domain}/api/v1/packaging/reduce_quantity`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
        data: {"id": id, "order_id": order_id}
    }).then(res => {
        if (res.status === 200) {
            callback(true)
        }
    }).catch(err => {
        console.error(err);
        callback(false)
    })
}


export function dispatchPackage(id, weight, callback) {
    axios({
        method: 'post',
        url: `${domain}/api/v1/packaging/create_package`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
        data: {
            "package": {
                "order_id": id, 
                "plant_id": id,
                "user_email": "",
                "weight": weight, 
                "shipped": false
            }
        }
    }).then(res => {
        if (res.status === 200) {
            callback(true)
            alert('The order was dispatched.')
        }
    }).catch(err => {
        console.error(err);
        callback(false)
    })
}

export function postOrderBoxes(plantId, boxes, callback) {
    axios({
        method: 'post',
        url: `${domain}/api/v1/packaging/order_boxes`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
        data: {"id": plantId, "smallOrder": boxes[0], "mediumOrder": boxes[1], "largeOrder": boxes[2], "xlargeOrder": boxes[3]}
    }).then(res => {
        if (res.status === 200) {
            callback(true)
        }
    }).catch(err => {
        console.error(err);
        callback(false)
    })
}