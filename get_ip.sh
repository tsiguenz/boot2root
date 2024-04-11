#!/bin/bash

readarray -t ips <<< "$(ip route | grep -o "192.168\S*")"
ip_range="${ips[0]}"
ip_local="${ips[1]}"

function getHostIp() {
    local ip_address="$1"
    local regex="[0-9]+$"

    local last_digit=$(echo "$ip_address" | grep -oE "$regex")

    echo "${ip_address//$last_digit/1}"
    # echo "$ip_address" | sed "s/$last_digit$/1/"
}
ip_host=$(getHostIp "$ip_local")

export IP
IP=$(nmap -n -sn "$ip_range" -exclude "${ip_local},${ip_host}" -oG - | awk '/Up$/{print $2}')
echo "$IP"
