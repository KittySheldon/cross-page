import broadcast from './src/broadcast'
import localstorage from './src/localstorage'
import serviceworker from './src/serviceworker'
import sharedworker from './src/sharedworker'
import winopen from './src/winopen'
import so from './src/socket'

const openers = []
window.onload = ()=>{
    const {type} = performance.navigation
    const isRefresh = type === 1
    const isNew = /new/.test(location.search)
    let num = isNew ? Number(localStorage.getItem('xx_broad')) : 0
    //refresh doesn't need to update num
    if((num && !isRefresh) || !num ){
        num++
    }
    localStorage.setItem('xx_broad', num)
    document.getElementById('title').innerText = `Tab${num}` 
    broadcast()
    localstorage()
    serviceworker()
    sharedworker()
    winopen(openers)
    so()
}

window.onpenNewTab = function(){
  const open =window.open(`${location.origin}?new=1`)   //return an opened page reference
  openers.push(open)
}

