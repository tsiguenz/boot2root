### ftp walkthought

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

