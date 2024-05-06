# boot2root

Search for various means to pass root on the ISO given to you (42 project)

## Table of Contents

Mandatory part:

- [Following the main puzzle](./mandatory/writeup1/README.md)
- [Via Linux Exploit (Dirty Cow)](./mandatory/writeup2/README.md)

Bonus part:

- [Binary exploitation using ret2libc](./bonus/ret2libc.md)
- [Shellcode with environment variable](./bonus/shellcode_by_env.md)
- [Exploit suExec](./bonus/suExec.md)
- [Reverse shell from phpmyadmin](./bonus/reverse_shell.md)

## Get IP address of the VM

Many options exist to [get](https://www.baeldung.com/linux/lan-ip-addresses) the IP address of the machine.
We have create a [script](get_ip.sh) to obtain it.

## Intelligence gathering

We want to obtain informations about services:

``` bash
$nmap -A -p- $IP
```

With `-A` option we can detect all elements (script, OS, version and traceroute).
`-p-` scan all ports.

| **SERVICE NAME** | **PORT**      | **VERSION**        |
|------------------|---------------|--------------------|
| ftp              | 21            | vsftpd 2.0.8       |
| ssh              | 22            | OpenSSH 5.9        |
| http             | 80            | Apache 2.2.22      |
| imap             | 143           | Dovecot IMAP4rev1  |
| ssl/http         | 443           | Apache 2.2.22      |
| ssl/imaps        | 993           | ?                  |

The VM is running on Linux 3.2.
