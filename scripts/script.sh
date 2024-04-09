#!/bin/bash

set -eu

source "$(dirname "$0")"/utils.sh

set_vm_ip() {
	local network
	local my_ip

	print_info "Setting ip of the boot2root vm..."
	network=$(ip addr show "enp0s3" | grep "inet " | cut -d " " -f6)
	my_ip=${network//\/[0-9]*/}
	BOOT2ROOT_IP=$(nmap -sn "$network" | grep report | sed "/$my_ip\|)/d" | awk '{ print $5 }')

	if [ "$(echo "$BOOT2ROOT_IP" | wc -l)" != 1 ]; then
		print_error "Too much candidate for the boot2root virtual machine IP."
		print_error "Set the good one at the top of the file."
		print_error "List of candidate: \n$BOOT2ROOT_IP"
		exit 1
	fi
	write_variable_value_in_file BOOT2ROOT_IP "$BOOT2ROOT_IP" "$PWD/$(basename "$0")"
}

BOOT2ROOT_IP=192.168.56.18

if [ -z "$BOOT2ROOT_IP" ]; then
	print_info "\$BOOT2ROOT_IP is not set."
	set_vm_ip
fi

print_info "\$BOOT2ROOT_IP is set to: $BOOT2ROOT_IP"
