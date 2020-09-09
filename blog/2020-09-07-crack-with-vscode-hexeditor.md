---
slug: crack-with-vscode-hexeditor
title: Crack with VSCode Hex Editor
description: Learn how to crack a simple executable by editing it with VSCode Hex Editor.
tags: [vscode, security, assembler, crack]
---

Have you ever wondered how hackers bypass proprietary applications to do what they want? Like not asking for a license.

In this post, we will see how to crack a simple executable on Linux or macOS (not tested on Windows but it probably works as well).

<!--truncate-->

## Install

We will need VSCode and its extension: [Hex Editor](https://marketplace.visualstudio.com/items?itemName=ms-vscode.hexeditor).

Next, we need a C compiler, like GCC or Clang.

## Compile

To learn the process of cracking, we will see how to crack a very simple C program. Put the following in a **main.c**:

```c
#include <stdio.h>

int main()
{
  int i = 0;

  if (i)
    printf("OK\n");
  else
    printf("KO\n");
  if (!i)
    printf("i = 0\n");
  return (0);
}
```

Then compile with `gcc main.c -o a.out`. An **a.out** executable is produced by the compiler. We will directly modify **a.out** to do what we want it to do like if we do not have the source code.

## Challenge #1

Our first challenge is to make the executable print:

```
$ ./a.out
OK
i = 0
```

But right now, it prints:

```
$ ./a.out
KO
i = 0
```

To modify a program, we need to know which are the instructions executed by the CPU so that we can rewrite them as needed. We disassemble our executable by running:

```sh
$ objdump -M intel -j .text --disassemble=main ./a.out # on Linux
$ objdump -d -x86-asm-syntax=intel ./a.out # on macOS
```

On Linux with a x86_64 CPU, I have:

```
a.out:     file format elf64-x86-64


Disassembly of section .text:

0000000000001135 <main>:
    1135:       55                      push   rbp
    1136:       48 89 e5                mov    rbp,rsp
    1139:       48 83 ec 10             sub    rsp,0x10
    113d:       c7 45 fc 00 00 00 00    mov    DWORD PTR [rbp-0x4],0x0
    1144:       83 7d fc 00             cmp    DWORD PTR [rbp-0x4],0x0
    1148:       74 0e                   je     1158 <main+0x23>
    114a:       48 8d 3d b3 0e 00 00    lea    rdi,[rip+0xeb3]        # 2004 <_IO_stdin_used+0x4>
    1151:       e8 da fe ff ff          call   1030 <puts@plt>
    1156:       eb 0c                   jmp    1164 <main+0x2f>
    1158:       48 8d 3d a8 0e 00 00    lea    rdi,[rip+0xea8]        # 2007 <_IO_stdin_used+0x7>
    115f:       e8 cc fe ff ff          call   1030 <puts@plt>
    1164:       83 7d fc 00             cmp    DWORD PTR [rbp-0x4],0x0
    1168:       75 0c                   jne    1176 <main+0x41>
    116a:       48 8d 3d 99 0e 00 00    lea    rdi,[rip+0xe99]        # 200a <_IO_stdin_used+0xa>
    1171:       e8 ba fe ff ff          call   1030 <puts@plt>
    1176:       b8 00 00 00 00          mov    eax,0x0
    117b:       c9                      leave
    117c:       c3                      ret
```

Wow that's cryptic. Yes this is assembler (ASM). If you ever thought Javascript is hard, well, your brain is probably melting right now but that's ok, we just need to know 3 things:

- The first column is the starting address of the instruction in the file.
- The third column is the ASM instruction name and the fourth column is its argument(s).
- The second column is the corresponding byte code of the instruction and its argument(s) if any.

These are 3 instructions useful to know:

- The **jmp** instruction is encoded as **eb** and basically jumps to an address in memory.
- The **je** instruction (**74**) is **jump if equal** and is like the `if (...)` in C.
- The **jne** instruction (**75**) is **jump if not equal** and is like the `if (!...)` in C.

> Always remember that numbers can vary from one CPU to another. I'm on an x86_64 and you're probably on an x86 CPU as well but there are other architectures like ARMv6. Each architecture can have a more or less different instruction set.

Note that corresponding instructions may not be encoded by the same numbers on your computer because it depends on your CPU model.

Guess what. To solve this challenge, we just need to modify the first **je** instruction at address **1148** with either:

- A **jmp** instruction
- A **jne** instruction

Open **a.out** with **Hex Editor** extension and search for **74 0e** at address **1148**. Remember, all numbers I present to you may be different for you so get them from your outputs.

![VSCode Hex Editor](https://dev-to-uploads.s3.amazonaws.com/i/199vuje46d2zf99pgsnw.png)

Now change the instruction **je** to **jmp**:

![Alt Text](https://dev-to-uploads.s3.amazonaws.com/i/10eeuaidpapibclbczmg.png)

Save and run:

```sh
$ ./a.out
OK
i = 0
```

## Conclusion

Well done, you solved your first cracking challenge!
If you liked it, you can try harder challenges on platforms like [root-me.org](https://www.root-me.org/?lang=en).

Or you can try to solve my next challenge by yourself:

```sh
$ ./a.out
OK
```

https://www.felixcloutier.com/x86/

In another post, I will cover higher-level tools to ease the process of cracking like:

- [Cutter](https://github.com/radareorg/cutter)
- [Radare](https://github.com/radareorg/radare2)
- [Ghidra](https://github.com/NationalSecurityAgency/ghidra) (integrated in Cutter)

Happy cracking 🛠
