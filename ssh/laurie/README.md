### ssh walthrought

Now that we are connected on laurie we can inspect is `home` directory:  

```bash
laurie@BornToSecHackMe:~$ ls
bomb  README
laurie@BornToSecHackMe:~$ cat README 
Diffuse this bomb!
When you have all the password use it as "thor" user with ssh.

HINT:
P
 2
 b

o
4

NO SPACE IN THE PASSWORD (password is case sensitive).

laurie@BornToSecHackMe:~$ ./bomb 
Welcome this is my little bomb !!!! You have 6 stages with
only one life good luck !! Have a nice day!
6

BOOM!!!
The bomb has blown up.
```

We have used ghidra to obtain C code and complete the puzzles. Each point refered to a function in the programm.
To get the binary in host we have used `scp`:  

```bash
scp bomb parrot@192.168.56.108:/home/parrot/Documents/boot2root
parrot@192.168.56.108's password: 
bomb                                          100%   26KB  26.3KB/s   00:00    

```

We have reverse all function and obtained values:  

* Public speaking is very easy. (String is given.)
* 1 2 6 24 120 720 (Each previous value give us the current: val[n - 1] * i. First value is give.)
* 1 b 214 OU 2 b 755 OU 7 b 524 (Simple switch case.)
* 9 (We have brute force this function to obtain result. (puzzle4.c))
* opekma (We have used script to give each possibility and try it with hydra)
* 4 2 6 3 1 5 (It was a chained list in which each value must be sorted in descending order.)

```bash
laurie@BornToSecHackMe:~$ ./bomb test.txt
Welcome this is my little bomb !!!! You have 6 stages with
only one life good luck !! Have a nice day!
Public speaking is very easy.
Phase 1 defused. How about the next one?
1 2 6 24 120 720
That's number 2.  Keep going!
1 b 214
Halfway there!
9
So you got that one.  Try this one.
opekma     
Good work!  On to the next...
4 2 6 3 1 5
Congratulations! You've defused the bomb!
```