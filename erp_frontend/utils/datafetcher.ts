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

export function getPlantById(plantId, callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/production/material/plant_id/${plantId}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (res.status === 200) {
            callback(res.data);
          }
      }).catch(err => {
          console.error(err);
      });
}

export function getPlantScheduling(selectPlantIndex, callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/scheduling/machines/plant_id/${selectPlantIndex}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (res.status === 200) {
            callback(res.data);
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

export function dispatchPackage(id, weight, plantId, callback) {
    axios({
        method: 'post',
        url: `${domain}/api/v1/packaging/create_package`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('jwt')},
        data: {
            "package": {
                "order_id": id, 
                "plant_id": plantId,
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

export function getUser(callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/my_user1`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(resRole => {
        if (resRole.status === 200) {
            callback(`/${resRole.data.role}`)
        }
      }).catch(err => {
        console.error(err);
      });
}

export function getPackagingInfo(orderId, callback) {
    axios({
        method: 'get',
        url: `${domain}/api/v1/accounting/order/${orderId}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        } else {
            alert('Package details not found for current user.');
        }
    }).catch(err => {
        console.error(err);
        alert('Package details not found for current user.');
    });
}

export function getLedger(callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/accounting/ledger`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function getClaims(type, callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/quality_management/${type}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
        if (res.status === 200) {
            callback(res.data);
        }
    }).catch(err => {
        console.error(err);
    });
}

export function createVendorClaim(respectiveClaimSize, formComment, formDefectType, formDescription, formOrderID, formRequest, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/vendor_claim/newClaim`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            vendor_claim:{
                claim_id: respectiveClaimSize.length,
                name:"Wilson Inc.",
                comments: formComment,
                defecttype: formDefectType,
                description: formDescription,
                orderid: formOrderID,
                requeststatus: "N/A",
                status: "Pending review",
                vendorrequest: formRequest
            }
        }
      }).then((res)=>{
        if (res.status == 200){
            callback(res.status)
        }
    }).catch(err => {
          console.error(err);
          alert("Defect was not added due to some error.");
      });
}

export function createClientClaim(respectiveClaimSize, formComment, formDefectType, formDescription, formOrderID, formRequest, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/client_claim/newClaim`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            client_claim:{
                claim_id:respectiveClaimSize.length,
                comments: formComment,
                defecttype: formDefectType,
                description: formDescription,
                orderid: formOrderID,
                requeststatus: "N/A",
                status: "Pending review",
                clientrequest: formRequest
            }
        }
      }).then((res)=>{
          if (res.status == 200){
              callback(res.status)
          }
      }).catch(err => {
          console.error(err);
          alert("Defect was not added due to some error.");
      });
}

export function getVendorTransactions(callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/production/expenses`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
     }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
     }).catch(err => {
        console.error(err);
    });
}

export function updateDefectStatusClient(index, option, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/client_claim/updateDefectStatus/id/${index}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            client_claim:{
                status:option
            }
        }
      }).then((res)=>{
        if (res.status == 200) callback('/employee')
      }).catch(err => {
          console.error(err);
          alert("Status was not updated due to some error.");
      });
}

export function updateDefectStatusVendor(index, option, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/vendor_claim/updateDefectStatus/id/${index}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            vendor_claim:{
                status:option
            }
        }
      }).then((res)=>{
        if (res.status == 200) callback('/employee')
      }).catch(err => {
          console.error(err);
          alert("Status was not updated due to some error.");
      });
}

export function updateRequestStatusClient(index, option, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/client_claim/updateDefectStatus/id/${index}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            client_claim:{
                requeststatus:option
            }
        }
      }).then((res)=>{
        if (res.status == 200) callback('/employee')
      }).catch(err => {
          console.error(err);
          alert("Request status was not updated due to some error.");
      });
}

export function updateRequestStatusVendor(index, option, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/quality_management/vendor_claim/updateDefectStatus/id/${index}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        data:{
            vendor_claim:{
                requeststatus:option
            }
        }
      }).then((res)=>{
        if (res.status == 200) window.location.href = '/employee'
      }).catch(err => {
          console.error(err);
          alert("Status was not updated due to some error.");
      });
}

export function updateMaterial(data, order, i, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/production/material/update/material_id/${data[i]["material_id"]}/quantity/${data[i]["quantity"] + order[i]}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
          if (res.status === 200) {
              callback(true)
          }
      }).catch(err => {
            console.error(err);
            alert("Order was not processed.");
            callback(false)
      });
}

export function createExpense(total){
    axios({
        method: 'post',
        url: `${domain}/api/v1/production/expense/create/amount/${total}`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
        params: {"company": "Wilson-Materials-Inc."},
    }).then(res => {
        if (res.status === 200) {
        }
    }).catch(err => {
        console.error(err);
    });
}

export function postSale(totalPrice, cardPerson, bikeQty){
    axios({
        method: 'post',
        url: `${domain}/api/v1/sale`,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
         },
        data: {
            "sale": {
                price: parseFloat(totalPrice.toFixed(2)),
                email: cardPerson,
                quantity: bikeQty
            }
        }
    }).then(res => {
        if (res.status === 200) {
            console.log("success");
            alert("Thanks for purchasing bikes!");
            location.reload();
        }
    }).catch(err => {
        console.error(err);
    });
}

export function stopScheduling(machine){
    axios({
        method: 'post',
        url: `${domain}/api/v1/scheduling/machines/machine_id/${machine["machine_id"]}/status/Stopped`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
      }).then(res => {
        window.location.reload();
      })
      .catch(err => {
          console.error(err);
      });
}

export function getTasks(callback){
    axios({
        method: 'get',
        url: `${domain}/api/v1/planning`,
        headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem("jwt") },
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function postTask(taskDescription, endDate, startDate, taskName, taskType, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/planning/createtask`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
         },
        data: {
            "task": {
                description: taskDescription,
                endTime: endDate,
                startTime: startDate,
                status: false,
                taskName: taskName,
                taskType: taskType,
            }
        }
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function editTask(taskDescription, endDate, startDate, checked, taskName, taskType, currentTask, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/planning/edittask`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
         },
        data: {
            "task": {
                description: taskDescription,
                endTime: endDate,
                startTime: startDate,
                status: checked,
                taskName: taskName,
                taskType: taskType,
                id: currentTask.id
            }
        }
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}

export function deleteTask(currentTask, callback){
    axios({
        method: 'post',
        url: `${domain}/api/v1/planning/deletetask`,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem('jwt')
         },
        data: {
            "taskID": currentTask.id
        }
    }).then(res => {
        if (res.status === 200) {
            callback(res.data)
        }
    }).catch(err => {
        console.error(err);
    });
}