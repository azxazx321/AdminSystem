import nProgress from 'nprogress';

export let base = 'https://web.codeboy.com/zhsqapi/'

export let adminLogin = async (adminName,adminPwd) => {
    let url = base + '/admin/login'
    let options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({aname:adminName,apwd:adminPwd})
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()
    nProgress.done()

    return data
}

export let adminInfo = async () => {
    let url = base + '/admin/info'
    let options = {
        headers: {token: localStorage['adminToken']}
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data
}


export let adminUpdatePwd = async (oldPwd, newPwd) => {
    let url = base + 'admin/update/pwd'
    let options = {
        method: 'POST',
        headers: {
            token: localStorage["adminToken"],
            "content-type": "application/json"
        },
        body: JSON.stringify({oldPwd,newPwd})
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data

}


export let adminHouseholdList = async (pageNum=1,kw="") => {
    let url = base + `admin/household/list?pageNum=${pageNum}&kw=${kw}`
    let options = {
        headers: {
            'token': localStorage['adminToken']
        }
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data

}

export let adminHouseholdDetails = async (hid) => {
    let url = base + `admin/household/details?hid=${hid}`
    let options = {
        headers: {
            token: localStorage['adminToken']
        }
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data
}

export let adminHouseholdDelete = async (hid) => {
    let url = base + 'admin/household/delete?hid='+hid;

    let options = {
        headers: {
            token: localStorage['adminToken']
        }
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data
}

export let adminHouseholdAdd = async (resident) => {
    let url = base + 'admin/household/add'

    let options = {
        method: 'POST',
        headers: {
            token: localStorage['adminToken'],
            'Content-Type':'application/json'
        },
        body: JSON.stringify(resident),
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data
}


export let adminHouseholdUpdate = async (resident) => {
    let url = base + 'admin/household/update'

    let options = {
        method: 'POST',
        headers: {
            token: localStorage['adminToken'],
            'Content-Type':'application/json'
        },
        body: JSON.stringify(resident),
    }
    nProgress.start()

    let res = await fetch(url,options)
    let data = await res.json()

    nProgress.done()

    return data
}

export let adminHouseholdBatchDelete = async (keys)=>{
    let url = base + 'admin/household/batch/delete'
    let options = {
      method:'POST',
      headers:{
        token:localStorage['adminToken'],
        'Content-Type':'application/json'
      },
      body:JSON.stringify(keys)
    }
    nProgress.start()
    let res = await fetch(url,options);
    let data = await res.json();
    nProgress.done();
    return data;
  }
  

  export let adminHouseholdBatchExport = async (arr)=>{
    let url = base + 'admin/household/batch/export'
    let options = {
      method:'POST',
      headers:{
        token:localStorage['adminToken'],
        'Content-Type':'application/json'
      },
      body:JSON.stringify(arr)
    }
    nProgress.start()
    let res = await fetch(url,options)
    let data = await res.blob();
    nProgress.done()
    return data;
  }
  

  export let adminHouseholdFullExport = async (arr)=>{
    let url = base + 'admin/household/full/export'
    let options = {
      headers:{token:localStorage['adminToken']}
    }
    nProgress.start()
    let res = await fetch(url,options)
    let data = await res.blob();
    nProgress.done()
    return data;
  }

