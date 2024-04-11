#!/bin/bash

RED="\e[31m"
GREEN="\e[32m"
NC="\e[0m"
PWD=$(pwd)

print_info() {
	echo -e "${GREEN}[INFO] $1$NC"
}

print_error() {
	echo -e "${RED}[ERROR] $1$NC"
}

write_variable_value_in_file() {
	local variable_name
	local value
	local filename

	variable_name="$1"
	value="$2"
	filename="$3"

	print_info "Writing value: $value in variable: $variable_name in file: $filename..."
	sed -i "s/^\(${variable_name}\=\).*$/\1${value}/" "$filename"
}
