let socket = null

function isConnected()
{
    return (socket !== null && socket.readyState === 1)
}

function setSocket(s)
{
    socket = s
}

function setSocketToNull()
{
    socket = null
}

export { socket, isConnected, setSocket, setSocketToNull }