
int func4(int param_1)

{
  int iVar1;
  int iVar2;
  
  if (param_1 < 2) {
    iVar2 = 1;
  }
  else {
    iVar1 = func4(param_1 + -1);
printf("iVar1 %d %d\n", param_1,  iVar1);
    iVar2 = func4(param_1 + -2);
printf("Ivar2 %d %d\n", param_1, iVar2);
    iVar2 = iVar2 + iVar1;
  }
  return iVar2;
}

#include <stdio.h>

int main()
{
    int i =0;
    while(i < 100) {
        if (func4(i) == 55) {
            printf("%d\n", i);
            break;
        }
        i++;
    }
    printf("Hello World %d\n", func4(-1));
    
    return 0;
}
