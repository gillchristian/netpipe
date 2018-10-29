let connected = false
const socket = new WebSocket(wsUrl())

socket.onmessage = handleMessage
socket.onclose = handleClose
socket.onerror = handleError

function wsUrl() {
    const protocol = location.protocol.match(/https/) ? 'wss' : 'ws'
    const pathname = location.host.match(/local/) ? '' : '/netpipe'
    const id = location.pathname.replace(/\//g, '').replace('netpipe', '')

    return `${protocol}://${location.host}${pathname}/ws/${id}`
}

function handleError() {
    const alert = document.getElementById('alert')
    alert.classList.add('alert')
    alert.innerHTML = 'There was an error with the socket connection.'
    alert.classList.remove('hidden')
}

function handleClose() {
    const alert = document.getElementById('alert')
    alert.classList.add('alert')
    alert.innerHTML = 'This channel is closed!'
    alert.classList.remove('hidden')
}

function handleMessage(e) {
    const output = document.getElementById('output')
    const newLine = document.createElement('span')

    newLine.innerHTML = e.data
    output.appendChild(newLine)
    // TODO: scroll not working
    output.scrollTop = output.clientHeight 
}
