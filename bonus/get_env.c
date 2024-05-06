#include <stdio.h>
#include <stdlib.h>

int main(int ac, char *av[]) {
  if (ac != 2) {
    printf("Usage: exec [VARIBLE_NAME]\n");
    exit(1);
  }
  printf("Address is: %p\n", getenv(av[1]));
  return 0;
}
