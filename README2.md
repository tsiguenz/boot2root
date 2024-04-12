# The Second Way to Gain Root Access

After establishing an SSH connection to Laurie's system, we explored methods to obtain root access. One approach involves following the treasure hunt solution planned in the project, while another utilizes a Linux kernel exploit known as DirtyCow. In this writeup, we will elaborate on the latter method.

Before initiating the exploit, it's crucial to determine if the server is vulnerable. Firstly, we identify the kernel version by executing:

shell

~$ uname -r
3.2.0-91-generic-pae

Next, we search for exploits targeting this version on [Exploit-DB](https://www.exploit-db.com). We discover an exploit named Dirty Cow (Copy-On-Write), which allows us to write any file and bypass Linux's permission system.

Many C programs are available for exploiting Dirty Cow. We have opted to use one authored by [FireFart](https://github.com/firefart/dirtycow).

After compiling and executing the program, we can switch to the new user and verify that we now have root access.

```
laurie@BornToSecHackMe:~$ su firefart
Password: 
firefart@BornToSecHackMe:/home/laurie# id
uid=0(firefart) gid=0(root) groups=0(root)
```

And that's it!