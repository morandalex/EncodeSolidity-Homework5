function cutAddress(address : string) {
    return address.substring(0,5)+'...' + address.substr(address.length-5)
}

export default {
    cutAddress
}