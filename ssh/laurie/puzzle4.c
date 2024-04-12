
int func4(int param_1)

{
  int iVar1;
  int iVar2;
  
  if (param_1 < 2) {
    iVar2 = 1;
  }
  else {
    iVar1 = func4(param_1 + -1);
    iVar2 = func4(param_1 + -2);
    iVar2 = iVar2 + iVar1;
  }
  return iVar2;
}

#include <stdio.h>

int main()
{
    int i = 10;
    int ret = 0;
    while(i < 100) {
        if (func4(i) == 55) {
            printf("%d\n", i);
            break;
        }
        printf("%d\n", i);
        i++;
    }    
    return 0;
}
