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